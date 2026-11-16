import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { OnBehalfOrderForm } from "./OnBehalfOrderForm";

describe("OnBehalfOrderForm", () => {
  it("switches the meal to trays like the customer booking", () => {
    render(<OnBehalfOrderForm formId="behalf" onSaved={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Đặt mâm" }));

    expect(screen.getByLabelText("Số mâm")).toHaveValue(8);
    expect(screen.getByLabelText("Giờ giao mâm")).toHaveTextContent("18:00");
    expect(screen.queryByText("Lượt đãi")).not.toBeInTheDocument();
  });

  it("lets staff pick dishes one by one instead of a set", () => {
    render(<OnBehalfOrderForm formId="behalf" onSaved={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Tự chọn món" }));

    expect(
      screen.getByRole("combobox", { name: "Tìm món để thêm vào thực đơn" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Set thực đơn")).not.toBeInTheDocument();
  });
});
