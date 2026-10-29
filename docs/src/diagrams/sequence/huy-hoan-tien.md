# Hủy và hoàn theo từng bữa

```mermaid
sequenceDiagram
    participant K as Khách
    participant TV as Tư vấn
    participant UI as Giao diện
    participant XH as Xử lý hủy
    participant HD as Hợp đồng
    participant PT as Phân bổ thanh toán
    participant GD as Giữ/Phân công
    participant KT as Kế toán

    K->>UI: Chọn hủy một số hoặc tất cả bữa chưa thực hiện
    UI->>XH: Gửi yêu cầu hủy và ghi thời điểm yêu cầu
    activate XH

    loop Từng bữa cần hủy
        XH->>PT: Lấy căn cứ hoàn cọc (BR08), tiền trả trước vượt, khoảng giờ còn lại
        PT-->>XH: Trả dữ liệu phân bổ bữa
        XH->>XH: Tính hoàn bậc thang (BR10)
        note over XH: ">=30 ngày: 100%\n>=15 và <30 ngày: 50%\n<15 ngày: 0%"
        XH->>XH: Cộng tiền trả trước vượt được hoàn
    end

    XH->>XH: Tổng hợp kết quả toàn yêu cầu
    XH-->>UI: Trả kết quả tính toán hoàn tiền
    deactivate XH

    alt Khách xác nhận
        K->>UI: Xác nhận hủy
    else Tư vấn xác nhận
        TV->>UI: Xác nhận hủy hộ
    end

    UI->>HD: Lưu kết quả hủy và tạo nghĩa vụ hoàn
    UI->>GD: Nhả tài nguyên và hủy phân công đúng bữa
    GD-->>UI: Xác nhận nhả tài nguyên
    note over HD: Các bữa khác và quyết toán bữa đã thực hiện không đổi

    KT->>KT: Trả tiền hoàn ngoài hệ thống
    KT->>UI: Ghi giao dịch hoàn cùng phân bổ và bằng chứng
    UI->>PT: Cập nhật giao dịch hoàn
    PT->>PT: Tính lại số dư bữa hủy

    alt Không còn thu/hoàn
        PT->>HD: Hoàn tất bữa hủy
        HD->>HD: Kiểm tra tất cả bữa đã xử lý
        alt Tất cả bữa đã xử lý
            HD->>HD: Đóng hợp đồng
        else Còn bữa chưa xử lý
            note over HD: Hợp đồng chưa đóng
        end
    else Còn nghĩa vụ thu/hoàn
        note over PT: Chờ xử lý xong
    end
```

## Phạm vi

UC liên quan: UC-HD-06, UC-HD-07. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Thành phần

Khách/Tư vấn → xử lý hủy → hợp đồng → phân bổ thanh toán → giữ/phân công → Kế toán.

## Nội dung cần thể hiện

1. Nhận lựa chọn hủy một số bữa hoặc tất cả bữa chưa thực hiện; ghi thời điểm yêu cầu.
2. Từng bữa lấy căn cứ hoàn cọc theo BR08, tiền trả trước vượt và khoảng giờ còn lại.
3. Tính hoàn bậc thang theo BR10, cộng tiền vượt được hoàn đủ; tổng hợp kết quả cả yêu cầu.
4. Khách hoặc tư vấn xác nhận; lưu kết quả hủy, nhả tài nguyên và hủy phân công đúng bữa, tạo nghĩa vụ hoàn.
5. Các bữa khác và quyết toán bữa đã thực hiện không đổi.
6. Kế toán trả tiền ngoài hệ thống; ghi giao dịch hoàn cùng phân bổ và bằng chứng.
7. Tính lại số dư, hoàn tất bữa hủy khi không còn thu/hoàn; hợp đồng đóng chỉ khi tất cả bữa đã xử lý.

## Nhánh và giới hạn

Bậc hoàn: >=30 ngày 100%; >=15 và <30 ngày 50%; <15 ngày 0%. Chưa cọc hủy miễn phí. Không có mặt là ghi nhận riêng, không đồng nghĩa khách hủy giữa lúc phục vụ. Không phê duyệt hoàn nhiều cấp.
