import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";

export function StockAlertList() {
  return (
    <Card>
      <CardTitle>Cảnh báo tồn kho</CardTitle>
      <div className="check-row">
        <span>Khay inox</span>
        <span className="text-soft">18 / tối thiểu 30</span>
      </div>
      <div className="check-row">
        <span>Ly thủy tinh</span>
        <span className="text-soft">268 / tối thiểu 300</span>
      </div>
    </Card>
  );
}
