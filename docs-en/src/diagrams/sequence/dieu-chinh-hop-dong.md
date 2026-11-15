# Per-Meal Contract Addendum

```mermaid
sequenceDiagram
    participant K as Customer
    participant TV as Consultant
    participant UI as User Interface
    participant HD as Contract / Contract Addendum
    participant TG as Pricing
    participant TR as Capacity Check
    participant TT as Payment
    participant DB as Storage

    K->>UI: Select the meal to change
    UI->>HD: Verify that the meal belongs to the contract and has no pending Contract Addendum
    HD-->>UI: Confirm meal eligibility

    alt Change dishes (at least 5 days remain)
        TV->>UI: Replace selected dishes (do not increase the dish count)
        UI->>TG: Calculate the dish price difference using frozen prices
        TG-->>UI: Return the difference
    else Change serving tables (at least 3 days remain)
        TV->>UI: Enter the new table count (decrease no more than 15% from the originally signed count)
        UI->>TG: Calculate the serving-table price difference
        TG-->>UI: Return the difference
        opt Increase the table count
            UI->>TR: Run a Capacity Check for the additional tables
            TR-->>UI: Return the Capacity Check result
        end
    end

    UI->>HD: Create a Contract Addendum with before/after terms
    activate HD
    HD->>HD: Determine the additional deposit if the increase exceeds 3 tables (50% of the increase)
    HD-->>UI: Contract Addendum created
    deactivate HD

    alt Online confirmation
        K->>UI: Confirm the Contract Addendum through the account
        UI->>HD: Record online confirmation
    else Paper signature
        TV->>UI: Upload the signed paper Contract Addendum
        UI->>HD: Store the signed paper copy
    end

    opt Additional deposit required
        UI->>TT: Collect the additional deposit through the shared payment flow
        TT-->>UI: Confirm deposit receipt
    end

    TT->>TT: Check whether all conditions for applying the Contract Addendum are met
    alt Conditions met
        UI->>TR: Re-run the Capacity Check
        TR-->>UI: Confirm capacity
        UI->>DB: Update the meal and its holds in one transaction
        DB-->>UI: Confirm the update
        note over HD,DB: Preserve all other meals and the original contract snapshot
    else Conditions not met
        UI-->>K: Report that the Contract Addendum was not applied
    end
```

## Scope

Related UCs: UC-HD-05, UC-HD-03, UC-HD-04. See the [main catalogue](../index.md). Rules are in the [specification](../../specification.md); classes are in the [class model](../class.md).

## Notes and Limitations

- A Contract Addendum cannot reschedule the meal date.
- Changing dishes requires $≥ 5$ days before the meal (replace dishes only; do not increase the dish count). Changing serving tables requires $≥ 3$ days before the meal (maximum decrease: 15%).
- A deposit surplus caused by reducing tables is retained and offset during Meal Settlement (not refunded immediately and does not cancel the contract).
