import { BUSINESS_SETTINGS } from "@/constants/settings";

export type JourneyStepData = { title: string; description: string };

export const JOURNEY_STEPS: JourneyStepData[] = [
  {
    title: "Nấu sẵn tại bếp cơ sở",
    description:
      "Đội bếp chuẩn bị món theo đúng thực đơn đã chốt trong hợp đồng, xong trước giờ phục vụ.",
  },
  {
    title: "Đưa đến địa điểm của bạn",
    description: `Món đã nấu, bàn ghế và dụng cụ được chuyển tới theo khung giờ đã hẹn, trong phạm vi ${BUSINESS_SETTINGS.serviceRadiusKm} km.`,
  },
  {
    title: "Bày bàn và phục vụ",
    description:
      "Người phục vụ bày bàn, lên món trong suốt bữa tiệc và thu hồi dụng cụ sau khi kết thúc.",
  },
];

export const journeyImage = (index: number) =>
  `/images/scenes/journey${index + 1}.jpg`;
