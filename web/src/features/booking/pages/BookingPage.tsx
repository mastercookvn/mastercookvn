import { Reveal } from "@/components/motion/Reveal";
import { getSession } from "@/lib/auth";

import { BookingFlow } from "../components/flow/BookingFlow";

export async function BookingPage() {
  const session = await getSession();

  return (
    <div className="page">
      <Reveal as="h1" variant="up" immediate className="h1-page">
        Tính giá và đặt tiệc
      </Reveal>
      <BookingFlow signedIn={session?.kind === "customer"} />
    </div>
  );
}
