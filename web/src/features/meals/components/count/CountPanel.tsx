"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { LIVE_VALIDATION_MODE, personNameSchema } from "@/lib/validation";
import { readDemoState, updateDemoState, useDemoState } from "@/lib/demoStore";
import {
  COUNT_REPORT_STATUS,
  type CountReportStatus,
} from "@/constants/equipment";
import {
  countReportCompensation,
  equipmentDemand,
  type CountReport,
  type CountReportRow,
  type EquipmentType,
} from "@/models/equipment";
import type { OperationMeal } from "@/models/operations";

import { countRowProblem } from "../../lib/countRowProblem";
import { MealStageNotice } from "../MealStageNotice";

import { CountReportTable } from "./CountReportTable";

/**
 * Counting starts from "everything came back good"; staff only types the exceptions.
 * Issued quantities follow the formula until the issue slip records actual quantities.
 */
const blankRows = (
  equipment: readonly EquipmentType[],
  meal: OperationMeal
): CountReportRow[] =>
  equipment.map((item) => {
    const issued = equipmentDemand(item, meal.guests, meal.setupTables, 1);
    return {
      name: item.name,
      issued,
      good: issued,
      damaged: 0,
      lost: 0,
      charged: 0,
      price: item.compensation,
    };
  });

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

const countSignersSchema = z.object({
  counter: personNameSchema,
  customerName: personNameSchema,
  note: z.string().trim(),
});

export function CountPanel({ meal }: { meal: OperationMeal }) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);
  const saved = useDemoState((state) => state.countReports[meal.id]);
  const equipment = useDemoState((state) => state.equipment);
  const showToast = useToast();

  const [rows, setRows] = useState(
    () => saved?.rows ?? blankRows(equipment, meal)
  );
  const [photos, setPhotos] = useState<string[]>(saved?.photos ?? []);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: fieldErrors },
  } = useForm({
    resolver: zodResolver(countSignersSchema),
    mode: LIVE_VALIDATION_MODE,
    defaultValues: {
      counter: saved?.counter ?? "",
      customerName: saved?.customerName ?? "",
      note: saved?.note ?? "",
    },
  });
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
  const signatureError =
    needsSignature && !signature
      ? "Có bồi thường nên cần chữ ký đại diện khách"
      : null;

  const persist = (reportStatus: CountReportStatus) =>
    updateDemoState({
      countReports: {
        ...readDemoState().countReports,
        [meal.id]: {
          status: reportStatus,
          rows,
          photos,
          counter: getValues("counter").trim(),
          note: getValues("note").trim(),
          customerName: getValues("customerName").trim(),
          customerSignature: signature,
          savedAt: now(),
        },
      },
    });

  const confirm = handleSubmit(() => {
    if (problems > 0 || signatureError) return;
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
  });

  return (
    <>
      <PanelHeader
        title="Biên bản kiểm đếm"
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
            {...register("counter")}
            error={fieldErrors.counter?.message}
          />
          <TextareaField
            id="count-note"
            label="Ghi chú"
            placeholder="2 bát sứ vỡ khi khách dọn bàn"
            {...register("note")}
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
            {...register("customerName")}
            error={fieldErrors.customerName?.message}
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
            error={submitted ? signatureError : null}
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
        <Button
          variant="primary"
          onClick={(event) => {
            setSubmitted(true);
            void confirm(event);
          }}
        >
          Xác nhận biên bản và báo khách
        </Button>
      </div>
    </>
  );
}
