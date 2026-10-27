# Tài khoản và danh mục

Các quy tắc dẫn mã BR được duy trì tại [đặc tả](../../specification.md). [Danh mục UC](../index.md) là chỉ mục duy nhất.

## UC-TK-01

| Trường | Nội dung |
| --- | --- |
| ID | UC-TK-01 |
| Tên | Đăng ký, đăng nhập và hồ sơ khách |
| Mô tả | Cho khách truy cập đơn đặt hộ và các lần đặt của mình qua hồ sơ liên kết SĐT. |
| Tác nhân | Khách hàng |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Khách đăng ký hoặc cần truy cập hồ sơ. |
| Điều kiện trước | Có SĐT; đăng nhập cần tài khoản đang hoạt động. |
| Luồng chính | Nhập SĐT và mật khẩu; chuẩn hóa SĐT; tạo tài khoản nếu đăng ký; liên kết hồ sơ cùng SĐT; hiển thị đơn/hợp đồng của khách. |
| Luồng thay thế | Nhân viên đã đặt hộ: liên kết hồ sơ có sẵn, không tạo khách trùng. Khách không đăng ký: tiếp tục ký tại quầy. |
| Ngoại lệ | SĐT đã có tài khoản hoặc sai mật khẩu: báo lỗi, không tạo trùng. |
| Điều kiện sau | Khách được truy cập đúng hồ sơ liên kết. |
| Quy tắc | BR02 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-TK-02

| Trường | Nội dung |
| --- | --- |
| ID | UC-TK-02 |
| Tên | Quản lý tài khoản nội bộ và quyền |
| Mô tả | Cấp hoặc thu hồi quyền dùng chức năng nội bộ theo vai trò. |
| Tác nhân | Quản lý cơ sở |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Cần tạo/khóa tài khoản hoặc đổi quyền. |
| Điều kiện trước | Quản lý đăng nhập. |
| Luồng chính | Tìm tài khoản; nhập SĐT, thông tin và vai trò; lưu; server kiểm tra quyền cho các thao tác sau. |
| Luồng thay thế | Có thể gán nhiều vai trò; hồ sơ nhân viên có thể không có tài khoản. Đặt lại mật khẩu khi được yêu cầu hỗ trợ. |
| Ngoại lệ | SĐT trùng: dùng tài khoản hiện có, không tạo bản thứ hai. |
| Điều kiện sau | Tài khoản và tập quyền được cập nhật. |
| Quy tắc | BR02 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-DM-01

| Trường | Nội dung |
| --- | --- |
| ID | UC-DM-01 |
| Tên | Quản lý món và set thực đơn |
| Mô tả | Duy trì món và set đang phục vụ để khách tham khảo, chọn và tạm tính. |
| Tác nhân | Quản lý cơ sở |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Cần cập nhật món/set. |
| Điều kiện trước | Đã đăng nhập đúng quyền. |
| Luồng chính | Quản lý loại món, tên, mô tả, ảnh, giá bán; chọn món cho set; tính giá set bằng tổng món; lưu hoặc ngưng phục vụ. |
| Luồng thay thế | Xem giá gợi ý từ định lượng trước khi quyết định giá bán. |
| Ngoại lệ | Món đã dùng trong hợp đồng không xóa cứng; set có món ngưng cần điều chỉnh trước khi nhận đơn mới. |
| Điều kiện sau | Danh mục dùng cho tạm tính/đặt mới được cập nhật. |
| Quy tắc | BR04 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-DM-02

| Trường | Nội dung |
| --- | --- |
| ID | UC-DM-02 |
| Tên | Quản lý nguyên liệu và định lượng món |
| Mô tả | Lưu công thức cho bàn ăn chuẩn để ước tính chi phí và gợi ý giá bán. |
| Tác nhân | Quản lý cơ sở |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Cần tạo nguyên liệu hoặc công thức món. |
| Điều kiện trước | Có món để khai báo định lượng. |
| Luồng chính | Khai báo nguyên liệu, đơn vị chuẩn, giá hiện hành; nhập lượng cho từng món/bàn ăn chuẩn; tính chi phí ước tính và giá bán gợi ý. |
| Luồng thay thế | Quản lý sửa giá trực tiếp, hệ thống liệt kê món bị ảnh hưởng. |
| Ngoại lệ | Lượng âm, trùng nguyên liệu trong công thức hoặc đơn vị không thống nhất: yêu cầu sửa. |
| Điều kiện sau | Định lượng và giá tham khảo được lưu. |
| Quy tắc | BR03, BR04, BR05 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-DM-03

| Trường | Nội dung |
| --- | --- |
| ID | UC-DM-03 |
| Tên | Quản lý dịch vụ và dụng cụ |
| Mô tả | Duy trì dịch vụ và định mức dụng cụ, không quản lý nhà cung cấp độc lập. |
| Tác nhân | Quản lý cơ sở, Thủ kho |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Cần cập nhật danh mục dịch vụ/dụng cụ. |
| Điều kiện trước | Có quyền với danh mục tương ứng. |
| Luồng chính | Nhập dịch vụ, đơn giá; nhập dụng cụ, đơn vị, định mức, dự trù tùy chọn, tồn tối thiểu và giá bồi thường; lưu. |
| Luồng thay thế | Dụng cụ cồng kềnh nhập nhu cầu trực tiếp theo bữa; dự trù trống tương đương 0%. |
| Ngoại lệ | Dự trù/giá/lượng âm: không lưu. Thủ kho chỉ quản lý dụng cụ, quản lý cơ sở quản lý cả dịch vụ và giá. |
| Điều kiện sau | Danh mục được dùng cho đơn mới và lập nhu cầu dụng cụ. |
| Quy tắc | BR04, BR13 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-DM-04

| Trường | Nội dung |
| --- | --- |
| ID | UC-DM-04 |
| Tên | Quản lý tham số nghiệp vụ |
| Mô tả | Điều chỉnh tham số cho dữ liệu mới, giữ nguyên cam kết đã chốt. |
| Tác nhân | Quản lý cơ sở |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Cần thay tỷ lệ/mốc hoặc thông tin cấu hình. |
| Điều kiện trước | Đã đăng nhập đúng quyền. |
| Luồng chính | Xem giá trị hiện hành; thay food cost mục tiêu, thuế hoặc tham số được phép; ghi thời điểm áp dụng; lưu. |
| Luồng thay thế | Ngày lễ/phụ thu dùng danh sách cố định, không tạo danh mục quản lý riêng. |
| Ngoại lệ | Food cost mục tiêu không trong khoảng lớn hơn 0 đến 100%: không lưu. |
| Điều kiện sau | Tham số dùng cho dữ liệu mới, không đổi cam kết cũ. |
| Quy tắc | BR04, BR06, BR08, BR09, BR10 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |
