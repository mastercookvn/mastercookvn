---
order: 10
---

# Mô hình lớp chi tiết

Đây là mô hình lớp chi tiết và đặc tả nghiệp vụ. [Đặc tả phần mềm](../specification.md) làm gốc quy tắc BR. Không sao chép mô hình sang spec.

## Quy ước

- `UUID`: định danh; `?`: tùy chọn; `money`: tiền VNĐ nguyên; `decimal-money`: giá/đơn vị cần độ chính xác trước khi làm tròn; `decimal`: lượng/tỷ lệ chính xác; `datetime`: thời điểm có múi giờ.
- `YearMonth`: tháng theo giờ Việt Nam. Tỷ lệ trong lưu trữ thống nhất dạng thập phân, giao diện hiển thị %.
- Thuộc tính tổng hợp có thể tính khi đọc; nếu lưu bản chốt phải cập nhật nguyên tử và không coi là nguồn tiền thứ hai.
- Các model sau là mô hình miền, không yêu cầu mỗi lớp tương ứng một bảng hoặc tự tạo CRUD cho mọi lớp.
- Các giá và nội dung chốt là dữ liệu lịch sử, không liên kết động để thay đổi theo Catalog mới.
- Các sơ đồ đối tượng PlantUML bên dưới là ví dụ dữ liệu, không bổ sung quy tắc nghiệp vụ. Nhãn `tênĐốiTượng : TênLớp` biểu diễn một instance; định danh như `KH01`, `B01` là ký hiệu rút gọn thay cho UUID. Chỉ các thuộc tính và liên kết cần minh họa được hiển thị, không phải toàn bộ bản ghi hay dữ liệu hệ thống. Tiền ghi bằng VNĐ nguyên, thời gian dùng múi giờ `+07:00`; thuế suất trong ví dụ là tham số giả định, không phải mức thuế pháp định.

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

<!-- diagram id="vitepress-plugin-digrams-class-tong-quan" -->

### Ví dụ sơ đồ đối tượng

Các mã như `DT01`, `B01` là ký hiệu viết tắt cho UUID trong ví dụ. Order `DT01` có hai Meal: `B01` đã hoàn tất, `B02` bị hủy riêng. Contract ban đầu 33.000.000 đồng; Addendum tăng Meal `B01` thêm 1.980.000 đồng. Giao dịch Deposit 16.500.000 đồng được phân bổ cho cả hai Meal. Sơ đồ chỉ hiện một Dish và một loại Equipment đại diện; Menu đầy đủ được minh họa ở mục Order, Meal và khảo sát.

```plantuml
@startuml
title Ví dụ đối tượng tổng quan các phân hệ
top to bottom direction
object "khachLan : KhachHang" as khach {
  id = KH01
  hoTen = "Nguyễn Thị Lan"
}
object "taiKhoanLan : TaiKhoan" as taiKhoan {
  id = TK01
  soDienThoai = "+84901234567"
}
object "vaiTroKhach : VaiTro" as vaiTro {
  ma = "KhachHang"
}
object "nhanVienAn : NhanVien" as nhanVien {
  id = NV01
  viTri = "Phục vụ"
}
object "donDT01 : DonDatTiec" as don {
  id = DT01
  trangThai = "DaNhan"
}
object "buaB01 : BuaTiec" as bua1 {
  id = B01
  soBanAn = 22
  soBanBoTri = 10
  trangThai = "HoanTat"
}
object "buaB02 : BuaTiec" as bua2 {
  id = B02
  trangThai = "DaHuy"
}
object "hopDongHD01 : HopDong" as hopDong {
  id = HD01
  tongGiaTri = 33000000
  trangThai = "HoanTat"
}
object "phuLucPL01 : PhuLucHopDong" as phuLuc {
  chenhLech = 1980000
  trangThai = "DaApDung"
}
object "cocGD01 : GiaoDichThanhToan" as coc {
  loai = "Thu"
  soTien = 16500000
  trangThai = "ThanhCong"
}
object "cocB01 : PhanBoThanhToan" as phanBo1 {
  soTien = 11000000
}
object "cocB02 : PhanBoThanhToan" as phanBo2 {
  soTien = 5500000
}
object "quyetToanB01 : QuyetToanBua" as quyetToan {
  tongPhaiTra = 24130000
}
object "huyB02 : HuyBuaTiec" as huy {
  tienHoan = 2750000
  tienGiuLai = 2750000
}
object "gaHap : MonAn" as mon {
  ten = "Gà hấp"
  giaBanChuan = 200000
}
object "thitGa : NguyenLieu" as nguyenLieu {
  donViChuan = "kg"
  giaHienHanh = 70000
}
object "dia : DungCu" as dungCu {
  id = DC01
  ten = "Đĩa"
  soLuongSoHuu = 299
  soLuongSanSang = 298
}
object "giuB01 : GiuDungCu" as giu {
  soLuong = 242
  trangThai = "DaNha"
}
object "xuatB01 : PhieuXuatDungCu" as xuat {
  trangThai = "DaKiemDem"
}
object "kiemDemB01 : BienBanKiemDem" as kiemDem
object "phanCongAn : PhanCongNhanSu" as phanCong {
  viTri = "Phục vụ"
}
object "danhGiaB01 : DanhGia" as danhGia {
  diem = 5
}
khach --> taiKhoan : lienKet
taiKhoan --> vaiTro : coVaiTro
khach --> don : datTiec
don *-- bua1 : gom
don *-- bua2 : gom
don --> hopDong : phatHanh
hopDong --> phuLuc : dieuChinh
phuLuc --> bua1 : apDung
hopDong --> coc : phatSinh
coc *-- phanBo1 : phanBo
coc *-- phanBo2 : phanBo
phanBo1 --> bua1 : choBua
phanBo2 --> bua2 : choBua
bua1 --> quyetToan : quyetToan
bua2 --> huy : huy
bua1 --> mon : chonMon
mon --> nguyenLieu : dinhLuong
bua1 --> giu : giu
giu --> dungCu : loai
bua1 --> xuat : xuat
xuat --> kiemDem : kiemDem
bua1 --> phanCong : phanCong
phanCong --> nhanVien : giaoCho
bua1 --> danhGia : nhanDanhGia
@enduml
```

<!-- diagram id="vitepress-plugin-digrams-object-tong-quan" -->

## Account và Customer

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

<!-- diagram id="vitepress-plugin-digrams-class-tai-khoan-khach-hang" -->

### Ràng buộc nghiệp vụ

- **TaiKhoan**: Không bắt buộc phải có Account để lưu Customer Profile hoặc Staff Profile.
- **VaiTro**: Role hệ thống cố định theo bảng quyền đặc tả, không có quy trình phê duyệt cấp quyền động.
- **GanVaiTro**: Cặp Account–Role là duy nhất; quyền của người dùng là hợp các Role được gán.
- **KhachHang**: Khóa định danh hồ sơ là số điện thoại chuẩn hóa. Customer đăng ký Account mới cùng số điện thoại sẽ tự động liên kết với Customer Profile đã tạo qua đặt hộ trước đó.
- **NhanVien**: Vị trí chuyên môn (Bếp, Phục vụ, Vận chuyển, Kiểm đếm) là thông tin nghiệp vụ dùng khi tạo Staff Assignment theo ca, không phải Role của Account hệ thống. Không quản lý chấm công/lương.

### Ví dụ sơ đồ đối tượng

Customer Profile Lan được tạo khi đặt hộ, sau đó liên kết Account đăng ký cùng SĐT chuẩn hóa. Customer Minh và Staff Member An chưa có Account. Staff Member Bình có hai Role hệ thống; vị trí chuyên môn của An không phải Role của Account.

```plantuml
@startuml
title Ví dụ tài khoản, hồ sơ và gán vai trò
object "khachLan : KhachHang" as lan {
  id = KH01
  hoTen = "Nguyễn Thị Lan"
  soDienThoai = "+84901234567"
}
object "taiKhoanLan : TaiKhoan" as tkLan {
  id = TK01
  khachHangId = KH01
  nhanVienId = null
  soDienThoai = "+84901234567"
}
object "khachMinh : KhachHang" as minh {
  id = KH02
  hoTen = "Trần Văn Minh"
  soDienThoai = "+84901234568"
}
object "nhanVienAn : NhanVien" as an {
  id = NV01
  hoTen = "Lê Văn An"
  viTri = "Phục vụ"
}
object "nhanVienBinh : NhanVien" as binh {
  id = NV02
  hoTen = "Trần Văn Bình"
  viTri = "Kiểm đếm"
}
object "taiKhoanBinh : TaiKhoan" as tkBinh {
  id = TK02
  nhanVienId = NV02
  khachHangId = null
}
object "vaiTroKhach : VaiTro" as khach {
  id = VT01
  ten = "Khách hàng"
}
object "vaiTroKho : VaiTro" as kho {
  id = VT02
  ten = "Thủ kho"
}
object "vaiTroKeToan : VaiTro" as keToan {
  id = VT03
  ten = "Kế toán"
}
object "ganLanKhach : GanVaiTro" as gan1 {
  taiKhoanId = TK01
  vaiTroId = VT01
}
object "ganBinhKho : GanVaiTro" as gan2 {
  taiKhoanId = TK02
  vaiTroId = VT02
}
object "ganBinhKeToan : GanVaiTro" as gan3 {
  taiKhoanId = TK02
  vaiTroId = VT03
}
lan --> tkLan : lienKetTaiKhoan
binh --> tkBinh : lienKetTaiKhoan
tkLan --> gan1 : co
khach --> gan1 : duocGan
tkBinh --> gan2 : co
tkBinh --> gan3 : co
kho --> gan2 : duocGan
keToan --> gan3 : duocGan
@enduml
```

<!-- diagram id="vitepress-plugin-digrams-object-tai-khoan-khach-hang" -->

## Order, Meal và khảo sát

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

<!-- diagram id="vitepress-plugin-digrams-class-don-bua-khao-sat" -->

### Ràng buộc nghiệp vụ

- **DonDatTiec**: Order hỗ trợ một hoặc nhiều Meal; bản nháp chưa gửi chỉ lưu ở trình duyệt, hệ thống chỉ lưu khi người dùng gửi Order (`ChoXacNhan`).
- **BuaTiec**: Phân biệt rõ số Serving Table và số Tables and Chairs bố trí thực tế. Khung thời gian sử dụng tài nguyên được nhập thủ công. Menu, khảo sát và Staff Assignment độc lập theo từng Meal.
- **LoaiTiec**: Phân loại phục vụ quản lý và thống kê, không tự động gợi ý Dish tâm linh/văn hóa.
- **KhaoSatDiaDiem & TraLoiKhaoSat**: Mỗi Meal có một bản Site Survey riêng; câu hỏi và câu trả lời lưu trực tiếp tại khảo sát, không dùng chung câu trả lời giữa các Meal.
- **MonTrongBua & DichVuTrongBua**: Lưu danh sách Dish và dịch vụ chốt cố định của Meal, không liên kết động theo Catalog hiện hành sau khi Contract phát hành.
- **KhoanGiaBua**: Đúng một bảng tính giá hiện hành cho mỗi Meal. Giá trong Contract chốt là dữ liệu lịch sử bất biến.

### Ví dụ sơ đồ đối tượng

Góc nhìn sau khi Consultant khảo sát Order `DT01` ngày 01/10/2026, trước khi nhận Order và lập Contract: Meal `B01` có 20 Serving Table, bố trí 10 bàn; Meal `B02` có 10 Serving Table, bố trí 5 bàn. Mỗi Meal có khảo sát và bảng giá riêng. Sơ đồ hiển thị đủ 6 Dish của `B01`; các Dish và dịch vụ của `B02` được lược bớt. Thuế suất minh họa 10%, không phụ thu, tổng giá hai Meal là 33.000.000 đồng; giá chỉ được chốt khi phát hành Contract.

```plantuml
@startuml
title Ví dụ đơn hai bữa với khảo sát và giá độc lập
object "donDT01 : DonDatTiec" as don {
  id = DT01
  khachHangId = KH01
  trangThai = "ChoXacNhan"
  ngayTao = "2026-10-01T09:00:00+07:00"
}
object "tiecGiaDinh : LoaiTiec" as loai {
  id = LT01
  ten = "Tiệc gia đình"
}
object "buaB01 : BuaTiec" as bua1 {
  id = B01
  donId = DT01
  batDau = "2026-11-20T11:00:00+07:00"
  ketThuc = "2026-11-20T14:00:00+07:00"
  dungCuTu = "2026-11-20T08:00:00+07:00"
  dungCuDen = "2026-11-20T18:00:00+07:00"
  soBanAnBanDau = 20
  soBanAn = 20
  soBanBoTri = 10
  soGheBoTri = 100
  nhanSuDuKienTheoViTri = {Phục vụ: 4, Bếp: 4}
  trangThai = "DuKien"
}
object "buaB02 : BuaTiec" as bua2 {
  id = B02
  donId = DT01
  batDau = "2026-11-21T11:00:00+07:00"
  ketThuc = "2026-11-21T14:00:00+07:00"
  soBanAn = 10
  soBanBoTri = 5
  soGheBoTri = 50
  trangThai = "DuKien"
}
object "khaoSatB01 : KhaoSatDiaDiem" as ks1 {
  id = KS01
  buaId = B01
  diaChi = "Địa điểm A do khách cung cấp"
  khoangCachKm = 8
}
object "khaoSatB02 : KhaoSatDiaDiem" as ks2 {
  id = KS02
  buaId = B02
  diaChi = "Địa điểm B do khách cung cấp"
  khoangCachKm = 6
}
object "traLoiB01 : TraLoiKhaoSat" as tl1 {
  khaoSatId = KS01
  thuTu = 1
  cauHoi = "Khu vực bố trí bàn ở đâu?"
  traLoi = "Sân trước"
}
object "traLoiB02 : TraLoiKhaoSat" as tl2 {
  khaoSatId = KS02
  thuTu = 1
  cauHoi = "Khu vực bố trí bàn ở đâu?"
  traLoi = "Sân bên hông"
}
object "goi : MonTrongBua" as m1 {
  tenMonChot = "Gỏi"
  donGiaChuanChot = 100000
}
object "sup : MonTrongBua" as m2 {
  tenMonChot = "Súp"
  donGiaChuanChot = 120000
}
object "rauXao : MonTrongBua" as m3 {
  tenMonChot = "Rau xào"
  donGiaChuanChot = 140000
}
object "comChien : MonTrongBua" as m4 {
  tenMonChot = "Cơm chiên"
  donGiaChuanChot = 160000
}
object "caHap : MonTrongBua" as m5 {
  tenMonChot = "Cá hấp"
  donGiaChuanChot = 180000
}
object "gaHap : MonTrongBua" as m6 {
  monId = M06
  tenMonChot = "Gà hấp"
  donGiaChuanChot = 200000
}
object "trangTriB01 : DichVuTrongBua" as dv {
  buaId = B01
  tenChot = "Trang trí"
  donViChot = "gói"
  soLuong = 1
  donGiaChot = 2000000
}
object "giaB01 : KhoanGiaBua" as gia1 {
  buaId = B01
  tienMon = 19800000
  tienDichVu = 2000000
  phuThu = 0
  thueSuat = 0.1
  tienThue = 2000000
  chenhLechLamTron = 0
  tong = 22000000
}
object "giaB02 : KhoanGiaBua" as gia2 {
  buaId = B02
  tienMon = 9000000
  tienDichVu = 1000000
  phuThu = 0
  thueSuat = 0.1
  tienThue = 1000000
  chenhLechLamTron = 0
  tong = 11000000
}
don *-- bua1 : chua
don *-- bua2 : chua
loai --> bua1 : phanLoai
loai --> bua2 : phanLoai
bua1 *-- ks1 : co
bua2 *-- ks2 : co
ks1 *-- tl1 : gom
ks2 *-- tl2 : gom
bua1 *-- m1 : gom
bua1 *-- m2 : gom
bua1 *-- m3 : gom
bua1 *-- m4 : gom
bua1 *-- m5 : gom
bua1 *-- m6 : gom
bua1 *-- dv : gom
bua1 *-- gia1 : tinhGia
bua2 *-- gia2 : tinhGia
@enduml
```

<!-- diagram id="vitepress-plugin-digrams-object-don-bua-khao-sat" -->

## Contract, điều chỉnh và tiền

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

<!-- diagram id="vitepress-plugin-digrams-class-hop-dong-dieu-chinh-tien" -->

### Ràng buộc nghiệp vụ

- **HopDong**: Một Contract bao phủ tất cả các Meal của Order. Nội dung lưu đủ danh sách Meal, đơn giá và điều khoản chốt; không phụ thuộc thay đổi Catalog sau này.
- **XacNhanVanBan**: Gắn với đúng một Contract hoặc Addendum; phương thức ký giấy bắt buộc đính kèm tệp văn bản ký scan. Ký online lưu Account Customer, không dùng OTP.
- **PhuLucHopDong**: Một Addendum cho đúng một Meal; không cho phép dời ngày tiệc. Mỗi Meal chỉ có tối đa một Addendum chưa xử lý để tránh xung đột dữ liệu.
- **HuyBuaTiec**: Lưu kết quả và căn cứ Refund độc lập cho từng Meal; hủy toàn Contract tạo kết quả cho từng Meal tương ứng.
- **GiaoDichThanhToan & PhanBoThanhToan**: Mọi số tiền giao dịch là số dương (loại `Hoan` quyết định chiều chi). Tổng tiền phân bổ cho các Meal phải bằng chính xác số tiền giao dịch.
- **TepDinhKem**: Nội dung tệp lưu trong bucket public trên S3 hoặc dịch vụ lưu trữ object tương thích; `khoaLuuTru` là object key, không phải URL. Cơ sở dữ liệu lưu key và metadata; tên bucket cấu hình riêng cho từng môi trường triển khai. Ảnh Dish, bản ký giấy và chứng từ dùng chung mô hình này. URL truy cập được tạo từ cấu hình lưu trữ và key, không lưu thay key. Vì bucket public, bất kỳ ai biết URL đều có thể truy cập trực tiếp, kể cả bản ký và chứng từ.
- **QuyetToanBua**: Số tiền đã thu/hoàn và số dư tính từ các giao dịch thành công. Meal bị hủy thay thế tiền phục vụ bằng nghĩa vụ Payment sau hủy.

### Ví dụ sơ đồ đối tượng

Contract `HD01` chốt 33.000.000 đồng, ký giấy và thu Deposit 16.500.000 đồng đúng hạn. Addendum ngày 16/11 tăng `B01` từ 20 lên 22 bàn, tăng 1.980.000 đồng; tăng 2 bàn nên không yêu cầu Deposit bổ sung. `B02` bị hủy trước 20 ngày: hoàn 50% Deposit, giữ 2.750.000 đồng. `B01` Settlement 23.980.000 + 150.000 bồi thường = 24.130.000 đồng; sau thu thêm 13.130.000 đồng, số dư bằng 0. `B02` có số dư 2.750.000 − 5.500.000 + 2.750.000 = 0. Contract được đóng sau khi cả hai Meal đã xử lý xong.

```plantuml
@startuml
title Ví dụ hợp đồng, phụ lục, hủy và phân bổ thu hoàn
object "hopDongHD01 : HopDong" as hd {
  id = HD01
  donId = DT01
  tongGiaTri = 33000000
  noiDungChot = "B01: 22000000; B02: 11000000; kèm giá và điều khoản chốt"
  phatHanhLuc = "2026-10-01T10:00:00+07:00"
  hanCoc = "2026-10-02T10:00:00+07:00"
  trangThai = "HoanTat"
}
object "kyHopDong : XacNhanVanBan" as kyHD {
  hopDongId = HD01
  phuLucId = null
  phuongThuc = "KyGiay"
  tenNguoiKy = "Nguyễn Thị Lan"
  thoiDiemKy = "2026-10-01T11:00:00+07:00"
  tepKyId = T01
}
object "banKy : TepDinhKem" as tepKy {
  id = T01
  khoaLuuTru = "hop-dong/HD01/ban-ky.pdf"
  tenGoc = "hop-dong-da-ky.pdf"
  loaiNoiDung = "application/pdf"
}
object "phuLucPL01 : PhuLucHopDong" as pl {
  id = PL01
  hopDongId = HD01
  buaId = B01
  noiDungTruoc = "20 bàn ăn; giá trị 22000000"
  noiDungSau = "22 bàn ăn; giá trị 23980000; giữ ngày tiệc"
  chenhLech = 1980000
  cocBoSung = 0
  ngayLap = "2026-11-16T09:00:00+07:00"
  trangThai = "DaApDung"
}
object "kyPhuLuc : XacNhanVanBan" as kyPL {
  hopDongId = null
  phuLucId = PL01
  phuongThuc = "Online"
  nguoiXacNhanId = TK01
  tenNguoiKy = "Nguyễn Thị Lan"
  thoiDiemKy = "2026-11-16T10:00:00+07:00"
  tepKyId = null
}
object "huyB02 : HuyBuaTiec" as huy {
  buaId = B02
  yeuCauLuc = "2026-11-01T11:00:00+07:00"
  soGioConLai = 480
  cocLamCanCuHoan = 5500000
  traTruocVuot = 0
  tyLeHoan = 0.5
  phiXuLy = 0
  tienHoan = 2750000
  tienGiuLai = 2750000
  thuThemThoaThuan = 0
}
object "cocGD01 : GiaoDichThanhToan" as coc {
  id = GD01
  hopDongId = HD01
  loai = "Thu"
  phuongThuc = "TienMat"
  soTien = 16500000
  trangThai = "ThanhCong"
  thoiDiem = "2026-10-01T11:30:00+07:00"
}
object "thuThemGD02 : GiaoDichThanhToan" as thu {
  id = GD02
  hopDongId = HD01
  loai = "Thu"
  phuongThuc = "TienMat"
  soTien = 13130000
  trangThai = "ThanhCong"
  thoiDiem = "2026-11-20T17:00:00+07:00"
}
object "hoanGD03 : GiaoDichThanhToan" as hoan {
  id = GD03
  hopDongId = HD01
  loai = "Hoan"
  phuongThuc = "TienMat"
  soTien = 2750000
  trangThai = "ThanhCong"
  thoiDiem = "2026-11-02T09:00:00+07:00"
}
object "cocB01 : PhanBoThanhToan" as pb1 {
  giaoDichId = GD01
  buaId = B01
  soTien = 11000000
  phanCocBatBuoc = 11000000
  phanTraTruoc = 0
}
object "cocB02 : PhanBoThanhToan" as pb2 {
  giaoDichId = GD01
  buaId = B02
  soTien = 5500000
  phanCocBatBuoc = 5500000
  phanTraTruoc = 0
}
object "thuThemB01 : PhanBoThanhToan" as pb3 {
  giaoDichId = GD02
  buaId = B01
  soTien = 13130000
}
object "hoanB02 : PhanBoThanhToan" as pb4 {
  giaoDichId = GD03
  buaId = B02
  soTien = 2750000
}
object "quyetToanB01 : QuyetToanBua" as qt1 {
  buaId = B01
  giaTriHienHanh = 23980000
  denBu = 150000
  nghiaVuSauHuy = null
  tongPhaiTra = 24130000
  ngayChot = "2026-11-20T18:00:00+07:00"
}
object "quyetToanB02 : QuyetToanBua" as qt2 {
  buaId = B02
  giaTriHienHanh = 11000000
  denBu = 0
  nghiaVuSauHuy = 2750000
  tongPhaiTra = 2750000
  ngayChot = "2026-11-02T10:00:00+07:00"
}
hd --> kyHD : xacNhan
kyHD --> tepKy : banKyGiay
hd --> pl : co
pl --> kyPL : xacNhan
hd --> coc : phatSinh
hd --> thu : phatSinh
hd --> hoan : phatSinh
coc *-- pb1 : phanBo
coc *-- pb2 : phanBo
thu *-- pb3 : phanBo
hoan *-- pb4 : phanBo
@enduml
```

<!-- diagram id="vitepress-plugin-digrams-object-hop-dong-dieu-chinh-tien" -->

## Catalog Dish và Ingredient

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
        +UUID? anhId
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

    class TepDinhKem {
        +UUID id
        +string khoaLuuTru
    }

    LoaiMon "1" --> "0..*" MonAn : phanLoai
    MonAn "0..*" --> "0..1" TepDinhKem : anh
    SetThucDon "1" *-- "0..*" MonTrongSet : gom
    MonAn "1" <-- "0..*" MonTrongSet : chua
    MonAn "1" *-- "0..*" DinhLuongMon : dinhLuong
    NguyenLieu "1" <-- "0..*" DinhLuongMon : thanhPhan
```

<!-- diagram id="vitepress-plugin-digrams-class-danh-muc-mon-nguyen-lieu" -->

### Ràng buộc nghiệp vụ

- **LoaiMon & MonAn**: Phân nhóm để lọc Catalog; Menu tự chọn không được rỗng, dưới ngưỡng khuyến nghị thì cảnh báo nhưng không chặn. Đơn giá chuẩn áp dụng cho Serving Table chuẩn 10 suất. Ảnh Dish tùy chọn, tham chiếu `TepDinhKem` qua `anhId`; không lưu URL ảnh trực tiếp.
- **SetThucDon**: Đơn giá set tính bằng tổng đơn giá các Dish thành phần, không cộng thêm biên lợi nhuận kép. Meal lưu danh sách Dish chốt, không trỏ động vào set.
- **MonTrongSet**: Cặp set–Dish là duy nhất.
- **NguyenLieu & DinhLuongMon**: Định lượng xác định lượng Ingredient cho 1 Serving Table chuẩn 10 người (cặp Dish–Ingredient là duy nhất). Đơn giá hiện hành dùng để tính chi phí ước tính và đề xuất giá bán Dish.
- **DichVu**: Do cơ sở tự cung cấp (trang trí, âm thanh,...); không quản lý đối tác thuê ngoài.
- **CauHinhNghiepVu**: Tham số nghiệp vụ toàn hệ thống (Target Food Cost, thuế suất,...), áp dụng cho các tính toán và Order tạo mới.

### Ví dụ sơ đồ đối tượng

Set gợi ý gồm 6 Dish, tổng giá chuẩn 900.000 đồng/Serving Table 10 người. Chỉ Dish gà được mở rộng phân loại, ảnh và định lượng trong sơ đồ: 1 kg × 70.000 = 70.000 đồng chi phí ước tính, chia Target Food Cost 0,35 được giá gợi ý 200.000 đồng. Đây là ví dụ giá đã được quản lý chọn, không tự động cập nhật giá bán hay giá Contract.

```plantuml
@startuml
title Ví dụ danh mục, set và định lượng chuẩn
object "monChinh : LoaiMon" as loai {
  id = LM01
  ten = "Món chính"
}
object "gaHap : MonAn" as ga {
  id = M06
  loaiMonId = LM01
  ten = "Gà hấp"
  giaBanChuan = 200000
  anhId = T02
  dangPhucVu = true
}
object "goi : MonAn" as goi {
  ten = "Gỏi"
  giaBanChuan = 100000
}
object "sup : MonAn" as sup {
  ten = "Súp"
  giaBanChuan = 120000
}
object "rauXao : MonAn" as rau {
  ten = "Rau xào"
  giaBanChuan = 140000
}
object "comChien : MonAn" as com {
  ten = "Cơm chiên"
  giaBanChuan = 160000
}
object "caHap : MonAn" as ca {
  ten = "Cá hấp"
  giaBanChuan = 180000
}
object "setGiaDinh : SetThucDon" as set {
  id = SET01
  ten = "Set gia đình 6 món"
  dangPhucVu = true
}
object "monSet1 : MonTrongSet" as ms1 {
  thuTu = 1
}
object "monSet2 : MonTrongSet" as ms2 {
  thuTu = 2
}
object "monSet3 : MonTrongSet" as ms3 {
  thuTu = 3
}
object "monSet4 : MonTrongSet" as ms4 {
  thuTu = 4
}
object "monSet5 : MonTrongSet" as ms5 {
  thuTu = 5
}
object "monSet6 : MonTrongSet" as ms6 {
  thuTu = 6
}
object "thitGa : NguyenLieu" as nl {
  id = NL01
  ten = "Thịt gà"
  donViChuan = "kg"
  giaHienHanh = 70000
}
object "dinhLuongGa : DinhLuongMon" as dl {
  monId = M06
  nguyenLieuId = NL01
  soLuongChuan = 1
}
object "anhGa : TepDinhKem" as anh {
  id = T02
  khoaLuuTru = "mon-an/M06/ga-hap.jpg"
}
object "trangTri : DichVu" as dv {
  ten = "Trang trí"
  donVi = "gói"
  donGia = 2000000
  dangSuDung = true
}
object "cauHinhThang10 : CauHinhNghiepVu" as cauHinh {
  foodCostMucTieu = 0.35
  thueSuat = 0.1
  mocHieuLuc = "2026-10-01T00:00:00+07:00"
}
loai --> ga : phanLoai
ga --> anh : anh
set *-- ms1 : gom
set *-- ms2 : gom
set *-- ms3 : gom
set *-- ms4 : gom
set *-- ms5 : gom
set *-- ms6 : gom
ms1 --> goi : chua
ms2 --> sup : chua
ms3 --> rau : chua
ms4 --> com : chua
ms5 --> ca : chua
ms6 --> ga : chua
ga *-- dl : dinhLuong
dl --> nl : thanhPhan
@enduml
```

<!-- diagram id="vitepress-plugin-digrams-object-danh-muc-mon-nguyen-lieu" -->

## Nhập, Inventory Count và food cost

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

<!-- diagram id="vitepress-plugin-digrams-class-nhap-kiem-ke-food-cost" -->

### Ràng buộc nghiệp vụ

- **PhieuNhapNguyenLieu & DongNhapNguyenLieu**: Ghi nhận lượng và đơn giá thực mua; không bắt buộc gắn trực tiếp với Meal. Lượng $>0$, đơn giá $\ge 0$.
- **KyNguyenLieu & DongKiemKeNguyenLieu**: Inventory Count và chốt kỳ theo tháng. Tiêu thụ = Giá trị đầu + Nhập − Cuối kỳ. Không xuất kho trừ Ingredient sau từng Meal.
- **DotDeXuatGia & DongDeXuatGia**: Khởi tạo mốc tính ngày đầu tháng; tính bình quân trọng số 30 ngày gần nhất (khoảng cách 10 ngày tương ứng 1.5; 1.5; 2). Giá đề xuất độc lập với giá trị tồn kho.

### Ví dụ sơ đồ đối tượng

Ingredient `NL01` có 3 lần nhập trong tháng 11, tổng 30 kg trị giá 2.100.000 đồng. Tồn đầu 10 kg trị giá 600.000 đồng; bình quân tháng là 67.500 đồng/kg. Lượng cuối theo Inventory Count là 8 kg, có giá trị 540.000 đồng và chi phí tiêu thụ 2.160.000 đồng. Kỳ minh họa tổng hợp toàn cơ sở, không chỉ Order `DT01`; doanh thu Dish 24.000.000 đồng cho food cost 0,09 (9%) và Ingredient Margin 21.840.000 đồng. Chỉ dòng Inventory Count `NL01` có chi phí tiêu thụ trong ví dụ; các dòng còn lại, nếu có, được lược bớt và có chi phí tiêu thụ bằng 0.

Đợt tháng 12 dùng khoảng `[01/11, 01/12)` và ba trọng số 1,5; 1,5; 2. Giá đề xuất = (10 × 60.000 × 1,5 + 10 × 70.000 × 1,5 + 10 × 80.000 × 2) / (10 × 1,5 + 10 × 1,5 + 10 × 2) = 71.000 đồng/kg, khác giá tồn 67.500 đồng/kg. Dòng đề xuất chưa xử lý nên chưa có giá được chọn; không tự cập nhật giá hiện hành.

```plantuml
@startuml
title Ví dụ nhập nguyên liệu, chốt tháng và đề xuất giá
object "nhapDauThang : PhieuNhapNguyenLieu" as pn1 {
  id = PN01
  ngayNhap = "2026-11-05T09:00:00+07:00"
  tenNhaCungCap = "Cửa hàng A"
}
object "nhapGiuaThang : PhieuNhapNguyenLieu" as pn2 {
  id = PN02
  ngayNhap = "2026-11-15T09:00:00+07:00"
  tenNhaCungCap = "Cửa hàng A"
}
object "nhapCuoiThang : PhieuNhapNguyenLieu" as pn3 {
  id = PN03
  ngayNhap = "2026-11-25T09:00:00+07:00"
  tenNhaCungCap = "Cửa hàng A"
}
object "dongNhap1 : DongNhapNguyenLieu" as dn1 {
  phieuId = PN01
  nguyenLieuId = NL01
  donViChot = "kg"
  soLuong = 10
  donGia = 60000
}
object "dongNhap2 : DongNhapNguyenLieu" as dn2 {
  phieuId = PN02
  nguyenLieuId = NL01
  donViChot = "kg"
  soLuong = 10
  donGia = 70000
}
object "dongNhap3 : DongNhapNguyenLieu" as dn3 {
  phieuId = PN03
  nguyenLieuId = NL01
  donViChot = "kg"
  soLuong = 10
  donGia = 80000
}
object "kyThang11 : KyNguyenLieu" as ky {
  id = KY202611
  thang = "2026-11"
  trangThai = "DaChot"
  doanhThuMon = 24000000
  chiPhiTieuThu = 2160000
  foodCostThucTe = 0.09
  laiTheoNguyenLieu = 21840000
  chotLuc = "2026-12-01T08:00:00+07:00"
}
object "kiemKeGa : DongKiemKeNguyenLieu" as kk {
  kyId = KY202611
  nguyenLieuId = NL01
  luongDau = 10
  giaTriDau = 600000
  luongNhap = 30
  giaTriNhap = 2100000
  luongCuoiThucTe = 8
  donGiaBinhQuan = 67500
  giaTriCuoi = 540000
  chiPhiTieuThu = 2160000
}
object "dotThang12 : DotDeXuatGia" as dot {
  id = DX202612
  thang = "2026-12"
  mocTinh = "2026-12-01T00:00:00+07:00"
  tuNgay = "2026-11-01T00:00:00+07:00"
  denNgay = "2026-12-01T00:00:00+07:00"
  taoLuc = "2026-12-01T08:05:00+07:00"
}
object "deXuatGa : DongDeXuatGia" as dx {
  dotId = DX202612
  nguyenLieuId = NL01
  giaCu = 70000
  giaDeXuat = 71000
  giaDuocChon = null
  nguoiXuLyId = null
  xuLyLuc = null
}
pn1 *-- dn1 : gom
pn2 *-- dn2 : gom
pn3 *-- dn3 : gom
ky *-- kk : gom
dot *-- dx : gom
@enduml
```

<!-- diagram id="vitepress-plugin-digrams-object-nhap-kiem-ke-food-cost" -->

## Equipment và tài nguyên

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

<!-- diagram id="vitepress-plugin-digrams-class-dung-cu-tai-nguyen" -->

### Ràng buộc nghiệp vụ

- **DungCu**: Bất biến sở hữu: $\text{Sở hữu} = \text{Sẵn sàng} + \text{Đang sử dụng} + \text{Hư}$. Tồn tối thiểu là ngưỡng cảnh báo bổ sung, không chặn cứng quy trình nếu đủ lượng dùng được.
- **GiuDungCu**: Giữ tạm (24 giờ) hoặc giữ chính thức; phân biệt rõ với xuất kho để tránh trừ kho hai lần vào năng lực khả dụng tương lai.
- **GiaBoiThuongBua**: Đơn giá bồi thường được chốt trong Contract trước khi diễn ra tiệc, không áp dụng đơn giá thị trường tại thời điểm kiểm đếm.
- **PhieuNhapDungCu & DongNhapDungCu**: Nhập mua bổ sung trực tiếp làm tăng sẵn sàng và tăng sở hữu.
- **PhieuXuatDungCu, BienBanKiemDem & DongKiemDem**: Một Meal tối đa một phiếu xuất và một Count Report đầy đủ. Điều kiện cân bằng bắt buộc: $\text{Tốt} + \text{Hư} + \text{Mất} = \text{Xuất}$; $0 \le \text{Khách chịu} \le \text{Hư} + \text{Mất}$.
- **XuLyDungCuHu**: Ghi nhận lượng phục hồi (chuyển sang sẵn sàng) hoặc loại bỏ (giảm lượng hư và giảm sở hữu).

### Ví dụ sơ đồ đối tượng

Sau khi tăng `B01` lên 22 bàn × 10 người, nhu cầu đĩa là làm tròn lên (220 × 1 × 1,1) = 242 chiếc. Phiếu mua trước đó nhập 300 chiếc; Meal xuất 242 chiếc, thu tốt 239, hư 2, mất 1. Customer chịu trách nhiệm cho cả 3 chiếc hư/mất theo giá chốt 50.000 đồng, thành 150.000 đồng bồi thường. Ngày 21/11 phục hồi 1 chiếc hư; trạng thái tồn sau xử lý là sở hữu 299 = sẵn sàng 298 + đang sử dụng 0 + hư 1. Giữ đã xuất được nhả sau thu hồi, không trừ thêm vào kho vật lý. Đây là góc nhìn sau xử lý, không phải tồn ngay lúc xuất.

```plantuml
@startuml
title Ví dụ giữ, nhập, xuất, kiểm đếm và phục hồi dụng cụ
object "dia : DungCu" as dc {
  id = DC01
  ten = "Đĩa"
  donVi = "chiếc"
  coSoDinhMuc = "Người"
  dinhMuc = 1
  duTru = 0.1
  soLuongToiThieu = 50
  giaBoiThuong = 60000
  soLuongSoHuu = 299
  soLuongSanSang = 298
  soLuongDangSuDung = 0
  soLuongHu = 1
}
object "giuB01 : GiuDungCu" as giu {
  buaId = B01
  dungCuId = DC01
  soLuong = 242
  tuLuc = "2026-11-20T08:00:00+07:00"
  denLuc = "2026-11-20T18:00:00+07:00"
  trangThai = "DaNha"
  daXuat = true
}
object "giaChotB01 : GiaBoiThuongBua" as gia {
  buaId = B01
  dungCuId = DC01
  tenChot = "Đĩa"
  donGiaChot = 50000
}
object "nhapDia : PhieuNhapDungCu" as nhap {
  id = PND01
  ngayNhap = "2026-09-25T09:00:00+07:00"
  tenNhaCungCap = "Cửa hàng dụng cụ B"
}
object "dongNhapDia : DongNhapDungCu" as dn {
  phieuId = PND01
  dungCuId = DC01
  soLuong = 300
  donGia = 30000
}
object "xuatB01 : PhieuXuatDungCu" as xuat {
  id = PXD01
  buaId = B01
  xuatLuc = "2026-11-20T08:00:00+07:00"
  trangThai = "DaKiemDem"
}
object "dongXuatDia : DongXuatDungCu" as dx {
  id = DXD01
  phieuId = PXD01
  dungCuId = DC01
  soLuong = 242
}
object "kiemDemB01 : BienBanKiemDem" as bb {
  id = BB01
  phieuXuatId = PXD01
  kiemLuc = "2026-11-20T16:30:00+07:00"
}
object "kiemDemDia : DongKiemDem" as kd {
  bienBanId = BB01
  dongXuatId = DXD01
  thuHoiTot = 239
  hu = 2
  mat = 1
  soKhachChiu = 3
  donGiaBoiThuongChot = 50000
  lyDo = "Hai đĩa hư và một đĩa mất do khách"
}
object "phucHoiDia : XuLyDungCuHu" as xuLy {
  dungCuId = DC01
  soLuong = 1
  loai = "PhucHoi"
  lyDo = "Đã phục hồi và kiểm tra một chiếc hư sau thu hồi"
  thoiDiem = "2026-11-21T09:00:00+07:00"
}
nhap *-- dn : gom
xuat *-- dx : gom
xuat --> bb : lapBienBan
bb *-- kd : gom
kd --> dx : kiemTheoDongXuat
@enduml
```

<!-- diagram id="vitepress-plugin-digrams-object-dung-cu-tai-nguyen" -->

## Staff Assignment và đánh giá

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

<!-- diagram id="vitepress-plugin-digrams-class-phan-cong-danh-gia" -->

### Ràng buộc nghiệp vụ

- **PhanCongNhanSu**: Khung giờ làm việc có thể bao phủ hoặc lệch so với giờ phục vụ của Meal. Kiểm tra chặn trùng lịch khi tạo Staff Assignment cho Staff Member cụ thể. Năng lực nhân sự chung được dự trù theo vị trí của các Meal đang giữ trước khi gán người đích danh.
- **DanhGia**: Mỗi Meal tối đa một đánh giá (điểm 1–5), chỉ mở khi Meal đã chuyển trạng thái `HoanTat`. Người đánh giá phải là người đặt của Order chứa Meal đó.

### Ví dụ sơ đồ đối tượng

Staff Assignment của Staff Member An phục vụ `B01` từ 08:00 đến 15:00 ngày 20/11, rộng hơn giờ phục vụ 11:00–14:00. Đây là một Staff Assignment trong nhu cầu dự kiến 4 người phục vụ, không phải toàn bộ nhân sự của Meal. Sau khi `B01` hoàn tất và Settlement xong, Customer Lan (người đặt Order `DT01`) tự nhập đánh giá 5 điểm bằng Account `TK01`. Không tạo đánh giá cho Meal `B02` đã hủy.

```plantuml
@startuml
title Ví dụ phân công theo giờ và đánh giá sau hoàn tất
object "phanCongAn : PhanCongNhanSu" as pc {
  id = PC01
  buaId = B01
  nhanVienId = NV01
  viTri = "Phục vụ"
  nhiemVu = "Chuẩn bị và phục vụ khu vực bàn ăn"
  batDau = "2026-11-20T08:00:00+07:00"
  ketThuc = "2026-11-20T15:00:00+07:00"
  nguoiPhanCongId = TK03
}
object "danhGiaB01 : DanhGia" as dg {
  id = DG01
  buaId = B01
  khachHangId = KH01
  diem = 5
  nhanXet = "Phục vụ chu đáo"
  nguoiNhapId = TK01
  ngayNhap = "2026-11-21T10:00:00+07:00"
}
@enduml
```

<!-- diagram id="vitepress-plugin-digrams-object-phan-cong-danh-gia" -->

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

<!-- diagram id="vitepress-plugin-digrams-class-dich-vu-mien" -->

### Ví dụ sơ đồ đối tượng

Các đối tượng dưới đây là instance của đủ 6 dịch vụ miền, không phải bản ghi nghiệp vụ. Ghi chú chỉ nêu ngữ cảnh sử dụng đã có trong đặc tả; không thêm thuộc tính lưu trữ, quan hệ phụ thuộc hay thứ tự gọi giữa các dịch vụ.

```plantuml
@startuml
title Ví dụ các đối tượng dịch vụ miền
object "kiemTraTaiNguyen : KiemTraTaiNguyen" as taiNguyen
object "tinhGia : TinhGia" as gia
object "thanhToan : ThanhToan" as tien
object "chotNguyenLieuThang : ChotNguyenLieuThang" as chot
object "deXuatGiaThang : DeXuatGiaThang" as deXuat
object "baoCao : BaoCao" as baoCao
note right of taiNguyen
  Kiểm tra và giữ dụng cụ, nhân sự
  cho từng bữa của DT01 theo khung giờ nhập.
end note
note right of gia
  Tính B01 ban đầu 22000000;
  chênh lệch PL01 là 1980000.
end note
note right of tien
  Ghi thu GD01, GD02 và hoàn GD03;
  phân bổ đúng số tiền cho từng bữa.
end note
note right of chot
  Chốt kỳ 2026-11:
  tiêu thụ 2160000, food cost 0.09.
end note
note right of deXuat
  Tạo đợt 2026-12 theo mốc đầu tháng;
  đề xuất giá NL01 là 71000 đồng/kg.
end note
note right of baoCao
  Tổng hợp doanh thu bữa thực hiện,
  food cost theo kỳ, thu/hoàn và hao hụt.
end note
@enduml
```

<!-- diagram id="vitepress-plugin-digrams-object-dich-vu-mien" -->

## Các bất biến miền (Domain Invariants)

1. Meal, Addendum, giao dịch phân bổ, Settlement và giữ tài nguyên không được trỏ chéo giữa hai Contract.
2. Customer online chỉ xem hồ sơ liên kết số điện thoại của mình; quyền nội bộ xác định theo bảng phân quyền của Role.
3. Tổng thu/Refund tính từ các giao dịch thành công; tổng phân bổ theo Meal phải bằng đúng số tiền giao dịch; số dư chỉ tính một lần Deposit.
4. Hủy một Meal chỉ nhả giữ tài nguyên và hủy Staff Assignment của Meal đó, không làm ảnh hưởng đến dữ liệu các Meal khác trong cùng Order.
5. Tính khả dụng tương lai theo tổng sở hữu dùng được trừ đi các khoảng giữ chồng lấn; tại thời điểm xuất kho kiểm tra thêm lượng sẵn sàng thực tế. Giữ đã xuất kho không bị trừ hai lần.
6. Kho Ingredient chỉ thực hiện Inventory Count theo chu kỳ tháng và lưu phiếu nhập; không phát sinh phiếu xuất kho hay tính tiêu hao Ingredient chi tiết theo từng tiệc.
7. Giá trị tồn kho sử dụng đơn giá bình quân tháng; Current Ingredient Price dùng đơn giá đề xuất bình quân gia quyền 30 ngày; hai giá trị không dùng thay thế lẫn nhau.
8. Đợt đề xuất giá là duy nhất theo tháng; kỳ Ingredient duy nhất theo tháng; đánh giá duy nhất theo Meal; mã giao dịch Payment phía đối tác cung cấp là duy nhất.
9. Catalog đã có lịch sử phát sinh dữ liệu chỉ được phép ngưng sử dụng, không xóa. Nội dung Contract/Addendum đã xác nhận và giao dịch đã thành công không sửa đè.
