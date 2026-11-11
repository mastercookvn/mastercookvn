import { ROLE, type Role } from "@/constants/roles";

export type StaffAccount = {
  name: string;
  phone: string;
  roles: Role[];
  active: boolean;
};

export const STAFF_ACCOUNTS: StaffAccount[] = [
  {
    name: "Phạm Thu Hà",
    phone: "0901 000 001",
    roles: [ROLE.BranchManager],
    active: true,
  },
  {
    name: "Trịnh Bảo Ngọc",
    phone: "0901 000 002",
    roles: [ROLE.Consultant],
    active: true,
  },
  {
    name: "Ngô Đức Anh",
    phone: "0901 000 003",
    roles: [ROLE.Accountant],
    active: true,
  },
  {
    name: "Hoàng Anh Khoa",
    phone: "0912 000 666",
    roles: [ROLE.Storekeeper],
    active: true,
  },
  {
    name: "Dương Mỹ Linh",
    phone: "0901 000 005",
    roles: [ROLE.HrManager, ROLE.Consultant],
    active: true,
  },
  {
    name: "Tạ Công Minh",
    phone: "0901 000 006",
    roles: [ROLE.Accountant],
    active: false,
  },
];

export const STAFF_TYPES = ["Cố định", "Thời vụ"] as const;

export const STAFF_GENDERS = ["Nam", "Nữ", "Khác"] as const;

export type WorkExperience = {
  place: string;
  role: string;
  period: string;
};

export type StaffMember = {
  name: string;
  phone: string;
  type: (typeof STAFF_TYPES)[number];
  position: string;
  active: boolean;
  hasAccount: boolean;
  /** Data URL of the portrait. */
  photo?: string;
  gender?: (typeof STAFF_GENDERS)[number];
  birthDate?: string;
  address?: string;
  startDate?: string;
  emergencyContact?: string;
  skills?: string[];
  experience?: WorkExperience[];
  certificates?: string;
  /** Data URLs of CV pages or certificate photos. */
  cvFiles?: string[];
  note?: string;
};

export const STAFF: StaffMember[] = [
  {
    name: "Nguyễn Văn Hùng",
    phone: "0912 000 111",
    type: "Cố định",
    position: "Bếp",
    active: true,
    hasAccount: false,
    gender: "Nam",
    birthDate: "12/03/1985",
    address: "Q. Gò Vấp, TP.HCM",
    startDate: "01/06/2019",
    emergencyContact: "Vợ: 0912 111 222",
    skills: ["Bếp chính", "Món Á", "Lẩu"],
    experience: [
      { place: "Nhà hàng Hoa Viên", role: "Phụ bếp", period: "2012–2016" },
      { place: "Tiệc cưới Kim Ngân", role: "Bếp chính", period: "2016–2019" },
    ],
    certificates: "Chứng nhận tập huấn an toàn thực phẩm 2024",
  },
  {
    name: "Lê Thị Hoa",
    phone: "0912 000 222",
    type: "Cố định",
    position: "Bếp",
    active: true,
    hasAccount: false,
  },
  {
    name: "Phạm Quốc Bảo",
    phone: "0912 000 333",
    type: "Cố định",
    position: "Vận chuyển",
    active: true,
    hasAccount: false,
  },
  {
    name: "Đỗ Minh Tâm",
    phone: "0912 000 444",
    type: "Thời vụ",
    position: "Phục vụ",
    active: true,
    hasAccount: false,
    gender: "Nam",
    birthDate: "08/09/2002",
    address: "Q. Bình Thạnh, TP.HCM",
    startDate: "15/03/2025",
    skills: ["Bưng bê", "Set bàn tiệc cưới"],
    experience: [
      {
        place: "Trung tâm tiệc White Palace",
        role: "Phục vụ",
        period: "2022–2024",
      },
    ],
    note: "Sinh viên, nhận ca tối và cuối tuần.",
  },
  {
    name: "Vũ Thu Trang",
    phone: "0912 000 555",
    type: "Thời vụ",
    position: "Phục vụ",
    active: true,
    hasAccount: false,
  },
  {
    name: "Trịnh Quốc Bảo",
    phone: "0912 000 888",
    type: "Thời vụ",
    position: "Phục vụ",
    active: true,
    hasAccount: false,
  },
  {
    name: "Hoàng Anh Khoa",
    phone: "0912 000 666",
    type: "Cố định",
    position: "Kiểm đếm",
    active: true,
    hasAccount: true,
  },
  {
    name: "Bùi Ngọc Lan",
    phone: "0912 000 777",
    type: "Thời vụ",
    position: "Phục vụ",
    active: false,
    hasAccount: false,
  },
];

export const SAMPLE_ACCOUNTS = [
  { label: "Quản lý cơ sở", phone: "0901 000 001" },
  { label: "Tư vấn", phone: "0901 000 002" },
  { label: "Kế toán", phone: "0901 000 003" },
  { label: "Thủ kho", phone: "0912 000 666" },
  { label: "Nhân sự, Tư vấn", phone: "0901 000 005" },
  { label: "Khách hàng", phone: "0903 123 456" },
];
