# Ingredients and Equipment

## UC-KHO-01

| Field | Content |
|---|---|
| Name | Record ingredient purchase |
| Actor | Storekeeper |
| Goal | Record quantities and purchase prices as inputs for monthly food cost and price proposals. |
| Trigger | Ingredients are purchased. |
| Preconditions | Ingredient catalogue and standard units exist; month is not closed. |
| Postconditions | Purchase record is saved and is not linked to a meal. |
| Relationships | Input to UC-KHO-03 and UC-KHO-04. |
| Rules | BR05, BR06 |

**Main flow**

1. Storekeeper enters the date, supplier name, and phone number.
2. Storekeeper adds lines with ingredient, quantity (standard unit), and unit price.
3. System calculates each line amount and the record total.
4. System compares each unit price with the current price and marks differences for display only.
5. Storekeeper saves the record.

**Alternative flows**

- 1a. Market purchase: enter "Market" or the market name as the supplier; leave phone number blank.
- 5a. Edit a record while the month is still open: update it and store the editor.

**Exceptions**

- 2e. Quantity is non-positive, price is negative, or unit is invalid: do not save the line.
- 5e. Date belongs to a closed month: do not save.

## UC-KHO-02

| Field | Content |
|---|---|
| Name | Month-end ingredient stocktake |
| Actor | Storekeeper |
| Goal | Record actual inventory quantities at month-end. |
| Trigger | Month-end. |
| Preconditions | Monthly period is open and has opening inventory (initial inventory in the first month). |
| Postconditions | Period has stocktake lines for all ingredients and status ChoChot. |
| Relationships | Follows UC-KHO-03. |
| Rules | BR06 |

**Main flow**

1. System creates the monthly stocktake record and lists each ingredient's opening quantity, total purchases, and maximum quantity = opening + purchases.
2. Storekeeper enters the actual closing quantity for each ingredient.
3. System validates and saves, then marks the period ChoChot.

**Alternative flows**

- 1a. First month: Storekeeper enters initial inventory quantity and unit price.
- 2a. Save a draft and continue entering quantities later.

**Exceptions**

- 3e. Quantity is negative or exceeds opening + purchases: request correction.
- 3f. One or more ingredients lack a quantity: do not move the period to ChoChot.

## UC-KHO-03

| Field | Content |
|---|---|
| Name | Close period and calculate monthly food cost |
| Actor | Accountant |
| Goal | Close inventory value, consumption cost, and actual monthly food cost. |
| Trigger | Period is ChoChot. |
| Preconditions | Stocktake is complete; dish values are determined for meals in the month. |
| Postconditions | Period is DaChot; closing inventory becomes next month's opening inventory; food cost is available for reporting. Corrections after closing require reopening and reclosing that period and subsequent affected periods. |
| Relationships | Follows UC-KHO-02; result is used by UC-BC-02 and UC-DM-07. |
| Rules | BR06 |

**Main flow**

1. Accountant opens the ChoChot period.
2. System calculates weighted-average inventory unit cost = (opening value + purchase value) / (opening quantity + purchased quantity); closing value = stocktake quantity × inventory unit cost.
3. System calculates consumption cost = opening + purchases − closing; dish revenue from meals completed during the month; food cost = cost / revenue × 100%.
4. Accountant reconciles discrepancies and closes the period.
5. System stores the closing snapshot and locks the month's purchase/stocktake records.

**Alternative flows**

- 3a. Dish revenue = 0: food cost is "undetermined".
- 4a. Data is incorrect: return to UC-KHO-02 for the Storekeeper to correct.
- 5a. System suggests that the manager use actual food cost as next month's target (UC-DM-07).

**Exceptions**

- 1e. Period is not ChoChot: closing is not allowed.
- 4e. Unexplained discrepancy remains: do not close; return to UC-KHO-02.

## UC-KHO-04

| Field | Content |
|---|---|
| Name | Process monthly ingredient price proposals |
| Actor | Branch Manager |
| Goal | Decide whether to update current ingredient prices based on recent purchase prices. |
| Trigger | A new proposal batch is generated at the beginning of the month. |
| Preconditions | Monthly proposal batch exists. |
| Postconditions | Each line has a decision; selected ingredient prices are updated; dish prices change only when the manager chooses. |
| Relationships | Uses data from UC-KHO-01; may continue to UC-DM-01 to edit dish prices. |
| Rules | BR04, BR05 |

**Main flow**

1. At the start of the month, system creates one batch. For each ingredient purchased in the last 30 days, proposed price = Σ(quantity × price × weight) / Σ(quantity × weight), with weights 1.5, 1.5, and 2 for the three 10-day periods from oldest to newest.
2. Manager opens the batch and views each line's current price, proposed price, and difference.
3. Manager chooses for each line: accept, edit to another price, or skip.
4. System updates selected ingredient prices and records the decision-maker and time.
5. System lists affected dishes with their new suggested prices.
6. Manager accepts a suggested dish price or keeps the selling price.

**Alternative flows**

- 1a. Scheduled job did not run: the first visit to an internal function during the month creates the catch-up batch using the same month-start boundary.
- 1b. Ingredient has no purchases: omit it from the batch and keep its price.
- 6a. Edit a dish price manually: continue to UC-DM-01.

**Exceptions**

- 1e. A batch already exists for the month: do not create another.
- 3e. Line has already been processed: do not process it again.

## UC-KHO-05

| Field | Content |
|---|---|
| Name | Purchase equipment |
| Actor | Storekeeper |
| Goal | Increase owned and ready equipment quantities. |
| Trigger | Additional equipment is purchased, usually when below minimum inventory. |
| Preconditions | Equipment catalogue exists. |
| Postconditions | Owned and ready quantities increase; purchase history is recorded. |
| Relationships | — |
| Rules | BR13 |

**Main flow**

1. Storekeeper enters the date, supplier name, and phone number.
2. Storekeeper adds lines with equipment type, quantity, and unit price.
3. System calculates the total and saves the record.
4. System adds the quantity to owned and ready inventory; clears the below-minimum warning if the threshold is met.

**Alternative flows**

- 2a. System suggests equipment types below minimum inventory; it does not force a purchase quantity.

**Exceptions**

- 2e. Quantity is non-positive or price is negative: do not save the line.

## UC-KHO-06

| Field | Content |
|---|---|
| Name | Issue equipment for a meal |
| Actor | Storekeeper |
| Goal | Record the actual quantity leaving storage for a meal as the basis for return reconciliation. |
| Trigger | Meal is DangChuanBi. |
| Preconditions | Contract is CoHieuLuc; equipment is held for the meal. |
| Postconditions | Issue record is DaXuat; ready quantity decreases and in-use quantity increases. |
| Relationships | Follows UC-VH-01 (preparation); precedes UC-KHO-07. |
| Rules | BR07, BR13 |

**Main flow**

1. Storekeeper selects a meal.
2. System drafts an issue record using required quantities from standards and the default 10% contingency (TS08); bulky items use manually entered quantities. System checks for a 12-hour cleaning isolation between uses (TS36).
3. Storekeeper adjusts the actual issue quantities.
4. System checks actual ready quantities without taking resources held for another meal.
5. Storekeeper confirms the issue.
6. System changes the record to DaXuat, decreases ready quantities, and increases in-use quantities.

**Alternative flows**

- 3a. Cancel the draft: inventory is unchanged.

**Exceptions**

- 4e. Insufficient ready quantity: identify the equipment type; do not issue a negative quantity.
- 5e. Repeated confirmation: do not deduct quantities a second time.

## UC-KHO-07

| Field | Content |
|---|---|
| Name | Return, count, and calculate compensation |
| Actor | Storekeeper |
| Goal | Reconcile returned equipment, record damage/loss, and calculate the customer's share. |
| Trigger | Meal is ChoKiemDem, or a meal is cancelled after equipment was issued. |
| Preconditions | DaXuat issue record exists. |
| Postconditions | Record is DaKiemDem; inventory is updated and holds released; meal becomes ChoQuyetToan with compensation amount. |
| Relationships | Follows UC-HD-08. |
| Rules | BR11, BR13 |

**Main flow**

1. Storekeeper selects a meal.
2. System displays issued quantities and compensation prices locked in the contract.
3. Storekeeper enters good, damaged, and lost quantities for each type, and the quantity assigned to the customer.
4. System checks good + damaged + lost = issued and customer-responsible quantity ≤ damaged + lost; applies the 1% loss threshold exempt from compensation to issued quantity (TS49); calculates compensation = customer-responsible quantity × contract-locked compensation price.
5. Storekeeper confirms the count report.
6. System adds good items to ready inventory, adds damaged items to damaged inventory, reduces owned quantity for lost items, releases holds, and moves the meal to ChoQuyetToan.

**Alternative flows**

- 3a. Do not charge the customer: customer-responsible quantity = 0. Staff-caused damage is not handled in the system.

**Exceptions**

- 4e. Totals do not reconcile or customer-responsible quantity exceeds the limit: do not confirm.
- 5e. Repeated confirmation: do not add quantities to inventory a second time.

## UC-KHO-08

| Field | Content |
|---|---|
| Name | Repair or dispose of damaged equipment |
| Actor | Storekeeper |
| Goal | Return repaired damaged equipment to service or remove it from owned inventory. |
| Trigger | Damaged equipment has been repaired or is to be discarded. |
| Preconditions | Equipment type has damaged quantity > 0. |
| Postconditions | Damaged quantity decreases; ready quantity increases (repair) or owned quantity decreases (disposal). |
| Relationships | — |
| Rules | BR13 |

**Main flow**

1. Storekeeper selects an equipment type and views its damaged quantity.
2. Storekeeper selects repair or disposal and enters quantity and reason.
3. System validates, updates quantities, and stores history.

**Exceptions**

- 3e. Quantity exceeds the existing damaged quantity: do not save.
