---
order: 20
---

# Nghiệp vụ

Tài liệu nghiệp vụ và đặc tả Use Case chi tiết của hệ thống MasterCookVN.

## Quy ước chung

- **Quy tắc nghiệp vụ**: Tra cứu mã BR tại [Đặc tả phần mềm](../specification.md).
- **Danh mục Use Case**: Tra cứu mã và tên UC chuẩn tại [danh mục chung](./danh-muc-use-case.md).
- **Sơ đồ tổng quan**: Xem [Sơ đồ Use Case tổng quát](./tong-quan-use-case.md).
- **Mô hình nghiệp vụ**: Xem lớp và quan hệ tại [Mô hình lớp](../mo-hinh/mo-hinh-lop-class.md).
- **Quy ước bước**:
  - `N`: Bước thứ $N$ trong luồng chính.
  - `Na`: Luồng thay thế tại bước $N$.
  - `Ne`: Ngoại lệ tại bước $N$.

## Phân hệ chi tiết

- [Account và Catalog](./tai-khoan-va-danh-muc/use-case.md) — UC-TK-01 → UC-TK-03, UC-DM-01 → UC-DM-07.
- [Booking](./dat-tiec/use-case.md) — UC-DT-01 → UC-DT-06.
- [Contract và Payment](./hop-dong-thanh-toan/use-case.md) — UC-HD-01 → UC-HD-08.
- [Nhân sự và vận hành](./van-hanh-va-nhan-su/use-case.md) — UC-NS-01, UC-NS-02, UC-VH-01.
- [Ingredient và Equipment](./nguyen-lieu-va-dung-cu/use-case.md) — UC-KHO-01 → UC-KHO-08.
- [Đánh giá và báo cáo](./danh-gia-va-bao-cao/use-case.md) — UC-CS-01, UC-BC-01 → UC-BC-03.

## Tài liệu dùng chung

- [Quy trình tổng thể](./quy-trinh-tong-the.md)
- [Tham số và giới hạn hệ thống](./tham-so.md)
- [Trạng thái Order, Contract và Meal](./trang-thai-don-hop-dong-va-bua.md)
