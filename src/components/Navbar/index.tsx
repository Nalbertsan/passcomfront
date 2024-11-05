
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import { RxAvatar } from "react-icons/rx";

export function NavBarComponent() {
  const {
    auth,
 } = useContext(AuthContext);
 const {logout} = useAuth();
 const server = localStorage.getItem('passcom-server');
  return (
    <Navbar fluid rounded className=" w-full text-base font-semibold">
      <NavbarBrand>
        <div className="w-50">
          <span>
            {`Servidor ${server}`}
          </span>
        </div>
      </NavbarBrand>
      
      <NavbarCollapse>

      </NavbarCollapse>
      <div className="flex items-center gap-2">
        <span className="">
          {auth?.name}
        </span>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <RxAvatar className="rounded-full w-10 h-10 text-blue-800" />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{auth?.name}</span>
            <span className="block truncate text-sm font-medium">{auth?.email}</span>
          </DropdownHeader>
          <DropdownItem onClick={logout}>Sair</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      
      
    </Navbar>
  );
}


