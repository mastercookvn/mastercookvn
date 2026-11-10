import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContractDocument } from "@/features/contracts/components/document/ContractDocument";
import { CONTRACTS, contractByNumber } from "@/mocks/contracts";

export function generateStaticParams() {
  return CONTRACTS.map((contract) => ({ number: contract.number }));
}

export async function generateMetadata({
  params,
}: PageProps<"/contracts/[number]/document">): Promise<Metadata> {
  const { number } = await params;
  return { title: `Hợp đồng ${number}`, robots: { index: false } };
}

export default async function Page({
  params,
}: PageProps<"/contracts/[number]/document">) {
  const { number } = await params;
  const contract = contractByNumber(number);
  if (!contract) notFound();
  return <ContractDocument contract={contract} />;
}
