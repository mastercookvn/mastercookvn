import { ROLE, type Role } from "@/constants/roles";
import {
  STAFF_GENDER,
  STAFF_POSITION,
  STAFF_TYPE,
  type StaffGender,
  type StaffPosition,
  type StaffType,
} from "@/constants/staffing";

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

export type Staff = {
  name: string;
  phone: string;
  type: StaffType;
  position: StaffPosition;
  active: boolean;
  hasAccount: boolean;
  /** Data URL of the portrait. */
  photo?: string;
  gender?: StaffGender;
  birthDate?: string;
  address?: string;
  startDate?: string;
  emergencyContact?: string;
  note?: string;
};

export const STAFF: Staff[] = [
  {
    name: "Nguyễn Văn Hùng",
    phone: "0912 000 111",
    type: STAFF_TYPE.Permanent,
    position: STAFF_POSITION.Cook,
    active: true,
    hasAccount: false,
    gender: STAFF_GENDER.Male,
    birthDate: "12/03/1985",
    address: "Q. Gò Vấp, TP.HCM",
    startDate: "01/06/2019",
    emergencyContact: "Vợ: 0912 111 222",
  },
  {
    name: "Lê Thị Hoa",
    phone: "0912 000 222",
    type: STAFF_TYPE.Permanent,
    position: STAFF_POSITION.Cook,
    active: true,
    hasAccount: false,
  },
  {
    name: "Phạm Quốc Bảo",
    phone: "0912 000 333",
    type: STAFF_TYPE.Permanent,
    position: STAFF_POSITION.Driver,
    active: true,
    hasAccount: false,
  },
  {
    name: "Đỗ Minh Tâm",
    phone: "0912 000 444",
    type: STAFF_TYPE.Temporary,
    position: STAFF_POSITION.Server,
    active: true,
    hasAccount: false,
    gender: STAFF_GENDER.Male,
    birthDate: "08/09/2002",
    address: "Q. Bình Thạnh, TP.HCM",
    startDate: "15/03/2025",
    note: "Sinh viên, nhận ca tối và cuối tuần.",
  },
  {
    name: "Vũ Thu Trang",
    phone: "0912 000 555",
    type: STAFF_TYPE.Temporary,
    position: STAFF_POSITION.Server,
    active: true,
    hasAccount: false,
  },
  {
    name: "Trịnh Quốc Bảo",
    phone: "0912 000 888",
    type: STAFF_TYPE.Temporary,
    position: STAFF_POSITION.Server,
    active: true,
    hasAccount: false,
  },
  {
    name: "Hoàng Anh Khoa",
    phone: "0912 000 666",
    type: STAFF_TYPE.Permanent,
    position: STAFF_POSITION.Counter,
    active: true,
    hasAccount: true,
  },
  {
    name: "Bùi Ngọc Lan",
    phone: "0912 000 777",
    type: STAFF_TYPE.Temporary,
    position: STAFF_POSITION.Server,
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
