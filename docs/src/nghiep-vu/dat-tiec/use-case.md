---
order: 10
---

# Đặc tả Use Case

## UC-DT-01

| Trường         | Nội dung                                            |
| -------------- | --------------------------------------------------- |
| Tên            | Xem Catalog và tạm tính                            |
| Tác nhân       | Customer                                          |
| Mục tiêu       | Customer chọn Dish, biết chi phí dự kiến trước khi đặt. |
| Kích hoạt      | Customer tham khảo dịch vụ.                            |
| Tiền điều kiện | Không cần đăng nhập.                                |
| Hậu điều kiện  | Hiển thị giá dự kiến; không lưu Order, không giữ chỗ. |
| Quan hệ        | Có thể chuyển sang UC-DT-02 với lựa chọn hiện tại.  |
| Quy tắc        | BR03, BR04                                          |

**Luồng chính**

1. Customer xem Dish, set, dịch vụ, chính sách Deposit/hủy.
2. Customer thêm Meal: ngày tổ chức (đặt trước 3–90 ngày theo TS08, TS09), số Serving Table (tối thiểu 1 bàn theo TS10), set hoặc ít nhất một Dish tự chọn đang phục vụ, dịch vụ. Mỗi Serving Table là bàn chuẩn 10 suất.
3. Hệ thống tính tiền từng Meal (giá Dish chuẩn × số Serving Table + dịch vụ + phụ thu lễ + thuế, làm tròn bội số 500đ theo TS26) và tổng tạm tính. Phí vận chuyển được tính bổ sung khi có khoảng cách khảo sát.
4. Hệ thống hiển thị bảng tạm tính, ghi rõ chưa phải cam kết.

**Luồng thay thế**

- 2a. Thêm nhiều Meal: lặp bước 2–3.
- 3a. Menu tự chọn có ít Dish hơn ngưỡng TS01 hiện hành (mặc định 6): hiển thị cảnh báo ở Meal tương ứng, vẫn tạm tính và cho tiếp tục đặt.
- 4a. Customer chọn đặt: chuyển UC-DT-02, giữ lựa chọn.

**Ngoại lệ**

- 3e. Menu tự chọn trống, Dish/set đã ngưng, số bàn không hợp lệ hoặc dưới TS10, hoặc ngày đặt ngoài khoảng [3, 90] ngày (TS08, TS09): báo Meal cần sửa, không tính.

## UC-DT-02

| Trường         | Nội dung                                                            |
| -------------- | ------------------------------------------------------------------- |
| Tên            | Tạo Order                                                    |
| Tác nhân       | Customer, Consultant                                        |
| Mục tiêu       | Lưu yêu cầu đặt một hoặc nhiều Meal vào đúng Customer Profile.            |
| Kích hoạt      | Customer tự đặt online hoặc liên hệ Consultant đặt hộ.                     |
| Tiền điều kiện | Customer tự đặt: đã đăng nhập. Đặt hộ: Consultant đã đăng nhập.            |
| Hậu điều kiện  | Order ChoXacNhan và các Meal DuKien lưu ở server; chưa giữ tài nguyên. |
| Quan hệ        | Extend: đặt hộ (Consultant). Dùng cách tính của UC-DT-01.               |
| Quy tắc        | BR01, BR02, BR03, BR04                                              |

**Luồng chính**

1. Hệ thống lấy Customer Profile từ Account đăng nhập.
2. Customer chọn Event Type, nhập ghi chú chung.
3. Customer thêm từng Meal: ngày giờ bắt đầu/kết thúc (đặt trước 3–90 ngày), địa chỉ, số Serving Table (tối thiểu 1 bàn chuẩn 10 suất), số Setup Table ($\le$ số Serving Table), set hoặc ít nhất một Dish tự chọn đang phục vụ, dịch vụ.
4. Hệ thống kiểm tra dữ liệu từng Meal, tính tiền từng Meal và tổng.
5. Customer xem tóm tắt, gửi Order.
6. Hệ thống lưu Order ChoXacNhan, các Meal DuKien, báo Consultant qua dashboard.

**Luồng thay thế**

- 1a. Đặt hộ: Consultant nhập tên, SĐT chuẩn hóa 10 chữ số; hệ thống tìm hồ sơ theo SĐT, không có thì tạo hồ sơ (không tạo Account). Customer đăng ký sau được liên kết (UC-TK-01).
- 3a. Đến từ UC-DT-01: điền sẵn các Meal đã tạm tính.
- 4a. Menu tự chọn dưới ngưỡng TS01: hiển thị cảnh báo theo Meal, vẫn cho gửi; Consultant xem xét khi nhận Order.
- 5a. Chưa gửi: nháp chỉ giữ trên trình duyệt.

**Ngoại lệ**

- 1e. Đặt hộ, SĐT đã thuộc hồ sơ tên khác: hiển thị hồ sơ hiện có, Consultant xác nhận đúng người; không tạo hồ sơ thứ hai.
- 4e. Thiếu thông tin, Menu tự chọn trống, Dish/set đã ngưng, ngày ngoài khoảng [3, 90] ngày, kết thúc trước bắt đầu, Setup Table > Serving Table, số Serving Table không hợp lệ hoặc dưới 1: chỉ rõ Meal lỗi, không gửi. Cả giao diện và server đều kiểm tra Menu trống.

## UC-DT-03

| Trường         | Nội dung                                                              |
| -------------- | --------------------------------------------------------------------- |
| Tên            | Site Survey                                                     |
| Tác nhân       | Consultant                                                      |
| Mục tiêu       | Ghi điều kiện hiện trường, khoảng cách từng Meal làm căn cứ nhận tiệc. |
| Kích hoạt      | Có Order ChoXacNhan; Consultant trao đổi với Customer (gọi điện/Zalo/đến xem). |
| Tiền điều kiện | Order chưa hủy/từ chối.                                                 |
| Hậu điều kiện  | Mỗi Meal có khảo sát riêng: khoảng cách, Q&A, ghi chú hiện trạng.      |
| Quan hệ        | Đầu vào của UC-DT-05.                                                 |
| Quy tắc        | BR01, BR07                                                            |

**Luồng chính**

1. Consultant chọn Order, chọn Meal.
2. Hệ thống hiển thị địa chỉ và các câu hỏi gợi ý (điện, nước, chỗ nấu, tầng/thang máy, xe tiếp cận, diện tích).
3. Consultant nhập câu trả lời, ghi chú hiện trạng, khoảng cách km (tra thủ công).
4. Hệ thống tính phí vận chuyển = max(0, khoảng cách − TS15) × TS16, hiển thị mốc tham khảo 20 km (TS17), lưu khảo sát gắn Meal; không tự đối chiếu khoảng cách với TS17 hoặc chặn nhận Order.

**Luồng thay thế**

- 1a. Order nhiều Meal cùng địa chỉ: vẫn khảo sát riêng từng Meal, có thể chép câu trả lời rồi sửa.
- 3a. Hiện trạng cần phụ thu: ghi khoản phụ thu thỏa thuận vào Meal; Consultant tự đánh giá điều kiện địa điểm và vận chuyển ngoài hệ thống.
- 4a. Sửa khảo sát trước khi nhận Order: cập nhật, lưu người/thời điểm sửa.

**Ngoại lệ**

- 4e. Thông tin khảo sát không hợp lệ: yêu cầu sửa trước khi lưu.

## UC-DT-04

| Trường         | Nội dung                                                        |
| -------------- | --------------------------------------------------------------- |
| Tên            | Kiểm tra Service Capacity                                       |
| Tác nhân       | Consultant                                                |
| Mục tiêu       | Biết Equipment, nhân sự có đủ cho các Meal trong khung giờ không.  |
| Kích hoạt      | Consultant kiểm tra trước khi nhận; được gọi từ UC-DT-05, UC-HD-05. |
| Tiền điều kiện | Meal có khung sử dụng tài nguyên, số Serving Table và Setup Table.       |
| Hậu điều kiện  | Kết quả đủ hoặc danh sách thiếu; không ghi giữ chỗ.             |
| Quan hệ        | Được include bởi UC-DT-05, UC-HD-05.                            |
| Quy tắc        | BR07, BR12, BR13                                                |

**Luồng chính**

1. Consultant nhập/kiểm tra khung sử dụng Equipment (tính cả 12 giờ cách ly vệ sinh TS19) và giờ làm nhân sự (nhân sự có mặt trước 3 giờ TS18).
2. Hệ thống loại các giữ tạm đã hết hạn (quá 24 giờ TS06).
3. Hệ thống tính nhu cầu Equipment từng loại = ceil(định mức × cơ sở × (1 + dự trù 10% theo TS04)); cơ sở theo người là số Serving Table × 10 suất chuẩn, kể cả phục vụ cuốn chiếu; đồ cồng kềnh lấy lượng nhập tay.
4. Hệ thống gom lượng đã giữ chồng giờ (Order khác + các Meal khác cùng Order), so với lượng sở hữu dùng được, bao gồm Tables and Chairs; không dùng trần số bàn hoặc số tiệc theo ngày.
5. Hệ thống tính gợi ý nhân sự: phục vụ = ceil(Setup Table / 3) (TS22), bếp = max(2, ceil(Serving Table / 5)) (TS23), bốc vác = 2 người / 10 bàn có rạp (TS24); cộng nhu cầu nhân sự dự kiến của các Meal chồng giờ, so với nhân sự khả dụng (đảm bảo $\le 12$h làm/ngày theo TS20 và nghỉ giữa 2 ca $\ge 8$h theo TS21).
6. Hệ thống trả kết quả đủ/thiếu theo từng Meal, từng loại.

**Luồng thay thế**

- 5a. Consultant sửa nhu cầu nhân sự dự kiến theo vị trí: tính lại.
- 6a. Equipment dưới tồn tối thiểu nhưng vẫn đủ: chỉ cảnh báo.

**Ngoại lệ**

- 1e. Khung tài nguyên không bao phủ giờ phục vụ: yêu cầu sửa.
- 6e. Thiếu tài nguyên thực tế: cảnh báo và trả danh sách thiếu; Consultant bổ sung, điều chỉnh Meal hoặc từ chối nhận.

## UC-DT-05

| Trường         | Nội dung                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------- |
| Tên            | Xác nhận nhận hoặc từ chối Order                                                                 |
| Tác nhân       | Consultant                                                                               |
| Mục tiêu       | Cơ sở quyết định nhận toàn Order và giữ tài nguyên tạm.                                          |
| Kích hoạt      | Order đã khảo sát đủ các Meal.                                                                    |
| Tiền điều kiện | Order ChoXacNhan; mọi Meal có khảo sát.                                                           |
| Hậu điều kiện  | Nhận: Order DaNhan, giữ tạm 24 giờ (TS06), chuyển lập Contract. Từ chối: Order BiTuChoi kèm lý do. |
| Quan hệ        | Include UC-DT-04. Sau khi nhận chuyển UC-HD-01.                                                |
| Quy tắc        | BR01, BR07                                                                                     |

**Luồng chính**

1. Consultant mở Order, xem khảo sát và tiền từng Meal.
2. Hệ thống chạy UC-DT-04 cho toàn Order.
3. Consultant chọn nhận.
4. Hệ thống kiểm tra lại tài nguyên và ghi giữ tạm cho mọi Meal trong cùng một giao dịch, hạn 24 giờ (TS06).
5. Hệ thống chuyển Order DaNhan, mở UC-HD-01.

**Luồng thay thế**

- 3a. Cần trao đổi thêm: giữ ChoXacNhan, ghi chú.
- 3b. Từ chối: nhập lý do; hệ thống chuyển BiTuChoi, các Meal DaHuy, không giữ tài nguyên.

**Ngoại lệ**

- 2e. Thiếu tài nguyên thực tế: không cho nhận; không nhận một phần Order.
- 4e. Tài nguyên vừa bị Order khác chiếm: hủy giao dịch, hiển thị thiếu.

## UC-DT-06

| Trường         | Nội dung                                                                |
| -------------- | ----------------------------------------------------------------------- |
| Tên            | Tra cứu Order, Contract và lịch sử Payment                             |
| Tác nhân       | Customer, Consultant, Accountant                                   |
| Mục tiêu       | Xem tình trạng Order/Meal, nội dung Contract, Addendum, giao dịch thu/hoàn. |
| Kích hoạt      | Người dùng cần tra cứu.                                                 |
| Tiền điều kiện | Đã đăng nhập.                                                           |
| Hậu điều kiện  | Hiển thị dữ liệu trong phạm vi quyền; không thay đổi dữ liệu.           |
| Quan hệ        | Là điểm vào của UC-HD-02, UC-HD-03, UC-HD-05, UC-HD-06, UC-CS-01.       |
| Quy tắc        | BR02, BR11                                                              |

**Luồng chính**

1. Hệ thống liệt kê Order: Customer thấy Order của hồ sơ mình; Staff Member thấy tất cả.
2. Người dùng lọc theo trạng thái, ngày tiệc, SĐT/tên Customer (Staff Member).
3. Người dùng chọn Order.
4. Hệ thống hiển thị các Meal và trạng thái, Contract, Addendum, file ký, giao dịch thu/hoàn, số dư từng Meal.

**Luồng thay thế**

- 4a. Contract chờ xác nhận/Deposit: hiển thị hạn và nút xác nhận/Payment.

**Ngoại lệ**

- 3e. Customer mở Order không thuộc hồ sơ mình: từ chối truy cập.
