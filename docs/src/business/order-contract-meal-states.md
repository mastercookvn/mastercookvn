---
order: 110
---

# Order, Contract and Meal States

```mermaid
stateDiagram-v2
    [*] --> PENDING : Valid order submitted
    PENDING --> ACCEPTED : Consultant accepts, resources available
    PENDING --> REJECTED : Consultant records reason
    PENDING --> CANCELLED : Customer cancels before deposit
    ACCEPTED --> EXPIRED : Contract expires before activation
    ACCEPTED --> CANCELLED : All meals cancelled
    CANCELLED --> [*]
    REJECTED --> [*]
    EXPIRED --> [*]
```

```mermaid
stateDiagram-v2
    [*] --> AWAITING_CONFIRMATION_AND_DEPOSIT : Issued from accepted order
    AWAITING_CONFIRMATION_AND_DEPOSIT --> ACTIVE : Customer confirmed and deposit sufficient
    AWAITING_CONFIRMATION_AND_DEPOSIT --> EXPIRED : Requirements unmet at deadline
    AWAITING_CONFIRMATION_AND_DEPOSIT --> CANCELLED : All meals cancelled
    ACTIVE --> CANCELLED : All meals cancelled
    ACTIVE --> COMPLETED : All meals processed, zero balances, no payments or refunds due
    CANCELLED --> COMPLETED : All meals processed, zero balances, no payments or refunds due
    EXPIRED --> COMPLETED : All meals processed, zero balances, no payments or refunds due
    COMPLETED --> [*]
```

```mermaid
stateDiagram-v2
    [*] --> PLANNED : Created in order
    PLANNED --> CONFIRMED : Contract activated
    PLANNED --> CANCELLED : Order rejected, cancelled or expired
    CONFIRMED --> PREPARING : Storekeeper or consultant records preparation
    CONFIRMED --> CANCELLED : Valid cancellation or customer absent
    PREPARING --> SERVING : Consultant or staff updates progress
    PREPARING --> CANCELLED : Valid cancellation before service begins
    SERVING --> AWAITING_COUNT : Service ends
    SERVING --> AWAITING_SETTLEMENT : Service ends without equipment
    AWAITING_COUNT --> AWAITING_SETTLEMENT : Count completed
    AWAITING_SETTLEMENT --> COMPLETED : Zero balance
    COMPLETED --> [*]
    CANCELLED --> [*]
```

## Scope

UC-DT-02, UC-DT-03, UC-DT-04, UC-DT-05, UC-HD-01, UC-HD-02 đến UC-HD-08, UC-VH-01, UC-KHO-07. Quy tắc theo [spec](../specification.md), dữ liệu theo [domain model](../models/domain-model.md).

## Transition Rules

- **Độc lập tiến độ**: Không gom tiến độ của từng bữa vào trạng thái hợp đồng chung. Bữa thứ nhất có thể hoàn tất trong khi bữa thứ hai chưa diễn ra.
- **Hủy bữa**: Một bữa bị hủy không đổi trạng thái hợp đồng sang `CANCELLED` nếu vẫn còn các bữa khác tiếp tục. Hợp đồng chỉ chuyển `CANCELLED` khi tất cả các bữa đều bị hủy.
- **Quyết toán bữa hủy**: Sau kiểm đếm và chốt quyết toán, bữa vẫn `CANCELLED`; chỉ `MealSettlement` chuyển `CLOSED`, không mở đánh giá hoặc ghi doanh thu phục vụ cho bữa hủy.
- **Đóng hợp đồng**: Hợp đồng chuyển `COMPLETED` khi mọi bữa đã được xử lý (phục vụ xong hoặc đã hủy) và số dư công nợ của từng bữa bằng 0 (không còn nghĩa vụ thu thêm hay hoàn tiền).
- **Giao dịch thanh toán**: Trạng thái `PENDING` → `SUCCEEDED` hoặc `FAILED`. Giao dịch hoàn tiền là bản ghi mới, không chuyển đổi trên bản ghi thu.
- **Phụ lục**: `PENDING` → `AWAITING_EXTRA_DEPOSIT` (nếu tăng trên 3 bàn) → `APPLIED` (hoặc `CANCELLED` nếu khách từ chối/không đủ tài nguyên). Phụ lục đã ký không sửa đè.
