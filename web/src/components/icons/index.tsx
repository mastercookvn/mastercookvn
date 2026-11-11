import {
  ArrowRight,
  BookOpen,
  BrushCleaning,
  Cake,
  Calculator,
  CalendarDays,
  Carrot,
  ChartColumn,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Coins,
  ConciergeBell,
  CookingPot,
  Download,
  FilePen,
  Flag,
  Flame,
  Flower2,
  HeartHandshake,
  House,
  ListChecks,
  Lock,
  LogOut,
  MapPin,
  Menu,
  Mic,
  Package,
  Phone,
  Plus,
  Printer,
  QrCode,
  Scale,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Soup,
  Star,
  TriangleAlert,
  Undo2,
  Upload,
  User,
  Users,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from "lucide-react";

export type IconProps = {
  size?: number;
  className?: string;
};

/** One stroke weight for the whole app, thinner as icons get larger. */
function fromLucide(Lucide: LucideIcon) {
  function AppIcon({ size = 20, className }: IconProps) {
    return (
      <Lucide
        size={size}
        strokeWidth={size >= 28 ? 1.5 : 1.75}
        className={className ? `icon ${className}` : "icon"}
        aria-hidden="true"
      />
    );
  }
  return AppIcon;
}

export const ArrowIcon = fromLucide(ArrowRight);
export const BookIcon = fromLucide(BookOpen);
export const BowlIcon = fromLucide(Soup);
export const BroomIcon = fromLucide(BrushCleaning);
export const BurgerIcon = fromLucide(Menu);
export const CakeIcon = fromLucide(Cake);
export const CalculatorIcon = fromLucide(Calculator);
export const CalendarIcon = fromLucide(CalendarDays);
export const CarrotIcon = fromLucide(Carrot);
export const ChartIcon = fromLucide(ChartColumn);
export const CheckIcon = fromLucide(Check);
export const ChecklistIcon = fromLucide(ListChecks);
export const ChevronIcon = fromLucide(ChevronRight);
export const ChevronLeftIcon = fromLucide(ChevronLeft);
export const ClipboardIcon = fromLucide(ClipboardList);
export const ClocheIcon = fromLucide(ConciergeBell);
export const ClockIcon = fromLucide(Clock);
export const CloseIcon = fromLucide(X);
export const CoinIcon = fromLucide(Coins);
export const ContractIcon = fromLucide(FilePen);
export const CrateIcon = fromLucide(Package);
export const DownloadIcon = fromLucide(Download);
export const FireIcon = fromLucide(Flame);
export const FlagIcon = fromLucide(Flag);
export const FlowerIcon = fromLucide(Flower2);
export const HomeIcon = fromLucide(House);
export const LockIcon = fromLucide(Lock);
export const LogoutIcon = fromLucide(LogOut);
export const MenuIcon = fromLucide(UtensilsCrossed);
export const MicIcon = fromLucide(Mic);
export const PhoneIcon = fromLucide(Phone);
export const PinIcon = fromLucide(MapPin);
export const PlusIcon = fromLucide(Plus);
export const PotIcon = fromLucide(CookingPot);
export const PrintIcon = fromLucide(Printer);
export const QrIcon = fromLucide(QrCode);
export const RefundIcon = fromLucide(Undo2);
export const RingsIcon = fromLucide(HeartHandshake);
export const ScaleIcon = fromLucide(Scale);
export const SearchIcon = fromLucide(Search);
export const ShieldIcon = fromLucide(ShieldCheck);
export const SlidersIcon = fromLucide(SlidersHorizontal);
export const StarIcon = fromLucide(Star);
export const TeamIcon = fromLucide(Users);
export const UploadIcon = fromLucide(Upload);
export const UserIcon = fromLucide(User);
export const WarningIcon = fromLucide(TriangleAlert);
