# Kiểm kê, food cost và đề xuất giá tháng

```mermaid
flowchart TD
    subgraph ThuKho["Thủ kho"]
        TK1["Cuối tháng: lấy tồn đầu & nhập trong tháng"]
        TK2["Kiểm kê lượng cuối thực tế"]
    end

    subgraph KeToan["Kế toán"]
        KT1["Tính giá tồn bình quân tháng\nTiêu thụ = giá trị đầu + nhập − cuối"]
        KT2["Đối chiếu & chốt số liệu"]
        KT3["Lấy doanh thu món từ bữa thực hiện trong tháng"]
        KT4{"Doanh thu > 0?"}
        KT5["Tính food cost thực tế & lãi theo nguyên liệu"]
        KT6["Ghi 'chưa xác định'"]
    end

    subgraph Server["Server"]
        SV1{"Đầu tháng: đã có đợt đề xuất giá chưa?"}
        SV2["Dùng lại đợt cũ"]
        SV3["Tạo đợt mới nguyên tử với khóa duy nhất"]
        SV4["Dùng 30 ngày trước mốc đầu tháng\nBa khoảng 10 ngày, trọng số 1.5 / 1.5 / 2"]
        SV5["Tính bình quân có trọng số theo lượng nhập\nLưu dòng giá cũ & gợi ý"]
        SV6["Tính giá bán gợi ý = chi phí định lượng / food cost mục tiêu"]
    end

    subgraph QuanLy["Quản lý cơ sở"]
        QL1["Cân nhắc food cost mục tiêu kỳ sau\n(mặc định 35%)"]
        QL2["Chọn chấp nhận / chỉnh / bỏ qua từng dòng giá nguyên liệu"]
        QL3["Cập nhật giá nguyên liệu được chọn\nLiệt kê món bị ảnh hưởng"]
        QL4["Quyết định giá bán món\n(không đổi hợp đồng đã chốt)"]
    end

    %% Nhánh 1: Định giá tồn & food cost
    TK1 --> TK2
    TK2 --> KT1
    KT1 --> KT2
    KT2 --> KT3
    KT3 --> KT4
    KT4 -- "Có" --> KT5
    KT4 -- "Không (= 0)" --> KT6
    KT5 --> QL1
    KT6 --> QL1

    %% Nhánh 2: Đề xuất giá từ lịch sử mua
    SV1 -- "Đã có" --> SV2
    SV1 -- "Chưa có" --> SV3
    SV3 --> SV4
    SV2 --> SV4
    SV4 --> SV5
    SV5 --> QL2
    QL2 --> QL3
    QL1 --> SV6
    QL3 --> SV6
    SV6 --> QL4
```

## Phạm vi

UC liên quan: UC-KHO-01, UC-KHO-02, UC-KHO-03, UC-KHO-04, UC-DM-01, UC-DM-03, UC-BC-02. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Lưu ý và giới hạn

- Hai luồng hoạt động độc lập: Định giá tồn kho để tính food cost thực tế cuối tháng, và Đề xuất giá hiện hành từ lịch sử nhập mua 30 ngày gần nhất đầu tháng.
- Không dùng giá đề xuất để thay thế giá trị tồn kho kiểm kê (và ngược lại).
- Cơ chế khởi tạo đợt đề xuất giá đầu tháng (bằng cron job hoặc kiểm tra bù) đảm bảo tính nguyên tử: mỗi tháng chỉ có duy nhất một đợt đề xuất, mốc tính luôn lấy ngày đầu tháng dù chạy bù trễ.
