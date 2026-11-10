# Triển khai

Có hai cách, đều đã được cấu hình sẵn. Nếu chưa có yêu cầu riêng về hạ tầng, nên dùng Vercel vì đơn giản nhất.

## Biến môi trường

| Biến                   | Bắt buộc           | Ý nghĩa                                     |
| ---------------------- | ------------------ | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Khi lên production | URL công khai, dùng cho metadata và sitemap |
| `NEXT_PUBLIC_API_URL`  | Không              | URL của backend                             |

Các biến `NEXT_PUBLIC_*` được gắn vào bundle lúc build. Khi đổi giá trị, cần build lại.

## Cách 1: Vercel

1. Đẩy code lên GitHub.
2. Tại [vercel.com/new](https://vercel.com/new), import repo, đặt Root Directory là `web`. Vercel tự nhận Next.js và đọc `vercel.json` (region Singapore `sin1`, gần Việt Nam nhất).
3. Thêm `NEXT_PUBLIC_SITE_URL` trong Project Settings → Environment Variables.

Sau đó, mỗi lần push lên `main` sẽ deploy production, còn mỗi pull request có một bản preview.

## Cách 2: Docker (VPS hoặc cloud bất kỳ)

Image dùng `web.Dockerfile` ở root repo, copy bản build standalone nên cần build trước:

```bash
BUILD_STANDALONE=true NEXT_PUBLIC_SITE_URL=https://ten-mien.vn pnpm --filter @mastercookvn/web build
docker build -f web.Dockerfile -t mastercookvn-web .
docker run -p 3000:3000 mastercookvn-web
curl http://localhost:3000/api/health   # {"status":"ok"}
```

Trên production nên đặt reverse proxy (Nginx, Caddy) phía trước để xử lý HTTPS. `next.config.ts` đã bật HSTS, nên chỉ chạy site qua HTTPS.

### Phát hành image qua GHCR

Chạy thủ công workflow `Web` (`.github/workflows/web.yaml`) với tuỳ chọn `release` để đẩy image lên `ghcr.io/<owner>/<repo>/web`.

## CI

`.github/workflows/web.yaml` chạy kiểm tra format, lint, typecheck, test, build và build Docker cho mỗi pull request và mỗi lần push lên `main` có thay đổi trong `web/`.
