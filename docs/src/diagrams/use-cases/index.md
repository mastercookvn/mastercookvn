# Đặc tả chi tiết Use Cases

Chỉ mục tài liệu đặc tả Use Case chi tiết của hệ thống MasterCookVN.

## Quy ước chung

- **Quy tắc nghiệp vụ**: Tra cứu mã BR tại [Đặc tả phần mềm](../../specification.md).
- **Danh mục Use Case**: Tra cứu mã và tên UC chuẩn tại [Danh mục chung](../index.md).
- **Sơ đồ tổng quan**: Xem [Sơ đồ Use Case tổng quát](../use-cases.md).
- **Quy ước bước**:
  - `N`: Bước thứ $N$ trong luồng chính.
  - `Na`: Luồng thay thế tại bước $N$.
  - `Ne`: Ngoại lệ tại bước $N$.

## Phân hệ chi tiết

- [Tài khoản và danh mục](./tai-khoan-danh-muc.md) — UC-TK-01 → UC-TK-03, UC-DM-01 → UC-DM-07.
- [Đặt tiệc](./dat-tiec.md) — UC-DT-01 → UC-DT-06.
- [Hợp đồng và thanh toán](./hop-dong-thanh-toan.md) — UC-HD-01 → UC-HD-08.
- [Nhân sự và vận hành](./nhan-su.md) — UC-NS-01, UC-NS-02, UC-VH-01.
- [Nguyên liệu và dụng cụ](./nguyen-lieu-dung-cu.md) — UC-KHO-01 → UC-KHO-08.
- [Đánh giá và báo cáo](./danh-gia-bao-cao.md) — UC-CS-01, UC-BC-01 → UC-BC-03.

## Bảng tra cứu tham số và giới hạn hệ thống (System Parameters & Constraints)

Hệ thống MasterCookVN áp dụng bộ tham số chuẩn hóa (tham chiếu từ [UC-DM-07](./tai-khoan-danh-muc.md#uc-dm-07) và [Đặc tả phần mềm](../../specification.md)) phục vụ kiểm soát ràng buộc dữ liệu toàn diện:

| Mã       | Tên tham số & Ràng buộc                      | Giá trị chuẩn        | Miền hợp lệ / Giới hạn                                                           | Phạm vi áp dụng              |
| :------- | :------------------------------------------- | :------------------- | :------------------------------------------------------------------------------- | :--------------------------- |
| **TS01** | Số người / bàn ăn tối thiểu                  | **10** người         | $\ge 10$ người/bàn (Hệ số quy mô = $n/10$)                                       | UC-DT-01, UC-DT-02           |
| **TS02** | Số người / bàn ăn khuyến nghị tối đa         | **12** người         | $10 \le n \le 12$ người (tránh quá tải bàn)                                      | UC-DT-01, UC-DT-02           |
| **TS03** | Số món tối thiểu thực đơn tự chọn            | **6** món            | $\ge 6$ món đang phục vụ                                                         | UC-DT-01, UC-DT-02           |
| **TS06** | Tỷ lệ cọc tối thiểu bắt buộc                 | **50%**              | $\ge 50\%$ tổng giá trị hợp đồng/bữa                                             | UC-HD-01, UC-HD-02, UC-HD-03 |
| **TS07** | Tỷ lệ cọc tối đa cho phép chọn               | **100%**             | $[50\%, 100\%]$ tổng giá trị                                                     | UC-HD-03, UC-HD-04           |
| **TS08** | Tỷ lệ dự phòng dụng cụ mặc định              | **10%**              | $\ge 0\%$ (lượng = $\lceil \text{định mức} \times (1 + \text{dự phòng}) \rceil$) | UC-DT-04, UC-KHO-06          |
| **TS11** | Số tiệc tối đa phục vụ / ngày                | **3** tiệc           | $\le 3$ tiệc / ngày toàn cơ sở                                                   | UC-DT-04, UC-DT-05           |
| **TS15** | Thời hạn hiệu lực báo giá (snapshot giá)     | **7** ngày           | Lưu cố định giá tại thời điểm chốt đơn                                           | UC-HD-01                     |
| **TS16** | Thời hạn giữ chỗ tạm chờ ký & cọc            | **24** giờ           | Quá 24h tự động nhả tài nguyên                                                   | UC-DT-05, UC-HD-01, UC-HD-02 |
| **TS17** | Thời hạn hiệu lực mã QR chuyển khoản         | **15** phút          | Hết hạn cần sinh mã QR mới                                                       | UC-HD-03                     |
| **TS18** | Số ngày đặt tiệc trước tối thiểu             | **3** ngày           | Ngày tiệc $-$ Ngày đặt $\ge 3$ ngày                                              | UC-DT-01, UC-DT-02           |
| **TS20** | Số ngày đặt tiệc trước tối đa                | **90** ngày          | Ngày tiệc $-$ Ngày đặt $\le 90$ ngày                                             | UC-DT-01, UC-DT-02           |
| **TS21** | Số bàn ăn tối thiểu / buổi tiệc              | **1** bàn            | $\ge 1$ bàn                                                                      | UC-DT-01, UC-DT-02           |
| **TS22** | Số bàn ăn tối đa / buổi tiệc                 | **40** bàn           | $\le 40$ bàn / bữa tiệc                                                          | UC-DT-01, UC-DT-02           |
| **TS23** | Mốc chốt thực đơn (khóa đổi món)             | **5** ngày           | Còn $\ge 5$ ngày mới được đổi món                                                | UC-HD-05                     |
| **TS24** | Mốc chốt số bàn ăn                           | **3** ngày           | Còn $\ge 3$ ngày mới được đổi số bàn                                             | UC-HD-05                     |
| **TS25** | Tỷ lệ giảm bàn ăn tối đa                     | **15%**              | Giảm $\le 15\%$ số bàn ký ban đầu (làm tròn xuống)                               | UC-HD-05                     |
| **TS27** | Bậc thang hoàn cọc khi hủy                   | Bảng 3 bậc           | $\ge 30$ ngày: 100%, 15–<30 ngày: 50%, <15 ngày: 0%                              | UC-HD-06, UC-HD-07           |
| **TS29** | Bán kính miễn phí vận chuyển                 | **10** km            | Khoảng cách $\le 10$ km                                                          | UC-DT-03                     |
| **TS30** | Phụ phí vận chuyển vượt bán kính chuẩn       | **15.000** đ/km      | Khoảng cách $> 10$ km và $\le 20$ km                                             | UC-DT-03                     |
| **TS31** | Bán kính phục vụ tối đa                      | **20** km            | Ngoài 20 km hệ thống từ chối nhận                                                | UC-DT-03, UC-DT-05           |
| **TS35** | Thời gian nhân sự có mặt trước tiệc          | **3** giờ            | Chuẩn bị hiện trường và bếp                                                      | UC-NS-02, UC-VH-01           |
| **TS36** | Thời gian cách ly vệ sinh dụng cụ            | **12** giờ           | Khoảng đệm giữa 2 lượt dùng                                                      | UC-DT-04, UC-KHO-06          |
| **TS40** | Số giờ làm việc tối đa / nhân viên / ngày    | **12** giờ           | $\le 12$ giờ / ngày                                                              | UC-NS-02                     |
| **TS41** | Thời gian nghỉ tối thiểu giữa 2 ca liên tiếp | **8** giờ            | $\ge 8$ giờ                                                                      | UC-NS-02                     |
| **TS42** | Định mức phục vụ gợi ý                       | **1 người / 3 bàn**  | $\lceil \text{số bàn bố trí} / 3 \rceil$                                         | UC-DT-04, UC-NS-02           |
| **TS43** | Định mức bếp gợi ý                           | **1 người / 5 bàn**  | Tối thiểu 2 bếp cho 1 tiệc                                                       | UC-DT-04, UC-NS-02           |
| **TS44** | Định mức bốc vác / vận chuyển gợi ý          | **2 người / 10 bàn** | Bố trí rạp và bàn ghế nặng                                                       | UC-DT-04, UC-NS-02           |
| **TS49** | Ngưỡng hao hụt dụng cụ miễn trừ bồi thường   | **1%**               | Hao hụt $\le 1\%$ số lượng xuất                                                  | UC-KHO-07                    |
| **TS51** | Đơn vị làm tròn tiền                         | **500** VNĐ          | Bội số 500đ gần nhất (làm tròn lên ở mốc 250đ)                                   | UC-DT-01, UC-DT-02, UC-HD-01 |
| **TS56** | Tổng năng lực bàn ghế toàn cơ sở / ngày      | **100** bàn          | Tổng số bàn bố trí cùng ngày $\le 100$                                           | UC-DT-04, UC-DT-05           |
| **TS57** | Số lần đăng nhập sai tối đa trước khi khóa   | **5** lần            | Khóa tạm thời, liên hệ quản lý mở                                                | UC-TK-02, UC-TK-03           |
