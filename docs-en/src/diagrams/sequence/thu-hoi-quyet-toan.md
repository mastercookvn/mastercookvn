# Equipment Return and Meal Settlement

```mermaid
sequenceDiagram
    participant TK as Warehouse Staff
    participant DC as Equipment / Counting
    participant QT as Meal Settlement
    participant KT as Accounting
    participant TT as Payment
    participant HD as Contract

    note over TK,DC: Before the meal
    TK->>DC: Create an issue note from meal demand
    activate DC
    DC->>DC: Check holds and actual readiness
    DC->>DC: Record the issue exactly once
    DC-->>TK: Confirm equipment issue
    deactivate DC

    note over TK,DC: After the meal
    TK->>DC: Read the issued quantity and frozen compensation prices
    TK->>DC: Enter good, damaged, and lost returns plus the customer-liable quantity
    activate DC
    DC->>DC: Validate total balance and the customer-liability limit
    DC->>DC: Calculate compensation
    DC-->>TK: Confirm the count
    deactivate DC

    TK->>DC: Update Equipment status
    activate DC
    DC->>DC: Good → ready; damaged → unavailable; lost → reduce owned quantity
    DC->>DC: Release the meal hold (do not update twice)
    DC-->>TK: Confirm inventory update
    deactivate DC

    TK->>QT: Create the Meal Settlement
    activate QT
    QT->>QT: Calculate from current prices, compensation, and successfully allocated transactions
    QT-->>TK: Return the settlement balance
    deactivate QT

    alt Positive balance (amount due)
        KT->>TT: Collect the remainder
        TT-->>QT: Update the collection transaction
    else Negative balance (Refund required)
        QT->>KT: Record the Refund obligation
        KT->>KT: Process the Refund
    else Zero balance
        note over QT: Meal can be closed
    end

    QT->>HD: Close the settled meal
    HD->>HD: Check that every meal is complete/cancelled and fully settled
    alt All meals processed
        HD->>HD: Close the contract
        HD-->>KT: Notify Accounting that the contract is closed
    else Unprocessed meals remain
        note over HD: Contract awaits the remaining meals
    end
```

## Scope

Related UCs: UC-KHO-06, UC-KHO-07, UC-HD-08, UC-HD-03, UC-HD-04, UC-HD-07. See the [main catalogue](../index.md). Rules are in the [specification](../../specification.md); classes are in the [class model](../class.md).

## Notes and Limitations

- If a meal uses no Equipment, skip the counting-record step.
- Ingredients are not deducted per meal; ingredient consumption is calculated during the monthly Stocktake period.
- Deferred debt is not supported. A contract closes only when every meal is complete/cancelled and the outstanding balance is 0.
