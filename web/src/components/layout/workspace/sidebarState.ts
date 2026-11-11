export const SIDEBAR_COOKIE = "mastercook.sidebar";

export const SIDEBAR_STATE = {
  Expanded: "expanded",
  Collapsed: "collapsed",
} as const;

export type SidebarState = (typeof SIDEBAR_STATE)[keyof typeof SIDEBAR_STATE];
