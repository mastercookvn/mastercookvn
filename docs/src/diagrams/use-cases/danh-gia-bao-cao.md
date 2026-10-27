# Đánh giá và báo cáo

Các quy tắc dẫn mã BR được duy trì tại [đặc tả](../../specification.md). [Danh mục UC](../index.md) là chỉ mục duy nhất.

## UC-CS-01

| Trường | Nội dung |
| --- | --- |
| ID | UC-CS-01 |
| Tên | Ghi nhận đánh giá sau bữa |
| Mô tả | Lưu phản hồi của người đặt cho một bữa đã hoàn tất. |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Người đặt muốn đánh giá bữa đã hoàn tất. |
| Điều kiện trước | Bữa thuộc hồ sơ khách, đã hoàn tất và chưa có đánh giá. |
| Luồng chính | Chọn bữa; nhập điểm 1–5 và nhận xét; lưu khách đánh giá cùng tài khoản nhập. |
| Luồng thay thế | Tư vấn nhập hộ theo ý kiến người đặt. |
| Ngoại lệ | Bữa chưa hoàn tất, đã có đánh giá hoặc sai chủ hồ sơ: không tạo. |
| Điều kiện sau | Một đánh giá được gắn đúng bữa. |
| Quy tắc | BR14 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-BC-01

| Trường | Nội dung |
| --- | --- |
| ID | UC-BC-01 |
| Tên | Xem dashboard và cảnh báo |
| Mô tả | Tổng hợp các hồ sơ cần xử lý và cảnh báo trong phạm vi quyền. |
| Tác nhân | Quản lý cơ sở, Nhân viên tư vấn, Kế toán, Thủ kho, Quản lý nhân sự |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Nhân viên cần xem công việc hiện tại. |
| Điều kiện trước | Đã đăng nhập; dữ liệu theo quyền từng vai trò. |
| Luồng chính | Tổng hợp tiệc sắp tới, chờ ký/cọc/quyết toán, thiếu nhân sự, dụng cụ dưới ngưỡng; loại giữ chỗ quá hạn; hiển thị và dẫn đến hồ sơ. |
| Luồng thay thế | Kiểm tra bù đợt giá tháng trên server khi vào chức năng nội bộ. |
| Ngoại lệ | Không gửi email/Zalo hoặc tạo lịch nhắc tự động. |
| Điều kiện sau | Người dùng thấy công việc/cảnh báo trong quyền. |
| Quy tắc | BR05, BR07, BR11, BR12, BR13 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-BC-02

| Trường | Nội dung |
| --- | --- |
| ID | UC-BC-02 |
| Tên | Xem báo cáo kinh doanh |
| Mô tả | Đánh giá doanh thu và lãi theo nguyên liệu từ các kỳ có dữ liệu xác định. |
| Tác nhân | Quản lý cơ sở, Kế toán |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Cần xem doanh thu, nguyên liệu và kết quả theo kỳ. |
| Điều kiện trước | Có dữ liệu đơn, bữa, giao dịch và kỳ nguyên liệu. |
| Luồng chính | Chọn kỳ; tổng hợp doanh thu bữa theo ngày phục vụ, thu/hoàn và tiền giữ do hủy riêng; dùng kỳ đã chốt để tính food cost/lãi nguyên liệu; hiển thị hao hụt và đánh giá. |
| Luồng thay thế | Kỳ chưa chốt chỉ hiển thị số liệu tạm/chưa xác định food cost; không tính chi phí thực tế từng bữa từ phiếu mua chung. |
| Ngoại lệ | Khoảng ngày sai: yêu cầu chọn lại; không chia 0 và không tính cọc chưa phục vụ thành doanh thu món. |
| Điều kiện sau | Có báo cáo trong phạm vi ghi nhận, không gọi lãi nguyên liệu là lợi nhuận ròng. |
| Quy tắc | BR06, BR11, BR14 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |
