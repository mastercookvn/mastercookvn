---
order: 10
---

# Đặc tả Use Case

## UC-HD-01

| Trường         | Nội dung                                                                         |
| -------------- | -------------------------------------------------------------------------------- |
| Tên            | Lập và phát hành Contract                                                        |
| Tác nhân       | Consultant                                                                 |
| Mục tiêu       | Chốt nội dung, giá các Meal thành một Contract chung chờ Customer xác nhận và Deposit.   |
| Kích hoạt      | Order vừa được nhận (UC-DT-05).                                                    |
| Tiền điều kiện | Order DaNhan, giữ tạm còn hạn.                                                     |
| Hậu điều kiện  | Contract ChoXacNhanCoc với bản chốt nội dung/giá, hạn 24 giờ, mức Deposit tối thiểu. |
| Quan hệ        | Sau UC-DT-05; tiếp theo UC-HD-02, UC-HD-03/UC-HD-04.                             |
| Quy tắc        | BR01, BR04, BR07, BR08                                                           |

**Luồng chính**

1. Hệ thống sinh Contract từ Order: bên A, Customer, từng Meal (thời gian, địa điểm, Serving Table, Setup Table, Dish, dịch vụ, phụ thu), điều khoản Deposit/sửa/hủy/bồi thường.
2. Consultant kiểm tra, chỉnh phụ thu thỏa thuận nếu có.
3. Hệ thống tính tổng từng Meal, tổng Contract, Deposit tối thiểu 50% (TS02), hạn Deposit = hạn giữ tạm 24 giờ (TS06). Bản chốt báo giá có thời hạn hiệu lực 7 ngày (TS05).
4. Consultant phát hành.
5. Hệ thống lưu bản chốt (tên, lượng, đơn giá, thuế, phụ thu, giá bồi thường Equipment), không đổi theo Catalog sau này.
6. Contract hiện trong Customer Profile (UC-DT-06); Consultant báo Customer qua Zalo/điện thoại.

**Luồng thay thế**

- 6a. Customer không có Account: Consultant in Contract để ký tại quầy (UC-HD-02).

**Ngoại lệ**

- 4e. Giữ tạm đã hết hạn: không phát hành; Order HetHan, phải tạo lại hoặc nhận lại.

## UC-HD-02

| Trường         | Nội dung                                                                   |
| -------------- | -------------------------------------------------------------------------- |
| Tên            | Xác nhận Contract                                                          |
| Tác nhân       | Customer, Consultant                                               |
| Mục tiêu       | Lưu sự đồng ý của Customer với bản Contract đã chốt.                          |
| Kích hoạt      | Contract đã phát hành.                                                     |
| Tiền điều kiện | Contract ChoXacNhanCoc, còn hạn.                                           |
| Hậu điều kiện  | Lưu xác nhận; nếu đủ Deposit thì Contract CoHieuLuc, giữ tạm thành chính thức. |
| Quan hệ        | Song song với UC-HD-03/UC-HD-04, thứ tự tùy ý.                             |
| Quy tắc        | BR02, BR07, BR08                                                           |

**Luồng chính**

1. Customer mở Contract từ UC-DT-06.
2. Hệ thống hiển thị bản chốt, hạn Deposit, mức Deposit tối thiểu.
3. Customer chọn đồng ý.
4. Hệ thống lưu phương thức online, Account, thời điểm, phiên bản nội dung.
5. Hệ thống kiểm tra Deposit: đủ thì chuyển CoHieuLuc, Meal DaXacNhan, giữ chính thức.

**Luồng thay thế**

- 1a. Ký giấy tại quầy: Consultant mở Contract, upload bản ký, nhập người ký, thời điểm; tiếp bước 5.
- 5a. Chưa đủ Deposit: giữ ChoXacNhanCoc, hiển thị số cần thu.

**Ngoại lệ**

- 1e. Hết hạn: Contract HetHan, không xác nhận được (BR07).
- 1f. Ký giấy chưa có file: không ghi đã ký.

## UC-HD-03

| Trường         | Nội dung                                                                          |
| -------------- | --------------------------------------------------------------------------------- |
| Tên            | Payment online                                                                 |
| Tác nhân       | Customer, Payment Service                                                    |
| Mục tiêu       | Customer trả Deposit, Deposit bổ sung hoặc phần còn lại qua QR/online.                       |
| Kích hoạt      | Customer chọn Payment trên Contract/Meal.                                          |
| Tiền điều kiện | Có số tiền cần thu; Contract chưa hết hạn/hủy.                                    |
| Hậu điều kiện  | Giao dịch ThanhCong ghi đúng một lần, phân bổ theo Meal; số dư, hiệu lực cập nhật. |
| Quan hệ        | Gọi từ UC-HD-02, UC-HD-05, UC-HD-08.                                              |
| Quy tắc        | BR01, BR08, BR11                                                                  |

**Luồng chính**

1. Hệ thống hiển thị số cần thu: Deposit (50–100% tổng theo TS02, TS03), Deposit bổ sung, hoặc số dư Settlement.
2. Customer chọn số tiền (với Deposit: trong dải 50–100%).
3. Hệ thống tạo giao dịch Cho với mã tham chiếu, phân bổ dự kiến theo giá trị Meal; hiển thị mã QR có hiệu lực 15 phút (TS07).
4. Customer chuyển tiền.
5. Payment Service gửi thông báo kết quả.
6. Hệ thống kiểm tra nguồn, mã giao dịch, số tiền; ghi ThanhCong, phân bổ.
7. Hệ thống tính lại số dư; với Deposit: đủ xác nhận + Deposit thì CoHieuLuc.

**Luồng thay thế**

- 5a. Payment thất bại/hủy: giao dịch ThatBai, Customer thử lại.
- 7a. Payment cho phần Deposit bổ sung của Addendum: đủ thì áp dụng Addendum (UC-HD-05).

**Ngoại lệ**

- 5e. Customer báo đã trả nhưng không có thông báo: không công nhận; chuyển UC-HD-04 nếu có chứng từ.
- 6e. Thông báo lặp cùng mã: không ghi thêm.
- 6f. Tiền về sau khi Contract HetHan: ghi giao dịch, không khôi phục chỗ, báo Accountant hoàn (UC-HD-07).

## UC-HD-04

| Trường         | Nội dung                                                                       |
| -------------- | ------------------------------------------------------------------------------ |
| Tên            | Ghi nhận Payment thủ công                                                   |
| Tác nhân       | Accountant                                                                        |
| Mục tiêu       | Ghi tiền mặt/chuyển khoản ngoài luồng QR.                                      |
| Kích hoạt      | Customer trả tiền mặt hoặc chuyển khoản trực tiếp.                                |
| Tiền điều kiện | Có số tiền cần thu; Accountant đã nhận tiền thực tế.                              |
| Hậu điều kiện  | Giao dịch ThanhCong có bằng chứng, phân bổ theo Meal; số dư, hiệu lực cập nhật. |
| Quan hệ        | Thay thế UC-HD-03.                                                             |
| Quy tắc        | BR01, BR08, BR11                                                               |

**Luồng chính**

1. Accountant tìm Contract (UC-DT-06).
2. Hệ thống hiển thị số cần thu theo loại (Deposit / Deposit bổ sung / Settlement).
3. Accountant nhập số tiền, phương thức, ngày nhận, mã chứng từ, đính kèm ảnh (nếu có).
4. Hệ thống đề xuất phân bổ theo Meal; Accountant xác nhận.
5. Hệ thống ghi ThanhCong, tính lại số dư, hiệu lực như UC-HD-03 bước 7.

**Luồng thay thế**

- 4a. Accountant chỉnh phân bổ: tổng phân bổ phải bằng số tiền.

**Ngoại lệ**

- 3e. Số tiền không dương hoặc trùng mã chứng từ: không ghi.
- 5e. Contract HetHan: ghi tiền, không khôi phục chỗ; tạo khoản phải hoàn.

## UC-HD-05

| Trường         | Nội dung                                                                            |
| -------------- | ----------------------------------------------------------------------------------- |
| Tên            | Điều chỉnh Meal bằng Addendum                                                         |
| Tác nhân       | Customer, Consultant                                                        |
| Mục tiêu       | Đổi Dish hoặc số Serving Table của một Meal mà không sửa đè Contract gốc.                    |
| Kích hoạt      | Customer yêu cầu đổi qua Zalo/điện thoại; Consultant lập Addendum.                          |
| Tiền điều kiện | Contract CoHieuLuc; Meal DaXacNhan, chưa diễn ra; không có Addendum chờ khác cho Meal. |
| Hậu điều kiện  | Addendum DaApDung, Meal và giữ tài nguyên cập nhật; các Meal khác giữ nguyên.          |
| Quan hệ        | Include UC-DT-04 khi tăng bàn. Có thể gọi UC-HD-03/UC-HD-04 thu Deposit bổ sung.        |
| Quy tắc        | BR09                                                                                |

**Luồng chính**

1. Consultant chọn Contract, chọn Meal.
2. Consultant nhập thay đổi: thay Dish (không tăng số Dish) và/hoặc số Serving Table.
3. Hệ thống kiểm tra hạn: đổi Dish còn ≥ 5 ngày (TS11), đổi bàn còn ≥ 3 ngày (TS12); giảm ≤ 15% số bàn ký ban đầu (TS13, làm tròn xuống).
4. Tăng bàn: hệ thống chạy UC-DT-04.
5. Hệ thống tính chênh lệch (Dish mới giá hiện hành, Dish không đổi giữ giá), Deposit bổ sung = 50% phần tăng nếu tăng > 3 bàn.
6. Hệ thống lập Addendum trước/sau, chênh lệch, Deposit bổ sung; trạng thái ChoXacNhan.
7. Customer xác nhận online (hoặc Consultant upload Addendum ký giấy).
8. Không cần Deposit bổ sung: hệ thống kiểm tra lại tài nguyên, cập nhật Meal và giữ trong một giao dịch, Addendum DaApDung.

**Luồng thay thế**

- 5a. Giảm bàn làm dư tiền: không hoàn ngay, đối trừ ở UC-HD-08.
- 7a. Customer không đồng ý: Consultant hủy Addendum (DaHuy), Meal giữ nguyên.
- 8a. Cần Deposit bổ sung: Addendum ChoCocBoSung; thu qua UC-HD-03/UC-HD-04 rồi tiếp bước 8.

**Ngoại lệ**

- 2e. Dời ngày, thêm Dish mới, đổi dịch vụ ngoài Contract: không hỗ trợ.
- 3e. Quá hạn hoặc giảm vượt 15%: từ chối thay đổi đó.
- 4e. Không đủ tài nguyên khi tăng: từ chối phần tăng.
- 8e. Tài nguyên bị chiếm trước khi áp dụng: không áp dụng, báo Consultant.

## UC-HD-06

| Trường         | Nội dung                                                                     |
| -------------- | ---------------------------------------------------------------------------- |
| Tên            | Hủy Meal hoặc Contract                                                        |
| Tác nhân       | Customer, Consultant                                                 |
| Mục tiêu       | Dừng phục vụ Meal được chọn, tính nghĩa vụ hoàn theo thời điểm yêu cầu.       |
| Kích hoạt      | Customer yêu cầu hủy.                                                           |
| Tiền điều kiện | Meal chưa bắt đầu phục vụ, chưa hủy.                                          |
| Hậu điều kiện  | Meal DaHuy, nhả giữ, hủy Staff Assignment, có khoản hoàn/giữ lại; Meal khác tiếp tục. |
| Quan hệ        | Có khoản phải hoàn thì tiếp UC-HD-07.                                        |
| Quy tắc        | BR01, BR08, BR10, BR11                                                       |

**Luồng chính**

1. Customer (từ UC-DT-06) hoặc Consultant chọn một/nhiều Meal cần hủy.
2. Hệ thống lưu thời điểm yêu cầu.
3. Hệ thống tính từng Meal: căn cứ Deposit (50% giá trị Meal), phần trả trước vượt Deposit (hoàn 100%), và bậc hoàn Deposit bắt buộc theo số ngày còn lại (TS14: $\ge 30$ ngày hoàn 100% Deposit bắt buộc với phí 0đ; 15–<30 ngày hoàn 50%; < 15 ngày hoặc đến giờ tiệc Customer vắng mặt hoàn 0%).
4. Hệ thống hiển thị tiền hoàn, tiền giữ lại từng Meal và tổng.
5. Người yêu cầu xác nhận hủy.
6. Hệ thống chuyển Meal DaHuy, nhả giữ Equipment, hủy Staff Assignment, ghi nghĩa vụ hoàn.
7. Mọi Meal đều hủy: Contract DaHuy, tiếp tục theo dõi hoàn.

**Luồng thay thế**

- 1a. Hủy cả Contract: chọn tất cả Meal chưa thực hiện; Meal đã thực hiện giữ Settlement.
- 3a. Chưa Deposit: hủy miễn phí; nếu là toàn bộ Order thì Order DaHuy.
- 6a. Đã xuất Equipment: vẫn phải thu hồi, kiểm đếm (UC-KHO-07).

**Ngoại lệ**

- 1e. Meal đang phục vụ hoặc đã xong: không hủy.
- 3e. Không lấy thời điểm Staff Member xử lý để đổi bậc hoàn; không hoàn vượt tiền đã thu.

## UC-HD-07

| Trường         | Nội dung                                                                        |
| -------------- | ------------------------------------------------------------------------------- |
| Tên            | Ghi nhận Refund                                                              |
| Tác nhân       | Accountant                                                                         |
| Mục tiêu       | Ghi khoản đã trả lại Customer kèm bằng chứng.                                      |
| Kích hoạt      | Có khoản phải hoàn do hủy, Settlement dư hoặc tiền về sau hết hạn.              |
| Tiền điều kiện | Có số phải hoàn > 0.                                                            |
| Hậu điều kiện  | Giao dịch hoàn ThanhCong, phân bổ Meal, có biên nhận/bằng chứng; số dư cập nhật. |
| Quan hệ        | Gọi từ UC-HD-06, UC-HD-08.                                                      |
| Quy tắc        | BR10, BR11                                                                      |

**Luồng chính**

1. Accountant mở danh sách khoản phải hoàn (dashboard hoặc UC-DT-06).
2. Accountant trả tiền cho Customer ngoài hệ thống (tiền mặt/chuyển khoản).
3. Accountant nhập số tiền, phương thức, ngày, đính kèm biên nhận (file Word ký/ảnh chuyển khoản).
4. Hệ thống ghi giao dịch hoàn mới, phân bổ Meal, tính lại số dư.

**Luồng thay thế**

- 3a. Hoàn nhiều lần: mỗi lần một giao dịch; khoản đóng khi đủ.

**Ngoại lệ**

- 3e. Số hoàn vượt số còn phải hoàn hoặc thiếu bằng chứng: không ghi.

## UC-HD-08

| Trường         | Nội dung                                                          |
| -------------- | ----------------------------------------------------------------- |
| Tên            | Settlement Meal và hoàn tất Contract                               |
| Tác nhân       | Accountant                                                           |
| Mục tiêu       | Đối trừ tiền đúng một lần, đóng Meal và Contract khi hết nghĩa vụ. |
| Kích hoạt      | Meal ChoQuyetToan, hoặc Meal DaHuy còn nghĩa vụ tiền.               |
| Tiền điều kiện | Đã kiểm đếm Equipment (nếu có xuất).                                |
| Hậu điều kiện  | Số dư Meal = 0, Meal HoanTat; mọi Meal xong thì Contract HoanTat.    |
| Quan hệ        | Số dư dương: UC-HD-03/UC-HD-04. Âm: UC-HD-07.                     |
| Quy tắc        | BR01, BR11, BR13                                                  |

**Luồng chính**

1. Accountant chọn Meal cần Settlement.
2. Hệ thống tổng hợp: giá trị Meal hiện hành (gồm Addendum), bồi thường Equipment, tiền đã thu và đã hoàn phân bổ cho Meal.
3. Hệ thống tính số dư = tổng Settlement − thu + hoàn; lập phiếu Settlement.
4. Số dư = 0: Accountant xác nhận, Meal HoanTat.
5. Hệ thống kiểm tra mọi Meal của Contract đã HoanTat/DaHuy và số dư 0: Contract HoanTat.

**Luồng thay thế**

- 1a. Meal DaHuy: dùng nghĩa vụ sau hủy thay giá trị Meal.
- 4a. Số dư dương: thu phần còn lại qua UC-HD-03/UC-HD-04, rồi bước 4.
- 4b. Số dư âm: ghi hoàn qua UC-HD-07, rồi bước 4.
- 5a. Còn Meal tương lai: Contract giữ CoHieuLuc.

**Ngoại lệ**

- 2e. Meal có xuất Equipment chưa kiểm đếm: không Settlement.
- 4e. Chưa thu/hoàn đủ: không đóng; không ghi công nợ trả chậm.
