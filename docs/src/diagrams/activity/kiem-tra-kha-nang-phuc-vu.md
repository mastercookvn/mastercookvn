# Kiểm tra khả năng phục vụ

```mermaid
flowchart TD
    subgraph TuVan["Tư vấn"]
        TV1["Nhận các bữa cần kiểm tra\n(số bàn ăn, số người, bàn ghế bố trí, khung tài nguyên)"]
        TV2{"Khoảng cách <= 20 km?"}
        TV3{"Thời gian & khung tài nguyên hợp lệ?"}
        TV4["Xác nhận nhận đơn / áp phụ lục"]
        TV5["Báo thiếu — chưa nhận"]
    end

    subgraph KiemTraTaiNguyen["Kiểm tra tài nguyên"]
        KT1["Tính nhu cầu dụng cụ\n(theo người, bàn bố trí, từng bữa)"]
        KT2["Loại giữ tạm hết hạn"]
        KT3["Gom giữ chồng lấn + bữa của đơn đang xét"]
        KT4{"So với số sở hữu dùng được — đủ?"}
        KT5["Gợi ý nhân sự: ceil(bàn bố trí / 3)"]
        KT6["Cộng nhu cầu dự kiến theo vị trí\n(mọi bữa đang giữ trong khung giờ)"]
        KT7{"Năng lực nhân sự đủ?"}
        KT8["Tồn < mức tối thiểu → Cảnh báo (không chặn)"]
        KT9["Kiểm tra lại & ghi giữ nguyên tử"]
        KT10["Kiểm tra thêm lượng sẵn sàng thực tế (khi xuất)"]
    end

    subgraph DuLieu["Dữ liệu giữ / phân công / kho"]
        DL1[("Hồ sơ giữ tạm & chính thức")]
        DL2[("Phân công nhân sự")]
        DL3[("Tồn kho dụng cụ")]
    end

    TV1 --> TV2
    TV2 -- "Không" --> TV5
    TV2 -- "Có" --> TV3
    TV3 -- "Không hợp lệ" --> TV5
    TV3 -- "Hợp lệ" --> KT1
    KT1 --> KT2
    KT2 --> KT3
    KT3 --> DL1
    DL1 --> KT4
    KT4 -- "Thiếu thực tế" --> TV5
    KT4 -- "Đủ" --> KT8
    KT8 --> KT5
    KT5 --> KT6
    KT6 --> DL2
    DL2 --> KT7
    KT7 -- "Không đủ" --> TV5
    KT7 -- "Đủ" --> TV4
    TV4 --> KT9
    KT9 --> DL1
    TV4 --> KT10
    KT10 --> DL3
```

## Phạm vi

UC liên quan: UC-DT-04, UC-DT-05, UC-HD-05, UC-NS-02, UC-KHO-06. Tra tại [danh mục chung](../index.md). Quy tắc tại [đặc tả](../../specification.md); lớp tại [mô hình](../class.md).

## Lưu ý và giới hạn

- Không kiểm tra xe vận chuyển, thời tiết, giấy chứng nhận sức khỏe, lịch nghỉ phép cá nhân, API bản đồ tự động hoặc tồn kho nguyên liệu (chỉ kiểm tra dụng cụ và nhân sự).
- Lượng giữ chỗ đã xuất kho thực tế không bị trừ hai lần vào năng lực khả dụng (tuân thủ bất biến tại [`class.md`](../class.md)).
- Ngưỡng tồn tối thiểu chỉ đóng vai trò cảnh báo trên Dashboard; chỉ khi thiếu thực tế so với sở hữu khả dụng mới từ chối nhận đơn.
