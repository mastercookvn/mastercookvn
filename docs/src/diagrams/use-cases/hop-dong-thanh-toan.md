# Hợp đồng và thanh toán

Các quy tắc dẫn mã BR được duy trì tại [đặc tả](../../specification.md). [Danh mục UC](../index.md) là chỉ mục duy nhất.

## UC-HD-01

| Trường | Nội dung |
| --- | --- |
| ID | UC-HD-01 |
| Tên | Xác nhận hợp đồng |
| Mô tả | Lưu sự đồng ý của khách với bản nội dung hợp đồng đã chốt. |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Hợp đồng đã phát hành. |
| Điều kiện trước | Hợp đồng còn hạn ký/cọc; có bản nội dung chốt. |
| Luồng chính | Khách xem nội dung và xác nhận online; lưu tài khoản, thời điểm và bản nội dung; kiểm tra điều kiện hiệu lực cùng tiền cọc. |
| Luồng thay thế | Ký tại quầy: tư vấn upload bản ký giấy, ghi người ký/thời điểm; không cần tài khoản khách. |
| Ngoại lệ | Chưa có file ký giấy thì không ghi đã ký theo phương thức giấy. Hết hạn: xử lý theo BR07. |
| Điều kiện sau | Đã lưu xác nhận; có hiệu lực nếu đủ cọc. |
| Quy tắc | BR02, BR07, BR08 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-HD-02

| Trường | Nội dung |
| --- | --- |
| ID | UC-HD-02 |
| Tên | Thu cọc và ghi nhận thanh toán |
| Mô tả | Ghi tiền thực nhận và phân bổ theo bữa để xác định cọc hoặc số dư. |
| Tác nhân | Khách hàng, Kế toán, Dịch vụ thanh toán |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Cần thanh toán cọc hoặc phần còn lại. |
| Điều kiện trước | Có hợp đồng và số tiền cần thu. |
| Luồng chính | Lập yêu cầu thu; hiển thị thông tin/QR; nhận kết quả dịch vụ; ghi giao dịch thành công, phân bổ theo bữa; tính lại số dư và hiệu lực. |
| Luồng thay thế | Tiền mặt/chuyển khoản ngoài luồng: kế toán xác nhận thực thu, nhập giao dịch và phân bổ. |
| Ngoại lệ | Thông báo lặp không cộng tiền hai lần; chưa đủ cọc không kích hoạt; hết hạn không tự khôi phục chỗ, chuyển kế toán xử lý tiền đã nhận. |
| Điều kiện sau | Tiền thu lưu đúng một lần; đủ ký và cọc thì giữ chỗ chính thức. |
| Quy tắc | BR01, BR07, BR08, BR11 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-HD-03

| Trường | Nội dung |
| --- | --- |
| ID | UC-HD-03 |
| Tên | Điều chỉnh một bữa bằng phụ lục |
| Mô tả | Ghi thay đổi một bữa bằng phụ lục mà không sửa đè hợp đồng gốc. |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Khách yêu cầu đổi món hoặc bàn ăn. |
| Điều kiện trước | Hợp đồng hiệu lực, bữa chưa diễn ra. |
| Luồng chính | Chọn bữa; kiểm tra hạn, giới hạn giảm; kiểm tra tài nguyên nếu tăng; tính chênh lệch/cọc bổ sung; lập phụ lục; khách xác nhận; đủ điều kiện thì cập nhật bữa và đặt giữ. |
| Luồng thay thế | Ký giấy rồi upload; giảm làm dư cọc được đối trừ khi quyết toán. |
| Ngoại lệ | Dời ngày, thêm món mới, quá hạn hoặc tăng vượt năng lực: từ chối nội dung đó; không sửa trực tiếp bản ký. |
| Điều kiện sau | Phụ lục được lưu, các bữa khác giữ nguyên. |
| Quy tắc | BR09 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-HD-04

| Trường | Nội dung |
| --- | --- |
| ID | UC-HD-04 |
| Tên | Hủy từng bữa hoặc cả hợp đồng |
| Mô tả | Chấm dứt phục vụ các bữa được chọn và tính nghĩa vụ hoàn theo thời điểm yêu cầu. |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Khách yêu cầu hủy hoặc ghi nhận không có mặt. |
| Điều kiện trước | Có đơn/bữa chưa hoàn tất; không hủy giữa lúc đang phục vụ. |
| Luồng chính | Chọn bữa; lưu thời điểm yêu cầu; tính bậc hoàn và tiền trả trước; hiển thị kết quả; xác nhận hủy; nhả tài nguyên, hủy phân công; tạo nghĩa vụ hoàn. |
| Luồng thay thế | Chưa cọc hủy miễn phí ngay. Hủy toàn hợp đồng: tổng hợp từng bữa, giữ quyết toán bữa đã thực hiện. |
| Ngoại lệ | Không lấy thời điểm nhân viên xử lý để đổi bậc hoàn; không hoàn vượt tiền đã thu. |
| Điều kiện sau | Bữa hủy, tiền cần hoàn/giữ lại được ghi; hợp đồng còn bữa khác vẫn tiếp tục. |
| Quy tắc | BR01, BR10, BR11 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-HD-05

| Trường | Nội dung |
| --- | --- |
| ID | UC-HD-05 |
| Tên | Ghi nhận hoàn tiền và bằng chứng |
| Mô tả | Theo dõi khoản đã trả lại khách bằng giao dịch và bằng chứng riêng. |
| Tác nhân | Kế toán |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Có tiền phải hoàn do hủy hoặc quyết toán dư. |
| Điều kiện trước | Có số dư hoàn được xác định. |
| Luồng chính | Xem khoản phải hoàn; thực hiện tiền mặt/chuyển khoản ngoài hệ thống; ghi giao dịch hoàn, phân bổ bữa, đính kèm bằng chứng; tính lại số dư. |
| Luồng thay thế | Có thể ghi nhiều khoản hoàn nhưng chỉ đóng khi đủ. |
| Ngoại lệ | Tiền hoàn vượt số phải hoàn hoặc giao dịch đã ghi: không ghi thêm. |
| Điều kiện sau | Có số tiền đã hoàn và lịch sử chứng từ. |
| Quy tắc | BR10, BR11 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-HD-06

| Trường | Nội dung |
| --- | --- |
| ID | UC-HD-06 |
| Tên | Quyết toán bữa và hoàn tất hợp đồng |
| Mô tả | Đối trừ tiền đúng một lần và đóng hồ sơ khi mọi nghĩa vụ đã xử lý. |
| Tác nhân | Kế toán, Khách hàng |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Bữa phục vụ xong, kiểm đếm hoàn tất. |
| Điều kiện trước | Có giá trị hiện hành và bồi thường; bữa hủy dùng nghĩa vụ hủy. |
| Luồng chính | Tổng hợp tiền bữa, phụ lục, bồi thường, thu và hoàn; tính số dư; thu/hoàn; đóng bữa khi đủ; đóng hợp đồng khi tất cả bữa đủ điều kiện. |
| Luồng thay thế | Số dư âm chuyển UC-HD-05; hợp đồng còn bữa tương lai tiếp tục hoạt động. |
| Ngoại lệ | Chưa thu/hoàn đủ hoặc chưa kiểm đếm: không đóng; không tạo công nợ trả chậm. |
| Điều kiện sau | Số dư bằng 0, bữa/hợp đồng hoàn tất đúng điều kiện. |
| Quy tắc | BR01, BR11, BR13 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |
