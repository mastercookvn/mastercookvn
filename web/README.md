# MasterCook VN

Website tiệc nấu sẵn, giao và phục vụ tận nơi, dựng theo Prototype 5.11. Backend chưa có API nên dữ liệu chỉ lưu tạm trong trình duyệt.

## Bắt đầu

Đây là package `@mastercookvn/web` trong pnpm workspace của repo. Node.js và pnpm do `mise` quản lý (xem `mise.toml` ở root).

```bash
mise install
pnpm install                      # chạy ở root repo
cp web/.env.example web/.env.local
pnpm --filter @mastercookvn/web dev
```

Mở <http://localhost:3000>.

## Tài khoản phát triển

Chưa có dữ liệu mẫu: danh mục, đơn, hợp đồng, nhân sự, kho đều bắt đầu trống. Dữ liệu nhập trên giao diện được giữ trong `localStorage` của trình duyệt (`src/lib/demoStore.ts`) cho đến khi có API; nút "Xóa dữ liệu cục bộ" ở sidebar xóa toàn bộ.

Vào `/login`, bấm "Vào trang quản lý" để đăng nhập tài khoản quản trị phát triển (đủ mọi vai trò), hoặc nhập số `0900000000` với mật khẩu bất kỳ. Số khác đăng nhập thành khách. Tắt tài khoản này bằng `NEXT_PUBLIC_SHOW_SAMPLE_ACCOUNTS=false`.

## Lệnh

Chạy trong thư mục `web/` (hoặc thêm `--filter @mastercookvn/web` khi chạy ở root):

| Lệnh             | Tác dụng                    |
| ---------------- | --------------------------- |
| `pnpm dev`       | Chạy môi trường phát triển  |
| `pnpm build`     | Build production            |
| `pnpm start`     | Chạy bản đã build           |
| `pnpm typecheck` | Kiểm tra kiểu               |
| `pnpm test`      | Chạy test ở chế độ theo dõi |

Lint, format và test toàn repo chạy ở root: `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`.

## Công nghệ

Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript, Tailwind CSS 4, Base UI, Zod, Vitest với Testing Library.

## Cấu trúc

Code chia theo chức năng, không chia theo vai trò. Quyền xem nằm ở `constants/permissions.ts`.

```text
src/
  app/                     Chỉ khai báo route, mỗi page gọi một page của feature
    (storefront)/          Route dùng khung có thanh điều hướng ngang
    admin/                 Route dùng khung có sidebar, URL /admin/...
  features/<chức năng>/
    pages/                 Ghép các khối của một màn
    components/<nhóm>/     Các khối theo chức năng nhỏ, mỗi component một file
    lib/                   Logic riêng của chức năng
    <chức năng>.css        CSS riêng của chức năng
  components/
    ui/                    Thành phần dùng chung: Button, DataTable, Tabs, Dialog...
    layout/site/           Khung thanh ngang
    layout/workspace/      Khung sidebar
    icons/                 44 icon tự vẽ, mỗi icon một file
    brand/                 Logo, LogoMark
    motion/                Reveal, MaskImage, ScrollParallax...
  constants/               Trạng thái, vai trò, quyền, route, nhãn, tham số
  hooks/                   Hook dùng chung
  models/                  Kiểu dữ liệu nghiệp vụ và hàm tính thuần
  lib/                     session, auth, format, pricing, env, demoStore
  proxy.ts                 Chuyển hướng theo phiên đăng nhập
```

Các chức năng: `home`, `menu`, `services`, `booking`, `auth`, `account`, `contracts`, `orders`, `dashboard`, `meals`, `staff`, `ingredients`, `equipment`, `catalog`, `reports`, `settings`.

### Quy ước

- Component dùng ở một chức năng đặt trong feature đó. Dùng từ hai chức năng trở lên thì chuyển lên `components/ui`.
- Mỗi tab là một component `*Panel` hoặc một bảng, biểu mẫu riêng, chọn theo `?tab=`.
- Tên file, component, biến bằng tiếng Anh. Chữ hiển thị bằng tiếng Việt.
- Ghi chú bằng tiếng Anh, một dòng, chỉ viết khi cần giải thích lý do hoặc tham chiếu đặc tả.

## Ảnh

Ảnh không commit vào git. Bản ghi (món, nguyên liệu, dịch vụ) chỉ lưu key của object trên bucket, ví dụ `imageKey: "dishes/goi.jpg"`, không lưu URL (`src/lib/media.ts`).

- `/api/media/<key>` trả về redirect tới URL ký sẵn (presigned) của S3, hết hạn sau 15 phút. Cấu hình bucket và token qua các biến `MEDIA_S3_*` trong `.env.example`.
- Chưa cấu hình S3 thì route trả về bản local ở `public/images/<key>` (đã nằm trong `.gitignore`), dùng khi phát triển.
- Ảnh tải lên ở trang quản lý tạm giữ trong trình duyệt theo key, cho tới khi có API upload.

## Tài liệu

- [Quy tắc thiết kế](docs/DESIGN_GUIDELINES.md): đọc trước khi làm giao diện.
- [Triển khai](docs/DEPLOYMENT.md): Vercel, Docker, CI.
