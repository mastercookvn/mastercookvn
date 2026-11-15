# Detailed Use Case Specifications

Index of the detailed MasterCookVN Use Case specifications.

## General Conventions

- **Business rules**: Look up BR codes in the [Software Specification](../../specification.md).
- **Use Case catalog**: Look up canonical UC codes and names in the [General Catalog](../index.md).
- **Overview diagram**: See the [General Use Case Diagram](../use-cases.md).
- **Step notation**:
  - `N`: Step $N$ in the main flow.
  - `Na`: Alternative flow at step $N$.
  - `Ne`: Exception at step $N$.

## Detailed Subsystems

- [Accounts and Catalogs](./tai-khoan-danh-muc.md) — UC-TK-01 → UC-TK-03, UC-DM-01 → UC-DM-07.
- [Booking](./dat-tiec.md) — UC-DT-01 → UC-DT-06.
- [Contracts and Payments](./hop-dong-thanh-toan.md) — UC-HD-01 → UC-HD-08.
- [HR and Operations](./nhan-su.md) — UC-NS-01, UC-NS-02, UC-VH-01.
- [Ingredients and Equipment](./nguyen-lieu-dung-cu.md) — UC-KHO-01 → UC-KHO-08.
- [Reviews and Reports](./danh-gia-bao-cao.md) — UC-CS-01, UC-BC-01 → UC-BC-03.

## System Parameters and Constraints Lookup

MasterCookVN applies the following standardized parameters (referenced by [UC-DM-07](./tai-khoan-danh-muc.md#uc-dm-07) and the [Software Specification](../../specification.md)) to enforce data constraints consistently:

| Code     | Parameter and Constraint                           | Standard Value       | Valid Domain / Limit                                                               | Applies To                   |
| :------- | :------------------------------------------------- | :------------------- | :--------------------------------------------------------------------------------- | :--------------------------- |
| **TS01** | Minimum people per serving table                   | **10** people        | $\ge 10$ people/table (scale factor = $n/10$)                                     | UC-DT-01, UC-DT-02           |
| **TS02** | Recommended maximum people per serving table       | **12** people        | $10 \le n \le 12$ people (prevents table overcrowding)                           | UC-DT-01, UC-DT-02           |
| **TS03** | Minimum dishes in a custom menu                    | **6** dishes         | $\ge 6$ dishes currently offered                                                  | UC-DT-01, UC-DT-02           |
| **TS06** | Required minimum deposit ratio                     | **50%**              | $\ge 50\%$ of the total Contract/Meal value                                      | UC-HD-01, UC-HD-02, UC-HD-03 |
| **TS07** | Maximum selectable deposit ratio                   | **100%**             | $[50\%, 100\%]$ of the total value                                               | UC-HD-03, UC-HD-04           |
| **TS08** | Default equipment buffer ratio                     | **10%**              | $\ge 0\%$ (quantity = $\lceil \text{standard quantity} \times (1 + \text{buffer}) \rceil$) | UC-DT-04, UC-KHO-06          |
| **TS11** | Maximum events served per day                      | **3** events         | $\le 3$ events per day across the branch                                          | UC-DT-04, UC-DT-05           |
| **TS15** | Quotation validity period (price snapshot)         | **7** days           | Prices are fixed when the Order is finalized                                       | UC-HD-01                     |
| **TS16** | Temporary reservation window pending signature and deposit | **24** hours | Resources are released automatically after 24 hours                               | UC-DT-05, UC-HD-01, UC-HD-02 |
| **TS17** | Bank-transfer QR code validity                     | **15** minutes       | A new QR code must be generated after expiration                                   | UC-HD-03                     |
| **TS18** | Minimum advance Booking period                     | **3** days           | Event date $-$ Booking date $\ge 3$ days                                          | UC-DT-01, UC-DT-02           |
| **TS20** | Maximum advance Booking period                     | **90** days          | Event date $-$ Booking date $\le 90$ days                                         | UC-DT-01, UC-DT-02           |
| **TS21** | Minimum serving tables per Meal                    | **1** table          | $\ge 1$ table                                                                      | UC-DT-01, UC-DT-02           |
| **TS22** | Maximum serving tables per Meal                    | **40** tables        | $\le 40$ tables per Meal                                                          | UC-DT-01, UC-DT-02           |
| **TS23** | Menu lock deadline                                 | **5** days           | A dish may be changed only when $\ge 5$ days remain                               | UC-HD-05                     |
| **TS24** | Serving-table-count lock deadline                  | **3** days           | The serving-table count may be changed only when $\ge 3$ days remain              | UC-HD-05                     |
| **TS25** | Maximum serving-table reduction ratio              | **15%**              | Reduction $\le 15\%$ of the originally contracted count (rounded down)           | UC-HD-05                     |
| **TS27** | Deposit refund tiers on cancellation               | 3-tier table         | $\ge 30$ days: 100%, 15–<30 days: 50%, <15 days: 0%                               | UC-HD-06, UC-HD-07           |
| **TS29** | Free-delivery radius                               | **10** km            | Distance $\le 10$ km                                                              | UC-DT-03                     |
| **TS30** | Delivery surcharge beyond the standard radius      | **VND 15,000**/km    | Distance $> 10$ km and $\le 20$ km                                                | UC-DT-03                     |
| **TS31** | Maximum service radius                             | **20** km            | The system rejects requests beyond 20 km                                           | UC-DT-03, UC-DT-05           |
| **TS35** | Personnel arrival lead time before a Meal          | **3** hours          | Venue and kitchen preparation                                                      | UC-NS-02, UC-VH-01           |
| **TS36** | Equipment sanitation isolation time                | **12** hours         | Buffer between two uses                                                            | UC-DT-04, UC-KHO-06          |
| **TS40** | Maximum working hours per employee per day         | **12** hours         | $\le 12$ hours per day                                                            | UC-NS-02                     |
| **TS41** | Minimum rest between consecutive shifts            | **8** hours          | $\ge 8$ hours                                                                     | UC-NS-02                     |
| **TS42** | Suggested service-staff ratio                      | **1 person / 3 tables** | $\lceil \text{setup tables} / 3 \rceil$                                       | UC-DT-04, UC-NS-02           |
| **TS43** | Suggested kitchen-staff ratio                      | **1 person / 5 tables** | At least 2 kitchen staff for one event                                           | UC-DT-04, UC-NS-02           |
| **TS44** | Suggested loading/transport staffing ratio         | **2 people / 10 tables** | Used when setting up tents and heavy tables/chairs                               | UC-DT-04, UC-NS-02           |
| **TS49** | Equipment-loss compensation exemption threshold    | **1%**               | Loss $\le 1\%$ of the issued quantity                                             | UC-KHO-07                    |
| **TS51** | Monetary rounding unit                             | **VND 500**          | Nearest multiple of VND 500 (round up at VND 250)                                  | UC-DT-01, UC-DT-02, UC-HD-01 |
| **TS56** | Branch-wide table/chair capacity per day            | **100** tables       | Total setup tables on the same day $\le 100$                                      | UC-DT-04, UC-DT-05           |
| **TS57** | Maximum failed sign-in attempts before lockout      | **5** attempts       | Temporary lock; contact a manager to unlock                                        | UC-TK-02, UC-TK-03           |
