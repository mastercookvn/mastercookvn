---
order: 40
---

# Meal Cancellation and Refund

```mermaid
sequenceDiagram
    participant customer as Customer
    participant consultant as Consultant
    participant ui as Interface
    participant cancellationService as Cancellation processing
    participant contractService as Contract
    participant paymentAllocation as Payment allocation
    participant reservationsAndAssignments as Reservations/Assignments
    participant accountant as Accountant

    customer->>ui: Select some or all unserved meals for cancellation
    ui->>cancellationService: Submit cancellation request and record request time
    activate cancellationService

    loop Each meal to cancel
        cancellationService->>paymentAllocation: Get deposit refund basis (BR08), excess prepayment and remaining time
        paymentAllocation-->>cancellationService: Return meal allocation data
        cancellationService->>cancellationService: Calculate tiered refund (BR10)
        note over cancellationService: ">=30 days: 100%\n>=15 and <30 days: 50%\n<15 days: 0%"
        cancellationService->>cancellationService: Add refundable excess prepayment
    end

    cancellationService->>cancellationService: Aggregate results for entire request
    cancellationService-->>ui: Return refund calculation
    deactivate cancellationService

    alt Customer confirms
        customer->>ui: Confirm cancellation
    else Consultant confirms
        consultant->>ui: Confirm cancellation on behalf
    end

    ui->>contractService: Save cancellation result and create refund obligation
    ui->>reservationsAndAssignments: Release unissued reservations and cancel assignments for affected meals
    reservationsAndAssignments-->>ui: Confirm resource release
    note over contractService,reservationsAndAssignments: Issued equipment must still be recovered/counted and TS19 cleaning ensured<br/>Cancelled meals remain CANCELLED, other meals unchanged

    opt Refund due
        accountant->>accountant: Pay refund outside system
        accountant->>ui: Record refund transaction with allocation and evidence
        ui->>paymentAllocation: Update refund transaction
        paymentAllocation->>paymentAllocation: Recalculate cancelled meal balance
    end

    alt No payment/refund due and count completed if equipment issued
        paymentAllocation->>contractService: Close settlement, meal remains CANCELLED
        contractService->>contractService: Check all meals processed
        alt All meals processed
            contractService->>contractService: Close contract
        else Meals remain unprocessed
            note over contractService: Contract remains open
        end
    else Payment/refund obligations remain
        note over paymentAllocation: Wait for processing
    end
```

## Scope

UC liên quan: UC-HD-06, UC-HD-07. Tra tại [danh mục chung](../use-case-catalog.md).

## Notes and Constraints

- Bậc hoàn tiền cọc căn cứ số ngày còn lại đến tiệc: $\ge 30$ ngày hoàn 100%; từ $15$ đến dưới $30$ ngày hoàn 50%; dưới $15$ ngày hoàn 0%. Phần tiền trả trước vượt cọc được hoàn đủ 100%.
- Hủy trước khi cọc không phát sinh chi phí.
- Khách không có mặt tại tiệc là trường hợp ghi nhận riêng, không tính là khách chủ động yêu cầu hủy.
- Quy trình hoàn tiền do Kế toán chi trả và ghi nhận trực tiếp, không qua phê duyệt nhiều cấp phức tạp.
