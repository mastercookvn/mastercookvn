---
order: 1
---

# Đặc tả phần mềm MasterCookVN

## 1. Mục tiêu và phạm vi

Website phục vụ một cơ sở nấu tiệc lưu động, từ Booking đến Settlement. Cơ sở không cung cấp mặt bằng. Trao đổi với Customer, Staff Member, Supplier qua điện thoại/Zalo diễn ra ngoài hệ thống.

Trong phạm vi: Customer tự đặt hoặc Staff Member đặt hộ; Multi-meal Contract; khảo sát Q&A; ký online/ký giấy; thu Deposit, sửa/hủy và Refund; Staff Profile và Staff Assignment; nhập Ingredient và thực hiện Inventory Count cuối tháng; food cost và đề xuất giá; nhập/xuất/thu hồi Equipment; đánh giá và báo cáo.

Ngoài phạm vi: phục vụ tại quán, cung cấp mặt bằng, đối tác thuê ngoài, xe/chuyến vận chuyển, dịch vụ/cho thuê Equipment độc lập, đám tang, tiệc không xác định quy mô, thử Dish, khuyến mãi, phân hạng Customer, hoa hồng, khiếu nại chuyên biệt, hóa đơn điện tử, công nợ trả chậm, CCCD, email, gửi Zalo tự động, nhắc lịch, thời tiết, offline, chấm công, nghỉ phép, đánh giá Staff Member, tính/trả lương, serial, kiểm soát chất lượng Ingredient, lô/hạn dùng, hao hụt sơ chế. Không trừ Ingredient theo từng tiệc; không phát sinh Dish/Serving Table/dịch vụ trong tiệc; không dời ngày hoặc hoãn tiệc.

## 2. Thuật ngữ

Các tài liệu dùng thuật ngữ tiếng Anh trong cột đầu làm tên chuẩn. Cột tiếng Việt chỉ dùng để đối chiếu khi đọc tài liệu cũ.

| Thuật ngữ chuẩn          | Thuật ngữ tiếng Việt                | Ý nghĩa                                                                    |
| ------------------------ | ----------------------------------- | -------------------------------------------------------------------------- |
| Booking                  | Đặt tiệc                             | Quá trình Customer chọn dịch vụ và gửi Order                               |
| Order                    | Đơn, đơn đặt tiệc                    | Yêu cầu đặt một hoặc nhiều Meal của cùng Customer                           |
| Meal                     | Bữa, bữa tiệc                        | Một lần phục vụ có thời gian, địa điểm và quy mô riêng                     |
| Contract                 | Hợp đồng                             | Thỏa thuận chung được phát hành cho một Order                              |
| Multi-meal Contract      | Hợp đồng nhiều bữa                   | Contract bao gồm từ hai Meal trở lên                                       |
| Addendum                 | Phụ lục, phụ lục hợp đồng            | Thỏa thuận điều chỉnh một phần Contract đã phát hành                       |
| Customer                 | Khách, khách hàng                    | Người đặt và sở hữu Order                                                  |
| Customer Profile         | Hồ sơ khách, hồ sơ khách hàng        | Hồ sơ nghiệp vụ của Customer, liên kết bằng số điện thoại                  |
| Supplier                 | Nhà cung cấp                         | Bên cung cấp Ingredient hoặc Equipment cho cơ sở                           |
| Account                  | Tài khoản                            | Danh tính dùng để đăng nhập hệ thống                                       |
| Role                     | Vai trò                              | Nhóm quyền được gán cho Account nội bộ                                     |
| Catalog                  | Danh mục                             | Tập dữ liệu dùng chung như Dish, Menu Set, Equipment và Event Type         |
| Branch Manager           | Quản lý cơ sở                        | Vai trò quản lý toàn bộ nghiệp vụ của cơ sở                                |
| Consultant               | Tư vấn, nhân viên tư vấn             | Vai trò tiếp nhận Order, khảo sát và xử lý Contract                        |
| Accountant               | Kế toán                              | Vai trò ghi thu, hoàn và Settlement                                        |
| Storekeeper              | Thủ kho                              | Vai trò nhập kho, Inventory Count và quản lý Equipment                     |
| HR Manager               | Quản lý nhân sự                      | Vai trò quản lý hồ sơ và Staff Assignment                                  |
| Internal Staff           | Nhân viên nội bộ                     | Staff Member có Account và ít nhất một Role nội bộ                         |
| Staff Member             | Nhân viên                            | Người làm việc cho cơ sở, có thể không có Account                          |
| Staff Profile            | Hồ sơ nhân sự, hồ sơ nhân viên       | Hồ sơ nghiệp vụ độc lập với Account                                        |
| Staff Assignment         | Phân công, phân công nhân sự         | Việc giao một Staff Member cho một Meal trong một khung giờ                |
| Dish                     | Món, món ăn                          | Món được chọn trong Menu của Meal                                          |
| Menu                     | Thực đơn                             | Danh sách Dish của Meal                                                    |
| Menu Set                 | Set thực đơn                         | Danh sách Dish gợi ý sẵn, tính giá theo Serving Table                      |
| Ingredient               | Nguyên liệu                          | Thành phần dùng để chế biến Dish                                           |
| Equipment                | Dụng cụ                              | Vật dụng được giữ, xuất và thu hồi cho Meal                                |
| Serving Table            | Bàn ăn                               | Đơn vị thực phẩm và tính giá, khác số bàn thực tế bố trí                   |
| Setup Table              | Bàn bố trí                           | Số bàn được bố trí đồng thời tại địa điểm                                  |
| Tables and Chairs        | Bàn ghế                              | Equipment bố trí đồng thời, có thể phục vụ cuốn chiếu                      |
| Recipe Quantity          | Định lượng món                       | Lượng Ingredient cho một Serving Table chuẩn 10 người                      |
| Current Ingredient Price | Giá nguyên liệu hiện hành            | Giá được xác nhận để ước tính chi phí và đề xuất giá bán                   |
| Actual Food Cost         | Food cost thực tế                    | Chi phí Ingredient tiêu thụ chia cho doanh thu Dish cùng kỳ                |
| Target Food Cost         | Food cost mục tiêu                   | Tỷ lệ dùng để đề xuất giá bán, khởi tạo 35%                                |
| Ingredient Margin        | Lãi theo nguyên liệu                 | Doanh thu Dish trừ Ingredient tiêu thụ; chưa trừ lương và chi phí khác     |
| Deposit                  | Cọc, tiền cọc                        | Khoản tiền bảo đảm thực hiện Contract                                      |
| Payment                  | Thanh toán                           | Giao dịch thu tiền của Customer                                            |
| Payment Service          | Dịch vụ thanh toán                   | Hệ thống bên ngoài thông báo kết quả Payment online                        |
| Refund                   | Hoàn tiền                            | Giao dịch trả tiền lại cho Customer                                        |
| Settlement               | Quyết toán                           | Việc xác định và xử lý số dư cuối của Meal                                 |
| Inventory Count          | Kiểm kê                              | Ghi nhận số lượng Ingredient thực tế cuối kỳ                               |
| Ingredient Receipt       | Phiếu nhập nguyên liệu               | Chứng từ ghi nhận Ingredient nhập kho                                      |
| Equipment Issue          | Phiếu xuất dụng cụ                   | Chứng từ ghi nhận Equipment được xuất cho Meal                             |
| Count Report             | Biên bản kiểm đếm                    | Kết quả đếm Equipment tốt, hư hoặc mất sau Meal                            |
| Event Type               | Loại tiệc                            | Phân loại sự kiện của Meal                                                 |
| Site Survey              | Khảo sát địa điểm                    | Thông tin khảo sát địa điểm phục vụ của Meal                               |
| Service Capacity         | Khả năng phục vụ                     | Khả năng đáp ứng Equipment và Staff Member trong khung giờ của Meal        |

`Catalog` chỉ dùng để chỉ danh mục dữ liệu nghiệp vụ. “Danh mục UC” vẫn giữ tiếng Việt vì đây là trang tra cứu tài liệu, không phải một Catalog của hệ thống. Tên file, đường dẫn, mã UC/BR, khóa cấu hình và định danh trong sơ đồ không đổi theo bảng này.

## 3. Tác nhân và quyền

Một Account nội bộ có thể kiêm nhiều Role; Staff Profile độc lập Account.

| Tác nhân           | Quyền theo nhóm chức năng                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| Customer         | Xem Catalog; đặt, xem, xác nhận Contract, Payment, yêu cầu sửa/hủy, đánh giá hồ sơ của mình |
| Branch Manager      | Account/quyền, Catalog, tham số, giá; toàn bộ nghiệp vụ và báo cáo                           |
| Consultant   | Customer Profile, đặt hộ, khảo sát, xác nhận nhận/từ chối tiệc, Contract/Addendum, lưu bản ký giấy    |
| Accountant            | Thu/hoàn, Settlement, chốt tồn và food cost tháng, báo cáo                                      |
| Storekeeper            | Nhập Ingredient/Equipment, thực hiện Inventory Count cho Ingredient, xuất/thu hồi Equipment                |
| HR Manager    | Staff Profile, Staff Assignment và lịch làm việc                                                     |
| Payment Service | Thông báo kết quả Payment online; chưa chốt Supplier                                     |

Bếp, phục vụ, vận chuyển là các vị trí được dùng khi tạo Staff Assignment, không bắt buộc Account. Supplier không truy cập hệ thống; tên và SĐT lưu trên phiếu nhập.

## 4. Quy trình tổng thể

1. Customer xem Catalog, tạm tính; Customer hoặc Consultant tạo Order gồm một/nhiều Meal.
2. Consultant ghi khảo sát Q&A, nhập khoảng cách; hệ thống kiểm tra tài nguyên theo từng khung giờ. Consultant xác nhận nhận/từ chối, không có cấp quản lý duyệt tiếp.
3. Phát hành Contract chung, chốt giá và hạn Deposit; Customer xác nhận online hoặc ký giấy tại quầy, Staff Member upload bản ký.
4. Thu Deposit online/tiền mặt; đủ xác nhận và Deposit thì Contract có hiệu lực. Tạo Staff Assignment riêng cho từng Meal.
5. Chuẩn bị Ingredient theo nhu cầu, ghi nhận phiếu mua/nhập; xuất Equipment và thực hiện tiệc.
6. Thu hồi/kiểm đếm, ghi bồi thường; Settlement từng Meal. Đóng Contract khi mọi Meal kết thúc/hủy và đã thu/hoàn đủ.
7. Cuối tháng thực hiện Inventory Count, chốt tiêu thụ và food cost; đầu tháng sau tạo đợt đề xuất giá để quản lý xử lý.

Danh mục UC chỉ duy trì tại [Danh mục Use Case](./nghiep-vu/danh-muc-use-case.md), không lập lại ở đây. Tra cứu [tham số và giới hạn hệ thống](./nghiep-vu/tham-so.md).

## 5. Quy tắc nghiệp vụ

### BR01 — Multi-meal Contract

Một Order có ít nhất một Meal và tối đa một Contract. Mỗi Meal có Menu, dịch vụ, thời gian phục vụ, khoảng sử dụng tài nguyên, số Serving Table, số Tables and Chairs, địa điểm và khảo sát riêng. Cùng địa chỉ vẫn khảo sát riêng. Thu/hoàn gắn Contract, phân bổ theo Meal để sửa/hủy và Settlement; tổng phân bổ bằng số tiền giao dịch.

### BR02 — Account và Customer Profile

Đăng ký/đăng nhập bằng SĐT và mật khẩu, không OTP. SĐT chuẩn hóa duy nhất cho Customer Profile; một SĐT ứng với một người/tên. Staff Member đặt hộ nhập tên, SĐT để tìm/tạo hồ sơ, không tự tạo Account. Customer đăng ký cùng SĐT được liên kết hồ sơ, thấy Order/Contract chờ xác nhận. Không cần Account nếu ký tại quầy. Quản lý tạo Account nội bộ; đặt lại mật khẩu qua Staff Member, không email.

### BR03 — Serving Table và Tables and Chairs

Giá và định lượng theo Serving Table chuẩn 10 suất; hệ thống không nhập số người thực tế trên mỗi bàn. Customer tự quyết định số người ngồi, không làm thay đổi giá hay định lượng bàn chuẩn. Nhập số Serving Table và số Setup Table riêng; số Setup Table không vượt số Serving Table. Equipment theo người tính theo số suất chuẩn = số Serving Table × 10, kể cả khi phục vụ cuốn chiếu; Equipment khác tính theo Setup Table hoặc nhu cầu Meal. Không đồng nhất số Serving Table với Tables and Chairs. Ví dụ 30 Serving Table trên 10 Setup Table cuốn chiếu: dự trù Equipment theo người cho 300 suất, gợi ý 4 người phục vụ.

### BR04 — Giá và chốt giá

- Giá gợi ý Dish/Serving Table chuẩn = Σ(định lượng × Current Ingredient Price) / Target Food Cost. Quản lý chấp nhận hoặc nhập giá khác, không tự đổi giá bán.
- Set là tổng giá bán Dish trong set, không cộng lợi nhuận lần nữa. Menu tự chọn phải có ít nhất một Dish đang phục vụ; dưới ngưỡng khuyến nghị hiện hành (mặc định 6 Dish) thì cảnh báo nhưng vẫn được tạm tính và gửi Order để Consultant xem xét.
- Tiền Dish của Meal = tổng giá Dish chuẩn × số Serving Table. Cộng dịch vụ (đơn giá × lượng), phí vận chuyển theo khảo sát, phụ thu thỏa thuận, rồi thuế theo tham số; không cộng phí vận chuyển hai lần. Phụ thu lễ dùng danh sách ngày cố định âm/dương, không có UC quản lý ngày lễ riêng.
- Tạm tính chưa phải cam kết. Phát hành Contract lưu bản chốt tên, lượng, đơn giá, thuế, phụ thu, điều khoản và giá bồi thường; sửa Catalog không đổi Contract cũ.
- VNĐ nguyên; tổng mỗi Meal làm tròn tới bội số 500 gần nhất, đúng nửa làm tròn lên; lưu chênh lệch riêng. Tổng Contract bằng tổng các Meal; giao dịch ghi đúng tiền thực thu/hoàn.

### BR05 — Đề xuất giá Ingredient theo tháng

Đầu tháng tạo một đợt cho Ingredient có phiếu nhập trong 30 ngày trước mốc đầu tháng. Chia ba khoảng 10 ngày từ cũ đến mới, trọng số 1,5; 1,5; 2. Giá đề xuất = Σ(lượng nhập × đơn giá × trọng số) / Σ(lượng nhập × trọng số). Dùng cùng đơn vị chuẩn mỗi Ingredient; không có nhập thì giữ giá, không đề xuất 0.

Cron và kiểm tra bù trên server dùng chung thao tác: tháng hiện tại chưa có đợt thì tạo theo cùng mốc đầu tháng, kể cả chạy muộn. Khóa duy nhất theo tháng, tạo đợt và chi tiết nguyên tử. Lưu giá cũ/đề xuất/được chọn, người và thời điểm xử lý. Quản lý chấp nhận, chỉnh hoặc bỏ qua từng dòng. Giá Ingredient đổi thì liệt kê Dish bị ảnh hưởng và giá Dish gợi ý; quản lý quyết định giá bán.

### BR06 — Inventory Count và food cost tháng

Không có phiếu xuất Ingredient theo tiệc, không trừ tồn sau tiệc. Trong tháng ghi phiếu nhập; cuối tháng Storekeeper thực hiện Inventory Count và ghi lượng thực tế, Accountant chốt giá trị tồn. Tồn đầu tháng là tồn cuối tháng trước; tháng đầu nhập lượng và đơn giá tồn ban đầu.

Đề xuất định giá tồn bằng bình quân gia quyền tháng: đơn giá tồn = (giá trị đầu + giá trị nhập) / (lượng đầu + lượng nhập); giá trị cuối = lượng cuối theo Inventory Count × đơn giá tồn. Nếu mẫu số bằng 0 thì giá bằng 0, không ghi tồn cuối dương khi chưa bổ sung nguồn. Lượng cuối không vượt đầu + nhập; đối chiếu chênh lệch trước chốt. Giá tồn độc lập giá gợi ý BR05.

Chi phí tiêu thụ = giá trị đầu + giá trị nhập − giá trị cuối. Actual Food Cost = chi phí tiêu thụ / doanh thu Dish cùng tháng × 100%. Doanh thu theo ngày Meal đã thực hiện, không gồm Deposit chưa thực hiện, thuế, dịch vụ, bồi thường hoặc tiền giữ lại do hủy. Doanh thu bằng 0 thì chưa xác định, không chia 0.

Mục tiêu khởi tạo 35%; sau chốt tháng quản lý có thể dùng tỷ lệ thực tế làm mục tiêu tháng sau hoặc giữ/chỉnh tay. Không tự ghi đè mục tiêu. Lưu bản chốt theo tháng; điều chỉnh nguồn cần mở lại kỳ và chốt lại cả các kỳ sau bị ảnh hưởng. Không phân bổ chi phí mua chung thành chi phí thực tế từng Meal.

### BR07 — Nhận tiệc và giữ chỗ

Consultant nhập khoảng cách thủ công; hệ thống hiển thị mốc tham khảo 20 km, không tự đối chiếu, cảnh báo theo khoảng cách hoặc từ chối nhận theo mốc này. Consultant tự đánh giá địa điểm ngoài hệ thống; không tích hợp bản đồ. Phí vận chuyển miễn 10 km đầu, tính 15.000 đồng/km vượt 10 km, kể cả khi khoảng cách vượt 20 km; dùng khoảng cách do Consultant nhập. Nhập khoảng sử dụng Equipment và giờ làm nhân sự cho từng Meal, không tự tính lộ trình/vệ sinh. Kiểm tra cả các Meal cùng Order và Contract khác trong khung chồng lấn.

Xác nhận nhận tiệc giữ tài nguyên tạm 24 giờ chờ Deposit; đủ BR08 thì giữ chính thức. Server loại giữ hết hạn khi tra cứu/kiểm tra/xử lý Order, không phụ thuộc cron riêng. Hết hạn chưa đủ ký/Deposit thì đánh dấu hết hạn, nhả giữ; khoản đã thu vẫn lưu để hoàn, không xóa giao dịch.

Tồn tối thiểu chỉ cảnh báo; thiếu tài nguyên thực tế thì không xác nhận nhận đến khi bổ sung/điều chỉnh. Không dùng trần số tiệc/ngày độc lập với tài nguyên.

### BR08 — Ký và Deposit

Tạm thời, ký online chỉ là Customer dùng Account để xác nhận đồng ý nội dung Contract trên hệ thống; không triển khai OTP, chữ ký số hoặc quy trình xác minh chữ ký phức tạp.

Consultant phát hành là xác nhận phía cơ sở. Customer xác nhận online bằng Account hoặc Staff Member ghi ký giấy kèm file. Deposit 50%–100% tổng Contract trong 24 giờ. Phân bổ theo giá trị từng Meal; Deposit bắt buộc ban đầu bằng 50% giá trị Meal, phần vượt là trả trước. Sau Addendum chỉ yêu cầu Deposit bổ sung khi thuộc BR09, không tự làm Contract mất hiệu lực do tỷ lệ Deposit mới thấp hơn 50%. Khi hủy, phần Deposit làm căn cứ là mức nhỏ hơn giữa 50% giá trị Meal hiện hành và số tiền đã thu còn phân bổ cho Meal; phần vượt căn cứ đó là trả trước được hoàn đủ.

Contract có hiệu lực khi Customer đã xác nhận và thu đủ Deposit bắt buộc. Online dùng thông báo Payment Service; tiền mặt/chuyển khoản ngoài luồng do Accountant ghi. Không công nhận chỉ từ nút Customer bấm đã trả. Mã giao dịch bên cung cấp duy nhất, không cộng trùng khi nhận lại thông báo.

### BR09 — Điều chỉnh từng Meal

Không dời ngày. Còn ít nhất 5 ngày được đổi Dish đã chọn, không thêm Dish mới. Còn ít nhất 3 ngày được tăng/giảm Serving Table; giảm tối đa 15% số bàn ký ban đầu, số bàn giảm làm tròn xuống. Tăng thì kiểm tra lại tài nguyên. Đổi Dish tính chênh lệch theo giá mới thỏa thuận, giữ giá Dish không đổi. Tăng trên 3 bàn trong một yêu cầu thì Deposit bổ sung 50% phần tăng.

Consultant lập Addendum trước/sau, chênh lệch; Customer xác nhận online/ký giấy, không thêm cấp duyệt. Chỉ cập nhật Meal và tài nguyên khi Addendum được xác nhận, đủ Deposit bổ sung nếu có. Giảm làm dư tiền thì xử lý khi Settlement. Sửa một Meal không làm Contract thành đã hủy.

### BR10 — Hủy và hoàn

Hủy từng Meal/cả Contract; tính riêng theo thời điểm yêu cầu và giờ bắt đầu Meal, không theo lúc Staff Member xử lý.

| Thời điểm                           | Hoàn phần Deposit bắt buộc                                                    |
| ----------------------------------- | ------------------------------------------------------------------------- |
| Chưa Deposit                            | Hủy miễn phí ngay                                                         |
| Còn ít nhất 30 ngày                 | 100%, phí xử lý mặc định 0                                                |
| Còn 15 đến dưới 30 ngày             | 50%                                                                       |
| Còn dưới 15 ngày                    | 0%                                                                        |
| Đến giờ bắt đầu, Customer không có mặt | 0%; Ingredient đã chế biến chỉ thu thêm theo thỏa thuận, không thu trùng |

Phần trả vượt Deposit bắt buộc hoàn đủ. Hủy Contract cộng kết quả các Meal chưa thực hiện, giữ Settlement Meal đã thực hiện. Nhả tài nguyên/hủy Staff Assignment ngay khi hủy; Refund ghi riêng, xử lý sau. Không xây luồng Customer hủy giữa lúc phục vụ. Không UC cơ sở hủy riêng; trách nhiệm ghi trong Contract, xử lý thỏa thuận ngoài luồng chuẩn.

### BR11 — Settlement và báo cáo

Tổng Settlement Meal = giá trị hiện hành + bồi thường ghi nhận. Số dư = tổng Settlement − thu thành công phân bổ + hoàn đã thực hiện. Dương: cần thu trước khi đóng, không công nợ trả chậm; âm: cần hoàn. Thu/hoàn là giao dịch riêng, không sửa Deposit, không trừ Deposit hai lần. Meal hủy dùng nghĩa vụ sau hủy thay giá trị phục vụ để tính số dư.

Báo cáo: doanh thu Meal thực hiện theo kỳ; chi phí tiêu thụ, food cost và Ingredient Margin theo tháng; tình hình Order/Meal; thu/hoàn, tiền giữ lại do hủy; hao hụt/bồi thường; đánh giá. Ingredient Margin = doanh thu Dish − chi phí tiêu thụ, chưa phải lợi nhuận ròng. Dashboard có tiệc sắp tới, chờ ký/Deposit/Settlement và cảnh báo nhân sự/Equipment. Chưa xuất PDF/Excel báo cáo.

### BR12 — Nhân sự

Gợi ý phục vụ = làm tròn lên (số Setup Table đồng thời / 3). Consultant ghi nhu cầu nhân sự dự kiến theo vị trí khi nhận Meal; kiểm tra năng lực phải cộng nhu cầu các Meal giữ tạm/chính thức chồng giờ kể cả chưa có Staff Assignment cho Staff Member cụ thể, không chỉ trừ người đã có lịch. HR Manager chọn người, vị trí, giờ làm thủ công và điều chỉnh lượng theo thực tế; gợi ý không chặn cứng. Không phân một người vào hai khung chồng lấn; người ngưng làm không nhận việc mới. Đổi người bằng sửa Staff Assignment, liên hệ ngoài hệ thống. Không xác nhận ca, chấm công hoặc tính lương.

### BR13 — Equipment

Mỗi loại có đơn vị, định mức theo người/Setup Table/Meal, tồn tối thiểu, dự trù % tùy chọn, giá bồi thường. Lượng cần = làm tròn lên (định mức × cơ sở tính × (1 + dự trù)); dự trù trống là 0, không thêm cờ bật/tắt. Đồ cồng kềnh có thể nhập lượng theo Meal trực tiếp.

Giữ trước không trừ kho vật lý; xuất chuyển sẵn sàng sang đang sử dụng. Thu hồi tốt cộng sẵn sàng; hư/mất ghi riêng. Số xuất = tốt + hư + mất. Staff Member chọn số lượng Customer chịu trách nhiệm, không vượt hư/mất; tiền bồi thường = số lượng Customer chịu trách nhiệm × giá chốt, không miễn tự động theo ngưỡng/khấu trừ lương. Đồ hư chỉ về sẵn sàng khi ghi phục hồi; mua mới tăng sở hữu. Không cộng thu hồi hai lần.

### BR14 — Đánh giá

Mỗi Meal hoàn tất tối đa một đánh giá, không bắt buộc; người đặt hoặc Staff Member ghi hộ. Lưu điểm 1–5, nhận xét, người thực sự nhập. Dùng nội bộ, chưa kiểm duyệt/hiển thị công khai.

## 6. Mô hình và tài liệu liên quan

[Mô hình lớp](./mo-hinh/mo-hinh-lop-class.md) là nguồn thuộc tính, quan hệ và ràng buộc dữ liệu. [Trạng thái Order/Contract/Meal](./nghiep-vu/trang-thai-don-hop-dong-va-bua.md) tách tiến độ khỏi Payment; [trạng thái Equipment](./nghiep-vu/nguyen-lieu-va-dung-cu/trang-thai-dung-cu.md) tách giữ trước khỏi xuất thực tế. [Nội dung Contract](./references/service-contract.md) phục vụ lập Contract, không thay đặc tả.

## 7. Phi chức năng

- Tiếng Việt, dùng được trên điện thoại; dd/MM/yyyy, VNĐ, giờ Việt Nam. Cho chọn ngày âm/dương, lưu ngày dương và giờ cụ thể.
- Server kiểm tra quyền/sở hữu hồ sơ, tự tính tiền/kiểm tra tài nguyên; mật khẩu băm.
- Lưu người, thời điểm, mã tham chiếu/bằng chứng cho ký, thu/hoàn, Addendum, Inventory Count, chấp nhận giá. Catalog đã dùng chỉ ngưng, không xóa.
- Ghi tiền, giữ tài nguyên, chốt kỳ, tạo đợt giá nguyên tử và không ghi hai lần; lượng/tiền dùng số chính xác.
- Ảnh Dish, bản ký giấy và chứng từ lưu trong bucket public trên S3 hoặc dịch vụ lưu trữ object tương thích; cơ sở dữ liệu lưu object key và metadata qua `TepDinhKem`, không lưu URL thay key. Tên bucket cấu hình riêng cho từng môi trường triển khai; URL được tạo từ cấu hình lưu trữ và key. Bất kỳ ai biết URL đều có thể truy cập tệp trực tiếp, kể cả bản ký và chứng từ.
- Sao lưu, phục hồi dữ liệu và tệp lưu trữ.
- SĐT là căn cứ liên kết theo phạm vi đã chốt, không xác minh OTP.

## 8. Giả định triển khai đã chọn

Các chi tiết chưa có con số/cách tính chốt trong cuộc trao đổi dùng mặc định sau: Serving Table chuẩn 10 người; set bằng tổng giá Dish; làm tròn tổng Meal theo 500 đồng; định giá tồn bình quân gia quyền tháng; phí xử lý hủy 0; đánh giá nội bộ. Đây là lựa chọn để đặc tả nhất quán, không phải kết quả khảo sát bổ sung. Thuế và mức phụ thu lễ là tham số, không khẳng định mức pháp định trong tài liệu này.
