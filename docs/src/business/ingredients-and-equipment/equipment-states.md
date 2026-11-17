---
order: 30
---

# Equipment Reservation, Issue and Recovery States

```mermaid
stateDiagram-v2
    [*] --> TEMPORARY : Order accepted, resources available
    TEMPORARY --> CONFIRMED : Contract activated
    TEMPORARY --> RELEASED : Expired or cancelled
    CONFIRMED --> RELEASED : Cancelled before issue, or recovered and TS19 cleaning window ended
    RELEASED --> [*]

    note right of TEMPORARY
        Record time window, quantity and 24-hour expiry
        Do not deduct physical stock
    end note
    note right of CONFIRMED
        Reserve capacity
        Addendum changes quantity or window in its application transaction
        Preserve the TS19 cleaning window after counting
    end note
    note right of RELEASED
        Release capacity
    end note
```

```mermaid
stateDiagram-v2
    [*] --> DRAFT : Issue created
    DRAFT --> ISSUED : Sufficient ready stock without occupying another meal's reservation
    DRAFT --> CANCELLED : Cancelled before issue
    ISSUED --> COUNTED : Good + damaged + lost = issued, count report confirmed
    COUNTED --> [*]
    CANCELLED --> [*]

    note right of ISSUED
        Ready decreases, in use increases
    end note
    note right of COUNTED
        Good → ready
        Damaged → damaged stock
        Lost → owned decreases
    end note
    note left of DRAFT
        Invariant: owned = ready + in use + damaged
    end note
```

## Scope

UC-DT-04, UC-DT-05, UC-HD-05, UC-HD-06, UC-KHO-05 đến UC-KHO-08. Theo [BR07, BR13](../../specification.md) và [mô hình lớp](../../models/domain-model.md).

## Equipment Inventory Invariants

- **Bất biến số lượng**: $\text{Sở hữu} = \text{Sẵn sàng} + \text{Đang sử dụng} + \text{Hư}$.
- **Chuyển dịch trạng thái dụng cụ**:
  - Mua mới: Tăng sẵn sàng và tăng sở hữu.
  - Xuất kho: Sẵn sàng $\rightarrow$ Đang sử dụng (chỉ xuất một lần cho toàn bữa).
  - Thu hồi tốt: Đang sử dụng $\rightarrow$ Sẵn sàng.
  - Thu hồi hư hỏng: Đang sử dụng $\rightarrow$ Hư (tạm không khả dụng).
  - Thu hồi mất mát: Giảm đang sử dụng và giảm sở hữu.
  - Phục hồi hư: Hư $\rightarrow$ Sẵn sàng.
  - Loại bỏ hư: Giảm hư và giảm sở hữu.
- **Giữ và Xuất**: Giữ tạm/chính thức và xuất kho là hai khái niệm độc lập; giữ đã xuất kho không bị trừ hai lần vào năng lực khả dụng. Khung giữ gồm thời gian vệ sinh TS19; kiểm đếm xong chưa hết khung thì vẫn giữ cho đến hết khung. Nếu hủy sau khi đã xuất, vẫn phải thu hồi/kiểm đếm và bảo đảm vệ sinh trước lượt dùng tiếp theo; bữa vẫn `CANCELLED`.
