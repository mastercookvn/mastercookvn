# Quy trình tổng thể

```mermaid
flowchart TD
    subgraph Khach["Khách"]
        K1["Tạo đơn (1+ bữa)"]
        K2["Yêu cầu sửa/hủy bữa"]
        K3["Đánh giá (tùy chọn)"]
        K4["Ký online"]
    end

    subgraph TuVan["Tư vấn"]
        T1["Đặt hộ khách / hỗ trợ tạo đơn"]
        T2["Khảo sát Q&A, nhập khoảng cách & khung tài nguyên"]
        T3{"Nhận hoặc từ chối đơn?"}
        T4["Ký giấy & xác nhận"]
        T5["Phân công nhân sự/kho cho bữa"]
        T6["Xử lý yêu cầu sửa/hủy bữa"]
    end

    subgraph HeTong["Hệ thống"]
        H1["Lưu đơn & các bữa"]
        H2["Phát hành hợp đồng chung, giữ tạm 24 giờ"]
        H3{"Đủ ký + cọc?"}
        H4["Hợp đồng có hiệu lực"]
        H5{"Hết hạn 24 giờ?"}
        H6["Kết thúc giữ chỗ, nhả tài nguyên"]
        H7{"Tất cả bữa xong & số dư = 0?"}
        H8["Hoàn tất hợp đồng"]
    end

    subgraph NhanSuKho["Nhân sự/Kho"]
        NK1["Chuẩn bị & xuất dụng cụ"]
        NK2["Phục vụ tiệc"]
        NK3["Kiểm đếm dụng cụ thu hồi"]
        NK4["Cuối tháng: tổng hợp phiếu nhập, kiểm kê thực tế, chốt tồn/food cost"]
    end

    subgraph KeToan["Kế toán"]
        KT1["Thu cọc"]
        KT2["Xử lý tiền đã thu (nếu có)"]
        KT3["Thu/hoàn từng bữa & quyết toán"]
        KT4["Đầu tháng: tạo đề xuất giá nguyên liệu"]
    end

    K1 --> H1
    T1 --> H1
    H1 --> T2
    T2 --> T3
    T3 -- "Từ chối" --> BiTuChoi(["Đơn bị từ chối"])
    T3 -- "Nhận" --> H2
    H2 --> K4
    H2 --> T4
    H2 --> KT1
    K4 --> H3
    T4 --> H3
    KT1 --> H3
    H3 -- "Chưa đủ" --> H5
    H5 -- "Hết hạn" --> H6
    H6 --> KT2
    H6 --> HetHan(["Giữ chỗ kết thúc"])
    H3 -- "Đủ ký + cọc" --> H4

    H4 --> LoopBua["Lặp từng bữa"]
    LoopBua --> T5
    T5 --> NK1
    NK1 --> NK2
    NK2 --> NK3
    NK3 --> KT3
    KT3 --> H7

    K2 --> T6
    T6 --> LoopBua

    H7 -- "Chưa" --> LoopBua
    H7 -- "Đủ" --> H8
    H8 --> K3

    NK4 --> KT4
```

## Phạm vi

UC liên quan: UC-DT-02, UC-DT-03, UC-DT-04, UC-DT-05, UC-HD-01, UC-HD-02, UC-HD-03, UC-HD-04, UC-NS-02, UC-KHO-06, UC-KHO-07, UC-HD-08. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Thành phần

Các lane: Khách — Tư vấn — Hệ thống — Nhân sự/Kho — Kế toán.

## Nội dung cần thể hiện

1. Tạo đơn một hoặc nhiều bữa, khách tự đặt hoặc tư vấn đặt hộ.
2. Khảo sát Q&A, nhập khoảng cách và khung tài nguyên; nhận hoặc từ chối đơn.
3. Phát hành hợp đồng chung, giữ tạm 24 giờ; hai nhánh ký online/ký giấy và thu cọc hội tụ tại điều kiện đủ ký+cọc.
4. Hết hạn chưa đủ: kết thúc giữ chỗ, nhả tài nguyên, kế toán xử lý tiền đã thu nếu có. Đủ: có hiệu lực.
5. Lặp theo từng bữa: phân công, chuẩn bị và xuất dụng cụ, phục vụ, kiểm đếm, thu/hoàn và hoàn tất.
6. Có yêu cầu sửa/hủy trước tiệc thì xử lý đúng bữa theo quy tắc, không dừng các bữa còn lại.
7. Tất cả bữa xử lý xong và số dư hợp đồng 0 thì hoàn tất. Đánh giá tùy chọn theo bữa.
8. Luồng cuối tháng độc lập: tổng hợp phiếu nhập, kiểm kê thực tế, chốt tồn/food cost. Đầu tháng tạo đề xuất giá.

## Nhánh và giới hạn

Không vẽ các bước tại hiện trường như check-in, ký bàn giao, chụp ảnh hay thu hồi một phần. Hủy/sửa tham chiếu sequence riêng, không mở rộng mọi nhánh tại đây.
