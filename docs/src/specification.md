# Đặc tả phần mềm MasterCookVN

## 1. Mục tiêu và phạm vi

Website phục vụ một cơ sở nấu tiệc lưu động, từ đặt tiệc đến quyết toán. Cơ sở không cung cấp mặt bằng. Trao đổi với khách, nhân viên, nhà cung cấp qua điện thoại/Zalo diễn ra ngoài hệ thống.

Trong phạm vi: khách tự đặt hoặc nhân viên đặt hộ; hợp đồng nhiều bữa; khảo sát Q&A; ký online/ký giấy; thu cọc, sửa/hủy và hoàn tiền; hồ sơ nhân sự và phân công; nhập/kiểm kê nguyên liệu cuối tháng; food cost và đề xuất giá; nhập/xuất/thu hồi dụng cụ; đánh giá và báo cáo.

Ngoài phạm vi: phục vụ tại quán, cung cấp mặt bằng, đối tác thuê ngoài, xe/chuyến vận chuyển, dịch vụ/cho thuê dụng cụ độc lập, đám tang, tiệc không xác định quy mô, thử món, khuyến mãi, phân hạng khách, hoa hồng, khiếu nại chuyên biệt, hóa đơn điện tử, công nợ trả chậm, CCCD, email, gửi Zalo tự động, nhắc lịch, thời tiết, offline, chấm công, nghỉ phép, đánh giá nhân viên, tính/trả lương, serial, kiểm soát chất lượng nguyên liệu, lô/hạn dùng, hao hụt sơ chế. Không trừ nguyên liệu theo từng tiệc; không phát sinh món/bàn ăn/dịch vụ trong tiệc; không dời ngày hoặc hoãn tiệc.

## 2. Thuật ngữ

| Thuật ngữ | Ý nghĩa |
| --- | --- |
| Bữa tiệc | Một lần phục vụ có thời gian, địa điểm, quy mô riêng |
| Bàn ăn | Đơn vị thực phẩm và tính giá, khác số bàn thực tế bố trí |
| Bàn ghế | Dụng cụ bố trí đồng thời, có thể phục vụ cuốn chiếu |
| Set thực đơn | Danh sách món gợi ý sẵn, tính giá theo bàn ăn |
| Định lượng món | Lượng nguyên liệu cho một bàn ăn chuẩn 10 người |
| Giá nguyên liệu hiện hành | Giá được xác nhận để ước tính chi phí, đề xuất giá bán |
| Food cost thực tế | Chi phí nguyên liệu tiêu thụ / doanh thu món ăn cùng kỳ |
| Food cost mục tiêu | Tỷ lệ dùng đề xuất giá bán, khởi tạo 35% |
| Lãi theo nguyên liệu | Doanh thu món ăn trừ nguyên liệu tiêu thụ; chưa trừ lương và chi phí khác |

## 3. Tác nhân và quyền

Một tài khoản nội bộ có thể kiêm nhiều vai trò; hồ sơ nhân sự độc lập tài khoản.

| Tác nhân | Quyền theo nhóm chức năng |
| --- | --- |
| Khách hàng | Xem danh mục; đặt, xem, xác nhận hợp đồng, thanh toán, yêu cầu sửa/hủy, đánh giá hồ sơ của mình |
| Quản lý cơ sở | Tài khoản/quyền, danh mục, tham số, giá; toàn bộ nghiệp vụ và báo cáo |
| Nhân viên tư vấn | Hồ sơ khách, đặt hộ, khảo sát, xác nhận nhận/từ chối tiệc, hợp đồng/phụ lục, lưu bản ký giấy |
| Kế toán | Thu/hoàn, quyết toán, chốt tồn và food cost tháng, báo cáo |
| Thủ kho | Nhập nguyên liệu/dụng cụ, kiểm kê nguyên liệu, xuất/thu hồi dụng cụ |
| Quản lý nhân sự | Hồ sơ nhân viên, phân công và lịch làm việc |
| Dịch vụ thanh toán | Thông báo kết quả thanh toán online; chưa chốt nhà cung cấp |

Bếp, phục vụ, vận chuyển là vị trí để phân công, không bắt buộc tài khoản. Nhà cung cấp không truy cập hệ thống; tên và SĐT lưu trên phiếu nhập.

## 4. Quy trình tổng thể

1. Khách xem danh mục, tạm tính; khách hoặc tư vấn tạo đơn gồm một/nhiều bữa.
2. Tư vấn ghi khảo sát Q&A, nhập khoảng cách; hệ thống kiểm tra tài nguyên theo từng khung giờ. Tư vấn xác nhận nhận/từ chối, không có cấp quản lý duyệt tiếp.
3. Phát hành hợp đồng chung, chốt giá và hạn cọc; khách xác nhận online hoặc ký giấy tại quầy, nhân viên upload bản ký.
4. Thu cọc online/tiền mặt; đủ xác nhận và cọc thì hợp đồng có hiệu lực. Phân công riêng từng bữa.
5. Chuẩn bị nguyên liệu theo nhu cầu, ghi nhận phiếu mua/nhập; xuất dụng cụ và thực hiện tiệc.
6. Thu hồi/kiểm đếm, ghi bồi thường; quyết toán từng bữa. Đóng hợp đồng khi mọi bữa kết thúc/hủy và đã thu/hoàn đủ.
7. Cuối tháng kiểm kê, chốt tiêu thụ và food cost; đầu tháng sau tạo đợt đề xuất giá để quản lý xử lý.

Danh mục UC chỉ duy trì tại [chỉ mục phân tích](./diagrams/index.md), không lập lại ở đây.

## 5. Quy tắc nghiệp vụ

### BR01 — Hợp đồng nhiều bữa

Một đơn có ít nhất một bữa và tối đa một hợp đồng. Mỗi bữa có thực đơn, dịch vụ, thời gian phục vụ, khoảng sử dụng tài nguyên, số bàn ăn, số bàn ghế, địa điểm và khảo sát riêng. Cùng địa chỉ vẫn khảo sát riêng. Thu/hoàn gắn hợp đồng, phân bổ theo bữa để sửa/hủy và quyết toán; tổng phân bổ bằng số tiền giao dịch.

### BR02 — Tài khoản và hồ sơ khách

Đăng ký/đăng nhập bằng SĐT và mật khẩu, không OTP. SĐT chuẩn hóa duy nhất cho hồ sơ khách; một SĐT ứng với một người/tên. Nhân viên đặt hộ nhập tên, SĐT để tìm/tạo hồ sơ, không tự tạo tài khoản. Khách đăng ký cùng SĐT được liên kết hồ sơ, thấy đơn/hợp đồng chờ xác nhận. Không cần tài khoản nếu ký tại quầy. Quản lý tạo tài khoản nội bộ; đặt lại mật khẩu qua nhân viên, không email.

### BR03 — Bàn ăn và bàn ghế

Giá/định lượng cho bàn ăn chuẩn 10 người; một bữa dùng cùng số người/bàn ăn, tối thiểu 10. Hệ số quy mô = số người/bàn ăn / 10. Nhập số bàn ăn và số bàn bố trí riêng; số bàn bố trí không vượt số bàn ăn. Dụng cụ theo người, bố trí hoặc nhu cầu bữa; không đồng nhất số bàn ăn với bàn ghế. Ví dụ 30 bàn ăn trên 10 bàn bố trí cuốn chiếu: gợi ý 4 người phục vụ.

### BR04 — Giá và chốt giá

- Giá gợi ý món/bàn ăn chuẩn = Σ(định lượng × giá nguyên liệu hiện hành) / food cost mục tiêu. Quản lý chấp nhận hoặc nhập giá khác, không tự đổi giá bán.
- Set là tổng giá bán món trong set, không cộng lợi nhuận lần nữa. Tự chọn tối thiểu 6 món đang phục vụ.
- Tiền món bữa = tổng giá món chuẩn × hệ số quy mô × số bàn ăn. Cộng dịch vụ (đơn giá × lượng), phụ thu thỏa thuận, rồi thuế theo tham số. Phụ thu lễ dùng danh sách ngày cố định âm/dương, không có UC quản lý ngày lễ riêng.
- Tạm tính chưa phải cam kết. Phát hành hợp đồng lưu bản chốt tên, lượng, đơn giá, thuế, phụ thu, điều khoản và giá bồi thường; sửa danh mục không đổi hợp đồng cũ.
- VNĐ nguyên; tổng mỗi bữa làm tròn tới bội số 500 gần nhất, đúng nửa làm tròn lên; lưu chênh lệch riêng. Tổng hợp đồng bằng tổng các bữa; giao dịch ghi đúng tiền thực thu/hoàn.

### BR05 — Đề xuất giá nguyên liệu theo tháng

Đầu tháng tạo một đợt cho nguyên liệu có phiếu nhập trong 30 ngày trước mốc đầu tháng. Chia ba khoảng 10 ngày từ cũ đến mới, trọng số 1,5; 1,5; 2. Giá đề xuất = Σ(lượng nhập × đơn giá × trọng số) / Σ(lượng nhập × trọng số). Dùng cùng đơn vị chuẩn mỗi nguyên liệu; không có nhập thì giữ giá, không đề xuất 0.

Cron và kiểm tra bù trên server dùng chung thao tác: tháng hiện tại chưa có đợt thì tạo theo cùng mốc đầu tháng, kể cả chạy muộn. Khóa duy nhất theo tháng, tạo đợt và chi tiết nguyên tử. Lưu giá cũ/đề xuất/được chọn, người và thời điểm xử lý. Quản lý chấp nhận, chỉnh hoặc bỏ qua từng dòng. Giá nguyên liệu đổi thì liệt kê món bị ảnh hưởng và giá món gợi ý; quản lý quyết định giá bán.

### BR06 — Kiểm kê và food cost tháng

Không có phiếu xuất nguyên liệu theo tiệc, không trừ tồn sau tiệc. Trong tháng ghi phiếu nhập; cuối tháng thủ kho kiểm kê lượng thực tế, kế toán chốt giá trị tồn. Tồn đầu tháng là tồn cuối tháng trước; tháng đầu nhập lượng và đơn giá tồn ban đầu.

Đề xuất định giá tồn bằng bình quân gia quyền tháng: đơn giá tồn = (giá trị đầu + giá trị nhập) / (lượng đầu + lượng nhập); giá trị cuối = lượng kiểm kê cuối × đơn giá tồn. Nếu mẫu số bằng 0 thì giá bằng 0, không ghi tồn cuối dương khi chưa bổ sung nguồn. Lượng cuối không vượt đầu + nhập; đối chiếu chênh lệch trước chốt. Giá tồn độc lập giá gợi ý BR05.

Chi phí tiêu thụ = giá trị đầu + giá trị nhập − giá trị cuối. Food cost thực tế = chi phí tiêu thụ / doanh thu món ăn cùng tháng × 100%. Doanh thu theo ngày bữa đã thực hiện, không gồm cọc chưa thực hiện, thuế, dịch vụ, bồi thường hoặc tiền giữ lại do hủy. Doanh thu bằng 0 thì chưa xác định, không chia 0.

Mục tiêu khởi tạo 35%; sau chốt tháng quản lý có thể dùng tỷ lệ thực tế làm mục tiêu tháng sau hoặc giữ/chỉnh tay. Không tự ghi đè mục tiêu. Lưu bản chốt theo tháng; điều chỉnh nguồn cần mở lại kỳ và chốt lại cả các kỳ sau bị ảnh hưởng. Không phân bổ chi phí mua chung thành chi phí thực tế từng bữa.

### BR07 — Nhận tiệc và giữ chỗ

Tư vấn nhập khoảng cách thủ công; phạm vi tối đa 20 km, không tích hợp bản đồ. Nhập khoảng sử dụng dụng cụ và giờ làm nhân sự cho từng bữa, không tự tính lộ trình/vệ sinh. Kiểm tra cả các bữa cùng đơn và hợp đồng khác trong khung chồng lấn.

Xác nhận nhận tiệc giữ tài nguyên tạm 24 giờ chờ cọc; đủ BR08 thì giữ chính thức. Server loại giữ hết hạn khi tra cứu/kiểm tra/xử lý đơn, không phụ thuộc cron riêng. Hết hạn chưa đủ ký/cọc thì đánh dấu hết hạn, nhả giữ; khoản đã thu vẫn lưu để hoàn, không xóa giao dịch.

Tồn tối thiểu chỉ cảnh báo; thiếu tài nguyên thực tế thì không xác nhận nhận đến khi bổ sung/điều chỉnh. Không dùng trần số tiệc/ngày độc lập với tài nguyên.

### BR08 — Ký và cọc

Tư vấn phát hành là xác nhận phía cơ sở. Khách xác nhận online bằng tài khoản hoặc nhân viên ghi ký giấy kèm file. Cọc 50%–100% tổng hợp đồng trong 24 giờ. Phân bổ theo giá trị từng bữa; cọc bắt buộc ban đầu bằng 50% giá trị bữa, phần vượt là trả trước. Sau phụ lục chỉ yêu cầu cọc bổ sung khi thuộc BR09, không tự làm hợp đồng mất hiệu lực do tỷ lệ cọc mới thấp hơn 50%. Khi hủy, phần cọc làm căn cứ là mức nhỏ hơn giữa 50% giá trị bữa hiện hành và số tiền đã thu còn phân bổ cho bữa; phần vượt căn cứ đó là trả trước được hoàn đủ.

Hợp đồng có hiệu lực khi khách đã xác nhận và thu đủ cọc bắt buộc. Online dùng thông báo dịch vụ thanh toán; tiền mặt/chuyển khoản ngoài luồng do kế toán ghi. Không công nhận chỉ từ nút khách bấm đã trả. Mã giao dịch bên cung cấp duy nhất, không cộng trùng khi nhận lại thông báo.

### BR09 — Điều chỉnh từng bữa

Không dời ngày. Còn ít nhất 5 ngày được đổi món đã chọn, không thêm món mới. Còn ít nhất 3 ngày được tăng/giảm bàn ăn; giảm tối đa 15% số bàn ký ban đầu, số bàn giảm làm tròn xuống. Tăng thì kiểm tra lại tài nguyên. Đổi món tính chênh lệch theo giá mới thỏa thuận, giữ giá món không đổi. Tăng trên 3 bàn trong một yêu cầu thì cọc bổ sung 50% phần tăng.

Tư vấn lập phụ lục trước/sau, chênh lệch; khách xác nhận online/ký giấy, không thêm cấp duyệt. Chỉ cập nhật bữa và tài nguyên khi phụ lục được xác nhận, đủ cọc bổ sung nếu có. Giảm làm dư tiền thì xử lý khi quyết toán. Sửa một bữa không làm hợp đồng thành đã hủy.

### BR10 — Hủy và hoàn

Hủy từng bữa/cả hợp đồng; tính riêng theo thời điểm yêu cầu và giờ bắt đầu bữa, không theo lúc nhân viên xử lý.

| Thời điểm | Hoàn phần cọc bắt buộc |
| --- | --- |
| Chưa cọc | Hủy miễn phí ngay |
| Còn ít nhất 30 ngày | 100%, phí xử lý mặc định 0 |
| Còn 15 đến dưới 30 ngày | 50% |
| Còn dưới 15 ngày | 0% |
| Đến giờ bắt đầu, khách không có mặt | 0%; nguyên liệu đã chế biến chỉ thu thêm theo thỏa thuận, không thu trùng |

Phần trả vượt cọc bắt buộc hoàn đủ. Hủy hợp đồng cộng kết quả các bữa chưa thực hiện, giữ quyết toán bữa đã thực hiện. Nhả tài nguyên/hủy phân công ngay khi hủy; hoàn tiền ghi riêng, xử lý sau. Không xây luồng khách hủy giữa lúc phục vụ. Không UC cơ sở hủy riêng; trách nhiệm ghi trong hợp đồng, xử lý thỏa thuận ngoài luồng chuẩn.

### BR11 — Quyết toán và báo cáo

Tổng quyết toán bữa = giá trị hiện hành + bồi thường ghi nhận. Số dư = tổng quyết toán − thu thành công phân bổ + hoàn đã thực hiện. Dương: cần thu trước khi đóng, không công nợ trả chậm; âm: cần hoàn. Thu/hoàn là giao dịch riêng, không sửa cọc, không trừ cọc hai lần. Bữa hủy dùng nghĩa vụ sau hủy thay giá trị phục vụ để tính số dư.

Báo cáo: doanh thu bữa thực hiện theo kỳ; chi phí tiêu thụ, food cost và lãi theo nguyên liệu theo tháng; tình hình đơn/bữa; thu/hoàn, tiền giữ lại do hủy; hao hụt/bồi thường; đánh giá. Lãi theo nguyên liệu = doanh thu món − chi phí tiêu thụ, chưa phải lợi nhuận ròng. Dashboard có tiệc sắp tới, chờ ký/cọc/quyết toán và cảnh báo nhân sự/dụng cụ. Chưa xuất PDF/Excel báo cáo.

### BR12 — Nhân sự

Gợi ý phục vụ = làm tròn lên (số bàn bố trí đồng thời / 3). Tư vấn ghi nhu cầu nhân sự dự kiến theo vị trí khi nhận bữa; kiểm tra năng lực phải cộng nhu cầu các bữa giữ tạm/chính thức chồng giờ kể cả chưa phân công tên cụ thể, không chỉ trừ người đã có lịch. Quản lý nhân sự chọn người, vị trí, giờ làm thủ công và điều chỉnh lượng theo thực tế; gợi ý không chặn cứng. Không phân một người vào hai khung chồng lấn; người ngưng làm không nhận việc mới. Đổi người bằng sửa phân công, liên hệ ngoài hệ thống. Không xác nhận ca, chấm công hoặc tính lương.

### BR13 — Dụng cụ

Mỗi loại có đơn vị, định mức theo người/bàn bố trí/bữa, tồn tối thiểu, dự trù % tùy chọn, giá bồi thường. Lượng cần = làm tròn lên (định mức × cơ sở tính × (1 + dự trù)); dự trù trống là 0, không thêm cờ bật/tắt. Đồ cồng kềnh có thể nhập lượng theo bữa trực tiếp.

Giữ trước không trừ kho vật lý; xuất chuyển sẵn sàng sang đang sử dụng. Thu hồi tốt cộng sẵn sàng; hư/mất ghi riêng. Số xuất = tốt + hư + mất. Nhân viên chọn số khách chịu không vượt hư/mất; tiền bồi thường = số khách chịu × giá chốt, không miễn tự động theo ngưỡng/khấu trừ lương. Đồ hư chỉ về sẵn sàng khi ghi phục hồi; mua mới tăng sở hữu. Không cộng thu hồi hai lần.

### BR14 — Đánh giá

Mỗi bữa hoàn tất tối đa một đánh giá, không bắt buộc; người đặt hoặc nhân viên ghi hộ. Lưu điểm 1–5, nhận xét, người thực sự nhập. Dùng nội bộ, chưa kiểm duyệt/hiển thị công khai.

## 6. Mô hình và tài liệu liên quan

[Mô hình lớp](./diagrams/class.md) là nguồn thuộc tính, quan hệ và ràng buộc dữ liệu. [Trạng thái đơn/hợp đồng/bữa](./diagrams/state/don-tiec.md) tách tiến độ khỏi thanh toán; [trạng thái dụng cụ](./diagrams/state/phieu-xuat-dung-cu.md) tách giữ trước khỏi xuất thực tế. [Nội dung hợp đồng](./contracts/service-contract.md) phục vụ lập hợp đồng, không thay đặc tả.

## 7. Phi chức năng

- Tiếng Việt, dùng được trên điện thoại; dd/MM/yyyy, VNĐ, giờ Việt Nam. Cho chọn ngày âm/dương, lưu ngày dương và giờ cụ thể.
- Server kiểm tra quyền/sở hữu hồ sơ, tự tính tiền/kiểm tra tài nguyên; mật khẩu băm.
- Lưu người, thời điểm, mã tham chiếu/bằng chứng cho ký, thu/hoàn, phụ lục, kiểm kê, chấp nhận giá. Danh mục đã dùng chỉ ngưng, không xóa.
- Ghi tiền, giữ tài nguyên, chốt kỳ, tạo đợt giá nguyên tử và không ghi hai lần; lượng/tiền dùng số chính xác.
- Sao lưu, phục hồi; file hợp đồng/bằng chứng theo quyền hồ sơ.
- SĐT là căn cứ liên kết theo phạm vi đã chốt, không xác minh OTP.

## 8. Giả định triển khai đã chọn

Các chi tiết chưa có con số/cách tính chốt trong cuộc trao đổi dùng mặc định sau: bàn ăn chuẩn 10 người; set bằng tổng giá món; làm tròn tổng bữa theo 500 đồng; định giá tồn bình quân gia quyền tháng; phí xử lý hủy 0; đánh giá nội bộ. Đây là lựa chọn để đặc tả nhất quán, không phải kết quả khảo sát bổ sung. Thuế và mức phụ thu lễ là tham số, không khẳng định mức pháp định trong tài liệu này.
