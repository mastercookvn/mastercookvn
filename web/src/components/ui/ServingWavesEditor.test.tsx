import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ServingWavesEditor } from "./ServingWavesEditor";

describe("ServingWavesEditor", () => {
  it("labels every field and shows 24-hour times", () => {
    render(
      <ServingWavesEditor
        idPrefix="test"
        waves={[{ from: "18:00", to: "21:00", tables: 8 }]}
        guestsPerTable={10}
        onChange={vi.fn()}
      />
    );

    expect(screen.getByLabelText("Từ")).toHaveTextContent("18:00");
    expect(screen.getByLabelText("Đến")).toHaveTextContent("21:00");
    expect(screen.getByLabelText("Số bàn")).toHaveValue(8);
    expect(screen.getByText("80 khách")).toBeInTheDocument();
  });
});
