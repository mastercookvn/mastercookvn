# Nguyên liệu và dụng cụ

## UC-KHO-01

| Trường | Nội dung |
| --- | --- |
| Tên | Ghi nhận nhập nguyên liệu |
| Tác nhân | Thủ kho |
| Mục tiêu | Lưu lượng, giá mua làm đầu vào food cost tháng và đề xuất giá. |
| Kích hoạt | Nguyên liệu mua về. |
| Tiền điều kiện | Có danh mục nguyên liệu, đơn vị chuẩn; tháng chưa chốt. |
| Hậu điều kiện | Phiếu nhập lưu, không gắn bữa tiệc. |
| Quan hệ | Đầu vào UC-KHO-03, UC-KHO-04. |
| Quy tắc | BR05, BR06 |

**Luồng chính**

1. Thủ kho nhập ngày, tên và SĐT nhà cung cấp.
2. Thủ kho thêm dòng: nguyên liệu, lượng (đơn vị chuẩn), đơn giá.
3. Hệ thống tính thành tiền từng dòng, tổng phiếu.
4. Hệ thống so đơn giá với giá hiện hành, đánh dấu dòng lệch giá (chỉ hiển thị).
5. Thủ kho lưu phiếu.

**Luồng thay thế**

- 1a. Mua ở chợ: nhà cung cấp ghi "Chợ" hoặc tên chợ, SĐT trống.
- 5a. Sửa phiếu khi tháng chưa chốt: cập nhật, lưu người sửa.

**Ngoại lệ**

- 2e. Lượng không dương, giá âm, sai đơn vị: không lưu dòng.
- 5e. Ngày thuộc tháng đã chốt: không lưu.

## UC-KHO-02

| Trường | Nội dung |
| --- | --- |
| Tên | Kiểm kê nguyên liệu cuối tháng |
| Tác nhân | Thủ kho |
| Mục tiêu | Ghi lượng tồn thực tế cuối tháng. |
| Kích hoạt | Cuối tháng. |
| Tiền điều kiện | Kỳ tháng chưa chốt; có tồn đầu kỳ (tháng đầu: tồn ban đầu). |
| Hậu điều kiện | Kỳ có dòng kiểm kê đủ nguyên liệu, trạng thái ChoChot. |
| Quan hệ | Tiếp theo UC-KHO-03. |
| Quy tắc | BR06 |

**Luồng chính**

1. Hệ thống tạo phiếu kiểm kê tháng, liệt kê nguyên liệu: tồn đầu, tổng nhập, lượng tối đa = đầu + nhập.
2. Thủ kho nhập lượng thực tế cuối kỳ từng nguyên liệu.
3. Hệ thống kiểm tra, lưu; đánh dấu kỳ ChoChot.

**Luồng thay thế**

- 1a. Tháng đầu tiên: thủ kho nhập lượng và đơn giá tồn ban đầu.
- 2a. Lưu tạm, nhập tiếp sau.

**Ngoại lệ**

- 3e. Lượng âm hoặc vượt đầu + nhập: yêu cầu sửa.
- 3f. Còn nguyên liệu chưa nhập lượng: chưa chuyển ChoChot.

## UC-KHO-03

| Trường | Nội dung |
| --- | --- |
| Tên | Chốt kỳ và tính food cost tháng |
| Tác nhân | Kế toán |
| Mục tiêu | Chốt giá trị tồn, chi phí tiêu thụ, food cost thực tế của tháng. |
| Kích hoạt | Kỳ ChoChot. |
| Tiền điều kiện | Kiểm kê đủ; các bữa trong tháng đã có giá trị món xác định. |
| Hậu điều kiện | Kỳ DaChot; tồn cuối thành tồn đầu tháng sau; có food cost cho báo cáo. Sửa sau chốt phải mở lại kỳ, chốt lại kỳ đó và các kỳ sau. |
| Quan hệ | Sau UC-KHO-02; kết quả dùng ở UC-BC-02, UC-DM-07. |
| Quy tắc | BR06 |

**Luồng chính**

1. Kế toán mở kỳ ChoChot.
2. Hệ thống tính đơn giá tồn bình quân = (giá trị đầu + giá trị nhập) / (lượng đầu + lượng nhập); giá trị cuối = lượng kiểm kê × đơn giá tồn.
3. Hệ thống tính chi phí tiêu thụ = đầu + nhập − cuối; doanh thu món các bữa đã thực hiện trong tháng; food cost = chi phí / doanh thu × 100%.
4. Kế toán đối chiếu chênh lệch, chốt kỳ.
5. Hệ thống lưu bản chốt, khóa phiếu nhập/kiểm kê của tháng.

**Luồng thay thế**

- 3a. Doanh thu món = 0: food cost "chưa xác định".
- 4a. Số liệu sai: trả về UC-KHO-02 để thủ kho sửa.
- 5a. Hệ thống gợi ý quản lý dùng food cost thực tế làm mục tiêu tháng sau (UC-DM-07).

**Ngoại lệ**

- 1e. Kỳ chưa ChoChot: không cho chốt.
- 4e. Chênh lệch chưa giải trình: chưa chốt, trả về UC-KHO-02.

## UC-KHO-04

| Trường | Nội dung |
| --- | --- |
| Tên | Xử lý đề xuất giá nguyên liệu tháng |
| Tác nhân | Quản lý cơ sở |
| Mục tiêu | Quyết định cập nhật giá nguyên liệu hiện hành theo giá mua gần đây. |
| Kích hoạt | Đầu tháng có đợt đề xuất mới (hệ thống tạo theo lịch). |
| Tiền điều kiện | Đợt đề xuất tháng đã tạo. |
| Hậu điều kiện | Mỗi dòng có quyết định; giá nguyên liệu được chọn cập nhật; giá món chỉ đổi khi quản lý chọn. |
| Quan hệ | Dữ liệu từ UC-KHO-01; có thể chuyển UC-DM-01 sửa giá món. |
| Quy tắc | BR04, BR05 |

**Luồng chính**

1. Hệ thống (đầu tháng) tạo một đợt: với mỗi nguyên liệu có nhập trong 30 ngày, giá đề xuất = Σ(lượng × giá × trọng số) / Σ(lượng × trọng số), trọng số 1,5; 1,5; 2 cho ba khoảng 10 ngày cũ → mới.
2. Quản lý mở đợt, xem từng dòng: giá hiện hành, giá đề xuất, chênh lệch.
3. Quản lý chọn mỗi dòng: chấp nhận / chỉnh giá khác / bỏ qua.
4. Hệ thống cập nhật giá nguyên liệu được chọn, lưu người, thời điểm quyết định.
5. Hệ thống liệt kê món bị ảnh hưởng kèm giá gợi ý mới.
6. Quản lý chấp nhận giá gợi ý cho món hoặc giữ giá bán.

**Luồng thay thế**

- 1a. Lịch không chạy: lần đầu vào chức năng nội bộ trong tháng tạo bù, cùng mốc đầu tháng.
- 1b. Nguyên liệu không có nhập: không đưa vào đợt, giữ giá.
- 6a. Sửa giá món tay: chuyển UC-DM-01.

**Ngoại lệ**

- 1e. Tháng đã có đợt: không tạo đợt thứ hai.
- 3e. Dòng đã xử lý: không xử lý lại.

## UC-KHO-05

| Trường | Nội dung |
| --- | --- |
| Tên | Nhập mua dụng cụ |
| Tác nhân | Thủ kho |
| Mục tiêu | Tăng lượng dụng cụ sở hữu, sẵn sàng. |
| Kích hoạt | Mua thêm dụng cụ (thường khi dưới tồn tối thiểu). |
| Tiền điều kiện | Có danh mục dụng cụ. |
| Hậu điều kiện | Lượng sở hữu và sẵn sàng tăng; có lịch sử nhập. |
| Quan hệ | — |
| Quy tắc | BR13 |

**Luồng chính**

1. Thủ kho nhập ngày, tên và SĐT nhà cung cấp.
2. Thủ kho thêm dòng: loại dụng cụ, lượng, đơn giá.
3. Hệ thống tính tổng, lưu phiếu.
4. Hệ thống cộng lượng vào sở hữu, sẵn sàng; tắt cảnh báo dưới ngưỡng nếu đủ.

**Luồng thay thế**

- 2a. Hệ thống gợi ý các loại đang dưới tồn tối thiểu; không ép lượng mua.

**Ngoại lệ**

- 2e. Lượng không dương hoặc giá âm: không lưu dòng.

## UC-KHO-06

| Trường | Nội dung |
| --- | --- |
| Tên | Xuất dụng cụ cho bữa |
| Tác nhân | Thủ kho |
| Mục tiêu | Ghi lượng thực tế rời kho cho một bữa làm căn cứ thu hồi. |
| Kích hoạt | Bữa DangChuanBi. |
| Tiền điều kiện | Hợp đồng CoHieuLuc; bữa có giữ dụng cụ. |
| Hậu điều kiện | Phiếu xuất DaXuat; sẵn sàng giảm, đang sử dụng tăng. |
| Quan hệ | Sau UC-VH-01 (chuẩn bị); trước UC-KHO-07. |
| Quy tắc | BR07, BR13 |

**Luồng chính**

1. Thủ kho chọn bữa.
2. Hệ thống lập phiếu nháp với lượng cần theo định mức, dự trù (đồ cồng kềnh lấy lượng nhập tay).
3. Thủ kho chỉnh lượng thực xuất.
4. Hệ thống kiểm tra lượng sẵn sàng thực tế, không lấn giữ của bữa khác.
5. Thủ kho xác nhận xuất.
6. Hệ thống chuyển phiếu DaXuat, trừ sẵn sàng, cộng đang sử dụng.

**Luồng thay thế**

- 3a. Hủy phiếu nháp: không đổi kho.

**Ngoại lệ**

- 4e. Thiếu sẵn sàng: báo loại thiếu, không xuất âm.
- 5e. Xác nhận lặp: không trừ lần hai.

## UC-KHO-07

| Trường | Nội dung |
| --- | --- |
| Tên | Thu hồi, kiểm đếm và bồi thường |
| Tác nhân | Thủ kho |
| Mục tiêu | Đối chiếu dụng cụ trở về, ghi hư/mất, tính tiền khách chịu. |
| Kích hoạt | Bữa ChoKiemDem, hoặc bữa hủy sau khi đã xuất. |
| Tiền điều kiện | Có phiếu DaXuat. |
| Hậu điều kiện | Phiếu DaKiemDem; kho cập nhật; giữ nhả; bữa ChoQuyetToan với tiền bồi thường. |
| Quan hệ | Tiếp theo UC-HD-08. |
| Quy tắc | BR11, BR13 |

**Luồng chính**

1. Thủ kho chọn bữa.
2. Hệ thống hiển thị lượng đã xuất, giá bồi thường đã chốt trong hợp đồng.
3. Thủ kho nhập mỗi loại: tốt, hư, mất; số khách chịu.
4. Hệ thống kiểm tra tốt + hư + mất = xuất, khách chịu ≤ hư + mất; tính bồi thường = khách chịu × giá chốt.
5. Thủ kho xác nhận biên bản.
6. Hệ thống cộng tốt vào sẵn sàng, hư vào lượng hư, mất giảm sở hữu; nhả giữ; bữa ChoQuyetToan.

**Luồng thay thế**

- 3a. Không bắt khách bồi thường: khách chịu = 0. Nhân viên làm hư không xử lý trong hệ thống.

**Ngoại lệ**

- 4e. Tổng không khớp hoặc khách chịu vượt: không xác nhận.
- 5e. Xác nhận lặp: không cộng kho lần hai.

## UC-KHO-08

| Trường | Nội dung |
| --- | --- |
| Tên | Phục hồi hoặc loại bỏ dụng cụ hư |
| Tác nhân | Thủ kho |
| Mục tiêu | Đưa dụng cụ hư đã sửa về dùng được, hoặc loại khỏi sở hữu. |
| Kích hoạt | Dụng cụ hư đã sửa xong hoặc bỏ. |
| Tiền điều kiện | Loại dụng cụ có lượng hư > 0. |
| Hậu điều kiện | Lượng hư giảm; sẵn sàng tăng (phục hồi) hoặc sở hữu giảm (loại bỏ). |
| Quan hệ | — |
| Quy tắc | BR13 |

**Luồng chính**

1. Thủ kho chọn loại dụng cụ, xem lượng hư.
2. Thủ kho chọn phục hồi hoặc loại bỏ, nhập lượng, lý do.
3. Hệ thống kiểm tra, cập nhật lượng, lưu lịch sử.

**Ngoại lệ**

- 3e. Lượng vượt lượng hư hiện có: không lưu.
