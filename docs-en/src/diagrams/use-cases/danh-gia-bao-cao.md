# Reviews and Reports

## UC-CS-01

| Field         | Details                                                                    |
| ------------- | -------------------------------------------------------------------------- |
| Name          | Record a post-Meal review                                                  |
| Actors        | Customer, Consultant                                                       |
| Goal          | Store the booker's feedback for a completed Meal.                          |
| Trigger       | The booker wants to submit a review.                                       |
| Preconditions | The Meal is `HoanTat`, belongs to the Customer profile, and has no review. |
| Postconditions| One review is linked to the correct Meal and records the actual data-entry user. |
| Relationships | Entry point from UC-DT-06.                                                 |
| Rules         | BR14                                                                       |

**Main flow**

1. The Customer selects a `HoanTat` Meal from Booking history.
2. The Customer enters a score from 1–5 and a comment.
3. The system validates and saves the review and the data-entry user.

**Alternative flows**

- 1a. The Consultant enters feedback on the Customer's behalf: select the Meal through the Customer profile and enter the booker's feedback; record the Consultant as the data-entry user.

**Exceptions**

- 3e. The Meal is incomplete, already has a review, or does not belong to the profile: do not create the review.

## UC-BC-01

| Field         | Details                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| Name          | View the dashboard and alerts                                                  |
| Actor         | Internal Employee                                                              |
| Goal          | See work items and alerts within the actor's role scope.                       |
| Trigger       | The actor signs in internally or opens the dashboard.                          |
| Preconditions | The actor is signed in with an internal Account.                               |
| Postconditions| The work list and links to the relevant records are shown; no data is changed. |
| Relationships | Entry point to processing Use Cases.                                           |
| Rules         | BR07, BR11, BR12, BR13                                                         |

**Main flow**

1. The system identifies the user's roles.
2. The system aggregates role-specific sections:
   - Consultant: Orders awaiting survey/acceptance, Contracts awaiting signature or deposit and nearing expiry, and pending Contract Addenda.
   - Accountant: deposits awaiting confirmation, pending Meal Settlements, amounts to refund, and ingredient periods awaiting closure.
   - Storekeeper: upcoming Meals requiring equipment issue, Meals awaiting count, and equipment below minimum stock.
   - HR Manager: upcoming Meals whose assignments fall below the suggestion.
   - Branch Manager: all sections and unprocessed price-proposal batches.
3. The system displays the upcoming event calendar (day/week) and the sections.
4. The user selects an item and continues to the corresponding UC.

**Alternative flows**

- 2a. No items exist: display an empty state.

**Exceptions**

- 1e. A Customer Account attempts access: deny access to the internal dashboard.

## UC-BC-02

| Field         | Details                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| Name          | View revenue and food-cost reports                                                                       |
| Actors        | Branch Manager, Accountant                                                                               |
| Goal          | View revenue, receipts/refunds, food cost, ingredient-based profit, Order status, and reviews by period. |
| Trigger       | A user needs to review business results.                                                                 |
| Preconditions | The user is signed in with the required permissions.                                                     |
| Postconditions| The report is displayed; no data is changed.                                                             |
| Relationships | Uses the results of UC-KHO-03.                                                                           |
| Rules         | BR06, BR11, BR14                                                                                         |

**Main flow**

1. The user selects a time range (month/quarter/year or from–to) and optionally filters by event type.
2. The system aggregates revenue from completed Meals by service date, separated into dishes, services, and compensation.
3. The system aggregates receipts, refunds, and amounts retained after cancellation.
4. The system reads closed ingredient periods: consumption cost, food cost, and ingredient-based profit = dish revenue − cost.
5. The system aggregates Orders by status, cancellation rate, and average review score.
6. The system displays tables and charts.

**Alternative flows**

- 4a. The month is not closed: show food cost and profit as "undetermined."

**Exceptions**

- 1e. The start date is after the end date: require another range.

## UC-BC-03

| Field         | Details                                                                      |
| ------------- | ---------------------------------------------------------------------------- |
| Name          | View equipment reports                                                       |
| Actors        | Branch Manager, Storekeeper                                                  |
| Goal          | View equipment stock, categories below threshold, loss, and compensation by period. |
| Trigger       | A user needs to review equipment inventory.                                  |
| Preconditions | The user is signed in with the required permissions.                         |
| Postconditions| The report is displayed; no data is changed.                                 |
| Relationships | Uses data from UC-KHO-05 through UC-KHO-08.                                  |
| Rules         | BR13                                                                         |

**Main flow**

1. The user selects a time range.
2. For each category, the system displays owned, available, in-use, damaged, and minimum-stock quantities, plus a below-threshold flag.
3. For the period, the system aggregates purchased, damaged, lost, restored, and disposed quantities and the compensation charged to Customers.

**Alternative flows**

- 2a. Filter to categories below threshold only.

**Exceptions**

- 1e. The date range is invalid: require another range.
