# Đặt tiệc và đặt hộ

## Phạm vi

UC liên quan: UC-DT-01, UC-DT-02, UC-DT-03, UC-DT-04, UC-DT-05, UC-HD-01, UC-HD-02. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Thành phần

Khách/Tư vấn → giao diện → xử lý đơn → hồ sơ khách → kiểm tra tài nguyên → hợp đồng → lưu trữ.

## Nội dung cần thể hiện

1. Khách tự đặt lấy hồ sơ từ tài khoản; tư vấn đặt hộ tìm/tạo hồ sơ bằng tên và SĐT, không tạo tài khoản hộ.
2. Gửi danh sách bữa với thời gian, địa điểm, bàn ăn, bàn ghế, món, dịch vụ; server tính tiền, lưu đơn chờ xác nhận.
3. Tư vấn ghi khảo sát Q&A riêng từng bữa, nhập khoảng cách và khung sử dụng tài nguyên.
4. Kiểm tra tất cả bữa trong đơn cùng các giữ còn hiệu lực bên ngoài; tính nhu cầu nhân sự từ bàn bố trí, không từ bàn ăn.
5. Tư vấn xác nhận nhận: trong một giao dịch kiểm tra lại và giữ tạm toàn bộ bữa, phát hành hợp đồng chung, chốt nội dung và hạn 24 giờ.
6. Khách có tài khoản nhận hợp đồng chờ xác nhận trong hồ sơ. Khách đăng ký sau bằng SĐT được liên kết hồ sơ đặt hộ.
7. Khách không đăng ký ký giấy tại quầy; tư vấn upload bản ký. Không thêm cấp quản lý duyệt.

## Nhánh và giới hạn

Hai nhánh tự đặt/đặt hộ hợp nhất trước khi lưu đơn; hai nhánh ký online/ký giấy hợp nhất tại ghi xác nhận. Thiếu tài nguyên hoặc ngoài 20 km trả lý do, không giữ một phần đơn. Không vẽ Zalo như API.
