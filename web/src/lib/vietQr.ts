/**
 * VietQR (NAPAS, EMVCo merchant-presented) payload for a bank transfer to one
 * account with a fixed amount and transfer content, so banking apps prefill both.
 */

const FIELD = {
  PayloadFormat: "00",
  InitiationMethod: "01",
  MerchantAccount: "38",
  Currency: "53",
  Amount: "54",
  Country: "58",
  AdditionalData: "62",
  Crc: "63",
} as const;

const MERCHANT_ACCOUNT_FIELD = {
  Guid: "00",
  Beneficiary: "01",
  Service: "02",
} as const;

const BENEFICIARY_FIELD = {
  BankBin: "00",
  AccountNumber: "01",
} as const;

const ADDITIONAL_DATA_FIELD = {
  Purpose: "08",
} as const;

const NAPAS_GUID = "A000000727";
const TRANSFER_TO_ACCOUNT_SERVICE = "QRIBFTTA";
/** Dynamic QR: valid for one payment of the encoded amount. */
const DYNAMIC_INITIATION = "12";
const PAYLOAD_FORMAT_VERSION = "01";
const COUNTRY_CODE = "VN";

export const ISO_4217_NUMERIC = {
  VND: "704",
} as const;

/** NAPAS limits the transfer content to 25 characters. */
export const VIETQR_PURPOSE_MAX_LENGTH = 25;

function field(id: string, value: string) {
  if (value.length > 99) {
    throw new Error(`VietQR field ${id} exceeds 99 characters`);
  }
  return `${id}${String(value.length).padStart(2, "0")}${value}`;
}

/** CRC-16/CCITT-FALSE, as EMVCo requires for field 63. */
export function crc16Ccitt(text: string) {
  let crc = 0xffff;
  for (const byte of new TextEncoder().encode(text)) {
    crc ^= byte << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export type VietQrTransfer = {
  /** Six-digit NAPAS bank identification number, such as 970436 for Vietcombank. */
  bankBin: string;
  accountNumber: string;
  /** Whole đồng. */
  amount: number;
  purpose: string;
};

export function vietQrPayload({
  bankBin,
  accountNumber,
  amount,
  purpose,
}: VietQrTransfer) {
  if (!/^\d{6}$/.test(bankBin)) {
    throw new Error("VietQR bank BIN must have 6 digits");
  }
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("VietQR amount must be a positive whole number of đồng");
  }
  if (purpose.length > VIETQR_PURPOSE_MAX_LENGTH) {
    throw new Error(
      `VietQR transfer content exceeds ${VIETQR_PURPOSE_MAX_LENGTH} characters`
    );
  }

  const beneficiary =
    field(BENEFICIARY_FIELD.BankBin, bankBin) +
    field(BENEFICIARY_FIELD.AccountNumber, accountNumber);
  const merchantAccount =
    field(MERCHANT_ACCOUNT_FIELD.Guid, NAPAS_GUID) +
    field(MERCHANT_ACCOUNT_FIELD.Beneficiary, beneficiary) +
    field(MERCHANT_ACCOUNT_FIELD.Service, TRANSFER_TO_ACCOUNT_SERVICE);

  const withoutCrc =
    field(FIELD.PayloadFormat, PAYLOAD_FORMAT_VERSION) +
    field(FIELD.InitiationMethod, DYNAMIC_INITIATION) +
    field(FIELD.MerchantAccount, merchantAccount) +
    field(FIELD.Currency, ISO_4217_NUMERIC.VND) +
    field(FIELD.Amount, String(amount)) +
    field(FIELD.Country, COUNTRY_CODE) +
    field(FIELD.AdditionalData, field(ADDITIONAL_DATA_FIELD.Purpose, purpose)) +
    `${FIELD.Crc}04`;

  return withoutCrc + crc16Ccitt(withoutCrc);
}
