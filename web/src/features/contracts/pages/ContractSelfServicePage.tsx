import { notFound } from "next/navigation";

import { findContract } from "../lib/contractRepository";
import { ContractHeader } from "../components/overview/ContractHeader";
import { ContractTabs } from "../components/overview/ContractTabs";
import { CountdownBanner } from "../components/overview/CountdownBanner";

export function ContractSelfServicePage({ number }: { number: string }) {
  const contract = findContract(number);
  if (!contract) notFound();

  return (
    <div className="page">
      <ContractHeader contract={contract} />
      <CountdownBanner contract={contract} />
      <ContractTabs contract={contract} />
    </div>
  );
}
