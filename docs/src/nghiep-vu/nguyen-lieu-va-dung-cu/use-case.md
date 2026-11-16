---
order: 10
---

# Đặc tả Use Case

## UC-KHO-01

| Trường         | Nội dung                                                       |
| -------------- | -------------------------------------------------------------- |
| Tên            | Ghi nhận nhập Ingredient                                      |
| Tác nhân       | Storekeeper                                                        |
| Mục tiêu       | Lưu lượng, giá mua làm đầu vào food cost tháng và đề xuất giá. |
| Kích hoạt      | Ingredient mua về.                                            |
| Tiền điều kiện | Có Catalog của Ingredient, đơn vị chuẩn; tháng chưa chốt.    |
| Hậu điều kiện  | Phiếu nhập lưu, không gắn Meal.                            |
| Quan hệ        | Đầu vào UC-KHO-03, UC-KHO-04.                                  |
| Quy tắc        | BR05, BR06                                                     |

**Luồng chính**

1. Storekeeper nhập ngày, tên và SĐT Supplier.
2. Storekeeper thêm dòng: Ingredient, lượng (đơn vị chuẩn), đơn giá.
3. Hệ thống tính thành tiền từng dòng, tổng phiếu.
4. Hệ thống so đơn giá với giá hiện hành, đánh dấu dòng lệch giá (chỉ hiển thị).
5. Storekeeper lưu phiếu.

**Luồng thay thế**

- 1a. Mua ở chợ: Supplier ghi "Chợ" hoặc tên chợ, SĐT trống.
- 5a. Sửa phiếu khi tháng chưa chốt: cập nhật, lưu người sửa.

**Ngoại lệ**

- 2e. Lượng không dương, giá âm, sai đơn vị: không lưu dòng.
- 5e. Ngày thuộc tháng đã chốt: không lưu.

## UC-KHO-02

| Trường         | Nội dung                                                    |
| -------------- | ----------------------------------------------------------- |
| Tên            | Inventory Count cho Ingredient cuối tháng                          |
| Tác nhân       | Storekeeper                                                     |
| Mục tiêu       | Ghi lượng tồn thực tế cuối tháng.                           |
| Kích hoạt      | Cuối tháng.                                                 |
| Tiền điều kiện | Kỳ tháng chưa chốt; có tồn đầu kỳ (tháng đầu: tồn ban đầu). |
| Hậu điều kiện  | Kỳ có dòng Inventory Count ghi đủ Ingredient, trạng thái ChoChot.  |
| Quan hệ        | Tiếp theo UC-KHO-03.                                        |
| Quy tắc        | BR06                                                        |

**Luồng chính**

1. Hệ thống tạo phiếu ghi Inventory Count tháng, liệt kê Ingredient: tồn đầu, tổng nhập, lượng tối đa = đầu + nhập.
2. Storekeeper nhập lượng thực tế cuối kỳ từng Ingredient.
3. Hệ thống kiểm tra, lưu; đánh dấu kỳ ChoChot.

**Luồng thay thế**

- 1a. Tháng đầu tiên: Storekeeper nhập lượng và đơn giá tồn ban đầu.
- 2a. Lưu tạm, nhập tiếp sau.

**Ngoại lệ**

- 3e. Lượng âm hoặc vượt đầu + nhập: yêu cầu sửa.
- 3f. Còn Ingredient chưa nhập lượng: chưa chuyển ChoChot.

## UC-KHO-03

| Trường         | Nội dung                                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Tên            | Chốt kỳ và tính food cost tháng                                                                                                   |
| Tác nhân       | Accountant                                                                                                                           |
| Mục tiêu       | Chốt giá trị tồn, chi phí tiêu thụ, Actual Food Cost của tháng.                                                                  |
| Kích hoạt      | Kỳ ChoChot.                                                                                                                       |
| Tiền điều kiện | Inventory Count đã ghi đủ; các Meal trong tháng đã có giá trị Dish xác định.                                                                |
| Hậu điều kiện  | Kỳ DaChot; tồn cuối thành tồn đầu tháng sau; có food cost cho báo cáo. Sửa sau chốt phải mở lại kỳ, chốt lại kỳ đó và các kỳ sau. |
| Quan hệ        | Sau UC-KHO-02; kết quả dùng ở UC-BC-02, UC-DM-07.                                                                                 |
| Quy tắc        | BR06                                                                                                                              |

**Luồng chính**

1. Accountant mở kỳ ChoChot.
2. Hệ thống tính đơn giá tồn bình quân = (giá trị đầu + giá trị nhập) / (lượng đầu + lượng nhập); giá trị cuối = lượng ghi nhận qua Inventory Count × đơn giá tồn.
3. Hệ thống tính chi phí tiêu thụ = đầu + nhập − cuối; doanh thu Dish các Meal đã thực hiện trong tháng; food cost = chi phí / doanh thu × 100%.
4. Accountant đối chiếu chênh lệch, chốt kỳ.
5. Hệ thống lưu bản chốt, khóa phiếu nhập và Inventory Count của tháng.

**Luồng thay thế**

- 3a. Doanh thu Dish = 0: food cost "chưa xác định".
- 4a. Số liệu sai: trả về UC-KHO-02 để Storekeeper sửa.
- 5a. Hệ thống gợi ý quản lý dùng Actual Food Cost làm mục tiêu tháng sau (UC-DM-07).

**Ngoại lệ**

- 1e. Kỳ chưa ChoChot: không cho chốt.
- 4e. Chênh lệch chưa giải trình: chưa chốt, trả về UC-KHO-02.

## UC-KHO-04

| Trường         | Nội dung                                                                                      |
| -------------- | --------------------------------------------------------------------------------------------- |
| Tên            | Xử lý đề xuất giá Ingredient tháng                                                           |
| Tác nhân       | Branch Manager                                                                                 |
| Mục tiêu       | Quyết định cập nhật Current Ingredient Price theo giá mua gần đây.                           |
| Kích hoạt      | Đầu tháng có đợt đề xuất mới (hệ thống tạo theo lịch).                                        |
| Tiền điều kiện | Đợt đề xuất tháng đã tạo.                                                                     |
| Hậu điều kiện  | Mỗi dòng có quyết định; giá Ingredient được chọn cập nhật; giá Dish chỉ đổi khi quản lý chọn. |
| Quan hệ        | Dữ liệu từ UC-KHO-01; có thể chuyển UC-DM-01 sửa giá Dish.                                     |
| Quy tắc        | BR04, BR05                                                                                    |

**Luồng chính**

1. Hệ thống (đầu tháng) tạo một đợt: với mỗi Ingredient có nhập trong 30 ngày, giá đề xuất = Σ(lượng × giá × trọng số) / Σ(lượng × trọng số), trọng số 1,5; 1,5; 2 cho ba khoảng 10 ngày cũ → mới.
2. Quản lý mở đợt, xem từng dòng: giá hiện hành, giá đề xuất, chênh lệch.
3. Quản lý chọn mỗi dòng: chấp nhận / chỉnh giá khác / bỏ qua.
4. Hệ thống cập nhật giá Ingredient được chọn, lưu người, thời điểm quyết định.
5. Hệ thống liệt kê Dish bị ảnh hưởng kèm giá gợi ý mới.
6. Quản lý chấp nhận giá gợi ý cho Dish hoặc giữ giá bán.

**Luồng thay thế**

- 1a. Lịch không chạy: lần đầu vào chức năng nội bộ trong tháng tạo bù, cùng mốc đầu tháng.
- 1b. Ingredient không có nhập: không đưa vào đợt, giữ giá.
- 6a. Sửa giá Dish tay: chuyển UC-DM-01.

**Ngoại lệ**

- 1e. Tháng đã có đợt: không tạo đợt thứ hai.
- 3e. Dòng đã xử lý: không xử lý lại.

## UC-KHO-05

| Trường         | Nội dung                                          |
| -------------- | ------------------------------------------------- |
| Tên            | Nhập mua Equipment                                  |
| Tác nhân       | Storekeeper                                           |
| Mục tiêu       | Tăng lượng Equipment sở hữu, sẵn sàng.              |
| Kích hoạt      | Mua thêm Equipment (thường khi dưới tồn tối thiểu). |
| Tiền điều kiện | Có Catalog của Equipment.                          |
| Hậu điều kiện  | Lượng sở hữu và sẵn sàng tăng; có lịch sử nhập.   |
| Quan hệ        | —                                                 |
| Quy tắc        | BR13                                              |

**Luồng chính**

1. Storekeeper nhập ngày, tên và SĐT Supplier.
2. Storekeeper thêm dòng: loại Equipment, lượng, đơn giá.
3. Hệ thống tính tổng, lưu phiếu.
4. Hệ thống cộng lượng vào sở hữu, sẵn sàng; tắt cảnh báo dưới ngưỡng nếu đủ.

**Luồng thay thế**

- 2a. Hệ thống gợi ý các loại đang dưới tồn tối thiểu; không ép lượng mua.

**Ngoại lệ**

- 2e. Lượng không dương hoặc giá âm: không lưu dòng.

## UC-KHO-06

| Trường         | Nội dung                                                  |
| -------------- | --------------------------------------------------------- |
| Tên            | Xuất Equipment cho Meal                                      |
| Tác nhân       | Storekeeper                                                   |
| Mục tiêu       | Ghi lượng thực tế rời kho cho một Meal làm căn cứ thu hồi. |
| Kích hoạt      | Meal DangChuanBi.                                          |
| Tiền điều kiện | Contract CoHieuLuc; Meal có giữ Equipment.                   |
| Hậu điều kiện  | Phiếu xuất DaXuat; sẵn sàng giảm, đang sử dụng tăng.      |
| Quan hệ        | Sau UC-VH-01 (chuẩn bị); trước UC-KHO-07.                 |
| Quy tắc        | BR07, BR13                                                |

**Luồng chính**

1. Storekeeper chọn Meal.
2. Hệ thống lập phiếu nháp với lượng cần theo định mức và tỷ lệ dự trù mặc định 10% theo TS04 (đồ cồng kềnh lấy lượng nhập tay); kiểm tra đảm bảo khoảng cách ly vệ sinh 12 giờ giữa hai lượt sử dụng (TS19).
3. Storekeeper chỉnh lượng thực xuất.
4. Hệ thống kiểm tra lượng sẵn sàng thực tế, không lấn giữ của Meal khác.
5. Storekeeper xác nhận xuất.
6. Hệ thống chuyển phiếu DaXuat, trừ sẵn sàng, cộng đang sử dụng.

**Luồng thay thế**

- 3a. Hủy phiếu nháp: không đổi kho.

**Ngoại lệ**

- 4e. Thiếu sẵn sàng: báo loại thiếu, không xuất âm.
- 5e. Xác nhận lặp: không trừ lần hai.

## UC-KHO-07

| Trường         | Nội dung                                                                      |
| -------------- | ----------------------------------------------------------------------------- |
| Tên            | Thu hồi, kiểm đếm và bồi thường                                               |
| Tác nhân       | Storekeeper                                                                       |
| Mục tiêu       | Đối chiếu Equipment trở về, ghi hư/mất, tính tiền Customer phải chịu.              |
| Kích hoạt      | Meal ChoKiemDem, hoặc Meal hủy sau khi đã xuất.                                 |
| Tiền điều kiện | Có phiếu DaXuat.                                                              |
| Hậu điều kiện  | Phiếu DaKiemDem; kho cập nhật; giữ nhả; Meal ChoQuyetToan với tiền bồi thường. |
| Quan hệ        | Tiếp theo UC-HD-08.                                                           |
| Quy tắc        | BR11, BR13                                                                    |

**Luồng chính**

1. Storekeeper chọn Meal.
2. Hệ thống hiển thị lượng đã xuất, giá bồi thường đã chốt trong Contract.
3. Storekeeper nhập mỗi loại: tốt, hư, mất; số lượng Customer chịu trách nhiệm.
4. Hệ thống kiểm tra cân bằng tốt + hư + mất = xuất, số lượng Customer chịu trách nhiệm ≤ hư + mất; áp dụng ngưỡng hao hụt miễn bồi thường 1% số lượng xuất (TS25); tính tiền bồi thường = số lượng Customer chịu trách nhiệm × đơn giá bồi thường đã chốt trong Contract.
5. Storekeeper xác nhận biên bản.
6. Hệ thống cộng tốt vào sẵn sàng, hư vào lượng hư, mất giảm sở hữu; nhả giữ; Meal ChoQuyetToan.

**Luồng thay thế**

- 3a. Không bắt Customer bồi thường: số lượng Customer chịu trách nhiệm = 0. Staff Member làm hư không xử lý trong hệ thống.

**Ngoại lệ**

- 4e. Tổng không khớp hoặc số lượng Customer chịu trách nhiệm vượt: không xác nhận.
- 5e. Xác nhận lặp: không cộng kho lần hai.

## UC-KHO-08

| Trường         | Nội dung                                                            |
| -------------- | ------------------------------------------------------------------- |
| Tên            | Phục hồi hoặc loại bỏ Equipment hư                                    |
| Tác nhân       | Storekeeper                                                             |
| Mục tiêu       | Đưa Equipment hư đã sửa về dùng được, hoặc loại khỏi sở hữu.          |
| Kích hoạt      | Equipment hư đã sửa xong hoặc bỏ.                                     |
| Tiền điều kiện | Loại Equipment có lượng hư > 0.                                       |
| Hậu điều kiện  | Lượng hư giảm; sẵn sàng tăng (phục hồi) hoặc sở hữu giảm (loại bỏ). |
| Quan hệ        | —                                                                   |
| Quy tắc        | BR13                                                                |

**Luồng chính**

1. Storekeeper chọn loại Equipment, xem lượng hư.
2. Storekeeper chọn phục hồi hoặc loại bỏ, nhập lượng, lý do.
3. Hệ thống kiểm tra, cập nhật lượng, lưu lịch sử.

**Ngoại lệ**

- 3e. Lượng vượt lượng hư hiện có: không lưu.
