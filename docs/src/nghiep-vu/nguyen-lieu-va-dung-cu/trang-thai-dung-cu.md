---
order: 30
---

# Trạng thái giữ, xuất và thu hồi dụng cụ

```mermaid
stateDiagram-v2
    [*] --> Tam : Nhận đơn, đủ tài nguyên
    Tam --> ChinhThuc : Hợp đồng hiệu lực
    Tam --> DaNha : Hết hạn hoặc hủy
    ChinhThuc --> DaNha : Hủy chưa xuất hoặc thu hồi và hết khung vệ sinh TS19
    DaNha --> [*]

    note right of Tam
        Ghi khung giờ, lượng và hạn 24 giờ
        Không trừ kho vật lý
    end note
    note right of ChinhThuc
        Giữ chính thức năng lực
        Phụ lục thay lượng/khung trong giao dịch áp dụng
        Sau kiểm đếm vẫn bảo đảm khung vệ sinh TS19
    end note
    note right of DaNha
        Giải phóng năng lực
    end note
```

```mermaid
stateDiagram-v2
    [*] --> Nhap : Tạo phiếu xuất
    Nhap --> DaXuat : Đủ sẵn sàng, không chiếm giữ bữa khác
    Nhap --> DaHuy : Hủy trước khi xuất
    DaXuat --> DaKiemDem : Tốt + hư + mất = xuất, xác nhận biên bản
    DaKiemDem --> [*]
    DaHuy --> [*]

    note right of DaXuat
        Sẵn sàng giảm, đang sử dụng tăng
    end note
    note right of DaKiemDem
        Tốt → sẵn sàng
        Hư → lượng hư
        Mất → giảm sở hữu
    end note
    note left of Nhap
        Bất biến: sở hữu = sẵn sàng + đang sử dụng + hư
    end note
```

## Phạm vi

UC-DT-04, UC-DT-05, UC-HD-05, UC-HD-06, UC-KHO-05 đến UC-KHO-08. Theo [BR07, BR13](../../specification.md) và [mô hình lớp](../../mo-hinh/mo-hinh-lop-class.md).

## Lưu ý và bất biến kho dụng cụ

- **Bất biến số lượng**: $\text{Sở hữu} = \text{Sẵn sàng} + \text{Đang sử dụng} + \text{Hư}$.
- **Chuyển dịch trạng thái dụng cụ**:
  - Mua mới: Tăng sẵn sàng và tăng sở hữu.
  - Xuất kho: Sẵn sàng $\rightarrow$ Đang sử dụng (chỉ xuất một lần cho toàn bữa).
  - Thu hồi tốt: Đang sử dụng $\rightarrow$ Sẵn sàng.
  - Thu hồi hư hỏng: Đang sử dụng $\rightarrow$ Hư (tạm không khả dụng).
  - Thu hồi mất mát: Giảm đang sử dụng và giảm sở hữu.
  - Phục hồi hư: Hư $\rightarrow$ Sẵn sàng.
  - Loại bỏ hư: Giảm hư và giảm sở hữu.
- **Giữ và Xuất**: Giữ tạm/chính thức và xuất kho là hai khái niệm độc lập; giữ đã xuất kho không bị trừ hai lần vào năng lực khả dụng. Khung giữ gồm thời gian vệ sinh TS19; kiểm đếm xong chưa hết khung thì vẫn giữ cho đến hết khung. Nếu hủy sau khi đã xuất, vẫn phải thu hồi/kiểm đếm và bảo đảm vệ sinh trước lượt dùng tiếp theo; bữa vẫn DaHuy.
