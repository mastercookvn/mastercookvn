---
order: 20
---

# Confirmation, Deposit and Payment

```mermaid
sequenceDiagram
    participant customer as Customer
    participant consultant as Consultant
    participant accountant as Accountant
    participant ui as Interface
    participant contractService as Contract
    participant paymentService as PaymentService
    participant paymentProvider as Payment service
    participant resourceReservation as Resource reservation

    ui->>contractService: Read issued contract
    contractService-->>ui: Return contract, deposit deadline and confirmation status

    alt Online confirmation
        customer->>ui: Confirm contract content using account
        ui->>contractService: Record online confirmation
    else Confirmation at counter
        consultant->>ui: Record paper signature and upload file
        ui->>contractService: Save signed paper copy
    end
    contractService-->>ui: Confirm signature recorded

    alt Online payment through service
        customer->>ui: Select deposit amount per TS02 - TS03
        ui->>paymentService: Create online payment request
        paymentService->>paymentService: Generate reference and expected allocation by meal
        paymentService-->>ui: Return QR valid for TS07
        customer->>paymentProvider: Make payment
        paymentProvider-->>paymentService: Report transaction result
        activate paymentService
        paymentService->>paymentService: Check notification source and transaction ID
        paymentService->>paymentService: Record success only once (idempotent)
        deactivate paymentService
    else Cash or transfer outside the flow
        accountant->>ui: Record received payment and allocation by meal
        ui->>paymentService: Save received payment transaction
    end

    paymentService->>paymentService: Check confirmation and required deposit
    alt Requirements met
        paymentService->>contractService: Activate contract
        paymentService->>resourceReservation: Convert temporary reservation to confirmed
        resourceReservation-->>paymentService: Confirm reservation
        contractService-->>ui: Contract active
    else Requirements not met
        note over paymentService,contractService: Wait for requirements, release reservation on expiry
    end

    opt Pay remaining balance
        customer->>ui: Pay remaining balance
        ui->>paymentService: Process additional payment
        paymentService->>paymentService: Allocate by meal and update settlement balance
        paymentService-->>ui: Confirm payment in full
    end
```

## Scope

UC liên quan: UC-HD-02, UC-HD-03, UC-HD-04. Tra tại [danh mục chung](../use-case-catalog.md).

## Notes and Constraints

- Tách biệt việc ký hợp đồng và thu tiền; thứ tự có thể linh hoạt nhưng phải thỏa mãn cả hai điều kiện để hợp đồng có hiệu lực.
- Chống ghi nhận trùng lặp giao dịch (idempotency qua mã tham chiếu).
- Hết hạn giữ chỗ mà chưa đủ cọc sẽ tự động nhả tài nguyên; tiền nhận muộn được chuyển kế toán xử lý hoàn trả, không tự ý khôi phục chỗ.
