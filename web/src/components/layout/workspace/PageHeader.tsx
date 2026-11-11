import type { ComponentType, ReactNode } from "react";

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
  type IconProps,
} from "@/components/icons";
import {
  WORKSPACE_SCREENS,
  type WorkspaceScreenKey,
} from "@/constants/permissions";

const SCREEN_ICONS: Record<WorkspaceScreenKey, ComponentType<IconProps>> = {
  dashboard: HomeIcon,
  orders: ClipboardIcon,
  orderDetail: ClipboardIcon,
  contracts: ContractIcon,
  contractDetail: ContractIcon,
  meals: FlagIcon,
  staff: TeamIcon,
  ingredients: CarrotIcon,
  equipment: PotIcon,
  catalog: BookIcon,
  reports: ChartIcon,
  settings: SlidersIcon,
};

/** Every workspace page opens the same way: icon and title. */
export function PageHeader({
  screen,
  title,
  meta,
  aside,
}: {
  screen: WorkspaceScreenKey;
  title?: string;
  meta?: ReactNode;
  aside?: ReactNode;
}) {
  const Icon = SCREEN_ICONS[screen];
  return (
    <header className="page-title">
      <span className="page-title-icon" aria-hidden="true">
        <Icon size={22} />
      </span>
      <div className="page-title-text">
        <h1 className="h1-compact">
          {title ?? WORKSPACE_SCREENS[screen].title}
        </h1>
        {meta ? <div className="page-title-meta">{meta}</div> : null}
      </div>
      {aside ? <div className="page-title-aside">{aside}</div> : null}
    </header>
  );
}
