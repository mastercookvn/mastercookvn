import { describe, expect, it } from "vitest";

import { canViewScreen, visibleTabs } from "./permissions";
import { ROLE } from "./roles";

describe("role filtering", () => {
  it("shows a consultant only their contract tabs", () => {
    expect(
      visibleTabs("contractDetail", [ROLE.Consultant]).map((tab) => tab.value),
    ).toEqual(["overview", "addendum", "cancel"]);
  });

  it("merges tabs for a member with two roles", () => {
    expect(
      visibleTabs("contracts", [ROLE.Consultant, ROLE.Accountant]),
    ).toHaveLength(3);
  });

  it("gives the branch manager every tab", () => {
    expect(visibleTabs("ingredients", [ROLE.BranchManager])).toHaveLength(5);
    expect(canViewScreen("catalog", [ROLE.BranchManager])).toBe(true);
  });

  it("hides manager-only screens from other roles", () => {
    expect(canViewScreen("catalog", [ROLE.Accountant])).toBe(false);
    expect(visibleTabs("ingredients", [ROLE.Storekeeper])).toHaveLength(2);
  });
});
