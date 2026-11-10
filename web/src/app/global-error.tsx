"use client";

// Replaces the root layout, so global styles and fonts are unavailable.
export default function GlobalError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <html lang="vi">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem" }}>
        <title>Đã có lỗi xảy ra</title>
        <h1>Đã có lỗi xảy ra</h1>
        <p>Bạn vui lòng thử lại sau ít phút.</p>
        <button type="button" onClick={retry}>
          Thử lại
        </button>
      </body>
    </html>
  );
}
