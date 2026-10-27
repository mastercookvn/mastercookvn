# Mô tả sơ đồ use case tổng quát

## Mục đích

Thể hiện ranh giới MasterCookVN, tác nhân và quan hệ giữa UC. Mã/tên/tác nhân làm gốc tại [chỉ mục](./index.md). Vẽ một sơ đồ tổng quát theo gói, cộng một sơ đồ con cho mỗi gói.

## Tác nhân

| Tác nhân | Loại | Ghi chú |
| --- | --- | --- |
| Khách hàng | Người | Không đăng nhập vẫn xem/tạm tính được (UC-DT-01). |
| Nhân viên nội bộ | Trừu tượng | Cha của các vai trò nội bộ; dùng cho UC-TK-02, UC-BC-01. |
| Nhân viên tư vấn | Người, kế thừa Nhân viên nội bộ | |
| Kế toán | Người, kế thừa Nhân viên nội bộ | |
| Thủ kho | Người, kế thừa Nhân viên nội bộ | |
| Quản lý nhân sự | Người, kế thừa Nhân viên nội bộ | |
| Quản lý cơ sở | Người, kế thừa Tư vấn, Kế toán, Thủ kho, Quản lý nhân sự | Dùng được mọi UC nội bộ; chỉ nối trực tiếp UC riêng của quản lý. |
| Dịch vụ thanh toán | Hệ thống ngoài | Chỉ tham gia UC-HD-03; chưa chốt nhà cung cấp. |

Không vẽ nhà cung cấp, nhân viên không tài khoản, Zalo, bản đồ, thời tiết, lịch chạy tự động thành tác nhân.

## Gói và UC

| Gói | UC |
| --- | --- |
| Tài khoản | UC-TK-01 → UC-TK-03 |
| Danh mục | UC-DM-01 → UC-DM-07 |
| Đặt tiệc | UC-DT-01 → UC-DT-06 |
| Hợp đồng và thanh toán | UC-HD-01 → UC-HD-08 |
| Nhân sự và vận hành | UC-NS-01, UC-NS-02, UC-VH-01 |
| Nguyên liệu và dụng cụ | UC-KHO-01 → UC-KHO-08 |
| Đánh giá và báo cáo | UC-CS-01, UC-BC-01 → UC-BC-03 |

## Quan hệ include/extend

| Quan hệ | Từ | Đến | Ghi chú |
| --- | --- | --- | --- |
| include | UC-DT-05 Xác nhận nhận đơn | UC-DT-04 Kiểm tra khả năng phục vụ | Luôn kiểm tra trước khi giữ |
| include | UC-HD-05 Điều chỉnh bằng phụ lục | UC-DT-04 Kiểm tra khả năng phục vụ | Khi tăng bàn |
| extend | Đặt hộ | UC-DT-02 Tạo đơn | Điểm mở rộng: tư vấn tạo đơn cho khách |
| extend | UC-HD-04 Thanh toán thủ công | UC-HD-03 Thanh toán online | Thay thế khi trả tiền mặt/chuyển khoản trực tiếp; có thể vẽ là UC song song nếu GV không chấp nhận extend |
| extend | UC-HD-07 Ghi nhận hoàn tiền | UC-HD-06 Hủy | Chỉ khi có khoản phải hoàn |
| extend | UC-HD-07 Ghi nhận hoàn tiền | UC-HD-08 Quyết toán | Khi số dư âm |

Kiểm tra hết hạn giữ chỗ, tính tiền, tạo đợt đề xuất giá là xử lý bên trong UC, không vẽ hệ thống làm actor của chính nó.
