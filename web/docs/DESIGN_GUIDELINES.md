# Quy tắc thiết kế

Mục tiêu: giao diện sang trọng, thanh lịch của một dịch vụ tiệc nấu sẵn Việt Nam, đúng theo Prototype 5.11. Không dùng bố cục mẫu hay giá trị ước lượng.

## Căn chỉnh

- Prototype 5.11 (PDF và bản HTML đính kèm trong PDF) là nguồn chuẩn. Khoảng cách, cỡ chữ và lưới lấy từ prototype, không ước lượng bằng mắt.
- Khi design có giá trị lặp lại, đưa vào token trong `src/app/globals.css` thay vì viết giá trị tuỳ ý như `mt-[37px]`.
- Kiểm tra bằng cách đặt ảnh chụp trang cạnh prototype ở các độ rộng 390, 768, 1280 và 1440px. Người làm phải tự duyệt, không dừng ở việc build qua.

## Những điều không được có

- Icon từ thư viện, emoji, hay icon của trình duyệt (mũi tên select, nút tăng giảm số).
- Gradient tím/xanh, chữ gradient, nền blob mờ, hiệu ứng kính.
- Bóng cứng, viền đậm, bo góc lớn. Nút bo 2 px, thẻ bo 3 px, không đổ bóng.
- Mascot ngoài logo.
- Câu chữ nói nấu tại chỗ, nấu tại nhà khách. Mô hình là nấu sẵn tại bếp rồi mang đến.
- Các mục trong danh sách "Những gì UI không được có" ở mục 1 của prototype.

## Độ đậm chữ

Tiêu đề lớn dùng 600, tiêu đề trang quản lý dùng 700, nhãn và nút dùng 600, nội dung dùng 400. Không dùng 300 vì chữ nhợt, khó đọc. Khác với mục 2.4 của prototype theo yêu cầu đã chốt.

## Thang chữ trang quản trị

Nội dung 15 px, bảng 14,5 px, tiêu đề cột và chữ phụ 13,5 đến 14 px, nhãn trạng thái 13 px, tiêu đề thẻ 17 px, tiêu đề trang 24 px, số KPI 22 đến 24 px. Sidebar rộng 248 px.

Nhãn trạng thái chỉ dùng màu nền và màu chữ, không có chấm tròn. Hai điểm này khác mục 2.6 và 2.8 của prototype theo yêu cầu đã chốt.

## Hệ thống đã cài

| Thành phần  | Lựa chọn                                         | Ghi chú                                                                                                                    |
| ----------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Màu         | Token trong `globals.css`                        | Theo mục 2.3 và 2.8. Đã xoá bảng màu mặc định của Tailwind. Vùng quản lý ghi đè token dưới `[data-surface="workspace"]`.   |
| Cỡ chữ      | Token `--text-*`, tên theo px (`text-14-5`)      | Khi thêm cỡ mới, cập nhật cả `src/lib/utils.ts`.                                                                           |
| Font        | Be Vietnam Pro 400, 500, 600, 700                | Chỉ một họ chữ.                                                                                                            |
| Icon        | 44 icon tự vẽ trong `@/components/icons`         | Mỗi icon một file. ESLint chặn các thư viện icon.                                                                          |
| Logo        | `Logo`, `LogoMark` trong `components/brand`      | Nhận `tone` light hoặc dark.                                                                                               |
| Kiểu dáng   | CSS đặt cạnh chức năng và tiện ích Tailwind      | `features/<chức năng>/<chức năng>.css`, `components/ui/ui.css`. `globals.css` import tất cả.                               |
| Primitive   | Base UI (`@base-ui/react`)                       | Hiện dùng cho `Dialog`.                                                                                                    |
| Biến thể    | `cva` và `cn()`                                  |                                                                                                                            |
| Chuyển động | CSS và IntersectionObserver, `components/motion` | M01 đến M14 theo mục 3. Không thêm thư viện. Trạng thái ẩn chỉ bật khi script đã chạy; tôn trọng `prefers-reduced-motion`. |

## Thêm icon

Tạo `src/components/icons/TenIcon.tsx` trên lưới 24 px, thêm một dòng vào `index.ts`, rồi dùng:

```tsx
import { BowlIcon } from "@/components/icons";

<BowlIcon size={24} />;
```

Nét chính theo `currentColor`, nét phụ dùng `--icon-accent` (vàng ở trang khách, cùng màu nét ở trang quản lý).
