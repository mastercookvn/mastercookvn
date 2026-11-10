"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "./Button";

const STROKE_WIDTH = 2.2;
const INK = "#1d1d1b";

/**
 * Draw-to-sign box for mouse, pen and finger. Reports a PNG data URL, or null
 * once cleared. The canvas keeps a 2:1 ratio and redraws crisply on HiDPI.
 */
export function SignaturePad({
  id,
  label,
  value,
  onChange,
  hint,
  error,
}: {
  id: string;
  label: string;
  value: string | null;
  onChange: (image: string | null) => void;
  hint?: string;
  error?: string | null;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [empty, setEmpty] = useState(value === null);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const ratio = window.devicePixelRatio || 1;
    element.width = element.clientWidth * ratio;
    element.height = element.clientHeight * ratio;
    const context = element.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);
    context.lineWidth = STROKE_WIDTH;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = INK;
    if (value) {
      const image = new Image();
      image.onload = () =>
        context.drawImage(
          image,
          0,
          0,
          element.clientWidth,
          element.clientHeight
        );
      image.src = value;
    }
    // Only on mount: later strokes are drawn directly, not replayed from value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const clear = () => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    context.clearRect(0, 0, element.width, element.height);
    setEmpty(true);
    onChange(null);
  };

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className={error ? "signature-pad has-error" : "signature-pad"}>
        <canvas
          id={id}
          ref={canvas}
          role="img"
          aria-label={empty ? `${label}: chưa ký` : `${label}: đã ký`}
          onPointerDown={(event) => {
            const context = event.currentTarget.getContext("2d");
            if (!context) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            drawing.current = true;
            const { x, y } = point(event);
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + 0.1, y + 0.1);
            context.stroke();
          }}
          onPointerMove={(event) => {
            if (!drawing.current) return;
            const context = event.currentTarget.getContext("2d");
            if (!context) return;
            const { x, y } = point(event);
            context.lineTo(x, y);
            context.stroke();
          }}
          onPointerUp={(event) => {
            if (!drawing.current) return;
            drawing.current = false;
            setEmpty(false);
            onChange(event.currentTarget.toDataURL("image/png"));
          }}
        />
        {empty ? (
          <span className="signature-placeholder">Ký tại đây</span>
        ) : null}
        <span className="signature-line" aria-hidden="true" />
      </div>
      <div className="l-between">
        {error ? (
          <span className="field-error">{error}</span>
        ) : (
          <span className="field-hint">
            {hint ?? "Dùng chuột, bút cảm ứng hoặc ngón tay."}
          </span>
        )}
        <Button size="sm" variant="text" disabled={empty} onClick={clear}>
          Ký lại
        </Button>
      </div>
    </div>
  );
}
