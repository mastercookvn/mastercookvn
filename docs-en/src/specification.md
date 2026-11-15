# MasterCookVN Software Specification

## 1. Objectives and scope

The website supports a mobile catering business from booking through settlement. The business does not provide venues. Communication with customers, staff, and suppliers by phone or Zalo takes place outside the system.

In scope: customer self-booking and staff-assisted booking; multi-meal contracts; survey Q&A; online and paper signing; deposit collection, changes, cancellation, and refunds; staff profiles and assignments; ingredient purchasing and month-end stocktakes; food cost and price proposals; equipment purchasing, issue, and return; reviews and reports.

Out of scope: on-premises restaurant service, venue provision, outsourced partners, vehicles or transport trips, standalone equipment rental or services, funerals, events with an undefined size, food tasting, promotions, customer tiers, commissions, specialised complaint handling, electronic invoices, deferred receivables, citizen identity cards (CCCD), email, automated Zalo messages, reminders, weather, offline operation, attendance, leave, staff reviews, payroll, serial numbers, ingredient quality control, lots or expiry dates, and preparation waste. Ingredients are not deducted per event; dishes, serving tables, and services cannot be added while a meal is in progress; dates cannot be moved and events cannot be postponed.

## 2. Terminology

| Term                     | Meaning                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| Meal                     | One service occurrence with its own time, location, and scale                                |
| Serving table            | The food and pricing unit, distinct from the number of physical tables set up                 |
| Tables and chairs        | Equipment set up concurrently and reusable across serving waves                              |
| Menu set                 | A predefined suggested dish list priced per serving table                                    |
| Recipe line              | The ingredient quantity for one standard serving table of 10 guests                          |
| Current ingredient price | The confirmed price used to estimate cost and propose selling prices                          |
| Actual food cost         | Ingredient consumption cost / dish revenue for the same period                               |
| Target food cost         | The ratio used to propose selling prices, initially 35%                                      |
| Ingredient margin        | Dish revenue minus ingredient consumption cost; it excludes payroll and other operating costs |

## 3. Actors and permissions

An internal account may hold multiple roles; a staff profile is independent of an account.

| Actor           | Permissions by functional area                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Customer        | View the catalogue; book, view and confirm contracts; pay; request changes or cancellation; review their own records               |
| Branch Manager  | Accounts and permissions, catalogue, settings, prices, all business operations, and reports                                        |
| Consultant      | Customer profiles, on-behalf orders, surveys, accept/reject catering requests, contracts/addenda, and storing paper-signed copies  |
| Accountant      | Collections/refunds, settlement, monthly inventory and food-cost closing, and reports                                               |
| Storekeeper     | Ingredient/equipment purchasing, ingredient stocktakes, and equipment issue/return                                                  |
| HR Manager      | Staff profiles, assignments, and work schedules                                                                                     |
| Payment service | Notify online payment results; the provider has not yet been selected                                                               |

Kitchen, service, and transport are assignment positions and do not require accounts. Suppliers do not access the system; their name and phone number are stored on purchase records.

## 4. End-to-end process

1. The customer views the catalogue and estimate; the customer or a consultant creates an order containing one or more meals.
2. The consultant records survey Q&A and enters the distance; the system checks resources for each time window. The consultant accepts or rejects the request, with no further management approval.
3. A common contract is issued, locking prices and the deposit deadline; the customer confirms online or signs a paper copy at the counter, which a staff member uploads.
4. The deposit is collected online or in cash. Once confirmation and the required deposit are complete, the contract becomes active. Staff are assigned separately to each meal.
5. Ingredients are prepared according to demand, purchase records are recorded, equipment is issued, and the meal is served.
6. Equipment is returned and counted, compensation is recorded, and each meal is settled. The contract closes once every meal is completed or cancelled and all collections/refunds are complete.
7. At month-end, inventory is counted and consumption and food cost are closed. At the beginning of the following month, a price-proposal batch is created for management to process.

The UC catalogue is maintained only in the [analysis index](./diagrams/index.md) and is not duplicated here.

## 5. Business rules

### BR01 — Multi-meal contracts

An order contains at least one meal and has at most one contract. Each meal has its own menu, services, serving time, resource-use window, number of serving tables, number of setup tables and chairs, location, and survey. Even meals at the same address require separate surveys. Collections/refunds belong to the contract and are allocated by meal for changes, cancellation, and settlement; the sum of allocations must equal the transaction amount.

### BR02 — Accounts and customer profiles

Registration and sign-in use a phone number and password, with no OTP. A normalised phone number uniquely identifies a customer profile; one phone number represents one person/name. For an on-behalf order, a staff member enters the name and phone number to find or create a profile and does not automatically create an account. If a customer later registers with the same phone number, the account is linked to that profile and shows orders/contracts awaiting confirmation. An account is not required for signing at the counter. A Branch Manager creates internal accounts; staff handle password resets, with no email flow.

### BR03 — Serving tables and setup tables

Prices and recipes use a standard serving table of 10 guests. A meal uses one guests-per-serving-table value, with a minimum of 10. Scale factor = guests per serving table / 10. The numbers of serving tables and setup tables are entered separately; setup tables cannot exceed serving tables. Equipment requirements may be based on guests, setup tables, or the meal itself; serving tables must not be treated as physical tables and chairs. Example: 30 serving tables across 10 setup tables in serving waves suggests four service staff.

### BR04 — Pricing and price locking

- Suggested dish price per standard serving table = Σ(recipe quantity × current ingredient price) / target food cost. A Branch Manager accepts the suggestion or enters another price; selling prices are never changed automatically.
- A menu set is the sum of the selling prices of its dishes, with no additional profit added. A custom menu must contain at least six currently available dishes.
- Meal dish amount = total standard dish price × scale factor × serving-table count. Add services (unit price × quantity) and agreed surcharges, then apply tax according to settings. Holiday surcharges use a fixed list of solar/lunar dates; there is no separate holiday-management UC.
- An estimate is not a commitment. Issuing a contract stores locked snapshots of names, quantities, unit prices, taxes, surcharges, terms, and compensation prices; later catalogue changes do not alter old contracts.
- VND amounts are integers. Each meal total is rounded to the nearest multiple of 500, with exact halves rounded up, and the rounding difference is stored separately. Contract total = sum of meal totals; transactions record the exact amount collected or refunded.

### BR05 — Monthly ingredient price proposals

At the start of each month, create one batch for ingredients that appear on purchase records in the 30 days before the month boundary. Divide the period into three 10-day intervals from oldest to newest with weights 1.5, 1.5, and 2. Proposed price = Σ(purchased quantity × unit price × weight) / Σ(purchased quantity × weight). Use the same standard unit for each ingredient. If there are no purchases, keep the current price and do not propose zero.

The server cron and catch-up check use the same operation: if the current month has no batch, create one from the same month-start boundary even when the operation runs late. A unique key is enforced per month, and the batch and its lines are created atomically. Store old, proposed, and selected prices together with the processor and processing time. A Branch Manager accepts, edits, or skips each line. When an ingredient price changes, list affected dishes and their suggested prices; management decides whether to change selling prices.

### BR06 — Monthly stocktake and food cost

There is no per-event ingredient issue record, and inventory is not deducted after each event. Purchase records are created during the month; at month-end, the Storekeeper counts actual quantities and the Accountant closes inventory value. Opening inventory is the previous month's closing inventory. In the first month, opening quantity and unit price are entered.

Suggested inventory valuation uses the monthly weighted average: inventory unit cost = (opening value + purchase value) / (opening quantity + purchased quantity); closing value = closing counted quantity × inventory unit cost. If the denominator is zero, the unit cost is zero, and positive closing inventory cannot be recorded without an added source. Closing quantity cannot exceed opening quantity + purchases; discrepancies must be reconciled before closing. Inventory cost is independent of the suggested price in BR05.

Consumption cost = opening value + purchase value − closing value. Actual food cost = consumption cost / dish revenue for the same month × 100%. Revenue is recognised by the date of a completed meal and excludes deposits for unserved meals, tax, services, compensation, and amounts retained because of cancellation. If revenue is zero, food cost is undefined rather than divided by zero.

The target is initially 35%. After month-end closing, a Branch Manager may use the actual ratio as the next month's target or keep/edit it manually. The target is never overwritten automatically. Store a monthly closing snapshot. Correcting source data requires reopening the period and reclosing all affected later periods. Shared purchase costs are not allocated as an actual cost per meal.

### BR07 — Accepting requests and holding resources

The Consultant enters distance manually. The maximum service range is 20 km, with no map integration. Equipment-use and staff-working windows are entered for each meal; routes and cleaning times are not calculated automatically. Capacity checks include all meals in the same order and other contracts whose windows overlap.

Accepting a catering request places a temporary 24-hour resource hold while waiting for the deposit. Once BR08 is satisfied, the hold becomes firm. The server expires holds during lookup, capacity checking, and order processing without relying on a separate cron job. If signing/deposit requirements are incomplete at expiry, mark the order expired and release the hold. Amounts already collected remain recorded for refund; transactions are not deleted.

Minimum inventory is a warning only. If actual resources are insufficient, the request cannot be accepted until resources are replenished or the request is adjusted. There is no independent maximum-events-per-day limit.

### BR08 — Signing and deposit

Issuance by the Consultant represents confirmation from the business. The customer confirms online with an account, or a staff member records a paper signature and attaches the file. The deposit is 50%–100% of the contract total and is due within 24 hours. It is allocated by meal value. The initial required deposit is 50% of each meal value; any excess is a prepayment. After an addendum, an additional deposit is required only under BR09; a contract does not automatically become inactive merely because its deposit ratio falls below 50% after a change. On cancellation, the deposit basis is the smaller of 50% of the meal's current value and the amount collected and still allocated to that meal. Any amount above that basis is fully refundable.

A contract becomes active after customer confirmation and collection of the full required deposit. Online collection relies on payment-service notifications; an Accountant records cash or out-of-band bank transfers. A customer's “paid” action alone is not proof of payment. The provider transaction identifier is unique, and repeated notifications must not add the amount twice.

### BR09 — Per-meal adjustments

Dates cannot be moved. At least five days before service, selected dishes may be changed but no new dish may be added. At least three days before service, serving tables may be increased or decreased; a decrease is limited to 15% of the originally signed serving-table count and is rounded down. An increase triggers another capacity check. Changed dishes use newly agreed prices, while unchanged dishes keep their locked prices. An increase of more than three serving tables in one request requires an additional deposit of 50% of the increase.

The Consultant prepares an addendum showing before/after values and the difference. The customer confirms online or signs a paper copy, with no further approval level. The meal and resource holds are updated only after the addendum is confirmed and any required additional deposit is complete. A decrease that creates a credit is handled during settlement. Changing one meal does not mark the contract cancelled.

### BR10 — Cancellation and refunds

A meal or an entire contract may be cancelled. Each meal is calculated using the recorded request time and that meal's start time, not the staff processing time.

| Timing                                     | Refund of the required deposit basis                                      |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| No deposit collected                       | Immediate free cancellation                                               |
| At least 30 days remaining                 | 100%; default processing fee is 0                                         |
| 15 to fewer than 30 days remaining         | 50%                                                                       |
| Fewer than 15 days remaining               | 0%                                                                        |
| At the start time, customer is absent      | 0%; prepared ingredients are charged only by agreement, without duplication |

Any prepayment above the required deposit basis is refunded in full. Cancelling a contract sums the results for unserved meals and keeps the settlements of completed meals. Resource holds and staffing assignments are released immediately on cancellation; the refund is recorded separately and processed later. There is no flow for customer cancellation during service. There is no separate UC for cancellation by the business; responsibility is stated in the contract and handled by direct agreement outside the standard flow.

### BR11 — Settlement and reporting

Meal settlement total = current meal value + recorded compensation. Balance = total settlement − successful collections allocated to the meal + completed refunds. A positive balance is due before closing, with no deferred receivables; a negative balance must be refunded. Collections and refunds are separate transactions and do not edit or deduct the deposit twice. For a cancelled meal, the post-cancellation obligation replaces the service value when calculating the balance.

Reports include completed-meal revenue by period; monthly consumption cost, food cost, and ingredient margin; order/meal status; collections/refunds and amounts retained after cancellation; loss/compensation; and reviews. Ingredient margin = dish revenue − consumption cost and is not net profit. The dashboard shows upcoming events, items awaiting signing/deposit/settlement, and staffing/equipment warnings. Report export to PDF/Excel is not yet supported.

### BR12 — Staff

Suggested service staff = ceiling(concurrent setup tables / 3). When accepting a meal, the Consultant records expected staffing requirements by position. Capacity checks must include requirements from overlapping temporary and firm holds even before specific people are assigned; they must not consider only staff with existing schedules. The HR Manager manually selects people, positions, and working hours and adjusts the quantity to actual needs. Suggestions are not hard constraints. A person cannot be assigned to overlapping windows, and inactive staff cannot receive new work. Reassignment is done by editing the assignment; communication remains outside the system. Shift confirmation, attendance, and payroll are not supported.

### BR13 — Equipment

Each equipment type has a unit, a requirement basis per guest/setup table/meal, minimum inventory, an optional contingency percentage, and a compensation price. Required quantity = ceiling(requirement × basis value × (1 + contingency)); a missing contingency is zero, with no additional enable/disable flag. Bulky items may use a quantity entered directly for the meal.

An advance hold does not reduce physical inventory. Issuing equipment moves it from ready to in use. Returned good items move back to ready; damaged/lost quantities are recorded separately. Issued quantity = good + damaged + lost. Staff select the customer-responsible quantity, which cannot exceed damaged/lost quantity. Compensation = customer-responsible quantity × locked compensation price; no automatic percentage threshold or payroll deduction applies. Staff-caused damage is not charged to the customer. Damaged equipment returns to ready only after repair is recorded; purchases increase owned quantity. A return cannot be counted twice.

### BR14 — Reviews

Each completed meal may have at most one optional review, submitted by the booker or entered on their behalf by a staff member. Store a score from 1–5, comments, and the actual person who entered it. Reviews are for internal use and are not yet moderated or displayed publicly.

## 6. Model and related documentation

The [class model](./diagrams/class.md) is the source for attributes, relationships, and data constraints. [Order/contract/meal states](./diagrams/state/don-tiec.md) separate progress from payment, while [equipment issue states](./diagrams/state/phieu-xuat-dung-cu.md) separate advance holds from physical issue. [Contract content](./contracts/service-contract.md) supports contract preparation and does not replace this specification.

## 7. Non-functional requirements

- The user interface is in Vietnamese and usable on mobile devices. Dates use dd/MM/yyyy, currency uses VND, and times use Vietnam time. Users may select solar/lunar dates; the system stores the solar date and a specific time.
- The server enforces role and profile ownership, calculates amounts, checks resources, and stores hashed passwords.
- Record the actor, time, and reference/evidence for signing, collections/refunds, addenda, stocktakes, and price acceptance. Used catalogue items are deactivated rather than deleted.
- Money recording, resource holds, period closing, and price-batch creation are atomic and idempotent. Quantities and money use exact numeric types.
- Support backup and recovery. Contract/evidence files are protected by profile permissions.
- Phone number is the agreed linking key and is not verified by OTP.

## 8. Selected implementation assumptions

Where the discussion did not establish a number or calculation, the following defaults are used: a standard serving table has 10 guests; a menu set equals the sum of dish prices; each meal total is rounded to the nearest VND 500; inventory uses a monthly weighted average; the cancellation processing fee is 0; and reviews are internal. These choices keep the specification consistent and are not additional research findings. Tax and holiday-surcharge rates are settings; this document does not assert statutory values.
