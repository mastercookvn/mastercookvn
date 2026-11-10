export type Assignment = {
  staff: string;
  position: string;
  task: string;
  hours: string;
};

export function assignmentsForMeal(mealId: string): Assignment[] {
  if (mealId === "0115") {
    return [
      {
        staff: "Đỗ Minh Tâm",
        position: "Phục vụ",
        task: "Khu A",
        hours: "16:00–21:30",
      },
      {
        staff: "Nguyễn Văn Hùng",
        position: "Bếp",
        task: "Bếp chính",
        hours: "13:00–20:00",
      },
      {
        staff: "Lê Thị Hoa",
        position: "Bếp",
        task: "Sơ chế",
        hours: "13:00–20:00",
      },
      {
        staff: "Phạm Quốc Bảo",
        position: "Vận chuyển",
        task: "Chở dụng cụ",
        hours: "12:00–22:30",
      },
    ];
  }
  return [
    {
      staff: "Đỗ Minh Tâm",
      position: "Phục vụ",
      task: "Khu A",
      hours: "09:00–14:00",
    },
    {
      staff: "Vũ Thu Trang",
      position: "Phục vụ",
      task: "Khu B",
      hours: "09:00–14:00",
    },
  ];
}
