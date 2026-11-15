# Customer Booking and Assisted Booking

```mermaid
sequenceDiagram
    participant K as Customer
    participant TV as Consultant
    participant UI as User Interface
    participant DH as Order Processing
    participant HS as Customer Profile
    participant TR as Capacity Check
    participant HD as Contract
    participant DB as Storage

    alt Customer booking
        K->>UI: Sign in and open the booking form
        UI->>HS: Retrieve the profile from the account
        HS-->>UI: Return the customer profile
    else Assisted booking
        TV->>UI: Find a profile by name and phone number
        UI->>HS: Search profiles
        alt Found
            HS-->>UI: Return the existing profile
        else Not found
            TV->>UI: Create a new profile (without creating an account)
            UI->>HS: Save the new profile
            HS-->>UI: Confirm profile creation
        end
    end

    TV->>UI: Enter the site-survey Q&A for each meal
    TV->>UI: Enter the distance and resource usage window

    K->>UI: Submit the meal list (time, location, serving tables, setup tables/chairs, dishes, services)
    UI->>DH: Create the order
    activate DH
    DH->>DH: Calculate the total for all meals
    DH->>DB: Store the order pending confirmation
    DB-->>DH: Confirm storage
    deactivate DH

    TV->>UI: Confirm order acceptance
    UI->>DH: Request confirmation and temporary holds
    activate DH
    DH->>TR: Check all meals and hold external effects
    activate TR
    TR->>TR: Calculate staff demand from setup tables
    deactivate TR
    alt Sufficient capacity and within 20 km
        TR-->>DH: Capacity valid
        DH->>HD: Issue the shared contract
        activate HD
        HD->>HD: Freeze the terms and set a 24-hour deadline
        HD->>DB: Temporarily hold all meals in one transaction
        DB-->>HD: Confirm the holds
        deactivate HD
        DH-->>UI: Contract issued
    else Insufficient capacity or beyond 20 km
        TR-->>DH: Return the rejection reason
        DH-->>UI: Display the reason; do not partially hold the order
    end
    deactivate DH

    alt Customer has an account
        UI->>HS: Send the pending contract to the profile
        HS-->>K: Receive the contract through the account
    else Unregistered customer
        note over K,TV: Customer signs a paper copy at the counter
        TV->>UI: Upload the signed paper copy
        UI->>HD: Store the signed copy
        HD-->>UI: Confirm storage
    end
```

## Scope

Related UCs: UC-DT-01, UC-DT-02, UC-DT-03, UC-DT-04, UC-DT-05, UC-HD-01, UC-HD-02. See the [main catalogue](../index.md). Rules are in the [specification](../../specification.md); classes are in the [class model](../class.md).

## Notes and Limitations

- The customer-booking and assisted-booking branches merge before the order is stored; the online-signature and paper-signature branches merge when confirmation is recorded.
- Insufficient capacity or a distance beyond 20 km returns a rejection reason; no part of the order is held.
- Phone/Zalo communication is handled manually outside the system, not through an automated API.
