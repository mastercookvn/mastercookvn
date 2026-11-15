# Capacity Check

```mermaid
flowchart TD
    subgraph TuVan["Consulting"]
        TV1["Receive the meals to check\n(serving tables, guests, setup tables/chairs, resource window)"]
        TV2{"Distance <= 20 km?"}
        TV3{"Valid time and resource window?"}
        TV4["Confirm order acceptance / apply the Contract Addendum"]
        TV5["Report shortage — do not accept yet"]
    end

    subgraph KiemTraTaiNguyen["Capacity Check"]
        KT1["Calculate equipment demand\n(by guest, setup table, and meal)"]
        KT2["Remove expired temporary holds"]
        KT3["Aggregate overlapping holds + meals in the order being checked"]
        KT4{"Compare with usable owned quantity — sufficient?"}
        KT5["Suggest staff: ceil(setup tables / 3)"]
        KT6["Aggregate expected demand by position\n(all held meals within the time window)"]
        KT7{"Sufficient staff capacity?"}
        KT8["Stock < minimum level → Warning (non-blocking)"]
        KT9["Recheck and record the hold atomically"]
        KT10["Also check actual ready quantity (when issuing)"]
    end

    subgraph DuLieu["Hold / assignment / warehouse data"]
        DL1[("Temporary and confirmed hold records")]
        DL2[("Staff assignments")]
        DL3[("Equipment inventory")]
    end

    TV1 --> TV2
    TV2 -- "No" --> TV5
    TV2 -- "Yes" --> TV3
    TV3 -- "Invalid" --> TV5
    TV3 -- "Valid" --> KT1
    KT1 --> KT2
    KT2 --> KT3
    KT3 --> DL1
    DL1 --> KT4
    KT4 -- "Actual shortage" --> TV5
    KT4 -- "Sufficient" --> KT8
    KT8 --> KT5
    KT5 --> KT6
    KT6 --> DL2
    DL2 --> KT7
    KT7 -- "Insufficient" --> TV5
    KT7 -- "Sufficient" --> TV4
    TV4 --> KT9
    KT9 --> DL1
    TV4 --> KT10
    KT10 --> DL3
```

## Scope

Related UCs: UC-DT-04, UC-DT-05, UC-HD-05, UC-NS-02, UC-KHO-06. See the [main catalogue](../index.md). Rules are in the [specification](../../specification.md); classes are in the [class model](../class.md).

## Notes and Limitations

- The check excludes transport vehicles, weather, health certificates, individual leave schedules, an automated maps API, and ingredient inventory (it checks only Equipment and staff).
- A hold whose equipment has already been physically issued is not deducted twice from available capacity (in accordance with the invariant in [`class.md`](../class.md)).
- The minimum stock threshold is only a Dashboard warning; an order is rejected only when the actual available quantity is below the required quantity.
