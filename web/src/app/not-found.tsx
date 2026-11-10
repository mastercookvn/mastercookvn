import Link from "next/link";

import { SearchIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="page min-h-screen justify-center">
      <div className="card empty-state">
        <SearchIcon size={44} />
        <h1 className="h2-section">Không tìm thấy trang</h1>
        <p className="text-soft">
          Trang bạn tìm không tồn tại hoặc đã được chuyển đi.
        </p>
        <Link href="/" className="btn btn-primary">
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
