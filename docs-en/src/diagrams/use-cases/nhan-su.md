# HR and Operations

## UC-NS-01

| Field         | Details                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Name          | Manage personnel profiles                                                                        |
| Actor         | HR Manager                                                                                       |
| Goal          | Maintain permanent and temporary personnel for assignment, including people without an Account. |
| Trigger       | A new employee joins or a profile changes.                                                       |
| Preconditions | The actor is signed in with the required permissions.                                            |
| Postconditions| The profile can be used for assignments.                                                         |
| Relationships | Independent of UC-TK-03 (profile ≠ Account).                                                     |
| Rules         | BR02, BR12                                                                                        |

**Main flow**

1. The HR Manager enters the person's name, phone number, employment type (permanent/temporary), and position (kitchen, service, transport, and so on).
2. The system validates the phone number and saves the profile with active employment status.
3. The HR Manager views the personnel list and each person's assignment history.

**Alternative flows**

- 1a. Edit a profile: change the details or position and save.
- 1b. End employment: the system lists the person's future assignments so replacements can be made (UC-NS-02); the inactive person cannot receive new work.

**Exceptions**

- 2e. The name or phone number is missing, or the phone number duplicates another personnel profile: do not save.

## UC-NS-02

| Field         | Details                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| Name          | Assign personnel to a Meal                                              |
| Actor         | HR Manager                                                              |
| Goal          | Assign people, positions, and time windows to each Meal.                |
| Trigger       | A Contract is effective and a Meal requires preparation.                |
| Preconditions | The Meal is `DaXacNhan`; active personnel profiles exist.               |
| Postconditions| The Meal has an assignment list; personnel are notified outside the system. |
| Relationships | —                                                                       |
| Rules         | BR12                                                                    |

**Main flow**

1. The HR Manager selects a Meal from the dashboard or event calendar.
2. The system displays the setup-table count and suggested staffing ratios: service staff = ceil(setup tables / 3) (TS42), kitchen staff = max(2, ceil(serving tables / 5)) (TS43), and loading staff = 2 people / 10 tables when a tent is included (TS44). It also shows expected demand by position and the number already assigned.
3. The HR Manager selects a person, position, task, and start/end time (the start time is at least 3 hours before the Meal for preparation under TS35).
4. The system checks that the person is active, has no overlapping time window, works ≤ 12 hours/day (TS40), and rests ≥ 8 hours between consecutive shifts (TS41).
5. The system saves the assignment.
6. The HR Manager notifies the person through Zalo or by phone.

**Alternative flows**

- 3a. Repeat steps 3–5 until staffing is sufficient; the actual number may differ from the suggestion and is not blocked.
- 3b. Replace a person: edit the assignment and repeat the checks in step 4.
- 3c. Remove an assignment: delete the row; the shortage reappears on the dashboard.

**Exceptions**

- 4e. The time overlaps, the person exceeds 12 working hours/day (TS40), the rest between shifts is < 8 hours (TS41), or the person is inactive: require another person.

## UC-VH-01

| Field         | Details                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------- |
| Name          | Update Meal progress                                                                            |
| Actors        | Consultant, Storekeeper                                                                         |
| Goal          | Record when a Meal is being prepared, being served, and finished to trigger warehouse/settlement steps. |
| Trigger       | Preparation, service, or service completion begins.                                             |
| Preconditions | The Meal is `DaXacNhan` or is at the immediately preceding progress step.                       |
| Postconditions| The Meal transitions `DangChuanBi` → `DangPhucVu` → `ChoKiemDem`/`ChoQuyetToan`.                |
| Relationships | Precedes UC-KHO-06; followed by UC-KHO-07 or UC-HD-08.                                          |
| Rules         | BR11, BR13                                                                                      |

**Main flow**

1. The user opens the Meal.
2. The system displays the current status and the next valid step.
3. The user selects the next step: start preparation, start service, or finish service.
4. The system records the time and the user who made the update, then changes the status.
5. When service finishes, a Meal with an equipment issue note moves to `ChoKiemDem`; otherwise it moves to `ChoQuyetToan`.

**Alternative flows**

- 3a. The Customer cancels before service starts: continue with UC-HD-06.

**Exceptions**

- 3e. Attempt to skip a step or move backward: reject the transition.
- 3f. Attempt to start service before the Contract is effective: reject the transition.
