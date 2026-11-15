# Overall Booking Workflow

```mermaid
flowchart TD
    subgraph Khach["Customer"]
        K1["Create an order (1+ meals)"]
        K2["Request a meal change/cancellation"]
        K3["Submit a review (optional)"]
        K4["Sign online"]
    end

    subgraph TuVan["Consulting"]
        T1["Book on the customer's behalf / help create the order"]
        T2["Complete the site survey Q&A, distance, and resource window"]
        T3{"Accept or reject the order?"}
        T4["Record the paper signature and confirm"]
        T5["Assign staff/equipment to the meal"]
        T6["Process the meal change/cancellation request"]
    end

    subgraph HeTong["System"]
        H1["Store the order and its meals"]
        H2["Issue the shared contract and place a 24-hour temporary hold"]
        H3{"Signed and deposit sufficient?"}
        H4["Contract becomes effective"]
        H5{"Has the 24-hour deadline expired?"}
        H6["End the hold and release resources"]
        H7{"All meals complete and balance = 0?"}
        H8["Complete the contract"]
    end

    subgraph NhanSuKho["Staff / Warehouse"]
        NK1["Prepare and issue equipment"]
        NK2["Serve the meal"]
        NK3["Count returned equipment"]
        NK4["Month end: aggregate receipts, conduct a physical stocktake, close inventory/food cost"]
    end

    subgraph KeToan["Accounting"]
        KT1["Collect the deposit"]
        KT2["Process collected funds (if any)"]
        KT3["Collect/refund by meal and perform Meal Settlement"]
        KT4["Month start: create the ingredient Price Proposal"]
    end

    K1 --> H1
    T1 --> H1
    H1 --> T2
    T2 --> T3
    T3 -- "Reject" --> BiTuChoi(["Order rejected"])
    T3 -- "Accept" --> H2
    H2 --> K4
    H2 --> T4
    H2 --> KT1
    K4 --> H3
    T4 --> H3
    KT1 --> H3
    H3 -- "Not yet" --> H5
    H5 -- "Expired" --> H6
    H6 --> KT2
    H6 --> HetHan(["Hold ended"])
    H3 -- "Signed + deposit sufficient" --> H4

    H4 --> LoopBua["Repeat for each meal"]
    LoopBua --> T5
    T5 --> NK1
    NK1 --> NK2
    NK2 --> NK3
    NK3 --> KT3
    KT3 --> H7

    K2 --> T6
    T6 --> LoopBua

    H7 -- "No" --> LoopBua
    H7 -- "Yes" --> H8
    H8 --> K3

    NK4 --> KT4
```

## Scope

Related UCs: UC-DT-02, UC-DT-03, UC-DT-04, UC-DT-05, UC-HD-01, UC-HD-02, UC-HD-03, UC-HD-04, UC-NS-02, UC-KHO-06, UC-KHO-07, UC-HD-08. See the [main catalogue](../index.md). Rules are in the [specification](../../specification.md); classes are in the [class model](../class.md).

## Notes and Limitations

- The diagram omits on-site operational steps (check-in, paper handover signatures, condition photographs, or equipment returned in multiple batches).
- Party cancellation and Contract Addendum branches are detailed in their corresponding sequence diagrams.
