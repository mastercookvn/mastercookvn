---
order: 20
---

# Tham số và giới hạn hệ thống

## Bảng tra cứu tham số và giới hạn hệ thống (System Parameters & Constraints)

Hệ thống MasterCookVN áp dụng bộ tham số chuẩn hóa (tham chiếu từ [UC-DM-07](./tai-khoan-va-danh-muc/use-case.md#uc-dm-07) và [Đặc tả phần mềm](../specification.md)). Ràng buộc bắt buộc chặn thao tác khi không hợp lệ; ngưỡng cảnh báo chỉ thông báo và không chặn. Giá trị tham khảo chỉ hiển thị, không tự kiểm tra. Backend cung cấp tham số hiện hành để giao diện hiển thị cảnh báo; backend vẫn kiểm tra dữ liệu bắt buộc và dùng giá trị hiện hành khi xử lý.

| Mã       | Tên tham số & Ràng buộc                      | Giá trị chuẩn        | Miền hợp lệ / Giới hạn                                                           | Phạm vi áp dụng              |
| :------- | :------------------------------------------- | :------------------- | :------------------------------------------------------------------------------- | :--------------------------- |
| **TS01** | Số món khuyến nghị thực đơn tự chọn          | **6** món            | Dưới ngưỡng cảnh báo, không chặn; danh sách trống không hợp lệ                   | UC-DT-01, UC-DT-02           |
| **TS02** | Tỷ lệ cọc tối thiểu bắt buộc                 | **50%**              | $\ge 50\%$ tổng giá trị hợp đồng/bữa                                             | UC-HD-01, UC-HD-02, UC-HD-03 |
| **TS03** | Tỷ lệ cọc tối đa cho phép chọn               | **100%**             | $[50\%, 100\%]$ tổng giá trị                                                     | UC-HD-03, UC-HD-04           |
| **TS04** | Tỷ lệ dự phòng dụng cụ mặc định              | **10%**              | $\ge 0\%$ (lượng = $\lceil \text{định mức} \times (1 + \text{dự phòng}) \rceil$) | UC-DT-04, UC-KHO-06          |
| **TS05** | Thời hạn hiệu lực báo giá (snapshot giá)     | **7** ngày           | Lưu cố định giá tại thời điểm chốt đơn                                           | UC-HD-01                     |
| **TS06** | Thời hạn giữ chỗ tạm chờ ký & cọc            | **24** giờ           | Quá 24h tự động nhả tài nguyên                                                   | UC-DT-05, UC-HD-01, UC-HD-02 |
| **TS07** | Thời hạn hiệu lực mã QR chuyển khoản         | **15** phút          | Hết hạn cần sinh mã QR mới                                                       | UC-HD-03                     |
| **TS08** | Số ngày đặt tiệc trước tối thiểu             | **3** ngày           | Ngày tiệc $-$ Ngày đặt $\ge 3$ ngày                                              | UC-DT-01, UC-DT-02           |
| **TS09** | Số ngày đặt tiệc trước tối đa                | **90** ngày          | Ngày tiệc $-$ Ngày đặt $\le 90$ ngày                                             | UC-DT-01, UC-DT-02           |
| **TS10** | Số bàn ăn tối thiểu / buổi tiệc              | **1** bàn            | $\ge 1$ bàn                                                                      | UC-DT-01, UC-DT-02           |
| **TS11** | Mốc chốt thực đơn (khóa đổi món)             | **5** ngày           | Còn $\ge 5$ ngày mới được đổi món                                                | UC-HD-05                     |
| **TS12** | Mốc chốt số bàn ăn                           | **3** ngày           | Còn $\ge 3$ ngày mới được đổi số bàn                                             | UC-HD-05                     |
| **TS13** | Tỷ lệ giảm bàn ăn tối đa                     | **15%**              | Giảm $\le 15\%$ số bàn ký ban đầu (làm tròn xuống)                               | UC-HD-05                     |
| **TS14** | Bậc thang hoàn cọc khi hủy                   | Bảng 3 bậc           | $\ge 30$ ngày: 100%, 15–<30 ngày: 50%, <15 ngày: 0%                              | UC-HD-06, UC-HD-07           |
| **TS15** | Bán kính miễn phí vận chuyển                 | **10** km            | Miễn phí 10 km đầu                                                               | UC-DT-03                     |
| **TS16** | Phụ phí vận chuyển vượt bán kính chuẩn       | **15.000** đ/km      | Phí = $\max(0, \text{khoảng cách} - \text{TS15}) \times \text{TS16}$             | UC-DT-03                     |
| **TS17** | Bán kính phục vụ tham khảo                   | **20** km            | Chỉ hiển thị; không tự đối chiếu, cảnh báo hoặc từ chối                          | UC-DT-03, UC-DT-05           |
| **TS18** | Thời gian nhân sự có mặt trước tiệc          | **3** giờ            | Chuẩn bị hiện trường và bếp                                                      | UC-NS-02, UC-VH-01           |
| **TS19** | Thời gian cách ly vệ sinh dụng cụ            | **12** giờ           | Khoảng đệm giữa 2 lượt dùng                                                      | UC-DT-04, UC-KHO-06          |
| **TS20** | Số giờ làm việc tối đa / nhân viên / ngày    | **12** giờ           | $\le 12$ giờ / ngày                                                              | UC-NS-02                     |
| **TS21** | Thời gian nghỉ tối thiểu giữa 2 ca liên tiếp | **8** giờ            | $\ge 8$ giờ                                                                      | UC-NS-02                     |
| **TS22** | Định mức phục vụ gợi ý                       | **1 người / 3 bàn**  | $\lceil \text{số bàn bố trí} / 3 \rceil$                                         | UC-DT-04, UC-NS-02           |
| **TS23** | Định mức bếp gợi ý                           | **1 người / 5 bàn**  | Tối thiểu 2 bếp cho 1 tiệc                                                       | UC-DT-04, UC-NS-02           |
| **TS24** | Định mức bốc vác / vận chuyển gợi ý          | **2 người / 10 bàn** | Bố trí rạp và bàn ghế nặng                                                       | UC-DT-04, UC-NS-02           |
| **TS25** | Ngưỡng hao hụt dụng cụ miễn trừ bồi thường   | **1%**               | Hao hụt $\le 1\%$ số lượng xuất                                                  | UC-KHO-07                    |
| **TS26** | Đơn vị làm tròn tiền                         | **500** VNĐ          | Bội số 500đ gần nhất (làm tròn lên ở mốc 250đ)                                   | UC-DT-01, UC-DT-02, UC-HD-01 |
| **TS27** | Số lần đăng nhập sai tối đa trước khi khóa   | **5** lần            | Khóa tạm thời, liên hệ quản lý mở                                                | UC-TK-02, UC-TK-03           |
