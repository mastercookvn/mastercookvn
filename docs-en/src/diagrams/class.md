# Detailed Class Model

This document provides the detailed class model and business specification. [Software Specification](../specification.md) is the source of truth for BR rules. Do not duplicate the model in the specification.

## Conventions

- `UUID`: identifier; `?`: optional; `money`: whole VND amount; `decimal-money`: price/unit value that requires precision before rounding; `decimal`: precise quantity/ratio; `datetime`: time-zone-aware timestamp.
- `YearMonth`: a month in Vietnam time. Ratios are stored consistently as decimals and displayed as percentages in the interface.
- Derived attributes may be calculated when read; if a locked snapshot is stored, it must be updated atomically and must not be treated as a second source of monetary truth.
- The following models are domain models; they do not require every class to map to a table or automatically expose CRUD operations for every class.
- Locked prices and content are historical data and are not dynamically linked to later catalog changes.

## Overview Class Diagram

The overview diagram shows the domain architecture and the core relationships among subsystems:

```mermaid
classDiagram
    direction TB
    class Customer { +UUID id
        +string fullName
        +string phoneNumber }
    class Account { +UUID id
        +string phoneNumber
        +string status }
    class Role { +UUID id
        +string code }
    class StaffMember { +UUID id
        +string fullName
        +string type
        +string position }
    class Order { +UUID id
        +string code
        +string channel
        +string status }
    class Meal { +UUID id
        +datetime startsAt
        +datetime endsAt
        +int servingTables
        +int setupTables
        +string status }
    class Contract { +UUID id
        +string number
        +money totalValue
        +string status }
    class ContractAddendum { +UUID id
        +string number
        +string type
        +money difference
        +string status }
    class PaymentTransaction { +UUID id
        +string type
        +string method
        +money amount
        +string status }
    class PaymentAllocation { +UUID id
        +money amount }
    class MealSettlement { +UUID id
        +money totalDue
        +string status }
    class MealCancellation { +UUID id
        +money refundAmount
        +money retainedAmount }
    class Dish { +UUID id
        +string name
        +money standardSellingPrice }
    class Ingredient { +UUID id
        +string name
        +decimal_money currentPrice }
    class Equipment { +UUID id
        +string name
        +int ownedQuantity
        +int readyQuantity }
    class EquipmentHold { +UUID id
        +int quantity
        +string status }
    class EquipmentIssue { +UUID id
        +string code
        +string status }
    class CountReport { +UUID id
        +string status }
    class StaffingAssignment { +UUID id
        +string position
        +string status }
    class Review { +UUID id
        +int rating }

    %% Relationships among subsystems
    Customer "1" --> "0..1" Account : links
    StaffMember "1" --> "0..1" Account : links
    Account "1" --> "0..*" Role : hasRoles
    Customer "1" --> "0..*" Order : places
    Order "1" *-- "1..*" Meal : contains
    Order "1" --> "0..1" Contract : issues
    Contract "1" --> "0..*" ContractAddendum : adjusts
    ContractAddendum "0..*" --> "1" Meal : appliesTo
    Contract "1" --> "0..*" PaymentTransaction : generates
    PaymentTransaction "1" *-- "1..*" PaymentAllocation : allocates
    PaymentAllocation "0..*" --> "1" Meal : forMeal
    Meal "1" --> "0..1" MealSettlement : settles
    Meal "1" --> "0..1" MealCancellation : cancels
    Meal "0..*" --> "1..*" Dish : selects
    Dish "0..*" --> "1..*" Ingredient : recipe
    Meal "1" --> "0..*" EquipmentHold : holds
    EquipmentHold "0..*" --> "1" Equipment : type
    Meal "1" --> "0..1" EquipmentIssue : issues
    EquipmentIssue "1" --> "0..1" CountReport : counts
    Meal "1" --> "0..*" StaffingAssignment : assigns
    StaffingAssignment "0..*" --> "1" StaffMember : assignedTo
    Meal "1" --> "0..1" Review : receives
```

## Accounts and Customers

```mermaid
classDiagram
    direction TB
    class Account {
        +UUID id
        +string phoneNumber
        +string passwordHash
        +string displayName
        +string status
        +UUID? customerId
        +UUID? staffMemberId
        +register()
        +login()
        +lock()
        +linkCustomer()
    }
    class Role {
        +UUID id
        +string code
        +string name
        +permissionsByFeature()
    }
    class RoleAssignment {
        +UUID accountId
        +UUID roleId
        +assign()
        +remove()
    }
    class Customer {
        +UUID id
        +string fullName
        +string phoneNumber
        +string? contactAddress
        +text? note
        +update()
        +findByPhoneNumber()
    }
    class StaffMember {
        +UUID id
        +string fullName
        +string phoneNumber
        +string type
        +string position
        +string status
        +update()
        +canBeAssigned(timeRange, position)
    }
    Account "1" --> "0..*" RoleAssignment : has
    Role "1" --> "0..*" RoleAssignment : isAssigned
    Customer "1" --> "0..1" Account : linksAccount
    StaffMember "1" --> "0..1" Account : linksAccount
```

### Business Constraints

- **Account**: An account is not required to store a customer profile or a staff profile.
- **Role**: System roles are fixed by the specified permissions table; there is no dynamic role-approval workflow.
- **RoleAssignment**: Each account–role pair is unique; a user's permissions are the union of the assigned roles.
- **Customer**: The profile identity key is the normalized phone number. A customer who registers a new account with the same phone number is automatically linked to the customer profile previously created through an on-behalf order.
- **StaffMember**: Professional positions (Cook, Server, Driver, Counter) are business data for shift assignments, not system account roles. Timekeeping and payroll are not managed.

## Orders, Meals, and Surveys

```mermaid
classDiagram
    direction TB
    class Order {
        +UUID id
        +string code
        +UUID customerId
        +UUID creatorId
        +string channel
        +string status
        +datetime createdAt
        +text? rejectionReason
        +addMeal()
        +submit()
        +accept()
        +reject()
        +cancel()
    }
    class Meal {
        +UUID id
        +UUID orderId
        +UUID eventTypeId
        +datetime startsAt
        +datetime endsAt
        +datetime equipmentFrom
        +datetime equipmentUntil
        +int initialServingTables
        +int servingTables
        +int guestsPerTable
        +int setupTables
        +int setupChairs
        +map plannedStaffByPosition
        +string? contactName
        +string? contactPhone
        +string status
        +text? note
        +calculateDishAmount()
        +equipmentDemand()
        +suggestStaffing()
        +validateAdjustment()
        +cancel()
        +complete()
    }
    class EventType { +UUID id
        +string name
        +text? description
        +bool active
        +update()
        +deactivate() }
    class SiteSurvey { +UUID id
        +UUID mealId
        +text address
        +decimal distanceKm
        +text? note
        +UUID recordedById
        +datetime recordedAt
        +update()
        +checkServiceRadius() }
    class SurveyAnswer { +UUID id
        +UUID surveyId
        +int sortOrder
        +string question
        +text answer
        +update() }
    class MealDish { +UUID id
        +UUID mealId
        +UUID dishId
        +string lockedDishName
        +money lockedStandardPrice
        +decimal scaleFactor
        +text? note
        +amount(servingTables) }
    class MealService { +UUID id
        +UUID mealId
        +UUID serviceId
        +string lockedName
        +string lockedUnit
        +decimal quantity
        +money lockedUnitPrice
        +amount() }
    class MealPrice { +UUID id
        +UUID mealId
        +money dishAmount
        +money serviceAmount
        +money surcharge
        +text? surchargeReason
        +decimal taxRate
        +money taxAmount
        +money roundingDifference
        +money total
        +calculateTotal() }
    Order "1" *-- "1..*" Meal : contains
    EventType "1" --> "0..*" Meal : classifies
    Meal "1" *-- "1" SiteSurvey : has
    SiteSurvey "1" *-- "0..*" SurveyAnswer : contains
    Meal "1" *-- "1..*" MealDish : contains
    Meal "1" *-- "0..*" MealService : contains
    Meal "1" *-- "1" MealPrice : prices
```

### Business Constraints

- **Order**: An order supports one or more meals; an unsubmitted draft is stored only in the browser, and the system stores it only when the user submits the order (`ChoXacNhan`).
- **Meal**: Serving tables and the actual setup tables/chairs are explicitly distinct. Resource-use time ranges are entered manually. Menu, survey, and staffing assignments are independent for each meal.
- **EventType**: Event types support management and reporting and do not automatically suggest dishes based on spiritual or cultural assumptions.
- **SiteSurvey & SurveyAnswer**: Each meal has its own site survey; questions and answers are stored directly with that survey, and answers are not shared across meals.
- **MealDish & MealService**: Store the meal's fixed, locked list of dishes and services; they do not dynamically follow the current catalog after the contract is issued.
- **MealPrice**: Exactly one current pricing breakdown exists for each meal. Prices locked in the contract are immutable historical data.

## Contracts, Adjustments, and Money

```mermaid
classDiagram
    direction TB
    class Contract { +UUID id
        +string number
        +UUID orderId
        +document lockedContent
        +money totalValue
        +datetime issuedAt
        +datetime depositDeadline
        +string status
        +issue()
        +checkActivation()
        +balance()
        +checkClosure() }
    class DocumentConfirmation { +UUID id
        +UUID? contractId
        +UUID? addendumId
        +string method
        +UUID? confirmerId
        +string signerName
        +datetime signedAt
        +UUID recordedById
        +UUID? signatureFileId
        +recordOnline()
        +recordPaperSignature() }
    class ContractAddendum { +UUID id
        +UUID contractId
        +UUID mealId
        +string number
        +string type
        +document contentBefore
        +document contentAfter
        +money difference
        +money extraDeposit
        +string status
        +UUID createdById
        +datetime createdAt
        +calculateDifference()
        +confirm()
        +apply()
        +cancel() }
    class MealCancellation { +UUID id
        +UUID mealId
        +UUID recordedById
        +datetime requestedAt
        +text reason
        +decimal hoursRemaining
        +money depositRefundBasis
        +money prepaidExcess
        +decimal refundRate
        +money processingFee
        +money refundAmount
        +money retainedAmount
        +money agreedExtraCharge
        +text? agreementNote
        +calculateRefund()
        +confirmCancellation() }
    class PaymentTransaction { +UUID id
        +UUID contractId
        +string type
        +string method
        +money amount
        +string status
        +string? referenceCode
        +datetime timestamp
        +UUID? recordedById
        +UUID? evidenceFileId
        +confirmOnline()
        +recordManually()
        +allocate() }
    class PaymentAllocation { +UUID id
        +UUID transactionId
        +UUID mealId
        +money amount
        +money requiredDepositPortion
        +money prepaymentPortion
        +validateAllocationTotal() }
    class MealSettlement { +UUID id
        +UUID mealId
        +money currentValue
        +money compensation
        +money? postCancellationObligation
        +money totalDue
        +string status
        +datetime? closedAt
        +UUID? closedById
        +totalCollected()
        +totalRefunded()
        +balance()
        +close() }
    class Attachment { +UUID id
        +string storageKey
        +string originalName
        +string contentType
        +int size
        +UUID uploadedById
        +datetime uploadedAt
        +retrieveWithAuthorization() }
    Contract "1" --> "0..*" ContractAddendum : has
    Contract "1" --> "0..1" DocumentConfirmation : confirms
    ContractAddendum "1" --> "0..1" DocumentConfirmation : confirms
    Contract "1" --> "0..*" PaymentTransaction : generates
    PaymentTransaction "1" *-- "1..*" PaymentAllocation : allocates
    DocumentConfirmation "0..*" --> "0..1" Attachment : paperSignature
    PaymentTransaction "0..*" --> "0..1" Attachment : evidence
```

### Business Constraints

- **Contract**: One contract covers all meals in the order. Its stored content includes the complete meal list, locked unit prices, and terms; it does not depend on later catalog changes.
- **DocumentConfirmation**: Links to exactly one Contract or ContractAddendum; a paper-signature method requires an attached scan of the signed document. Online confirmation records the customer account and does not use OTP.
- **ContractAddendum**: One addendum applies to exactly one meal and cannot move the meal date. Each meal may have at most one unresolved addendum to prevent data conflicts.
- **MealCancellation**: Stores the refund result and basis independently for each meal; cancelling an entire contract creates a result for every corresponding meal.
- **PaymentTransaction & PaymentAllocation**: Every transaction amount is positive (type `Hoan` determines the cash-flow direction). The total allocated across meals must exactly equal the transaction amount.
- **MealSettlement**: Collected/refunded amounts and the balance are calculated from successful transactions. For a cancelled meal, the post-cancellation payment obligation replaces the service amount.

## Dish and Ingredient Catalog

```mermaid
classDiagram
    direction TB
    class DishCategory { +UUID id
        +string name
        +int sortOrder
        +bool active
        +update()
        +deactivate() }
    class Dish { +UUID id
        +UUID categoryId
        +string name
        +text? description
        +string? image
        +money standardSellingPrice
        +bool serving
        +estimatedCost()
        +suggestedPrice(targetFoodCost)
        +updatePrice()
        +deactivate() }
    class MenuSet { +UUID id
        +string name
        +text? description
        +bool serving
        +calculatePrice()
        +updateDishes()
        +deactivate() }
    class MenuSetDish { +UUID menuSetId
        +UUID dishId
        +int sortOrder
        +reorder() }
    class Ingredient { +UUID id
        +string name
        +string standardUnit
        +decimal_money currentPrice
        +bool active
        +updatePrice()
        +affectedDishes() }
    class RecipeLine { +UUID dishId
        +UUID ingredientId
        +decimal standardQuantity
        +calculateCost() }
    class Service { +UUID id
        +string name
        +text? description
        +string unit
        +money unitPrice
        +bool active
        +update()
        +deactivate() }
    class BusinessSettings { +UUID id
        +decimal targetFoodCost
        +decimal taxRate
        +datetime effectiveFrom
        +UUID updatedById
        +applyToNewData() }
    DishCategory "1" --> "0..*" Dish : classifies
    MenuSet "1" *-- "0..*" MenuSetDish : contains
    Dish "1" <-- "0..*" MenuSetDish : includes
    Dish "1" *-- "0..*" RecipeLine : recipe
    Ingredient "1" <-- "0..*" RecipeLine : ingredient
```

### Business Constraints

- **DishCategory & Dish**: Group dishes for catalog filtering; a custom menu requires at least 6 dishes for one meal. The standard unit price applies to a standard 10-person serving table.
- **MenuSet**: A set's price is the sum of its component dish prices, without adding a second profit margin. The meal stores its locked dish list and does not dynamically point to the set.
- **MenuSetDish**: Each menu-set–dish pair is unique.
- **Ingredient & RecipeLine**: A recipe line defines the ingredient quantity for one standard 10-person serving table (each dish–ingredient pair is unique). The current unit price is used to calculate estimated cost and suggest the dish selling price.
- **Service**: Services are provided directly by the business (decoration, sound system, etc.); outsourced providers are not managed.
- **BusinessSettings**: System-wide business parameters (target food cost, tax rate, etc.) apply to calculations and newly created orders.

## Purchases, Stocktakes, and Food Cost

```mermaid
classDiagram
    direction TB
    class IngredientPurchase { +UUID id
        +string code
        +datetime purchasedAt
        +string supplierName
        +string? supplierPhone
        +UUID recordedById
        +text? note
        +total()
        +record() }
    class IngredientPurchaseLine { +UUID id
        +UUID purchaseId
        +UUID ingredientId
        +string lockedUnit
        +decimal quantity
        +decimal_money unitPrice
        +amount() }
    class InventoryPeriod { +UUID id
        +YearMonth month
        +string status
        +money dishRevenue
        +money consumedCost
        +decimal? actualFoodCost
        +money ingredientMargin
        +UUID? closedById
        +datetime? closedAt
        +aggregate()
        +calculateFoodCost()
        +close()
        +reopen() }
    class StocktakeLine { +UUID id
        +UUID periodId
        +UUID ingredientId
        +decimal openingQuantity
        +money openingValue
        +decimal purchasedQuantity
        +money purchasedValue
        +decimal actualClosingQuantity
        +decimal_money weightedAverageUnitCost
        +money closingValue
        +money consumedCost
        +text? note
        +calculateInventoryValue()
        +calculateConsumption() }
    class MonthlyPriceProposalBatch { +UUID id
        +YearMonth month
        +datetime calculationAnchor
        +datetime fromDate
        +datetime toDate
        +datetime createdAt
        +string creationSource
        +string status
        +createIfAbsent()
        +aggregateStatus() }
    class PriceProposalLine { +UUID id
        +UUID batchId
        +UUID ingredientId
        +decimal_money oldPrice
        +decimal_money proposedPrice
        +decimal_money? selectedPrice
        +string status
        +UUID? processedById
        +datetime? processedAt
        +calculateWeightedPrice()
        +accept()
        +adjust()
        +skip() }
    IngredientPurchase "1" *-- "1..*" IngredientPurchaseLine : contains
    InventoryPeriod "1" *-- "1..*" StocktakeLine : contains
    MonthlyPriceProposalBatch "1" *-- "0..*" PriceProposalLine : contains
```

### Business Constraints

- **IngredientPurchase & IngredientPurchaseLine**: Record actual purchased quantities and unit prices; they do not have to link directly to a meal. Quantity $>0$, unit price $\ge 0$.
- **InventoryPeriod & StocktakeLine**: Stocktake and period closing are monthly. Consumption = Opening value + Purchases − Closing value. Ingredient inventory is not issued or deducted after each meal.
- **MonthlyPriceProposalBatch & PriceProposalLine**: Use the first day of the month as the calculation anchor; calculate a weighted average over the preceding 30 days (three 10-day windows weighted 1.5; 1.5; 2). The proposed price is independent of inventory valuation.

## Equipment and Resources

```mermaid
classDiagram
    direction TB
    class Equipment { +UUID id
        +string name
        +string unit
        +string rateBasis
        +decimal rate
        +decimal? reserveRate
        +int minimumQuantity
        +money compensationPrice
        +int ownedQuantity
        +int readyQuantity
        +int inUseQuantity
        +int damagedQuantity
        +calculateDemand()
        +warnShortage()
        +restore()
        +discard() }
    class EquipmentHold { +UUID id
        +UUID mealId
        +UUID equipmentId
        +int quantity
        +datetime fromTime
        +datetime untilTime
        +string status
        +datetime? temporaryExpiry
        +bool issued
        +checkAvailability()
        +makePermanent()
        +release() }
    class MealCompensationPrice { +UUID mealId
        +UUID equipmentId
        +string lockedName
        +money lockedUnitPrice
        +getLockedPrice() }
    class EquipmentPurchase { +UUID id
        +string code
        +datetime purchasedAt
        +string supplierName
        +string? supplierPhone
        +UUID recordedById
        +total()
        +record() }
    class EquipmentPurchaseLine { +UUID id
        +UUID purchaseId
        +UUID equipmentId
        +int quantity
        +money unitPrice
        +amount() }
    class EquipmentIssue { +UUID id
        +string code
        +UUID mealId
        +UUID issuedById
        +datetime? issuedAt
        +string status
        +checkStock()
        +issue()
        +completeCount() }
    class EquipmentIssueLine { +UUID id
        +UUID issueId
        +UUID equipmentId
        +int quantity
        +validateQuantity() }
    class CountReport { +UUID id
        +UUID equipmentIssueId
        +UUID countedById
        +datetime countedAt
        +string status
        +text? note
        +validateBalance()
        +calculateCompensation()
        +confirm() }
    class CountReportRow { +UUID id
        +UUID countReportId
        +UUID issueLineId
        +int goodReturned
        +int damaged
        +int lost
        +int chargedToCustomer
        +money lockedCompensationUnitPrice
        +text? reason
        +calculateCompensation() }
    class DamageHandling { +UUID id
        +UUID equipmentId
        +int quantity
        +string type
        +text reason
        +UUID recordedById
        +datetime timestamp
        +apply() }
    EquipmentPurchase "1" *-- "1..*" EquipmentPurchaseLine : contains
    EquipmentIssue "1" *-- "1..*" EquipmentIssueLine : contains
    EquipmentIssue "1" --> "0..1" CountReport : createsReport
    CountReport "1" *-- "1..*" CountReportRow : contains
    EquipmentIssueLine "1" <-- "1" CountReportRow : countsIssueLine
```

### Business Constraints

- **Equipment**: Ownership invariant: $\text{Owned} = \text{Ready} + \text{In use} + \text{Damaged}$. Minimum stock is a replenishment-warning threshold and does not hard-block the workflow when enough usable quantity remains.
- **EquipmentHold**: A hold is temporary (24 hours) or permanent; it is explicitly distinct from a physical issue to prevent inventory from being deducted twice from future availability.
- **MealCompensationPrice**: The compensation unit price is locked in the contract before the meal and does not use the market price at count time.
- **EquipmentPurchase & EquipmentPurchaseLine**: A purchase directly increases both ready and owned quantities.
- **EquipmentIssue, CountReport & CountReportRow**: Each meal has at most one issue and one complete count report. Required balance: $\text{Good} + \text{Damaged} + \text{Lost} = \text{Issued}$; $0 \le \text{Charged to customer} \le \text{Damaged} + \text{Lost}$.
- **DamageHandling**: Records restored quantity (moved to ready) or discarded quantity (reduces both damaged and owned quantities).

## Staffing Assignments and Reviews

```mermaid
classDiagram
    direction TB
    class StaffingAssignment { +UUID id
        +UUID mealId
        +UUID staffMemberId
        +string position
        +text? task
        +datetime startsAt
        +datetime endsAt
        +string status
        +UUID assignedById
        +checkScheduleConflict()
        +replaceStaffMember()
        +cancel() }
    class Review { +UUID id
        +UUID mealId
        +UUID customerId
        +int rating
        +text? comment
        +UUID enteredById
        +datetime enteredAt
        +record() }
```

### Business Constraints

- **StaffingAssignment**: Work hours may encompass or differ from the meal's serving hours. Assignment blocks schedule overlaps for a specific person. Overall staffing capacity is reserved by position for held meals before named staff members are assigned.
- **Review**: Each meal has at most one review (rating 1–5), available only after the meal reaches status `HoanTat`. The reviewer must be the customer who placed the order containing that meal.

## Domain Services

```mermaid
classDiagram
    direction TB
    class CapacityCheck { <<service>>
        +check(meal, timeRange)
        +holdTemporarily(order)
        +makePermanent(contract)
        +release(meal) }
    class PricingService { <<service>>
        +calculateMeal()
        +calculateSuggestedDishPrice()
        +calculateAddendumDifference()
        +roundTo500() }
    class PaymentService { <<service>>
        +createRequest()
        +recordManually()
        +receiveResult()
        +allocate()
        +recordRefund() }
    class MonthlyInventoryClosing { <<service>>
        +aggregatePurchases()
        +getOpeningInventory()
        +valueClosingInventory()
        +calculateFoodCost()
        +closePeriod() }
    class MonthlyPriceProposalService { <<service>>
        +createIfAbsent(month)
        +calculateWeightedPrice()
        +processLine()
        +getAffectedDishes() }
    class ReportingService { <<service>>
        +revenueByMeal()
        +foodCostByPeriod()
        +ingredientMargin()
        +collectionsAndRefunds()
        +losses()
        +dashboard() }
```

## Domain Invariants

1. Meals, addenda, payment allocations, settlements, and resource holds must not reference entities across two contracts.
2. Online customers may view only the profile linked to their phone number; internal permissions are determined by the role-permissions table.
3. Total collections/refunds are calculated from successful transactions; total meal allocations must exactly equal the transaction amount; the balance counts the deposit only once.
4. Cancelling one meal releases only that meal's resource holds and staffing assignments and does not affect other meals in the same order.
5. Future availability is calculated from total usable ownership minus overlapping holds; at issue time, actual ready quantity is also checked. A hold whose equipment has been issued is not deducted twice.
6. Ingredient inventory is stocktaken only on a monthly cycle and stores purchase records; it has no inventory-issue records or detailed per-meal ingredient consumption.
7. Inventory value uses the monthly weighted-average unit cost; the current ingredient price uses the 30-day weighted-average proposed price; the two values are not interchangeable.
8. A price-proposal batch is unique per month; an inventory period is unique per month; a review is unique per meal; a provider-side payment transaction reference is unique.
9. Catalog items with historical records may only be deactivated, not deleted. Confirmed contract/addendum content and successful transactions must not be overwritten.
