# Thu hồi dụng cụ và quyết toán

```mermaid
sequenceDiagram
    participant TK as Thủ kho
    participant DC as Dụng cụ/Kiểm đếm
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
    DC->>DC: Tốt vào sẵn sàng; hư vào không khả dụng; mất giảm sở hữu
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

## Thành phần

Thủ kho → dụng cụ/kiểm đếm → quyết toán → Kế toán → thanh toán → hợp đồng.

## Nội dung cần thể hiện

1. Trước tiệc: lập phiếu xuất từ nhu cầu bữa; kiểm tra giữ và sẵn sàng thực tế; ghi xuất một lần.
2. Sau tiệc: đọc lượng xuất và giá bồi thường đã chốt; nhập thu hồi tốt, hư, mất và số khách chịu.
3. Kiểm tra tổng cân bằng và giới hạn khách chịu; tính đền bù, xác nhận kiểm đếm.
4. Cập nhật tốt vào sẵn sàng, hư vào không khả dụng, mất giảm sở hữu; nhả giữ bữa, không cập nhật hai lần.
5. Lập quyết toán bữa từ giá hiện hành, đền bù và các giao dịch phân bổ thành công.
6. Số dư dương: thu phần còn lại; âm: ghi hoàn; bằng 0: đủ điều kiện đóng bữa.
7. Kiểm tra mọi bữa trong hợp đồng đã kết thúc/hủy và đủ tiền, rồi đóng hợp đồng.

## Nhánh và giới hạn

Không dụng cụ thì bỏ kiểm đếm. Không trừ nguyên liệu sau tiệc. Không công nợ trả chậm, lương, phát sinh món/bàn ăn/dịch vụ trong tiệc.
