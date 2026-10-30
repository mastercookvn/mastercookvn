# Đặt tiệc và đặt hộ

```mermaid
sequenceDiagram
    participant K as Khách
    participant TV as Tư vấn
    participant UI as Giao diện
    participant DH as Xử lý đơn
    participant HS as Hồ sơ khách
    participant TR as Kiểm tra tài nguyên
    participant HD as Hợp đồng
    participant DB as Lưu trữ

    alt Tự đặt
        K->>UI: Đăng nhập và mở form đặt tiệc
        UI->>HS: Lấy hồ sơ từ tài khoản
        HS-->>UI: Trả hồ sơ khách
    else Đặt hộ
        TV->>UI: Tìm hồ sơ bằng tên và SĐT
        UI->>HS: Tìm kiếm hồ sơ
        alt Tìm thấy
            HS-->>UI: Trả hồ sơ hiện có
        else Chưa có
            TV->>UI: Tạo hồ sơ mới (không tạo tài khoản)
            UI->>HS: Lưu hồ sơ mới
            HS-->>UI: Xác nhận hồ sơ tạo
        end
    end

    TV->>UI: Nhập khảo sát Q&A riêng từng bữa
    TV->>UI: Nhập khoảng cách và khung sử dụng tài nguyên

    K->>UI: Gửi danh sách bữa (thời gian, địa điểm, bàn ăn, bàn ghế, món, dịch vụ)
    UI->>DH: Tạo đơn đặt tiệc
    activate DH
    DH->>DH: Tính tiền toàn bộ bữa
    DH->>DB: Lưu đơn chờ xác nhận
    DB-->>DH: Xác nhận lưu
    deactivate DH

    TV->>UI: Xác nhận nhận đơn
    UI->>DH: Yêu cầu xác nhận và giữ tạm
    activate DH
    DH->>TR: Kiểm tra tất cả bữa và giữ hiệu lực bên ngoài
    activate TR
    TR->>TR: Tính nhu cầu nhân sự từ bàn bố trí
    deactivate TR
    alt Đủ tài nguyên và trong phạm vi 20km
        TR-->>DH: Tài nguyên hợp lệ
        DH->>HD: Phát hành hợp đồng chung
        activate HD
        HD->>HD: Chốt nội dung và hạn 24 giờ
        HD->>DB: Giữ tạm toàn bộ bữa trong một giao dịch
        DB-->>HD: Xác nhận giữ
        deactivate HD
        DH-->>UI: Hợp đồng đã phát hành
    else Thiếu tài nguyên hoặc ngoài 20km
        TR-->>DH: Trả lý do từ chối
        DH-->>UI: Thông báo lý do, không giữ một phần
    end
    deactivate DH

    alt Khách có tài khoản
        UI->>HS: Gửi hợp đồng chờ xác nhận vào hồ sơ
        HS-->>K: Nhận hợp đồng qua tài khoản
    else Khách không đăng ký
        note over K,TV: Khách ký giấy tại quầy
        TV->>UI: Upload bản ký giấy
        UI->>HD: Lưu bản ký
        HD-->>UI: Xác nhận lưu
    end
```

## Phạm vi

UC liên quan: UC-DT-01, UC-DT-02, UC-DT-03, UC-DT-04, UC-DT-05, UC-HD-01, UC-HD-02. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Lưu ý và giới hạn

- Hai nhánh tự đặt/đặt hộ hợp nhất trước khi lưu đơn; hai nhánh ký online/ký giấy hợp nhất tại ghi xác nhận.
- Thiếu tài nguyên hoặc ngoài 20 km trả lý do từ chối, không giữ một phần đơn.
- Giao tiếp qua điện thoại/Zalo được thực hiện thủ công ngoài hệ thống, không qua API tự động.
