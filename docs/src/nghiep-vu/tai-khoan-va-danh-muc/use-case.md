---
order: 10
---

# Đặc tả Use Case

## UC-TK-01

| Trường         | Nội dung                                                      |
| -------------- | ------------------------------------------------------------- |
| Tên            | Đăng ký Account Customer                                       |
| Tác nhân       | Customer                                                    |
| Mục tiêu       | Customer có Account để tự đặt, xác nhận Contract, xem lịch sử. |
| Kích hoạt      | Customer chọn đăng ký.                                           |
| Tiền điều kiện | Chưa đăng nhập.                                               |
| Hậu điều kiện  | Có Account Customer gắn đúng một Customer Profile theo SĐT.         |
| Quan hệ        | —                                                             |
| Quy tắc        | BR02                                                          |

**Luồng chính**

1. Customer nhập họ tên, SĐT, mật khẩu.
2. Hệ thống chuẩn hóa SĐT, kiểm tra SĐT chưa có Account.
3. Hệ thống tìm Customer Profile theo SĐT; không có thì tạo hồ sơ mới.
4. Hệ thống tạo Account, băm mật khẩu, liên kết hồ sơ.
5. Hệ thống đăng nhập Customer, hiển thị Order/Contract của hồ sơ.

**Luồng thay thế**

- 3a. Đã có hồ sơ do Consultant đặt hộ: liên kết hồ sơ đó, không tạo mới; Customer thấy ngay Order/Contract chờ xác nhận.

**Ngoại lệ**

- 2e. SĐT sai định dạng hoặc đã có Account: báo lỗi, không tạo.

## UC-TK-02

| Trường         | Nội dung                                                             |
| -------------- | -------------------------------------------------------------------- |
| Tên            | Đăng nhập, đăng xuất, đổi mật khẩu                                   |
| Tác nhân       | Customer, Internal Staff                                         |
| Mục tiêu       | Truy cập chức năng theo Role của Account.                       |
| Kích hoạt      | Người dùng chọn đăng nhập/đăng xuất/đổi mật khẩu.                    |
| Tiền điều kiện | Có Account đang hoạt động.                                         |
| Hậu điều kiện  | Phiên đăng nhập mang tập Role của Account; hoặc phiên kết thúc. |
| Quan hệ        | —                                                                    |
| Quy tắc        | BR02                                                                 |

**Luồng chính**

1. Người dùng nhập SĐT, mật khẩu.
2. Hệ thống chuẩn hóa SĐT, kiểm tra mật khẩu và trạng thái Account.
3. Hệ thống tạo phiên với hợp các Role được gán.
4. Hệ thống chuyển tới trang theo Role (Customer: hồ sơ của tôi; nội bộ: dashboard).

**Luồng thay thế**

- 1a. Đổi mật khẩu: đã đăng nhập; nhập mật khẩu cũ, mới; hệ thống kiểm tra mật khẩu cũ, lưu mật khẩu mới.
- 1b. Đăng xuất: hệ thống hủy phiên.
- 1c. Quên mật khẩu: liên hệ Staff Member ngoài hệ thống, quản lý đặt lại qua UC-TK-03; không OTP/email.

**Ngoại lệ**

- 2e. Sai SĐT/mật khẩu hoặc Account bị khóa: báo lỗi chung, không tạo phiên. Quá 5 lần nhập sai liên tiếp (TS27): hệ thống tạm khóa Account để bảo mật.

## UC-TK-03

| Trường         | Nội dung                                                                    |
| -------------- | --------------------------------------------------------------------------- |
| Tên            | Quản lý Account nội bộ và phân quyền                                      |
| Tác nhân       | Branch Manager                                                               |
| Mục tiêu       | Cấp, thu hồi quyền dùng chức năng nội bộ.                                   |
| Kích hoạt      | Có Staff Member cần Account, đổi quyền, khóa hoặc đặt lại mật khẩu.          |
| Tiền điều kiện | Quản lý đã đăng nhập.                                                       |
| Hậu điều kiện  | Account và Role được cập nhật; thao tác sau kiểm tra theo Role mới. |
| Quan hệ        | —                                                                           |
| Quy tắc        | BR02                                                                        |

**Luồng chính**

1. Quản lý mở danh sách Account, tìm theo tên/SĐT.
2. Quản lý chọn tạo mới, nhập họ tên, SĐT, mật khẩu tạm.
3. Quản lý chọn một hoặc nhiều Role: Consultant, Accountant, Storekeeper, HR Manager, Branch Manager.
4. Hệ thống kiểm tra SĐT, lưu Account và gán Role.

**Luồng thay thế**

- 2a. Sửa Account có sẵn: đổi thông tin/Role, lưu.
- 2b. Khóa/mở khóa: Account khóa không đăng nhập được, giữ lịch sử thao tác.
- 2c. Đặt lại mật khẩu: nhập mật khẩu tạm mới, báo Staff Member ngoài hệ thống.

**Ngoại lệ**

- 4e. SĐT đã thuộc Account khác: không tạo trùng; mở Account đó để thêm Role.
- 4f. Tự gỡ Role Branch Manager của Account quản lý cuối cùng: từ chối.

## UC-DM-01

| Trường         | Nội dung                                                    |
| -------------- | ----------------------------------------------------------- |
| Tên            | Quản lý loại Dish và Dish                                  |
| Tác nhân       | Branch Manager                                               |
| Mục tiêu       | Duy trì Dish đang phục vụ để Customer chọn, tạm tính.           |
| Kích hoạt      | Thêm/sửa/ngưng Dish hoặc loại Dish.                           |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                    |
| Hậu điều kiện  | Dish/loại Dish cập nhật, chỉ áp dụng cho tạm tính và Order mới. |
| Quan hệ        | Giá gợi ý lấy từ UC-DM-03.                                  |
| Quy tắc        | BR04                                                        |

**Luồng chính**

1. Quản lý chọn loại Dish (khai vị, Dish chính, lẩu, tráng miệng, đồ uống...) hoặc tạo loại mới.
2. Quản lý nhập tên Dish, loại, mô tả, ảnh.
3. Hệ thống hiển thị giá gợi ý/Serving Table chuẩn từ định lượng (nếu có).
4. Quản lý chấp nhận giá gợi ý hoặc nhập giá bán khác.
5. Hệ thống lưu Dish ở trạng thái đang phục vụ.

**Luồng thay thế**

- 2a. Sửa Dish: đổi thông tin/giá; Contract đã chốt giữ giá cũ.
- 2b. Ngưng phục vụ: Dish ẩn khỏi tạm tính/Order mới; hệ thống liệt kê set chứa Dish để điều chỉnh (UC-DM-02).
- 3a. Dish chưa có định lượng: không có giá gợi ý, quản lý nhập giá tay.

**Ngoại lệ**

- 5e. Thiếu tên/loại hoặc giá không dương: không lưu.
- 5f. Xóa Dish/loại đã dùng trong Order hoặc Contract: chỉ cho ngưng, không xóa.

## UC-DM-02

| Trường         | Nội dung                                  |
| -------------- | ----------------------------------------- |
| Tên            | Quản lý Menu Set                      |
| Tác nhân       | Branch Manager                             |
| Mục tiêu       | Có set Dish gợi ý sẵn để Customer chọn nhanh. |
| Kích hoạt      | Tạo/sửa/ngưng set.                        |
| Tiền điều kiện | Có Dish đang phục vụ.                      |
| Hậu điều kiện  | Set cập nhật, giá set bằng tổng giá Dish.  |
| Quan hệ        | —                                         |
| Quy tắc        | BR04                                      |

**Luồng chính**

1. Quản lý nhập tên set, mô tả, Event Type phù hợp (tùy chọn).
2. Quản lý chọn các Dish đang phục vụ.
3. Hệ thống tính giá set/Serving Table chuẩn = tổng giá bán các Dish.
4. Quản lý lưu set ở trạng thái đang phục vụ.

**Luồng thay thế**

- 2a. Sửa set: thêm/bớt Dish, hệ thống tính lại giá.
- 2b. Ngưng set: ẩn khỏi tạm tính/Order mới.

**Ngoại lệ**

- 2e. Chọn Dish đã ngưng: không cho thêm.
- 4e. Set chứa Dish đã ngưng: không cho bật phục vụ tới khi bỏ Dish đó.

## UC-DM-03

| Trường         | Nội dung                                                         |
| -------------- | ---------------------------------------------------------------- |
| Tên            | Quản lý Ingredient và Recipe Quantity                            |
| Tác nhân       | Branch Manager                                                    |
| Mục tiêu       | Có Current Ingredient Price và công thức để tính giá gợi ý Dish. |
| Kích hoạt      | Thêm Ingredient, sửa giá, khai báo Recipe Quantity.              |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                         |
| Hậu điều kiện  | Ingredient, định lượng, giá gợi ý Dish được cập nhật.            |
| Quan hệ        | Giá Ingredient còn được cập nhật qua UC-KHO-04.                 |
| Quy tắc        | BR03, BR04, BR05                                                 |

**Luồng chính**

1. Quản lý nhập Ingredient: tên, đơn vị chuẩn, giá hiện hành/đơn vị.
2. Quản lý chọn Dish, thêm dòng định lượng: Ingredient, lượng cho một Serving Table chuẩn 10 người.
3. Hệ thống tính chi phí ước tính = Σ(lượng × giá hiện hành) và giá gợi ý = chi phí / Target Food Cost.
4. Hệ thống lưu định lượng, hiển thị giá gợi ý so với giá bán hiện tại.

**Luồng thay thế**

- 1a. Sửa giá Ingredient trực tiếp: hệ thống lưu giá mới, liệt kê Dish bị ảnh hưởng kèm giá gợi ý mới; quản lý chuyển UC-DM-01 nếu muốn đổi giá bán.
- 1b. Ngưng Ingredient: không dùng cho định lượng mới, giữ lịch sử.

**Ngoại lệ**

- 1e. Giá âm, thiếu đơn vị: không lưu.
- 2e. Lượng không dương hoặc Ingredient trùng trong cùng Dish: yêu cầu sửa.

## UC-DM-04

| Trường         | Nội dung                                                                      |
| -------------- | ----------------------------------------------------------------------------- |
| Tên            | Quản lý dịch vụ                                                               |
| Tác nhân       | Branch Manager                                                                 |
| Mục tiêu       | Duy trì dịch vụ kèm theo (dọn dẹp, karaoke, trang trí cổng...) để Customer chọn. |
| Kích hoạt      | Thêm/sửa/ngưng dịch vụ.                                                       |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                                      |
| Hậu điều kiện  | Dịch vụ dùng cho tạm tính/Order mới.                                            |
| Quan hệ        | —                                                                             |
| Quy tắc        | BR04                                                                          |

**Luồng chính**

1. Quản lý nhập tên, mô tả, đơn vị tính, đơn giá.
2. Hệ thống kiểm tra, lưu dịch vụ đang cung cấp.

**Luồng thay thế**

- 1a. Sửa đơn giá: chỉ áp dụng Order mới; Contract đã chốt giữ giá cũ.
- 1b. Ngưng dịch vụ: ẩn khỏi Order mới.

**Ngoại lệ**

- 2e. Thiếu tên hoặc đơn giá âm: không lưu.

## UC-DM-05

| Trường         | Nội dung                                                                          |
| -------------- | --------------------------------------------------------------------------------- |
| Tên            | Quản lý Catalog của Equipment                                                      |
| Tác nhân       | Branch Manager, Storekeeper                                                            |
| Mục tiêu       | Có định mức, tồn tối thiểu, dự trù, giá bồi thường để tính nhu cầu và bồi thường. |
| Kích hoạt      | Thêm/sửa/ngưng loại Equipment.                                                      |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                                          |
| Hậu điều kiện  | Loại Equipment dùng cho tính nhu cầu, xuất, thu hồi.                                |
| Quan hệ        | Lượng tồn tăng qua UC-KHO-05, không nhập ở đây.                                   |
| Quy tắc        | BR13                                                                              |

**Luồng chính**

1. Storekeeper nhập tên, đơn vị, cơ sở định mức (theo người / Setup Table / Meal), định mức.
2. Storekeeper nhập tồn tối thiểu, dự trù % (bỏ trống nếu không dự trù).
3. Branch Manager nhập/duyệt giá bồi thường.
4. Hệ thống kiểm tra, lưu.

**Luồng thay thế**

- 1a. Đồ cồng kềnh (rạp, loa...): không định mức, lượng nhập trực tiếp theo Meal.
- 1b. Ngưng loại Equipment: không dùng cho Meal mới.

**Ngoại lệ**

- 3e. Storekeeper sửa giá bồi thường: không có quyền.
- 4e. Định mức, dự trù, tồn tối thiểu hoặc giá âm: không lưu.

## UC-DM-06

| Trường         | Nội dung                                                           |
| -------------- | ------------------------------------------------------------------ |
| Tên            | Quản lý Event Type                                                  |
| Tác nhân       | Branch Manager                                                      |
| Mục tiêu       | Phân loại Order (cưới, sinh nhật, giỗ, tất niên...) để lọc, báo cáo. |
| Kích hoạt      | Thêm/sửa/ngưng Event Type.                                          |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                           |
| Hậu điều kiện  | Event Type dùng khi tạo Order và báo cáo.                             |
| Quan hệ        | —                                                                  |
| Quy tắc        | Ngoài phạm vi: đám tang, gợi ý Dish theo Event Type.                 |

**Luồng chính**

1. Quản lý nhập tên, mô tả Event Type.
2. Hệ thống kiểm tra trùng tên, lưu.

**Luồng thay thế**

- 1a. Ngưng Event Type: ẩn khỏi Order mới, giữ ở Order cũ.

**Ngoại lệ**

- 2e. Trùng tên: không lưu.

## UC-DM-07

| Trường         | Nội dung                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Tên            | Quản lý tham số nghiệp vụ                                                                           |
| Tác nhân       | Branch Manager                                                                                       |
| Mục tiêu       | Điều chỉnh tham số cho dữ liệu mới, không đổi cam kết đã chốt.                                      |
| Kích hoạt      | Cần đổi tỷ lệ/mốc.                                                                                  |
| Tiền điều kiện | Đã đăng nhập đúng quyền.                                                                            |
| Hậu điều kiện  | Tham số mới áp dụng từ thời điểm lưu.                                                               |
| Quan hệ        | —                                                                                                   |
| Quy tắc        | BR04, BR06, BR07, BR08, BR09, BR10, BR12. Ngày lễ/phụ thu lễ là danh sách cố định, không sửa ở đây. |

**Luồng chính**

1. Hệ thống hiển thị Catalog tham số nghiệp vụ toàn hệ thống kèm giá trị hiện hành:
   - _Tài chính & Giá_: Target Food Cost (mặc định 35%), Thuế suất VAT (8% hoặc 10%), Tỷ lệ Deposit tối thiểu (TS02 = 50%), Đơn vị làm tròn tiền (TS26 = 500 VNĐ).
   - _Quy mô & Thực đơn_: Ngưỡng khuyến nghị số Dish tự chọn (TS01 = 6), Số bàn tối thiểu (TS10 = 1). Bàn chuẩn 10 suất là cơ sở tính giá và định lượng, không phải ngưỡng số người nhập vào.
   - _Thời gian & Giữ chỗ_: Số ngày đặt trước [3, 90] ngày (TS08, TS09), Thời hạn giữ chỗ tạm (TS06 = 24h), Hiệu lực QR (TS07 = 15 phút), Hiệu lực snapshot giá (TS05 = 7 ngày).
   - _Điều chỉnh & Hủy_: Mốc đổi Dish (TS11 = 5 ngày), Mốc đổi bàn (TS12 = 3 ngày), Tỷ lệ giảm bàn tối đa (TS13 = 15%), Bảng bậc hoàn Deposit (TS14: $\ge 30$ ngày 100%, 15–<30 ngày 50%, <15 ngày 0%).
   - _Vận hành & Tài nguyên_: Bán kính phục vụ tham khảo chỉ hiển thị (TS17 = 20 km), Bán kính miễn phí vận chuyển (TS15 = 10 km, phụ phí TS16 = 15.000 đ/km vượt), Tỷ lệ dự trù Equipment (TS04 = 10%), Ngưỡng hao hụt miễn bồi thường (TS25 = 1%), Giờ có mặt trước tiệc (TS18 = 3h), Giờ cách ly vệ sinh Equipment (TS19 = 12h), Giờ làm tối đa/ngày (TS20 = 12h), Nghỉ giữa ca (TS21 = 8h), Định mức phục vụ ($\lceil \text{bàn}/3 \rceil$), Định mức bếp ($\max(2, \lceil \text{bàn}/5 \rceil)$), Số lần sai mật khẩu trước khi khóa (TS27 = 5 lần).
2. Quản lý sửa giá trị mong muốn.
3. Hệ thống kiểm tra miền giá trị hợp lệ, lưu giá trị mới kèm người sửa và thời điểm áp dụng; không thay đổi các Contract và cam kết đã chốt trước thời điểm lưu.

**Luồng thay thế**

- 2a. Sau chốt kỳ food cost: hệ thống gợi ý dùng Actual Food Cost làm mục tiêu; quản lý chấp nhận hoặc giữ.

**Ngoại lệ**

- 3e. Tỷ lệ ngoài (0, 100%], số âm, mốc thời gian không hợp lệ, hoặc vi phạm ngưỡng giới hạn an toàn: từ chối lưu, yêu cầu nhập lại.
