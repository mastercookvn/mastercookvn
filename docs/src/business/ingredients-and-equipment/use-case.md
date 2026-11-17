---
order: 10
---

# Use Case Specifications

## UC-KHO-01: Record ingredient purchase {#uc-kho-01}

| Field          | Content                                                        |
| -------------- | -------------------------------------------------------------- |
| Name           | Record ingredient purchase                                     |
| Tên tiếng Việt | Ghi nhận nhập nguyên liệu                                      |
| Actor          | Storekeeper                                                    |
| Goal           | Lưu lượng, giá mua làm đầu vào food cost tháng và đề xuất giá. |
| Trigger        | Nguyên liệu mua về.                                            |
| Preconditions  | Có danh mục nguyên liệu, đơn vị chuẩn; tháng chưa chốt.        |
| Postconditions | Phiếu nhập lưu, không gắn bữa tiệc.                            |
| Relationships  | Đầu vào UC-KHO-03, UC-KHO-04.                                  |
| Rules          | BR05, BR06                                                     |

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

## UC-KHO-02: Count ingredients at month end {#uc-kho-02}

| Field          | Content                                                       |
| -------------- | ------------------------------------------------------------- |
| Name           | Count ingredients at month end                                |
| Tên tiếng Việt | Kiểm kê nguyên liệu cuối tháng                                |
| Actor          | Storekeeper                                                   |
| Goal           | Ghi lượng tồn thực tế cuối tháng.                             |
| Trigger        | Cuối tháng.                                                   |
| Preconditions  | Kỳ tháng chưa chốt; có tồn đầu kỳ (tháng đầu: tồn ban đầu).   |
| Postconditions | Kỳ có dòng kiểm kê đủ nguyên liệu, trạng thái AWAITING_CLOSE. |
| Relationships  | Tiếp theo UC-KHO-03.                                          |
| Rules          | BR06                                                          |

**Luồng chính**

1. Hệ thống tạo phiếu kiểm kê tháng, liệt kê nguyên liệu: tồn đầu, tổng nhập, lượng tối đa = đầu + nhập.
2. Thủ kho nhập lượng thực tế cuối kỳ từng nguyên liệu.
3. Hệ thống kiểm tra, lưu người kiểm kê và thời điểm; đánh dấu kỳ AWAITING_CLOSE.

**Luồng thay thế**

- 1a. Tháng đầu tiên: thủ kho nhập lượng và đơn giá tồn ban đầu.
- 2a. Lưu tạm, nhập tiếp sau.

**Ngoại lệ**

- 3e. Lượng âm hoặc vượt đầu + nhập: yêu cầu sửa.
- 3f. Còn nguyên liệu chưa nhập lượng: chưa chuyển AWAITING_CLOSE.

## UC-KHO-03: Close period and calculate monthly food cost {#uc-kho-03}

| Field          | Content                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Name           | Close period and calculate monthly food cost                                                                                      |
| Tên tiếng Việt | Chốt kỳ và tính food cost tháng                                                                                                   |
| Actor          | Accountant                                                                                                                        |
| Goal           | Chốt giá trị tồn, chi phí tiêu thụ, food cost thực tế của tháng.                                                                  |
| Trigger        | Kỳ AWAITING_CLOSE.                                                                                                                |
| Preconditions  | Kiểm kê đủ; các bữa trong tháng đã có giá trị món xác định.                                                                       |
| Postconditions | Kỳ CLOSED; tồn cuối thành tồn đầu tháng sau; có food cost cho báo cáo. Sửa sau chốt phải mở lại kỳ, chốt lại kỳ đó và các kỳ sau. |
| Relationships  | Sau UC-KHO-02; kết quả dùng ở UC-BC-02, UC-DM-07.                                                                                 |
| Rules          | BR06                                                                                                                              |

**Luồng chính**

1. Kế toán mở kỳ AWAITING_CLOSE.
2. Hệ thống tính đơn giá tồn bình quân = (giá trị đầu + giá trị nhập) / (lượng đầu + lượng nhập); giá trị cuối = lượng kiểm kê × đơn giá tồn.
3. Hệ thống tính chi phí tiêu thụ = đầu + nhập − cuối; doanh thu món các bữa đã thực hiện trong tháng; food cost = chi phí / doanh thu × 100%.
4. Kế toán đối chiếu chênh lệch, chốt kỳ.
5. Hệ thống lưu bản chốt, khóa phiếu nhập/kiểm kê của tháng.

**Luồng thay thế**

- 3a. Doanh thu món = 0: food cost "chưa xác định".
- 4a. Số liệu sai: trả về UC-KHO-02 để thủ kho sửa.
- 5a. Hệ thống gợi ý quản lý dùng food cost thực tế làm mục tiêu tháng sau (UC-DM-07).

**Ngoại lệ**

- 1e. Kỳ chưa AWAITING_CLOSE: không cho chốt.
- 4e. Chênh lệch chưa giải trình: chưa chốt, trả về UC-KHO-02.

## UC-KHO-04: Process monthly ingredient price proposals {#uc-kho-04}

| Field          | Content                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------- |
| Name           | Process monthly ingredient price proposals                                                    |
| Tên tiếng Việt | Xử lý đề xuất giá nguyên liệu tháng                                                           |
| Actor          | Branch manager                                                                                |
| Goal           | Quyết định cập nhật giá nguyên liệu hiện hành theo giá mua gần đây.                           |
| Trigger        | Đầu tháng có đợt đề xuất mới (hệ thống tạo theo lịch).                                        |
| Preconditions  | Đợt đề xuất tháng đã tạo.                                                                     |
| Postconditions | Mỗi dòng có quyết định; giá nguyên liệu được chọn cập nhật; giá món chỉ đổi khi quản lý chọn. |
| Relationships  | Dữ liệu từ UC-KHO-01; có thể chuyển UC-DM-01 sửa giá món.                                     |
| Rules          | BR04, BR05                                                                                    |

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

## UC-KHO-05: Purchase equipment {#uc-kho-05}

| Field          | Content                                           |
| -------------- | ------------------------------------------------- |
| Name           | Purchase equipment                                |
| Tên tiếng Việt | Nhập mua dụng cụ                                  |
| Actor          | Storekeeper                                       |
| Goal           | Tăng lượng dụng cụ sở hữu, sẵn sàng.              |
| Trigger        | Mua thêm dụng cụ (thường khi dưới tồn tối thiểu). |
| Preconditions  | Có danh mục dụng cụ.                              |
| Postconditions | Lượng sở hữu và sẵn sàng tăng; có lịch sử nhập.   |
| Relationships  | —                                                 |
| Rules          | BR13                                              |

**Luồng chính**

1. Thủ kho nhập ngày, tên và SĐT nhà cung cấp.
2. Thủ kho thêm dòng: loại dụng cụ, lượng, đơn giá.
3. Hệ thống tính tổng, lưu phiếu.
4. Hệ thống cộng lượng vào sở hữu, sẵn sàng; tắt cảnh báo dưới ngưỡng nếu đủ.

**Luồng thay thế**

- 2a. Hệ thống gợi ý các loại đang dưới tồn tối thiểu; không ép lượng mua.

**Ngoại lệ**

- 2e. Lượng không dương hoặc giá âm: không lưu dòng.

## UC-KHO-06: Issue equipment for meal {#uc-kho-06}

| Field          | Content                                                   |
| -------------- | --------------------------------------------------------- |
| Name           | Issue equipment for meal                                  |
| Tên tiếng Việt | Xuất dụng cụ cho bữa                                      |
| Actor          | Storekeeper                                               |
| Goal           | Ghi lượng thực tế rời kho cho một bữa làm căn cứ thu hồi. |
| Trigger        | Bữa PREPARING.                                            |
| Preconditions  | Hợp đồng ACTIVE; bữa có giữ dụng cụ.                      |
| Postconditions | Phiếu xuất ISSUED; sẵn sàng giảm, đang sử dụng tăng.      |
| Relationships  | Sau UC-VH-01 (chuẩn bị); trước UC-KHO-07.                 |
| Rules          | BR07, BR13                                                |

**Luồng chính**

1. Thủ kho chọn bữa.
2. Hệ thống lập phiếu nháp theo định mức và dự trù của loại dụng cụ; trống dùng TS04 (mặc định 10%), nhập 0 nếu không dự trù; đồ cồng kềnh lấy lượng nhập tay. Kiểm tra khoảng cách ly vệ sinh TS19 (mặc định 12 giờ) sau thu hồi trước lượt dùng tiếp theo.
3. Thủ kho chỉnh lượng thực xuất.
4. Hệ thống kiểm tra lượng sẵn sàng thực tế, không lấn giữ của bữa khác.
5. Thủ kho xác nhận xuất.
6. Hệ thống chuyển phiếu ISSUED, trừ sẵn sàng, cộng đang sử dụng.

**Luồng thay thế**

- 3a. Hủy phiếu nháp: không đổi kho.

**Ngoại lệ**

- 4e. Thiếu sẵn sàng: báo loại thiếu, không xuất âm.
- 5e. Xác nhận lặp: không trừ lần hai.

## UC-KHO-07: Recover and count equipment and assess compensation {#uc-kho-07}

| Field          | Content                                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name           | Recover and count equipment and assess compensation                                                                                                         |
| Tên tiếng Việt | Thu hồi, kiểm đếm và bồi thường                                                                                                                             |
| Actor          | Storekeeper                                                                                                                                                 |
| Goal           | Đối chiếu dụng cụ trở về, ghi hư/mất, tính tiền khách chịu.                                                                                                 |
| Trigger        | Bữa AWAITING_COUNT, hoặc bữa hủy sau khi đã xuất.                                                                                                           |
| Preconditions  | Có phiếu ISSUED.                                                                                                                                            |
| Postconditions | Phiếu COUNTED; kho cập nhật; bữa đã phục vụ chuyển AWAITING_SETTLEMENT, bữa hủy giữ CANCELLED; ghi tiền bồi thường. Giữ dụng cụ đến hết khung vệ sinh TS19. |
| Relationships  | Tiếp theo UC-HD-08.                                                                                                                                         |
| Rules          | BR11, BR13                                                                                                                                                  |

**Luồng chính**

1. Thủ kho chọn bữa.
2. Hệ thống hiển thị lượng đã xuất, giá bồi thường đã chốt trong hợp đồng.
3. Thủ kho nhập mỗi loại: tốt, hư, mất; số khách chịu.
4. Hệ thống kiểm tra cân bằng tốt + hư + mất = xuất, khách chịu ≤ hư + mất. Theo từng loại, hư + mất ≤ TS25 (mặc định 1%) số xuất thì miễn bồi thường, khách chịu = 0; vượt ngưỡng thì tiền bồi thường = số khách chịu × đơn giá đã chốt, không khấu trừ thêm 1%.
5. Thủ kho xác nhận biên bản.
6. Hệ thống cộng tốt vào sẵn sàng, hư vào lượng hư, mất giảm sở hữu và giảm đang sử dụng đúng lượng đã xuất. Giữ khung dụng cụ đến hết thời gian vệ sinh đã nhập; khi tra cứu/kiểm tra, khoảng giữ đã kết thúc không chiếm năng lực. Bữa đã phục vụ chuyển AWAITING_SETTLEMENT; bữa hủy giữ CANCELLED, tiếp tục xử lý nghĩa vụ tiền qua UC-HD-08.

**Luồng thay thế**

- 3a. Không bắt khách bồi thường: khách chịu = 0. Nhân viên làm hư không xử lý trong hệ thống.

**Ngoại lệ**

- 4e. Tổng không khớp hoặc khách chịu vượt: không xác nhận.
- 5e. Xác nhận lặp: không cộng kho lần hai.

## UC-KHO-08: Restore or dispose of damaged equipment {#uc-kho-08}

| Field          | Content                                                             |
| -------------- | ------------------------------------------------------------------- |
| Name           | Restore or dispose of damaged equipment                             |
| Tên tiếng Việt | Phục hồi hoặc loại bỏ dụng cụ hư                                    |
| Actor          | Storekeeper                                                         |
| Goal           | Đưa dụng cụ hư đã sửa về dùng được, hoặc loại khỏi sở hữu.          |
| Trigger        | Dụng cụ hư đã sửa xong hoặc bỏ.                                     |
| Preconditions  | Loại dụng cụ có lượng hư > 0.                                       |
| Postconditions | Lượng hư giảm; sẵn sàng tăng (phục hồi) hoặc sở hữu giảm (loại bỏ). |
| Relationships  | —                                                                   |
| Rules          | BR13                                                                |

**Luồng chính**

1. Thủ kho chọn loại dụng cụ, xem lượng hư.
2. Thủ kho chọn phục hồi hoặc loại bỏ, nhập lượng, lý do.
3. Hệ thống kiểm tra, cập nhật lượng, lưu lịch sử.

**Ngoại lệ**

- 3e. Lượng vượt lượng hư hiện có: không lưu.
