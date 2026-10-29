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
    alt Đủ tài nguyên và trong phạm vi 20km
        TR-->>DH: Tài nguyên hợp lệ
        deactivate TR
        DH->>HD: Phát hành hợp đồng chung
        activate HD
        HD->>HD: Chốt nội dung và hạn 24 giờ
        HD->>DB: Giữ tạm toàn bộ bữa trong một giao dịch
        DB-->>HD: Xác nhận giữ
        deactivate HD
        DH-->>UI: Hợp đồng đã phát hành
    else Thiếu tài nguyên hoặc ngoài 20km
        TR-->>DH: Trả lý do từ chối
        deactivate TR
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

## Thành phần

Khách/Tư vấn → giao diện → xử lý đơn → hồ sơ khách → kiểm tra tài nguyên → hợp đồng → lưu trữ.

## Nội dung cần thể hiện

1. Khách tự đặt lấy hồ sơ từ tài khoản; tư vấn đặt hộ tìm/tạo hồ sơ bằng tên và SĐT, không tạo tài khoản hộ.
2. Gửi danh sách bữa với thời gian, địa điểm, bàn ăn, bàn ghế, món, dịch vụ; server tính tiền, lưu đơn chờ xác nhận.
3. Tư vấn ghi khảo sát Q&A riêng từng bữa, nhập khoảng cách và khung sử dụng tài nguyên.
4. Kiểm tra tất cả bữa trong đơn cùng các giữ còn hiệu lực bên ngoài; tính nhu cầu nhân sự từ bàn bố trí, không từ bàn ăn.
5. Tư vấn xác nhận nhận: trong một giao dịch kiểm tra lại và giữ tạm toàn bộ bữa, phát hành hợp đồng chung, chốt nội dung và hạn 24 giờ.
6. Khách có tài khoản nhận hợp đồng chờ xác nhận trong hồ sơ. Khách đăng ký sau bằng SĐT được liên kết hồ sơ đặt hộ.
7. Khách không đăng ký ký giấy tại quầy; tư vấn upload bản ký. Không thêm cấp quản lý duyệt.

## Nhánh và giới hạn

Hai nhánh tự đặt/đặt hộ hợp nhất trước khi lưu đơn; hai nhánh ký online/ký giấy hợp nhất tại ghi xác nhận. Thiếu tài nguyên hoặc ngoài 20 km trả lý do, không giữ một phần đơn. Không vẽ Zalo như API.
