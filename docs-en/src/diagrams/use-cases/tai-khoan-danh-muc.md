# Accounts and Catalogue

## UC-TK-01

| Field | Content |
|---|---|
| Name | Customer account registration |
| Actor | Customer |
| Goal | Give customers an account to book, confirm contracts, and view history. |
| Trigger | Customer selects registration. |
| Preconditions | Not signed in. |
| Postconditions | A customer account is linked to exactly one customer profile by phone number. |
| Relationships | — |
| Rules | BR02 |

**Main flow**

1. Customer enters full name, phone number, and password.
2. System normalises the phone number and checks that no account already uses it.
3. System finds the customer profile by phone number or creates one.
4. System creates the account, hashes the password, and links the profile.
5. System signs in the customer and displays the profile's orders/contracts.

**Alternative flows**

- 3a. A profile already exists from an on-behalf order: link it without creating another; show orders/contracts awaiting confirmation.

**Exceptions**

- 2e. Phone number has an invalid format or already has an account: report an error and do not create the account.

## UC-TK-02

| Field | Content |
|---|---|
| Name | Sign in, sign out, and change password |
| Actor | Customer, internal staff |
| Goal | Access functions according to the account's roles. |
| Trigger | User selects sign in, sign out, or change password. |
| Preconditions | An active account exists. |
| Postconditions | Session contains the account's assigned roles, or the session has ended. |
| Relationships | — |
| Rules | BR02 |

**Main flow**

1. User enters phone number and password.
2. System normalises the phone number and checks the password and account status.
3. System creates a session with the union of assigned roles.
4. System redirects by role (customer: my profile; internal user: dashboard).

**Alternative flows**

- 1a. Change password while signed in: enter old and new passwords; system verifies the old password and saves the new one.
- 1b. Sign out: system terminates the session.
- 1c. Forgot password: contact staff outside the system; a manager resets it through UC-TK-03; no OTP/email.

**Exceptions**

- 2e. Incorrect phone/password or locked account: show a generic error and do not create a session. After more than 5 consecutive failed attempts (TS57), temporarily lock the account for security.

## UC-TK-03

| Field | Content |
|---|---|
| Name | Manage internal accounts and permissions |
| Actor | Branch Manager |
| Goal | Grant or revoke access to internal functions. |
| Trigger | Staff need an account, role change, lock, or password reset. |
| Preconditions | Manager is signed in. |
| Postconditions | Account and roles are updated; subsequent actions are checked against the new roles. |
| Relationships | — |
| Rules | BR02 |

**Main flow**

1. Manager opens the account list and searches by name/phone number.
2. Manager creates an account and enters full name, phone number, and temporary password.
3. Manager selects one or more roles: Consultant, Accountant, Storekeeper, HR Manager, Branch Manager.
4. System validates the phone number, saves the account, and assigns roles.

**Alternative flows**

- 2a. Edit an existing account: change details/roles and save.
- 2b. Lock/unlock: locked accounts cannot sign in; action history is retained.
- 2c. Reset password: enter a new temporary password and notify the staff member outside the system.

**Exceptions**

- 4e. Phone number belongs to another account: do not create a duplicate; open that account to add a role.
- 4f. Removing the Branch Manager role from the last manager account itself: reject.

## UC-DM-01

| Field | Content |
|---|---|
| Name | Manage dish categories and dishes |
| Actor | Branch Manager |
| Goal | Maintain available dishes for customers to select and estimate. |
| Trigger | Add/edit/deactivate a dish or category. |
| Preconditions | Signed in with the required role. |
| Postconditions | Dish/category is updated for estimates and new orders only. |
| Relationships | Suggested prices come from UC-DM-03. |
| Rules | BR04 |

**Main flow**

1. Manager selects a dish category (appetiser, main, hot pot, dessert, drink, etc.) or creates one.
2. Manager enters dish name, category, description, and image.
3. System displays the suggested price per standard serving table, if a recipe exists.
4. Manager accepts the suggested price or enters another selling price.
5. System saves the dish as available.

**Alternative flows**

- 2a. Edit a dish: change details/price; a locked contract retains the old price.
- 2b. Deactivate a dish: hide it from estimates/new orders and list menu sets containing it for adjustment (UC-DM-02).
- 3a. Dish has no recipe: no suggested price is available; manager enters one manually.

**Exceptions**

- 5e. Missing name/category or non-positive price: do not save.
- 5f. A dish/category already used in an order/contract can only be deactivated, not deleted.

## UC-DM-02

| Field | Content |
|---|---|
| Name | Manage menu sets |
| Actor | Branch Manager |
| Goal | Provide suggested sets of dishes for customers to choose quickly. |
| Trigger | Create/edit/deactivate a set. |
| Preconditions | At least one dish is available. |
| Postconditions | Set is updated; its price equals the sum of its dish prices. |
| Relationships | — |
| Rules | BR04 |

**Main flow**

1. Manager enters the set name, description, and optional compatible event type.
2. Manager selects available dishes.
3. System calculates the standard serving-table set price as the sum of dish selling prices.
4. Manager saves the set as available.

**Alternative flows**

- 2a. Edit a set: add/remove dishes; system recalculates the price.
- 2b. Deactivate a set: hide it from estimates/new orders.

**Exceptions**

- 2e. A deactivated dish cannot be added.
- 4e. A set containing a deactivated dish cannot be made available until that dish is removed.

## UC-DM-03

| Field | Content |
|---|---|
| Name | Manage ingredients and recipes |
| Actor | Branch Manager |
| Goal | Maintain current ingredient prices and recipes for suggested dish pricing. |
| Trigger | Add an ingredient, edit its price, or define a recipe. |
| Preconditions | Signed in with the required role. |
| Postconditions | Ingredient, recipe, and suggested dish prices are updated. |
| Relationships | Ingredient prices are also updated through UC-KHO-04. |
| Rules | BR03, BR04, BR05 |

**Main flow**

1. Manager enters an ingredient's name, standard unit, and current price per unit.
2. Manager selects a dish and adds recipe lines: ingredient and quantity for one standard serving table of 10 guests.
3. System calculates estimated cost = Σ(quantity × current price) and suggested price = cost / target food cost.
4. System saves the recipe and displays the suggested price alongside the current selling price.

**Alternative flows**

- 1a. Edit an ingredient price directly: system saves it and lists affected dishes with updated suggestions; use UC-DM-01 to change selling prices if desired.
- 1b. Deactivate an ingredient: it cannot be used in new recipes; history is retained.

**Exceptions**

- 1e. Negative price or missing unit: do not save.
- 2e. Non-positive quantity or duplicate ingredient within one dish: request correction.

## UC-DM-04

| Field | Content |
|---|---|
| Name | Manage services |
| Actor | Branch Manager |
| Goal | Maintain accompanying services (cleaning, karaoke, gate decoration, etc.) for customers to select. |
| Trigger | Add/edit/deactivate a service. |
| Preconditions | Signed in with the required role. |
| Postconditions | Service is available for estimates/new orders. |
| Relationships | — |
| Rules | BR04 |

**Main flow**

1. Manager enters the name, description, unit, and unit price.
2. System validates and saves the service as available.

**Alternative flows**

- 1a. Edit the unit price: it applies to new orders only; locked contracts retain the old price.
- 1b. Deactivate the service: hide it from new orders.

**Exceptions**

- 2e. Missing name or negative unit price: do not save.

## UC-DM-05

| Field | Content |
|---|---|
| Name | Manage the equipment catalogue |
| Actor | Branch Manager, Storekeeper |
| Goal | Maintain requirements, minimum inventory, contingency, and compensation prices for demand and compensation calculations. |
| Trigger | Add/edit/deactivate an equipment type. |
| Preconditions | Signed in with the required role. |
| Postconditions | Equipment type is available for demand calculation, issue, and return. |
| Relationships | Inventory increases through UC-KHO-05; it is not entered here. |
| Rules | BR13 |

**Main flow**

1. Storekeeper enters name, unit, requirement basis (per guest/setup table/meal), and requirement.
2. Storekeeper enters minimum inventory and optional contingency percentage.
3. Branch Manager enters/approves the compensation price.
4. System validates and saves.

**Alternative flows**

- 1a. Bulky items (tents, speakers, etc.): no standard requirement; enter quantity directly per meal.
- 1b. Deactivate an equipment type: do not use it for new meals.

**Exceptions**

- 3e. Storekeeper edits compensation price: permission denied.
- 4e. Negative requirement, contingency, minimum inventory, or price: do not save.

## UC-DM-06

| Field | Content |
|---|---|
| Name | Manage event types |
| Actor | Branch Manager |
| Goal | Classify orders (wedding, birthday, death anniversary, year-end, etc.) for filtering and reports. |
| Trigger | Add/edit/deactivate an event type. |
| Preconditions | Signed in with the required role. |
| Postconditions | Event type can be used when creating orders and reports. |
| Relationships | — |
| Rules | Out of scope: funerals and dish suggestions by event type. |

**Main flow**

1. Manager enters the event type name and description.
2. System checks for duplicate names and saves.

**Alternative flows**

- 1a. Deactivate an event type: hide it from new orders and retain it on old orders.

**Exceptions**

- 2e. Duplicate name: do not save.

## UC-DM-07

| Field | Content |
|---|---|
| Name | Manage business settings |
| Actor | Branch Manager |
| Goal | Adjust settings for new data without changing locked commitments. |
| Trigger | A ratio/threshold needs to change. |
| Preconditions | Signed in with the required role. |
| Postconditions | New settings apply from the save time. |
| Relationships | — |
| Rules | BR04, BR06, BR07, BR08, BR09, BR10, BR12. Holiday dates/surcharges are a fixed list and are not edited here. |

**Main flow**

1. System displays system-wide business settings and current values:
   - _Finance and pricing_: target food cost (default 35%), VAT rate (8% or 10%), minimum deposit rate (TS06 = 50%), rounding unit (TS51 = 500 VND).
   - _Scale and menu_: minimum guests per table (TS01 = 10), recommended maximum (TS02 = 12), minimum custom dishes (TS03 = 6), minimum tables (TS21 = 1), maximum per event (TS22 = 40), branch-wide daily setup-table limit (TS56 = 100 tables).
   - _Timing and holds_: advance-booking window [3, 90] days (TS18, TS20), temporary hold duration (TS16 = 24h), QR validity (TS17 = 15 minutes), price-snapshot validity (TS15 = 7 days).
   - _Changes and cancellation_: dish-change cutoff (TS23 = 5 days), table-change cutoff (TS24 = 3 days), maximum table decrease (TS25 = 15%), deposit-refund tiers (TS27: $\\ge 30$ days 100%, 15–<30 days 50%, <15 days 0%).
   - _Operations and resources_: maximum service radius (TS31 = 20 km), free-delivery radius (TS29 = 10 km, surcharge TS30 = 15,000 VND/km), equipment contingency rate (TS08 = 10%), loss threshold exempt from compensation (TS49 = 1%), staff arrival before event (TS35 = 3h), equipment cleaning isolation (TS36 = 12h), maximum work hours/day (TS40 = 12h), break between shifts (TS41 = 8h), service staffing requirement ($\lceil \text{tables}/3 \rceil$), kitchen staffing requirement ($\max(2, \lceil \text{tables}/5 \rceil)$), failed-password attempts before lock (TS57 = 5).
2. Manager edits desired values.
3. System validates allowed ranges, saves new values with editor and effective time, and leaves contracts/commitments locked before the save unchanged.

**Alternative flows**

- 2a. After food-cost period closing, system suggests using actual food cost as the target; manager accepts or keeps the current target.

**Exceptions**

- 3e. Ratio outside (0, 100%], negative number, invalid time threshold, or violation of a safety limit: reject and request a new value.
