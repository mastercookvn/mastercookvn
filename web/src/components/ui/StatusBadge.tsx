import {
  ADDENDUM_STATUS_META,
  CONTRACT_STATUS_META,
  EQUIPMENT_ISSUE_STATUS_META,
  INVENTORY_PERIOD_STATUS_META,
  MEAL_STATUS_META,
  ORDER_STATUS_META,
  PAYMENT_STATUS_META,
  SETTLEMENT_STATUS_META,
} from "@/constants/labels";
import type {
  AddendumStatus,
  ContractStatus,
  EquipmentIssueStatus,
  InventoryPeriodStatus,
  MealStatus,
  OrderStatus,
  PaymentStatus,
  SettlementStatus,
} from "@/constants/statuses";

import { Badge } from "./Badge";

type StatusBadgeProps =
  | { domain: "order"; status: OrderStatus }
  | { domain: "contract"; status: ContractStatus }
  | { domain: "meal"; status: MealStatus }
  | { domain: "addendum"; status: AddendumStatus }
  | { domain: "payment"; status: PaymentStatus }
  | { domain: "equipmentIssue"; status: EquipmentIssueStatus }
  | { domain: "inventoryPeriod"; status: InventoryPeriodStatus }
  | { domain: "settlement"; status: SettlementStatus };

export function StatusBadge(props: StatusBadgeProps) {
  const meta = (() => {
    switch (props.domain) {
      case "order":
        return ORDER_STATUS_META[props.status];
      case "contract":
        return CONTRACT_STATUS_META[props.status];
      case "meal":
        return MEAL_STATUS_META[props.status];
      case "addendum":
        return ADDENDUM_STATUS_META[props.status];
      case "payment":
        return PAYMENT_STATUS_META[props.status];
      case "equipmentIssue":
        return EQUIPMENT_ISSUE_STATUS_META[props.status];
      case "inventoryPeriod":
        return INVENTORY_PERIOD_STATUS_META[props.status];
      case "settlement":
        return SETTLEMENT_STATUS_META[props.status];
    }
  })();

  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}
