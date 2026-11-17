---
order: 10
---

# Use Case Specifications

## UC-TK-01: Register customer account {#uc-tk-01}

| Field          | Content                                                       |
| -------------- | ------------------------------------------------------------- |
| Name           | Register customer account                                     |
| Tên tiếng Việt | Đăng ký tài khoản khách                                       |
| Actor          | Customer                                                      |
| Goal           | Khách có tài khoản để tự đặt, xác nhận hợp đồng, xem lịch sử. |
| Trigger        | Khách chọn đăng ký.                                           |
| Preconditions  | Chưa đăng nhập.                                               |
| Postconditions | Có tài khoản khách gắn đúng một hồ sơ khách theo SĐT.         |
| Relationships  | —                                                             |
| Rules          | BR02                                                          |

**Luồng chính**

1. Khách nhập họ tên, SĐT, mật khẩu.
2. Hệ thống chuẩn hóa SĐT, kiểm tra SĐT chưa có tài khoản.
3. Hệ thống tìm hồ sơ khách theo SĐT; không có thì tạo hồ sơ mới.
4. Hệ thống tạo tài khoản, băm mật khẩu, liên kết hồ sơ.
5. Hệ thống đăng nhập khách, hiển thị đơn/hợp đồng của hồ sơ.

**Luồng thay thế**

- 3a. Đã có hồ sơ do tư vấn đặt hộ: liên kết hồ sơ đó, không tạo mới; khách thấy ngay đơn/hợp đồng chờ xác nhận.

**Ngoại lệ**

- 2e. SĐT sai định dạng hoặc đã có tài khoản: báo lỗi, không tạo.

## UC-TK-02: Sign in, sign out and change password {#uc-tk-02}

| Field          | Content                                                              |
| -------------- | -------------------------------------------------------------------- |
| Name           | Sign in, sign out and change password                                |
| Tên tiếng Việt | Đăng nhập, đăng xuất, đổi mật khẩu                                   |
| Actor          | Customer, Internal staff                                             |
| Goal           | Truy cập chức năng theo vai trò của tài khoản.                       |
| Trigger        | Người dùng chọn đăng nhập/đăng xuất/đổi mật khẩu.                    |
| Preconditions  | Có tài khoản đang hoạt động.                                         |
| Postconditions | Phiên đăng nhập mang tập vai trò của tài khoản; hoặc phiên kết thúc. |
| Relationships  | —                                                                    |
| Rules          | BR02                                                                 |

**Luồng chính**

1. Người dùng nhập SĐT, mật khẩu.
2. Hệ thống chuẩn hóa SĐT, kiểm tra mật khẩu và trạng thái tài khoản.
3. Hệ thống tạo phiên với hợp các vai trò được gán.
4. Hệ thống chuyển tới trang theo vai trò (khách: hồ sơ của tôi; nội bộ: dashboard).

**Luồng thay thế**

- 1a. Đổi mật khẩu: đã đăng nhập; nhập mật khẩu cũ, mới; hệ thống kiểm tra mật khẩu cũ, lưu mật khẩu mới.
- 1b. Đăng xuất: hệ thống hủy phiên.
- 1c. Quên mật khẩu: liên hệ nhân viên ngoài hệ thống, quản lý đặt lại qua UC-TK-03; không OTP/email.

**Ngoại lệ**

- 2e. Sai SĐT/mật khẩu hoặc tài khoản bị khóa: báo lỗi chung, không tạo phiên. Quá 5 lần nhập sai liên tiếp (TS27): hệ thống tạm khóa tài khoản để bảo mật.

## UC-TK-03: Manage internal accounts and permissions {#uc-tk-03}

| Field          | Content                                                                     |
| -------------- | --------------------------------------------------------------------------- |
| Name           | Manage internal accounts and permissions                                    |
| Tên tiếng Việt | Quản lý tài khoản nội bộ và phân quyền                                      |
| Actor          | Branch manager                                                              |
| Goal           | Cấp, thu hồi quyền dùng chức năng nội bộ.                                   |
| Trigger        | Có nhân viên cần tài khoản, đổi quyền, khóa hoặc đặt lại mật khẩu.          |
| Preconditions  | Quản lý đã đăng nhập.                                                       |
| Postconditions | Tài khoản và vai trò được cập nhật; thao tác sau kiểm tra theo vai trò mới. |
| Relationships  | —                                                                           |
| Rules          | BR02                                                                        |

**Luồng chính**

1. Quản lý mở danh sách tài khoản, tìm theo tên/SĐT.
2. Quản lý chọn tạo mới, nhập họ tên, SĐT, mật khẩu tạm.
3. Quản lý chọn một hoặc nhiều vai trò: Tư vấn, Kế toán, Thủ kho, Quản lý nhân sự, Quản lý cơ sở.
4. Hệ thống kiểm tra SĐT, lưu tài khoản và gán vai trò.

**Luồng thay thế**

- 2a. Sửa tài khoản có sẵn: đổi thông tin/vai trò, lưu.
- 2b. Khóa/mở khóa: tài khoản khóa không đăng nhập được, giữ lịch sử thao tác.
- 2c. Đặt lại mật khẩu: nhập mật khẩu tạm mới, báo nhân viên ngoài hệ thống.

**Ngoại lệ**

- 4e. SĐT đã thuộc tài khoản khác: không tạo trùng; mở tài khoản đó để thêm vai trò.
- 4f. Tự gỡ vai trò Quản lý cơ sở của tài khoản quản lý cuối cùng: từ chối.

## UC-DM-01: Manage dish categories and dishes {#uc-dm-01}

| Field          | Content                                                     |
| -------------- | ----------------------------------------------------------- |
| Name           | Manage dish categories and dishes                           |
| Tên tiếng Việt | Quản lý loại món và món ăn                                  |
| Actor          | Branch manager                                              |
| Goal           | Duy trì món đang phục vụ để khách chọn, tạm tính.           |
| Trigger        | Thêm/sửa/ngưng món hoặc loại món.                           |
| Preconditions  | Đã đăng nhập đúng quyền.                                    |
| Postconditions | Món/loại món cập nhật, chỉ áp dụng cho tạm tính và đơn mới. |
| Relationships  | Giá gợi ý lấy từ UC-DM-03.                                  |
| Rules          | BR04                                                        |

**Luồng chính**

1. Quản lý chọn loại món (khai vị, món chính, lẩu, tráng miệng, đồ uống...) hoặc tạo loại mới.
2. Quản lý nhập tên món, loại, mô tả, ảnh.
3. Hệ thống hiển thị giá gợi ý/bàn ăn chuẩn từ định lượng (nếu có).
4. Quản lý chấp nhận giá gợi ý hoặc nhập giá bán khác.
5. Hệ thống lưu món ở trạng thái đang phục vụ.

**Luồng thay thế**

- 2a. Sửa món: đổi thông tin/giá; hợp đồng đã chốt giữ giá cũ.
- 2b. Ngưng phục vụ: món ẩn khỏi tạm tính/đơn mới; hệ thống liệt kê set chứa món để điều chỉnh (UC-DM-02).
- 3a. Món chưa có định lượng: không có giá gợi ý, quản lý nhập giá tay.

**Ngoại lệ**

- 5e. Thiếu tên/loại hoặc giá không dương: không lưu.
- 5f. Xóa món/loại đã dùng trong đơn hoặc hợp đồng: chỉ cho ngưng, không xóa.

## UC-DM-02: Manage menu sets {#uc-dm-02}

| Field          | Content                                   |
| -------------- | ----------------------------------------- |
| Name           | Manage menu sets                          |
| Tên tiếng Việt | Quản lý set thực đơn                      |
| Actor          | Branch manager                            |
| Goal           | Có set món gợi ý sẵn để khách chọn nhanh. |
| Trigger        | Tạo/sửa/ngưng set.                        |
| Preconditions  | Có món đang phục vụ.                      |
| Postconditions | Set cập nhật, giá set bằng tổng giá món.  |
| Relationships  | —                                         |
| Rules          | BR04                                      |

**Luồng chính**

1. Quản lý nhập tên set, mô tả.
2. Quản lý chọn các món đang phục vụ.
3. Hệ thống tính giá set/bàn ăn chuẩn = tổng giá bán các món.
4. Quản lý lưu set ở trạng thái đang phục vụ.

**Luồng thay thế**

- 2a. Sửa set: thêm/bớt món, hệ thống tính lại giá.
- 2b. Ngưng set: ẩn khỏi tạm tính/đơn mới.

**Ngoại lệ**

- 2e. Chọn món đã ngưng: không cho thêm.
- 4e. Set chứa món đã ngưng: không cho bật phục vụ tới khi bỏ món đó.

## UC-DM-03: Manage ingredients and recipes {#uc-dm-03}

| Field          | Content                                                          |
| -------------- | ---------------------------------------------------------------- |
| Name           | Manage ingredients and recipes                                   |
| Tên tiếng Việt | Quản lý nguyên liệu và định lượng món                            |
| Actor          | Branch manager                                                   |
| Goal           | Có giá nguyên liệu hiện hành và công thức để tính giá gợi ý món. |
| Trigger        | Thêm nguyên liệu, sửa giá, khai báo định lượng món.              |
| Preconditions  | Đã đăng nhập đúng quyền.                                         |
| Postconditions | Nguyên liệu, định lượng, giá gợi ý món được cập nhật.            |
| Relationships  | Giá nguyên liệu còn được cập nhật qua UC-KHO-04.                 |
| Rules          | BR03, BR04, BR05                                                 |

**Luồng chính**

1. Quản lý nhập nguyên liệu: tên, đơn vị chuẩn, giá hiện hành/đơn vị.
2. Quản lý chọn món, thêm dòng định lượng: nguyên liệu, lượng cho một bàn ăn chuẩn 10 người.
3. Hệ thống tính chi phí ước tính = Σ(lượng × giá hiện hành) và giá gợi ý = chi phí / food cost mục tiêu.
4. Hệ thống lưu định lượng, hiển thị giá gợi ý so với giá bán hiện tại.

**Luồng thay thế**

- 1a. Sửa giá nguyên liệu trực tiếp: hệ thống lưu giá mới, liệt kê món bị ảnh hưởng kèm giá gợi ý mới; quản lý chuyển UC-DM-01 nếu muốn đổi giá bán.
- 1b. Ngưng nguyên liệu: không dùng cho định lượng mới, giữ lịch sử.

**Ngoại lệ**

- 1e. Giá âm, thiếu đơn vị: không lưu.
- 2e. Lượng không dương hoặc nguyên liệu trùng trong cùng món: yêu cầu sửa.

## UC-DM-04: Manage services {#uc-dm-04}

| Field          | Content                                                                       |
| -------------- | ----------------------------------------------------------------------------- |
| Name           | Manage services                                                               |
| Tên tiếng Việt | Quản lý dịch vụ                                                               |
| Actor          | Branch manager                                                                |
| Goal           | Duy trì dịch vụ kèm theo (dọn dẹp, karaoke, trang trí cổng...) để khách chọn. |
| Trigger        | Thêm/sửa/ngưng dịch vụ.                                                       |
| Preconditions  | Đã đăng nhập đúng quyền.                                                      |
| Postconditions | Dịch vụ dùng cho tạm tính/đơn mới.                                            |
| Relationships  | —                                                                             |
| Rules          | BR04                                                                          |

**Luồng chính**

1. Quản lý nhập tên, mô tả, đơn vị tính, đơn giá.
2. Hệ thống kiểm tra, lưu dịch vụ đang cung cấp.

**Luồng thay thế**

- 1a. Sửa đơn giá: chỉ áp dụng đơn mới; hợp đồng đã chốt giữ giá cũ.
- 1b. Ngưng dịch vụ: ẩn khỏi đơn mới.

**Ngoại lệ**

- 2e. Thiếu tên hoặc đơn giá âm: không lưu.

## UC-DM-05: Manage equipment catalog {#uc-dm-05}

| Field          | Content                                                                           |
| -------------- | --------------------------------------------------------------------------------- |
| Name           | Manage equipment catalog                                                          |
| Tên tiếng Việt | Quản lý danh mục dụng cụ                                                          |
| Actor          | Branch manager, Storekeeper                                                       |
| Goal           | Có định mức, tồn tối thiểu, dự trù, giá bồi thường để tính nhu cầu và bồi thường. |
| Trigger        | Thêm/sửa/ngưng loại dụng cụ.                                                      |
| Preconditions  | Đã đăng nhập đúng quyền.                                                          |
| Postconditions | Loại dụng cụ dùng cho tính nhu cầu, xuất, thu hồi.                                |
| Relationships  | Lượng tồn tăng qua UC-KHO-05, không nhập ở đây.                                   |
| Rules          | BR13                                                                              |

**Luồng chính**

1. Thủ kho nhập tên, đơn vị, cơ sở định mức (theo người / bàn bố trí / bữa), định mức.
2. Thủ kho nhập tồn tối thiểu, dự trù % (bỏ trống dùng TS04, mặc định 10%; nhập 0 nếu không dự trù).
3. Quản lý cơ sở nhập/duyệt giá bồi thường.
4. Hệ thống kiểm tra, lưu.

**Luồng thay thế**

- 1a. Đồ cồng kềnh (rạp, loa...): không định mức, lượng nhập trực tiếp theo bữa.
- 1b. Ngưng loại dụng cụ: không dùng cho bữa mới.

**Ngoại lệ**

- 3e. Thủ kho sửa giá bồi thường: không có quyền.
- 4e. Định mức, dự trù, tồn tối thiểu hoặc giá âm: không lưu.

## UC-DM-07: Manage business settings {#uc-dm-07}

| Field          | Content                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Name           | Manage business settings                                                                            |
| Tên tiếng Việt | Quản lý tham số nghiệp vụ                                                                           |
| Actor          | Branch manager                                                                                      |
| Goal           | Điều chỉnh tham số cho dữ liệu mới, không đổi cam kết đã chốt.                                      |
| Trigger        | Cần đổi tỷ lệ/mốc.                                                                                  |
| Preconditions  | Đã đăng nhập đúng quyền.                                                                            |
| Postconditions | Tham số mới áp dụng từ thời điểm lưu.                                                               |
| Relationships  | —                                                                                                   |
| Rules          | BR04, BR06, BR07, BR08, BR09, BR10, BR12. Ngày lễ/phụ thu lễ là danh sách cố định, không sửa ở đây. |

**Luồng chính**

1. Hệ thống hiển thị danh mục tham số nghiệp vụ toàn hệ thống kèm giá trị hiện hành:
   - _Tài chính & Giá_: Food cost mục tiêu (mặc định 35%), Thuế suất VAT theo cấu hình, Tỷ lệ cọc tối thiểu/tối đa (TS02 = 50%, TS03 = 100%), Đơn vị làm tròn tiền (TS26 = 500 VNĐ).
   - _Quy mô & Thực đơn_: Ngưỡng khuyến nghị số món tự chọn (TS01 = 6), Số bàn tối thiểu (TS10 = 1). Bàn chuẩn 10 suất là cơ sở tính giá và định lượng, không phải ngưỡng số người nhập vào.
   - _Thời gian & Giữ chỗ_: Số ngày đặt trước [3, 90] ngày (TS08, TS09), Thời hạn giữ chỗ tạm (TS06 = 24h), Hiệu lực QR (TS07 = 15 phút), Hiệu lực snapshot giá (TS05 = 7 ngày).
   - _Điều chỉnh & Hủy_: Mốc đổi món (TS11 = 5 ngày), Mốc đổi bàn (TS12 = 3 ngày), Tỷ lệ giảm bàn tối đa (TS13 = 15%), Bảng bậc hoàn cọc (TS14: $\ge 30$ ngày 100%, 15–<30 ngày 50%, <15 ngày 0%).
   - _Vận hành & Tài nguyên_: Bán kính phục vụ tham khảo chỉ hiển thị (TS17 = 20 km), Bán kính miễn phí vận chuyển (TS15 = 10 km, phụ phí TS16 = 15.000 đ/km vượt), Tỷ lệ dự trù dụng cụ (TS04 = 10%), Ngưỡng hao hụt miễn bồi thường (TS25 = 1%), Giờ có mặt trước tiệc (TS18 = 3h), Giờ cách ly vệ sinh dụng cụ (TS19 = 12h), Giờ làm tối đa/ngày (TS20 = 12h), Nghỉ giữa ca (TS21 = 8h), Định mức phục vụ (TS22: $\lceil \text{bàn bố trí}/3 \rceil$), Định mức bếp (TS23: $\max(2, \lceil \text{bàn ăn}/5 \rceil)$), Định mức vận chuyển (TS24: 2 người / 10 bàn có rạp), Số lần sai mật khẩu trước khi khóa (TS27 = 5 lần).
2. Quản lý sửa giá trị mong muốn.
3. Hệ thống kiểm tra miền giá trị hợp lệ, lưu giá trị mới kèm người sửa và thời điểm áp dụng; không thay đổi các hợp đồng và cam kết đã chốt trước thời điểm lưu.

**Luồng thay thế**

- 2a. Sau chốt kỳ food cost: hệ thống gợi ý dùng food cost thực tế làm mục tiêu; quản lý chấp nhận hoặc giữ.

**Ngoại lệ**

- 3e. Giá trị ngoài miền của tham số, số âm hoặc mốc thời gian không hợp lệ: từ chối lưu. Food cost mục tiêu phải dương; thuế suất, dự trù và ngưỡng miễn bồi thường được phép bằng 0; cọc tối thiểu không vượt cọc tối đa; ngày đặt trước tối thiểu không vượt tối đa.
