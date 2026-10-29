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

## Thành phần

Thủ kho — Kế toán — server — Quản lý cơ sở.

## Nội dung cần thể hiện

1. Cuối tháng: lấy tồn đầu và nhập trong tháng; thủ kho kiểm kê lượng cuối, không lập xuất theo từng bữa.
2. Tính giá tồn bình quân tháng và tiêu thụ = giá trị đầu + nhập − cuối; kế toán đối chiếu/chốt.
3. Lấy doanh thu món từ bữa thực hiện trong tháng; nếu >0 tính food cost, nếu 0 ghi chưa xác định. Tính lãi theo nguyên liệu.
4. Quản lý cân nhắc food cost mục tiêu kỳ sau; mặc định ban đầu 35%, không tự thay bằng tỷ lệ thực tế.
5. Đầu tháng: cron hoặc kiểm tra bù hỏi đã có đợt theo tháng chưa; có thì dùng lại, chưa thì tạo nguyên tử với khóa duy nhất.
6. Dùng 30 ngày trước mốc đầu tháng, ba khoảng 10 ngày trọng số 1,5;1,5;2, tính bình quân có trọng số theo lượng nhập; lưu dòng giá cũ/gợi ý.
7. Quản lý chọn chấp nhận, chỉnh hoặc bỏ qua từng dòng; cập nhật giá nguyên liệu được chọn, liệt kê món bị ảnh hưởng.
8. Tính giá bán gợi ý món bằng chi phí định lượng / food cost mục tiêu; quản lý quyết định giá món, không đổi hợp đồng chốt.

## Nhánh và giới hạn

Vẽ hai nhánh rõ: định giá tồn để tính food cost và đề xuất giá hiện hành từ lịch sử mua. Không dùng giá đề xuất thay giá tồn. Cron chạy muộn vẫn dùng mốc đầu tháng; hai lần gọi chỉ có một đợt.
