import NavbarDesktop from "../navbar";
import NavbarMobile from "../navbarMobile";
import { useIsMobile } from "../../hooks/useIsMobile";

interface ResponsiveNavbarProps {
  setPage: (page: number) => void;
}

const ResponsiveNavbar = ({ setPage }: ResponsiveNavbarProps) => {
  const isMobile = useIsMobile(768);
  return isMobile ? (
    <NavbarMobile setPage={setPage} />
  ) : (
    <NavbarDesktop setPage={setPage} />
  );
};

export default ResponsiveNavbar;
