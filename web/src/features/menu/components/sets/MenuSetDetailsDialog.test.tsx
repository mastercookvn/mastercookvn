import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { dishById, MENU_SETS } from "@/mocks/catalog";

import { MenuSetDetailsDialog } from "./MenuSetDetailsDialog";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe("MenuSetDetailsDialog", () => {
  it("lists every dish of the set when opened", async () => {
    const user = userEvent.setup();
    const [set] = MENU_SETS;
    render(<MenuSetDetailsDialog set={set} />);

    await user.click(
      screen.getByRole("button", {
        name: `Xem chi tiết ${set.dishIds.length} món`,
      })
    );

    const dialog = await screen.findByRole("dialog", { name: set.name });
    for (const id of set.dishIds) {
      expect(dialog).toHaveTextContent(dishById(id).name);
    }
    expect(
      screen.getByRole("button", { name: /Tính giá với set này/ })
    ).toBeInTheDocument();
  });
});
