---
order: 10
---

# Đặc tả Use Case

## UC-CS-01

| Trường         | Nội dung                                           |
| -------------- | -------------------------------------------------- |
| Tên            | Ghi nhận đánh giá sau Meal                          |
| Tác nhân       | Customer, Consultant                       |
| Mục tiêu       | Lưu phản hồi của người đặt cho Meal đã hoàn tất.    |
| Kích hoạt      | Người đặt muốn đánh giá.                           |
| Tiền điều kiện | Meal HoanTat, thuộc Customer Profile, chưa có đánh giá.  |
| Hậu điều kiện  | Một đánh giá gắn đúng Meal, lưu người nhập thực tế. |
| Quan hệ        | Điểm vào từ UC-DT-06.                              |
| Quy tắc        | BR14                                               |

**Luồng chính**

1. Customer chọn Meal HoanTat trong lịch sử đặt.
2. Customer nhập điểm 1–5, nhận xét.
3. Hệ thống kiểm tra, lưu đánh giá, người nhập.

**Luồng thay thế**

- 1a. Consultant nhập hộ: chọn Meal theo Customer Profile, nhập ý kiến người đặt; lưu Consultant là người nhập.

**Ngoại lệ**

- 3e. Meal chưa hoàn tất, đã có đánh giá hoặc không thuộc hồ sơ: không tạo.

## UC-BC-01

| Trường         | Nội dung                                                                  |
| -------------- | ------------------------------------------------------------------------- |
| Tên            | Xem dashboard và cảnh báo                                                 |
| Tác nhân       | Internal Staff                                                          |
| Mục tiêu       | Thấy việc cần xử lý và cảnh báo trong phạm vi Role.                    |
| Kích hoạt      | Đăng nhập nội bộ hoặc mở dashboard.                                       |
| Tiền điều kiện | Đã đăng nhập Account nội bộ.                                            |
| Hậu điều kiện  | Hiển thị danh sách việc, dẫn tới hồ sơ tương ứng; không thay đổi dữ liệu. |
| Quan hệ        | Điểm vào các UC xử lý.                                                    |
| Quy tắc        | BR07, BR11, BR12, BR13                                                    |

**Luồng chính**

1. Hệ thống xác định Role người dùng.
2. Hệ thống tổng hợp khối theo Role:
   - Consultant: Order chờ khảo sát/nhận, Contract chờ ký/Deposit sắp hết hạn, Addendum chờ.
   - Accountant: chờ Deposit, chờ Settlement, khoản phải hoàn, kỳ Ingredient chờ chốt.
   - Storekeeper: Meal sắp tới cần xuất, Meal chờ kiểm đếm, Equipment dưới tồn tối thiểu.
   - HR Manager: Meal sắp tới thiếu Staff Assignment so với gợi ý.
   - Branch Manager: tất cả khối, đợt đề xuất giá chưa xử lý.
3. Hệ thống hiển thị lịch tiệc sắp tới (ngày/tuần) và các khối.
4. Người dùng chọn mục, chuyển tới UC tương ứng.

**Luồng thay thế**

- 2a. Không có mục nào: hiển thị trống.

**Ngoại lệ**

- 1e. Account Customer: không truy cập dashboard nội bộ.

## UC-BC-02

| Trường         | Nội dung                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------ |
| Tên            | Xem báo cáo doanh thu và food cost                                                         |
| Tác nhân       | Branch Manager, Accountant                                                                     |
| Mục tiêu       | Xem doanh thu, thu/hoàn, food cost, Ingredient Margin, tình hình Order, đánh giá theo kỳ. |
| Kích hoạt      | Cần xem kết quả kinh doanh.                                                                |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                                                   |
| Hậu điều kiện  | Hiển thị báo cáo; không thay đổi dữ liệu.                                                  |
| Quan hệ        | Dùng kết quả UC-KHO-03.                                                                    |
| Quy tắc        | BR06, BR11, BR14                                                                           |

**Luồng chính**

1. Người dùng chọn khoảng thời gian (tháng/quý/năm hoặc từ–đến), lọc Event Type (tùy chọn).
2. Hệ thống tổng hợp doanh thu Meal đã thực hiện theo ngày phục vụ, tách Dish/dịch vụ/bồi thường.
3. Hệ thống tổng hợp tiền thu, tiền hoàn, tiền giữ lại do hủy.
4. Hệ thống lấy kỳ Ingredient đã chốt: chi phí tiêu thụ, food cost, Ingredient Margin = doanh thu Dish − chi phí.
5. Hệ thống tổng hợp số Order theo trạng thái, tỷ lệ hủy, điểm đánh giá trung bình.
6. Hệ thống hiển thị bảng, biểu đồ.

**Luồng thay thế**

- 4a. Tháng chưa chốt: food cost, lãi hiển thị "chưa xác định".

**Ngoại lệ**

- 1e. Từ ngày sau đến ngày: yêu cầu chọn lại.

## UC-BC-03

| Trường         | Nội dung                                                          |
| -------------- | ----------------------------------------------------------------- |
| Tên            | Xem báo cáo Equipment                                               |
| Tác nhân       | Branch Manager, Storekeeper                                            |
| Mục tiêu       | Xem tồn Equipment, loại dưới ngưỡng, hao hụt và bồi thường theo kỳ. |
| Kích hoạt      | Cần xem tình trạng kho Equipment.                                   |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                          |
| Hậu điều kiện  | Hiển thị báo cáo; không thay đổi dữ liệu.                         |
| Quan hệ        | Dữ liệu từ UC-KHO-05 đến UC-KHO-08.                               |
| Quy tắc        | BR13                                                              |

**Luồng chính**

1. Người dùng chọn khoảng thời gian.
2. Hệ thống hiển thị từng loại: sở hữu, sẵn sàng, đang sử dụng, hư, tồn tối thiểu, cờ dưới ngưỡng.
3. Hệ thống tổng hợp trong kỳ: lượng nhập mua, hư, mất, phục hồi, loại bỏ; tiền bồi thường Customer chịu.

**Luồng thay thế**

- 2a. Lọc chỉ loại dưới ngưỡng.

**Ngoại lệ**

- 1e. Khoảng ngày sai: yêu cầu chọn lại.
