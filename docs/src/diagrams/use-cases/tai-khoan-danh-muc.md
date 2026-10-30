# Tài khoản và danh mục

## UC-TK-01

| Trường | Nội dung |
| --- | --- |
| Tên | Đăng ký tài khoản khách |
| Tác nhân | Khách hàng |
| Mục tiêu | Khách có tài khoản để tự đặt, xác nhận hợp đồng, xem lịch sử. |
| Kích hoạt | Khách chọn đăng ký. |
| Tiền điều kiện | Chưa đăng nhập. |
| Hậu điều kiện | Có tài khoản khách gắn đúng một hồ sơ khách theo SĐT. |
| Quan hệ | — |
| Quy tắc | BR02 |

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

## UC-TK-02

| Trường | Nội dung |
| --- | --- |
| Tên | Đăng nhập, đăng xuất, đổi mật khẩu |
| Tác nhân | Khách hàng, Nhân viên nội bộ |
| Mục tiêu | Truy cập chức năng theo vai trò của tài khoản. |
| Kích hoạt | Người dùng chọn đăng nhập/đăng xuất/đổi mật khẩu. |
| Tiền điều kiện | Có tài khoản đang hoạt động. |
| Hậu điều kiện | Phiên đăng nhập mang tập vai trò của tài khoản; hoặc phiên kết thúc. |
| Quan hệ | — |
| Quy tắc | BR02 |

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

- 2e. Sai SĐT/mật khẩu hoặc tài khoản bị khóa: báo lỗi chung, không tạo phiên.

## UC-TK-03

| Trường | Nội dung |
| --- | --- |
| Tên | Quản lý tài khoản nội bộ và phân quyền |
| Tác nhân | Quản lý cơ sở |
| Mục tiêu | Cấp, thu hồi quyền dùng chức năng nội bộ. |
| Kích hoạt | Có nhân viên cần tài khoản, đổi quyền, khóa hoặc đặt lại mật khẩu. |
| Tiền điều kiện | Quản lý đã đăng nhập. |
| Hậu điều kiện | Tài khoản và vai trò được cập nhật; thao tác sau kiểm tra theo vai trò mới. |
| Quan hệ | — |
| Quy tắc | BR02 |

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

## UC-DM-01

| Trường | Nội dung |
| --- | --- |
| Tên | Quản lý loại món và món ăn |
| Tác nhân | Quản lý cơ sở |
| Mục tiêu | Duy trì món đang phục vụ để khách chọn, tạm tính. |
| Kích hoạt | Thêm/sửa/ngưng món hoặc loại món. |
| Tiền điều kiện | Đã đăng nhập đúng quyền. |
| Hậu điều kiện | Món/loại món cập nhật, chỉ áp dụng cho tạm tính và đơn mới. |
| Quan hệ | Giá gợi ý lấy từ UC-DM-03. |
| Quy tắc | BR04 |

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

## UC-DM-02

| Trường | Nội dung |
| --- | --- |
| Tên | Quản lý set thực đơn |
| Tác nhân | Quản lý cơ sở |
| Mục tiêu | Có set món gợi ý sẵn để khách chọn nhanh. |
| Kích hoạt | Tạo/sửa/ngưng set. |
| Tiền điều kiện | Có món đang phục vụ. |
| Hậu điều kiện | Set cập nhật, giá set bằng tổng giá món. |
| Quan hệ | — |
| Quy tắc | BR04 |

**Luồng chính**

1. Quản lý nhập tên set, mô tả, loại tiệc phù hợp (tùy chọn).
2. Quản lý chọn các món đang phục vụ.
3. Hệ thống tính giá set/bàn ăn chuẩn = tổng giá bán các món.
4. Quản lý lưu set ở trạng thái đang phục vụ.

**Luồng thay thế**

- 2a. Sửa set: thêm/bớt món, hệ thống tính lại giá.
- 2b. Ngưng set: ẩn khỏi tạm tính/đơn mới.

**Ngoại lệ**

- 2e. Chọn món đã ngưng: không cho thêm.
- 4e. Set chứa món đã ngưng: không cho bật phục vụ tới khi bỏ món đó.

## UC-DM-03

| Trường | Nội dung |
| --- | --- |
| Tên | Quản lý nguyên liệu và định lượng món |
| Tác nhân | Quản lý cơ sở |
| Mục tiêu | Có giá nguyên liệu hiện hành và công thức để tính giá gợi ý món. |
| Kích hoạt | Thêm nguyên liệu, sửa giá, khai báo định lượng món. |
| Tiền điều kiện | Đã đăng nhập đúng quyền. |
| Hậu điều kiện | Nguyên liệu, định lượng, giá gợi ý món được cập nhật. |
| Quan hệ | Giá nguyên liệu còn được cập nhật qua UC-KHO-04. |
| Quy tắc | BR03, BR04, BR05 |

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

## UC-DM-04

| Trường | Nội dung |
| --- | --- |
| Tên | Quản lý dịch vụ |
| Tác nhân | Quản lý cơ sở |
| Mục tiêu | Duy trì dịch vụ kèm theo (dọn dẹp, karaoke, trang trí cổng...) để khách chọn. |
| Kích hoạt | Thêm/sửa/ngưng dịch vụ. |
| Tiền điều kiện | Đã đăng nhập đúng quyền. |
| Hậu điều kiện | Dịch vụ dùng cho tạm tính/đơn mới. |
| Quan hệ | — |
| Quy tắc | BR04 |

**Luồng chính**

1. Quản lý nhập tên, mô tả, đơn vị tính, đơn giá.
2. Hệ thống kiểm tra, lưu dịch vụ đang cung cấp.

**Luồng thay thế**

- 1a. Sửa đơn giá: chỉ áp dụng đơn mới; hợp đồng đã chốt giữ giá cũ.
- 1b. Ngưng dịch vụ: ẩn khỏi đơn mới.

**Ngoại lệ**

- 2e. Thiếu tên hoặc đơn giá âm: không lưu.

## UC-DM-05

| Trường | Nội dung |
| --- | --- |
| Tên | Quản lý danh mục dụng cụ |
| Tác nhân | Quản lý cơ sở, Thủ kho |
| Mục tiêu | Có định mức, tồn tối thiểu, dự trù, giá bồi thường để tính nhu cầu và bồi thường. |
| Kích hoạt | Thêm/sửa/ngưng loại dụng cụ. |
| Tiền điều kiện | Đã đăng nhập đúng quyền. |
| Hậu điều kiện | Loại dụng cụ dùng cho tính nhu cầu, xuất, thu hồi. |
| Quan hệ | Lượng tồn tăng qua UC-KHO-05, không nhập ở đây. |
| Quy tắc | BR13 |

**Luồng chính**

1. Thủ kho nhập tên, đơn vị, cơ sở định mức (theo người / bàn bố trí / bữa), định mức.
2. Thủ kho nhập tồn tối thiểu, dự trù % (bỏ trống nếu không dự trù).
3. Quản lý cơ sở nhập/duyệt giá bồi thường.
4. Hệ thống kiểm tra, lưu.

**Luồng thay thế**

- 1a. Đồ cồng kềnh (rạp, loa...): không định mức, lượng nhập trực tiếp theo bữa.
- 1b. Ngưng loại dụng cụ: không dùng cho bữa mới.

**Ngoại lệ**

- 3e. Thủ kho sửa giá bồi thường: không có quyền.
- 4e. Định mức, dự trù, tồn tối thiểu hoặc giá âm: không lưu.

## UC-DM-06

| Trường | Nội dung |
| --- | --- |
| Tên | Quản lý loại tiệc |
| Tác nhân | Quản lý cơ sở |
| Mục tiêu | Phân loại đơn (cưới, sinh nhật, giỗ, tất niên...) để lọc, báo cáo. |
| Kích hoạt | Thêm/sửa/ngưng loại tiệc. |
| Tiền điều kiện | Đã đăng nhập đúng quyền. |
| Hậu điều kiện | Loại tiệc dùng khi tạo đơn và báo cáo. |
| Quan hệ | — |
| Quy tắc | Ngoài phạm vi: đám tang, gợi ý món theo loại tiệc. |

**Luồng chính**

1. Quản lý nhập tên, mô tả loại tiệc.
2. Hệ thống kiểm tra trùng tên, lưu.

**Luồng thay thế**

- 1a. Ngưng loại tiệc: ẩn khỏi đơn mới, giữ ở đơn cũ.

**Ngoại lệ**

- 2e. Trùng tên: không lưu.

## UC-DM-07

| Trường | Nội dung |
| --- | --- |
| Tên | Quản lý tham số nghiệp vụ |
| Tác nhân | Quản lý cơ sở |
| Mục tiêu | Điều chỉnh tham số cho dữ liệu mới, không đổi cam kết đã chốt. |
| Kích hoạt | Cần đổi tỷ lệ/mốc. |
| Tiền điều kiện | Đã đăng nhập đúng quyền. |
| Hậu điều kiện | Tham số mới áp dụng từ thời điểm lưu. |
| Quan hệ | — |
| Quy tắc | BR04, BR06, BR07, BR08, BR09, BR10, BR12. Ngày lễ/phụ thu lễ là danh sách cố định, không sửa ở đây. |

**Luồng chính**

1. Hệ thống hiển thị tham số hiện hành: food cost mục tiêu, thuế, phạm vi km, hạn giữ chỗ, % cọc tối thiểu, mốc đổi món/bàn, % giảm bàn tối đa, bậc hoàn, tỷ lệ người phục vụ/bàn.
2. Quản lý sửa giá trị.
3. Hệ thống kiểm tra miền giá trị, lưu kèm người sửa, thời điểm áp dụng.

**Luồng thay thế**

- 2a. Sau chốt kỳ food cost: hệ thống gợi ý dùng food cost thực tế làm mục tiêu; quản lý chấp nhận hoặc giữ.

**Ngoại lệ**

- 3e. Tỷ lệ ngoài (0, 100%], số âm, mốc không hợp lệ: không lưu.
