# Danh mục use case và sơ đồ

Đây là danh mục UC duy nhất. Đặc tả chính dẫn vào trang này; các trang nhóm chỉ ghi chi tiết UC. Mã UC bên dưới thay cho danh sách đề xuất rộng trong bản review AI cũ. Quản lý cơ sở được dùng mọi UC nội bộ (kế thừa các vai trò nội bộ); bảng chỉ ghi tác nhân chính.

## Use case

| Mã | Tên và đặc tả | Tác nhân |
| --- | --- | --- |
| UC-TK-01 | [Đăng ký tài khoản khách](./use-cases/tai-khoan-danh-muc.md#uc-tk-01) | Khách hàng |
| UC-TK-02 | [Đăng nhập, đăng xuất, đổi mật khẩu](./use-cases/tai-khoan-danh-muc.md#uc-tk-02) | Khách hàng, Nhân viên nội bộ |
| UC-TK-03 | [Quản lý tài khoản nội bộ và phân quyền](./use-cases/tai-khoan-danh-muc.md#uc-tk-03) | Quản lý cơ sở |
| UC-DM-01 | [Quản lý loại món và món ăn](./use-cases/tai-khoan-danh-muc.md#uc-dm-01) | Quản lý cơ sở |
| UC-DM-02 | [Quản lý set thực đơn](./use-cases/tai-khoan-danh-muc.md#uc-dm-02) | Quản lý cơ sở |
| UC-DM-03 | [Quản lý nguyên liệu và định lượng món](./use-cases/tai-khoan-danh-muc.md#uc-dm-03) | Quản lý cơ sở |
| UC-DM-04 | [Quản lý dịch vụ](./use-cases/tai-khoan-danh-muc.md#uc-dm-04) | Quản lý cơ sở |
| UC-DM-05 | [Quản lý danh mục dụng cụ](./use-cases/tai-khoan-danh-muc.md#uc-dm-05) | Quản lý cơ sở, Thủ kho |
| UC-DM-06 | [Quản lý loại tiệc](./use-cases/tai-khoan-danh-muc.md#uc-dm-06) | Quản lý cơ sở |
| UC-DM-07 | [Quản lý tham số nghiệp vụ](./use-cases/tai-khoan-danh-muc.md#uc-dm-07) | Quản lý cơ sở |
| UC-DT-01 | [Xem danh mục và tạm tính](./use-cases/dat-tiec.md#uc-dt-01) | Khách hàng |
| UC-DT-02 | [Tạo đơn đặt tiệc](./use-cases/dat-tiec.md#uc-dt-02) | Khách hàng, Nhân viên tư vấn |
| UC-DT-03 | [Khảo sát địa điểm](./use-cases/dat-tiec.md#uc-dt-03) | Nhân viên tư vấn |
| UC-DT-04 | [Kiểm tra khả năng phục vụ](./use-cases/dat-tiec.md#uc-dt-04) | Nhân viên tư vấn |
| UC-DT-05 | [Xác nhận nhận hoặc từ chối đơn](./use-cases/dat-tiec.md#uc-dt-05) | Nhân viên tư vấn |
| UC-DT-06 | [Tra cứu đơn, hợp đồng và lịch sử thanh toán](./use-cases/dat-tiec.md#uc-dt-06) | Khách hàng, Nhân viên tư vấn, Kế toán |
| UC-HD-01 | [Lập và phát hành hợp đồng](./use-cases/hop-dong-thanh-toan.md#uc-hd-01) | Nhân viên tư vấn |
| UC-HD-02 | [Xác nhận hợp đồng](./use-cases/hop-dong-thanh-toan.md#uc-hd-02) | Khách hàng, Nhân viên tư vấn |
| UC-HD-03 | [Thanh toán online](./use-cases/hop-dong-thanh-toan.md#uc-hd-03) | Khách hàng, Dịch vụ thanh toán |
| UC-HD-04 | [Ghi nhận thanh toán thủ công](./use-cases/hop-dong-thanh-toan.md#uc-hd-04) | Kế toán |
| UC-HD-05 | [Điều chỉnh bữa bằng phụ lục](./use-cases/hop-dong-thanh-toan.md#uc-hd-05) | Khách hàng, Nhân viên tư vấn |
| UC-HD-06 | [Hủy bữa hoặc hợp đồng](./use-cases/hop-dong-thanh-toan.md#uc-hd-06) | Khách hàng, Nhân viên tư vấn |
| UC-HD-07 | [Ghi nhận hoàn tiền](./use-cases/hop-dong-thanh-toan.md#uc-hd-07) | Kế toán |
| UC-HD-08 | [Quyết toán bữa và hoàn tất hợp đồng](./use-cases/hop-dong-thanh-toan.md#uc-hd-08) | Kế toán |
| UC-NS-01 | [Quản lý hồ sơ nhân sự](./use-cases/nhan-su.md#uc-ns-01) | Quản lý nhân sự |
| UC-NS-02 | [Phân công nhân sự theo bữa](./use-cases/nhan-su.md#uc-ns-02) | Quản lý nhân sự |
| UC-VH-01 | [Cập nhật tiến độ bữa](./use-cases/nhan-su.md#uc-vh-01) | Nhân viên tư vấn, Thủ kho |
| UC-KHO-01 | [Ghi nhận nhập nguyên liệu](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-01) | Thủ kho |
| UC-KHO-02 | [Kiểm kê nguyên liệu cuối tháng](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-02) | Thủ kho |
| UC-KHO-03 | [Chốt kỳ và tính food cost tháng](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-03) | Kế toán |
| UC-KHO-04 | [Xử lý đề xuất giá nguyên liệu tháng](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-04) | Quản lý cơ sở |
| UC-KHO-05 | [Nhập mua dụng cụ](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-05) | Thủ kho |
| UC-KHO-06 | [Xuất dụng cụ cho bữa](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-06) | Thủ kho |
| UC-KHO-07 | [Thu hồi, kiểm đếm và bồi thường](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-07) | Thủ kho |
| UC-KHO-08 | [Phục hồi hoặc loại bỏ dụng cụ hư](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-08) | Thủ kho |
| UC-CS-01 | [Ghi nhận đánh giá sau bữa](./use-cases/danh-gia-bao-cao.md#uc-cs-01) | Khách hàng, Nhân viên tư vấn |
| UC-BC-01 | [Xem dashboard và cảnh báo](./use-cases/danh-gia-bao-cao.md#uc-bc-01) | Nhân viên nội bộ |
| UC-BC-02 | [Xem báo cáo doanh thu và food cost](./use-cases/danh-gia-bao-cao.md#uc-bc-02) | Quản lý cơ sở, Kế toán |
| UC-BC-03 | [Xem báo cáo dụng cụ](./use-cases/danh-gia-bao-cao.md#uc-bc-03) | Quản lý cơ sở, Thủ kho |

## Sơ đồ cần thực hiện

- [Use case tổng quát](./use-cases.md).
- [Đặc tả chi tiết Use Cases](./use-cases/index.md).
- [Mô hình lớp chi tiết](./class.md).
- [Sequence](./sequence/index.md).
- [Activity](./activity/index.md).
- [Trạng thái](./state/index.md).

## Cách duy trì

Khi thêm, bỏ hoặc đổi UC, sửa bảng này và trang đặc tả liên quan trong cùng thay đổi. Khi thêm sơ đồ, sửa chỉ mục của loại sơ đồ tương ứng. Không chép bảng UC vào spec hoặc chỉ mục con.

Các file sơ đồ được thể hiện bằng biểu đồ Mermaid (không sinh file SVG). Khi chỉnh sửa sơ đồ, giữ nguyên ngôn ngữ tiếng Việt và tuân thủ các quy định trong `AGENTS.md`.
