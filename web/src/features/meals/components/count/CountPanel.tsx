"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { ExportButton } from "@/components/ui/ExportButton";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { PhotoGalleryField } from "@/components/ui/PhotoGalleryField";
import { SignaturePad } from "@/components/ui/SignaturePad";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { MEAL_STATUS } from "@/constants/statuses";
import { formatMoney } from "@/lib/format";
import { CUSTOMER } from "@/mocks/contracts";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import {
  COUNT_REPORT_ROWS,
  COUNT_REPORT_STATUS,
  countReportCompensation,
  type CountReport,
  type CountReportStatus,
} from "@/mocks/equipment";
import type { OperationMeal } from "@/mocks/operationMeals";

import { countRowProblem } from "../../lib/countRowProblem";
import { MealStageNotice } from "../MealStageNotice";

import { CountReportTable } from "./CountReportTable";

/** Counting starts from "everything came back good"; staff only types the exceptions. */
const BLANK_ROWS = COUNT_REPORT_ROWS.map((row) => ({
  ...row,
  good: row.issued,
  damaged: 0,
  lost: 0,
  charged: 0,
}));

const DEFAULT_COUNTER = "Hoàng Anh Khoa";

const now = () =>
  new Date().toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function ConfirmedReport({ report }: { report: CountReport }) {
  const total = countReportCompensation(report.rows);
  return (
    <>
      <Alert tone="good">
        Biên bản đã xác nhận lúc {report.savedAt}. Khách đã nhận thông báo trong
        tài khoản
        {total > 0
          ? `, bồi thường ${formatMoney(total)} sẽ cộng vào quyết toán bữa.`
          : ", không phát sinh bồi thường."}
      </Alert>
      <CountReportTable rows={report.rows} />
      <section className="card count-sign-off">
        <dl>
          <div>
            <dt>Người kiểm đếm</dt>
            <dd>{report.counter}</dd>
          </div>
          <div>
            <dt>Đại diện khách</dt>
            <dd>{report.customerName}</dd>
          </div>
          {report.note ? (
            <div>
              <dt>Ghi chú</dt>
              <dd>{report.note}</dd>
            </div>
          ) : null}
        </dl>
        {report.customerSignature ? (
          // eslint-disable-next-line @next/next/no-img-element -- data URL from the signature pad
          <img
            className="signature-image"
            src={report.customerSignature}
            alt={`Chữ ký của ${report.customerName}`}
          />
        ) : (
          <p className="text-small text-soft">Khách không ký tại chỗ.</p>
        )}
      </section>
    </>
  );
}

export function CountPanel({ meal }: { meal: OperationMeal }) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);
  const saved = useDemoState((state) => state.countReports[meal.id]);
  const showToast = useToast();

  const [rows, setRows] = useState(saved?.rows ?? BLANK_ROWS);
  const [photos, setPhotos] = useState<string[]>(saved?.photos ?? []);
  const [counter, setCounter] = useState(saved?.counter ?? DEFAULT_COUNTER);
  const [customerName, setCustomerName] = useState(
    saved?.customerName ?? CUSTOMER.name
  );
  const [note, setNote] = useState(saved?.note ?? "");
  const [signature, setSignature] = useState<string | null>(
    saved?.customerSignature ?? null
  );
  const [submitted, setSubmitted] = useState(false);

  if (saved?.status === COUNT_REPORT_STATUS.Confirmed) {
    return (
      <>
        <PanelHeader
          title="Biên bản kiểm đếm"
          subtitle={`${meal.orderCode} · ${meal.name}`}
        />
        <ConfirmedReport report={saved} />
      </>
    );
  }
  if (status !== MEAL_STATUS.AwaitingCount) {
    return (
      <MealStageNotice message="Biên bản kiểm đếm mở sau khi kết thúc phục vụ." />
    );
  }

  const problems = rows.filter((row) => countRowProblem(row) !== null).length;
  const compensation = countReportCompensation(rows);
  const needsSignature = compensation > 0;
  const errors = {
    counter: counter.trim() ? null : "Nhập người kiểm đếm",
    customerName: customerName.trim() ? null : "Nhập tên đại diện khách",
    signature:
      needsSignature && !signature
        ? "Có bồi thường nên cần chữ ký đại diện khách"
        : null,
  };

  const persist = (reportStatus: CountReportStatus) =>
    updateDemoState({
      countReports: {
        ...readDemoState().countReports,
        [meal.id]: {
          status: reportStatus,
          rows,
          photos,
          counter: counter.trim(),
          note: note.trim(),
          customerName: customerName.trim(),
          customerSignature: signature,
          savedAt: now(),
        },
      },
    });

  const confirm = () => {
    setSubmitted(true);
    if (problems > 0 || Object.values(errors).some(Boolean)) return;
    persist(COUNT_REPORT_STATUS.Confirmed);
    updateDemoState({
      mealStatuses: {
        ...readDemoState().mealStatuses,
        [meal.id]: MEAL_STATUS.AwaitingSettlement,
      },
    });
    showToast(
      "Đã xác nhận biên bản và gửi thông báo cho khách. Bữa chuyển sang Chờ quyết toán."
    );
  };

  return (
    <>
      <PanelHeader
        title="Biên bản kiểm đếm"
        subtitle="Mặc định mọi dụng cụ về đủ và tốt. Chỉ sửa dòng có hư, mất."
        actions={
          <ExportButton
            fileName={`bien-ban-kiem-dem-${meal.orderCode}`}
            columns={[
              "Dụng cụ",
              "Đã xuất",
              "Tốt",
              "Hư",
              "Mất",
              "Khách chịu",
              "Giá chốt (đ)",
              "Bồi thường (đ)",
            ]}
            rows={rows.map((row) => [
              row.name,
              row.issued,
              row.good,
              row.damaged,
              row.lost,
              row.charged,
              row.price,
              row.charged * row.price,
            ])}
          />
        }
      />
      {saved ? (
        <Alert tone="info">Đang sửa bản nháp lưu lúc {saved.savedAt}.</Alert>
      ) : null}
      <CountReportTable rows={rows} onChange={setRows} />
      <p className={problems > 0 ? "field-error" : "text-small text-soft"}>
        {problems > 0
          ? `Còn ${problems} dòng chưa khớp: tốt + hư + mất phải bằng số đã xuất, khách chịu không vượt hư + mất.`
          : "Tất cả các dòng đã khớp. Hư do nhân viên ghi khách chịu bằng 0."}
      </p>

      <div className="l-grid l-grid-2">
        <section className="card l-stack">
          <h3 className="card-title card-title-flush">Người lập và ghi chú</h3>
          <TextField
            id="count-counter"
            label="Người kiểm đếm"
            value={counter}
            onChange={(event) => setCounter(event.target.value)}
            error={submitted ? errors.counter : null}
          />
          <TextareaField
            id="count-note"
            label="Ghi chú"
            placeholder="2 bát sứ vỡ khi khách dọn bàn"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <PhotoGalleryField
            id={`count-photos-${meal.id}`}
            label="Ảnh dụng cụ hư, mất"
            photos={photos}
            onChange={setPhotos}
            max={10}
            hint="Làm căn cứ khi tính bồi thường với khách."
          />
        </section>
        <section className="card l-stack">
          <h3 className="card-title card-title-flush">
            Đại diện khách xác nhận
          </h3>
          <TextField
            id="count-customer"
            label="Họ tên đại diện khách"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            error={submitted ? errors.customerName : null}
          />
          <SignaturePad
            id={`count-signature-${meal.id}`}
            label={
              needsSignature
                ? `Chữ ký đồng ý bồi thường ${formatMoney(compensation)}`
                : "Chữ ký (không bắt buộc khi không có bồi thường)"
            }
            value={signature}
            onChange={setSignature}
            error={submitted ? errors.signature : null}
            hint="Khách ký trên điện thoại hoặc máy tính bảng của thủ kho."
          />
        </section>
      </div>

      <div className="form-actions">
        <Button
          onClick={() => {
            persist(COUNT_REPORT_STATUS.Draft);
            showToast(
              "Đã lưu nháp biên bản. Có thể sửa tiếp trước khi xác nhận."
            );
          }}
        >
          Lưu nháp
        </Button>
        <Button variant="primary" onClick={confirm}>
          Xác nhận biên bản và báo khách
        </Button>
      </div>
    </>
  );
}
