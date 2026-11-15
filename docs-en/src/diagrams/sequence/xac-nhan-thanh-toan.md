# Confirmation, Deposit, and Payment

```mermaid
sequenceDiagram
    participant K as Customer
    participant TV as Consultant
    participant KT as Accounting
    participant UI as User Interface
    participant HD as Contract
    participant TT as Payment
    participant DV as Payment Service
    participant TR as Resource Hold

    UI->>HD: Read the issued contract snapshot
    HD-->>UI: Return the contract, deposit deadline, and confirmation status

    alt Online confirmation
        K->>UI: Confirm the contract terms through the account
        UI->>HD: Record online confirmation
    else Counter confirmation
        TV->>UI: Record the paper signature and upload the file
        UI->>HD: Store the signed paper copy
    end
    HD-->>UI: Confirm signature

    K->>UI: Select the deposit amount (50% - 100%)
    UI->>TT: Create an online payment request
    activate TT
    TT->>TT: Generate a reference and planned Payment Allocation by meal
    TT-->>UI: Return payment request details
    deactivate TT

    alt Online payment through the service
        K->>DV: Make the payment
        DV-->>TT: Report the transaction result
        activate TT
        TT->>TT: Validate the notification source and transaction ID
        TT->>TT: Record success only once (idempotent)
        deactivate TT
    else Cash or out-of-band bank transfer
        KT->>UI: Record the amount received and its Payment Allocation by meal
        UI->>TT: Store the received-payment transaction
    end

    TT->>TT: Check confirmation and required deposit sufficiency
    alt Conditions met
        TT->>HD: Make the contract effective
        TT->>TR: Convert temporary holds to confirmed holds
        TR-->>TT: Confirm the confirmed holds
        HD-->>UI: Contract effective
    else Conditions not met
        note over TT,HD: Wait for all conditions; release capacity upon expiry
    end

    opt Pay the remaining amount
        K->>UI: Pay the remaining balance
        UI->>TT: Process the additional payment
        TT->>TT: Allocate by meal and update the settlement balance
        TT-->>UI: Confirm payment in full
    end
```

## Scope

Related UCs: UC-HD-02, UC-HD-03, UC-HD-04. See the [main catalogue](../index.md). Rules are in the [specification](../../specification.md); classes are in the [class model](../class.md).

## Notes and Limitations

- Contract signing and payment collection are separate. Their order is flexible, but both conditions must be met before the contract becomes effective.
- Duplicate transaction recording is prevented through reference-based idempotency.
- If the hold expires before the required deposit is met, resources are released automatically. A late payment is routed to Accounting for a Refund; it does not automatically restore capacity.
