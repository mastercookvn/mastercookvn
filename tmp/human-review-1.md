# MasterCookVN báo cáo lần 1

## Workflow

1. Flow của mình anh **đề xuất** _(đề xuất thôi, mấy em nên lấy làm tham khảo, không phải bắt buộc vậy)_
   - File report google docs hiện tại, export ra markdown (1)
   - Từng cá nhân review lại note này, với cái gist AI anh gen, xem phần nào hợp lý thì lấy, thừa thì bỏ ra, sẽ quyết cái này trong lúc họp; Mình sẽ ra được bản lược bớt của cái gist (2)
   - Gom (1) với (2) kêu AI draft lại 1 bản markdown tương đối đầy đủ, theo format của khoa SE (3), mình review luôn tại đây
   - Lấy (3), chọn google docs / words (đánh số đau cả đít), hoặc typst (cân nhắc kỹ phía dưới) (4)
2. Mình cần làm kỹ từng bước, hạn chế kiểu tới viết docs/word/typst mà đi sửa nhiều ở khâu markdown trước đó
3. Code diagram vẫn là plantuml, mermaid, để trong git monorepo to đùng ở `./docs`, hoặc kèm với [d2](https://d2lang.com/)
4. Cần 1 bản "report dạng text", có thể chính từ (3) markdown, hoặc (4) typst, hoặc (4) docs/word convert thành markdown, để trong repo, cho AI nó hiểu mà vẽ diagram, đặc tả use case nếu cần, và cả code.

---

## Cần sửa trong report

- Tính giá tiền theo mâm thay vì bàn
- Không thêm món khi đã đặt, ngoài hợp đồng
- Field thay vì đối tượng cho "nhà cung cấp" _(field tên, số điện thoại nhà cung cấp)_
- Thay thuật ngữ "Thực đơn combo" -> "Set thực đơn"
- Dịch vụ _(1 đối tượng tên là dịch vụ: id, tên, desc, giá)_
  - Dọn dẹp, lau nơi đặt tiệc
  - karaoke -> thêm mic, loa, TV, amplify
    - Đang cân nhắc, delegate bên thứ 3, cần chốt
  - Trang trí (cổng)
- Dù 2 tiệc (sáng chiều; đám cưới), mình đều làm 2 hợp đồng
- Tiền làm tròn lên xuống _(mốc 500 VNĐ ấy)_. Chủ yếu là trong code mình phải guard vậy thôi

## Out of scope - xác nhận là out có đúng không nha!

- Không quan tâm quản lý số lượng vận chuyển, vận chuyển ra sao
  - Có thật là ... không tính đến chuyện này không? Mình làm "lưu động" mà?
- Không review, feedback từ khách đặt trước, cho mấy khách đặt sau
  - Ủa phải vậy không mấy đứa, hay anh nghe nhầm?

---

## Review cái AI gen hồi ... lâu - Pending discussion

Link AI review: https://gist.github.com/KevinNitroG/bd5cbbe6e94149d1acb45519df58c5f7

- Luồng đặt tiệc có thể thanh toán tiền mặt, bên cạnh online. Vì vậy, cần nhập riêng vào hệ thống.
  - Hiện tại chưa rõ ràng luồng hệ thống nên còn mơ hồ, có thể case phức tạp. Maybe... AI vẽ diagram ra xem?
- Hiện mới có role, chưa có resource (API rest hoặc gọi là use case) cụ thể, role nào được dùng
- Duyệt các actor, xem nào thiếu, đủ, thừa
- Duyệt use case (nhiều vl), bỏ bớt, thấy cái nào hữu ích thì copy lại
- Thiết kế như thế này có ok không: Phần quy định các dụng cụ (muỗng đũa ly nồi nước rửa chén cây lau nhà,...) số lượng tối thiểu nên available (chỉ warning thôi, đừng error)
- Điều khoản, hợp đồng là hard code frontend, hay phải xử lý làm đối tượng ở backend, db?

> [!NOTE]
> Target là đặt tiệc, bán được; không phải ràng buộc quá nhiều, tốn thời gian, không quá rườm rà hình thức

---

## Others

### Chuẩn bị data sẵn

Món ăn đang ở sheet tên [`Clone cho món ăn`](https://docs.google.com/spreadsheets/d/1oBs9wjMZPjtEaW5EGii_RXbny0FuKc7e6iVXgc0S18Y/edit?usp=sharing) trong folder chung, anh clone nó để không bị hư file gốc khi dùng gemini điền hộ ấy mà

Anh Nguyễn với mấy đứa phân chia giúp anh chọn ra cỡ 40-50 món trong cái list hơn 400 món, chia đều category, đi lủm "link hình" phù hợp kèm giá nếu có. Giá không nghĩ được thì mốt nhờ AI điền hộ, nhưng mà nó có thể hơi phi logic, kệ.

Nó sẽ cần tách ra thành nguyên liệu nữa, ẹ ẹ?

### Cân nhắc sử dụng typst

Mình cân nhắc sử dụng typst thay vì google docs hoặc words. Mấy em nên tìm hiểu trước, vì cái nào nó cũng có cái khó khăn riêng. Typst nó giống viết markdown, hoặc latex, linh hoạt bảng thì không bằng được, nhúng hình vào sẽ rườm rà hơn.

Mẫu typst:

1. https://github.com/notopia-uit/report - https://notopia-uit.github.io/report/DA1_23520161_TranNguyenThaiBinh_23521049_NguyenThaiGiaNguyen_SE121.Q21.pdf
2. https://github.com/Huangphoux/SE501_thuc-tap (không có preview lỏ)
3. https://github.com/Huangphoux/ay_gogh/tree/main/docs/DA1_bao_cao - https://github.com/Huangphoux/ay_gogh/blob/main/docs/DA1_bao_cao/DA1_23521224_TruongHoangPhuc_SE121.Q21.pdf

Nhắc lại là mỗi cái có cái khó riêng, typst chỉ giúp việc reference nhanh, AI dễ gen. Mấy em cũng cần phải học syntax typst (không quá khó nếu chỉ focus vào content, format thì anh set sẵn)

Cũng có trường hợp nhóm bạn anh trước cũng gấp rút nên Typst để dùng AI, nhưng mà về sau đòi về words vì, bảo là flexible bảng, dễ ngắt bảng (tại có mấy giảng viên gắt việc bảng bị cắt 1 tí, đòi sang trang, typst hiện chưa có cách để khắc phục cái này. Thật ra words ngắt tay thì typst cũng ngắt thủ công code thêm dòng break page thôi)

Typst mình chạy local, live preview file pdf bằng trình duyệt sẽ khá là lag. Bản thân khi mình save file thì nó sẽ precompile lại (incremental nên nhanh về sau)

Nếu typst thì mình sẽ để trong `./report` ở git monorepo, diagram vẫn ở `./docs`

---

## Trong buổi thuyết trình

### Cô nhận xét

- **Focus lưu động**, không có tại quán, không cung cấp mặt bằng
- **Nấu sẵn mang đi**. Phần lớn là nhà hàng là nấu sẵn
  - Nếu nấu tại chỗ, bếp ga. Nguyên liệu khách mua, mình hỗ trợ sơ chế. Mình chế biến là chính
- Tính tiền lời dựa trên nguyên liệu, mùa nguyên liệu đắt
- Không nên phân công nhân sự, 3 mân 1 người. Không chắc là khác vô tới 1 lượt, có khi khách vào từ từ, rồi ra sớm ra trễ? Mình serve không hết nó dư
  - Lưu động thì không phải đãi 1 lượt, không như nhà hàng. 100 mâm không phải 100 bàn
- Đến đông hơn, không giải quyết

### Trả lời cho nhóm khác

- 100 nhân sự, adjust dc tham so
- Hao hụt thêm field mất, hư hỏng
  - Nhân viên làm bể, trừ lương?
- Thêm kiểm soát khoảng cách, nhưng hiện tại nhập tra thủ công
- ==Không thêm món khi đã đặt, ngoài hợp đồng==
- Bổ sung thêm nhân sự khi đã đặt tiệc? wtf? ảo ma.

---

## Prompt refine

Target là đặt tiệc, không phải ràng buộc quá nhiều, tốn thời gian, không quá rườm rà hình thức
