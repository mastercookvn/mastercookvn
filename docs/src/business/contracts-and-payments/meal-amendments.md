---
order: 30
---

# Meal Adjustments

```mermaid
sequenceDiagram
    participant customer as Customer
    participant consultant as Consultant
    participant ui as Interface
    participant contractService as Contract/Addendum
    participant pricingService as PricingService
    participant resourceService as ResourceAvailabilityService
    participant paymentService as PaymentService
    participant database as Storage

    customer->>ui: Select meal to adjust
    ui->>contractService: Check meal belongs to contract and has no pending addendum
    contractService-->>ui: Confirm meal is valid

    opt Change dishes (at least TS11 remaining, default 5 days)
        consultant->>ui: Replace selected dishes (without increasing dish count)
        ui->>pricingService: Calculate replacement difference, retain unchanged dish prices
        pricingService-->>ui: Return difference
    end
    opt Change dining tables (at least TS12 remaining, default 3 days)
        consultant->>ui: Enter new table count (reduce by at most 15% of original signed count)
        ui->>pricingService: Calculate table price difference
        pricingService-->>ui: Return difference
        opt Increase table count
            ui->>resourceService: Check resources for additional tables
            resourceService-->>ui: Return resource check result
        end
    end

    ui->>contractService: Create addendum with before/after content
    activate contractService
    contractService->>contractService: Determine extra deposit if increase exceeds 3 tables (50% of increase)
    contractService-->>ui: Addendum created
    deactivate contractService

    alt Online confirmation
        customer->>ui: Confirm addendum through account
        ui->>contractService: Record online confirmation
    else Paper signature
        consultant->>ui: Upload signed paper addendum
        ui->>contractService: Save signed paper copy
    end

    opt Extra deposit required
        ui->>paymentService: Collect extra deposit through shared payment flow
        paymentService-->>ui: Confirm deposit received
    end

    contractService->>contractService: Check confirmation and sufficient extra deposit if required
    alt Requirements met
        ui->>resourceService: Recheck resources
        resourceService-->>ui: Confirm resources
        ui->>database: Update meal and reservations in the same transaction
        database-->>ui: Confirm update
        note over contractService,database: Preserve other meals and original contract
    else Requirements not met
        ui-->>customer: Report addendum not applied
    end
```

## Scope

UC liên quan: UC-HD-05, UC-HD-03, UC-HD-04. Tra tại [danh mục chung](../use-case-catalog.md).

## Notes and Constraints

- Không hỗ trợ dời ngày tiệc qua phụ lục điều chỉnh.
- Đổi món yêu cầu trước tiệc $\ge 5$ ngày (chỉ thay món, không tăng số món); đổi bàn yêu cầu trước tiệc $\ge 3$ ngày (giảm tối đa 15%).
- Giảm bàn làm dư tiền cọc sẽ được lưu lại để đối trừ khi quyết toán (không hoàn ngay, không hủy hợp đồng).
