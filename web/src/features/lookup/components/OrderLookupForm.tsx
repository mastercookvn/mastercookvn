"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextField } from "@/components/ui/TextField";
import { ROUTES } from "@/constants/routes";
import { CUSTOMER } from "@/mocks/contracts";
import {
  LIVE_VALIDATION_MODE,
  phoneSchema,
  requiredTextSchema,
} from "@/lib/validation";

import { OrderCard } from "@/features/account/components/orders/OrderCard";
import {
  useCustomerOrders,
  type CustomerOrder,
} from "@/features/account/lib/useCustomerOrders";

type LookupResult =
  | { kind: "found"; order: CustomerOrder; phone: string }
  | { kind: "missing" }
  | null;

const normalizeCode = (code: string) =>
  code.trim().toUpperCase().replaceAll(" ", "");

const lookupSchema = z.object({
  phone: phoneSchema,
  code: requiredTextSchema("mã đơn hoặc số hợp đồng").transform(normalizeCode),
});

export function OrderLookupForm() {
  const orders = useCustomerOrders();
  const [result, setResult] = useState<LookupResult>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(lookupSchema),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: { phone: "", code: "" },
  });

  // Placeholder for GET /orders/lookup. The backend should answer only after an
  // SMS code for this phone, so a leaked order code alone shows nothing.
  const lookUp = handleSubmit(({ phone: localPhone, code: wanted }) => {
    const order =
      localPhone === phoneSchema.parse(CUSTOMER.phone)
        ? orders.find(
            (item) =>
              item.orderCode === wanted || item.contractNumber === wanted
          )
        : undefined;
    setResult(
      order ? { kind: "found", order, phone: localPhone } : { kind: "missing" }
    );
  });

  const detailHref = (order: CustomerOrder, localPhone: string) => {
    const target = order.contractNumber
      ? ROUTES.contract(order.contractNumber)
      : ROUTES.account;
    return `${ROUTES.login}?next=${encodeURIComponent(target)}&phone=${localPhone}`;
  };

  return (
    <div className="lookup">
      <form className="card l-stack lookup-form" noValidate onSubmit={lookUp}>
        <TextField
          id="lookup-phone"
          label="Số điện thoại đặt tiệc"
          type="tel"
          autoComplete="tel"
          placeholder="0903 123 456"
          inputMode="tel"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <TextField
          id="lookup-code"
          label="Mã đơn hoặc số hợp đồng"
          placeholder="DH-0142 hoặc HD-2026-0142"
          hint="Mã có trong tin nhắn Zalo hoặc SMS tư vấn gửi bạn."
          {...register("code")}
          error={errors.code?.message}
        />
        <Button type="submit" variant="primary">
          Tra cứu
        </Button>
      </form>

      <div className="l-stack" aria-live="polite">
        {result?.kind === "missing" ? (
          <Alert tone="error">
            Không tìm thấy đơn với số điện thoại và mã này. Kiểm tra lại mã,
            hoặc gọi tư vấn để được hỗ trợ.
          </Alert>
        ) : null}
        {result?.kind === "found" ? (
          <>
            <OrderCard
              order={result.order}
              actions={
                <ButtonLink
                  href={detailHref(result.order, result.phone)}
                  variant="primary"
                >
                  {result.order.contractNumber
                    ? "Đăng nhập để xem hợp đồng"
                    : "Đăng nhập để theo dõi"}
                </ButtonLink>
              }
            />
            <p className="text-small text-soft">
              Xem chi tiết, xác nhận hợp đồng và thanh toán cần đăng nhập bằng
              số điện thoại này để bảo vệ thông tin của bạn.
            </p>
          </>
        ) : null}
        {result === null ? (
          <div className="lookup-hint">
            <b>Đã có tài khoản?</b>
            <p>
              Mọi đơn đặt bằng số của bạn, kể cả đơn tư vấn đặt hộ, nằm trong Hồ
              sơ của tôi.
            </p>
            <ButtonLink href={ROUTES.account}>Mở Hồ sơ của tôi</ButtonLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
