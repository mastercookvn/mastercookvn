import { SiteFooter } from "@/components/layout/site/SiteFooter";
import { SiteNavbar } from "@/components/layout/site/SiteNavbar";
import { ToastProvider } from "@/components/ui/Toast";

export default function StorefrontLayout({ children }: LayoutProps<"/">) {
  return (
    <div data-surface="site">
      <ToastProvider>
        <SiteNavbar />
        <main>{children}</main>
        <SiteFooter />
      </ToastProvider>
    </div>
  );
}
