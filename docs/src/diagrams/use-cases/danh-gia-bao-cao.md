# Đánh giá và báo cáo

Quy tắc BR tại [đặc tả](../../specification.md). [Danh mục UC](../index.md) là chỉ mục duy nhất. Quy ước bước: `Na` luồng thay thế, `Ne` ngoại lệ tại bước N.

## UC-CS-01

| Trường | Nội dung |
| --- | --- |
| Tên | Ghi nhận đánh giá sau bữa |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Mục tiêu | Lưu phản hồi của người đặt cho bữa đã hoàn tất. |
| Kích hoạt | Người đặt muốn đánh giá. |
| Tiền điều kiện | Bữa HoanTat, thuộc hồ sơ khách, chưa có đánh giá. |
| Hậu điều kiện | Một đánh giá gắn đúng bữa, lưu người nhập thực tế. |
| Quan hệ | Điểm vào từ UC-DT-06. |
| Quy tắc | BR14 |

**Luồng chính**

1. Khách chọn bữa HoanTat trong lịch sử đặt.
2. Khách nhập điểm 1–5, nhận xét.
3. Hệ thống kiểm tra, lưu đánh giá, người nhập.

**Luồng thay thế**

- 1a. Tư vấn nhập hộ: chọn bữa theo hồ sơ khách, nhập ý kiến người đặt; lưu tư vấn là người nhập.

**Ngoại lệ**

- 3e. Bữa chưa hoàn tất, đã có đánh giá hoặc không thuộc hồ sơ: không tạo.

## UC-BC-01

| Trường | Nội dung |
| --- | --- |
| Tên | Xem dashboard và cảnh báo |
| Tác nhân | Nhân viên nội bộ |
| Mục tiêu | Thấy việc cần xử lý và cảnh báo trong phạm vi vai trò. |
| Kích hoạt | Đăng nhập nội bộ hoặc mở dashboard. |
| Tiền điều kiện | Đã đăng nhập tài khoản nội bộ. |
| Hậu điều kiện | Hiển thị danh sách việc, dẫn tới hồ sơ tương ứng; không thay đổi dữ liệu. |
| Quan hệ | Điểm vào các UC xử lý. |
| Quy tắc | BR07, BR11, BR12, BR13 |

**Luồng chính**

1. Hệ thống xác định vai trò người dùng.
2. Hệ thống tổng hợp khối theo vai trò:
   - Tư vấn: đơn chờ khảo sát/nhận, hợp đồng chờ ký/cọc sắp hết hạn, phụ lục chờ.
   - Kế toán: chờ cọc, chờ quyết toán, khoản phải hoàn, kỳ nguyên liệu chờ chốt.
   - Thủ kho: bữa sắp tới cần xuất, bữa chờ kiểm đếm, dụng cụ dưới tồn tối thiểu.
   - Quản lý nhân sự: bữa sắp tới thiếu phân công so với gợi ý.
   - Quản lý cơ sở: tất cả khối, đợt đề xuất giá chưa xử lý.
3. Hệ thống hiển thị lịch tiệc sắp tới (ngày/tuần) và các khối.
4. Người dùng chọn mục, chuyển tới UC tương ứng.

**Luồng thay thế**

- 2a. Không có mục nào: hiển thị trống.

**Ngoại lệ**

- 1e. Tài khoản khách: không truy cập dashboard nội bộ.

## UC-BC-02

| Trường | Nội dung |
| --- | --- |
| Tên | Xem báo cáo doanh thu và food cost |
| Tác nhân | Quản lý cơ sở, Kế toán |
| Mục tiêu | Xem doanh thu, thu/hoàn, food cost, lãi theo nguyên liệu, tình hình đơn, đánh giá theo kỳ. |
| Kích hoạt | Cần xem kết quả kinh doanh. |
| Tiền điều kiện | Đã đăng nhập đúng quyền. |
| Hậu điều kiện | Hiển thị báo cáo; không thay đổi dữ liệu. |
| Quan hệ | Dùng kết quả UC-KHO-03. |
| Quy tắc | BR06, BR11, BR14 |

**Luồng chính**

1. Người dùng chọn khoảng thời gian (tháng/quý/năm hoặc từ–đến), lọc loại tiệc (tùy chọn).
2. Hệ thống tổng hợp doanh thu bữa đã thực hiện theo ngày phục vụ, tách món/dịch vụ/bồi thường.
3. Hệ thống tổng hợp tiền thu, tiền hoàn, tiền giữ lại do hủy.
4. Hệ thống lấy kỳ nguyên liệu đã chốt: chi phí tiêu thụ, food cost, lãi theo nguyên liệu = doanh thu món − chi phí.
5. Hệ thống tổng hợp số đơn theo trạng thái, tỷ lệ hủy, điểm đánh giá trung bình.
6. Hệ thống hiển thị bảng, biểu đồ.

**Luồng thay thế**

- 4a. Tháng chưa chốt: food cost, lãi hiển thị "chưa xác định".

**Ngoại lệ**

- 1e. Từ ngày sau đến ngày: yêu cầu chọn lại.

## UC-BC-03

| Trường | Nội dung |
| --- | --- |
| Tên | Xem báo cáo dụng cụ |
| Tác nhân | Quản lý cơ sở, Thủ kho |
| Mục tiêu | Xem tồn dụng cụ, loại dưới ngưỡng, hao hụt và bồi thường theo kỳ. |
| Kích hoạt | Cần xem tình trạng kho dụng cụ. |
| Tiền điều kiện | Đã đăng nhập đúng quyền. |
| Hậu điều kiện | Hiển thị báo cáo; không thay đổi dữ liệu. |
| Quan hệ | Dữ liệu từ UC-KHO-05 đến UC-KHO-08. |
| Quy tắc | BR13 |

**Luồng chính**

1. Người dùng chọn khoảng thời gian.
2. Hệ thống hiển thị từng loại: sở hữu, sẵn sàng, đang sử dụng, hư, tồn tối thiểu, cờ dưới ngưỡng.
3. Hệ thống tổng hợp trong kỳ: lượng nhập mua, hư, mất, phục hồi, loại bỏ; tiền bồi thường khách chịu.

**Luồng thay thế**

- 2a. Lọc chỉ loại dưới ngưỡng.

**Ngoại lệ**

- 1e. Khoảng ngày sai: yêu cầu chọn lại.
