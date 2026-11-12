# Nhân sự và vận hành

## UC-NS-01

| Trường         | Nội dung                                                                           |
| -------------- | ---------------------------------------------------------------------------------- |
| Tên            | Quản lý hồ sơ nhân sự                                                              |
| Tác nhân       | Quản lý nhân sự                                                                    |
| Mục tiêu       | Có danh sách nhân sự cố định/thời vụ để phân công, kể cả người không có tài khoản. |
| Kích hoạt      | Có nhân viên mới hoặc thay đổi hồ sơ.                                              |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                                           |
| Hậu điều kiện  | Hồ sơ dùng được cho phân công.                                                     |
| Quan hệ        | Độc lập UC-TK-03 (hồ sơ ≠ tài khoản).                                              |
| Quy tắc        | BR02, BR12                                                                         |

**Luồng chính**

1. Quản lý nhân sự nhập tên, SĐT, loại (cố định/thời vụ), vị trí (bếp, phục vụ, vận chuyển...).
2. Hệ thống kiểm tra SĐT, lưu hồ sơ trạng thái đang làm.
3. Quản lý nhân sự xem danh sách, lịch sử phân công của từng người.

**Luồng thay thế**

- 1a. Sửa hồ sơ: đổi thông tin/vị trí, lưu.
- 1b. Ngưng làm: hệ thống liệt kê phân công tương lai của người đó để đổi người (UC-NS-02); người ngưng không nhận việc mới.

**Ngoại lệ**

- 2e. Thiếu tên/SĐT hoặc SĐT trùng hồ sơ nhân sự khác: không lưu.

## UC-NS-02

| Trường         | Nội dung                                                       |
| -------------- | -------------------------------------------------------------- |
| Tên            | Phân công nhân sự theo bữa                                     |
| Tác nhân       | Quản lý nhân sự                                                |
| Mục tiêu       | Giao người, vị trí, khung giờ cho từng bữa.                    |
| Kích hoạt      | Hợp đồng có hiệu lực, bữa cần chuẩn bị.                        |
| Tiền điều kiện | Bữa DaXacNhan; có hồ sơ nhân sự đang làm.                      |
| Hậu điều kiện  | Bữa có danh sách phân công; nhân viên được báo ngoài hệ thống. |
| Quan hệ        | —                                                              |
| Quy tắc        | BR12                                                           |

**Luồng chính**

1. Quản lý nhân sự chọn bữa từ dashboard/lịch tiệc.
2. Hệ thống hiển thị bàn bố trí, gợi ý định mức nhân sự: phục vụ = ceil(bàn bố trí / 3) (TS42), bếp = max(2, ceil(bàn ăn / 5)) (TS43), bốc vác = 2 người / 10 bàn có rạp (TS44); hiển thị nhu cầu dự kiến theo vị trí và số đã phân công.
3. Quản lý nhân sự chọn người, vị trí, nhiệm vụ, giờ bắt đầu/kết thúc (giờ bắt đầu trước giờ tiệc ít nhất 3 giờ chuẩn bị theo TS35).
4. Hệ thống kiểm tra người đang làm, không trùng khung giờ, đảm bảo giờ làm việc ≤ 12h/ngày (TS40) và nghỉ giữa 2 ca liên tiếp ≥ 8h (TS41).
5. Hệ thống lưu phân công.
6. Quản lý nhân sự báo nhân viên qua Zalo/điện thoại.

**Luồng thay thế**

- 3a. Lặp bước 3–5 tới khi đủ; số người được lệch gợi ý, không chặn.
- 3b. Đổi người: sửa phân công, kiểm tra lại bước 4.
- 3c. Bỏ phân công: xóa dòng, lượng thiếu hiện lại trên dashboard.

**Ngoại lệ**

- 4e. Trùng giờ, vượt trần 12h làm/ngày (TS40), nghỉ giữa ca < 8h (TS41), hoặc người ngưng làm: yêu cầu chọn người khác.

## UC-VH-01

| Trường         | Nội dung                                                                           |
| -------------- | ---------------------------------------------------------------------------------- |
| Tên            | Cập nhật tiến độ bữa                                                               |
| Tác nhân       | Nhân viên tư vấn, Thủ kho                                                          |
| Mục tiêu       | Ghi bữa đang chuẩn bị, đang phục vụ, đã kết thúc để kích hoạt bước kho/quyết toán. |
| Kích hoạt      | Bữa bắt đầu chuẩn bị, bắt đầu hoặc kết thúc phục vụ.                               |
| Tiền điều kiện | Bữa DaXacNhan hoặc đang ở bước tiến độ trước.                                      |
| Hậu điều kiện  | Bữa chuyển DangChuanBi → DangPhucVu → ChoKiemDem/ChoQuyetToan.                     |
| Quan hệ        | Trước UC-KHO-06, sau là UC-KHO-07 hoặc UC-HD-08.                                   |
| Quy tắc        | BR11, BR13                                                                         |

**Luồng chính**

1. Người dùng mở bữa.
2. Hệ thống hiển thị trạng thái hiện tại và bước tiếp theo hợp lệ.
3. Người dùng chọn bước tiếp: bắt đầu chuẩn bị / bắt đầu phục vụ / kết thúc phục vụ.
4. Hệ thống lưu thời điểm, người cập nhật, chuyển trạng thái.
5. Kết thúc phục vụ: bữa có phiếu xuất thì ChoKiemDem, không thì ChoQuyetToan.

**Luồng thay thế**

- 3a. Khách hủy trước khi bắt đầu phục vụ: chuyển UC-HD-06.

**Ngoại lệ**

- 3e. Nhảy bước hoặc lùi trạng thái: không cho.
- 3f. Bắt đầu phục vụ khi hợp đồng chưa hiệu lực: không cho.
