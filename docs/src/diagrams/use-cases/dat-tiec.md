# Đặt tiệc

Quy tắc BR tại [đặc tả](../../specification.md). [Danh mục UC](../index.md) là chỉ mục duy nhất. Quy ước bước: `Na` luồng thay thế, `Ne` ngoại lệ tại bước N.

## UC-DT-01

| Trường | Nội dung |
| --- | --- |
| Tên | Xem danh mục và tạm tính |
| Tác nhân | Khách hàng |
| Mục tiêu | Khách chọn món, biết chi phí dự kiến trước khi đặt. |
| Kích hoạt | Khách tham khảo dịch vụ. |
| Tiền điều kiện | Không cần đăng nhập. |
| Hậu điều kiện | Hiển thị giá dự kiến; không lưu đơn, không giữ chỗ. |
| Quan hệ | Có thể chuyển sang UC-DT-02 với lựa chọn hiện tại. |
| Quy tắc | BR03, BR04 |

**Luồng chính**

1. Khách xem món, set, dịch vụ, chính sách cọc/hủy.
2. Khách thêm bữa: ngày, số bàn ăn, số người/bàn, set hoặc món tự chọn, dịch vụ.
3. Hệ thống tính tiền từng bữa (món × hệ số quy mô × bàn ăn + dịch vụ + phụ thu lễ + thuế, làm tròn 500đ) và tổng.
4. Hệ thống hiển thị bảng tạm tính, ghi rõ chưa phải cam kết.

**Luồng thay thế**

- 2a. Thêm nhiều bữa: lặp bước 2–3.
- 4a. Khách chọn đặt: chuyển UC-DT-02, giữ lựa chọn.

**Ngoại lệ**

- 3e. Tự chọn dưới 6 món, món/set đã ngưng, người/bàn dưới 10: báo bữa cần sửa, không tính.

## UC-DT-02

| Trường | Nội dung |
| --- | --- |
| Tên | Tạo đơn đặt tiệc |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Mục tiêu | Lưu yêu cầu đặt một hoặc nhiều bữa vào đúng hồ sơ khách. |
| Kích hoạt | Khách tự đặt online hoặc liên hệ tư vấn đặt hộ. |
| Tiền điều kiện | Khách tự đặt: đã đăng nhập. Đặt hộ: tư vấn đã đăng nhập. |
| Hậu điều kiện | Đơn ChoXacNhan và các bữa DuKien lưu ở server; chưa giữ tài nguyên. |
| Quan hệ | Extend: đặt hộ (tư vấn). Dùng cách tính của UC-DT-01. |
| Quy tắc | BR01, BR02, BR03, BR04 |

**Luồng chính**

1. Hệ thống lấy hồ sơ khách từ tài khoản đăng nhập.
2. Khách chọn loại tiệc, nhập ghi chú chung.
3. Khách thêm từng bữa: ngày giờ bắt đầu/kết thúc, địa chỉ, số bàn ăn, số người/bàn, số bàn bố trí, set/món, dịch vụ.
4. Hệ thống kiểm tra dữ liệu từng bữa, tính tiền từng bữa và tổng.
5. Khách xem tóm tắt, gửi đơn.
6. Hệ thống lưu đơn ChoXacNhan, các bữa DuKien, báo tư vấn qua dashboard.

**Luồng thay thế**

- 1a. Đặt hộ: tư vấn nhập tên, SĐT; hệ thống tìm hồ sơ theo SĐT, không có thì tạo hồ sơ (không tạo tài khoản). Khách đăng ký sau được liên kết (UC-TK-01).
- 3a. Đến từ UC-DT-01: điền sẵn các bữa đã tạm tính.
- 5a. Chưa gửi: nháp chỉ giữ trên trình duyệt.

**Ngoại lệ**

- 1e. Đặt hộ, SĐT đã thuộc hồ sơ tên khác: hiển thị hồ sơ hiện có, tư vấn xác nhận đúng người; không tạo hồ sơ thứ hai.
- 4e. Thiếu thông tin, ngày quá khứ, kết thúc trước bắt đầu, bàn bố trí > bàn ăn, dưới 6 món tự chọn: chỉ rõ bữa lỗi, không gửi.

## UC-DT-03

| Trường | Nội dung |
| --- | --- |
| Tên | Khảo sát địa điểm |
| Tác nhân | Nhân viên tư vấn |
| Mục tiêu | Ghi điều kiện hiện trường, khoảng cách từng bữa làm căn cứ nhận tiệc. |
| Kích hoạt | Có đơn ChoXacNhan; tư vấn trao đổi với khách (gọi điện/Zalo/đến xem). |
| Tiền điều kiện | Đơn chưa hủy/từ chối. |
| Hậu điều kiện | Mỗi bữa có khảo sát riêng: khoảng cách, Q&A, ghi chú hiện trạng. |
| Quan hệ | Đầu vào của UC-DT-05. |
| Quy tắc | BR01, BR07 |

**Luồng chính**

1. Tư vấn chọn đơn, chọn bữa.
2. Hệ thống hiển thị địa chỉ và các câu hỏi gợi ý (điện, nước, chỗ nấu, tầng/thang máy, xe tiếp cận, diện tích).
3. Tư vấn nhập câu trả lời, ghi chú hiện trạng, khoảng cách km (tra thủ công).
4. Hệ thống kiểm tra khoảng cách ≤ 20 km, lưu khảo sát gắn bữa.

**Luồng thay thế**

- 1a. Đơn nhiều bữa cùng địa chỉ: vẫn khảo sát riêng từng bữa, có thể chép câu trả lời rồi sửa.
- 3a. Hiện trạng cần phụ thu: ghi khoản phụ thu thỏa thuận vào bữa.
- 4a. Sửa khảo sát trước khi nhận đơn: cập nhật, lưu người/thời điểm sửa.

**Ngoại lệ**

- 4e. Khoảng cách > 20 km: lưu khảo sát, đánh dấu ngoài phạm vi; UC-DT-05 không cho nhận.

## UC-DT-04

| Trường | Nội dung |
| --- | --- |
| Tên | Kiểm tra khả năng phục vụ |
| Tác nhân | Nhân viên tư vấn |
| Mục tiêu | Biết dụng cụ, nhân sự có đủ cho các bữa trong khung giờ không. |
| Kích hoạt | Tư vấn kiểm tra trước khi nhận; được gọi từ UC-DT-05, UC-HD-05. |
| Tiền điều kiện | Bữa có khung sử dụng tài nguyên, bàn bố trí, số người. |
| Hậu điều kiện | Kết quả đủ hoặc danh sách thiếu; không ghi giữ chỗ. |
| Quan hệ | Được include bởi UC-DT-05, UC-HD-05. |
| Quy tắc | BR07, BR12, BR13 |

**Luồng chính**

1. Tư vấn nhập/kiểm tra khung sử dụng dụng cụ và giờ làm nhân sự từng bữa.
2. Hệ thống loại các giữ tạm đã hết hạn.
3. Hệ thống tính nhu cầu dụng cụ từng loại = ceil(định mức × cơ sở × (1 + dự trù)); đồ cồng kềnh lấy lượng nhập tay.
4. Hệ thống gom lượng đã giữ chồng giờ (đơn khác + các bữa khác cùng đơn), so với lượng sở hữu dùng được.
5. Hệ thống gợi ý phục vụ = ceil(bàn bố trí / 3), cộng nhu cầu nhân sự dự kiến của các bữa chồng giờ, so với nhân sự đang làm.
6. Hệ thống trả kết quả đủ/thiếu theo từng bữa, từng loại.

**Luồng thay thế**

- 5a. Tư vấn sửa nhu cầu nhân sự dự kiến theo vị trí: tính lại.
- 6a. Dụng cụ dưới tồn tối thiểu nhưng vẫn đủ: chỉ cảnh báo.

**Ngoại lệ**

- 1e. Khung tài nguyên không bao phủ giờ phục vụ: yêu cầu sửa.
- 6e. Thiếu thực tế: trả danh sách thiếu; tư vấn điều chỉnh bữa hoặc chờ bổ sung.

## UC-DT-05

| Trường | Nội dung |
| --- | --- |
| Tên | Xác nhận nhận hoặc từ chối đơn |
| Tác nhân | Nhân viên tư vấn |
| Mục tiêu | Cơ sở quyết định nhận toàn đơn và giữ tài nguyên tạm. |
| Kích hoạt | Đơn đã khảo sát đủ các bữa. |
| Tiền điều kiện | Đơn ChoXacNhan; mọi bữa có khảo sát. |
| Hậu điều kiện | Nhận: đơn DaNhan, giữ tạm 24 giờ, chuyển lập hợp đồng. Từ chối: đơn BiTuChoi kèm lý do. |
| Quan hệ | Include UC-DT-04. Sau khi nhận chuyển UC-HD-01. |
| Quy tắc | BR01, BR07 |

**Luồng chính**

1. Tư vấn mở đơn, xem khảo sát và tiền từng bữa.
2. Hệ thống chạy UC-DT-04 cho toàn đơn.
3. Tư vấn chọn nhận.
4. Hệ thống kiểm tra lại tài nguyên và ghi giữ tạm cho mọi bữa trong cùng một giao dịch, hạn 24 giờ.
5. Hệ thống chuyển đơn DaNhan, mở UC-HD-01.

**Luồng thay thế**

- 3a. Cần trao đổi thêm: giữ ChoXacNhan, ghi chú.
- 3b. Từ chối: nhập lý do; hệ thống chuyển BiTuChoi, các bữa DaHuy, không giữ tài nguyên.

**Ngoại lệ**

- 2e. Bữa ngoài 20 km hoặc thiếu tài nguyên: không cho nhận; không nhận một phần đơn.
- 4e. Tài nguyên vừa bị đơn khác chiếm: hủy giao dịch, hiển thị thiếu.

## UC-DT-06

| Trường | Nội dung |
| --- | --- |
| Tên | Tra cứu đơn, hợp đồng và lịch sử thanh toán |
| Tác nhân | Khách hàng, Nhân viên tư vấn, Kế toán |
| Mục tiêu | Xem tình trạng đơn/bữa, nội dung hợp đồng, phụ lục, giao dịch thu/hoàn. |
| Kích hoạt | Người dùng cần tra cứu. |
| Tiền điều kiện | Đã đăng nhập. |
| Hậu điều kiện | Hiển thị dữ liệu trong phạm vi quyền; không thay đổi dữ liệu. |
| Quan hệ | Là điểm vào của UC-HD-02, UC-HD-03, UC-HD-05, UC-HD-06, UC-CS-01. |
| Quy tắc | BR02, BR11 |

**Luồng chính**

1. Hệ thống liệt kê đơn: khách thấy đơn của hồ sơ mình; nhân viên thấy tất cả.
2. Người dùng lọc theo trạng thái, ngày tiệc, SĐT/tên khách (nhân viên).
3. Người dùng chọn đơn.
4. Hệ thống hiển thị các bữa và trạng thái, hợp đồng, phụ lục, file ký, giao dịch thu/hoàn, số dư từng bữa.

**Luồng thay thế**

- 4a. Hợp đồng chờ xác nhận/cọc: hiển thị hạn và nút xác nhận/thanh toán.

**Ngoại lệ**

- 3e. Khách mở đơn không thuộc hồ sơ mình: từ chối truy cập.
