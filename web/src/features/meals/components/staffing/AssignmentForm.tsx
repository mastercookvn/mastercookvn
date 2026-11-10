"use client";

import { useState } from "react";

import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { useToast } from "@/components/ui/Toast";
import {
  readDemoState,
  updateDemoState,
  useDemoState,
} from "@/mocks/demoStore";
import { STAFF_POSITIONS, type OperationMeal } from "@/mocks/operationMeals";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const toMinutes = (time: string) =>
  Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

export function AssignmentForm({
  formId,
  meal,
  onSaved,
}: {
  formId: string;
  meal: OperationMeal;
  onSaved: () => void;
}) {
  const showToast = useToast();
  const staffList = useDemoState((state) => state.staff);
  const staffOptions = staffList
    .filter((member) => member.active)
    .map((member) => `${member.name} · ${member.position}`);
  const [staff, setStaff] = useState(staffOptions[0]);
  const [position, setPosition] = useState(STAFF_POSITIONS[0]);
  const [task, setTask] = useState("");
  const [from, setFrom] = useState(meal.time.slice(0, 5));
  const [to, setTo] = useState(meal.time.slice(6));
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    const staffName = staff.split(" · ")[0];
    if (!TIME.test(from) || !TIME.test(to)) {
      setError("Giờ làm theo dạng HH:MM, ví dụ 09:00.");
      return;
    }
    if (toMinutes(to) <= toMinutes(from)) {
      setError("Giờ kết thúc phải sau giờ bắt đầu.");
      return;
    }
    const current = readDemoState().assignments[meal.id] ?? [];
    const clash = current.find((row) => {
      if (row.staff !== staffName) return false;
      const [start, end] = row.hours.split("–");
      return (
        toMinutes(from) < toMinutes(end) && toMinutes(start) < toMinutes(to)
      );
    });
    if (clash) {
      setError(`${staffName} đã có ca ${clash.hours} ở bữa này.`);
      return;
    }

    updateDemoState({
      assignments: {
        ...readDemoState().assignments,
        [meal.id]: [
          {
            staff: staffName,
            position,
            task: task.trim() || "Chưa ghi",
            hours: `${from}–${to}`,
          },
          ...current,
        ],
      },
    });
    showToast(
      `Đã phân công ${staffName}. Báo nhân viên qua Zalo hoặc điện thoại.`
    );
    onSaved();
  };

  return (
    <form
      id={formId}
      className="l-stack"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <SelectField
        id="assign-staff"
        label="Nhân viên đang làm"
        options={staffOptions}
        value={staff}
        onValueChange={(value) => setStaff(value)}
      />
      <div className="l-grid l-grid-2">
        <SelectField
          id="assign-position"
          label="Vị trí"
          options={STAFF_POSITIONS}
          value={position}
          onValueChange={(value) => setPosition(value)}
        />
        <TextField
          id="assign-task"
          label="Nhiệm vụ"
          placeholder="Khu B"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <TextField
          id="assign-from"
          label="Từ"
          inputMode="numeric"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
        />
        <TextField
          id="assign-to"
          label="Đến"
          inputMode="numeric"
          value={to}
          onChange={(event) => setTo(event.target.value)}
        />
      </div>
      {error ? <span className="field-error">{error}</span> : null}
    </form>
  );
}
