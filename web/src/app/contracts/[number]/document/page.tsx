import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ContractDocument } from "@/features/contracts/components/document/ContractDocument";
import { findContract } from "@/features/contracts/lib/contractRepository";

type Props = PageProps<"/contracts/[number]/document">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  return { title: `Hợp đồng ${number}`, robots: { index: false } };
}

async function Document({ params }: Pick<Props, "params">) {
  const { number } = await params;
  const contract = findContract(number);
  if (!contract) notFound();
  return <ContractDocument contract={contract} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={null}>
      <Document params={params} />
    </Suspense>
  );
}
