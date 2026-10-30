# Mô hình lớp chi tiết

Đây là mô hình lớp chi tiết và đặc tả nghiệp vụ. [Đặc tả phần mềm](../specification.md) làm gốc quy tắc BR. Không sao chép mô hình sang spec.

## Quy ước

- `UUID`: định danh; `?`: tùy chọn; `money`: tiền VNĐ nguyên; `decimal-money`: giá/đơn vị cần độ chính xác trước khi làm tròn; `decimal`: lượng/tỷ lệ chính xác; `datetime`: thời điểm có múi giờ.
- `YearMonth`: tháng theo giờ Việt Nam. Tỷ lệ trong lưu trữ thống nhất dạng thập phân, giao diện hiển thị %.
- Thuộc tính tổng hợp có thể tính khi đọc; nếu lưu bản chốt phải cập nhật nguyên tử và không coi là nguồn tiền thứ hai.
- Các model sau là mô hình miền, không yêu cầu mỗi lớp tương ứng một bảng hoặc tự tạo CRUD cho mọi lớp.
- Các giá và nội dung chốt là dữ liệu lịch sử, không liên kết động để thay đổi theo danh mục mới.

## Sơ đồ lớp tổng quan

Sơ đồ tổng quan thể hiện kiến trúc miền (domain model) và mối liên kết cốt lõi giữa các phân hệ:

```mermaid
classDiagram
    direction TB

    class KhachHang {
        +UUID id
        +string hoTen
        +string soDienThoai
    }

    class TaiKhoan {
        +UUID id
        +string soDienThoai
        +string trangThai
    }

    class VaiTro {
        +UUID id
        +string ma
    }

    class NhanVien {
        +UUID id
        +string hoTen
        +string loai
        +string viTri
    }

    class DonDatTiec {
        +UUID id
        +string ma
        +string kenh
        +string trangThai
    }

    class BuaTiec {
        +UUID id
        +datetime batDau
        +datetime ketThuc
        +int soBanAn
        +int soBanBoTri
        +string trangThai
    }

    class HopDong {
        +UUID id
        +string so
        +money tongGiaTri
        +string trangThai
    }

    class PhuLucHopDong {
        +UUID id
        +string so
        +string loai
        +money chenhLech
        +string trangThai
    }

    class GiaoDichThanhToan {
        +UUID id
        +string loai
        +string phuongThuc
        +money soTien
        +string trangThai
    }

    class PhanBoThanhToan {
        +UUID id
        +money soTien
    }

    class QuyetToanBua {
        +UUID id
        +money tongPhaiTra
        +string trangThai
    }

    class HuyBuaTiec {
        +UUID id
        +money tienHoan
        +money tienGiuLai
    }

    class MonAn {
        +UUID id
        +string ten
        +money giaBanChuan
    }

    class NguyenLieu {
        +UUID id
        +string ten
        +decimal_money giaHienHanh
    }

    class DungCu {
        +UUID id
        +string ten
        +int soLuongSoHuu
        +int soLuongSanSang
    }

    class GiuDungCu {
        +UUID id
        +int soLuong
        +string trangThai
    }

    class PhieuXuatDungCu {
        +UUID id
        +string ma
        +string trangThai
    }

    class BienBanKiemDem {
        +UUID id
        +string trangThai
    }

    class PhanCongNhanSu {
        +UUID id
        +string viTri
        +string trangThai
    }

    class DanhGia {
        +UUID id
        +int diem
    }

    %% Quan he lien ket giua cac phan he
    KhachHang "1" --> "0..1" TaiKhoan : lienKet
    NhanVien "1" --> "0..1" TaiKhoan : lienKet
    TaiKhoan "1" --> "0..*" VaiTro : coVaiTro
    KhachHang "1" --> "0..*" DonDatTiec : datTiec
    DonDatTiec "1" *-- "1..*" BuaTiec : gom
    DonDatTiec "1" --> "0..1" HopDong : phatHanh
    HopDong "1" --> "0..*" PhuLucHopDong : dieuChinh
    PhuLucHopDong "0..*" --> "1" BuaTiec : apDung
    HopDong "1" --> "0..*" GiaoDichThanhToan : phatSinh
    GiaoDichThanhToan "1" *-- "1..*" PhanBoThanhToan : phanBo
    PhanBoThanhToan "0..*" --> "1" BuaTiec : choBua
    BuaTiec "1" --> "0..1" QuyetToanBua : quyetToan
    BuaTiec "1" --> "0..1" HuyBuaTiec : huy
    BuaTiec "0..*" --> "1..*" MonAn : chonMon
    MonAn "0..*" --> "1..*" NguyenLieu : dinhLuong
    BuaTiec "1" --> "0..*" GiuDungCu : giu
    GiuDungCu "0..*" --> "1" DungCu : loai
    BuaTiec "1" --> "0..1" PhieuXuatDungCu : xuat
    PhieuXuatDungCu "1" --> "0..1" BienBanKiemDem : kiemDem
    BuaTiec "1" --> "0..*" PhanCongNhanSu : phanCong
    PhanCongNhanSu "0..*" --> "1" NhanVien : giaoCho
    BuaTiec "1" --> "0..1" DanhGia : nhanDanhGia
```

## Tài khoản và khách hàng

```mermaid
classDiagram
    direction TB
    class TaiKhoan {
        +UUID id
        +string soDienThoai
        +string matKhauBam
        +string tenHienThi
        +string trangThai
        +UUID? khachHangId
        +UUID? nhanVienId
        +dangKy()
        +dangNhap()
        +khoa()
        +lienKetKhachHang()
    }

    class VaiTro {
        +UUID id
        +string ma
        +string ten
        +quyenTheoChucNang()
    }

    class GanVaiTro {
        +UUID taiKhoanId
        +UUID vaiTroId
        +gan()
        +go()
    }

    class KhachHang {
        +UUID id
        +string hoTen
        +string soDienThoai
        +string? diaChiLienHe
        +text? ghiChu
        +capNhat()
        +timTheoSoDienThoai()
    }

    class NhanVien {
        +UUID id
        +string hoTen
        +string soDienThoai
        +string loai
        +string viTri
        +string trangThai
        +capNhat()
        +coThePhanCong(khoangGio, viTri)
    }

    TaiKhoan "1" --> "0..*" GanVaiTro : co
    VaiTro "1" --> "0..*" GanVaiTro : duocGan
    KhachHang "1" --> "0..1" TaiKhoan : lienKetTaiKhoan
    NhanVien "1" --> "0..1" TaiKhoan : lienKetTaiKhoan
```

### Ràng buộc nghiệp vụ

- **TaiKhoan**: Không bắt buộc phải có tài khoản để lưu hồ sơ khách hàng hoặc hồ sơ nhân sự.
- **VaiTro**: Vai trò hệ thống cố định theo bảng quyền đặc tả, không có quy trình phê duyệt cấp quyền động.
- **GanVaiTro**: Cặp tài khoản–vai trò là duy nhất; quyền của người dùng là hợp các vai trò được gán.
- **KhachHang**: Khóa định danh hồ sơ là số điện thoại chuẩn hóa. Khách hàng đăng ký tài khoản mới cùng số điện thoại sẽ tự động liên kết với hồ sơ khách đã tạo qua đặt hộ trước đó.
- **NhanVien**: Vị trí chuyên môn (Bếp, Phục vụ, Vận chuyển, Kiểm đếm) là thông tin nghiệp vụ phân công ca, không phải vai trò tài khoản hệ thống. Không quản lý chấm công/lương.

## Đơn, bữa và khảo sát

```mermaid
classDiagram
    direction TB
    class DonDatTiec {
        +UUID id
        +string ma
        +UUID khachHangId
        +UUID nguoiTaoId
        +string kenh
        +string trangThai
        +datetime ngayTao
        +text? lyDoTuChoi
        +themBua()
        +gui()
        +xacNhanNhan()
        +tuChoi()
        +huy()
    }

    class BuaTiec {
        +UUID id
        +UUID donId
        +UUID loaiTiecId
        +datetime batDau
        +datetime ketThuc
        +datetime dungCuTu
        +datetime dungCuDen
        +int soBanAnBanDau
        +int soBanAn
        +int soNguoiMoiBan
        +int soBanBoTri
        +int soGheBoTri
        +map nhanSuDuKienTheoViTri
        +string? nguoiLienHe
        +string? soDienThoaiLienHe
        +string trangThai
        +text? ghiChu
        +tinhTienMon()
        +nhuCauDungCu()
        +goiYNhanSu()
        +kiemTraSua()
        +huy()
        +hoanTat()
    }

    class LoaiTiec {
        +UUID id
        +string ten
        +text? moTa
        +bool dangSuDung
        +capNhat()
        +ngung()
    }

    class KhaoSatDiaDiem {
        +UUID id
        +UUID buaId
        +text diaChi
        +decimal khoangCachKm
        +text? ghiChu
        +UUID nguoiGhiId
        +datetime ngayGhi
        +capNhat()
        +kiemTraPhamVi()
    }

    class TraLoiKhaoSat {
        +UUID id
        +UUID khaoSatId
        +int thuTu
        +string cauHoi
        +text traLoi
        +capNhat()
    }

    class MonTrongBua {
        +UUID id
        +UUID buaId
        +UUID monId
        +string tenMonChot
        +money donGiaChuanChot
        +decimal heSoQuyMo
        +text? ghiChu
        +thanhTien(soBanAn)
    }

    class DichVuTrongBua {
        +UUID id
        +UUID buaId
        +UUID dichVuId
        +string tenChot
        +string donViChot
        +decimal soLuong
        +money donGiaChot
        +thanhTien()
    }

    class KhoanGiaBua {
        +UUID id
        +UUID buaId
        +money tienMon
        +money tienDichVu
        +money phuThu
        +text? lyDoPhuThu
        +decimal thueSuat
        +money tienThue
        +money chenhLechLamTron
        +money tong
        +tinhTong()
    }

    DonDatTiec "1" *-- "1..*" BuaTiec : chua
    LoaiTiec "1" --> "0..*" BuaTiec : phanLoai
    BuaTiec "1" *-- "1" KhaoSatDiaDiem : co
    KhaoSatDiaDiem "1" *-- "0..*" TraLoiKhaoSat : gom
    BuaTiec "1" *-- "1..*" MonTrongBua : gom
    BuaTiec "1" *-- "0..*" DichVuTrongBua : gom
    BuaTiec "1" *-- "1" KhoanGiaBua : tinhGia
```

### Ràng buộc nghiệp vụ

- **DonDatTiec**: Đơn tiệc hỗ trợ một hoặc nhiều bữa tiệc; bản nháp chưa gửi chỉ lưu ở trình duyệt, hệ thống chỉ lưu khi người dùng gửi đơn (`ChoXacNhan`).
- **BuaTiec**: Phân biệt rõ số bàn ăn và số bàn ghế bố trí thực tế. Khung thời gian sử dụng tài nguyên được nhập thủ công. Thực đơn, khảo sát và phân công độc lập theo từng bữa.
- **LoaiTiec**: Phân loại phục vụ quản lý và thống kê, không tự động gợi ý món tâm linh/văn hóa.
- **KhaoSatDiaDiem & TraLoiKhaoSat**: Mỗi bữa tiệc có một bản khảo sát địa điểm riêng; câu hỏi và câu trả lời lưu trực tiếp tại khảo sát, không dùng chung câu trả lời giữa các bữa.
- **MonTrongBua & DichVuTrongBua**: Lưu danh sách món và dịch vụ chốt cố định của bữa tiệc, không liên kết động theo danh mục hiện hành sau khi hợp đồng phát hành.
- **KhoanGiaBua**: Đúng một bảng tính giá hiện hành cho mỗi bữa tiệc. Giá trong hợp đồng chốt là dữ liệu lịch sử bất biến.

## Hợp đồng, điều chỉnh và tiền

```mermaid
classDiagram
    direction TB
    class HopDong {
        +UUID id
        +string so
        +UUID donId
        +document noiDungChot
        +money tongGiaTri
        +datetime phatHanhLuc
        +datetime hanCoc
        +string trangThai
        +phatHanh()
        +kiemTraHieuLuc()
        +soDu()
        +kiemTraDong()
    }

    class XacNhanVanBan {
        +UUID id
        +UUID? hopDongId
        +UUID? phuLucId
        +string phuongThuc
        +UUID? nguoiXacNhanId
        +string tenNguoiKy
        +datetime thoiDiemKy
        +UUID nguoiGhiId
        +UUID? tepKyId
        +ghiOnline()
        +ghiKyGiay()
    }

    class PhuLucHopDong {
        +UUID id
        +UUID hopDongId
        +UUID buaId
        +string so
        +string loai
        +document noiDungTruoc
        +document noiDungSau
        +money chenhLech
        +money cocBoSung
        +string trangThai
        +UUID nguoiLapId
        +datetime ngayLap
        +tinhChenhLech()
        +xacNhan()
        +apDung()
        +huy()
    }

    class HuyBuaTiec {
        +UUID id
        +UUID buaId
        +UUID nguoiGhiId
        +datetime yeuCauLuc
        +text lyDo
        +decimal soGioConLai
        +money cocLamCanCuHoan
        +money traTruocVuot
        +decimal tyLeHoan
        +money phiXuLy
        +money tienHoan
        +money tienGiuLai
        +money thuThemThoaThuan
        +text? ghiChuThoaThuan
        +tinhHoan()
        +xacNhanHuy()
    }

    class GiaoDichThanhToan {
        +UUID id
        +UUID hopDongId
        +string loai
        +string phuongThuc
        +money soTien
        +string trangThai
        +string? maThamChieu
        +datetime thoiDiem
        +UUID? nguoiGhiId
        +UUID? tepBangChungId
        +xacNhanOnline()
        +ghiThuCong()
        +phanBo()
    }

    class PhanBoThanhToan {
        +UUID id
        +UUID giaoDichId
        +UUID buaId
        +money soTien
        +money phanCocBatBuoc
        +money phanTraTruoc
        +kiemTraTongPhanBo()
    }

    class QuyetToanBua {
        +UUID id
        +UUID buaId
        +money giaTriHienHanh
        +money denBu
        +money? nghiaVuSauHuy
        +money tongPhaiTra
        +string trangThai
        +datetime? ngayChot
        +UUID? nguoiChotId
        +tongThu()
        +tongHoan()
        +soDu()
        +chot()
    }

    class TepDinhKem {
        +UUID id
        +string khoaLuuTru
        +string tenGoc
        +string loaiNoiDung
        +int kichThuoc
        +UUID nguoiTaiId
        +datetime taiLuc
        +layTheoQuyen()
    }

    HopDong "1" --> "0..*" PhuLucHopDong : co
    HopDong "1" --> "0..1" XacNhanVanBan : xacNhan
    PhuLucHopDong "1" --> "0..1" XacNhanVanBan : xacNhan
    HopDong "1" --> "0..*" GiaoDichThanhToan : phatSinh
    GiaoDichThanhToan "1" *-- "1..*" PhanBoThanhToan : phanBo
    XacNhanVanBan "0..*" --> "0..1" TepDinhKem : banKyGiay
    GiaoDichThanhToan "0..*" --> "0..1" TepDinhKem : chungTu
```

### Ràng buộc nghiệp vụ

- **HopDong**: Một hợp đồng bao phủ tất cả các bữa tiệc của đơn. Nội dung lưu đủ danh sách bữa, đơn giá và điều khoản chốt; không phụ thuộc thay đổi danh mục sau này.
- **XacNhanVanBan**: Gắn với đúng một Hợp đồng hoặc Phụ lục; phương thức ký giấy bắt buộc đính kèm tệp văn bản ký scan. Ký online lưu tài khoản khách hàng, không dùng OTP.
- **PhuLucHopDong**: Một phụ lục cho đúng một bữa tiệc; không cho phép dời ngày tiệc. Mỗi bữa chỉ có tối đa một phụ lục chưa xử lý để tránh xung đột dữ liệu.
- **HuyBuaTiec**: Lưu kết quả và căn cứ hoàn tiền độc lập cho từng bữa tiệc; hủy toàn hợp đồng tạo kết quả cho từng bữa tương ứng.
- **GiaoDichThanhToan & PhanBoThanhToan**: Mọi số tiền giao dịch là số dương (loại `Hoan` quyết định chiều chi). Tổng tiền phân bổ cho các bữa phải bằng chính xác số tiền giao dịch.
- **QuyetToanBua**: Số tiền đã thu/hoàn và số dư tính từ các giao dịch thành công. Bữa tiệc bị hủy thay thế tiền phục vụ bằng nghĩa vụ thanh toán sau hủy.

## Danh mục món và nguyên liệu

```mermaid
classDiagram
    direction TB
    class LoaiMon {
        +UUID id
        +string ten
        +int thuTu
        +bool dangSuDung
        +capNhat()
        +ngung()
    }

    class MonAn {
        +UUID id
        +UUID loaiMonId
        +string ten
        +text? moTa
        +string? anh
        +money giaBanChuan
        +bool dangPhucVu
        +chiPhiUocTinh()
        +giaGoiY(foodCostMucTieu)
        +capNhatGia()
        +ngung()
    }

    class SetThucDon {
        +UUID id
        +string ten
        +text? moTa
        +bool dangPhucVu
        +tinhGia()
        +capNhatMon()
        +ngung()
    }

    class MonTrongSet {
        +UUID setId
        +UUID monId
        +int thuTu
        +sapXep()
    }

    class NguyenLieu {
        +UUID id
        +string ten
        +string donViChuan
        +decimal_money giaHienHanh
        +bool dangSuDung
        +capNhatGia()
        +monBiAnhHuong()
    }

    class DinhLuongMon {
        +UUID monId
        +UUID nguyenLieuId
        +decimal soLuongChuan
        +tinhChiPhi()
    }

    class DichVu {
        +UUID id
        +string ten
        +text? moTa
        +string donVi
        +money donGia
        +bool dangSuDung
        +capNhat()
        +ngung()
    }

    class CauHinhNghiepVu {
        +UUID id
        +decimal foodCostMucTieu
        +decimal thueSuat
        +datetime mocHieuLuc
        +UUID nguoiCapNhatId
        +apDungChoDuLieuMoi()
    }

    LoaiMon "1" --> "0..*" MonAn : phanLoai
    SetThucDon "1" *-- "0..*" MonTrongSet : gom
    MonAn "1" <-- "0..*" MonTrongSet : chua
    MonAn "1" *-- "0..*" DinhLuongMon : dinhLuong
    NguyenLieu "1" <-- "0..*" DinhLuongMon : thanhPhan
```

### Ràng buộc nghiệp vụ

- **LoaiMon & MonAn**: Phân nhóm để lọc danh mục; món ăn tự chọn tối thiểu 6 món cho một tiệc. Đơn giá chuẩn áp dụng cho bàn ăn chuẩn 10 người.
- **SetThucDon**: Đơn giá set tính bằng tổng đơn giá các món thành phần, không cộng thêm biên lợi nhuận kép. Bữa tiệc lưu danh sách món chốt, không trỏ động vào set.
- **MonTrongSet**: Cặp set–món là duy nhất.
- **NguyenLieu & DinhLuongMon**: Định lượng xác định lượng nguyên liệu cho 1 bàn ăn chuẩn 10 người (cặp món–nguyên liệu là duy nhất). Đơn giá hiện hành dùng để tính chi phí ước tính và đề xuất giá bán món.
- **DichVu**: Do cơ sở tự cung cấp (trang trí, âm thanh,...); không quản lý đối tác thuê ngoài.
- **CauHinhNghiepVu**: Tham số nghiệp vụ toàn hệ thống (food cost mục tiêu, thuế suất,...), áp dụng cho các tính toán và đơn tiệc tạo mới.

## Nhập, kiểm kê và food cost

```mermaid
classDiagram
    direction TB
    class PhieuNhapNguyenLieu {
        +UUID id
        +string ma
        +datetime ngayNhap
        +string tenNhaCungCap
        +string? soDienThoaiNhaCungCap
        +UUID nguoiNhapId
        +text? ghiChu
        +tongTien()
        +ghiNhan()
    }

    class DongNhapNguyenLieu {
        +UUID id
        +UUID phieuId
        +UUID nguyenLieuId
        +string donViChot
        +decimal soLuong
        +decimal_money donGia
        +thanhTien()
    }

    class KyNguyenLieu {
        +UUID id
        +YearMonth thang
        +string trangThai
        +money doanhThuMon
        +money chiPhiTieuThu
        +decimal? foodCostThucTe
        +money laiTheoNguyenLieu
        +UUID? nguoiChotId
        +datetime? chotLuc
        +tongHop()
        +tinhFoodCost()
        +chot()
        +moLai()
    }

    class DongKiemKeNguyenLieu {
        +UUID id
        +UUID kyId
        +UUID nguyenLieuId
        +decimal luongDau
        +money giaTriDau
        +decimal luongNhap
        +money giaTriNhap
        +decimal luongCuoiThucTe
        +decimal_money donGiaBinhQuan
        +money giaTriCuoi
        +money chiPhiTieuThu
        +text? ghiChu
        +tinhGiaTon()
        +tinhTieuThu()
    }

    class DotDeXuatGia {
        +UUID id
        +YearMonth thang
        +datetime mocTinh
        +datetime tuNgay
        +datetime denNgay
        +datetime taoLuc
        +string nguonKhoiTao
        +string trangThai
        +taoNeuChuaCo()
        +tongHopTrangThai()
    }

    class DongDeXuatGia {
        +UUID id
        +UUID dotId
        +UUID nguyenLieuId
        +decimal_money giaCu
        +decimal_money giaDeXuat
        +decimal_money? giaDuocChon
        +string trangThai
        +UUID? nguoiXuLyId
        +datetime? xuLyLuc
        +tinhGiaTrongSo()
        +chapNhan()
        +dieuChinh()
        +boQua()
    }

    PhieuNhapNguyenLieu "1" *-- "1..*" DongNhapNguyenLieu : gom
    KyNguyenLieu "1" *-- "1..*" DongKiemKeNguyenLieu : gom
    DotDeXuatGia "1" *-- "0..*" DongDeXuatGia : gom
```

### Ràng buộc nghiệp vụ

- **PhieuNhapNguyenLieu & DongNhapNguyenLieu**: Ghi nhận lượng và đơn giá thực mua; không bắt buộc gắn trực tiếp với bữa tiệc. Lượng $>0$, đơn giá $\ge 0$.
- **KyNguyenLieu & DongKiemKeNguyenLieu**: Kiểm kê và chốt kỳ theo tháng. Tiêu thụ = Giá trị đầu + Nhập − Cuối kỳ. Không xuất kho trừ nguyên liệu sau từng bữa tiệc.
- **DotDeXuatGia & DongDeXuatGia**: Khởi tạo mốc tính ngày đầu tháng; tính bình quân trọng số 30 ngày gần nhất (khoảng cách 10 ngày tương ứng 1.5; 1.5; 2). Giá đề xuất độc lập với giá trị tồn kho.

## Dụng cụ và tài nguyên

```mermaid
classDiagram
    direction TB
    class DungCu {
        +UUID id
        +string ten
        +string donVi
        +string coSoDinhMuc
        +decimal dinhMuc
        +decimal? duTru
        +int soLuongToiThieu
        +money giaBoiThuong
        +int soLuongSoHuu
        +int soLuongSanSang
        +int soLuongDangSuDung
        +int soLuongHu
        +tinhNhuCau()
        +canhBaoThieu()
        +phucHoi()
        +loaiBo()
    }

    class GiuDungCu {
        +UUID id
        +UUID buaId
        +UUID dungCuId
        +int soLuong
        +datetime tuLuc
        +datetime denLuc
        +string trangThai
        +datetime? hetHanTam
        +bool daXuat
        +kiemTraKhaDung()
        +chuyenChinhThuc()
        +nha()
    }

    class GiaBoiThuongBua {
        +UUID buaId
        +UUID dungCuId
        +string tenChot
        +money donGiaChot
        +layGiaChot()
    }

    class PhieuNhapDungCu {
        +UUID id
        +string ma
        +datetime ngayNhap
        +string tenNhaCungCap
        +string? soDienThoaiNhaCungCap
        +UUID nguoiNhapId
        +tongTien()
        +ghiNhan()
    }

    class DongNhapDungCu {
        +UUID id
        +UUID phieuId
        +UUID dungCuId
        +int soLuong
        +money donGia
        +thanhTien()
    }

    class PhieuXuatDungCu {
        +UUID id
        +string ma
        +UUID buaId
        +UUID nguoiXuatId
        +datetime? xuatLuc
        +string trangThai
        +kiemTraTon()
        +xuat()
        +hoanTatKiemDem()
    }

    class DongXuatDungCu {
        +UUID id
        +UUID phieuId
        +UUID dungCuId
        +int soLuong
        +kiemTraSoLuong()
    }

    class BienBanKiemDem {
        +UUID id
        +UUID phieuXuatId
        +UUID nguoiKiemId
        +datetime kiemLuc
        +string trangThai
        +text? ghiChu
        +kiemTraCanBang()
        +tinhDenBu()
        +xacNhan()
    }

    class DongKiemDem {
        +UUID id
        +UUID bienBanId
        +UUID dongXuatId
        +int thuHoiTot
        +int hu
        +int mat
        +int soKhachChiu
        +money donGiaBoiThuongChot
        +text? lyDo
        +tinhDenBu()
    }

    class XuLyDungCuHu {
        +UUID id
        +UUID dungCuId
        +int soLuong
        +string loai
        +text lyDo
        +UUID nguoiGhiId
        +datetime thoiDiem
        +apDung()
    }

    PhieuNhapDungCu "1" *-- "1..*" DongNhapDungCu : gom
    PhieuXuatDungCu "1" *-- "1..*" DongXuatDungCu : gom
    PhieuXuatDungCu "1" --> "0..1" BienBanKiemDem : lapBienBan
    BienBanKiemDem "1" *-- "1..*" DongKiemDem : gom
    DongXuatDungCu "1" <-- "1" DongKiemDem : kiemTheoDongXuat
```

### Ràng buộc nghiệp vụ

- **DungCu**: Bất biến sở hữu: $\text{Sở hữu} = \text{Sẵn sàng} + \text{Đang sử dụng} + \text{Hư}$. Tồn tối thiểu là ngưỡng cảnh báo bổ sung, không chặn cứng quy trình nếu đủ lượng dùng được.
- **GiuDungCu**: Giữ tạm (24 giờ) hoặc giữ chính thức; phân biệt rõ với xuất kho để tránh trừ kho hai lần vào năng lực khả dụng tương lai.
- **GiaBoiThuongBua**: Đơn giá bồi thường được chốt trong hợp đồng trước khi diễn ra tiệc, không áp dụng đơn giá thị trường tại thời điểm kiểm đếm.
- **PhieuNhapDungCu & DongNhapDungCu**: Nhập mua bổ sung trực tiếp làm tăng sẵn sàng và tăng sở hữu.
- **PhieuXuatDungCu, BienBanKiemDem & DongKiemDem**: Một bữa tối đa một phiếu xuất và một biên bản kiểm đếm đầy đủ. Điều kiện cân bằng bắt buộc: $\text{Tốt} + \text{Hư} + \text{Mất} = \text{Xuất}$; $0 \le \text{Khách chịu} \le \text{Hư} + \text{Mất}$.
- **XuLyDungCuHu**: Ghi nhận lượng phục hồi (chuyển sang sẵn sàng) hoặc loại bỏ (giảm lượng hư và giảm sở hữu).

## Phân công và đánh giá

```mermaid
classDiagram
    direction TB
    class PhanCongNhanSu {
        +UUID id
        +UUID buaId
        +UUID nhanVienId
        +string viTri
        +text? nhiemVu
        +datetime batDau
        +datetime ketThuc
        +string trangThai
        +UUID nguoiPhanCongId
        +kiemTraTrungLich()
        +doiNguoi()
        +huy()
    }

    class DanhGia {
        +UUID id
        +UUID buaId
        +UUID khachHangId
        +int diem
        +text? nhanXet
        +UUID nguoiNhapId
        +datetime ngayNhap
        +ghiNhan()
    }
```

### Ràng buộc nghiệp vụ

- **PhanCongNhanSu**: Khung giờ làm việc có thể bao phủ hoặc lệch so với giờ phục vụ của bữa. Kiểm tra chặn trùng lịch khi phân công người cụ thể. Năng lực nhân sự chung được dự trù theo vị trí của các bữa đang giữ trước khi gán người đích danh.
- **DanhGia**: Mỗi bữa tiệc tối đa một đánh giá (điểm 1–5), chỉ mở khi bữa tiệc đã chuyển trạng thái `HoanTat`. Người đánh giá phải là người đặt của đơn chứa bữa đó.

## Dịch vụ miền (Domain Services)

```mermaid
classDiagram
    direction TB
    class KiemTraTaiNguyen {
        <<service>>
        +kiemTra(bua, khoangGio)
        +giuTam(don)
        +chuyenChinhThuc(hopDong)
        +nha(bua)
    }

    class TinhGia {
        <<service>>
        +tinhBua()
        +tinhGiaMonGoiY()
        +tinhChenhLechPhuLuc()
        +lamTron500()
    }

    class ThanhToan {
        <<service>>
        +taoYeuCau()
        +ghiThuCong()
        +nhanKetQua()
        +phanBo()
        +ghiHoan()
    }

    class ChotNguyenLieuThang {
        <<service>>
        +tongHopNhap()
        +layTonDau()
        +dinhGiaTonCuoi()
        +tinhFoodCost()
        +chotKy()
    }

    class DeXuatGiaThang {
        <<service>>
        +taoNeuChuaCo(thang)
        +tinhTrongSo()
        +xuLyDong()
        +layMonAnhHuong()
    }

    class BaoCao {
        <<service>>
        +doanhThuTheoBua()
        +foodCostTheoKy()
        +laiTheoNguyenLieu()
        +thuHoan()
        +haoHut()
        +dashboard()
    }
```

## Các bất biến miền (Domain Invariants)

1. Bữa tiệc, phụ lục, giao dịch phân bổ, quyết toán và giữ tài nguyên không được trỏ chéo giữa hai hợp đồng.
2. Khách hàng online chỉ xem hồ sơ liên kết số điện thoại của mình; quyền nội bộ xác định theo bảng phân quyền của vai trò.
3. Tổng thu/hoàn tiền tính từ các giao dịch thành công; tổng phân bổ theo bữa phải bằng đúng số tiền giao dịch; số dư chỉ tính một lần tiền cọc.
4. Hủy một bữa tiệc chỉ nhả giữ tài nguyên và hủy phân công của bữa đó, không làm ảnh hưởng đến dữ liệu các bữa khác trong cùng đơn.
5. Tính khả dụng tương lai theo tổng sở hữu dùng được trừ đi các khoảng giữ chồng lấn; tại thời điểm xuất kho kiểm tra thêm lượng sẵn sàng thực tế. Giữ đã xuất kho không bị trừ hai lần.
6. Kho nguyên liệu chỉ kiểm kê theo chu kỳ tháng và lưu phiếu nhập; không phát sinh phiếu xuất kho hay tính tiêu hao nguyên liệu chi tiết theo từng tiệc.
7. Giá trị tồn kho sử dụng đơn giá bình quân tháng; giá nguyên liệu hiện hành dùng đơn giá đề xuất bình quân gia quyền 30 ngày; hai giá trị không dùng thay thế lẫn nhau.
8. Đợt đề xuất giá là duy nhất theo tháng; kỳ nguyên liệu duy nhất theo tháng; đánh giá duy nhất theo bữa; mã giao dịch thanh toán phía đối tác cung cấp là duy nhất.
9. Danh mục đã có lịch sử phát sinh dữ liệu chỉ được phép ngưng sử dụng, không xóa. Nội dung hợp đồng/phụ lục đã xác nhận và giao dịch đã thành công không sửa đè.
