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

## Thành phần

Tư vấn — kiểm tra tài nguyên — dữ liệu giữ/phân công/kho.

## Nội dung cần thể hiện

1. Nhận các bữa cần kiểm tra với số bàn ăn, số người, bàn ghế bố trí và khung sử dụng tài nguyên.
2. Kiểm tra khoảng cách thủ công <=20 km; thời gian kết thúc sau bắt đầu, khung tài nguyên bao phủ việc phục vụ.
3. Tính nhu cầu dụng cụ theo người/bàn bố trí/bữa và dự trù riêng từng loại; không lấy số bàn ăn làm số bàn ghế.
4. Loại giữ tạm hết hạn; gom mọi giữ chồng lấn và các bữa của chính đơn đang xét, so với số sở hữu dùng được.
5. Gợi ý người phục vụ theo ceil(bàn bố trí/3); cộng nhu cầu dự kiến theo vị trí của mọi bữa đang giữ trong khung giờ, gồm bữa chưa phân công tên; đối chiếu năng lực nhân sự đang làm. Khi phân công người cụ thể, chặn lịch chồng lấn.
6. Trả đủ hoặc danh sách thiếu. Tồn tối thiểu chỉ là cảnh báo; thiếu thực tế thì chưa nhận.
7. Khi xác nhận nhận/áp phụ lục: kiểm tra lại và ghi giữ nguyên tử để hai thao tác không chiếm cùng năng lực. Khi xuất: kiểm tra thêm lượng sẵn sàng thực tế.

## Nhánh và giới hạn

Không kiểm tra xe, thời tiết, giấy sức khỏe, lịch nghỉ phép, bản đồ hoặc nguyên liệu thiếu. Đặt giữ đã xuất không bị trừ hai lần vào khả dụng; xem bất biến class.md.
