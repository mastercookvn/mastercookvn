import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { Dish, MenuSet } from "@/models/catalog";

import { MenuSetDetailsDialog } from "./MenuSetDetailsDialog";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe("MenuSetDetailsDialog", () => {
  it("lists every dish of the set when opened", async () => {
    const user = userEvent.setup();
    const dishes: Dish[] = [
      {
        id: "goi",
        name: "Gỏi ngó sen",
        category: "appetizer",
        price: 300000,
        description: "",
      },
      {
        id: "ga",
        name: "Gà hấp lá chanh",
        category: "main",
        price: 400000,
        description: "",
      },
    ];
    const set: MenuSet = {
      id: "set",
      name: "Set thử",
      suitableFor: "Họp mặt",
      description: "",
      dishIds: dishes.map((dish) => dish.id),
      imageDishId: "ga",
    };
    render(<MenuSetDetailsDialog set={set} dishes={dishes} price={700000} />);

    await user.click(
      screen.getByRole("button", {
        name: `Xem chi tiết ${set.dishIds.length} món`,
      })
    );

    const dialog = await screen.findByRole("dialog", { name: set.name });
    for (const dish of dishes) {
      expect(dialog).toHaveTextContent(dish.name);
    }
    expect(
      screen.getByRole("button", { name: /Tính giá với set này/ })
    ).toBeInTheDocument();
  });
});
