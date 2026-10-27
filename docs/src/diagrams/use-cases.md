# Mô tả sơ đồ use case tổng quát

## Mục đích

Thể hiện ranh giới MasterCookVN và các nhóm chức năng; danh mục mã/tên/tác nhân làm gốc tại [chỉ mục](./index.md). Không vẽ mỗi bước nội bộ thành một UC độc lập.

## Tác nhân và nhóm

- Khách hàng: xem/tạm tính, đặt, xác nhận hợp đồng, thanh toán, sửa/hủy, đánh giá.
- Tư vấn: đặt hộ, khảo sát/nhận tiệc, hợp đồng/phụ lục, ghi đánh giá hộ.
- Quản lý cơ sở: tài khoản/quyền, danh mục/giá/tham số, quản lý và báo cáo.
- Kế toán: thu/hoàn, quyết toán, chốt kỳ nguyên liệu, báo cáo.
- Thủ kho: nhập nguyên liệu/dụng cụ, kiểm kê, xuất/thu hồi/phục hồi dụng cụ.
- Quản lý nhân sự: hồ sơ và phân công.
- Dịch vụ thanh toán: xác nhận giao dịch online.

## Quan hệ cần thể hiện

Tạo đơn có hai cách khách tự đặt/tư vấn đặt hộ. Ký có hai cách online/ký giấy. Thanh toán có hai cách online/ghi nhận thủ công. Các cách thay thế có thể ghi chú trên cùng UC, không bắt buộc phân rã thêm.

Sửa/hủy tác động từng bữa trong hợp đồng; hoàn tiền là chức năng được gọi khi có khoản phải hoàn, không bắt buộc mọi lần hủy. Kiểm tra tài nguyên, tính tiền, kiểm tra hết hạn là xử lý bên trong UC nhận tiệc/sửa/thu cọc, không dùng hệ thống làm actor của chính nó. Cron tháng mô tả ở activity cập nhật giá, không thêm actor nhắc lịch.

Không đưa nhà cung cấp, nhân viên không có tài khoản, Zalo, bản đồ hoặc thời tiết thành actor tích hợp. Không kế thừa vai trò quản lý từ khách hàng; quyền kiêm nhiệm là hợp các vai trò tài khoản.
