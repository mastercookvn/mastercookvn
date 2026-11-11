"use client";

import { DataTable } from "@/components/ui/DataTable";
import { num } from "@/components/ui/tableColumns";
import { formatMoney } from "@/lib/format";
import { CONTRACT_WEDDING, type Contract } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

import { upcomingMeal } from "@/features/contracts/lib/contractState";

export function ContractMealTable({
  contract = CONTRACT_WEDDING,
}: {
  contract?: Contract;
}) {
  const applied = useDemoState(
    (state) => state.appliedAddenda[contract.number]
  );
  const edited = applied ? upcomingMeal(contract) : undefined;
  const total =
    edited && applied
      ? contract.total - edited.price.total + applied.total
      : contract.total;

  return (
    <DataTable
      columns={[
        "Bữa",
        "Thời gian",
        num("Lượt đãi"),
        num("Bàn ăn"),
        num("Bàn bố trí"),
        "Thực đơn",
        num("Tiền món"),
        num("Dịch vụ"),
        num("Thuế"),
        num("Tổng"),
      ]}
      rows={contract.meals.map((meal, index) => [
        `Bữa ${index + 1}`,
        `${meal.date} ${meal.time}`,
        meal.waves.length,
        meal === edited && applied ? applied.tables : meal.servingTables,
        meal.setupTables,
        meal.setName,
        formatMoney(meal.price.dishAmount),
        formatMoney(meal.price.serviceAmount),
        formatMoney(meal.price.taxAmount),
        formatMoney(
          meal === edited && applied ? applied.total : meal.price.total
        ),
      ])}
      foot={
        <>
          <td colSpan={9}>Tổng hợp đồng</td>
          <td className="is-num">{formatMoney(total)}</td>
        </>
      }
    />
  );
}
