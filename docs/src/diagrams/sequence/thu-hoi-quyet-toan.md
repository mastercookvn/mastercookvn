# Thu hồi dụng cụ và quyết toán

```mermaid
sequenceDiagram
    participant TK as Thủ kho
    participant DC as Dụng cụ / Kiểm đếm
    participant QT as Quyết toán
    participant KT as Kế toán
    participant TT as Thanh toán
    participant HD as Hợp đồng

    note over TK,DC: Trước tiệc
    TK->>DC: Lập phiếu xuất từ nhu cầu bữa
    activate DC
    DC->>DC: Kiểm tra giữ và sẵn sàng thực tế
    DC->>DC: Ghi xuất một lần
    DC-->>TK: Xác nhận xuất dụng cụ
    deactivate DC

    note over TK,DC: Sau tiệc
    TK->>DC: Đọc lượng xuất và giá bồi thường đã chốt
    TK->>DC: Nhập thu hồi tốt, hư, mất và số khách chịu
    activate DC
    DC->>DC: Kiểm tra tổng cân bằng và giới hạn khách chịu
    DC->>DC: Tính đền bù
    DC-->>TK: Xác nhận kiểm đếm
    deactivate DC

    TK->>DC: Cập nhật trạng thái dụng cụ
    activate DC
    DC->>DC: Tốt vào sẵn sàng, hư vào không khả dụng, mất giảm sở hữu
    DC->>DC: Nhả giữ bữa (không cập nhật hai lần)
    DC-->>TK: Xác nhận cập nhật tồn kho
    deactivate DC

    TK->>QT: Lập quyết toán bữa
    activate QT
    QT->>QT: Tính từ giá hiện hành, đền bù và giao dịch phân bổ thành công
    QT-->>TK: Trả số dư quyết toán
    deactivate QT

    alt Số dư dương (còn thiếu)
        KT->>TT: Thu phần còn lại
        TT-->>QT: Cập nhật giao dịch thu
    else Số dư âm (cần hoàn)
        QT->>KT: Ghi nghĩa vụ hoàn
        KT->>KT: Xử lý hoàn tiền
    else Số dư bằng 0
        note over QT: Đủ điều kiện đóng bữa
    end

    QT->>HD: Đóng bữa đã quyết toán
    HD->>HD: Kiểm tra mọi bữa đã kết thúc/hủy và đủ tiền
    alt Tất cả bữa đã xử lý
        HD->>HD: Đóng hợp đồng
        HD-->>KT: Thông báo hợp đồng đóng
    else Còn bữa chưa xử lý
        note over HD: Hợp đồng chờ các bữa còn lại
    end
```

## Phạm vi

UC liên quan: UC-KHO-06, UC-KHO-07, UC-HD-08, UC-HD-03, UC-HD-04, UC-HD-07. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Lưu ý và giới hạn

- Bữa tiệc không sử dụng dụng cụ thì bỏ qua bước lập biên bản kiểm đếm.
- Không trừ nguyên liệu theo từng bữa tiệc (nguyên liệu tính theo kỳ kiểm kê tháng).
- Không hỗ trợ công nợ trả chậm; đóng hợp đồng chỉ khi mọi bữa đã kết thúc/hủy và số dư công nợ về 0.
