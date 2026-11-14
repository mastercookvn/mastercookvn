# MasterCookVN - 2026-10-24

## Deferred - Phát triển trong tương lai

- Mở rộng scope ra không chuẩn bị món ăn, chỉ phục vụ dịch vụ
- Mở rộng scope, cho thuê dụng cụ (bàn ghế rạp) không đặt món
- Tiệc nhiều session, nhiều ngày, hợp đồng giải quyết như nào
- UC-CS-04, Nhắc khách đặt lại (đám giỗ năm sau, sinh nhật, tất niên năm sau)

## Out of scope

1. Thử món trước khi đặt
2. Khuyến mãi
3. Nguyên liệu nhập vào không nhất thiết ràng buộc cho 1 tiệc. Dư thì hiển nhiên dùng cho tiệc khác.
   1. Việc thiếu nguyên liệu hay không, không track trên hệ thống mà đầu bếp sẽ kiểm tra và lên yêu cầu mua / nhập nguyên liệu
4. Không xét khách vãng lai (có hợp đồng, khách nên được ghi nhận trong hệ thống)
5. Không phức tạp hoá loại khách hàng (chia cá nhân, doanh nghiệp)
6. Các tác nhân như scheduler, weather forecast chỉ trong báo cáo, không implement code
7. Không tính chấm công, đánh giá performance nhân viên
8. Không xét nghiệp kiểm tra chất nguyên liệu
9. Không mail, chỉ trao đổi với khách, nhân viên qua gọi điện, Zalo (ngoài hệ thống)
10. Không xét sử dụng web offline
11. Khong nhập căn cước công dân
12. Không có cụ thể hoá / suggest tuỳ vào loại tiệc (không mâm cúng)
13. Không phức tạp hoá việc quản lý dụng cụ đến mức có serial
14. Không support đám tang
15. ~~Không xét trường hợp khách đến từ từ, (đám tang nhiều ngày)~~
16. Không xét tiệc mà không xác định số lượng khách
17. Không xét cảnh báo tài khoản khách hàng, bùng cọc
18. Không xét chất lượng cho dụng cụ / nguyên liệu nhập vào
19. Nhân viên không xét nghỉ phép, người quản lý sẽ sắp xếp nhân sự khi cần
20. Không xét hao hụt sơ chế

## Use case skip

- UC-TK-10
- UC-DM-10
- UC-DM-12, không biết quản lý ngày đặc biệt thì ảnh hưởng gì
- UC-DM-13
- UC-DM-17
- UC-DM-18
- UC-DT-09
- UC-DT-16 không giảm giá
- UC-DT-17 không thử món
- UC-VH-07 Nhân viên xác nhận / từ chối ca, sử dụng Zalo, gọi điện để nhờ manager thay đổi
- UC-VH-10, UC-VH-11? Khoan, chưa rõ lắm, tại sao cần use case này? bỏ được không
- UC-eeêVH-12 không giải quyết các vấn đề phát sinh từ khách (thêm người, thêm bàn... đặt thêm món khi đã diễn ra tiệc, không xét phụ phí thêm thời gian). Không xét bia dư, dư thì khác mang về. Không xét phụ phí thêm khung giờ khác nhau
- UC-VH-15 không nhắc lịch, không cần email
- UC-KHO-06
- UC-KHO-07
- UC-KHO-11
- UC-KHO-13 hơi khó hiểu nha, cân nhắc
- UC-NS-* làm đơn giản hoá, vì mình sẽ giao tiếp nhân sự qua Zalo. Skip sức khoẻ, chi trả lương trên app khác.
- UC-CS-04, 5, 6
- UC-BC-03, không cho khách hàng nợ. Không xét công nợ
- UC-BC-07 cân nhắc, vì đã bỏ một số nghiệp vụ
- UC-BC-09
- UC-BC-10
- UC-BC-13 (defer)
- JOB-03
- JOB-\*, việc nhắc (khách, nhân viên) không thực hiện, vì không sử dụng email trong hệ thống. Hệ thống nên có trang thống kê để hiện thị warning trên cột.
- UC-CS-03
- UC-CS-04 không cần nhắc đặt lại

Một số use case mà AI cần tự skip nếu thấy phức tạp

## ==Hasn't been resolved==

1. Quản lý vận hành là role đéo gì

---

## Decision

- Các dụng cụ (bàn ghế đũa,...) sẽ có trường `soLuongToiThieu`, nếu dưới ngưỡng, hệ thống sẽ cảnh báo, yêu cầu nhập thêm
- Có feedback, không bắt buộc sau mỗi tiệc. Đối tượng là người đặt tiệc?
- Dùng https://lichta.zeforc.com/ cho lịch âm dương datetime picker
- ==khách hàng có thể đăng nhập để xem lịch sử đặt. Khách đăng nhập bằng số điện thoại?==
- ==Hieenj trạng==, design model kiểu gì (có thể là một trường ghi chú thôi). Ảnh hưởng đến giá
- ==Khảo sát hiện trạng, tự dưới 20 km==, làm sao biết xx km mà reject
- Không mention về các đối tác, thuê bên ngoài (cho các loại dịch vụ, assume là mình tự cung cấp)
- Khảo sát địa điểm nên là Q&A với khách hàng thôi, không cần làm phức tạp hệ thống xử lý
- Ngày lễ đặc biệt phụ thu sẽ hard code, không dùng thư viện ngoài. So với lịch âm
- Một tiệc có địa điểm dù là chung, nhưng vẫn sẽ cần khảo sát khác nhau. Không chung record trong database
- Cần mention về flow thời hạn cọc trong quy trình đặt tiệc (diagram?)
- Cần xác định mẫu hợp đồng, phụ lục đi kèm (dời, huỷ)
- Không phức tạp hoá về xác nhận OTP
- Không xét quản lý vận hành approve request. Vì nó làm phức tạp hoá hệ thống, nhiều model hơn
- Cọc được phép >= 50%

### Số lượng bàn ghế không bằng số lượng bàn ăn

Hợp đồng cần chỉ rõ. Đặt tiệc cuốn chiếu.

- Bàn ăn sẽ ảnh hưởng đến số lượng món ăn.
- Bàn ghế -> xác định số lượng nhân viên cần phục vụ (1 nhân viên phục vụ 3 bàn)

### Mối quan hệ giữa nguyên liệu nhập, và món ăn ra

Một nguyên liệu nhập vào sẽ có đơn giá tiền trên một đơn vị tính. Khi tạo 1 tiệc, dựa vào đơn giá đó, thành phần nguyên liệu của món ăn mà hình thành nên giá, không xét trừ vào số lượng tổng của kho.

Quản lý số lượng kho không nằm trong scope của phần mềm, mà do con người, nhân viên tự cảm giác thiếu mà nhập nguyên liệu thêm.

Trong trường hợp giá nguyên liệu thay đổi theo thời gian (mùa rẻ, mùa đắt): Sau khi nhập nguyên liệu, hệ thống sẽ đối chiếu với giá của nguyên liệu trong hệ thống hiện tại, nếu khác, thì indicate / suggest có thể cập nhật giá

Giá trị suggest được tính bằng tổng các lần nhập (dựa trên phiếu), tính cả số lượng

Nhập ở chợ (không tên) cũng có thể là một loại nhà cung cấp (ví dụ: `Chợ`, hoặc một vài chợ có tên).

### Cách tính giá của một nguyên liệu

Cứ đầu mỗi tháng, hệ thống sẽ tính công thức cho toàn bộ nguyên liệu (cron). Xét một nguyên liệu, trong tháng vừa qua (thực chất là xét 30 ngày vừa qua), nếu có các record nhập nguyên liệu, mình sẽ có hệ số cho mỗi mốc 10 ngày (`1.5` x2, `2` lần lượt theo thứ tự tháng tăng dần)

### Công thức tính ra food cost

```
3.3. Công thức tính food cost thực tế theo kỳ
Khi quản lý toàn bộ hoạt động bếp, nhà hàng thường cần xác định lượng nguyên liệu thực tế đã tiêu thụ trong ngày, tuần hoặc tháng. Một phương pháp phổ biến là dựa trên giá trị tồn kho đầu kỳ, lượng mua trong kỳ và tồn kho cuối kỳ.

Công thức tính chi phí nguyên liệu thực tế:

Chi phí nguyên liệu thực tế = Tồn kho đầu kỳ + Giá trị nhập kho trong kỳ − Tồn kho cuối kỳ.

Sau khi xác định chi phí nguyên liệu thực tế, nhà hàng tính tỷ lệ food cost bằng cách chia chi phí này cho doanh thu bán món ăn tương ứng rồi nhân với 100%.

Ví dụ:

Tồn kho nguyên liệu đầu tháng: 15.000.000 đồng.

Giá trị nguyên liệu nhập thêm trong tháng: 45.000.000 đồng.

Tồn kho nguyên liệu cuối tháng: 12.000.000 đồng.

Doanh thu bán món ăn trong tháng: 160.000.000 đồng.

Chi phí nguyên liệu thực tế = 15.000.000 + 45.000.000 − 12.000.000 = 48.000.000 đồng.

Tỷ lệ food cost thực tế = (48.000.000 / 160.000.000) × 100% = 30%.

Đây là cách tính tổng quát, với điều kiện giá trị tồn kho và hàng nhập được ghi nhận nhất quán. Khi áp dụng thực tế, nhà hàng cần xem xét thêm hàng trả lại, hàng được biếu tặng, chuyển kho, hao hụt, hàng hủy và các điều chỉnh kiểm kê để kết quả phản ánh đúng chi phí tiêu thụ.
```

Init food cost cho tháng đầu tiên là 35%

## Xuất dụng cụ

- Mỗi dụng cụ sẽ có một trường `duTru` (dự trù). Trên UI nên có tick để cho nhập số, trong model thì không cần flag true/false
  - Nếu empty thì không cần dự trù (rạp, loa,... những dụng cụ cồng kềnh, không cần phải dự trù)
  - Nếu có giá trị (số), đơn vị phần trăm
- Khi đặt tiệc sẽ dựa trên trường `duTru` của dụng cụ mà tính toán ra số lượng dụng cụ cụ thể

## Tính giá món ăn

- 1 món gồm nhiều nguyên liệu
- Nguyên liệu tính bằng VND trên gì đó
- ==Đơn vị của món ăn tính theo bàn? đĩa?==
- Khi bắt đầu, giá 1 món ăn sẽ được đề xuất băng tổng nguyên liệu, kèm theo hệ số (Giá gốc chi phí thực phẩm / food cost). Việc mình chọn giá món ăn sẽ có thể là thủ công, hoặc chấp nhận giá đề xuất
- Khi giá nguyên liệu thay đổi, hệ thống liệt kê các món ăn bị ảnh hưởng giá. 1 actor nào đó sẽ cân nhắc chấp nhận sự thay đổi giá hoặc chỉnh sửa tay cho từng món bị ảnh hưởng

## Công thức tính số nhân viên phục vụ dựa theo bàn

$nhanvien=ban/3$

## Nhân viên làm bể, trừ lương?

Sẽ dựa vào sự chân thật của khách hàng và nhân viên. Nếu khách hàng làm hư, thì sẽ xét luật riêng phía dưới. Nếu nhân viên, sẽ không tính gì trong hệ thống (cảnh cáo cá nhân, không hệ thống hoá)

### UC-HĐ-13 + UC-HĐ-14

Mình tạo 1 bảng cho việc thanh toán. Thanh toán lần 1 (cọc) và lần 2 (quyết toán) đều vào bảng đó. Trong đó, có trường khách đã trả, khách còn nợ. Trong trường hợp khách cần trả nhưng lại ít hơn cọc (do giảm bàn, giảm số lượng món,..) thì trường khách nợ sẽ là số âm, tức mình phải hoàn trả cho khách

Các form phiếu hoàn trả sẽ không nằm trong hệ thống này, sẽ sử dụng Microsoft Words riêng, và cần S3 để upload file lưu trữ bằng chứng trong hệ thống

## Feedback

- 1 đánh giá phải thuộc về 1 bữa tiệc. 1 tiệc chỉ có 1 đánh giá
- Chỉ người đặt tiệc được đánh giá
- Có thể nhờ nhân viên tạo record hộ chủ đặt tiệc

## use case adjustments

### UC-DT-11

Không thuê đối tác ngoài

### UC-DT-07

- Change "Hệ thống gửi cho khách tin nhắn kèm link xem tóm tắt đơn/báo giá; khách có thể xác nhận qua OTP mà không cần tạo tài khoản." -> Tự gửi tin nhắn Zalo
- Một người chỉ được xác minh bằng 1 số điện thoại. 1 số điện thoại thuộc về một người, 1 tên.
- Không xét hoa hồng nhân viên

### UC-DT-12

- Các câu hỏi, bullet khảo sát được tạo thành 1 table
- Địa điểm không tái sử dụng

### UC-HĐ-04,5,6

Hãy làm đơn giản, xử lý happy path

### UC-HĐ-09

Không có ưu đãi gì sau khi công ty / dịch vụ huỷ

Không cho phép dời ngày tiệc

### UC-HĐ-07

- Chỉ hoàn tiền theo bậc thang, không tính chi phí thực tế đã chế biến
- Khi hoàn tiền, tạo record trong hệ thống, không cần phải quá khắt khe về luồng hệ thống.
- Cần thiết kế biên nhận cho khách khi hoànp
- Không cần xét trường hợp xấu quá xấu: khách yêu cầu huỷ giữa tiệc

### UC-HĐ-08

Bỏ, có thể thêm vào trong hợp đồng, khi đó sẽ có hướng giải quyết phù hợp

### UC-KHO-08 + UC-KHO-09

Không xét các edge case NCC hết hàng, giao trễ

Không xét vấn đề nguyên liệu không đạt

### UC-VH-07 + UC-VH-08

Skip

### UC-VH-10 + UC-VH-11

Suy nghĩ đơn giản thôi, không cần xác nhận, chụp hình. Không cần xét edge case

### UC-KHO-03

Không cần xét kiểm đếm một phần, khuya... Hệ thống không cần chi tiết đến vậy

Không nên quy định gắt gao, công thức hoá cho việc 1% hư hại. Chỉ nên cảm tính bắt khách trả hay không, có thì căn cứ vào giá bồi thường của dụng cụ (không xét tham số)

## Tham số chỉnh sửa

- TS28: Chỉ cho phép hard code 1 lần dời
- TS17: Cân nhắc chưa biết payment provider nào (maybe SePay)
- TS56, số lượng tiệc / bàn phục vụ trong ngày phụ thuộc vào số lượng dụng cụ, nhân viên avaiable trong khung giờ đó

## Tham số skip

- TS35, 36, không cần chi tiết quá, skip
- TS38
- TS53
- TS45
- TS55
- TS57, đơn giản hoá việc đăng nhập

Và một số tham số không xét khác, khuyến mãi, phân công...

---

## Câu hỏi cho AI

- lead là cái gì? Xe lead hả
- Nháp đơn là lưu ở local state trình duyệt hay ở backend?
- Báo giá là gì? JOB-02

---

Đừng thêm business gì nưa nha AI. Làm đơn giản, đừng cover edge case nhiều quá, happy case thôi

Rút bớt use case lại.

Report cần ghi chú lại những out of scope

Hãy hỏi lại tôi bất kỳ vấn đề gì chưa rõ ràng, để có thể chốt một bản đặc tả chi tiết
