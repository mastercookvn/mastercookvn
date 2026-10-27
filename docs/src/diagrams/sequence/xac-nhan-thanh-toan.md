# Xác nhận, cọc và thanh toán

## Phạm vi

UC liên quan: UC-HD-02, UC-HD-03, UC-HD-04. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Thành phần

Khách/Tư vấn/Kế toán → giao diện → hợp đồng → thanh toán → dịch vụ thanh toán → giữ tài nguyên.

## Nội dung cần thể hiện

1. Đọc bản hợp đồng đã phát hành, hạn cọc và trạng thái xác nhận.
2. Online: khách xác nhận nội dung bằng tài khoản; tại quầy: tư vấn ghi ký giấy và file.
3. Khách chọn tiền cọc trong 50%–100%; server tạo yêu cầu online với mã tham chiếu và phân bổ dự kiến theo bữa.
4. Dịch vụ thanh toán báo kết quả; server kiểm tra nguồn thông báo và mã giao dịch, chỉ ghi thành công một lần.
5. Nhánh tiền mặt/chuyển khoản ngoài luồng: kế toán ghi thực thu và phân bổ, không cần thông báo dịch vụ.
6. Tính đủ xác nhận và cọc bắt buộc; chỉ khi đủ mới chuyển hợp đồng có hiệu lực và giữ tạm thành chính thức.
7. Thanh toán phần còn lại dùng cùng giao dịch và phân bổ theo bữa, cập nhật số dư quyết toán.

## Nhánh và giới hạn

Tách ký khỏi thu tiền; thứ tự hai việc có thể đổi nhưng phải đủ cả hai. Nhận trùng không cộng lại. Hết hạn chưa đủ cọc nhả chỗ; tiền đã nhận chuyển kế toán xử lý, không tự khôi phục chỗ. Chưa chọn nhà cung cấp nên không mô tả API cụ thể.
