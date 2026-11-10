import { describe, expect, it } from "vitest";

import { ROLE } from "@/constants/roles";
import { MEAL_STATUS } from "@/constants/statuses";

import { nextStepFor } from "./nextStep";

describe("nextStepFor", () => {
  it("sends the HR manager to staffing on a confirmed meal", () => {
    const step = nextStepFor(MEAL_STATUS.Confirmed, [ROLE.HrManager], false);
    expect(step.tab).toBe("staffing");
  });

  it("asks the storekeeper to issue equipment before serving", () => {
    const step = nextStepFor(MEAL_STATUS.Preparing, [ROLE.Storekeeper], false);
    expect(step.tab).toBe("issue");
  });

  it("offers to start serving once equipment is issued", () => {
    const step = nextStepFor(MEAL_STATUS.Preparing, [ROLE.Storekeeper], true);
    expect(step.actionLabel).toBe("Bắt đầu phục vụ");
  });

  it("gives no action to a role that cannot record progress", () => {
    const step = nextStepFor(MEAL_STATUS.Serving, [ROLE.HrManager], true);
    expect(step.actionLabel).toBeNull();
  });
});
