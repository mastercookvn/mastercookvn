# Đặt tiệc

Các quy tắc dẫn mã BR được duy trì tại [đặc tả](../../specification.md). [Danh mục UC](../index.md) là chỉ mục duy nhất.

## UC-DT-01

| Trường | Nội dung |
| --- | --- |
| ID | UC-DT-01 |
| Tên | Xem danh mục và tạm tính |
| Mô tả | Giúp khách chọn món và biết chi phí dự kiến trước khi gửi đơn. |
| Tác nhân | Khách hàng |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Khách tham khảo dịch vụ. |
| Điều kiện trước | Không bắt buộc đăng nhập. |
| Luồng chính | Xem món/set/dịch vụ/chính sách; chọn bàn ăn, người/bàn và dịch vụ; server tính tổng dự kiến từng bữa và tổng đơn. |
| Luồng thay thế | Chọn set có sẵn hoặc thực đơn tự chọn. |
| Ngoại lệ | Thực đơn tự chọn dưới 6 món hoặc món ngưng: hiển thị yêu cầu sửa. |
| Điều kiện sau | Hiển thị giá dự kiến, chưa giữ chỗ hoặc tạo hợp đồng. |
| Quy tắc | BR03, BR04 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-DT-02

| Trường | Nội dung |
| --- | --- |
| ID | UC-DT-02 |
| Tên | Tạo đơn nhiều bữa hoặc đặt hộ |
| Mô tả | Lưu một yêu cầu đặt gồm nhiều bữa vào đúng hồ sơ khách. |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Khách quyết định đặt tiệc. |
| Điều kiện trước | Khách tự đặt đã đăng nhập; đặt hộ cần tư vấn đăng nhập. |
| Luồng chính | Tìm/tạo hồ sơ bằng tên và SĐT; thêm từng bữa với thời gian, địa điểm, bàn ăn, bàn ghế, thực đơn, dịch vụ; tính tiền; gửi đơn chờ xác nhận. |
| Luồng thay thế | Đặt hộ không tạo tài khoản; khách đăng ký sau được liên kết. Nháp chưa gửi chỉ ở trình duyệt. |
| Ngoại lệ | Thiếu thông tin hoặc ngày quá khứ: không gửi, chỉ rõ bữa cần sửa. |
| Điều kiện sau | Đơn và các bữa lưu ở server, chưa giữ chỗ. |
| Quy tắc | BR01, BR02, BR03, BR04 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-DT-03

| Trường | Nội dung |
| --- | --- |
| ID | UC-DT-03 |
| Tên | Khảo sát và xác nhận nhận tiệc |
| Mô tả | Xác định khả năng nhận toàn đơn và phát hành một hợp đồng chung. |
| Tác nhân | Nhân viên tư vấn, Quản lý cơ sở |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Có đơn chờ xác nhận. |
| Điều kiện trước | Đơn đã gửi, chưa hủy. |
| Luồng chính | Ghi Q&A, ghi chú và khoảng cách mỗi bữa; nhập khung tài nguyên và nhu cầu nhân sự dự kiến theo vị trí; hệ thống kiểm tra dụng cụ, nhân sự giữa mọi bữa và các đơn khác; xác nhận nhận; chốt giá, phát hành hợp đồng, giữ tạm 24 giờ. |
| Luồng thay thế | Cần trao đổi thêm: giữ đơn chờ xác nhận. Từ chối: ghi lý do. |
| Ngoại lệ | Ngoài 20 km hoặc thiếu tài nguyên: không xác nhận cho tới khi điều chỉnh/bổ sung. |
| Điều kiện sau | Một hợp đồng nhiều bữa chờ ký/cọc hoặc đơn bị từ chối kèm lý do. |
| Quy tắc | BR01, BR04, BR07, BR12, BR13 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |
