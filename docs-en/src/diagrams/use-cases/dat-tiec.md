# Booking

## UC-DT-01

| Field         | Details                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| Name          | Browse the catalog and estimate a price                                        |
| Actor         | Customer                                                                       |
| Goal          | Let the Customer choose dishes and see an estimated cost before Booking.       |
| Trigger       | The Customer explores the service.                                             |
| Preconditions | No sign-in is required.                                                        |
| Postconditions| An estimated price is displayed; no Order is saved and no capacity is reserved. |
| Relationships | Can continue to UC-DT-02 with the current selections.                          |
| Rules         | BR03, BR04                                                                     |

**Main flow**

1. The Customer browses dishes, menu sets, services, and deposit/cancellation policies.
2. The Customer adds a Meal: event date (3–90 days in advance under TS18 and TS20), serving-table count (1–40 tables under TS21 and TS22), people per table (at least 10 under TS01, recommended $\le 12$ under TS02), a menu set or custom dishes (at least 6 currently offered dishes under TS03), and services.
3. The system calculates each Meal's price (dishes × scale factor $n/10$ × serving tables + services + holiday surcharge + tax, rounded to a multiple of VND 500 under TS51) and the estimated total.
4. The system displays the estimate and states clearly that it is not a commitment.

**Alternative flows**

- 2a. Add multiple Meals: repeat steps 2–3.
- 4a. The Customer chooses to book: continue to UC-DT-02 and retain the selections.

**Exceptions**

- 3e. A custom menu has fewer than 6 dishes (TS03), a dish/menu set is discontinued, people per table is below 10 (TS01), the table count is outside [1, 40] (TS21, TS22), or the event date is outside the [3, 90]-day window (TS18, TS20): identify the Meal that must be corrected and do not calculate it.

## UC-DT-02

| Field         | Details                                                                             |
| ------------- | ----------------------------------------------------------------------------------- |
| Name          | Create a catering Order                                                             |
| Actors        | Customer, Consultant                                                                |
| Goal          | Save a request for one or more Meals under the correct Customer profile.            |
| Trigger       | A Customer books online or contacts a Consultant for an on-behalf order.            |
| Preconditions | Self-service: the Customer is signed in. On-behalf order: the Consultant is signed in. |
| Postconditions| The `ChoXacNhan` Order and its `DuKien` Meals are stored on the server; no resources are reserved. |
| Relationships | Extend: on-behalf order (Consultant). Uses the calculation from UC-DT-01.            |
| Rules         | BR01, BR02, BR03, BR04                                                              |

**Main flow**

1. The system obtains the Customer profile from the signed-in Account.
2. The Customer selects an event type and enters general notes.
3. For each Meal, the Customer enters the start/end date and time (3–90 days in advance), address, serving-table count (1–40), people per table ($\ge 10$), setup-table count ($\le$ serving-table count), menu set/dishes ($\ge 6$ custom dishes), and services.
4. The system validates each Meal and calculates each Meal's price and the total.
5. The Customer reviews the summary and submits the Order.
6. The system saves the Order as `ChoXacNhan`, saves its Meals as `DuKien`, and notifies Consultants through the dashboard.

**Alternative flows**

- 1a. On-behalf order: the Consultant enters the Customer's name and phone number normalized to 10 digits. The system finds the profile by phone number or creates a profile if none exists (without creating an Account). A later Customer registration is linked to the profile (UC-TK-01).
- 3a. Continued from UC-DT-01: prefill the Meals from the estimate.
- 5a. Not submitted: keep the draft in the browser only.

**Exceptions**

- 1e. For an on-behalf order, the phone number belongs to a profile with another name: show the existing profile and require the Consultant to confirm the correct person; do not create a second profile.
- 4e. Required information is missing, the date is outside [3, 90] days, the end precedes the start, setup tables > serving tables, people per table < 10, a custom menu has fewer than 6 dishes, or the table count is outside [1, 40]: identify the invalid Meal and do not submit.

## UC-DT-03

| Field         | Details                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------- |
| Name          | Survey the venue                                                                            |
| Actor         | Consultant                                                                                  |
| Goal          | Record site conditions and the distance for each Meal as input to the acceptance decision. |
| Trigger       | A `ChoXacNhan` Order exists; the Consultant communicates with the Customer by phone/Zalo or visits the venue. |
| Preconditions | The Order has not been cancelled or rejected.                                               |
| Postconditions| Each Meal has a separate survey: distance, questions and answers, and condition notes.      |
| Relationships | Input to UC-DT-05.                                                                          |
| Rules         | BR01, BR07                                                                                  |

**Main flow**

1. The Consultant selects an Order and then a Meal.
2. The system displays the address and suggested questions (electricity, water, cooking area, floor/elevator, vehicle access, and area).
3. The Consultant enters answers, condition notes, and the distance in km (looked up manually).
4. The system checks that the distance is ≤ 20 km (TS31) and saves the survey against the Meal.

**Alternative flows**

- 1a. An Order has multiple Meals at the same address: still create a separate survey for each Meal; answers may be copied and then edited.
- 3a. Conditions require a surcharge: record the agreed surcharge against the Meal (for example, a distance > 10 km incurs VND 15,000/km under TS29 and TS30; service ending after 22:00 incurs VND 500,000/hour under TS33; upper floor without an elevator).
- 4a. Edit a survey before Order acceptance: update it and record the user and modification time.

**Exceptions**

- 4e. Distance > 20 km (TS31): save the survey and mark it outside the service area; UC-DT-05 cannot accept it.

## UC-DT-04

| Field         | Details                                                                       |
| ------------- | ----------------------------------------------------------------------------- |
| Name          | Check service capacity                                                        |
| Actor         | Consultant                                                                    |
| Goal          | Determine whether equipment and personnel are sufficient for Meals in their time windows. |
| Trigger       | A Consultant checks before acceptance; called from UC-DT-05 and UC-HD-05.     |
| Preconditions | The Meal has a resource-use window, setup-table count, and attendee count.    |
| Postconditions| Returns sufficient capacity or a shortage list; creates no reservation.       |
| Relationships | Included by UC-DT-05 and UC-HD-05.                                            |
| Rules         | BR07, BR12, BR13                                                              |

**Main flow**

1. The Consultant enters or verifies the equipment-use window (including the 12-hour sanitation isolation period under TS36) and personnel work hours (personnel arrive 3 hours early under TS35).
2. The system excludes expired temporary reservations (older than 24 hours under TS16).
3. For each equipment type, the system calculates demand = ceil(standard quantity × basis × (1 + 10% buffer under TS08)); bulky-item quantities are entered manually.
4. The system aggregates quantities already reserved in overlapping time windows (other Orders + other Meals in the same Order), compares them with usable owned quantities, and checks the branch-wide limits of $\le 100$ tables/day (TS56) and $\le 3$ events/day (TS11).
5. The system calculates suggested personnel: service staff = ceil(setup tables / 3) (TS42), kitchen staff = max(2, ceil(serving tables / 5)) (TS43), loading staff = 2 people / 10 tables when a tent is included (TS44). It adds expected personnel demand from overlapping Meals and compares it with available personnel, ensuring $\le 12$ work hours/day under TS40 and $\ge 8$ hours of rest between two shifts under TS41.
6. The system returns sufficient/insufficient results for each Meal and each type.

**Alternative flows**

- 5a. The Consultant adjusts expected personnel demand by position: recalculate.
- 6a. An equipment category is below minimum stock but still sufficient: show a warning only.

**Exceptions**

- 1e. The resource window does not cover the service time: require correction.
- 6e. An actual shortage exists or a branch capacity limit is exceeded (100 tables/day or 3 events/day): return the shortage list; the Consultant adjusts the Meal or rejects the Order.

## UC-DT-05

| Field         | Details                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- |
| Name          | Accept or reject an Order                                                                           |
| Actor         | Consultant                                                                                          |
| Goal          | Let the branch decide whether to accept the entire Order and reserve resources temporarily.        |
| Trigger       | All Meals in the Order have been surveyed.                                                          |
| Preconditions | The Order is `ChoXacNhan`; every Meal has a survey.                                                 |
| Postconditions| Accepted: Order `DaNhan`, temporary reservation for 24 hours (TS16), then contract drafting. Rejected: Order `BiTuChoi` with a reason. |
| Relationships | Includes UC-DT-04. After acceptance, continue to UC-HD-01.                                         |
| Rules         | BR01, BR07                                                                                          |

**Main flow**

1. The Consultant opens the Order and reviews every Meal's survey and price.
2. The system runs UC-DT-04 for the entire Order.
3. The Consultant chooses to accept.
4. In one transaction, the system rechecks resources and records temporary reservations for all Meals with a 24-hour expiry (TS16).
5. The system changes the Order to `DaNhan` and opens UC-HD-01.

**Alternative flows**

- 3a. More discussion is required: keep `ChoXacNhan` and add a note.
- 3b. Reject: enter a reason; the system changes the Order to `BiTuChoi`, changes its Meals to `DaHuy`, and reserves no resources.

**Exceptions**

- 2e. A Meal is beyond 20 km (TS31) or resources are insufficient: do not accept; partial Order acceptance is not allowed.
- 4e. Another Order has just taken the resources: roll back the transaction and display the shortage.

## UC-DT-06

| Field         | Details                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Name          | Look up Orders, Contracts, and payment history                                                   |
| Actors        | Customer, Consultant, Accountant                                                                 |
| Goal          | View Order/Meal status, Contract contents, Contract Addenda, and receipt/refund transactions.    |
| Trigger       | A user needs to look up information.                                                             |
| Preconditions | The user is signed in.                                                                           |
| Postconditions| Data within the user's permission scope is displayed; no data is changed.                        |
| Relationships | Entry point for UC-HD-02, UC-HD-03, UC-HD-05, UC-HD-06, and UC-CS-01.                            |
| Rules         | BR02, BR11                                                                                       |

**Main flow**

1. The system lists Orders: a Customer sees Orders belonging to their profile; employees see all Orders.
2. The user filters by status, event date, and Customer phone number/name (employees only).
3. The user selects an Order.
4. The system displays the Meals and their statuses, Contract, Contract Addenda, signed files, receipt/refund transactions, and each Meal's balance.

**Alternative flows**

- 4a. The Contract is awaiting confirmation/deposit: display its deadline and confirmation/payment buttons.

**Exceptions**

- 3e. A Customer opens an Order that does not belong to their profile: deny access.
