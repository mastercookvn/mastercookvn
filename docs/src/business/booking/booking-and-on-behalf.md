---
order: 20
---

# Booking and Booking on Behalf

```mermaid
sequenceDiagram
    participant customer as Customer
    participant consultant as Consultant
    participant ui as Interface
    participant orderService as Order
    participant customerProfileService as Customer profile
    participant resourceService as ResourceAvailabilityService
    participant contractService as Contract
    participant database as Storage

    alt Self booking
        customer->>ui: Sign in and open booking form
        ui->>customerProfileService: Fetch profile from account
        customerProfileService-->>ui: Return customer profile
    else Booking on behalf
        consultant->>ui: Find profile by name and phone number
        ui->>customerProfileService: Search profiles
        alt Found
            customerProfileService-->>ui: Return existing profile
        else Not found
            consultant->>ui: Create profile (without creating an account)
            ui->>customerProfileService: Save new profile
            customerProfileService-->>ui: Confirm profile creation
        end
    end

    alt Self booking
        customer->>ui: Submit meals (free-text event type, time, address, size, dishes, services)
    else Booking on behalf
        consultant->>ui: Submit meals on customer's behalf
    end
    ui->>orderService: Create order
    activate orderService
    orderService->>orderService: Calculate total for all meals
    orderService->>database: Save pending order
    database-->>orderService: Confirm save
    deactivate orderService

    consultant->>ui: Enter survey Q&A and distance for each saved meal
    ui->>orderService: Save survey and calculate separate transport charges
    consultant->>ui: Enter equipment window including TS19 cleaning and staff demand by position
    ui->>orderService: Derive staff window from meal time and TS18

    consultant->>ui: Confirm order acceptance
    ui->>orderService: Request confirmation and temporary reservation
    activate orderService
    orderService->>resourceService: Check all meals in order and active reservations
    resourceService->>resourceService: Check equipment and staff demand by position/time window
    alt Sufficient resources
        resourceService->>database: Recheck and atomically reserve all meals temporarily
        database-->>resourceService: Confirm reservation and TS06 deadline
        resourceService-->>orderService: Resources available
        orderService->>contractService: Issue shared contract
        activate contractService
        contractService->>database: Save finalized content, deposit deadline equals temporary reservation expiry
        database-->>contractService: Confirm contract saved
        deactivate contractService
        orderService-->>ui: Contract issued
    else Insufficient resources
        resourceService-->>orderService: Return rejection reason
        orderService-->>ui: Report reason, do not reserve partially
    end
    deactivate orderService

    opt Contract issued
        alt Customer has account
            ui->>customerProfileService: Send contract awaiting confirmation to profile
            customerProfileService-->>customer: Receive contract through account
        else Customer not registered
            note over customer,consultant: Customer signs paper at counter
            consultant->>ui: Upload signed paper copy
            ui->>contractService: Save signed copy
            contractService-->>ui: Confirm save
        end
    end
```

<!-- diagram id="vitepress-plugin-digrams-sequence-booking-and-on-behalf" -->

## Scope

UC liên quan: UC-DT-01, UC-DT-02, UC-DT-03, UC-DT-04, UC-DT-05, UC-HD-01, UC-HD-02. Tra tại [danh mục chung](../use-case-catalog.md).

## Notes and Constraints

- Hai nhánh tự đặt/đặt hộ hợp nhất trước khi lưu đơn; hai nhánh ký online/ký giấy hợp nhất tại ghi xác nhận.
- Thiếu tài nguyên thực tế thì không nhận và không giữ một phần đơn; khoảng cách do tư vấn tự đánh giá.
- Giao tiếp qua điện thoại/Zalo được thực hiện thủ công ngoài hệ thống, không qua API tự động.
