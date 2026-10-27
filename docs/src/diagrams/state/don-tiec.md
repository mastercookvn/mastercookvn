# Trạng thái đơn, hợp đồng và bữa tiệc

## Phạm vi

UC-DT-02, UC-DT-03, UC-HD-01 đến UC-HD-06. Quy tắc theo [spec](../../specification.md), dữ liệu theo [class](../class.md).

Không gom tiến độ một bữa vào trạng thái hợp đồng chung. Bữa thứ nhất có thể hoàn tất khi bữa thứ hai chưa phục vụ.

## Đơn đặt tiệc

| Từ | Đến | Kích hoạt/điều kiện | Tác động |
| --- | --- | --- | --- |
| Chưa lưu | ChoXacNhan | Gửi đơn hợp lệ | Lưu các bữa, chưa giữ |
| ChoXacNhan | DaNhan | Tư vấn xác nhận, tài nguyên đủ | Phát hành hợp đồng, giữ tạm 24 giờ |
| ChoXacNhan | BiTuChoi | Tư vấn ghi lý do | Không giữ tài nguyên |
| ChoXacNhan | DaHuy | Khách hủy trước cọc | Hủy các bữa chưa thực hiện |
| DaNhan | HetHan | Hết hạn hợp đồng chưa hiệu lực | Nhả giữ, giữ lịch sử tiền |
| DaNhan | DaHuy | Mọi bữa đều hủy | Hợp đồng xử lý tiền trước khi đóng |

Đơn không có thêm trạng thái Đã phân công hoặc Đã thanh toán; xem từng bữa/giao dịch.

## Hợp đồng

| Từ | Đến | Điều kiện | Tác động |
| --- | --- | --- | --- |
| Chưa có | ChoXacNhanCoc | Phát hành từ đơn đã nhận | Nội dung/giá và hạn cọc cố định |
| ChoXacNhanCoc | CoHieuLuc | Có xác nhận khách và đủ cọc | Giữ tạm thành chính thức |
| ChoXacNhanCoc | HetHan | Quá hạn chưa đủ điều kiện | Nhả tài nguyên; hoàn khoản đã nhận nếu có |
| ChoXacNhanCoc/CoHieuLuc | DaHuy | Mọi bữa đều đã hủy | Tiếp tục theo dõi nghĩa vụ thu/hoàn |
| CoHieuLuc/DaHuy/HetHan | HoanTat | Mọi bữa đã xử lý, số dư từng bữa 0, không còn thu/hoàn | Khóa hoàn tất, giữ nguyên kết quả từng bữa |

Một bữa hủy không đổi hợp đồng thành DaHuy khi còn bữa khác. Xác nhận ký và mức cọc là dữ liệu/điều kiện riêng, không tạo mọi tổ hợp thành trạng thái.

## Bữa tiệc

| Từ | Đến | Điều kiện | Tác động |
| --- | --- | --- | --- |
| Chưa có | DuKien | Tạo trong đơn | Chưa giữ chính thức |
| DuKien | DaXacNhan | Hợp đồng có hiệu lực | Sẵn sàng phân công/chuẩn bị |
| DuKien | DaHuy | Đơn bị từ chối/hủy/hết hạn | Ghi lý do, xử lý khoản tiền nếu có |
| DaXacNhan | DangChuanBi | Kho/tư vấn ghi bắt đầu chuẩn bị | Có thể lập/xác nhận xuất dụng cụ |
| DangChuanBi | DangPhucVu | Tư vấn/nhân viên được quyền cập nhật tiến độ | Không check-in/GPS/ảnh |
| DangPhucVu | ChoKiemDem | Ghi kết thúc phục vụ | Chờ thu hồi dụng cụ |
| ChoKiemDem | ChoQuyetToan | Đã kiểm đếm đầy đủ | Ghi bồi thường, nhả giữ |
| DangPhucVu | ChoQuyetToan | Kết thúc, không dùng dụng cụ | Bỏ kiểm đếm |
| DaXacNhan/DangChuanBi | DaHuy | Hủy hợp lệ hoặc khách không có mặt, chưa bắt đầu phục vụ | Nhả giữ, hủy phân công, tính hoàn |
| ChoQuyetToan | HoanTat | Số dư 0 | Cho đánh giá |

Bữa DaHuy giữ kết quả hủy; việc thu/hoàn đã xong thể hiện ở QuyetToanBua, không đổi bữa hủy thành bữa đã phục vụ. Không có trạng thái tạm hoãn, công nợ hoặc khiếu nại.

## Tiền và phụ lục

Giao dịch: Cho → ThanhCong hoặc ThatBai. Nhập thu/hoàn thủ công có thể tạo thẳng ThanhCong khi nhân viên xác nhận thực tế. Không chuyển giao dịch thu thành hoàn; hoàn là record mới. Nhận lại thông báo không sinh bản ghi thành công thứ hai.

Phụ lục: ChoXacNhan → ChoCocBoSung (nếu cần) → DaApDung; hoặc ChoXacNhan → DaApDung khi không cần cọc thêm. Chỉ áp dụng khi đủ ký/cọc và kiểm tra tài nguyên lại thành công. Chưa áp dụng có thể DaHuy; không sửa đè văn bản đã ký.

Khi vẽ, tách ba vùng đơn/hợp đồng/bữa; dùng điều kiện chuyển và ghi chú tổng hợp, không nối trạng thái một bữa trực tiếp sang trạng thái của bữa khác.
