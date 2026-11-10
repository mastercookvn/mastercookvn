import {
  BookIcon,
  CarrotIcon,
  ChartIcon,
  ClipboardIcon,
  ContractIcon,
  FlagIcon,
  HomeIcon,
  PotIcon,
  SlidersIcon,
  TeamIcon,
} from "@/components/icons";
import type { WorkspaceScreenKey } from "@/constants/permissions";
import { ROUTES } from "@/constants/routes";

import type { WorkspaceNavGroup } from "./WorkspaceNavLinks";

const ICON_SIZE = 18;

type NavGroup = {
  label: string;
  items: (WorkspaceNavGroup["items"][number] & {
    screen: WorkspaceScreenKey;
  })[];
};

export const WORKSPACE_NAV: NavGroup[] = [
  {
    label: "Điều hành",
    items: [
      {
        screen: "dashboard",
        href: ROUTES.workspace,
        label: "Tổng quan",
        icon: <HomeIcon size={ICON_SIZE} />,
      },
      {
        screen: "orders",
        href: ROUTES.workspaceOrders,
        label: "Đơn đặt tiệc",
        icon: <ClipboardIcon size={ICON_SIZE} />,
      },
      {
        screen: "contracts",
        href: ROUTES.workspaceContracts,
        label: "Hợp đồng",
        icon: <ContractIcon size={ICON_SIZE} />,
      },
      {
        screen: "meals",
        href: ROUTES.workspaceMeals,
        label: "Vận hành bữa",
        icon: <FlagIcon size={ICON_SIZE} />,
      },
    ],
  },
  {
    label: "Kho",
    items: [
      {
        screen: "ingredients",
        href: ROUTES.workspaceIngredients,
        label: "Nguyên liệu",
        icon: <CarrotIcon size={ICON_SIZE} />,
      },
      {
        screen: "equipment",
        href: ROUTES.workspaceEquipment,
        label: "Dụng cụ",
        icon: <PotIcon size={ICON_SIZE} />,
      },
    ],
  },
  {
    label: "Quản trị",
    items: [
      {
        screen: "staff",
        href: ROUTES.workspaceStaff,
        label: "Nhân sự",
        icon: <TeamIcon size={ICON_SIZE} />,
      },
      {
        screen: "catalog",
        href: ROUTES.workspaceCatalog,
        label: "Thực đơn và dịch vụ",
        icon: <BookIcon size={ICON_SIZE} />,
      },
      {
        screen: "reports",
        href: ROUTES.workspaceReports,
        label: "Báo cáo",
        icon: <ChartIcon size={ICON_SIZE} />,
      },
      {
        screen: "settings",
        href: ROUTES.workspaceSettings,
        label: "Cài đặt",
        icon: <SlidersIcon size={ICON_SIZE} />,
      },
    ],
  },
];
