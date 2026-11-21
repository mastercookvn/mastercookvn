export const ORDER_CHANNEL = {
  Online: "ONLINE",
  OnBehalf: "ON_BEHALF",
} as const;

export type OrderChannel = (typeof ORDER_CHANNEL)[keyof typeof ORDER_CHANNEL];

export const ORDER_CHANNEL_LABEL: Record<OrderChannel, string> = {
  [ORDER_CHANNEL.Online]: "Online",
  [ORDER_CHANNEL.OnBehalf]: "Đặt hộ",
};

/** UC-DT-03 site survey checklist. */
export const SURVEY_QUESTIONS = [
  "Nguồn điện tại địa điểm",
  "Nguồn nước",
  "Khu vực chia món",
  "Tầng, thang máy",
  "Xe tải tiếp cận",
  "Diện tích đặt bàn",
];
