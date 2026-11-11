UI vận hành bữa

Problem: các grid xếp 2 bên, bữa tiệc cần xử lý lại nằm phía bên trái khiến cho rối mắt
Handle: Xếp các grid theo phương ngang, tức bữa tiệc cần xử lý sẽ nằm ở trên 

UI tổng thể:

Problem: Các chữ của tiêu đề hay các ô tổng (ví dụ tổng giá trị) font chữ rất to, đậm và không hợp lí, các tên page ở trang menu cũng rất kì lạ khi in đậm và không có icon gì cả
Handle: Không được xử dụng icon hệ thống, cần xem xét bộ icon và thực hiện design lại font,size sao cho phù hợp 

Login: Thể hiện rõ luồng xác thực số điện thoại

Highlight các luồng chính trong docs ở trong dự án

Các grid tổng kết nên design lại sao cho hiện đại ( không cần border nhưng ít nhất cần tách nhau ra và đề mục cần in đậm)

Các trạng thái trong web cần design ít AI hơn

Ngay chỗ lịch tiệc cần design lại sao cho không có màu dính sát vào chữ, cần kiếm mẫu hiện đại, tránh dùng mẫu có sẵn của agnet

-------- Scrip2:

Các ở trên đã sửa: Vấn đề tiếp theo:

Trang vận hành bữa: hãy xóa hết các UI từ tiến độ trở lên, design lại các menu theo một bản chuẩn, gọn gàng và hơp lí, tuyệt đối không được trình bày các bước tạo đơn,...

Các thông tin trong một cai grid: cần logic có mục tìm kiếm và khi thêm một thông tin vào thì nó phải hiện lên trên 

Nguyên liệu là nhâp tay (tên nguyên liệu), không phải là có sẵn

Các dropdown cần có UI thả xuống chứ không được dùng mẫu của trình duyệt

Các mục của nhân viên cần có thêm CV công việc, các thông tin cơ bản khác 

Tạo môt menu là khi chọn món sẽ là dropdown kết hpwj vói search chứ không phải là tick vì nếu quá nhièu món ăn làm sao tick hết (search kèm hình ảnh)

Design lại các yêu cầu trên, tuy nhiên trang quản lý rất rối, không nền dùng bộ nhớ cũ mà hãy tạo một trang quản lý hiẹn đại hơn, có thể thay đổi nhièu thứ miễn là đừng AI như bây giờ


------ Scrip3:

Lịch tiệc cần hỗ trợ lịch âm hỗ trợ cho các đám giỗ

Chưa có logic tính toán giá của món ăn, hình như công thức foodcost đó từ nguyên liệu có trong flow tài liệu

Các chức năng chỉnh sửa/xóa chưa có trong giao diện quản trị

Biên bản kiểm đếm phải cho nhập chứ, hiện tại vẫn không cho nhập để tạo record, làm sao khi mà xác nhận biên bản khách hàng có thể thấy được thông báo đó? Brainstorm và cho mình cuâ trả lời 

Thêm mục chữ ký online vào giao diện đặt tiệc khi xác nhận hợp đồng

Các thẻ tiêu đề, mô tả quá nhạt nhẽo, suy nghĩ ra cách design tốt hơn

Trang Home của quản trị cần gom gọn lại, không nhất thể show hết lên

Cài đặt đổi mật khẩu thì lại quá đơn điệu

Lỗi ở mục báo cáo

------  Script4:

Trong UI của người dùng, việc tự chọn menu cũng phải được hiện thưc bằng dropdown và search món chứ khônh được tick như vậy

Phân bổ lại các thông tin về đặt tiệc như ngày (hiển thị lịch ra, có cho chọn lịch âm nhưng sau đó phải hiển thị ngày dương tương ứng )

Phân biệt rõ giữa bữa và set nhé, hay đọc lại doc đê hiểu. Ví dụ: Đãi từ 9h đến 11h, 11h dến 1h, 1h đến 3h,.. Việc dùng buổi có thể sai. Ý nghĩa của nó là mời 400 khách nhưng không có nghĩa là 400 kháh sẽ đêns 1 lượt mà sẽ chia ra, nó dẫn đến lohic nghiệp vụ

Việc phân công nhân sự cũng dựa trên số người tham gia tiệc, số lần đãi và số lượng mỗi ng của mỗi lần đãi. UI nên deg theo luồng sau, hệ thống sẽ đè xuất phân công sẵn cho nhân viên, sau đó người dùng sẽ diều chỉnh nếu chưa hợp lý

Hãy hoàn thiện luồng đăng nhập một cách chuẩn chỉnh 

Khi đặt đơn thành công, không hiện mã đơn mà maskcot sẽ xuất hiện và cười (deg sau cho vừa khung hình)

Phải cho khách hàng tra cứu lại đơn đặt và hợp đồng 

Highligh logic sửa hợp đồng trong trang quản lý

Chi tiết hợp đồng nên gọn lại, có thật sự cần các grid về mã hợp đòng, só tiền trạng thái ododf không? Phải có chức năng xuất hợp đồng chuẩn chỉnh theo luật việt nam để gửi khách hang

------ Script 5:

Việc đặt tiệc nên trải qua từng bước, ví dụ điền thông tin tiệc, lưu ý là có cho đặt tiệc mâm ( tức là 1 bàn thức ăn vẫn sẽ có), rồi điền thông tin cá nhân. Sau đó mới thực hiện việc chọn món, rồi chọn dịch vụ ( Dihcj vụ cũng là dropdown rồi selection lên từ cơ sở dữ liệu kèm ảnh)

Bỏ tất cả các ảnh vào gitignore, phần món ăn và nguyên liệu lưu một dạng key-value không lưu url ( sử dụng s3 token để hiện thực)

Giao diện admin nên thêm nút phóng to thu nhỏ sidebar

Thu gọn lại các logic chuyển trang, nội dung của fe, chỉ cần xem được giao diện của từng màn hình để xem có khơp flow không, tránh làm project quá nặng


----- Script 6:

Bỏ bớt ghi chú ở trang quản lý, không ai đọc ( ghi chú là các dòng dưới tiêu đề)

Khi kéo xuống web ở khách hàng, thì các thẻ a vẫn giữ nguyên, thuận tiện cho người dùng

Đặt lại icon thu phóng ở giữa và đổi icon khác hiện đại hơn

