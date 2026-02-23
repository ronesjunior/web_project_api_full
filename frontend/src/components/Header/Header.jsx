import logo from "../../images/header.png";
import menuburguer_icon from "../../assets/burger_menu.svg";
import close_icon from "../../images/Close_Icon.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../blocks/header.css";

export default function Header() {
  const { isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser } =
    useContext(CurrentUserContext);

  const navigate = useNavigate();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 544) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let headerLink;

  if (isLoggedIn) {
    headerLink = (
      <ul className={`header_nav ${menuOpen ? "header_nav_open" : ""}`}>
        <li className="header__email">{currentUser.email}</li>
        <button
          className="header__button header__button_signout"
          onClick={signOut}
        >
          Sair
        </button>
      </ul>
    );
  }

  if (location.pathname === "/signup") {
    headerLink = (
      <Link className="header__button" to="/signin">
        Faça o login
      </Link>
    );
  }

  if (location.pathname === "/signin") {
    headerLink = (
      <Link className="header__button" to="/signin">
        Entrar
      </Link>
    );
  }

  function signOut() {
    localStorage.removeItem("jwt"); // remove o localstorage da memória do browser
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/signin");
  }

  return (
    // <header className={`header ${menuOpen ? "header_menu-open" : ""}`}>
    <header className={"header"}>
      {menuOpen && headerLink}
      <div className="header__menu">
        <img src={logo} alt="Around the U.S logo" className="header__logo" />
        {isLoggedIn && (
          <>
            <button className={`header__burger`} onClick={toggleMenu}>
              <img
                src={menuOpen ? close_icon : menuburguer_icon}
                alt="menu hamburger"
              />
            </button>
            {!menuOpen && headerLink}
          </>
        )}
      </div>

      {/* Links de login / signup (quando NÃO estiver logado) */}
      {!isLoggedIn && headerLink}
    </header>
  );
}
