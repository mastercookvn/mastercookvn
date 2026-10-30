# Xác nhận, cọc và thanh toán

```mermaid
sequenceDiagram
    participant K as Khách
    participant TV as Tư vấn
    participant KT as Kế toán
    participant UI as Giao diện
    participant HD as Hợp đồng
    participant TT as Thanh toán
    participant DV as Dịch vụ thanh toán
    participant TR as Giữ tài nguyên

    UI->>HD: Đọc bản hợp đồng đã phát hành
    HD-->>UI: Trả hợp đồng, hạn cọc và trạng thái xác nhận

    alt Xác nhận online
        K->>UI: Xác nhận nội dung hợp đồng bằng tài khoản
        UI->>HD: Ghi xác nhận online
    else Xác nhận tại quầy
        TV->>UI: Ghi ký giấy và upload file
        UI->>HD: Lưu bản ký giấy
    end
    HD-->>UI: Xác nhận đã ký

    K->>UI: Chọn số tiền cọc (50%–100%)
    UI->>TT: Tạo yêu cầu thanh toán online
    activate TT
    TT->>TT: Sinh mã tham chiếu và phân bổ dự kiến theo bữa
    TT-->>UI: Trả thông tin yêu cầu thanh toán
    deactivate TT

    alt Thanh toán online qua dịch vụ
        K->>DV: Thực hiện thanh toán
        DV-->>TT: Báo kết quả giao dịch
        activate TT
        TT->>TT: Kiểm tra nguồn thông báo và mã giao dịch
        TT->>TT: Chỉ ghi thành công một lần (idempotent)
        deactivate TT
    else Tiền mặt hoặc chuyển khoản ngoài luồng
        KT->>UI: Ghi thực thu và phân bổ theo bữa
        UI->>TT: Lưu giao dịch thực thu
    end

    TT->>TT: Kiểm tra đủ xác nhận và cọc bắt buộc
    alt Đủ điều kiện
        TT->>HD: Chuyển hợp đồng có hiệu lực
        TT->>TR: Chuyển giữ tạm thành giữ chính thức
        TR-->>TT: Xác nhận giữ chính thức
        HD-->>UI: Hợp đồng có hiệu lực
    else Chưa đủ
        note over TT,HD: Chờ đủ điều kiện; hết hạn thì nhả chỗ
    end

    opt Thanh toán phần còn lại
        K->>UI: Thanh toán số dư còn lại
        UI->>TT: Xử lý thanh toán bổ sung
        TT->>TT: Phân bổ theo bữa và cập nhật số dư quyết toán
        TT-->>UI: Xác nhận thanh toán đủ
    end
```

## Phạm vi

UC liên quan: UC-HD-02, UC-HD-03, UC-HD-04. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Lưu ý và giới hạn

- Tách biệt việc ký hợp đồng và thu tiền; thứ tự có thể linh hoạt nhưng phải thỏa mãn cả hai điều kiện để hợp đồng có hiệu lực.
- Chống ghi nhận trùng lặp giao dịch (idempotency qua mã tham chiếu).
- Hết hạn giữ chỗ mà chưa đủ cọc sẽ tự động nhả tài nguyên; tiền nhận muộn được chuyển kế toán xử lý hoàn trả, không tự ý khôi phục chỗ.
