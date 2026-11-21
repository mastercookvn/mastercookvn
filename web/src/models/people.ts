import type { Role } from "@/constants/roles";
import type {
  StaffGender,
  StaffPosition,
  StaffType,
} from "@/constants/staffing";

export type StaffAccount = {
  name: string;
  phone: string;
  roles: Role[];
  active: boolean;
};

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
