"use client";

import { useState } from "react";

import { CloseIcon, PlusIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { Select } from "@/components/ui/Select";
import { ServingWavesList } from "@/components/ui/ServingWavesList";
import { useToast } from "@/components/ui/Toast";
import {
  STAFF_POSITIONS,
  STAFF_POSITION,
  STAFFING_RULES,
  type StaffPosition,
} from "@/constants/staffing";
import { MEAL_STATUS } from "@/constants/statuses";
import { waveTotals } from "@/lib/servingWaves";
import {
  proposeStaffing,
  staffingDemand,
  staffingErrors,
  type PlannedShift,
} from "@/lib/staffingPlan";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import {
  OPERATION_MEALS,
  type Assignment,
  type OperationMeal,
} from "@/mocks/operationMeals";
import { STAFF_TYPES } from "@/mocks/people";

import { MealStageNotice } from "../MealStageNotice";

const NO_ASSIGNMENTS: Assignment[] = [];

const CLOSED_STAGES: string[] = [
  MEAL_STATUS.AwaitingCount,
  MEAL_STATUS.AwaitingSettlement,
  MEAL_STATUS.Completed,
];

const PERMANENT = STAFF_TYPES[0];

function demandReason(position: StaffPosition, meal: OperationMeal) {
  const { setupTables } = waveTotals(meal.waves);
  if (position === STAFF_POSITION.Server) {
    return `${setupTables} bàn bố trí ÷ ${STAFFING_RULES.tablesPerServer}`;
  }
  if (position === STAFF_POSITION.Cook) {
    return `${meal.guests} khách ÷ ${STAFFING_RULES.guestsPerCook}`;
  }
  if (position === STAFF_POSITION.Driver) {
    return `${setupTables} bàn ÷ ${STAFFING_RULES.setupTablesPerDriver}`;
  }
  return "1 người mỗi bữa";
}

export function StaffingPanel({ meal }: { meal: OperationMeal }) {
  const status = useDemoState((state) => state.mealStatuses[meal.id]);
  const saved = useDemoState(
    (state) => state.assignments[meal.id] ?? NO_ASSIGNMENTS
  );

  if (CLOSED_STAGES.includes(status)) {
    return (
      <MealStageNotice message="Bữa đã kết thúc, phân công chỉ còn để xem lại." />
    );
  }

  return (
    <StaffingEditor key={JSON.stringify(saved)} meal={meal} saved={saved} />
  );
}

function StaffingEditor({
  meal,
  saved,
}: {
  meal: OperationMeal;
  saved: Assignment[];
}) {
  const showToast = useToast();
  const allAssignments = useDemoState((state) => state.assignments);
  const staff = useDemoState((state) => state.staff);

  const busy = OPERATION_MEALS.filter(
    (other) => other.id !== meal.id && other.date === meal.date
  ).flatMap((other) => allAssignments[other.id] ?? []);

  const propose = () =>
    proposeStaffing({
      waves: meal.waves,
      guestsPerTable: meal.guestsPerTable,
      staff: staff.map((member) => ({
        ...member,
        permanent: member.type === PERMANENT,
      })),
      busy,
    });

  const [draft, setDraft] = useState<PlannedShift[]>(() =>
    saved.length ? saved : propose()
  );
  const [submitted, setSubmitted] = useState(false);

  const demand = staffingDemand(meal.waves, meal.guestsPerTable);
  const errors = staffingErrors(draft, busy);
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const isProposal = saved.length === 0;

  const staffOptions = staff
    .filter((member) => member.active)
    .map((member) => ({
      value: member.name,
      label: `${member.name} · ${member.position}`,
    }));

  const update = (index: number, patch: Partial<PlannedShift>) =>
    setDraft(draft.map((row, i) => (i === index ? { ...row, ...patch } : row)));

  const save = () => {
    setSubmitted(true);
    if (errors.length) return;
    updateDemoState({
      assignments: { ...readDemoState().assignments, [meal.id]: draft },
    });
    showToast(
      `Đã lưu ${draft.length} phân công. Báo nhân viên qua Zalo hoặc điện thoại.`
    );
  };

  return (
    <>
      <PanelHeader
        title="Phân công nhân sự"
        count={draft.length}
        subtitle="Hệ thống đề xuất theo số khách, số lượt đãi và số bàn mỗi lượt. Điều chỉnh lại nếu chưa hợp lý rồi lưu."
        actions={
          <Button
            onClick={() => {
              setDraft(propose());
              setSubmitted(false);
              showToast("Đã đề xuất lại theo quy mô bữa", "info");
            }}
          >
            Đề xuất lại
          </Button>
        }
      />

      <section className="staffing-basis">
        <div className="staffing-basis-waves">
          <h3>Căn cứ đề xuất</h3>
          <ServingWavesList
            waves={meal.waves}
            guestsPerTable={meal.guestsPerTable}
          />
        </div>
        <ul className="staffing-demand">
          {STAFF_POSITIONS.map((position) => {
            const filled = draft.filter(
              (row) => row.position === position && row.staff
            ).length;
            const needed = demand[position];
            return (
              <li key={position}>
                <span>{position}</span>
                <b>
                  {filled}
                  <small> / {needed}</small>
                </b>
                <small>{demandReason(position, meal)}</small>
                {filled < needed ? (
                  <Badge tone="wait">Thiếu {needed - filled}</Badge>
                ) : (
                  <Badge tone="good">Đủ</Badge>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {isProposal ? (
        <Alert tone="info">
          Đây là bản đề xuất, chưa lưu. Đổi người, giờ hoặc nhiệm vụ nếu cần rồi
          bấm Lưu phân công.
        </Alert>
      ) : null}

      <div className="staffing-plan">
        <div className="staffing-plan-head" aria-hidden="true">
          <span>Vị trí</span>
          <span>Nhân viên</span>
          <span>Nhiệm vụ</span>
          <span>Từ</span>
          <span>Đến</span>
          <span />
        </div>
        <ol>
          {draft.map((row, index) => {
            const [from = "", to = ""] = row.hours.split("–");
            const profile = staff.find((member) => member.name === row.staff);
            return (
              <li key={index} className="staffing-plan-row">
                <Select
                  aria-label={`Dòng ${index + 1} vị trí`}
                  options={STAFF_POSITIONS}
                  value={row.position}
                  onValueChange={(position) => update(index, { position })}
                />
                <div className="l-stack min-w-0 gap-0.5">
                  <Select
                    aria-label={`Dòng ${index + 1} nhân viên`}
                    options={staffOptions}
                    placeholder="Chưa có người, chọn"
                    value={row.staff}
                    onValueChange={(name) => update(index, { staff: name })}
                  />
                  {profile && profile.position !== row.position ? (
                    <small className="text-soft">
                      Hồ sơ ghi vị trí {profile.position}
                    </small>
                  ) : null}
                </div>
                <input
                  className="input"
                  aria-label={`Dòng ${index + 1} nhiệm vụ`}
                  value={row.task}
                  onChange={(event) =>
                    update(index, { task: event.target.value })
                  }
                />
                <input
                  type="time"
                  className="input"
                  aria-label={`Dòng ${index + 1} bắt đầu`}
                  value={from}
                  onChange={(event) =>
                    update(index, { hours: `${event.target.value}–${to}` })
                  }
                />
                <input
                  type="time"
                  className="input"
                  aria-label={`Dòng ${index + 1} kết thúc`}
                  value={to}
                  onChange={(event) =>
                    update(index, { hours: `${from}–${event.target.value}` })
                  }
                />
                <Button
                  size="sm"
                  variant="text"
                  aria-label={`Bỏ dòng ${index + 1}`}
                  onClick={() => setDraft(draft.filter((_, i) => i !== index))}
                >
                  <CloseIcon size={16} />
                </Button>
              </li>
            );
          })}
        </ol>
        <div>
          <Button
            size="sm"
            onClick={() =>
              setDraft([
                ...draft,
                {
                  staff: "",
                  position: STAFF_POSITION.Server,
                  task: "",
                  hours: draft.at(-1)?.hours ?? meal.time,
                },
              ])
            }
          >
            <PlusIcon size={16} />
            Thêm người
          </Button>
        </div>
      </div>

      {submitted && errors.length ? (
        <Alert tone="error">
          <ul className="l-stack gap-0.5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </Alert>
      ) : null}

      <div className="staffing-actions">
        <span className="text-small text-soft">
          {dirty ? "Có thay đổi chưa lưu." : "Đã lưu."} Gợi ý không chặn cứng,
          chỉ chặn trùng giờ.
        </span>
        <div className="l-row gap-2">
          {dirty && !isProposal ? (
            <Button
              onClick={() => {
                setDraft(saved);
                setSubmitted(false);
              }}
            >
              Hoàn tác
            </Button>
          ) : null}
          <Button variant="primary" disabled={!dirty} onClick={save}>
            Lưu phân công
          </Button>
        </div>
      </div>
    </>
  );
}
