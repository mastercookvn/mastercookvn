# Stocktake, Food Cost, and Monthly Price Proposal

```mermaid
flowchart TD
    subgraph ThuKho["Warehouse Staff"]
        TK1["Month end: retrieve opening inventory and purchases during the month"]
        TK2["Conduct the physical closing stocktake"]
    end

    subgraph KeToan["Accounting"]
        KT1["Calculate the monthly weighted-average inventory price\nConsumption = opening value + purchases − closing value"]
        KT2["Reconcile and close the figures"]
        KT3["Retrieve dish revenue from meals delivered during the month"]
        KT4{"Revenue > 0?"}
        KT5["Calculate actual food cost and ingredient-level margin"]
        KT6["Record 'undefined'"]
    end

    subgraph Server["Server"]
        SV1{"Month start: does a Price Proposal batch already exist?"}
        SV2["Reuse the existing batch"]
        SV3["Atomically create a new batch with a unique constraint"]
        SV4["Use the 30 days before the month-start boundary\nThree 10-day intervals, weights 1.5 / 1.5 / 2"]
        SV5["Calculate the quantity-weighted average purchase price\nStore the old price and proposed price per line"]
        SV6["Calculate proposed selling price = recipe cost / target food cost"]
    end

    subgraph QuanLy["Branch Manager"]
        QL1["Consider the target food cost for the next period\n(default 35%)"]
        QL2["Accept / edit / skip each ingredient price line"]
        QL3["Update selected ingredient prices\nList affected dishes"]
        QL4["Decide dish selling prices\n(do not change confirmed contracts)"]
    end

    %% Branch 1: Inventory valuation and food cost
    TK1 --> TK2
    TK2 --> KT1
    KT1 --> KT2
    KT2 --> KT3
    KT3 --> KT4
    KT4 -- "Yes" --> KT5
    KT4 -- "No (= 0)" --> KT6
    KT5 --> QL1
    KT6 --> QL1

    %% Branch 2: Price Proposal from purchase history
    SV1 -- "Exists" --> SV2
    SV1 -- "Does not exist" --> SV3
    SV3 --> SV4
    SV2 --> SV4
    SV4 --> SV5
    SV5 --> QL2
    QL2 --> QL3
    QL1 --> SV6
    QL3 --> SV6
    SV6 --> QL4
```

## Scope

Related UCs: UC-KHO-01, UC-KHO-02, UC-KHO-03, UC-KHO-04, UC-DM-01, UC-DM-03, UC-BC-02. See the [main catalogue](../index.md). Rules are in the [specification](../../specification.md); classes are in the [class model](../class.md).

## Notes and Limitations

- The two flows operate independently: inventory valuation calculates the actual month-end food cost, while the Price Proposal derives current prices from the previous 30 days of purchase history at the start of the month.
- Do not use proposed prices to replace stocktake inventory values (or vice versa).
- The month-start Price Proposal batch initialization mechanism (by cron job or catch-up check) guarantees atomicity: each month has exactly one proposal batch, and its calculation boundary is always the first day of the month even when catch-up processing runs late.
