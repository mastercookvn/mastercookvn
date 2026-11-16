import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { EventDatePicker } from "./EventDatePicker";

describe("EventDatePicker", () => {
  it("lays the month out in week rows with one tab stop", () => {
    render(<EventDatePicker id="date" value="28/11/2026" onChange={vi.fn()} />);

    expect(screen.getAllByRole("row")).toHaveLength(7);
    const selected = screen.getByRole("gridcell", { selected: true });
    expect(selected).toHaveAttribute("tabindex", "0");
    expect(
      screen
        .getAllByRole("gridcell")
        .filter((cell) => cell.getAttribute("tabindex") === "0")
    ).toHaveLength(1);
  });

  it("offers the leap month only in a year that has it", () => {
    render(<EventDatePicker id="date" value="28/11/2026" onChange={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Âm lịch" }));

    expect(
      screen.getByRole("checkbox", { name: /Tháng nhuận/ })
    ).toBeDisabled();
  });

  it("stores the solar date of the picked day", () => {
    const onChange = vi.fn();
    render(
      <EventDatePicker id="date" value="28/11/2026" onChange={onChange} />
    );

    fireEvent.click(
      screen.getByRole("gridcell", { name: /^Chủ nhật, 29\/11/ })
    );

    expect(onChange).toHaveBeenCalledWith("29/11/2026");
  });
});
