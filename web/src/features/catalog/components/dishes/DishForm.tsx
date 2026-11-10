import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { TextField } from "@/components/ui/TextField";
import { ToastButton } from "@/components/ui/ToastButton";
import { formatNumber } from "@/lib/format";
import { dishById, DISH_CATEGORY_LABEL } from "@/mocks/catalog";

import { RecipeTable } from "./RecipeTable";
import { SuggestedPrice } from "./SuggestedPrice";

export function DishForm() {
  const dish = dishById("ga");

  return (
    <section className="card l-stack">
      <h3 className="card-title card-title-flush">{dish.name}</h3>
      <SelectField
        id="dish-category"
        label="Loại món"
        options={Object.values(DISH_CATEGORY_LABEL)}
        defaultValue="Món chính"
      />
      <TextareaField
        id="dish-description"
        label="Mô tả"
        defaultValue={dish.description}
      />
      <TextField
        id="dish-image"
        label="Ảnh"
        defaultValue="ga-hap-la-chanh.jpg"
      />
      <h3 className="card-title card-title-flush mt-2 text-15-5">
        Định lượng cho 1 bàn chuẩn
      </h3>
      <RecipeTable />
      <SuggestedPrice />
      <TextField
        id="dish-price"
        label="Giá bán"
        defaultValue={formatNumber(dish.price)}
        hint="Chấp nhận giá gợi ý hoặc nhập giá khác."
      />
      <div className="l-between">
        <ToastButton
          variant="danger"
          message="Món đã dùng chỉ ngưng, không xóa. Set liên quan được liệt kê để điều chỉnh."
        >
          Ngưng phục vụ
        </ToastButton>
        <ToastButton
          variant="primary"
          message="Đã lưu. Hợp đồng đã chốt giữ giá cũ."
        >
          Lưu món
        </ToastButton>
      </div>
    </section>
  );
}
