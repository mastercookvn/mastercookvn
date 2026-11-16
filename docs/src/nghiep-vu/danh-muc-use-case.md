---
order: 30
---

# Danh mục Use Case

Đây là danh mục UC duy nhất. Đặc tả chính dẫn vào trang này; các trang nhóm chỉ ghi chi tiết UC. Mã UC bên dưới thay cho danh sách đề xuất rộng trong bản review AI cũ. Branch Manager được dùng mọi UC nội bộ (kế thừa các Role nội bộ); bảng chỉ ghi tác nhân chính.

## Use case

| Mã        | Tên và đặc tả                                                                          | Tác nhân                              |
| --------- | -------------------------------------------------------------------------------------- | ------------------------------------- |
| UC-TK-01  | [Đăng ký Account Customer](./tai-khoan-va-danh-muc/use-case.md#uc-tk-01)                | Customer                            |
| UC-TK-02  | [Đăng nhập, đăng xuất, đổi mật khẩu](./tai-khoan-va-danh-muc/use-case.md#uc-tk-02)     | Customer, Internal Staff          |
| UC-TK-03  | [Quản lý Account nội bộ và phân quyền](./tai-khoan-va-danh-muc/use-case.md#uc-tk-03) | Branch Manager                         |
| UC-DM-01  | [Quản lý loại Dish và Dish](./tai-khoan-va-danh-muc/use-case.md#uc-dm-01)             | Branch Manager                         |
| UC-DM-02  | [Quản lý Menu Set](./tai-khoan-va-danh-muc/use-case.md#uc-dm-02)                   | Branch Manager                         |
| UC-DM-03  | [Quản lý Ingredient và Recipe Quantity](./tai-khoan-va-danh-muc/use-case.md#uc-dm-03)  | Branch Manager                         |
| UC-DM-04  | [Quản lý dịch vụ](./tai-khoan-va-danh-muc/use-case.md#uc-dm-04)                        | Branch Manager                         |
| UC-DM-05  | [Quản lý Catalog của Equipment](./tai-khoan-va-danh-muc/use-case.md#uc-dm-05)               | Branch Manager, Storekeeper                |
| UC-DM-06  | [Quản lý Event Type](./tai-khoan-va-danh-muc/use-case.md#uc-dm-06)                      | Branch Manager                         |
| UC-DM-07  | [Quản lý tham số nghiệp vụ](./tai-khoan-va-danh-muc/use-case.md#uc-dm-07)              | Branch Manager                         |
| UC-DT-01  | [Xem Catalog và tạm tính](./dat-tiec/use-case.md#uc-dt-01)                            | Customer                            |
| UC-DT-02  | [Tạo Order](./dat-tiec/use-case.md#uc-dt-02)                                    | Customer, Consultant          |
| UC-DT-03  | [Site Survey](./dat-tiec/use-case.md#uc-dt-03)                                   | Consultant                      |
| UC-DT-04  | [Kiểm tra Service Capacity](./dat-tiec/use-case.md#uc-dt-04)                           | Consultant                      |
| UC-DT-05  | [Xác nhận nhận hoặc từ chối Order](./dat-tiec/use-case.md#uc-dt-05)                      | Consultant                      |
| UC-DT-06  | [Tra cứu Order, Contract và lịch sử Payment](./dat-tiec/use-case.md#uc-dt-06)         | Customer, Consultant, Accountant |
| UC-HD-01  | [Lập và phát hành Contract](./hop-dong-thanh-toan/use-case.md#uc-hd-01)                | Consultant                      |
| UC-HD-02  | [Xác nhận Contract](./hop-dong-thanh-toan/use-case.md#uc-hd-02)                        | Customer, Consultant          |
| UC-HD-03  | [Payment online](./hop-dong-thanh-toan/use-case.md#uc-hd-03)                        | Customer, Payment Service        |
| UC-HD-04  | [Ghi nhận Payment thủ công](./hop-dong-thanh-toan/use-case.md#uc-hd-04)             | Accountant                               |
| UC-HD-05  | [Điều chỉnh Meal bằng Addendum](./hop-dong-thanh-toan/use-case.md#uc-hd-05)              | Customer, Consultant          |
| UC-HD-06  | [Hủy Meal hoặc Contract](./hop-dong-thanh-toan/use-case.md#uc-hd-06)                    | Customer, Consultant          |
| UC-HD-07  | [Ghi nhận Refund](./hop-dong-thanh-toan/use-case.md#uc-hd-07)                       | Accountant                               |
| UC-HD-08  | [Settlement Meal và hoàn tất Contract](./hop-dong-thanh-toan/use-case.md#uc-hd-08)      | Accountant                               |
| UC-NS-01  | [Quản lý Staff Profile](./van-hanh-va-nhan-su/use-case.md#uc-ns-01)                    | HR Manager                       |
| UC-NS-02  | [Staff Assignment theo Meal](./van-hanh-va-nhan-su/use-case.md#uc-ns-02)               | HR Manager                       |
| UC-VH-01  | [Cập nhật tiến độ Meal](./van-hanh-va-nhan-su/use-case.md#uc-vh-01)                     | Consultant, Storekeeper             |
| UC-KHO-01 | [Ghi nhận nhập Ingredient](./nguyen-lieu-va-dung-cu/use-case.md#uc-kho-01)            | Storekeeper                               |
| UC-KHO-02 | [Inventory Count cho Ingredient cuối tháng](./nguyen-lieu-va-dung-cu/use-case.md#uc-kho-02)   | Storekeeper                               |
| UC-KHO-03 | [Chốt kỳ và tính food cost tháng](./nguyen-lieu-va-dung-cu/use-case.md#uc-kho-03)      | Accountant                               |
| UC-KHO-04 | [Xử lý đề xuất giá Ingredient tháng](./nguyen-lieu-va-dung-cu/use-case.md#uc-kho-04)  | Branch Manager                         |
| UC-KHO-05 | [Nhập mua Equipment](./nguyen-lieu-va-dung-cu/use-case.md#uc-kho-05)                     | Storekeeper                               |
| UC-KHO-06 | [Xuất Equipment cho Meal](./nguyen-lieu-va-dung-cu/use-case.md#uc-kho-06)                 | Storekeeper                               |
| UC-KHO-07 | [Thu hồi, kiểm đếm và bồi thường](./nguyen-lieu-va-dung-cu/use-case.md#uc-kho-07)      | Storekeeper                               |
| UC-KHO-08 | [Phục hồi hoặc loại bỏ Equipment hư](./nguyen-lieu-va-dung-cu/use-case.md#uc-kho-08)     | Storekeeper                               |
| UC-CS-01  | [Ghi nhận đánh giá sau Meal](./danh-gia-va-bao-cao/use-case.md#uc-cs-01)                | Customer, Consultant          |
| UC-BC-01  | [Xem dashboard và cảnh báo](./danh-gia-va-bao-cao/use-case.md#uc-bc-01)                | Internal Staff                      |
| UC-BC-02  | [Xem báo cáo doanh thu và food cost](./danh-gia-va-bao-cao/use-case.md#uc-bc-02)       | Branch Manager, Accountant                |
| UC-BC-03  | [Xem báo cáo Equipment](./danh-gia-va-bao-cao/use-case.md#uc-bc-03)                      | Branch Manager, Storekeeper                |

## Cách duy trì

Khi thêm, bỏ hoặc đổi UC, sửa bảng này và trang đặc tả liên quan trong cùng thay đổi. Khi thêm tài liệu, sửa chỉ mục nhóm nghiệp vụ liên quan. Không chép bảng UC vào spec hoặc chỉ mục con.

Các file sơ đồ được thể hiện bằng biểu đồ Mermaid (không sinh file SVG). Khi chỉnh sửa sơ đồ, giữ nguyên ngôn ngữ tiếng Việt và tuân thủ các quy định trong `AGENTS.md`.
