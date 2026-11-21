import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OnBehalfOrderForm } from "./OnBehalfOrderForm";

describe("OnBehalfOrderForm", () => {
  it("switches the meal to trays like the customer booking", () => {
    render(<OnBehalfOrderForm formId="behalf" onSaved={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Đặt mâm" }));

    expect(screen.getByLabelText("Số mâm")).toHaveValue(10);
    expect(screen.getByLabelText("Giờ giao mâm")).toHaveTextContent("17:30");
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

  it("shows a wrong phone, name or address as soon as it is typed", async () => {
    const user = userEvent.setup();
    const onSaved = vi.fn();
    render(<OnBehalfOrderForm formId="behalf" onSaved={onSaved} />);

    const phone = screen.getByLabelText("Số điện thoại");
    await user.clear(phone);
    await user.type(phone, "0903 12a");
    expect(
      await screen.findByText("Số điện thoại chỉ gồm chữ số.")
    ).toBeInTheDocument();
    expect(phone).toHaveAttribute("aria-invalid", "true");

    const name = screen.getByLabelText("Họ tên");
    await user.clear(name);
    await user.type(name, "Đức 9");
    expect(
      await screen.findByText("Họ tên chỉ gồm chữ cái và khoảng trắng.")
    ).toBeInTheDocument();

    const address = screen.getByLabelText("Địa chỉ tổ chức");
    await user.type(address, "12 Lê Lợi");
    await user.clear(address);
    await waitFor(() =>
      expect(address).toHaveAccessibleDescription("Vui lòng nhập địa chỉ.")
    );

    fireEvent.submit(phone.closest("form") as HTMLFormElement);
    expect(onSaved).not.toHaveBeenCalled();
  });
});
