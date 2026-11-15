# Contracts and Payments

## UC-HD-01

| Field         | Details                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| Name          | Draft and issue a Contract                                                                           |
| Actor         | Consultant                                                                                           |
| Goal          | Finalize the Meals and their prices in one Contract for Customer confirmation and deposit.           |
| Trigger       | The Order has just been accepted (UC-DT-05).                                                         |
| Preconditions | The Order is `DaNhan` and its temporary reservations have not expired.                               |
| Postconditions| A `ChoXacNhanCoc` Contract contains the finalized content/prices, a 24-hour deadline, and minimum deposit. |
| Relationships | Follows UC-DT-05; followed by UC-HD-02 and UC-HD-03/UC-HD-04.                                        |
| Rules         | BR01, BR04, BR07, BR08                                                                                |

**Main flow**

1. The system generates a Contract from the Order: party A, Customer, each Meal (time, location, serving tables, setup tables, dishes, services, and surcharges), and deposit/change/cancellation/compensation terms.
2. The Consultant reviews it and adjusts any agreed surcharge.
3. The system calculates each Meal total, the Contract total, a 50% minimum deposit (TS06), and a deposit deadline equal to the 24-hour temporary-reservation deadline (TS16). The finalized quotation is valid for 7 days (TS15).
4. The Consultant issues the Contract.
5. The system saves the snapshot (names, quantities, unit prices, tax, surcharges, and equipment compensation prices); later catalog changes do not alter it.
6. The Contract appears in the Customer profile (UC-DT-06); the Consultant notifies the Customer through Zalo or by phone.

**Alternative flows**

- 6a. The Customer has no Account: the Consultant prints the Contract for an in-person signature (UC-HD-02).

**Exceptions**

- 4e. The temporary reservation has expired: do not issue the Contract; the Order becomes `HetHan` and must be recreated or accepted again.

## UC-HD-02

| Field         | Details                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------- |
| Name          | Confirm a Contract                                                                            |
| Actors        | Customer, Consultant                                                                          |
| Goal          | Record the Customer's agreement to the finalized Contract.                                    |
| Trigger       | The Contract has been issued.                                                                 |
| Preconditions | The Contract is `ChoXacNhanCoc` and has not expired.                                          |
| Postconditions| Confirmation is saved; once the deposit is sufficient, the Contract becomes `CoHieuLuc` and temporary reservations become confirmed. |
| Relationships | Runs in parallel with UC-HD-03/UC-HD-04; either may happen first.                              |
| Rules         | BR02, BR07, BR08                                                                               |

**Main flow**

1. The Customer opens the Contract from UC-DT-06.
2. The system displays the finalized snapshot, deposit deadline, and minimum deposit.
3. The Customer agrees.
4. The system records the online method, Account, time, and content version.
5. The system checks the deposit: if confirmation and deposit are sufficient, the Contract becomes `CoHieuLuc`, its Meals become `DaXacNhan`, and reservations become confirmed.

**Alternative flows**

- 1a. Paper signature at the branch: the Consultant opens the Contract, uploads the signed copy, enters the signatory and time, and continues to step 5.
- 5a. The deposit is insufficient: keep `ChoXacNhanCoc` and display the amount still due.

**Exceptions**

- 1e. The deadline has passed: the Contract becomes `HetHan` and cannot be confirmed (BR07).
- 1f. A paper signature has no uploaded file: do not mark it signed.

## UC-HD-03

| Field         | Details                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------- |
| Name          | Pay online                                                                                  |
| Actors        | Customer, Payment Service                                                                   |
| Goal          | Let the Customer pay the deposit, additional deposit, or remaining balance through QR/online payment. |
| Trigger       | The Customer chooses to pay against a Contract/Meal.                                        |
| Preconditions | An amount is due; the Contract has neither expired nor been cancelled.                      |
| Postconditions| A `ThanhCong` transaction is recorded exactly once and allocated by Meal; balances and effectiveness are updated. |
| Relationships | Called from UC-HD-02, UC-HD-05, and UC-HD-08.                                               |
| Rules         | BR01, BR08, BR11                                                                             |

**Main flow**

1. The system displays the amount due: deposit (50–100% of the total under TS06 and TS07), additional deposit, or Meal Settlement balance.
2. The Customer selects an amount (for a deposit, within 50–100%).
3. The system creates a `Cho` transaction with a reference code and a proposed allocation proportional to Meal value, then displays a QR code valid for 15 minutes (TS17).
4. The Customer transfers the money.
5. The Payment Service sends the result notification.
6. The system verifies the source, transaction code, and amount; it records `ThanhCong` and the allocation.
7. The system recalculates balances; for a deposit, sufficient confirmation + deposit makes the Contract `CoHieuLuc`.

**Alternative flows**

- 5a. The payment fails or is cancelled: the transaction becomes `ThatBai`; the Customer may retry.
- 7a. An additional deposit for a Contract Addendum is paid: once sufficient, apply the Contract Addendum (UC-HD-05).

**Exceptions**

- 5e. The Customer reports payment but no notification exists: do not recognize it; continue to UC-HD-04 if evidence exists.
- 6e. A notification repeats the same code: do not record another transaction.
- 6f. Money arrives after the Contract becomes `HetHan`: record the transaction, do not restore capacity, and notify the Accountant to refund it (UC-HD-07).

## UC-HD-04

| Field         | Details                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------ |
| Name          | Record a manual payment                                                                    |
| Actor         | Accountant                                                                                 |
| Goal          | Record cash or a bank transfer outside the QR flow.                                        |
| Trigger       | The Customer pays cash or makes a direct bank transfer.                                    |
| Preconditions | An amount is due and the Accountant has actually received the money.                       |
| Postconditions| A `ThanhCong` transaction has evidence and is allocated by Meal; balances and effectiveness are updated. |
| Relationships | Alternative to UC-HD-03.                                                                   |
| Rules         | BR01, BR08, BR11                                                                           |

**Main flow**

1. The Accountant finds the Contract (UC-DT-06).
2. The system displays the amount due by type (deposit / additional deposit / settlement).
3. The Accountant enters the amount, method, received date, document code, and an attached image if available.
4. The system proposes an allocation by Meal; the Accountant confirms it.
5. The system records `ThanhCong`, recalculates balances, and updates effectiveness as in step 7 of UC-HD-03.

**Alternative flows**

- 4a. The Accountant changes the allocation: the allocated total must equal the payment amount.

**Exceptions**

- 3e. The amount is not positive or the document code is duplicated: do not record it.
- 5e. The Contract is `HetHan`: record the money, do not restore capacity, and create an amount to refund.

## UC-HD-05

| Field         | Details                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- |
| Name          | Adjust a Meal with a Contract Addendum                                                              |
| Actors        | Customer, Consultant                                                                                 |
| Goal          | Change dishes or the serving-table count of one Meal without overwriting the original Contract.     |
| Trigger       | The Customer requests a change through Zalo/by phone; the Consultant drafts a Contract Addendum.    |
| Preconditions | The Contract is `CoHieuLuc`; the Meal is `DaXacNhan` and has not occurred; no other Contract Addendum is pending for the Meal. |
| Postconditions| The Contract Addendum is `DaApDung`; the Meal and reservations are updated; other Meals are unchanged. |
| Relationships | Includes UC-DT-04 when tables increase. May call UC-HD-03/UC-HD-04 for an additional deposit.        |
| Rules         | BR09                                                                                                |

**Main flow**

1. The Consultant selects a Contract and then a Meal.
2. The Consultant enters changes: replace dishes (without increasing the dish count) and/or change the serving-table count.
3. The system checks deadlines: dish changes require ≥ 5 days remaining (TS23), table changes require ≥ 3 days (TS24), and the reduction is ≤ 15% of the originally contracted table count (TS25, rounded down).
4. If tables increase, the system runs UC-DT-04.
5. The system calculates the difference (new dishes use current prices; unchanged dishes retain their prices); if the increase is > 3 tables, the additional deposit is 50% of the increase.
6. The system drafts a `ChoXacNhan` Contract Addendum containing before/after details, the difference, and the additional deposit.
7. The Customer confirms online, or the Consultant uploads a signed paper Contract Addendum.
8. If no additional deposit is required, in one transaction the system rechecks resources, updates the Meal and reservations, and sets the Contract Addendum to `DaApDung`.

**Alternative flows**

- 5a. A table reduction creates a credit: do not refund immediately; offset it in UC-HD-08.
- 7a. The Customer disagrees: the Consultant cancels the Contract Addendum (`DaHuy`); the Meal remains unchanged.
- 8a. An additional deposit is required: the Contract Addendum becomes `ChoCocBoSung`; collect through UC-HD-03/UC-HD-04 and then continue at step 8.

**Exceptions**

- 2e. Rescheduling, adding a new dish, or changing a service outside the Contract is unsupported.
- 3e. The deadline has passed or the reduction exceeds 15%: reject that change.
- 4e. Resources are insufficient for the increase: reject the increase.
- 8e. Resources are taken before application: do not apply and notify the Consultant.

## UC-HD-06

| Field         | Details                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------- |
| Name          | Cancel a Meal or Contract                                                                       |
| Actors        | Customer, Consultant                                                                            |
| Goal          | Stop service for selected Meals and calculate the refund obligation at the request time.        |
| Trigger       | The Customer requests cancellation.                                                             |
| Preconditions | The Meal has not started service and is not already cancelled.                                  |
| Postconditions| The Meal is `DaHuy`; reservations and assignments are released; a refund/retained amount exists; other Meals continue. |
| Relationships | If an amount must be refunded, continue to UC-HD-07.                                            |
| Rules         | BR01, BR08, BR10, BR11                                                                          |

**Main flow**

1. The Customer (from UC-DT-06) or Consultant selects one or more Meals to cancel.
2. The system records the request time.
3. For each Meal, the system calculates from the deposit (50% of Meal value), any prepayment above the deposit (refunded 100%), and the mandatory deposit-refund tier based on days remaining (TS27: $\ge 30$ days refunds 100% of the required deposit with a VND 0 fee; 15–<30 days refunds 50%; < 15 days or Customer no-show at the event refunds 0%).
4. The system displays the refund and retained amount for each Meal and the total.
5. The requester confirms cancellation.
6. The system sets the Meal to `DaHuy`, releases equipment reservations, cancels assignments, and records the refund obligation.
7. If every Meal is cancelled, the Contract becomes `DaHuy`; refund tracking continues.

**Alternative flows**

- 1a. Cancel the entire Contract: select all unperformed Meals; completed Meals retain their settlement.
- 3a. No deposit has been paid: cancel without charge; if the entire Order is affected, the Order becomes `DaHuy`.
- 6a. Equipment was already issued: it must still be recovered and counted (UC-KHO-07).

**Exceptions**

- 1e. The Meal is in service or finished: it cannot be cancelled.
- 3e. Do not use an employee's processing time to change the refund tier; never refund more than the amount received.

## UC-HD-07

| Field         | Details                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------- |
| Name          | Record a refund                                                                                 |
| Actor         | Accountant                                                                                      |
| Goal          | Record an amount returned to the Customer with evidence.                                       |
| Trigger       | An amount is due after cancellation, a credit from Meal Settlement, or money arriving after expiry. |
| Preconditions | Amount to refund > 0.                                                                           |
| Postconditions| A `ThanhCong` refund transaction is allocated by Meal and has a receipt/evidence; balances are updated. |
| Relationships | Called from UC-HD-06 and UC-HD-08.                                                              |
| Rules         | BR10, BR11                                                                                      |

**Main flow**

1. The Accountant opens the list of amounts to refund (dashboard or UC-DT-06).
2. The Accountant pays the Customer outside the system (cash/bank transfer).
3. The Accountant enters the amount, method, date, and attaches a receipt (signed Word file/transfer image).
4. The system records a new refund transaction, allocates it by Meal, and recalculates balances.

**Alternative flows**

- 3a. Refund in multiple installments: each installment is a transaction; close the amount when fully refunded.

**Exceptions**

- 3e. The refund exceeds the remaining amount due or evidence is missing: do not record it.

## UC-HD-08

| Field         | Details                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------- |
| Name          | Perform Meal Settlement and complete a Contract                                           |
| Actor         | Accountant                                                                                |
| Goal          | Offset amounts exactly once and close the Meal and Contract when no obligations remain.   |
| Trigger       | A Meal is `ChoQuyetToan`, or a `DaHuy` Meal still has a financial obligation.             |
| Preconditions | Equipment has been counted if it was issued.                                              |
| Postconditions| Meal balance = 0 and Meal `HoanTat`; when all Meals are complete, Contract `HoanTat`.      |
| Relationships | Positive balance: UC-HD-03/UC-HD-04. Negative balance: UC-HD-07.                          |
| Rules         | BR01, BR11, BR13                                                                          |

**Main flow**

1. The Accountant selects a Meal for settlement.
2. The system aggregates the current Meal value (including Contract Addenda), equipment compensation, and receipts/refunds allocated to the Meal.
3. The system calculates balance = settlement total − receipts + refunds and creates a Meal Settlement statement.
4. Balance = 0: the Accountant confirms and the Meal becomes `HoanTat`.
5. The system checks whether every Meal in the Contract is `HoanTat`/`DaHuy` with balance 0; if so, the Contract becomes `HoanTat`.

**Alternative flows**

- 1a. A `DaHuy` Meal: use the post-cancellation obligation instead of the Meal value.
- 4a. Positive balance: collect the remainder through UC-HD-03/UC-HD-04, then continue to step 4.
- 4b. Negative balance: record a refund through UC-HD-07, then continue to step 4.
- 5a. Future Meals remain: keep the Contract `CoHieuLuc`.

**Exceptions**

- 2e. Equipment was issued for the Meal but has not been counted: do not settle.
- 4e. Receipts/refunds are incomplete: do not close; deferred debt is not supported.
