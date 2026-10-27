# Nhân sự

Các quy tắc dẫn mã BR được duy trì tại [đặc tả](../../specification.md). [Danh mục UC](../index.md) là chỉ mục duy nhất.

## UC-NS-01

| Trường | Nội dung |
| --- | --- |
| ID | UC-NS-01 |
| Tên | Quản lý hồ sơ nhân sự |
| Mô tả | Lưu nhân sự cố định/thời vụ để phân công, kể cả người không có tài khoản. |
| Tác nhân | Quản lý nhân sự |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Có nhân viên mới hoặc thay đổi hồ sơ. |
| Điều kiện trước | Đã đăng nhập đúng quyền. |
| Luồng chính | Nhập tên, SĐT, cố định/thời vụ, vị trí và trạng thái; lưu; tra lịch sử phân công. |
| Luồng thay thế | Ngưng làm: hiển thị các phân công tương lai để người quản lý đổi người. |
| Ngoại lệ | Không nhận phân công mới cho người đã ngưng làm. |
| Điều kiện sau | Hồ sơ sẵn sàng dùng để phân công, không bắt buộc tài khoản. |
| Quy tắc | BR02, BR12 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-NS-02

| Trường | Nội dung |
| --- | --- |
| ID | UC-NS-02 |
| Tên | Phân công nhân sự theo bữa |
| Mô tả | Giao nhiệm vụ và khung làm việc cho từng người theo từng bữa. |
| Tác nhân | Quản lý nhân sự |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Hợp đồng có hiệu lực, cần chuẩn bị một bữa. |
| Điều kiện trước | Có hồ sơ nhân sự đang làm. |
| Luồng chính | Xem số bàn bố trí và gợi ý phục vụ; chọn người/vị trí, nhập nhiệm vụ và khung làm việc; kiểm tra chồng lấn; lưu; liên hệ nhân viên ngoài hệ thống. |
| Luồng thay thế | Điều chỉnh số người thủ công; đổi người bằng sửa phân công. |
| Ngoại lệ | Trùng giờ hoặc người ngưng làm: yêu cầu chọn người khác. |
| Điều kiện sau | Có lịch phân công riêng từng bữa. |
| Quy tắc | BR12 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |
