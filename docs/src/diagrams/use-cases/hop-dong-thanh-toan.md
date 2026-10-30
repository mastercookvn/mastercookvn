# Hợp đồng và thanh toán

## UC-HD-01

| Trường | Nội dung |
| --- | --- |
| Tên | Lập và phát hành hợp đồng |
| Tác nhân | Nhân viên tư vấn |
| Mục tiêu | Chốt nội dung, giá các bữa thành một hợp đồng chung chờ khách xác nhận và cọc. |
| Kích hoạt | Đơn vừa được nhận (UC-DT-05). |
| Tiền điều kiện | Đơn DaNhan, giữ tạm còn hạn. |
| Hậu điều kiện | Hợp đồng ChoXacNhanCoc với bản chốt nội dung/giá, hạn 24 giờ, mức cọc tối thiểu. |
| Quan hệ | Sau UC-DT-05; tiếp theo UC-HD-02, UC-HD-03/UC-HD-04. |
| Quy tắc | BR01, BR04, BR07, BR08 |

**Luồng chính**

1. Hệ thống sinh hợp đồng từ đơn: bên A, khách, từng bữa (thời gian, địa điểm, bàn ăn, bàn bố trí, món, dịch vụ, phụ thu), điều khoản cọc/sửa/hủy/bồi thường.
2. Tư vấn kiểm tra, chỉnh phụ thu thỏa thuận nếu có.
3. Hệ thống tính tổng từng bữa, tổng hợp đồng, cọc tối thiểu 50%, hạn cọc = hạn giữ tạm.
4. Tư vấn phát hành.
5. Hệ thống lưu bản chốt (tên, lượng, đơn giá, thuế, phụ thu, giá bồi thường dụng cụ), không đổi theo danh mục sau này.
6. Hợp đồng hiện trong hồ sơ khách (UC-DT-06); tư vấn báo khách qua Zalo/điện thoại.

**Luồng thay thế**

- 6a. Khách không có tài khoản: tư vấn in hợp đồng để ký tại quầy (UC-HD-02).

**Ngoại lệ**

- 4e. Giữ tạm đã hết hạn: không phát hành; đơn HetHan, phải tạo lại hoặc nhận lại.

## UC-HD-02

| Trường | Nội dung |
| --- | --- |
| Tên | Xác nhận hợp đồng |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Mục tiêu | Lưu sự đồng ý của khách với bản hợp đồng đã chốt. |
| Kích hoạt | Hợp đồng đã phát hành. |
| Tiền điều kiện | Hợp đồng ChoXacNhanCoc, còn hạn. |
| Hậu điều kiện | Lưu xác nhận; nếu đủ cọc thì hợp đồng CoHieuLuc, giữ tạm thành chính thức. |
| Quan hệ | Song song với UC-HD-03/UC-HD-04, thứ tự tùy ý. |
| Quy tắc | BR02, BR07, BR08 |

**Luồng chính**

1. Khách mở hợp đồng từ UC-DT-06.
2. Hệ thống hiển thị bản chốt, hạn cọc, mức cọc tối thiểu.
3. Khách chọn đồng ý.
4. Hệ thống lưu phương thức online, tài khoản, thời điểm, phiên bản nội dung.
5. Hệ thống kiểm tra cọc: đủ thì chuyển CoHieuLuc, bữa DaXacNhan, giữ chính thức.

**Luồng thay thế**

- 1a. Ký giấy tại quầy: tư vấn mở hợp đồng, upload bản ký, nhập người ký, thời điểm; tiếp bước 5.
- 5a. Chưa đủ cọc: giữ ChoXacNhanCoc, hiển thị số cần thu.

**Ngoại lệ**

- 1e. Hết hạn: hợp đồng HetHan, không xác nhận được (BR07).
- 1f. Ký giấy chưa có file: không ghi đã ký.

## UC-HD-03

| Trường | Nội dung |
| --- | --- |
| Tên | Thanh toán online |
| Tác nhân | Khách hàng, Dịch vụ thanh toán |
| Mục tiêu | Khách trả cọc, cọc bổ sung hoặc phần còn lại qua QR/online. |
| Kích hoạt | Khách chọn thanh toán trên hợp đồng/bữa. |
| Tiền điều kiện | Có số tiền cần thu; hợp đồng chưa hết hạn/hủy. |
| Hậu điều kiện | Giao dịch ThanhCong ghi đúng một lần, phân bổ theo bữa; số dư, hiệu lực cập nhật. |
| Quan hệ | Gọi từ UC-HD-02, UC-HD-05, UC-HD-08. |
| Quy tắc | BR01, BR08, BR11 |

**Luồng chính**

1. Hệ thống hiển thị số cần thu: cọc (50–100% tổng), cọc bổ sung, hoặc số dư quyết toán.
2. Khách chọn số tiền (với cọc: trong 50–100%).
3. Hệ thống tạo giao dịch Cho với mã tham chiếu, phân bổ dự kiến theo giá trị bữa; hiển thị QR.
4. Khách chuyển tiền.
5. Dịch vụ thanh toán gửi thông báo kết quả.
6. Hệ thống kiểm tra nguồn, mã giao dịch, số tiền; ghi ThanhCong, phân bổ.
7. Hệ thống tính lại số dư; với cọc: đủ xác nhận + cọc thì CoHieuLuc.

**Luồng thay thế**

- 5a. Thanh toán thất bại/hủy: giao dịch ThatBai, khách thử lại.
- 7a. Thanh toán cọc bổ sung phụ lục: đủ thì áp dụng phụ lục (UC-HD-05).

**Ngoại lệ**

- 5e. Khách báo đã trả nhưng không có thông báo: không công nhận; chuyển UC-HD-04 nếu có chứng từ.
- 6e. Thông báo lặp cùng mã: không ghi thêm.
- 6f. Tiền về sau khi hợp đồng HetHan: ghi giao dịch, không khôi phục chỗ, báo kế toán hoàn (UC-HD-07).

## UC-HD-04

| Trường | Nội dung |
| --- | --- |
| Tên | Ghi nhận thanh toán thủ công |
| Tác nhân | Kế toán |
| Mục tiêu | Ghi tiền mặt/chuyển khoản ngoài luồng QR. |
| Kích hoạt | Khách trả tiền mặt hoặc chuyển khoản trực tiếp. |
| Tiền điều kiện | Có số tiền cần thu; kế toán đã nhận tiền thực tế. |
| Hậu điều kiện | Giao dịch ThanhCong có bằng chứng, phân bổ theo bữa; số dư, hiệu lực cập nhật. |
| Quan hệ | Thay thế UC-HD-03. |
| Quy tắc | BR01, BR08, BR11 |

**Luồng chính**

1. Kế toán tìm hợp đồng (UC-DT-06).
2. Hệ thống hiển thị số cần thu theo loại (cọc / cọc bổ sung / quyết toán).
3. Kế toán nhập số tiền, phương thức, ngày nhận, mã chứng từ, đính kèm ảnh (nếu có).
4. Hệ thống đề xuất phân bổ theo bữa; kế toán xác nhận.
5. Hệ thống ghi ThanhCong, tính lại số dư, hiệu lực như UC-HD-03 bước 7.

**Luồng thay thế**

- 4a. Kế toán chỉnh phân bổ: tổng phân bổ phải bằng số tiền.

**Ngoại lệ**

- 3e. Số tiền không dương hoặc trùng mã chứng từ: không ghi.
- 5e. Hợp đồng HetHan: ghi tiền, không khôi phục chỗ; tạo khoản phải hoàn.

## UC-HD-05

| Trường | Nội dung |
| --- | --- |
| Tên | Điều chỉnh bữa bằng phụ lục |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Mục tiêu | Đổi món hoặc số bàn ăn của một bữa mà không sửa đè hợp đồng gốc. |
| Kích hoạt | Khách yêu cầu đổi qua Zalo/điện thoại; tư vấn lập phụ lục. |
| Tiền điều kiện | Hợp đồng CoHieuLuc; bữa DaXacNhan, chưa diễn ra; không có phụ lục chờ khác cho bữa. |
| Hậu điều kiện | Phụ lục DaApDung, bữa và giữ tài nguyên cập nhật; các bữa khác giữ nguyên. |
| Quan hệ | Include UC-DT-04 khi tăng bàn. Có thể gọi UC-HD-03/UC-HD-04 thu cọc bổ sung. |
| Quy tắc | BR09 |

**Luồng chính**

1. Tư vấn chọn hợp đồng, chọn bữa.
2. Tư vấn nhập thay đổi: thay món (không tăng số món) và/hoặc số bàn ăn.
3. Hệ thống kiểm tra hạn: đổi món còn ≥ 5 ngày, đổi bàn còn ≥ 3 ngày; giảm ≤ 15% bàn ký ban đầu.
4. Tăng bàn: hệ thống chạy UC-DT-04.
5. Hệ thống tính chênh lệch (món mới giá hiện hành, món không đổi giữ giá), cọc bổ sung = 50% phần tăng nếu tăng > 3 bàn.
6. Hệ thống lập phụ lục trước/sau, chênh lệch, cọc bổ sung; trạng thái ChoXacNhan.
7. Khách xác nhận online (hoặc tư vấn upload phụ lục ký giấy).
8. Không cần cọc bổ sung: hệ thống kiểm tra lại tài nguyên, cập nhật bữa và giữ trong một giao dịch, phụ lục DaApDung.

**Luồng thay thế**

- 5a. Giảm bàn làm dư tiền: không hoàn ngay, đối trừ ở UC-HD-08.
- 7a. Khách không đồng ý: tư vấn hủy phụ lục (DaHuy), bữa giữ nguyên.
- 8a. Cần cọc bổ sung: phụ lục ChoCocBoSung; thu qua UC-HD-03/UC-HD-04 rồi tiếp bước 8.

**Ngoại lệ**

- 2e. Dời ngày, thêm món mới, đổi dịch vụ ngoài hợp đồng: không hỗ trợ.
- 3e. Quá hạn hoặc giảm vượt 15%: từ chối thay đổi đó.
- 4e. Không đủ tài nguyên khi tăng: từ chối phần tăng.
- 8e. Tài nguyên bị chiếm trước khi áp dụng: không áp dụng, báo tư vấn.

## UC-HD-06

| Trường | Nội dung |
| --- | --- |
| Tên | Hủy bữa hoặc hợp đồng |
| Tác nhân | Khách hàng, Nhân viên tư vấn |
| Mục tiêu | Dừng phục vụ bữa được chọn, tính nghĩa vụ hoàn theo thời điểm yêu cầu. |
| Kích hoạt | Khách yêu cầu hủy. |
| Tiền điều kiện | Bữa chưa bắt đầu phục vụ, chưa hủy. |
| Hậu điều kiện | Bữa DaHuy, nhả giữ, hủy phân công, có khoản hoàn/giữ lại; bữa khác tiếp tục. |
| Quan hệ | Có khoản phải hoàn thì tiếp UC-HD-07. |
| Quy tắc | BR01, BR08, BR10, BR11 |

**Luồng chính**

1. Khách (từ UC-DT-06) hoặc tư vấn chọn một/nhiều bữa cần hủy.
2. Hệ thống lưu thời điểm yêu cầu.
3. Hệ thống tính từng bữa: căn cứ cọc, phần trả trước vượt, bậc hoàn theo số ngày còn lại (≥ 30: 100%; 15–<30: 50%; < 15: 0%).
4. Hệ thống hiển thị tiền hoàn, tiền giữ lại từng bữa và tổng.
5. Người yêu cầu xác nhận hủy.
6. Hệ thống chuyển bữa DaHuy, nhả giữ dụng cụ, hủy phân công, ghi nghĩa vụ hoàn.
7. Mọi bữa đều hủy: hợp đồng DaHuy, tiếp tục theo dõi hoàn.

**Luồng thay thế**

- 1a. Hủy cả hợp đồng: chọn tất cả bữa chưa thực hiện; bữa đã thực hiện giữ quyết toán.
- 3a. Chưa cọc: hủy miễn phí; nếu là toàn bộ đơn thì đơn DaHuy.
- 6a. Đã xuất dụng cụ: vẫn phải thu hồi, kiểm đếm (UC-KHO-07).

**Ngoại lệ**

- 1e. Bữa đang phục vụ hoặc đã xong: không hủy.
- 3e. Không lấy thời điểm nhân viên xử lý để đổi bậc hoàn; không hoàn vượt tiền đã thu.

## UC-HD-07

| Trường | Nội dung |
| --- | --- |
| Tên | Ghi nhận hoàn tiền |
| Tác nhân | Kế toán |
| Mục tiêu | Ghi khoản đã trả lại khách kèm bằng chứng. |
| Kích hoạt | Có khoản phải hoàn do hủy, quyết toán dư hoặc tiền về sau hết hạn. |
| Tiền điều kiện | Có số phải hoàn > 0. |
| Hậu điều kiện | Giao dịch hoàn ThanhCong, phân bổ bữa, có biên nhận/bằng chứng; số dư cập nhật. |
| Quan hệ | Gọi từ UC-HD-06, UC-HD-08. |
| Quy tắc | BR10, BR11 |

**Luồng chính**

1. Kế toán mở danh sách khoản phải hoàn (dashboard hoặc UC-DT-06).
2. Kế toán trả tiền cho khách ngoài hệ thống (tiền mặt/chuyển khoản).
3. Kế toán nhập số tiền, phương thức, ngày, đính kèm biên nhận (file Word ký/ảnh chuyển khoản).
4. Hệ thống ghi giao dịch hoàn mới, phân bổ bữa, tính lại số dư.

**Luồng thay thế**

- 3a. Hoàn nhiều lần: mỗi lần một giao dịch; khoản đóng khi đủ.

**Ngoại lệ**

- 3e. Số hoàn vượt số còn phải hoàn hoặc thiếu bằng chứng: không ghi.

## UC-HD-08

| Trường | Nội dung |
| --- | --- |
| Tên | Quyết toán bữa và hoàn tất hợp đồng |
| Tác nhân | Kế toán |
| Mục tiêu | Đối trừ tiền đúng một lần, đóng bữa và hợp đồng khi hết nghĩa vụ. |
| Kích hoạt | Bữa ChoQuyetToan, hoặc bữa DaHuy còn nghĩa vụ tiền. |
| Tiền điều kiện | Đã kiểm đếm dụng cụ (nếu có xuất). |
| Hậu điều kiện | Số dư bữa = 0, bữa HoanTat; mọi bữa xong thì hợp đồng HoanTat. |
| Quan hệ | Số dư dương: UC-HD-03/UC-HD-04. Âm: UC-HD-07. |
| Quy tắc | BR01, BR11, BR13 |

**Luồng chính**

1. Kế toán chọn bữa cần quyết toán.
2. Hệ thống tổng hợp: giá trị bữa hiện hành (gồm phụ lục), bồi thường dụng cụ, tiền đã thu và đã hoàn phân bổ cho bữa.
3. Hệ thống tính số dư = tổng quyết toán − thu + hoàn; lập phiếu quyết toán.
4. Số dư = 0: kế toán xác nhận, bữa HoanTat.
5. Hệ thống kiểm tra mọi bữa của hợp đồng đã HoanTat/DaHuy và số dư 0: hợp đồng HoanTat.

**Luồng thay thế**

- 1a. Bữa DaHuy: dùng nghĩa vụ sau hủy thay giá trị bữa.
- 4a. Số dư dương: thu phần còn lại qua UC-HD-03/UC-HD-04, rồi bước 4.
- 4b. Số dư âm: ghi hoàn qua UC-HD-07, rồi bước 4.
- 5a. Còn bữa tương lai: hợp đồng giữ CoHieuLuc.

**Ngoại lệ**

- 2e. Bữa có xuất dụng cụ chưa kiểm đếm: không quyết toán.
- 4e. Chưa thu/hoàn đủ: không đóng; không ghi công nợ trả chậm.
