# Nội dung hợp đồng dịch vụ tiệc lưu động

Tài liệu này mô tả nội dung hợp đồng dùng trong đề tài. Dữ liệu từng hợp đồng lấy từ hồ sơ đặt tiệc; không nhập lại qua một biểu mẫu riêng.

Quy tắc nghiệp vụ làm gốc nằm trong [đặc tả phần mềm](../specification.md). Hợp đồng đã xác nhận phải giữ nội dung và giá đã chốt; thay đổi danh mục về sau không sửa hợp đồng cũ.

## 1. Các bên và phạm vi dịch vụ

Bên cung cấp là cơ sở MasterCookVN. Bên đặt tiệc là khách hàng được ghi nhận bằng họ tên, số điện thoại và thông tin liên hệ trong hồ sơ hợp đồng.

Một hợp đồng có thể gồm nhiều bữa tiệc. Mỗi bữa xác định riêng:

- Ngày giờ bắt đầu, kết thúc và địa điểm tổ chức.
- Thông tin khảo sát địa điểm, điều kiện phục vụ và người liên hệ.
- Số bàn ăn, số người trên một bàn ăn và thực đơn đã chọn.
- Số bàn ghế bố trí đồng thời, dụng cụ và dịch vụ đi kèm.
- Đơn giá, phụ thu, tổng giá trị và phần cọc phân bổ.

Số bàn ăn là căn cứ tính thực đơn. Số bàn ghế là số lượng bố trí phục vụ tại địa điểm; hai số lượng này có thể khác nhau khi phục vụ cuốn chiếu.

Cơ sở cung cấp món ăn và các dịch vụ đã ghi trong hợp đồng tại địa điểm của khách; không cung cấp mặt bằng tổ chức.

## 2. Giá trị và đơn giá

Giá trị mỗi bữa gồm tiền thực đơn theo số bàn ăn, tiền dịch vụ và phụ thu đã thống nhất. Hợp đồng thể hiện cách tính từng khoản và tổng giá trị các bữa.

Giá món, dịch vụ, phụ thu và đơn giá bồi thường dụng cụ được lưu theo nội dung đã chốt. Hệ thống không tự tăng giá hợp đồng khi giá nguyên liệu hoặc giá danh mục thay đổi.

Khảo sát địa điểm có thể làm phát sinh khoản phụ thu; khoản này phải được thể hiện trước khi khách xác nhận hợp đồng.

Quy tắc tính giá và làm tròn tham chiếu BR04 trong đặc tả phần mềm.

## 3. Xác nhận hợp đồng và đặt cọc

Khách có tài khoản xem hợp đồng và xác nhận đồng ý trên hệ thống. Khách không có tài khoản ký bản giấy tại quầy; nhân viên chụp hoặc quét bản đã ký và upload vào hồ sơ hợp đồng.

Hồ sơ lưu cách xác nhận, thời điểm xác nhận và người ghi nhận. Bản hợp đồng đã xác nhận là căn cứ cho các bước thực hiện tiếp theo.

Khoản cọc tối thiểu bằng 50% giá trị hợp đồng. Khách có thể thanh toán trước từ mức tối thiểu đến 100% giá trị hợp đồng bằng tiền mặt hoặc thanh toán online.

Hợp đồng có hiệu lực khi đã được xác nhận và hệ thống ghi nhận đủ cọc bắt buộc. Việc ký hợp đồng không tự thay thế xác nhận đã nhận tiền.

Sau khi đơn được xác nhận, hệ thống giữ chỗ chờ cọc trong 24 giờ. Quá hạn chưa đáp ứng điều kiện ký và cọc thì hết hạn giữ chỗ, giải phóng nguồn lực theo BR07–BR08.

Cọc bắt buộc ban đầu được phân bổ cho từng bữa bằng 50% giá trị bữa đó. Phần khách trả vượt được ghi nhận là tiền trả trước. Sau điều chỉnh, cọc bổ sung áp dụng theo BR09; không tự yêu cầu bổ sung cho mọi thay đổi nhỏ. Khi hủy, căn cứ áp tỷ lệ hoàn là mức nhỏ hơn giữa 50% giá trị bữa hiện hành và tiền đã thu còn phân bổ cho bữa; phần vượt căn cứ này hoàn đủ.

## 4. Điều chỉnh nội dung trước tiệc

Mỗi yêu cầu điều chỉnh phải xác định rõ bữa bị thay đổi và nội dung trước, sau. Các bữa còn lại tiếp tục thực hiện theo hợp đồng đã chốt.

Khách được đổi món đã chọn nếu thông báo trước giờ bắt đầu bữa ít nhất 5 ngày. Việc đổi món không làm tăng số món; không thêm món mới ngoài phạm vi điều chỉnh này. Chênh lệch giá được ghi nhận trong nội dung điều chỉnh.

Khách được tăng hoặc giảm số bàn ăn nếu thông báo trước giờ bắt đầu bữa ít nhất 3 ngày. Tổng số bàn ăn giảm không vượt quá 15% số bàn ăn ký ban đầu của bữa đó.

Tăng số bàn ăn chỉ được chấp nhận khi còn đủ khả năng phục vụ. Khi tăng trên 3 bàn ăn, khách đặt cọc bổ sung bằng 50% giá trị phần tăng theo BR09.

Khoản cọc đã thu được giữ để đối trừ khi quyết toán; trường hợp cần hoàn được ghi nhận riêng. Mọi điều chỉnh giá trị phải lưu lại nội dung và xác nhận của hai bên.

Không dời ngày tiệc. Không xử lý yêu cầu thêm món, thêm bàn ăn hoặc thêm dịch vụ trong khi bữa tiệc đang diễn ra.

## 5. Hủy bữa tiệc và xử lý tiền đã trả

Khách có thể hủy từng bữa hoặc toàn bộ hợp đồng. Thời hạn hủy của từng bữa tính từ thời điểm yêu cầu hủy được ghi nhận đến giờ bắt đầu bữa đó, theo BR10.

| Thời điểm hủy | Hoàn phần cọc bắt buộc của bữa |
| --- | --- |
| Chưa cọc | Hủy miễn phí, ngay lập tức |
| Còn ít nhất 30 ngày | 100%; phí xử lý mặc định bằng 0 |
| Còn từ 15 đến dưới 30 ngày | 50% |
| Còn dưới 15 ngày | 0% |
| Sau giờ bắt đầu hoặc khách không có mặt | 0% |

Tiền khách trả trước vượt phần cọc bắt buộc của bữa bị hủy được hoàn đủ. Tổng tiền hoàn của hợp đồng bằng tổng tiền hoàn tính riêng cho từng bữa bị hủy.

Với trường hợp sau giờ bắt đầu hoặc khách không có mặt, chi phí nguyên liệu đã chế biến chỉ được thu thêm khi có nội dung thỏa thuận và số tiền được ghi nhận rõ. Không tự cộng trùng khoản đã nằm trong nghĩa vụ thanh toán của khách.

Nhân viên thực hiện hoàn tiền ngoài hệ thống, sau đó ghi nhận giao dịch hoàn và upload bằng chứng. Hồ sơ thể hiện số tiền phải hoàn và số tiền đã hoàn; không cần tạo mẫu phiếu hoàn riêng trong phần mềm.

## 6. Dụng cụ và bồi thường

Danh sách dụng cụ cùng đơn giá bồi thường là một phần nội dung được khách biết khi xác nhận hợp đồng.

Sau bữa tiệc, nhân viên đối chiếu số lượng xuất với số lượng thu hồi nguyên vẹn, hư hỏng và thất lạc. Dụng cụ hư hoặc mất không được tính là còn khả dụng.

Nhân viên ghi nhận số lượng hư hoặc mất do khách chịu trách nhiệm và quyết định khoản nào yêu cầu bồi thường theo thỏa thuận với khách. Tiền bồi thường dựa trên số lượng đó và đơn giá đã chốt; không tự áp ngưỡng hao hụt phần trăm.

Hư hỏng do nhân viên không tính cho khách và không xử lý khấu trừ lương trên hệ thống.

## 7. Quyết toán và hoàn tất

Mỗi bữa có số liệu phục vụ, thu hồi dụng cụ và khoản bồi thường riêng. Quyết toán hợp đồng tổng hợp các bữa còn hiệu lực, điều chỉnh đã xác nhận và các khoản phải trả hoặc phải hoàn của bữa bị hủy.

Giao dịch cọc, cọc bổ sung, thanh toán cuối và hoàn tiền cùng liên kết với hợp đồng. Hệ thống chỉ đối trừ một lần các khoản đã thu; khoản hoàn đã thực hiện được tính đúng chiều tiền chi ra theo BR11.

Khách thanh toán đủ số còn phải trả bằng tiền mặt hoặc online. Nhân viên ghi nhận khoản tiền mặt đã nhận; khoản online được xác nhận theo kết quả thanh toán.

Hợp đồng hoàn tất khi các bữa đã thực hiện hoặc hủy, dụng cụ đã được đối chiếu và các khoản thu, hoàn đã xử lý xong. Không đóng hợp đồng khi còn khoản phải thu hoặc phải hoàn; không có nghiệp vụ cho khách mua chịu.

## 8. Nội dung đính kèm

Hồ sơ hợp đồng lưu nội dung từng bữa, danh sách món và dịch vụ, khảo sát, đơn giá bồi thường, các điều chỉnh đã xác nhận và bằng chứng ký hoặc hoàn tiền nếu có.

Khách chuẩn bị mặt bằng và điều kiện phục vụ theo kết quả khảo sát. Các trao đổi chuẩn bị thực hiện qua điện thoại hoặc Zalo ngoài hệ thống.

Các tình huống cơ sở không thể thực hiện được hai bên giải quyết theo nội dung hợp đồng và trao đổi trực tiếp; đề tài không xây thêm quy trình phê duyệt hoặc bồi thường riêng cho trường hợp này.
