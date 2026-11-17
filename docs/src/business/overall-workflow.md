---
order: 10
---

# Overall Workflow

```mermaid
flowchart TD
    subgraph Customer["Customer"]
        Customer1["Create order (1+ meals)"]
        Customer2["Request meal adjustment/cancellation"]
        Customer3["Review (optional)"]
        Customer4["Sign online"]
    end

    subgraph Consultant["Consultant"]
        Consultant1["Book on behalf / assist with order"]
        Consultant2["Survey Q&A, enter distance & resource windows"]
        Consultant3{"Accept or reject order?"}
        Consultant4["Paper signature & confirmation"]
        Consultant6["Handle meal adjustment/cancellation request"]
    end

    subgraph HRManager["HR manager"]
        Staffing1["Assign staff to meal"]
    end

    subgraph System["System"]
        System1["Save order & meals"]
        System2["Issue shared contract, reserve temporarily for 24 hours"]
        System3{"Signed + deposit sufficient?"}
        System4["Contract active"]
        System5{"24 hours expired?"}
        System6["End reservation, release resources"]
        System7{"All meals finished & balance = 0?"}
        System8["Complete contract"]
    end

    subgraph StaffWarehouse["Staff / Storekeeper"]
        Operations1["Prepare & issue equipment"]
        Operations2["Serve meal"]
        Operations3["Count recovered equipment"]
        Operations4["Month end: summarize receipts, count actual inventory"]
    end

    subgraph Accountant["Accountant"]
        Accountant1["Collect deposit"]
        Accountant2["Handle payments received (if any)"]
        Accountant3["Collect/refund per meal & settle"]
        Accountant4["Reconcile, close inventory and monthly food cost"]
    end

    subgraph Server["Server"]
        Server1["Month start: create price proposal batch independently of period closing"]
    end

    Customer1 --> System1
    Consultant1 --> System1
    System1 --> Consultant2
    Consultant2 --> Consultant3
    Consultant3 -- "Reject" --> Rejected(["Order rejected"])
    Consultant3 -- "Accept" --> System2
    System2 --> Customer4
    System2 --> Consultant4
    System2 --> Accountant1
    Customer4 --> System3
    Consultant4 --> System3
    Accountant1 --> System3
    System3 -- "Insufficient" --> System5
    System5 -- "Expired" --> System6
    System6 --> Accountant2
    System6 --> Expired(["Reservation ended"])
    System3 -- "Signed + deposit sufficient" --> System4

    System4 --> MealLoop["Repeat for each non-cancelled meal"]
    MealLoop --> Staffing1
    Staffing1 --> Operations1
    Operations1 --> Operations2
    Operations2 --> Operations3
    Operations3 --> Accountant3
    Accountant3 --> System7
    Accountant3 --> ReviewEligible{"Meal served and COMPLETED?"}
    ReviewEligible -- "Yes" --> Customer3

    Customer2 --> Consultant6
    Consultant6 --> System7

    System7 -- "Not yet" --> MealLoop
    System7 -- "Yes" --> System8
    Operations4 --> Accountant4
```

## Scope

UC liên quan: UC-DT-02, UC-DT-03, UC-DT-04, UC-DT-05, UC-HD-01 đến UC-HD-08, UC-NS-02, UC-KHO-02 đến UC-KHO-04, UC-KHO-06, UC-KHO-07, UC-CS-01. Tra tại [danh mục chung](./use-case-catalog.md).

## Notes and Constraints

- Không vẽ các bước nghiệp vụ hiện trường (check-in, ký bàn giao giấy tờ, chụp ảnh hiện trạng hay thu hồi dụng cụ nhiều đợt).
- Các nhánh hủy tiệc hoặc điều chỉnh hợp đồng được chi tiết hóa tại các sơ đồ sequence riêng biệt tương ứng.
