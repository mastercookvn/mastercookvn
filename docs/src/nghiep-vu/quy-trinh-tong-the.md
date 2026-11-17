---
order: 10
---

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
        T6["Xử lý yêu cầu sửa/hủy bữa"]
    end

    subgraph QuanLyNhanSu["Quản lý nhân sự"]
        NS1["Phân công nhân sự cho bữa"]
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
        NK4["Cuối tháng: tổng hợp phiếu nhập, kiểm kê thực tế"]
    end

    subgraph KeToan["Kế toán"]
        KT1["Thu cọc"]
        KT2["Xử lý tiền đã thu (nếu có)"]
        KT3["Thu/hoàn từng bữa & quyết toán"]
        KT4["Đối chiếu, chốt tồn và food cost tháng"]
    end

    subgraph Server["Server"]
        SV1["Đầu tháng: tạo đợt đề xuất giá độc lập với chốt kỳ"]
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

    H4 --> LoopBua["Lặp từng bữa chưa hủy"]
    LoopBua --> NS1
    NS1 --> NK1
    NK1 --> NK2
    NK2 --> NK3
    NK3 --> KT3
    KT3 --> H7
    KT3 --> DanhGiaDuoc{"Bữa đã phục vụ và HoanTat?"}
    DanhGiaDuoc -- "Có" --> K3

    K2 --> T6
    T6 --> H7

    H7 -- "Chưa" --> LoopBua
    H7 -- "Đủ" --> H8
    NK4 --> KT4
```

## Phạm vi

UC liên quan: UC-DT-02, UC-DT-03, UC-DT-04, UC-DT-05, UC-HD-01 đến UC-HD-08, UC-NS-02, UC-KHO-02 đến UC-KHO-04, UC-KHO-06, UC-KHO-07, UC-CS-01. Tra tại [danh mục chung](./danh-muc-use-case.md).

## Lưu ý và giới hạn

- Không vẽ các bước nghiệp vụ hiện trường (check-in, ký bàn giao giấy tờ, chụp ảnh hiện trạng hay thu hồi dụng cụ nhiều đợt).
- Các nhánh hủy tiệc hoặc điều chỉnh hợp đồng được chi tiết hóa tại các sơ đồ sequence riêng biệt tương ứng.
