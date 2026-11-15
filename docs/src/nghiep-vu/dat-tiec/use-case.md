---
order: 10
---

# Đặc tả Use Case

## UC-DT-01

| Trường         | Nội dung                                            |
| -------------- | --------------------------------------------------- |
| Tên            | Xem danh mục và tạm tính                            |
| Tác nhân       | Khách hàng                                          |
| Mục tiêu       | Khách chọn món, biết chi phí dự kiến trước khi đặt. |
| Kích hoạt      | Khách tham khảo dịch vụ.                            |
| Tiền điều kiện | Không cần đăng nhập.                                |
| Hậu điều kiện  | Hiển thị giá dự kiến; không lưu đơn, không giữ chỗ. |
| Quan hệ        | Có thể chuyển sang UC-DT-02 với lựa chọn hiện tại.  |
| Quy tắc        | BR03, BR04                                          |

**Luồng chính**

1. Khách xem món, set, dịch vụ, chính sách cọc/hủy.
2. Khách thêm bữa: ngày tổ chức (đặt trước 3–90 ngày theo TS08, TS09), số bàn ăn (tối thiểu 1 bàn theo TS10), set hoặc ít nhất một món tự chọn đang phục vụ, dịch vụ. Mỗi bàn ăn là bàn chuẩn 10 suất.
3. Hệ thống tính tiền từng bữa (giá món chuẩn × số bàn ăn + dịch vụ + phụ thu lễ + thuế, làm tròn bội số 500đ theo TS26) và tổng tạm tính. Phí vận chuyển được tính bổ sung khi có khoảng cách khảo sát.
4. Hệ thống hiển thị bảng tạm tính, ghi rõ chưa phải cam kết.

**Luồng thay thế**

- 2a. Thêm nhiều bữa: lặp bước 2–3.
- 3a. Thực đơn tự chọn có ít món hơn ngưỡng TS01 hiện hành (mặc định 6): hiển thị cảnh báo ở bữa tương ứng, vẫn tạm tính và cho tiếp tục đặt.
- 4a. Khách chọn đặt: chuyển UC-DT-02, giữ lựa chọn.

**Ngoại lệ**

- 3e. Thực đơn tự chọn trống, món/set đã ngưng, số bàn không hợp lệ hoặc dưới TS10, hoặc ngày đặt ngoài khoảng [3, 90] ngày (TS08, TS09): báo bữa cần sửa, không tính.

## UC-DT-02

| Trường         | Nội dung                                                            |
| -------------- | ------------------------------------------------------------------- |
| Tên            | Tạo đơn đặt tiệc                                                    |
| Tác nhân       | Khách hàng, Nhân viên tư vấn                                        |
| Mục tiêu       | Lưu yêu cầu đặt một hoặc nhiều bữa vào đúng hồ sơ khách.            |
| Kích hoạt      | Khách tự đặt online hoặc liên hệ tư vấn đặt hộ.                     |
| Tiền điều kiện | Khách tự đặt: đã đăng nhập. Đặt hộ: tư vấn đã đăng nhập.            |
| Hậu điều kiện  | Đơn ChoXacNhan và các bữa DuKien lưu ở server; chưa giữ tài nguyên. |
| Quan hệ        | Extend: đặt hộ (tư vấn). Dùng cách tính của UC-DT-01.               |
| Quy tắc        | BR01, BR02, BR03, BR04                                              |

**Luồng chính**

1. Hệ thống lấy hồ sơ khách từ tài khoản đăng nhập.
2. Khách chọn loại tiệc, nhập ghi chú chung.
3. Khách thêm từng bữa: ngày giờ bắt đầu/kết thúc (đặt trước 3–90 ngày), địa chỉ, số bàn ăn (tối thiểu 1 bàn chuẩn 10 suất), số bàn bố trí ($\le$ số bàn ăn), set hoặc ít nhất một món tự chọn đang phục vụ, dịch vụ.
4. Hệ thống kiểm tra dữ liệu từng bữa, tính tiền từng bữa và tổng.
5. Khách xem tóm tắt, gửi đơn.
6. Hệ thống lưu đơn ChoXacNhan, các bữa DuKien, báo tư vấn qua dashboard.

**Luồng thay thế**

- 1a. Đặt hộ: tư vấn nhập tên, SĐT chuẩn hóa 10 chữ số; hệ thống tìm hồ sơ theo SĐT, không có thì tạo hồ sơ (không tạo tài khoản). Khách đăng ký sau được liên kết (UC-TK-01).
- 3a. Đến từ UC-DT-01: điền sẵn các bữa đã tạm tính.
- 4a. Thực đơn tự chọn dưới ngưỡng TS01: hiển thị cảnh báo theo bữa, vẫn cho gửi; tư vấn xem xét khi nhận đơn.
- 5a. Chưa gửi: nháp chỉ giữ trên trình duyệt.

**Ngoại lệ**

- 1e. Đặt hộ, SĐT đã thuộc hồ sơ tên khác: hiển thị hồ sơ hiện có, tư vấn xác nhận đúng người; không tạo hồ sơ thứ hai.
- 4e. Thiếu thông tin, thực đơn tự chọn trống, món/set đã ngưng, ngày ngoài khoảng [3, 90] ngày, kết thúc trước bắt đầu, bàn bố trí > bàn ăn, số bàn ăn không hợp lệ hoặc dưới 1: chỉ rõ bữa lỗi, không gửi. Cả giao diện và server đều kiểm tra thực đơn trống.

## UC-DT-03

| Trường         | Nội dung                                                              |
| -------------- | --------------------------------------------------------------------- |
| Tên            | Khảo sát địa điểm                                                     |
| Tác nhân       | Nhân viên tư vấn                                                      |
| Mục tiêu       | Ghi điều kiện hiện trường, khoảng cách từng bữa làm căn cứ nhận tiệc. |
| Kích hoạt      | Có đơn ChoXacNhan; tư vấn trao đổi với khách (gọi điện/Zalo/đến xem). |
| Tiền điều kiện | Đơn chưa hủy/từ chối.                                                 |
| Hậu điều kiện  | Mỗi bữa có khảo sát riêng: khoảng cách, Q&A, ghi chú hiện trạng.      |
| Quan hệ        | Đầu vào của UC-DT-05.                                                 |
| Quy tắc        | BR01, BR07                                                            |

**Luồng chính**

1. Tư vấn chọn đơn, chọn bữa.
2. Hệ thống hiển thị địa chỉ và các câu hỏi gợi ý (điện, nước, chỗ nấu, tầng/thang máy, xe tiếp cận, diện tích).
3. Tư vấn nhập câu trả lời, ghi chú hiện trạng, khoảng cách km (tra thủ công).
4. Hệ thống tính phí vận chuyển = max(0, khoảng cách − TS15) × TS16, hiển thị mốc tham khảo 20 km (TS17), lưu khảo sát gắn bữa; không tự đối chiếu khoảng cách với TS17 hoặc chặn nhận đơn.

**Luồng thay thế**

- 1a. Đơn nhiều bữa cùng địa chỉ: vẫn khảo sát riêng từng bữa, có thể chép câu trả lời rồi sửa.
- 3a. Hiện trạng cần phụ thu: ghi khoản phụ thu thỏa thuận vào bữa; tư vấn tự đánh giá điều kiện địa điểm và vận chuyển ngoài hệ thống.
- 4a. Sửa khảo sát trước khi nhận đơn: cập nhật, lưu người/thời điểm sửa.

**Ngoại lệ**

- 4e. Thông tin khảo sát không hợp lệ: yêu cầu sửa trước khi lưu.

## UC-DT-04

| Trường         | Nội dung                                                        |
| -------------- | --------------------------------------------------------------- |
| Tên            | Kiểm tra khả năng phục vụ                                       |
| Tác nhân       | Nhân viên tư vấn                                                |
| Mục tiêu       | Biết dụng cụ, nhân sự có đủ cho các bữa trong khung giờ không.  |
| Kích hoạt      | Tư vấn kiểm tra trước khi nhận; được gọi từ UC-DT-05, UC-HD-05. |
| Tiền điều kiện | Bữa có khung sử dụng tài nguyên, số bàn ăn và bàn bố trí.       |
| Hậu điều kiện  | Kết quả đủ hoặc danh sách thiếu; không ghi giữ chỗ.             |
| Quan hệ        | Được include bởi UC-DT-05, UC-HD-05.                            |
| Quy tắc        | BR07, BR12, BR13                                                |

**Luồng chính**

1. Tư vấn nhập/kiểm tra khung sử dụng dụng cụ (tính cả 12 giờ cách ly vệ sinh TS19) và giờ làm nhân sự (nhân sự có mặt trước 3 giờ TS18).
2. Hệ thống loại các giữ tạm đã hết hạn (quá 24 giờ TS06).
3. Hệ thống tính nhu cầu dụng cụ từng loại = ceil(định mức × cơ sở × (1 + dự trù 10% theo TS04)); cơ sở theo người là số bàn ăn × 10 suất chuẩn, kể cả phục vụ cuốn chiếu; đồ cồng kềnh lấy lượng nhập tay.
4. Hệ thống gom lượng đã giữ chồng giờ (đơn khác + các bữa khác cùng đơn), so với lượng sở hữu dùng được, bao gồm bàn ghế; không dùng trần số bàn hoặc số tiệc theo ngày.
5. Hệ thống tính gợi ý nhân sự: phục vụ = ceil(bàn bố trí / 3) (TS22), bếp = max(2, ceil(bàn ăn / 5)) (TS23), bốc vác = 2 người / 10 bàn có rạp (TS24); cộng nhu cầu nhân sự dự kiến của các bữa chồng giờ, so với nhân sự khả dụng (đảm bảo $\le 12$h làm/ngày theo TS20 và nghỉ giữa 2 ca $\ge 8$h theo TS21).
6. Hệ thống trả kết quả đủ/thiếu theo từng bữa, từng loại.

**Luồng thay thế**

- 5a. Tư vấn sửa nhu cầu nhân sự dự kiến theo vị trí: tính lại.
- 6a. Dụng cụ dưới tồn tối thiểu nhưng vẫn đủ: chỉ cảnh báo.

**Ngoại lệ**

- 1e. Khung tài nguyên không bao phủ giờ phục vụ: yêu cầu sửa.
- 6e. Thiếu tài nguyên thực tế: cảnh báo và trả danh sách thiếu; tư vấn bổ sung, điều chỉnh bữa hoặc từ chối nhận.

## UC-DT-05

| Trường         | Nội dung                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------- |
| Tên            | Xác nhận nhận hoặc từ chối đơn                                                                 |
| Tác nhân       | Nhân viên tư vấn                                                                               |
| Mục tiêu       | Cơ sở quyết định nhận toàn đơn và giữ tài nguyên tạm.                                          |
| Kích hoạt      | Đơn đã khảo sát đủ các bữa.                                                                    |
| Tiền điều kiện | Đơn ChoXacNhan; mọi bữa có khảo sát.                                                           |
| Hậu điều kiện  | Nhận: đơn DaNhan, giữ tạm 24 giờ (TS06), chuyển lập hợp đồng. Từ chối: đơn BiTuChoi kèm lý do. |
| Quan hệ        | Include UC-DT-04. Sau khi nhận chuyển UC-HD-01.                                                |
| Quy tắc        | BR01, BR07                                                                                     |

**Luồng chính**

1. Tư vấn mở đơn, xem khảo sát và tiền từng bữa.
2. Hệ thống chạy UC-DT-04 cho toàn đơn.
3. Tư vấn chọn nhận.
4. Hệ thống kiểm tra lại tài nguyên và ghi giữ tạm cho mọi bữa trong cùng một giao dịch, hạn 24 giờ (TS06).
5. Hệ thống chuyển đơn DaNhan, mở UC-HD-01.

**Luồng thay thế**

- 3a. Cần trao đổi thêm: giữ ChoXacNhan, ghi chú.
- 3b. Từ chối: nhập lý do; hệ thống chuyển BiTuChoi, các bữa DaHuy, không giữ tài nguyên.

**Ngoại lệ**

- 2e. Thiếu tài nguyên thực tế: không cho nhận; không nhận một phần đơn.
- 4e. Tài nguyên vừa bị đơn khác chiếm: hủy giao dịch, hiển thị thiếu.

## UC-DT-06

| Trường         | Nội dung                                                                |
| -------------- | ----------------------------------------------------------------------- |
| Tên            | Tra cứu đơn, hợp đồng và lịch sử thanh toán                             |
| Tác nhân       | Khách hàng, Nhân viên tư vấn, Kế toán                                   |
| Mục tiêu       | Xem tình trạng đơn/bữa, nội dung hợp đồng, phụ lục, giao dịch thu/hoàn. |
| Kích hoạt      | Người dùng cần tra cứu.                                                 |
| Tiền điều kiện | Đã đăng nhập.                                                           |
| Hậu điều kiện  | Hiển thị dữ liệu trong phạm vi quyền; không thay đổi dữ liệu.           |
| Quan hệ        | Là điểm vào của UC-HD-02, UC-HD-03, UC-HD-05, UC-HD-06, UC-CS-01.       |
| Quy tắc        | BR02, BR11                                                              |

**Luồng chính**

1. Hệ thống liệt kê đơn: khách thấy đơn của hồ sơ mình; nhân viên thấy tất cả.
2. Người dùng lọc theo trạng thái, ngày tiệc, SĐT/tên khách (nhân viên).
3. Người dùng chọn đơn.
4. Hệ thống hiển thị các bữa và trạng thái, hợp đồng, phụ lục, file ký, giao dịch thu/hoàn, số dư từng bữa.

**Luồng thay thế**

- 4a. Hợp đồng chờ xác nhận/cọc: hiển thị hạn và nút xác nhận/thanh toán.

**Ngoại lệ**

- 3e. Khách mở đơn không thuộc hồ sơ mình: từ chối truy cập.
