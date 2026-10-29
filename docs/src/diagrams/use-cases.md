# Mô tả sơ đồ use case tổng quát

## Mục đích

Thể hiện ranh giới MasterCookVN, tác nhân và quan hệ giữa UC. Mã/tên/tác nhân làm gốc tại [chỉ mục](./index.md). Vẽ một sơ đồ tổng quát theo gói, cộng một sơ đồ con cho mỗi gói.

## Tác nhân

| Tác nhân | Loại | Ghi chú |
| --- | --- | --- |
| Khách hàng | Người | Không đăng nhập vẫn xem/tạm tính được (UC-DT-01). |
| Nhân viên nội bộ | Trừu tượng | Cha của các vai trò nội bộ; dùng cho UC-TK-02, UC-BC-01. |
| Nhân viên tư vấn | Người, kế thừa Nhân viên nội bộ | |
| Kế toán | Người, kế thừa Nhân viên nội bộ | |
| Thủ kho | Người, kế thừa Nhân viên nội bộ | |
| Quản lý nhân sự | Người, kế thừa Nhân viên nội bộ | |
| Quản lý cơ sở | Người, kế thừa Tư vấn, Kế toán, Thủ kho, Quản lý nhân sự | Dùng được mọi UC nội bộ; chỉ nối trực tiếp UC riêng của quản lý. |
| Dịch vụ thanh toán | Hệ thống ngoài | Chỉ tham gia UC-HD-03; chưa chốt nhà cung cấp. |

Không vẽ nhà cung cấp, nhân viên không tài khoản, Zalo, bản đồ, thời tiết, lịch chạy tự động thành tác nhân.

## Gói và UC

| Gói | UC |
| --- | --- |
| Tài khoản | UC-TK-01 → UC-TK-03 |
| Danh mục | UC-DM-01 → UC-DM-07 |
| Đặt tiệc | UC-DT-01 → UC-DT-06 |
| Hợp đồng và thanh toán | UC-HD-01 → UC-HD-08 |
| Nhân sự và vận hành | UC-NS-01, UC-NS-02, UC-VH-01 |
| Nguyên liệu và dụng cụ | UC-KHO-01 → UC-KHO-08 |
| Đánh giá và báo cáo | UC-CS-01, UC-BC-01 → UC-BC-03 |

## Sơ đồ tổng quát

```mermaid
flowchart LR
    KH["👤 Khách hàng"]
    NVNb["👤 Nhân viên nội bộ\n(trừu tượng)"]
    NVTV["👤 Nhân viên tư vấn"]
    KeToan["👤 Kế toán"]
    ThuKho["👤 Thủ kho"]
    QLNS["👤 Quản lý nhân sự"]
    QLCS["👤 Quản lý cơ sở"]
    DVTT["⚙️ Dịch vụ thanh toán"]

    NVTV -->|kế thừa| NVNb
    KeToan -->|kế thừa| NVNb
    ThuKho -->|kế thừa| NVNb
    QLNS -->|kế thừa| NVNb
    QLCS -->|kế thừa| NVTV
    QLCS -->|kế thừa| KeToan
    QLCS -->|kế thừa| ThuKho
    QLCS -->|kế thừa| QLNS

    subgraph TK["📦 Gói Tài khoản"]
        TK01(["UC-TK-01: Đăng ký tài khoản khách"])
        TK02(["UC-TK-02: Đăng nhập, đăng xuất, đổi mật khẩu"])
        TK03(["UC-TK-03: Quản lý tài khoản nội bộ & phân quyền"])
    end

    subgraph DM["📦 Gói Danh mục"]
        DM01(["UC-DM-01: Quản lý loại món & món ăn"])
        DM02(["UC-DM-02: Quản lý set thực đơn"])
        DM03(["UC-DM-03: Quản lý nguyên liệu & định lượng món"])
        DM04(["UC-DM-04: Quản lý dịch vụ"])
        DM05(["UC-DM-05: Quản lý danh mục dụng cụ"])
        DM06(["UC-DM-06: Quản lý loại tiệc"])
        DM07(["UC-DM-07: Quản lý tham số nghiệp vụ"])
    end

    subgraph DT["📦 Gói Đặt tiệc"]
        DT01(["UC-DT-01: Xem danh mục & tạm tính"])
        DT02(["UC-DT-02: Tạo đơn đặt tiệc"])
        DT03(["UC-DT-03: Khảo sát địa điểm"])
        DT04(["UC-DT-04: Kiểm tra khả năng phục vụ"])
        DT05(["UC-DT-05: Xác nhận nhận hoặc từ chối đơn"])
        DT06(["UC-DT-06: Tra cứu đơn, hợp đồng & lịch sử thanh toán"])
    end

    subgraph HD["📦 Gói Hợp đồng và thanh toán"]
        HD01(["UC-HD-01: Lập & phát hành hợp đồng"])
        HD02(["UC-HD-02: Xác nhận hợp đồng"])
        HD03(["UC-HD-03: Thanh toán online"])
        HD04(["UC-HD-04: Ghi nhận thanh toán thủ công"])
        HD05(["UC-HD-05: Điều chỉnh bữa bằng phụ lục"])
        HD06(["UC-HD-06: Hủy bữa hoặc hợp đồng"])
        HD07(["UC-HD-07: Ghi nhận hoàn tiền"])
        HD08(["UC-HD-08: Quyết toán bữa & hoàn tất hợp đồng"])
    end

    subgraph NS["📦 Gói Nhân sự và vận hành"]
        NS01(["UC-NS-01: Quản lý hồ sơ nhân sự"])
        NS02(["UC-NS-02: Phân công nhân sự theo bữa"])
        VH01(["UC-VH-01: Cập nhật tiến độ bữa"])
    end

    subgraph KHO["📦 Gói Nguyên liệu và dụng cụ"]
        KHO01(["UC-KHO-01: Ghi nhận nhập nguyên liệu"])
        KHO02(["UC-KHO-02: Kiểm kê nguyên liệu cuối tháng"])
        KHO03(["UC-KHO-03: Chốt kỳ & tính food cost tháng"])
        KHO04(["UC-KHO-04: Xử lý đề xuất giá nguyên liệu tháng"])
        KHO05(["UC-KHO-05: Nhập mua dụng cụ"])
        KHO06(["UC-KHO-06: Xuất dụng cụ cho bữa"])
        KHO07(["UC-KHO-07: Thu hồi, kiểm đếm & bồi thường"])
        KHO08(["UC-KHO-08: Phục hồi hoặc loại bỏ dụng cụ hư"])
    end

    subgraph BC["📦 Gói Đánh giá và báo cáo"]
        CS01(["UC-CS-01: Ghi nhận đánh giá sau bữa"])
        BC01(["UC-BC-01: Xem dashboard & cảnh báo"])
        BC02(["UC-BC-02: Xem báo cáo doanh thu & food cost"])
        BC03(["UC-BC-03: Xem báo cáo dụng cụ"])
    end

    %% Tác nhân kết nối Use Cases
    KH --- TK01
    KH --- TK02
    KH --- DT01
    KH --- DT02
    KH --- DT06
    KH --- HD02
    KH --- HD03
    KH --- HD05
    KH --- HD06
    KH --- CS01

    NVNb --- TK02
    NVNb --- BC01

    NVTV --- DT02
    NVTV --- DT03
    NVTV --- DT04
    NVTV --- DT05
    NVTV --- DT06
    NVTV --- HD01
    NVTV --- HD02
    NVTV --- HD05
    NVTV --- HD06
    NVTV --- VH01
    NVTV --- CS01

    KeToan --- DT06
    KeToan --- HD04
    KeToan --- HD07
    KeToan --- HD08
    KeToan --- KHO03
    KeToan --- BC02

    ThuKho --- DM05
    ThuKho --- VH01
    ThuKho --- KHO01
    ThuKho --- KHO02
    ThuKho --- KHO05
    ThuKho --- KHO06
    ThuKho --- KHO07
    ThuKho --- KHO08
    ThuKho --- BC03

    QLNS --- NS01
    QLNS --- NS02

    QLCS --- TK03
    QLCS --- DM01
    QLCS --- DM02
    QLCS --- DM03
    QLCS --- DM04
    QLCS --- DM05
    QLCS --- DM06
    QLCS --- DM07
    QLCS --- KHO04
    QLCS --- BC02
    QLCS --- BC03

    DVTT --- HD03

    %% Quan hệ include và extend
    DT05 -.->|&laquo;include&raquo;| DT04
    HD05 -.->|&laquo;include&raquo;| DT04
    HD04 -.->|&laquo;extend&raquo;| HD03
    HD07 -.->|&laquo;extend&raquo;| HD06
    HD07 -.->|&laquo;extend&raquo;| HD08
```

## Quan hệ include/extend

| Quan hệ | Từ | Đến | Ghi chú |
| --- | --- | --- | --- |
| include | UC-DT-05 Xác nhận nhận đơn | UC-DT-04 Kiểm tra khả năng phục vụ | Luôn kiểm tra trước khi giữ |
| include | UC-HD-05 Điều chỉnh bằng phụ lục | UC-DT-04 Kiểm tra khả năng phục vụ | Khi tăng bàn |
| extend | Đặt hộ | UC-DT-02 Tạo đơn | Điểm mở rộng: tư vấn tạo đơn cho khách |
| extend | UC-HD-04 Thanh toán thủ công | UC-HD-03 Thanh toán online | Thay thế khi trả tiền mặt/chuyển khoản trực tiếp; có thể vẽ là UC song song nếu GV không chấp nhận extend |
| extend | UC-HD-07 Ghi nhận hoàn tiền | UC-HD-06 Hủy | Chỉ khi có khoản phải hoàn |
| extend | UC-HD-07 Ghi nhận hoàn tiền | UC-HD-08 Quyết toán | Khi số dư âm |

Kiểm tra hết hạn giữ chỗ, tính tiền, tạo đợt đề xuất giá là xử lý bên trong UC, không vẽ hệ thống làm actor của chính nó.
