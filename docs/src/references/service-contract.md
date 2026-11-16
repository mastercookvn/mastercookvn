---
order: 10
---

# Nội dung Contract dịch vụ tiệc lưu động

Tài liệu này mô tả nội dung Contract dùng trong đề tài. Dữ liệu từng Contract lấy từ hồ sơ Booking; không nhập lại qua một biểu mẫu riêng.

Quy tắc nghiệp vụ làm gốc nằm trong [đặc tả phần mềm](../specification.md). Contract đã xác nhận phải giữ nội dung và giá đã chốt; thay đổi Catalog về sau không sửa Contract cũ.

## 1. Các bên và phạm vi dịch vụ

Bên cung cấp là cơ sở MasterCookVN. Bên Booking là Customer được ghi nhận bằng họ tên, số điện thoại và thông tin liên hệ trong hồ sơ Contract.

Một Contract có thể gồm nhiều Meal. Mỗi Meal xác định riêng:

- Ngày giờ bắt đầu, kết thúc và địa điểm tổ chức.
- Thông tin Site Survey, điều kiện phục vụ và người liên hệ.
- Số Serving Table chuẩn 10 suất và Menu đã chọn.
- Số Tables and Chairs bố trí đồng thời, Equipment và dịch vụ đi kèm.
- Đơn giá, phụ thu, tổng giá trị và phần Deposit phân bổ.

Số Serving Table là căn cứ tính Menu và định lượng theo bàn chuẩn 10 suất, không phụ thuộc số người thực tế ngồi mỗi bàn. Số Tables and Chairs là số lượng bố trí phục vụ tại địa điểm; hai số lượng này có thể khác nhau khi phục vụ cuốn chiếu.

Cơ sở cung cấp Dish và các dịch vụ đã ghi trong Contract tại địa điểm của Customer; không cung cấp mặt bằng tổ chức.

## 2. Giá trị và đơn giá

Giá trị mỗi Meal gồm tiền Menu theo số Serving Table, tiền dịch vụ, phí vận chuyển theo khoảng cách khảo sát và phụ thu đã thống nhất. Contract thể hiện cách tính từng khoản và tổng giá trị các Meal.

Giá Dish, dịch vụ, phụ thu và đơn giá bồi thường Equipment được lưu theo nội dung đã chốt. Hệ thống không tự tăng giá Contract khi giá Ingredient hoặc giá Catalog thay đổi.

Site Survey có thể làm phát sinh khoản phụ thu; khoản này phải được thể hiện trước khi Customer xác nhận Contract.

Quy tắc tính giá và làm tròn tham chiếu BR04 trong đặc tả phần mềm.

## 3. Xác nhận Contract và đặt Deposit

Customer có Account xem Contract và xác nhận đồng ý trên hệ thống. Customer không có Account ký bản giấy tại quầy; Staff Member chụp hoặc quét bản đã ký và upload vào hồ sơ Contract.

Hồ sơ lưu cách xác nhận, thời điểm xác nhận và người ghi nhận. Bản Contract đã xác nhận là căn cứ cho các bước thực hiện tiếp theo.

Khoản Deposit tối thiểu bằng 50% giá trị Contract. Customer có thể thực hiện Payment trước từ mức tối thiểu đến 100% giá trị Contract bằng tiền mặt hoặc Payment online.

Contract có hiệu lực khi đã được xác nhận và hệ thống ghi nhận đủ Deposit bắt buộc. Việc ký Contract không tự thay thế xác nhận đã nhận tiền.

Sau khi Order được xác nhận, hệ thống giữ chỗ chờ Deposit trong 24 giờ. Quá hạn chưa đáp ứng điều kiện ký và Deposit thì hết hạn giữ chỗ, giải phóng nguồn lực theo BR07–BR08.

Deposit bắt buộc ban đầu được phân bổ cho từng Meal bằng 50% giá trị Meal đó. Phần Customer trả vượt được ghi nhận là tiền trả trước. Sau điều chỉnh, Deposit bổ sung áp dụng theo BR09; không tự yêu cầu bổ sung cho mọi thay đổi nhỏ. Khi hủy, căn cứ áp tỷ lệ hoàn là mức nhỏ hơn giữa 50% giá trị Meal hiện hành và tiền đã thu còn phân bổ cho Meal; phần vượt căn cứ này hoàn đủ.

## 4. Điều chỉnh nội dung trước tiệc

Mỗi yêu cầu điều chỉnh phải xác định rõ Meal bị thay đổi và nội dung trước, sau. Các Meal còn lại tiếp tục thực hiện theo Contract đã chốt.

Customer được đổi Dish đã chọn nếu thông báo trước giờ bắt đầu Meal ít nhất 5 ngày. Việc đổi Dish không làm tăng số Dish; không thêm Dish mới ngoài phạm vi điều chỉnh này. Chênh lệch giá được ghi nhận trong nội dung điều chỉnh.

Customer được tăng hoặc giảm số Serving Table nếu thông báo trước giờ bắt đầu Meal ít nhất 3 ngày. Tổng số Serving Table giảm không vượt quá 15% số Serving Table ký ban đầu của Meal đó.

Tăng số Serving Table chỉ được chấp nhận khi còn đủ Service Capacity. Khi tăng trên 3 Serving Table, Customer đặt Deposit bổ sung bằng 50% giá trị phần tăng theo BR09.

Khoản Deposit đã thu được giữ để đối trừ khi Settlement; trường hợp cần hoàn được ghi nhận riêng. Mọi điều chỉnh giá trị phải lưu lại nội dung và xác nhận của hai bên.

Không dời ngày tiệc. Không xử lý yêu cầu thêm Dish, thêm Serving Table hoặc thêm dịch vụ trong khi Meal đang diễn ra.

## 5. Hủy Meal và xử lý tiền đã trả

Customer có thể hủy từng Meal hoặc toàn bộ Contract. Thời hạn hủy của từng Meal tính từ thời điểm yêu cầu hủy được ghi nhận đến giờ bắt đầu Meal đó, theo BR10.

| Thời điểm hủy                           | Hoàn phần Deposit bắt buộc của Meal  |
| --------------------------------------- | ------------------------------- |
| Chưa Deposit                                | Hủy miễn phí, ngay lập tức      |
| Còn ít nhất 30 ngày                     | 100%; phí xử lý mặc định bằng 0 |
| Còn từ 15 đến dưới 30 ngày              | 50%                             |
| Còn dưới 15 ngày                        | 0%                              |
| Sau giờ bắt đầu hoặc Customer không có mặt | 0%                              |

Tiền Customer trả trước vượt phần Deposit bắt buộc của Meal bị hủy được hoàn đủ. Tổng tiền hoàn của Contract bằng tổng tiền hoàn tính riêng cho từng Meal bị hủy.

Với trường hợp sau giờ bắt đầu hoặc Customer không có mặt, chi phí Ingredient đã chế biến chỉ được thu thêm khi có nội dung thỏa thuận và số tiền được ghi nhận rõ. Không tự cộng trùng khoản đã nằm trong nghĩa vụ Payment của Customer.

Staff Member thực hiện Refund ngoài hệ thống, sau đó ghi nhận giao dịch hoàn và upload bằng chứng. Hồ sơ thể hiện số tiền phải hoàn và số tiền đã hoàn; không cần tạo mẫu phiếu hoàn riêng trong phần mềm.

## 6. Equipment và bồi thường

Danh sách Equipment cùng đơn giá bồi thường là một phần nội dung được Customer biết khi xác nhận Contract.

Sau Meal, Staff Member đối chiếu số lượng xuất với số lượng thu hồi nguyên vẹn, hư hỏng và thất lạc. Equipment hư hoặc mất không được tính là còn khả dụng.

Staff Member ghi nhận số lượng hư hoặc mất do Customer chịu trách nhiệm và quyết định khoản nào yêu cầu bồi thường theo thỏa thuận với Customer. Tiền bồi thường dựa trên số lượng đó và đơn giá đã chốt; không tự áp ngưỡng hao hụt phần trăm.

Hư hỏng do Staff Member không tính cho Customer và không xử lý khấu trừ lương trên hệ thống.

## 7. Settlement và hoàn tất

Mỗi Meal có số liệu phục vụ, thu hồi Equipment và khoản bồi thường riêng. Settlement Contract tổng hợp các Meal còn hiệu lực, điều chỉnh đã xác nhận và các khoản phải trả hoặc phải hoàn của Meal bị hủy.

Giao dịch Deposit, Deposit bổ sung, Payment cuối và Refund cùng liên kết với Contract. Hệ thống chỉ đối trừ một lần các khoản đã thu; khoản hoàn đã thực hiện được tính đúng chiều tiền chi ra theo BR11.

Customer thực hiện Payment đủ số còn phải trả bằng tiền mặt hoặc online. Staff Member ghi nhận khoản tiền mặt đã nhận; khoản online được xác nhận theo kết quả Payment.

Contract hoàn tất khi các Meal đã thực hiện hoặc hủy, Equipment đã được đối chiếu và các khoản thu, hoàn đã xử lý xong. Không đóng Contract khi còn khoản phải thu hoặc phải hoàn; không có nghiệp vụ cho Customer mua chịu.

## 8. Nội dung đính kèm

Hồ sơ Contract lưu nội dung từng Meal, danh sách Dish và dịch vụ, khảo sát, đơn giá bồi thường, các điều chỉnh đã xác nhận và bằng chứng ký hoặc Refund nếu có.

Customer chuẩn bị mặt bằng và điều kiện phục vụ theo kết quả khảo sát. Các trao đổi chuẩn bị thực hiện qua điện thoại hoặc Zalo ngoài hệ thống.

Các tình huống cơ sở không thể thực hiện được hai bên giải quyết theo nội dung Contract và trao đổi trực tiếp; đề tài không xây thêm quy trình phê duyệt hoặc bồi thường riêng cho trường hợp này.
