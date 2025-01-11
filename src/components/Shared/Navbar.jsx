import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Sidebar } from "./Sidebar";
import {
  HideSidebar,
  HideSidebarUser,
  ShowSidebar,
  ShowSidebarUser,
} from "../../actions/sidebar";
import { logout } from "../../actions/login";
import { DeleteAllTab } from "../../actions/tabs";
import { ShortcutsNavbar } from "./ShortcutsNavbar";
import {
  FaTableList,
  FaMoneyBillTransfer,
  FaUserCheck,
  FaCircleChevronRight,
} from "react-icons/fa6";
export const Navbar = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { sidebar, sidebarUser, dollar } = state.sidebar;
  const { auth } = state.login;

  const showSidebar = () => {
    dispatch(ShowSidebar());
  };

  const hideSidebar = () => {
    dispatch(HideSidebar());
  };

  const showSidebarUser = () => {
    dispatch(ShowSidebarUser());
  };

  const hideSidebarUser = () => {
    dispatch(HideSidebarUser());
  };

  const Logout = () => {
    dispatch(DeleteAllTab());
    dispatch(logout());
  };

  //---------------------------------------
  const handleAddTab = (title, path) => {
    dispatch(addTab(title, path));
  };
  //---------------------------------------

  return (
    <>
      <button
        className="btn btn-primary fixed-button"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#menuFlotante"
      >
        <FaCircleChevronRight className="iconSizeXL" />
      </button>

      <div className="offcanvas offcanvas-start" id="menuFlotante">
        <div className="offcanvas-header bg-primary text-white">
          <h3 className="offcanvas-title">Menú</h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body bg-primary">
          <div className="container-fluid mt-3">
            <div className="row text-md-center">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <a class="navbar-brand" href="#">
            2650
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse spaceNav"
            id="collapsibleNavbar"
          >
            <div className="row colRes">
              <div className="col-md-12">
                <div className="card cardNav">
                  <div className="card-header">
                    <strong>
                      <FaTableList className="iconSizeXL" /> Opciones
                    </strong>
                  </div>
                  <div className="card-body">
                    <ShortcutsNavbar />
                  </div>
                </div>
              </div>
            </div>

            <div className="row colRes">
              <div className="col-md-12">
                <div className="card cardNav">
                  <div className="card-header">
                    <strong>
                      <FaMoneyBillTransfer className="iconSizeXL" /> Tipo Cambio
                    </strong>
                  </div>
                  <div className="card-body">₡ {dollar}</div>
                </div>
              </div>
            </div>

            <div className="row colRes">
              <div className="col-md-12">
                <div className="card cardNav">
                  <div className="card-header">
                    <strong>
                      <FaUserCheck className="iconSizeXL" /> Usuario
                    </strong>
                  </div>
                  <div className="card-body">{auth.username}</div>
                </div>
              </div>
            </div>

            <div className="row colRes">
              <div className="col-md-12">
                <button onClick={Logout} className="btn btn-danger">
                  <strong>
                    <BiLogOut className="iconSizeXL" /> Salir
                  </strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className={sidebar ? "vet_nav-menu active" : "vet_nav-menu"}>
        <ul className="vet_nav-menu-items">
          <li className="vet_navbar-toggle">
            <Link to="#" className="vet_menu-bars" onClick={hideSidebar}>
              <AiOutlineClose />
            </Link>
          </li>

          <Sidebar />
        </ul>
      </nav>

      <nav
        className={
          sidebarUser ? "vet_nav-menu-user active" : "vet_nav-menu-user"
        }
      >
        <ul className="vet_nav-menu-items" onClick={hideSidebarUser}>
          <li className="vet_navbar-toggle-right">
            <Link to="#" className="vet_menu-bars-right">
              <AiOutlineClose />
            </Link>
          </li>

          <li className="vet_nav-text_user">
            <a onClick={Logout}>
              <BiLogOut />
              <span className="vet_nav-span">Cerrar sesion</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
