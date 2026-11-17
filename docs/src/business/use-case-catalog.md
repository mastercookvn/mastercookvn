---
order: 30
---

# Use Case Catalog

Đây là danh mục UC duy nhất. Đặc tả chính dẫn vào trang này; các trang nhóm chỉ ghi chi tiết UC. Mã UC bên dưới thay cho danh sách đề xuất rộng trong bản review AI cũ. Quản lý cơ sở được dùng mọi UC nội bộ (kế thừa các vai trò nội bộ); bảng chỉ ghi tác nhân chính.

## Use case

| ID        | Name and specification                                                                                   | Primary actor                    |
| --------- | -------------------------------------------------------------------------------------------------------- | -------------------------------- |
| UC-TK-01  | [Register customer account](./accounts-and-catalog/use-case.md#uc-tk-01)                                 | Customer                         |
| UC-TK-02  | [Sign in, sign out and change password](./accounts-and-catalog/use-case.md#uc-tk-02)                     | Customer, Internal staff         |
| UC-TK-03  | [Manage internal accounts and permissions](./accounts-and-catalog/use-case.md#uc-tk-03)                  | Branch manager                   |
| UC-DM-01  | [Manage dish categories and dishes](./accounts-and-catalog/use-case.md#uc-dm-01)                         | Branch manager                   |
| UC-DM-02  | [Manage menu sets](./accounts-and-catalog/use-case.md#uc-dm-02)                                          | Branch manager                   |
| UC-DM-03  | [Manage ingredients and recipes](./accounts-and-catalog/use-case.md#uc-dm-03)                            | Branch manager                   |
| UC-DM-04  | [Manage services](./accounts-and-catalog/use-case.md#uc-dm-04)                                           | Branch manager                   |
| UC-DM-05  | [Manage equipment catalog](./accounts-and-catalog/use-case.md#uc-dm-05)                                  | Branch manager, Storekeeper      |
| UC-DM-07  | [Manage business settings](./accounts-and-catalog/use-case.md#uc-dm-07)                                  | Branch manager                   |
| UC-DT-01  | [Browse catalog and estimate price](./booking/use-case.md#uc-dt-01)                                      | Customer                         |
| UC-DT-02  | [Create catering order](./booking/use-case.md#uc-dt-02)                                                  | Customer, Consultant             |
| UC-DT-03  | [Survey site](./booking/use-case.md#uc-dt-03)                                                            | Consultant                       |
| UC-DT-04  | [Check service availability](./booking/use-case.md#uc-dt-04)                                             | Consultant                       |
| UC-DT-05  | [Accept or reject order](./booking/use-case.md#uc-dt-05)                                                 | Consultant                       |
| UC-DT-06  | [View orders, contracts and payment history](./booking/use-case.md#uc-dt-06)                             | Customer, Consultant, Accountant |
| UC-HD-01  | [Prepare and issue contract](./contracts-and-payments/use-case.md#uc-hd-01)                              | Consultant                       |
| UC-HD-02  | [Confirm contract](./contracts-and-payments/use-case.md#uc-hd-02)                                        | Customer, Consultant             |
| UC-HD-03  | [Pay online](./contracts-and-payments/use-case.md#uc-hd-03)                                              | Customer, Payment service        |
| UC-HD-04  | [Record manual payment](./contracts-and-payments/use-case.md#uc-hd-04)                                   | Accountant                       |
| UC-HD-05  | [Adjust meal by addendum](./contracts-and-payments/use-case.md#uc-hd-05)                                 | Customer, Consultant             |
| UC-HD-06  | [Cancel meal or contract](./contracts-and-payments/use-case.md#uc-hd-06)                                 | Customer, Consultant             |
| UC-HD-07  | [Record refund](./contracts-and-payments/use-case.md#uc-hd-07)                                           | Accountant                       |
| UC-HD-08  | [Settle meal and complete contract](./contracts-and-payments/use-case.md#uc-hd-08)                       | Accountant                       |
| UC-NS-01  | [Manage staff profiles](./operations-and-staffing/use-case.md#uc-ns-01)                                  | HR manager                       |
| UC-NS-02  | [Assign staff to meals](./operations-and-staffing/use-case.md#uc-ns-02)                                  | HR manager                       |
| UC-VH-01  | [Update meal progress](./operations-and-staffing/use-case.md#uc-vh-01)                                   | Consultant, Storekeeper          |
| UC-KHO-01 | [Record ingredient purchase](./ingredients-and-equipment/use-case.md#uc-kho-01)                          | Storekeeper                      |
| UC-KHO-02 | [Count ingredients at month end](./ingredients-and-equipment/use-case.md#uc-kho-02)                      | Storekeeper                      |
| UC-KHO-03 | [Close period and calculate monthly food cost](./ingredients-and-equipment/use-case.md#uc-kho-03)        | Accountant                       |
| UC-KHO-04 | [Process monthly ingredient price proposals](./ingredients-and-equipment/use-case.md#uc-kho-04)          | Branch manager                   |
| UC-KHO-05 | [Purchase equipment](./ingredients-and-equipment/use-case.md#uc-kho-05)                                  | Storekeeper                      |
| UC-KHO-06 | [Issue equipment for meal](./ingredients-and-equipment/use-case.md#uc-kho-06)                            | Storekeeper                      |
| UC-KHO-07 | [Recover and count equipment and assess compensation](./ingredients-and-equipment/use-case.md#uc-kho-07) | Storekeeper                      |
| UC-KHO-08 | [Restore or dispose of damaged equipment](./ingredients-and-equipment/use-case.md#uc-kho-08)             | Storekeeper                      |
| UC-CS-01  | [Record post-meal review](./reviews-and-reports/use-case.md#uc-cs-01)                                    | Customer, Consultant             |
| UC-BC-01  | [View dashboard and alerts](./reviews-and-reports/use-case.md#uc-bc-01)                                  | Internal staff                   |
| UC-BC-02  | [View revenue and food cost reports](./reviews-and-reports/use-case.md#uc-bc-02)                         | Branch manager, Accountant       |
| UC-BC-03  | [View equipment reports](./reviews-and-reports/use-case.md#uc-bc-03)                                     | Branch manager, Storekeeper      |

## Maintenance

Khi thêm, bỏ hoặc đổi UC, sửa bảng này và trang đặc tả liên quan trong cùng thay đổi. Khi thêm tài liệu, sửa chỉ mục nhóm nghiệp vụ liên quan. Không chép bảng UC vào spec hoặc chỉ mục con.

Mã UC-DM-06 không còn sử dụng: loại tiệc là chuỗi nhập tự do theo bữa, không có danh mục quản lý riêng. Không đánh lại mã các UC còn lại.

Use English for diagram labels and identifiers. Follow the diagram conventions in `AGENTS.md`.
