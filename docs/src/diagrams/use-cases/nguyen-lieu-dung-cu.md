# Nguyên liệu và dụng cụ

Các quy tắc dẫn mã BR được duy trì tại [đặc tả](../../specification.md). [Danh mục UC](../index.md) là chỉ mục duy nhất.

## UC-KHO-01

| Trường | Nội dung |
| --- | --- |
| ID | UC-KHO-01 |
| Tên | Ghi nhận nhập nguyên liệu |
| Mô tả | Lưu lượng và giá mua để tổng hợp nhập kỳ, food cost và đề xuất giá. |
| Tác nhân | Thủ kho |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Nguyên liệu được mua/nhận. |
| Điều kiện trước | Có danh mục nguyên liệu và đơn vị chuẩn. |
| Luồng chính | Nhập ngày, tên/SĐT nhà cung cấp, nguyên liệu, lượng, đơn giá; tính thành tiền; lưu để tổng hợp nhập tháng và đề xuất giá. |
| Luồng thay thế | Mua tại chợ: ghi tên Chợ hoặc tên chợ cụ thể. |
| Ngoại lệ | Lượng không dương, giá âm hoặc sai đơn vị: không lưu; kỳ đã chốt cần mở lại trước sửa. |
| Điều kiện sau | Phiếu nhập đã ghi, không bắt buộc gắn một tiệc. |
| Quy tắc | BR05, BR06 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-KHO-02

| Trường | Nội dung |
| --- | --- |
| ID | UC-KHO-02 |
| Tên | Kiểm kê, chốt tồn và food cost tháng |
| Mô tả | Chốt lượng kiểm kê thực tế cuối kỳ để tính tiêu thụ và food cost theo tháng. |
| Tác nhân | Thủ kho, Kế toán |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Đến cuối tháng cần chốt số liệu. |
| Điều kiện trước | Đã có tồn đầu và phiếu nhập kỳ; các bữa thực hiện có tiền món xác định. |
| Luồng chính | Thủ kho nhập lượng tồn thực tế; tính giá tồn bình quân, chi phí tiêu thụ, doanh thu món, food cost; kế toán kiểm tra và chốt kỳ. |
| Luồng thay thế | Tháng đầu nhập tồn ban đầu; doanh thu 0 hiển thị chưa xác định; quản lý cân nhắc mục tiêu tháng sau. |
| Ngoại lệ | Tồn cuối vượt nguồn hoặc dữ liệu chưa đủ: chưa chốt; sửa kỳ cũ phải chốt lại kỳ sau bị ảnh hưởng. |
| Điều kiện sau | Lưu tồn cuối, chi phí và food cost theo tháng; làm tồn đầu kỳ sau. |
| Quy tắc | BR06, BR11 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-KHO-03

| Trường | Nội dung |
| --- | --- |
| ID | UC-KHO-03 |
| Tên | Xem và xử lý đề xuất giá tháng |
| Mô tả | Đưa giá mua gần đây thành đề xuất để con người quyết định giá nguyên liệu và giá món. |
| Tác nhân | Quản lý cơ sở |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Cron hoặc server phát hiện tháng này chưa có đợt; quản lý mở đợt để xử lý. |
| Điều kiện trước | Có lịch sử nhập để tính; tác vụ server không phải actor người dùng. |
| Luồng chính | Tạo duy nhất một đợt tháng với giá gợi ý có trọng số; quản lý xem từng dòng, chấp nhận/chỉnh/bỏ qua; cập nhật giá nguyên liệu; liệt kê món bị ảnh hưởng để quyết định giá món. |
| Luồng thay thế | Cron không chạy: lần kiểm tra server đầu tiên tạo bù cùng mốc đầu tháng. Không có nhập: giữ giá. |
| Ngoại lệ | Hai lần gọi đồng thời chỉ tạo một đợt; xử lý lại dòng không được tự cập nhật giá lần nữa. |
| Điều kiện sau | Đợt và quyết định từng dòng lưu; giá bán chỉ đổi khi được chọn. |
| Quy tắc | BR04, BR05, BR06 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-KHO-04

| Trường | Nội dung |
| --- | --- |
| ID | UC-KHO-04 |
| Tên | Nhập mua dụng cụ |
| Mô tả | Ghi nhận mua mới để tăng số dụng cụ sở hữu và sẵn sàng. |
| Tác nhân | Thủ kho |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Mua thêm dụng cụ cho kho. |
| Điều kiện trước | Có danh mục dụng cụ. |
| Luồng chính | Nhập nhà cung cấp dạng trường, ngày, loại, lượng và giá; lưu; tăng lượng sở hữu/sẵn sàng. |
| Luồng thay thế | Nhập khi dưới tồn tối thiểu; không ép mua lượng tối thiểu cố định. |
| Ngoại lệ | Lượng không dương hoặc giá âm: không lưu. |
| Điều kiện sau | Dụng cụ mới khả dụng, lưu lịch sử nhập. |
| Quy tắc | BR13 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-KHO-05

| Trường | Nội dung |
| --- | --- |
| ID | UC-KHO-05 |
| Tên | Lập và xác nhận xuất dụng cụ |
| Mô tả | Ghi lượng dụng cụ thực tế rời kho cho một bữa làm căn cứ thu hồi. |
| Tác nhân | Thủ kho |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Chuẩn bị một bữa đã xác nhận. |
| Điều kiện trước | Có hợp đồng hiệu lực và nhu cầu/đặt giữ cho bữa. |
| Luồng chính | Tính lượng theo định mức/dự trù; điều chỉnh lượng thực xuất; kiểm tra kho và giữ của bữa khác; lập phiếu; xác nhận xuất; chuyển lượng sẵn sàng sang đang sử dụng. |
| Luồng thay thế | Đồ cồng kềnh nhập lượng trực tiếp theo bữa. |
| Ngoại lệ | Thiếu lượng thực tế: báo thiếu; không xuất âm kho; xác nhận lại không trừ hai lần. |
| Điều kiện sau | Có phiếu xuất để kiểm đếm, đặt giữ vẫn bao phủ khoảng sử dụng. |
| Quy tắc | BR07, BR13 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-KHO-06

| Trường | Nội dung |
| --- | --- |
| ID | UC-KHO-06 |
| Tên | Thu hồi, kiểm đếm và bồi thường |
| Mô tả | Đối chiếu dụng cụ trở về, loại hư/mất khỏi khả dụng và tính khoản khách chịu. |
| Tác nhân | Thủ kho |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Bữa tiệc đã kết thúc. |
| Điều kiện trước | Có phiếu đã xuất. |
| Luồng chính | Nhập thu hồi tốt, hư, mất; chọn số khách chịu; tính bồi thường giá chốt; xác nhận; cộng tốt vào sẵn sàng, hư vào không khả dụng, mất giảm sở hữu; nhả giữ; chuyển quyết toán. |
| Luồng thay thế | Không yêu cầu bồi thường: số khách chịu bằng 0; không xử lý trừ lương. |
| Ngoại lệ | Tốt+hư+mất khác lượng xuất hoặc khách chịu vượt hư+mất: không xác nhận; không cộng thu hồi lặp. |
| Điều kiện sau | Kiểm đếm hoàn tất, tiền bồi thường làm đầu vào quyết toán. |
| Quy tắc | BR11, BR13 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |

## UC-KHO-07

| Trường | Nội dung |
| --- | --- |
| ID | UC-KHO-07 |
| Tên | Cập nhật phục hồi hoặc loại bỏ dụng cụ hư |
| Mô tả | Phản ánh dụng cụ hư đã dùng lại được hoặc đã bị loại khỏi sở hữu. |
| Tác nhân | Thủ kho |
| Ưu tiên | Cốt lõi |
| Kích hoạt | Có dụng cụ hư cần cập nhật khả dụng. |
| Điều kiện trước | Có lượng hư trong kho. |
| Luồng chính | Chọn loại và lượng; ghi phục hồi hoặc loại bỏ; phục hồi chuyển sang sẵn sàng, loại bỏ giảm sở hữu; lưu lý do. |
| Luồng thay thế | Không theo dõi quy trình sửa chữa hoặc chi phí chi tiết. |
| Ngoại lệ | Không xử lý quá lượng hư đang có. |
| Điều kiện sau | Lượng khả dụng phản ánh đúng dụng cụ dùng được. |
| Quy tắc | BR13 |
| Phi chức năng | Theo mục 7 của đặc tả; kiểm tra quyền phía server. |
