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

## Thành phần

Khách/Tư vấn/Kế toán → giao diện → hợp đồng → thanh toán → dịch vụ thanh toán → giữ tài nguyên.

## Nội dung cần thể hiện

1. Đọc bản hợp đồng đã phát hành, hạn cọc và trạng thái xác nhận.
2. Online: khách xác nhận nội dung bằng tài khoản; tại quầy: tư vấn ghi ký giấy và file.
3. Khách chọn tiền cọc trong 50%–100%; server tạo yêu cầu online với mã tham chiếu và phân bổ dự kiến theo bữa.
4. Dịch vụ thanh toán báo kết quả; server kiểm tra nguồn thông báo và mã giao dịch, chỉ ghi thành công một lần.
5. Nhánh tiền mặt/chuyển khoản ngoài luồng: kế toán ghi thực thu và phân bổ, không cần thông báo dịch vụ.
6. Tính đủ xác nhận và cọc bắt buộc; chỉ khi đủ mới chuyển hợp đồng có hiệu lực và giữ tạm thành chính thức.
7. Thanh toán phần còn lại dùng cùng giao dịch và phân bổ theo bữa, cập nhật số dư quyết toán.

## Nhánh và giới hạn

Tách ký khỏi thu tiền; thứ tự hai việc có thể đổi nhưng phải đủ cả hai. Nhận trùng không cộng lại. Hết hạn chưa đủ cọc nhả chỗ; tiền đã nhận chuyển kế toán xử lý, không tự khôi phục chỗ. Chưa chọn nhà cung cấp nên không mô tả API cụ thể.
