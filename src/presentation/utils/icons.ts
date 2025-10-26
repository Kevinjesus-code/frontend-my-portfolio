import { 
  User, 
  Mail, 
  MessageSquare, 
  Send, 
  Download,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Home,
  Settings,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
  Code,        
  Award,       
  ExternalLink,
  type LucideIcon
} from "lucide-react";

export const icons = {
  User,
  Mail,
  MessageSquare,
  Send,
  Download,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Home,
  Settings,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
  Code,        
  Award,       
  ExternalLink,
} as const;

export type IconName = keyof typeof icons;

export type { LucideIcon };