import QRCode from "qrcode";

import { vietQrPayload, type VietQrTransfer } from "@/lib/vietQr";

const QUIET_ZONE = 2;

export function VietQrCode(transfer: VietQrTransfer) {
  const { modules } = QRCode.create(vietQrPayload(transfer), {
    errorCorrectionLevel: "M",
  });
  const viewSize = modules.size + QUIET_ZONE * 2;

  const path: string[] = [];
  for (let row = 0; row < modules.size; row += 1) {
    for (let column = 0; column < modules.size; column += 1) {
      if (modules.get(row, column)) {
        path.push(`M${column + QUIET_ZONE} ${row + QUIET_ZONE}h1v1h-1z`);
      }
    }
  }

  return (
    <svg
      className="qr"
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Mã VietQR chuyển khoản"
    >
      <rect width={viewSize} height={viewSize} fill="#fff" />
      <path d={path.join("")} fill="#0F2444" />
    </svg>
  );
}
