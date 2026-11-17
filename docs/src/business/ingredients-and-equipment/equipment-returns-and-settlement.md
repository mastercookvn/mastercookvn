---
order: 40
---

# Equipment Recovery and Settlement

```mermaid
sequenceDiagram
    participant storekeeper as Storekeeper
    participant equipmentCounting as Equipment / Counting
    participant mealSettlement as MealSettlement
    participant accountant as Accountant
    participant paymentService as PaymentService
    participant contractService as Contract

    note over storekeeper,equipmentCounting: Before meal
    storekeeper->>equipmentCounting: Create issue from meal requirements
    activate equipmentCounting
    equipmentCounting->>equipmentCounting: Check reservation and actual availability
    equipmentCounting->>equipmentCounting: Record issue once
    equipmentCounting-->>storekeeper: Confirm equipment issue
    deactivate equipmentCounting

    note over storekeeper,equipmentCounting: After meal
    storekeeper->>equipmentCounting: Read issued quantity and finalized compensation price
    storekeeper->>equipmentCounting: Enter good, damaged, lost and customer-liable quantities
    activate equipmentCounting
    equipmentCounting->>equipmentCounting: Check balanced totals and customer liability limit
    equipmentCounting->>equipmentCounting: Waive within TS25 threshold, otherwise calculate customer-liable quantity × finalized price
    equipmentCounting-->>storekeeper: Confirm count
    deactivate equipmentCounting

    storekeeper->>equipmentCounting: Update equipment status
    activate equipmentCounting
    equipmentCounting->>equipmentCounting: Good to ready, damaged to unavailable, lost reduces owned
    equipmentCounting->>equipmentCounting: Preserve TS19 cleaning window, do not update stock twice
    equipmentCounting-->>storekeeper: Confirm inventory update
    deactivate equipmentCounting

    accountant->>mealSettlement: Create meal settlement
    activate mealSettlement
    mealSettlement->>mealSettlement: Use current price or post-cancellation obligation, compensation and successful transactions
    mealSettlement-->>accountant: Return settlement balance
    deactivate mealSettlement

    alt Positive balance (payment due)
        accountant->>paymentService: Collect remainder
        paymentService-->>mealSettlement: Update payment transaction
    else Negative balance (refund due)
        mealSettlement->>accountant: Record refund obligation
        accountant->>accountant: Process refund
        accountant->>paymentService: Record refund transaction and evidence
        paymentService-->>mealSettlement: Update refund transaction
    else Zero balance
        note over mealSettlement: Meal eligible for closure
    end

    mealSettlement->>mealSettlement: Check zero balance then close settlement
    mealSettlement->>contractService: Served meal becomes COMPLETED, cancelled meal remains CANCELLED
    contractService->>contractService: Check all meals finished/cancelled and payments sufficient
    alt All meals processed
        contractService->>contractService: Close contract
        contractService-->>accountant: Notify contract closed
    else Meals remain unprocessed
        note over contractService: Contract awaits remaining meals
    end
```

## Scope

UC liên quan: UC-KHO-06, UC-KHO-07, UC-HD-08, UC-HD-03, UC-HD-04, UC-HD-07. Tra tại [danh mục chung](../use-case-catalog.md).

## Notes and Constraints

- Bữa tiệc không sử dụng dụng cụ thì bỏ qua bước lập biên bản kiểm đếm.
- Không trừ nguyên liệu theo từng bữa tiệc (nguyên liệu tính theo kỳ kiểm kê tháng).
- Không hỗ trợ công nợ trả chậm; đóng hợp đồng chỉ khi mọi bữa đã kết thúc/hủy và số dư công nợ về 0.
