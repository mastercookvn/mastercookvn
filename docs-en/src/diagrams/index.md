# Use Case and Diagram Catalogue

This is the single UC catalogue. The primary specification links here; group pages contain only detailed UC specifications. The UC codes below replace the broader proposal list from the old AI review. The Branch Manager can use every internal UC (by inheriting all internal roles); the table lists only the primary actors.

## Use Cases

| Code      | Name and specification                                                                | Primary actors                         |
| --------- | ------------------------------------------------------------------------------------- | -------------------------------------- |
| UC-TK-01  | [Register a customer account](./use-cases/tai-khoan-danh-muc.md#uc-tk-01)             | Customer                               |
| UC-TK-02  | [Sign in, sign out, and change password](./use-cases/tai-khoan-danh-muc.md#uc-tk-02) | Customer, Internal Staff               |
| UC-TK-03  | [Manage internal accounts and permissions](./use-cases/tai-khoan-danh-muc.md#uc-tk-03) | Branch Manager                       |
| UC-DM-01  | [Manage dish categories and dishes](./use-cases/tai-khoan-danh-muc.md#uc-dm-01)       | Branch Manager                         |
| UC-DM-02  | [Manage menu sets](./use-cases/tai-khoan-danh-muc.md#uc-dm-02)                       | Branch Manager                         |
| UC-DM-03  | [Manage ingredients and dish quantities](./use-cases/tai-khoan-danh-muc.md#uc-dm-03) | Branch Manager                         |
| UC-DM-04  | [Manage services](./use-cases/tai-khoan-danh-muc.md#uc-dm-04)                        | Branch Manager                         |
| UC-DM-05  | [Manage the Equipment catalogue](./use-cases/tai-khoan-danh-muc.md#uc-dm-05)          | Branch Manager, Warehouse Staff        |
| UC-DM-06  | [Manage event types](./use-cases/tai-khoan-danh-muc.md#uc-dm-06)                     | Branch Manager                         |
| UC-DM-07  | [Manage business parameters](./use-cases/tai-khoan-danh-muc.md#uc-dm-07)              | Branch Manager                         |
| UC-DT-01  | [Browse the catalogue and estimate the price](./use-cases/dat-tiec.md#uc-dt-01)       | Customer                               |
| UC-DT-02  | [Create an order](./use-cases/dat-tiec.md#uc-dt-02)                                  | Customer, Consultant                   |
| UC-DT-03  | [Conduct a site survey](./use-cases/dat-tiec.md#uc-dt-03)                            | Consultant                             |
| UC-DT-04  | [Run a Capacity Check](./use-cases/dat-tiec.md#uc-dt-04)                             | Consultant                             |
| UC-DT-05  | [Accept or reject an order](./use-cases/dat-tiec.md#uc-dt-05)                        | Consultant                             |
| UC-DT-06  | [Look up orders, contracts, and payment history](./use-cases/dat-tiec.md#uc-dt-06)   | Customer, Consultant, Accounting       |
| UC-HD-01  | [Create and issue a contract](./use-cases/hop-dong-thanh-toan.md#uc-hd-01)           | Consultant                             |
| UC-HD-02  | [Confirm a contract](./use-cases/hop-dong-thanh-toan.md#uc-hd-02)                    | Customer, Consultant                   |
| UC-HD-03  | [Pay online](./use-cases/hop-dong-thanh-toan.md#uc-hd-03)                           | Customer, Payment Service              |
| UC-HD-04  | [Record a manual payment](./use-cases/hop-dong-thanh-toan.md#uc-hd-04)               | Accounting                             |
| UC-HD-05  | [Change a meal through a Contract Addendum](./use-cases/hop-dong-thanh-toan.md#uc-hd-05) | Customer, Consultant               |
| UC-HD-06  | [Cancel a meal or contract](./use-cases/hop-dong-thanh-toan.md#uc-hd-06)             | Customer, Consultant                   |
| UC-HD-07  | [Record a Refund](./use-cases/hop-dong-thanh-toan.md#uc-hd-07)                      | Accounting                             |
| UC-HD-08  | [Perform Meal Settlement and complete the contract](./use-cases/hop-dong-thanh-toan.md#uc-hd-08) | Accounting                |
| UC-NS-01  | [Manage staff profiles](./use-cases/nhan-su.md#uc-ns-01)                            | HR Manager                             |
| UC-NS-02  | [Assign staff by meal](./use-cases/nhan-su.md#uc-ns-02)                             | HR Manager                             |
| UC-VH-01  | [Update meal progress](./use-cases/nhan-su.md#uc-vh-01)                            | Consultant, Warehouse Staff            |
| UC-KHO-01 | [Record an ingredient receipt](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-01)         | Warehouse Staff                        |
| UC-KHO-02 | [Conduct the month-end ingredient Stocktake](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-02) | Warehouse Staff                  |
| UC-KHO-03 | [Close the period and calculate monthly food cost](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-03) | Accounting                    |
| UC-KHO-04 | [Process the monthly ingredient Price Proposal](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-04) | Branch Manager                  |
| UC-KHO-05 | [Record an Equipment purchase](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-05)         | Warehouse Staff                        |
| UC-KHO-06 | [Issue Equipment for a meal](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-06)           | Warehouse Staff                        |
| UC-KHO-07 | [Return, count, and compensate for Equipment](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-07) | Warehouse Staff                  |
| UC-KHO-08 | [Repair or dispose of damaged Equipment](./use-cases/nguyen-lieu-dung-cu.md#uc-kho-08) | Warehouse Staff                  |
| UC-CS-01  | [Record a post-meal review](./use-cases/danh-gia-bao-cao.md#uc-cs-01)                | Customer, Consultant                   |
| UC-BC-01  | [View the Dashboard and warnings](./use-cases/danh-gia-bao-cao.md#uc-bc-01)          | Internal Staff                         |
| UC-BC-02  | [View revenue and food-cost reports](./use-cases/danh-gia-bao-cao.md#uc-bc-02)       | Branch Manager, Accounting             |
| UC-BC-03  | [View Equipment reports](./use-cases/danh-gia-bao-cao.md#uc-bc-03)                  | Branch Manager, Warehouse Staff        |

## Required Diagrams

- [Overall Use Case diagram](./use-cases.md).
- [Detailed Use Case specifications](./use-cases/index.md).
- [Detailed class model](./class.md).
- [Sequence diagrams](./sequence/index.md).
- [Activity diagrams](./activity/index.md).
- [State diagrams](./state/index.md).

## Maintenance

When adding, removing, or changing a UC, update this table and the related specification page in the same change. When adding a diagram, update the corresponding diagram-type index. Do not copy the UC table into the specification or child indexes.

The diagrams use Mermaid (no SVG files are generated). When editing diagrams, keep user-visible text in English and follow `AGENTS.md`.
