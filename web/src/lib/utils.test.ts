import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("lets the last conflicting utility win", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("keeps a custom text size alongside a text colour", () => {
    expect(cn("text-14-5", "text-ink")).toBe("text-14-5 text-ink");
  });

  it("merges custom text sizes with each other", () => {
    expect(cn("text-display", "text-heading")).toBe("text-heading");
  });
});
