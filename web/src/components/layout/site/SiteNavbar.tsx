import Link from "next/link";
import { Suspense } from "react";

import { Logo } from "@/components/brand/Logo";
import { ROUTES } from "@/constants/routes";

import { SignInLink } from "./SignInLink";
import { SiteAccountLink } from "./SiteAccountLink";
import { SiteNavLinks } from "./SiteNavLinks";

export function SiteNavbar() {
  return (
    <header className="nav">
      <nav className="nav-inner" aria-label="Điều hướng chính">
        <Link href={ROUTES.home} className="no-underline">
          <Logo size={36} />
        </Link>
        <SiteNavLinks />
        <div className="l-row flex-nowrap gap-2">
          <Suspense fallback={<SignInLink />}>
            <SiteAccountLink />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
