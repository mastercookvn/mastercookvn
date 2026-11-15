# Mobile Catering Service Contract Content

This document describes the contract content used in the project. Data for each contract comes from the booking record and is not re-entered through a separate form.

The governing business rules are in the [software specification](../specification.md). A confirmed contract must preserve its locked content and prices; later catalogue changes do not modify an existing contract.

## 1. Parties and service scope

The provider is MasterCookVN. The catering customer is identified by the full name, phone number, and contact details recorded in the contract.

A contract may contain multiple meals. Each meal separately specifies:

- Start and end date/time and service location.
- Site-survey information, service conditions, and the contact person.
- Serving-table count, guests per serving table, and the selected menu.
- Concurrent setup tables and chairs, equipment, and associated services.
- Unit prices, surcharges, total value, and allocated deposit.

The serving-table count is the basis for menu pricing. The setup-table count is the number of physical tables arranged at the location; these counts may differ when service is delivered in waves.

The business provides food and the services listed in the contract at the customer's location; it does not provide the venue.

## 2. Value and unit prices

Each meal's value consists of the menu amount based on serving tables, service charges, and agreed surcharges. The contract shows how each amount and the total value of all meals are calculated.

Dish prices, service prices, surcharges, and equipment compensation unit prices are stored as locked content. The system does not automatically increase a contract price when ingredient or catalogue prices change.

A site survey may result in a surcharge, which must be shown before the customer confirms the contract.

Pricing and rounding rules follow BR04 in the software specification.

## 3. Contract confirmation and deposit

A customer with an account views the contract and confirms acceptance in the system. A customer without an account signs a paper copy at the counter; a staff member photographs or scans the signed copy and uploads it to the contract record.

The record stores the confirmation method, confirmation time, and recording staff member. The confirmed contract is the basis for subsequent operations.

The minimum deposit is 50% of the contract value. The customer may prepay between the minimum and 100% of the contract value in cash or through online payment.

The contract becomes active after it is confirmed and the system records the full required deposit. Signing the contract does not itself prove that payment was received.

After an order is accepted, the system holds resources for 24 hours while awaiting the deposit. If signing and deposit conditions are not met by the deadline, the hold expires and resources are released under BR07–BR08.

The initial required deposit is allocated to each meal at 50% of that meal's value. Any excess paid is recorded as a prepayment. After an adjustment, an additional deposit applies under BR09 and is not automatically required for every minor change. On cancellation, the refund basis is the smaller of 50% of the meal's current value and the amount collected and still allocated to that meal; any amount above this basis is fully refundable.

## 4. Pre-service adjustments

Each adjustment request must identify the affected meal and the before/after content. The other meals continue under the locked contract.

Selected dishes may be changed if the customer gives notice at least five days before the meal start time. A dish change cannot increase the number of dishes or introduce a new dish outside this adjustment scope. The price difference is recorded in the adjustment.

Serving tables may be increased or decreased if the customer gives notice at least three days before the meal start time. The total decrease cannot exceed 15% of that meal's originally signed serving-table count.

An increase is accepted only when capacity remains available. Increasing by more than three serving tables requires an additional deposit of 50% of the increase under BR09.

Collected deposits remain available for settlement. Any required refund is recorded separately. Every value adjustment must retain its content and confirmation by both parties.

The service date cannot be moved. Requests to add dishes, serving tables, or services while the meal is in progress are not supported.

## 5. Meal cancellation and treatment of amounts paid

The customer may cancel one meal or the entire contract. Each meal's cancellation window is measured from the recorded cancellation-request time to that meal's start time under BR10.

| Cancellation timing                  | Refund of the meal's required deposit basis |
| ------------------------------------ | -------------------------------------------- |
| No deposit collected                 | Immediate free cancellation                  |
| At least 30 days remaining           | 100%; default processing fee is 0            |
| 15 to fewer than 30 days remaining   | 50%                                          |
| Fewer than 15 days remaining         | 0%                                           |
| After the start time or customer absent | 0%                                        |

Any prepayment above the cancelled meal's required deposit basis is refunded in full. The contract refund is the sum of the separately calculated refunds for each cancelled meal.

After the start time or when the customer is absent, prepared-ingredient costs may be charged only when agreed and when the amount is clearly recorded. An amount already included in the customer's payment obligation must not be charged twice.

Staff process the refund outside the system, then record the refund transaction and upload evidence. The record shows the amount due for refund and the amount completed; the software does not need a separate refund-voucher form.

## 6. Equipment and compensation

The equipment list and compensation unit prices form part of the content disclosed to the customer when the contract is confirmed.

After the meal, staff reconcile the issued quantity with the good, damaged, and lost quantities returned. Damaged or lost equipment is not considered available.

Staff record the damaged/lost quantity for which the customer is responsible and decide, by agreement with the customer, which items require compensation. Compensation uses that quantity and the locked unit price; no automatic percentage loss threshold applies.

Staff-caused damage is not charged to the customer and does not trigger a payroll deduction in the system.

## 7. Settlement and completion

Each meal has separate service figures, equipment returns, and compensation. Contract settlement consolidates active meals, confirmed adjustments, and payable/refundable amounts for cancelled meals.

Deposits, additional deposits, final payments, and refunds all link to the contract. Collected amounts are offset only once; a completed refund is applied in the outgoing-money direction under BR11.

The customer pays the remaining amount in cash or online. Staff record cash received, while online payments are confirmed through the payment result.

The contract is complete when every meal has been served or cancelled, equipment has been reconciled, and all collections/refunds are complete. A contract cannot close while an amount remains due for collection or refund; deferred customer credit is not supported.

## 8. Attached content

The contract record stores each meal's content, dish and service lists, surveys, compensation unit prices, confirmed adjustments, and signing/refund evidence where applicable.

The customer prepares the venue and service conditions according to the survey result. Preparation discussions take place by phone or Zalo outside the system.

If the business cannot provide the service, the parties resolve the situation under the contract and through direct communication. The project does not introduce a separate approval or compensation process for this case.
