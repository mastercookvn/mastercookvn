---
order: 1
---

# MasterCookVN Software Specification

## Objectives and Scope

Website phục vụ một cơ sở nấu tiệc lưu động, từ đặt tiệc đến quyết toán. Cơ sở không cung cấp mặt bằng. Trao đổi với khách, nhân viên, nhà cung cấp qua điện thoại/Zalo diễn ra ngoài hệ thống.

Trong phạm vi: khách tự đặt hoặc nhân viên đặt hộ; hợp đồng nhiều bữa; khảo sát Q&A; ký online/ký giấy; thu cọc, sửa/hủy và hoàn tiền; hồ sơ nhân sự và phân công; nhập/kiểm kê nguyên liệu cuối tháng; food cost và đề xuất giá; nhập/xuất/thu hồi dụng cụ; đánh giá và báo cáo.

Ngoài phạm vi: phục vụ tại quán, cung cấp mặt bằng, đối tác thuê ngoài, xe/chuyến vận chuyển, dịch vụ/cho thuê dụng cụ độc lập, đám tang, tiệc không xác định quy mô, thử món, khuyến mãi, phân hạng khách, hoa hồng, khiếu nại chuyên biệt, hóa đơn điện tử, công nợ trả chậm, CCCD, email, gửi Zalo tự động, nhắc lịch, thời tiết, offline, chấm công, nghỉ phép, đánh giá nhân viên, tính/trả lương, serial, kiểm soát chất lượng nguyên liệu, lô/hạn dùng, hao hụt sơ chế. Không trừ nguyên liệu theo từng tiệc; không phát sinh món/bàn ăn/dịch vụ trong tiệc; không dời ngày hoặc hoãn tiệc.

## Terminology

| Thuật ngữ                | Ý nghĩa                                                                   |
| ------------------------ | ------------------------------------------------------------------------- |
| Meal                     | Một lần phục vụ có thời gian, địa điểm, quy mô riêng                      |
| Dining table             | Đơn vị thực phẩm và tính giá, khác số bàn thực tế bố trí                  |
| Tables and chairs        | Dụng cụ bố trí đồng thời, có thể phục vụ cuốn chiếu                       |
| Menu set                 | Danh sách món gợi ý sẵn, tính giá theo bàn ăn                             |
| Recipe quantity          | Lượng nguyên liệu cho một bàn ăn chuẩn 10 người                           |
| Current ingredient price | Giá được xác nhận để ước tính chi phí, đề xuất giá bán                    |
| Actual food cost         | Chi phí nguyên liệu tiêu thụ / doanh thu món ăn cùng kỳ                   |
| Target food cost         | Tỷ lệ dùng đề xuất giá bán, khởi tạo 35%                                  |
| Ingredient margin        | Doanh thu món ăn trừ nguyên liệu tiêu thụ; chưa trừ lương và chi phí khác |

## Actors and Permissions

Một tài khoản nội bộ có thể kiêm nhiều vai trò; hồ sơ nhân sự độc lập tài khoản.

| Tác nhân        | Quyền theo nhóm chức năng                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Customer        | Xem danh mục; đặt, xem, xác nhận hợp đồng, thanh toán, yêu cầu sửa/hủy, đánh giá hồ sơ của mình |
| Branch manager  | Tài khoản/quyền, danh mục, tham số, giá; toàn bộ nghiệp vụ và báo cáo                           |
| Consultant      | Hồ sơ khách, đặt hộ, khảo sát, xác nhận nhận/từ chối tiệc, hợp đồng/phụ lục, lưu bản ký giấy    |
| Accountant      | Thu/hoàn, quyết toán, chốt tồn và food cost tháng, báo cáo                                      |
| Storekeeper     | Nhập nguyên liệu/dụng cụ, kiểm kê nguyên liệu, xuất/thu hồi dụng cụ                             |
| HR manager      | Hồ sơ nhân viên, phân công và lịch làm việc                                                     |
| Payment service | Thông báo kết quả thanh toán online; chưa chốt nhà cung cấp                                     |

Bếp, phục vụ, vận chuyển là vị trí để phân công, không bắt buộc tài khoản. Nhà cung cấp không truy cập hệ thống; tên và SĐT lưu trên phiếu nhập.

## Overall Workflow

1. Khách xem danh mục, tạm tính; khách hoặc tư vấn tạo đơn gồm một/nhiều bữa.
2. Tư vấn ghi khảo sát Q&A, nhập khoảng cách; hệ thống kiểm tra tài nguyên theo từng khung giờ. Tư vấn xác nhận nhận/từ chối, không có cấp quản lý duyệt tiếp.
3. Phát hành hợp đồng chung, chốt giá và hạn cọc; khách xác nhận online hoặc ký giấy tại quầy, nhân viên upload bản ký.
4. Thu cọc online/tiền mặt; đủ xác nhận và cọc thì hợp đồng có hiệu lực. Phân công riêng từng bữa.
5. Chuẩn bị nguyên liệu theo nhu cầu, ghi nhận phiếu mua/nhập; xuất dụng cụ và thực hiện tiệc.
6. Thu hồi/kiểm đếm, ghi bồi thường; quyết toán từng bữa. Đóng hợp đồng khi mọi bữa kết thúc/hủy và đã thu/hoàn đủ.
7. Cuối tháng kiểm kê, chốt tiêu thụ và food cost; đầu tháng sau tạo đợt đề xuất giá để quản lý xử lý.

Danh mục UC chỉ duy trì tại [Use Case Catalog](./business/use-case-catalog.md), không lập lại ở đây. [System Parameters and Limits](./business/system-parameters.md) là nguồn chuẩn cho giá trị và giới hạn. Các con số trong BR bên dưới là mặc định; khi tham số thay đổi, dùng giá trị hiện hành cho dữ liệu mới và giữ nguyên cam kết đã chốt.

## Business Rules

### BR01 — Multi-meal contracts

Một đơn có ít nhất một bữa và tối đa một hợp đồng. Mỗi bữa có thực đơn, dịch vụ, thời gian phục vụ, khoảng sử dụng tài nguyên, số bàn ăn, số bàn ghế, địa điểm và khảo sát riêng. Loại tiệc là chuỗi nhập tự do trên từng bữa, cho phép nhập loại khác; không dùng enum hoặc danh mục quản lý riêng, không tự gợi ý món theo loại tiệc. Bữa mới gửi có thể chưa khảo sát; phải đủ khảo sát trước khi nhận đơn, kể cả cùng địa chỉ. Thu/hoàn gắn hợp đồng, phân bổ theo bữa để sửa/hủy và quyết toán; tổng phân bổ bằng số tiền giao dịch.

### BR02 — Accounts and customer profiles

Đăng ký/đăng nhập bằng SĐT và mật khẩu, không OTP. Sai mật khẩu liên tiếp tới TS27 (mặc định 5 lần) thì khóa tạm, quản lý mở khóa. SĐT chuẩn hóa duy nhất cho hồ sơ khách; một SĐT ứng với một người/tên. Nhân viên đặt hộ nhập tên, SĐT để tìm/tạo hồ sơ, không tự tạo tài khoản. Khách đăng ký cùng SĐT được liên kết hồ sơ, thấy đơn/hợp đồng chờ xác nhận. Không cần tài khoản nếu ký tại quầy. Quản lý tạo tài khoản nội bộ; đặt lại mật khẩu qua nhân viên, không email.

### BR03 — Dining tables and furniture

Giá và định lượng theo bàn ăn chuẩn 10 suất; hệ thống không nhập số người thực tế trên mỗi bàn. Khách tự quyết định số người ngồi, không làm thay đổi giá hay định lượng bàn chuẩn. Nhập số bàn ăn và số bàn bố trí riêng; số bàn bố trí không vượt số bàn ăn. Số bàn ăn tối thiểu theo TS10 (mặc định 1); ngày đặt trước theo TS08–TS09 (mặc định 3–90 ngày). Dụng cụ theo người tính theo số suất chuẩn = số bàn ăn × 10, kể cả khi phục vụ cuốn chiếu; dụng cụ khác tính theo bàn bố trí hoặc nhu cầu bữa. Không đồng nhất số bàn ăn với bàn ghế. Ví dụ 30 bàn ăn trên 10 bàn bố trí cuốn chiếu: dự trù dụng cụ theo người cho 300 suất, gợi ý 4 người phục vụ.

### BR04 — Pricing and price snapshots

- Giá gợi ý món/bàn ăn chuẩn = Σ(định lượng × giá nguyên liệu hiện hành) / food cost mục tiêu. Quản lý chấp nhận hoặc nhập giá khác, không tự đổi giá bán.
- Set là tổng giá bán món trong set, không cộng lợi nhuận lần nữa. Thực đơn tự chọn phải có ít nhất một món đang phục vụ; dưới ngưỡng khuyến nghị hiện hành (mặc định 6 món) thì cảnh báo nhưng vẫn được tạm tính và gửi đơn để tư vấn xem xét.
- Tiền món bữa = tổng giá món chuẩn × số bàn ăn. Cộng dịch vụ (đơn giá × lượng), phí vận chuyển theo khảo sát, phụ thu thỏa thuận, rồi thuế theo tham số; không cộng phí vận chuyển hai lần. Phụ thu lễ dùng danh sách ngày cố định âm/dương, không có UC quản lý ngày lễ riêng.
- Tạm tính chưa phải cam kết. Phát hành hợp đồng lưu bản chốt tên, lượng, đơn giá, thuế, phụ thu, điều khoản và giá bồi thường; sửa danh mục không đổi hợp đồng cũ.
- VNĐ nguyên; tổng mỗi bữa làm tròn tới bội số TS26 (mặc định 500) gần nhất, đúng nửa làm tròn lên; lưu chênh lệch riêng. Tổng hợp đồng bằng tổng các bữa; giao dịch ghi đúng tiền thực thu/hoàn. Hiệu lực báo giá TS05 (mặc định 7 ngày) không gia hạn giữ chỗ, ký hoặc cọc theo TS06.

### BR05 — Monthly ingredient price proposals

Đầu tháng tạo một đợt cho nguyên liệu có phiếu nhập trong 30 ngày trước mốc đầu tháng. Chia ba khoảng 10 ngày từ cũ đến mới, trọng số 1,5; 1,5; 2. Giá đề xuất = Σ(lượng nhập × đơn giá × trọng số) / Σ(lượng nhập × trọng số). Dùng cùng đơn vị chuẩn mỗi nguyên liệu; không có nhập thì giữ giá, không đề xuất 0.

Cron và kiểm tra bù trên server dùng chung thao tác: tháng hiện tại chưa có đợt thì tạo theo cùng mốc đầu tháng, kể cả chạy muộn. Khóa duy nhất theo tháng, tạo đợt và chi tiết nguyên tử. Lưu giá cũ/đề xuất/được chọn, người và thời điểm xử lý. Quản lý chấp nhận, chỉnh hoặc bỏ qua từng dòng. Giá nguyên liệu đổi thì liệt kê món bị ảnh hưởng và giá món gợi ý; quản lý quyết định giá bán.

### BR06 — Monthly inventory and food cost

Không có phiếu xuất nguyên liệu theo tiệc, không trừ tồn sau tiệc. Trong tháng ghi phiếu nhập; cuối tháng thủ kho kiểm kê lượng thực tế, kế toán chốt giá trị tồn. Tồn đầu tháng là tồn cuối tháng trước; tháng đầu nhập lượng và đơn giá tồn ban đầu.

Đề xuất định giá tồn bằng bình quân gia quyền tháng: đơn giá tồn = (giá trị đầu + giá trị nhập) / (lượng đầu + lượng nhập); giá trị cuối = lượng kiểm kê cuối × đơn giá tồn. Nếu mẫu số bằng 0 thì giá bằng 0, không ghi tồn cuối dương khi chưa bổ sung nguồn. Lượng cuối không vượt đầu + nhập; đối chiếu chênh lệch trước chốt. Giá tồn độc lập giá gợi ý BR05.

Chi phí tiêu thụ = giá trị đầu + giá trị nhập − giá trị cuối. Food cost thực tế = chi phí tiêu thụ / doanh thu món ăn cùng tháng × 100%. Doanh thu theo ngày bữa đã thực hiện, không gồm cọc chưa thực hiện, thuế, dịch vụ, bồi thường hoặc tiền giữ lại do hủy. Doanh thu bằng 0 thì chưa xác định, không chia 0.

Mục tiêu khởi tạo 35%; sau chốt tháng quản lý có thể dùng tỷ lệ thực tế làm mục tiêu tháng sau hoặc giữ/chỉnh tay. Không tự ghi đè mục tiêu. Lưu bản chốt theo tháng; điều chỉnh nguồn cần mở lại kỳ và chốt lại cả các kỳ sau bị ảnh hưởng. Không phân bổ chi phí mua chung thành chi phí thực tế từng bữa.

### BR07 — Order acceptance and reservations

Tư vấn nhập khoảng cách thủ công; hệ thống chỉ hiển thị TS17 (mặc định 20 km), không tự đối chiếu, cảnh báo theo khoảng cách hoặc từ chối nhận theo mốc này. Tư vấn tự đánh giá địa điểm ngoài hệ thống; không tích hợp bản đồ. Phí vận chuyển = max(0, khoảng cách − TS15) × TS16, mặc định miễn 10 km đầu, 15.000 đồng/km vượt, kể cả khi vượt TS17; lưu riêng với phụ thu. Nhập khoảng sử dụng dụng cụ cho từng bữa, bao gồm TS19 (mặc định 12 giờ) cách ly vệ sinh sau thu hồi. Khung nhân sự dự kiến lấy giờ bắt đầu bữa trừ TS18 (mặc định 3 giờ) đến giờ kết thúc bữa; giờ phân công cụ thể nhập thủ công. Không tự tính lộ trình. Kiểm tra cả các bữa cùng đơn và hợp đồng khác trong khung chồng lấn.

Xác nhận nhận tiệc giữ tài nguyên tạm 24 giờ chờ cọc; đủ BR08 thì giữ chính thức. Server loại giữ hết hạn khi tra cứu/kiểm tra/xử lý đơn, không phụ thuộc cron riêng. Hết hạn chưa đủ ký/cọc thì đánh dấu hết hạn, nhả giữ; khoản đã thu vẫn lưu để hoàn, không xóa giao dịch.

Tồn tối thiểu chỉ cảnh báo; thiếu tài nguyên thực tế thì không xác nhận nhận đến khi bổ sung/điều chỉnh. Không dùng trần số tiệc/ngày độc lập với tài nguyên.

### BR08 — Confirmation and deposit

Tạm thời, ký online chỉ là khách dùng tài khoản để xác nhận đồng ý nội dung hợp đồng trên hệ thống; không triển khai OTP, chữ ký số hoặc quy trình xác minh chữ ký phức tạp.

Tư vấn phát hành là xác nhận phía cơ sở. Khách xác nhận online bằng tài khoản hoặc nhân viên ghi ký giấy kèm file. Cọc từ TS02 đến TS03 (mặc định 50%–100%) tổng hợp đồng trong TS06 (mặc định 24 giờ). Phân bổ theo giá trị từng bữa; cọc bắt buộc ban đầu bằng TS02 × giá trị bữa, phần vượt là trả trước. Sau phụ lục chỉ yêu cầu cọc bổ sung khi thuộc BR09, không tự làm hợp đồng mất hiệu lực do tỷ lệ cọc mới thấp hơn TS02. Khi hủy, căn cứ cọc = min(TS02 × giá trị bữa hiện hành, tiền đã thu còn phân bổ cho bữa); phần vượt căn cứ đó là trả trước được hoàn đủ.

Hợp đồng có hiệu lực khi khách đã xác nhận và thu đủ cọc bắt buộc. Online dùng thông báo dịch vụ thanh toán; QR có hiệu lực TS07 (mặc định 15 phút), hết hạn thì tạo lại. Tiền mặt/chuyển khoản ngoài luồng do kế toán ghi. Không công nhận chỉ từ nút khách bấm đã trả. Mã giao dịch bên cung cấp duy nhất, không cộng trùng khi nhận lại thông báo.

### BR09 — Meal adjustments

Không dời ngày. Còn ít nhất 5 ngày được đổi món đã chọn, không thêm món mới. Còn ít nhất 3 ngày được tăng/giảm bàn ăn; giảm tối đa 15% số bàn ký ban đầu, số bàn giảm làm tròn xuống. Tăng thì kiểm tra lại tài nguyên. Đổi món tính chênh lệch theo giá mới thỏa thuận, giữ giá món không đổi. Tăng trên 3 bàn trong một yêu cầu thì cọc bổ sung 50% phần tăng.

Tư vấn lập phụ lục trước/sau, chênh lệch; khách xác nhận online/ký giấy, không thêm cấp duyệt. Chỉ cập nhật bữa và tài nguyên khi phụ lục được xác nhận, đủ cọc bổ sung nếu có. Giảm làm dư tiền thì xử lý khi quyết toán. Sửa một bữa không làm hợp đồng thành đã hủy.

### BR10 — Cancellation and refunds

Hủy từng bữa/cả hợp đồng; tính riêng theo thời điểm yêu cầu và giờ bắt đầu bữa, không theo lúc nhân viên xử lý.

| Thời điểm                           | Hoàn phần cọc bắt buộc                                                    |
| ----------------------------------- | ------------------------------------------------------------------------- |
| Chưa cọc                            | Hủy miễn phí ngay                                                         |
| Còn ít nhất 30 ngày                 | 100%, phí xử lý mặc định 0                                                |
| Còn 15 đến dưới 30 ngày             | 50%                                                                       |
| Còn dưới 15 ngày                    | 0%                                                                        |
| Đến giờ bắt đầu, khách không có mặt | 0%; nguyên liệu đã chế biến chỉ thu thêm theo thỏa thuận, không thu trùng |

Phần trả vượt cọc bắt buộc hoàn đủ. Hủy hợp đồng cộng kết quả các bữa chưa thực hiện, giữ quyết toán bữa đã thực hiện. Nhả giữ dụng cụ chưa xuất và hủy phân công ngay khi hủy; nếu đã xuất thì vẫn thu hồi/kiểm đếm, bảo đảm khung vệ sinh TS19 trước khi dùng lại. Hoàn tiền ghi riêng, xử lý sau. Không xây luồng khách hủy giữa lúc phục vụ. Không UC cơ sở hủy riêng; trách nhiệm ghi trong hợp đồng, xử lý thỏa thuận ngoài luồng chuẩn.

### BR11 — Settlement and reporting

Tổng quyết toán bữa = giá trị hiện hành + bồi thường ghi nhận. Số dư = tổng quyết toán − thu thành công phân bổ + hoàn đã thực hiện. Dương: cần thu trước khi đóng, không công nợ trả chậm; âm: cần hoàn. Thu/hoàn là giao dịch riêng, không sửa cọc, không trừ cọc hai lần. Bữa hủy dùng nghĩa vụ sau hủy thay giá trị phục vụ để tính số dư; sau thu hồi và quyết toán vẫn giữ `CANCELLED`, chỉ chốt `MealSettlement`, không chuyển thành `COMPLETED` phục vụ.

Báo cáo: doanh thu bữa thực hiện theo kỳ; chi phí tiêu thụ, food cost và lãi theo nguyên liệu theo tháng; tình hình đơn/bữa; thu/hoàn, tiền giữ lại do hủy; hao hụt/bồi thường; đánh giá. Lãi theo nguyên liệu = doanh thu món − chi phí tiêu thụ, chưa phải lợi nhuận ròng. Dashboard có tiệc sắp tới, chờ ký/cọc/quyết toán và cảnh báo nhân sự/dụng cụ. Chưa xuất PDF/Excel báo cáo.

### BR12 — Staffing

Gợi ý theo TS22–TS24: phục vụ = làm tròn lên (bàn bố trí / 3), bếp = max(2, làm tròn lên (bàn ăn / 5)), vận chuyển = 2 người / 10 bàn có rạp theo mặc định. Tư vấn ghi nhu cầu dự kiến theo vị trí khi nhận bữa; khung dự kiến suy ra từ giờ bữa và TS18 theo BR07, không cần lưu thêm khung nhân sự. Kiểm tra năng lực cộng nhu cầu các bữa giữ tạm/chính thức chồng giờ kể cả chưa phân công tên cụ thể, không chỉ trừ người đã có lịch. Quản lý nhân sự chọn người, vị trí, giờ làm thủ công; phải có mặt trước ít nhất TS18, không vượt TS20 (mặc định 12 giờ/ngày), nghỉ ít nhất TS21 (mặc định 8 giờ) giữa ca và không trùng khung giờ. Số người được lệch gợi ý, không chặn cứng. Người ngưng làm không nhận việc mới. Đổi người bằng sửa phân công, liên hệ ngoài hệ thống. Không xác nhận ca, chấm công hoặc tính lương.

### BR13 — Equipment

Mỗi loại có đơn vị, định mức theo người/bàn bố trí/bữa, tồn tối thiểu, dự trù % tùy chọn, giá bồi thường và trạng thái sử dụng. Lượng cần = làm tròn lên (định mức × cơ sở tính × (1 + dự trù)); dự trù trống dùng TS04 (mặc định 10%), nhập 0 nếu không dự trù, không thêm cờ bật/tắt. Đồ cồng kềnh có thể nhập lượng theo bữa trực tiếp. Loại ngưng không chọn cho bữa mới.

Giữ trước không trừ kho vật lý; xuất chuyển sẵn sàng sang đang sử dụng. Thu hồi tốt cộng sẵn sàng; hư/mất ghi riêng. Số xuất = tốt + hư + mất. Theo từng loại, hư + mất ≤ TS25 (mặc định 1%) số xuất thì miễn bồi thường, số khách chịu = 0. Vượt ngưỡng, nhân viên chọn số khách chịu không vượt hư + mất; tiền bồi thường = số khách chịu × giá chốt, không khấu trừ thêm 1% hoặc khấu trừ lương. Vẫn phải bảo đảm khoảng vệ sinh TS19 trước lượt dùng tiếp theo. Đồ hư chỉ về sẵn sàng khi ghi phục hồi; mua mới tăng sở hữu. Không cộng thu hồi hai lần.

### BR14 — Reviews

Mỗi bữa hoàn tất tối đa một đánh giá, không bắt buộc; người đặt hoặc nhân viên ghi hộ. Lưu điểm 1–5, nhận xét, người thực sự nhập. Dùng nội bộ, chưa kiểm duyệt/hiển thị công khai.

## Model and Related Documentation

[Detailed Domain Model](./models/domain-model.md) là nguồn thuộc tính, quan hệ và ràng buộc dữ liệu. [Order, Contract and Meal States](./business/order-contract-meal-states.md) tách tiến độ khỏi thanh toán; [Equipment Reservation, Issue and Recovery States](./business/ingredients-and-equipment/equipment-states.md) tách giữ trước khỏi xuất thực tế. [Catering Service Contract Contents](./references/service-contract.md) phục vụ lập hợp đồng, không thay đặc tả.

## Nonfunctional Requirements

- Tiếng Việt, dùng được trên điện thoại; dd/MM/yyyy, VNĐ, giờ Việt Nam. Cho chọn ngày âm/dương, lưu ngày dương và giờ cụ thể.
- Server kiểm tra quyền/sở hữu hồ sơ, tự tính tiền/kiểm tra tài nguyên; mật khẩu băm.
- Lưu người, thời điểm, mã tham chiếu/bằng chứng cho ký, thu/hoàn, phụ lục, kiểm kê, chấp nhận giá. Danh mục đã dùng chỉ ngưng, không xóa.
- Ghi tiền, giữ tài nguyên, chốt kỳ, tạo đợt giá nguyên tử và không ghi hai lần; lượng/tiền dùng số chính xác.
- Ảnh món, bản ký giấy và chứng từ lưu trong bucket public trên S3 hoặc dịch vụ lưu trữ object tương thích; cơ sở dữ liệu lưu object key và metadata qua `Attachment`, không lưu URL thay key. Tên bucket cấu hình riêng cho từng môi trường triển khai; URL được tạo từ cấu hình lưu trữ và key. Bất kỳ ai biết URL đều có thể truy cập tệp trực tiếp, kể cả bản ký và chứng từ.
- Sao lưu, phục hồi dữ liệu và tệp lưu trữ.
- SĐT là căn cứ liên kết theo phạm vi đã chốt, không xác minh OTP.

## Implementation Assumptions

Các chi tiết chưa có con số/cách tính chốt trong cuộc trao đổi dùng mặc định sau: bàn ăn chuẩn 10 người; set bằng tổng giá món; làm tròn tổng bữa theo 500 đồng; định giá tồn bình quân gia quyền tháng; phí xử lý hủy 0; đánh giá nội bộ. Đây là lựa chọn để đặc tả nhất quán, không phải kết quả khảo sát bổ sung. Thuế và mức phụ thu lễ là tham số, không khẳng định mức pháp định trong tài liệu này.
