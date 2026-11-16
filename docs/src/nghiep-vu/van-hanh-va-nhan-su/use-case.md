---
order: 10
---

# Đặc tả Use Case

## UC-NS-01

| Trường         | Nội dung                                                                           |
| -------------- | ---------------------------------------------------------------------------------- |
| Tên            | Quản lý Staff Profile                                                              |
| Tác nhân       | HR Manager                                                                    |
| Mục tiêu       | Có danh sách nhân sự cố định/thời vụ để tạo Staff Assignment, kể cả người không có Account. |
| Kích hoạt      | Có Staff Member mới hoặc thay đổi hồ sơ.                                              |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                                           |
| Hậu điều kiện  | Hồ sơ dùng được cho Staff Assignment.                                                     |
| Quan hệ        | Độc lập UC-TK-03 (hồ sơ ≠ Account).                                              |
| Quy tắc        | BR02, BR12                                                                         |

**Luồng chính**

1. HR Manager nhập tên, SĐT, loại (cố định/thời vụ), vị trí (bếp, phục vụ, vận chuyển...).
2. Hệ thống kiểm tra SĐT, lưu hồ sơ trạng thái đang làm.
3. HR Manager xem danh sách, lịch sử Staff Assignment của từng người.

**Luồng thay thế**

- 1a. Sửa hồ sơ: đổi thông tin/vị trí, lưu.
- 1b. Ngưng làm: hệ thống liệt kê Staff Assignment tương lai của người đó để đổi người (UC-NS-02); người ngưng không nhận việc mới.

**Ngoại lệ**

- 2e. Thiếu tên/SĐT hoặc SĐT trùng Staff Profile khác: không lưu.

## UC-NS-02

| Trường         | Nội dung                                                       |
| -------------- | -------------------------------------------------------------- |
| Tên            | Staff Assignment theo Meal                                     |
| Tác nhân       | HR Manager                                                |
| Mục tiêu       | Giao người, vị trí, khung giờ cho từng Meal.                    |
| Kích hoạt      | Contract có hiệu lực, Meal cần chuẩn bị.                        |
| Tiền điều kiện | Meal DaXacNhan; có Staff Profile đang làm.                      |
| Hậu điều kiện  | Meal có danh sách Staff Assignment; Staff Member được báo ngoài hệ thống. |
| Quan hệ        | —                                                              |
| Quy tắc        | BR12                                                           |

**Luồng chính**

1. HR Manager chọn Meal từ dashboard/lịch tiệc.
2. Hệ thống hiển thị Setup Table, gợi ý định mức nhân sự: phục vụ = ceil(Setup Table / 3) (TS22), bếp = max(2, ceil(Serving Table / 5)) (TS23), bốc vác = 2 người / 10 bàn có rạp (TS24); hiển thị nhu cầu dự kiến theo vị trí và số Staff Assignment đã tạo.
3. HR Manager chọn người, vị trí, nhiệm vụ, giờ bắt đầu/kết thúc (giờ bắt đầu trước giờ tiệc ít nhất 3 giờ chuẩn bị theo TS18).
4. Hệ thống kiểm tra người đang làm, không trùng khung giờ, đảm bảo giờ làm việc ≤ 12h/ngày (TS20) và nghỉ giữa 2 ca liên tiếp ≥ 8h (TS21).
5. Hệ thống lưu Staff Assignment.
6. HR Manager báo Staff Member qua Zalo/điện thoại.

**Luồng thay thế**

- 3a. Lặp bước 3–5 tới khi đủ; số người được lệch gợi ý, không chặn.
- 3b. Đổi người: sửa Staff Assignment, kiểm tra lại bước 4.
- 3c. Xóa Staff Assignment: xóa dòng, lượng thiếu hiện lại trên dashboard.

**Ngoại lệ**

- 4e. Trùng giờ, vượt trần 12h làm/ngày (TS20), nghỉ giữa ca < 8h (TS21), hoặc người ngưng làm: yêu cầu chọn người khác.

## UC-VH-01

| Trường         | Nội dung                                                                           |
| -------------- | ---------------------------------------------------------------------------------- |
| Tên            | Cập nhật tiến độ Meal                                                               |
| Tác nhân       | Consultant, Storekeeper                                                          |
| Mục tiêu       | Ghi Meal đang chuẩn bị, đang phục vụ, đã kết thúc để kích hoạt bước kho/Settlement. |
| Kích hoạt      | Meal bắt đầu chuẩn bị, bắt đầu hoặc kết thúc phục vụ.                               |
| Tiền điều kiện | Meal DaXacNhan hoặc đang ở bước tiến độ trước.                                      |
| Hậu điều kiện  | Meal chuyển DangChuanBi → DangPhucVu → ChoKiemDem/ChoQuyetToan.                     |
| Quan hệ        | Trước UC-KHO-06, sau là UC-KHO-07 hoặc UC-HD-08.                                   |
| Quy tắc        | BR11, BR13                                                                         |

**Luồng chính**

1. Người dùng mở Meal.
2. Hệ thống hiển thị trạng thái hiện tại và bước tiếp theo hợp lệ.
3. Người dùng chọn bước tiếp: bắt đầu chuẩn bị / bắt đầu phục vụ / kết thúc phục vụ.
4. Hệ thống lưu thời điểm, người cập nhật, chuyển trạng thái.
5. Kết thúc phục vụ: Meal có phiếu xuất thì ChoKiemDem, không thì ChoQuyetToan.

**Luồng thay thế**

- 3a. Customer hủy trước khi bắt đầu phục vụ: chuyển UC-HD-06.

**Ngoại lệ**

- 3e. Nhảy bước hoặc lùi trạng thái: không cho.
- 3f. Bắt đầu phục vụ khi Contract chưa hiệu lực: không cho.
