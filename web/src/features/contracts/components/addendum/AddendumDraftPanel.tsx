"use client";

import { useState } from "react";

import { CheckIcon, CloseIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { MoneyRow } from "@/components/ui/MoneyRow";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { SelectField } from "@/components/ui/SelectField";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { ADDENDUM_STATUS, type AddendumStatus } from "@/constants/statuses";
import {
  CHECK_RESULT,
  evaluateAddendum,
  maxTableReduction,
} from "@/lib/addendum";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { DISHES, dishById, menuSetById, menuSetPrice } from "@/mocks/catalog";
import { daysUntil, type Contract, type Meal } from "@/mocks/contracts";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import { OPERATION_MEALS } from "@/mocks/operationMeals";

import { addedTablesShortages } from "@/features/contracts/lib/addendumResources";

const NO_CHANGE = "none";

const ADDENDUM_STEP = {
  Draft: 0,
  AwaitingCustomer: 1,
  AwaitingDeposit: 2,
  Applied: 3,
} as const;

type AddendumStep = (typeof ADDENDUM_STEP)[keyof typeof ADDENDUM_STEP];

const STEP_STATUS: Record<AddendumStep, AddendumStatus> = {
  [ADDENDUM_STEP.Draft]: ADDENDUM_STATUS.Pending,
  [ADDENDUM_STEP.AwaitingCustomer]: ADDENDUM_STATUS.Pending,
  [ADDENDUM_STEP.AwaitingDeposit]: ADDENDUM_STATUS.AwaitingExtraDeposit,
  [ADDENDUM_STEP.Applied]: ADDENDUM_STATUS.Applied,
};

const CHECK_ICON = {
  [CHECK_RESULT.Pass]: <CheckIcon size={15} />,
  [CHECK_RESULT.Fail]: <CloseIcon size={15} />,
  [CHECK_RESULT.NotNeeded]: <span aria-hidden="true">–</span>,
};

const CHECK_LABEL = {
  [CHECK_RESULT.Pass]: "Đạt",
  [CHECK_RESULT.Fail]: "Không đạt",
  [CHECK_RESULT.NotNeeded]: "Không áp dụng",
};

export function AddendumDraftPanel({
  contract,
  meal,
}: {
  contract: Contract;
  meal: Meal;
}) {
  const showToast = useToast();
  const SET = menuSetById(meal.setId);
  const daysLeft = daysUntil(meal.startsAt);
  const staff = useDemoState((state) => state.staff);
  const equipment = useDemoState((state) => state.equipment);
  const assignments = useDemoState((state) => state.assignments);
  const applied = useDemoState(
    (state) => state.appliedAddenda[contract.number]
  );
  const customerConfirmed = useDemoState((state) => state.addendumConfirmed);
  const [tablesAfter, setTablesAfter] = useState(
    applied?.tables ?? meal.servingTables + 5
  );
  const [dishOut, setDishOut] = useState(NO_CHANGE);
  const [dishIn, setDishIn] = useState(NO_CHANGE);
  const [localStep, setStep] = useState<AddendumStep>(ADDENDUM_STEP.Draft);

  // Other meals the same day hold their staff; this meal's own crew stays available.
  const busyStaff = OPERATION_MEALS.filter(
    (other) =>
      other.date === meal.date.slice(0, 5) &&
      other.orderCode !== contract.orderCode
  ).flatMap((other) => (assignments[other.id] ?? []).map((row) => row.staff));
  const resourceShortages = addedTablesShortages({
    waves: meal.waves,
    guestsPerTable: meal.guestsPerTable,
    added: tablesAfter - meal.servingTables,
    staff,
    busyStaff,
    equipment,
  });

  const swapping = dishOut !== NO_CHANGE && dishIn !== NO_CHANGE;
  const evaluation = evaluateAddendum({
    daysLeft,
    dishesTotal: menuSetPrice(SET),
    guestsPerTable: meal.guestsPerTable,
    services: meal.services,
    tablesBefore: meal.servingTables,
    tablesAfter,
    dishSwapDelta: swapping
      ? dishById(dishIn).price - dishById(dishOut).price
      : null,
    hasOtherPendingAddendum: false,
    surcharge: meal.price.surcharge,
    lockedTotal: meal.price.total,
    resourceShortages,
  });
  // The customer may confirm from their own page; an applied addendum is kept.
  const step: AddendumStep = applied
    ? ADDENDUM_STEP.Applied
    : customerConfirmed && localStep < ADDENDUM_STEP.AwaitingDeposit
      ? evaluation.needsExtraDeposit
        ? ADDENDUM_STEP.AwaitingDeposit
        : ADDENDUM_STEP.Applied
      : localStep;
  const locked = step !== ADDENDUM_STEP.Draft;

  const apply = () => {
    updateDemoState({
      appliedAddenda: {
        ...readDemoState().appliedAddenda,
        [contract.number]: {
          tables: tablesAfter,
          total: evaluation.totalAfter,
        },
      },
    });
    setStep(ADDENDUM_STEP.Applied);
  };

  const flow = [
    { title: "Lập phụ lục", hint: "Tư vấn ghi trước, sau, chênh lệch" },
    {
      title: "Khách xác nhận",
      hint: "Online bằng tài khoản hoặc upload bản ký giấy",
    },
    {
      title: "Cọc bổ sung",
      hint: evaluation.needsExtraDeposit
        ? `50% phần tăng: ${formatMoney(evaluation.extraDeposit)}`
        : `Không cần, tăng không quá ${BUSINESS_SETTINGS.extraDepositTableThreshold} bàn`,
      skipped: !evaluation.needsExtraDeposit,
    },
    {
      title: "Áp dụng",
      hint: "Cập nhật bữa và giữ tài nguyên; bữa khác giữ nguyên",
    },
  ];

  const confirmByCustomer = () => {
    const next = evaluation.needsExtraDeposit
      ? ADDENDUM_STEP.AwaitingDeposit
      : ADDENDUM_STEP.Applied;
    updateDemoState({ addendumConfirmed: true });
    if (next === ADDENDUM_STEP.Applied) apply();
    else setStep(next);
    showToast(
      next === ADDENDUM_STEP.Applied
        ? "Khách đã xác nhận, phụ lục được áp dụng vào bữa"
        : "Khách đã xác nhận, chờ thu cọc bổ sung"
    );
  };

  return (
    <>
      <PanelHeader
        title="Sửa hợp đồng bằng phụ lục"
        subtitle={`${contract.number} · ${meal.name} · Bữa ${meal.date} · Còn ${daysLeft} ngày`}
        actions={<StatusBadge domain="addendum" status={STEP_STATUS[step]} />}
      />

      <ol className="addendum-flow" aria-label="Các bước sửa hợp đồng">
        {flow.map((item, index) => (
          <li
            key={item.title}
            className={cn(
              index < step && "is-done",
              index === step && "is-active",
              item.skipped && "is-skipped"
            )}
            aria-current={index === step ? "step" : undefined}
          >
            <span className="addendum-flow-mark">
              {index < step ? <CheckIcon size={13} /> : index + 1}
            </span>
            <span>
              <b>{item.title}</b>
              <small>{item.hint}</small>
            </span>
          </li>
        ))}
      </ol>

      <div className="l-grid l-grid-2 items-start">
        <section className="card l-stack">
          <h3 className="card-title card-title-flush">Nội dung thay đổi</h3>
          <TextField
            id="addendum-tables"
            label="Số bàn ăn mới"
            type="number"
            min={1}
            disabled={locked}
            value={tablesAfter}
            onChange={(event) => setTablesAfter(Number(event.target.value))}
            hint={`Ký ban đầu ${meal.servingTables} bàn. Giảm tối đa ${maxTableReduction(meal.servingTables)} bàn.`}
          />
          <div className="l-grid l-grid-2">
            <SelectField
              id="addendum-dish-out"
              label="Đổi món"
              disabled={locked}
              options={[
                { value: NO_CHANGE, label: "Không đổi" },
                ...SET.dishIds.map((id) => ({
                  value: id,
                  label: dishById(id).name,
                })),
              ]}
              value={dishOut}
              onValueChange={setDishOut}
            />
            <SelectField
              id="addendum-dish-in"
              label="Thay bằng"
              disabled={locked || dishOut === NO_CHANGE}
              options={[
                { value: NO_CHANGE, label: "Chọn món" },
                ...DISHES.filter((dish) => !SET.dishIds.includes(dish.id)).map(
                  (dish) => ({
                    value: dish.id,
                    label: `${dish.name} · ${formatMoney(dish.price)}`,
                  })
                ),
              ]}
              value={dishIn}
              onValueChange={setDishIn}
            />
          </div>

          <ul className="addendum-checks" aria-label="Kiểm tra điều kiện sửa">
            {evaluation.checks.map((check) => (
              <li key={check.key} className={`is-${check.result}`}>
                <span
                  className="addendum-check-mark"
                  aria-label={CHECK_LABEL[check.result]}
                >
                  {CHECK_ICON[check.result]}
                </span>
                <span>
                  <b>{check.label}</b>
                  <small>{check.detail}</small>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card l-stack">
          <h3 className="card-title card-title-flush">Trước và sau</h3>
          <table className="addendum-compare">
            <thead>
              <tr>
                <th />
                <th>Trước</th>
                <th>Sau</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Số bàn ăn</th>
                <td>{meal.servingTables}</td>
                <td
                  className={cn(
                    tablesAfter !== meal.servingTables && "is-changed"
                  )}
                >
                  {tablesAfter}
                </td>
              </tr>
              <tr>
                <th>Món</th>
                <td>{swapping ? dishById(dishOut).name : "Giữ nguyên"}</td>
                <td className={cn(swapping && "is-changed")}>
                  {swapping ? dishById(dishIn).name : "Giữ nguyên"}
                </td>
              </tr>
              <tr>
                <th>Giá trị bữa</th>
                <td>{formatMoney(evaluation.totalBefore)}</td>
                <td className="is-changed">
                  {formatMoney(evaluation.totalAfter)}
                </td>
              </tr>
            </tbody>
          </table>
          <MoneyRow
            label="Chênh lệch"
            value={formatMoney(evaluation.difference)}
          />
          <MoneyRow
            label={
              evaluation.needsExtraDeposit
                ? "Cọc bổ sung 50% phần tăng"
                : "Cọc bổ sung"
            }
            value={formatMoney(evaluation.extraDeposit)}
            total
          />
          {evaluation.difference < 0 ? (
            <Alert tone="info">
              Giá trị giảm: phần dư không hoàn ngay, được trừ khi quyết toán
              bữa.
            </Alert>
          ) : null}
          <p className="text-small text-soft">
            Bữa và tài nguyên chỉ đổi khi phụ lục được áp dụng. Trước đó hợp
            đồng vẫn chạy theo bản đã ký.
          </p>

          <div className="l-row justify-end gap-2">
            {step === ADDENDUM_STEP.Draft ? (
              <>
                <Button
                  onClick={() => {
                    setTablesAfter(meal.servingTables);
                    setDishOut(NO_CHANGE);
                    setDishIn(NO_CHANGE);
                  }}
                >
                  Bỏ thay đổi
                </Button>
                <Button
                  variant="primary"
                  disabled={!evaluation.canSend}
                  onClick={() => {
                    setStep(ADDENDUM_STEP.AwaitingCustomer);
                    showToast("Đã gửi phụ lục, chờ khách xác nhận");
                  }}
                >
                  Gửi phụ lục cho khách
                </Button>
              </>
            ) : null}
            {step === ADDENDUM_STEP.AwaitingCustomer ? (
              <>
                <Button
                  onClick={() => {
                    setStep(ADDENDUM_STEP.Draft);
                    showToast("Đã hủy phụ lục, bữa giữ nguyên", "info");
                  }}
                >
                  Khách không đồng ý, hủy
                </Button>
                <Button onClick={confirmByCustomer}>Upload bản ký giấy</Button>
                <Button variant="primary" onClick={confirmByCustomer}>
                  Khách đã xác nhận online
                </Button>
              </>
            ) : null}
            {step === ADDENDUM_STEP.AwaitingDeposit ? (
              <Button
                variant="primary"
                onClick={() => {
                  apply();
                  showToast("Đã đủ cọc bổ sung, phụ lục được áp dụng");
                }}
              >
                Ghi nhận cọc bổ sung
              </Button>
            ) : null}
            {step === ADDENDUM_STEP.Applied ? (
              <Alert tone="good">
                Phụ lục đã áp dụng: bữa {meal.date} còn {tablesAfter} bàn ăn.
              </Alert>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
}
