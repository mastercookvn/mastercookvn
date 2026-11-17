---
order: 20
---

# Business

Tài liệu nghiệp vụ và đặc tả Use Case chi tiết của hệ thống MasterCookVN.

## General Conventions

- **Quy tắc nghiệp vụ**: Tra cứu mã BR tại [MasterCookVN Software Specification](../specification.md); giá trị và giới hạn lấy [System Parameters and Limits](./system-parameters.md) làm chuẩn.
- **Danh mục Use Case**: Tra cứu mã và tên UC chuẩn tại [Use Case Catalog](./use-case-catalog.md).
- **Sơ đồ tổng quan**: Xem [Use Case Overview](./use-case-overview.md).
- **Mô hình nghiệp vụ**: Xem lớp và quan hệ tại [Detailed Domain Model](../models/domain-model.md).
- **Quy ước bước**:
  - `N`: Bước thứ $N$ trong luồng chính.
  - `Na`: Luồng thay thế tại bước $N$.
  - `Ne`: Ngoại lệ tại bước $N$.

## Business Areas

- [Accounts and Catalog](./accounts-and-catalog/) — UC-TK-01 → UC-TK-03, UC-DM-01 → UC-DM-05, UC-DM-07.
- [Booking](./booking/) — UC-DT-01 → UC-DT-06.
- [Contracts and Payments](./contracts-and-payments/) — UC-HD-01 → UC-HD-08.
- [Operations and Staffing](./operations-and-staffing/) — UC-NS-01, UC-NS-02, UC-VH-01.
- [Ingredients and Equipment](./ingredients-and-equipment/) — UC-KHO-01 → UC-KHO-08.
- [Reviews and Reports](./reviews-and-reports/) — UC-CS-01, UC-BC-01 → UC-BC-03.

## Shared Documentation

- [Overall Workflow](./overall-workflow.md)
- [System Parameters and Limits](./system-parameters.md)
- [Order, Contract and Meal States](./order-contract-meal-states.md)
