"use client";

import { Suspense, type ReactNode } from "react";

import { useQueryParam } from "@/hooks/useQueryParam";

export type TabItem = { value: string; label: string };

type TabsProps = {
  items: TabItem[];
  panels: Record<string, ReactNode>;
  panelClassName?: string;
  header?: ReactNode;
  headerClassName?: string;
  param?: string;
};

function TabsView({
  items,
  panels,
  panelClassName = "tab-panel l-stack",
  header,
  headerClassName = "l-stack gap-2",
  param,
  active,
  onSelect,
}: TabsProps & { active: string; onSelect?: (value: string) => void }) {
  return (
    <>
      <div className={headerClassName}>
        {header}
        <div className="tabs" role="tablist">
          {items.map((item) => (
            <a
              key={item.value}
              role="tab"
              className="tab"
              href={`?${param}=${item.value}`}
              aria-selected={item.value === active}
              onClick={(event) => {
                event.preventDefault();
                onSelect?.(item.value);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div key={active} role="tabpanel" className={panelClassName}>
        {panels[active]}
      </div>
    </>
  );
}

function TabsFromUrl(props: TabsProps) {
  const [value, setValue] = useQueryParam(props.param ?? "tab");
  const active = props.items.some((item) => item.value === value)
    ? (value as string)
    : props.items[0].value;

  return <TabsView {...props} active={active} onSelect={setValue} />;
}

export function Tabs({ param = "tab", ...props }: TabsProps) {
  return (
    <Suspense
      fallback={
        <TabsView {...props} param={param} active={props.items[0].value} />
      }
    >
      <TabsFromUrl {...props} param={param} />
    </Suspense>
  );
}
