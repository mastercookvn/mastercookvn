# Điều chỉnh từng bữa

```mermaid
sequenceDiagram
    participant K as Khách
    participant TV as Tư vấn
    participant UI as Giao diện
    participant HD as Hợp đồng/Phụ lục
    participant TG as Tính giá
    participant TR as Kiểm tra tài nguyên
    participant TT as Thanh toán
    participant DB as Lưu trữ

    K->>UI: Chọn bữa cần điều chỉnh
    UI->>HD: Kiểm tra bữa thuộc hợp đồng và không có phụ lục đang chờ
    HD-->>UI: Xác nhận bữa hợp lệ

    alt Đổi món (còn ít nhất 5 ngày)
        TV->>UI: Thay thế món đã chọn (không tăng số món)
        UI->>TG: Tính chênh lệch giá món, giữ giá gốc
        TG-->>UI: Trả chênh lệch
    else Đổi bàn ăn (còn ít nhất 3 ngày)
        TV->>UI: Nhập số bàn mới (giảm không quá 15% so với ký ban đầu)
        UI->>TG: Tính chênh lệch giá bàn
        TG-->>UI: Trả chênh lệch
        opt Tăng số bàn
            UI->>TR: Kiểm tra tài nguyên cho số bàn tăng thêm
            TR-->>UI: Kết quả kiểm tra tài nguyên
        end
    end

    UI->>HD: Lập phụ lục với nội dung trước/sau
    activate HD
    HD->>HD: Xác định cọc bổ sung nếu tăng trên 3 bàn (50% phần tăng)
    HD-->>UI: Phụ lục đã lập
    deactivate HD

    alt Xác nhận online
        K->>UI: Xác nhận phụ lục qua tài khoản
        UI->>HD: Ghi xác nhận online
    else Ký giấy
        TV->>UI: Upload bản phụ lục ký giấy
        UI->>HD: Lưu bản ký giấy
    end

    opt Cần cọc bổ sung
        UI->>TT: Thu cọc bổ sung qua luồng thanh toán chung
        TT-->>UI: Xác nhận thu cọc
    end

    TT->>TT: Kiểm tra đủ điều kiện áp phụ lục
    alt Đủ điều kiện
        UI->>TR: Kiểm tra lại tài nguyên
        TR-->>UI: Tài nguyên xác nhận
        UI->>DB: Cập nhật bữa và giữ trong cùng một giao dịch
        DB-->>UI: Xác nhận cập nhật
        note over HD,DB: Giữ nguyên các bữa khác và bản hợp đồng gốc
    else Không đủ điều kiện
        UI-->>K: Thông báo không áp phụ lục
    end
```

## Phạm vi

UC liên quan: UC-HD-05, UC-HD-03, UC-HD-04. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Thành phần

Khách/Tư vấn → hợp đồng/phụ lục → tính giá → kiểm tra tài nguyên → thanh toán → lưu trữ.

## Nội dung cần thể hiện

1. Chọn đúng bữa thuộc hợp đồng; kiểm tra không có phụ lục đang chờ khác của bữa.
2. Đổi món: còn ít nhất 5 ngày, chỉ thay món đã chọn, không tăng số món. Đổi bàn ăn: còn ít nhất 3 ngày, giảm không quá 15% số ký ban đầu.
3. Tính chênh lệch, giữ giá món không đổi; khi tăng bàn kiểm tra tài nguyên.
4. Lập phụ lục có nội dung trước/sau; tăng trên 3 bàn thì xác định cọc bổ sung 50% phần tăng.
5. Khách xác nhận online hoặc tư vấn lưu bản phụ lục ký giấy.
6. Nếu cần, thu cọc bổ sung qua luồng thanh toán chung.
7. Khi đủ điều kiện, kiểm tra tài nguyên lại và cập nhật bữa/giữ trong cùng giao dịch; giữ nguyên các bữa khác và bản hợp đồng gốc.

## Nhánh và giới hạn

Không có nhánh dời ngày. Không đủ điều kiện thì không áp phụ lục. Giảm làm dư tiền lưu để đối trừ quyết toán; không hủy toàn hợp đồng.
