import { notFound } from "next/navigation";

import { contractByNumber } from "@/mocks/contracts";

import { ContractHeader } from "../components/overview/ContractHeader";
import { ContractTabs } from "../components/overview/ContractTabs";
import { CountdownBanner } from "../components/overview/CountdownBanner";

export function ContractSelfServicePage({ number }: { number: string }) {
  const contract = contractByNumber(number);
  if (!contract) notFound();

  return (
    <div className="page">
      <ContractHeader contract={contract} />
      <CountdownBanner contract={contract} />
      <ContractTabs contract={contract} />
    </div>
  );
}
