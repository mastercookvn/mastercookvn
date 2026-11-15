# Per-Meal Cancellation and Refund

```mermaid
sequenceDiagram
    participant K as Customer
    participant TV as Consultant
    participant UI as User Interface
    participant XH as Cancellation Processing
    participant HD as Contract
    participant PT as Payment Allocation
    participant GD as Holds / Assignments
    participant KT as Accounting

    K->>UI: Select some or all undelivered meals to cancel
    UI->>XH: Submit the cancellation request and record its timestamp
    activate XH

    loop Each meal to cancel
        XH->>PT: Retrieve the refundable-deposit basis (BR08), prepaid excess, and remaining time
        PT-->>XH: Return the meal's Payment Allocation data
        XH->>XH: Calculate the tiered Refund (BR10)
        note over XH: ">=30 days: 100%\n>=15 and <30 days: 50%\n<15 days: 0%"
        XH->>XH: Add the refundable prepaid excess
    end

    XH->>XH: Aggregate the result for the entire request
    XH-->>UI: Return the Refund calculation
    deactivate XH

    alt Customer confirms
        K->>UI: Confirm cancellation
    else Consultant confirms
        TV->>UI: Confirm cancellation on the customer's behalf
    end

    UI->>HD: Store the cancellation result and create the Refund obligation
    UI->>GD: Release resources and cancel assignments for the correct meals
    GD-->>UI: Confirm resource release
    note over HD: Other meals and settlements for delivered meals remain unchanged

    KT->>KT: Pay the Refund outside the system
    KT->>UI: Record the Refund transaction with its allocation and evidence
    UI->>PT: Update the Refund transaction
    PT->>PT: Recalculate the cancelled meal balance

    alt No amount remains to collect/refund
        PT->>HD: Complete the cancelled meal
        HD->>HD: Check whether all meals have been processed
        alt All meals processed
            HD->>HD: Close the contract
        else Unprocessed meals remain
            note over HD: Contract remains open
        end
    else Collection/Refund obligation remains
        note over PT: Await completion
    end
```

## Scope

Related UCs: UC-HD-06, UC-HD-07. See the [main catalogue](../index.md). Rules are in the [specification](../../specification.md); classes are in the [class model](../class.md).

## Notes and Limitations

- Deposit Refund tiers are based on the days remaining until the meal: $≥ 30$ days returns 100%; from $15$ to under $30$ days returns 50%; under $15$ days returns 0%. Any prepaid amount above the deposit is refunded in full at 100%.
- Cancellation before a deposit is paid incurs no charge.
- A customer no-show is recorded separately and is not treated as a customer-requested cancellation.
- Accounting pays and records the Refund directly; there is no complex multi-level approval workflow.
