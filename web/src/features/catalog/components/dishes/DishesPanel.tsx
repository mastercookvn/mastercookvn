import { Button } from "@/components/ui/Button";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ToastButton } from "@/components/ui/ToastButton";

import { DishForm } from "./DishForm";
import { DishTable } from "./DishTable";

export function DishesPanel() {
  return (
    <>
      <PanelHeader
        title="Món và định lượng"
        subtitle="Giá cho bàn ăn chuẩn 10 người"
        actions={
          <>
            <Button>Loại món</Button>
            <ToastButton
              variant="primary"
              message="Bản mẫu: mở biểu mẫu thêm món"
            >
              Thêm món
            </ToastButton>
          </>
        }
      />
      <div className="l-grid l-grid-2">
        <DishTable />
        <DishForm />
      </div>
    </>
  );
}
