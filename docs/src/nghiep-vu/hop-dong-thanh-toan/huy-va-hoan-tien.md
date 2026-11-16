---
order: 40
---

# Hủy và hoàn theo từng Meal

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

UC liên quan: UC-HD-06, UC-HD-07. Tra tại [danh mục chung](../danh-muc-use-case.md).

## Lưu ý và giới hạn

- Mức Refund đối với Deposit căn cứ số ngày còn lại đến tiệc: $\ge 30$ ngày hoàn 100%; từ $15$ đến dưới $30$ ngày hoàn 50%; dưới $15$ ngày hoàn 0%. Phần tiền trả trước vượt Deposit được hoàn đủ 100%.
- Hủy trước khi Deposit không phát sinh chi phí.
- Customer không có mặt tại tiệc là trường hợp ghi nhận riêng, không tính là Customer chủ động yêu cầu hủy.
- Quy trình Refund do Accountant chi trả và ghi nhận trực tiếp, không qua phê duyệt nhiều cấp phức tạp.
