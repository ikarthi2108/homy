import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menu_data from "../../../data/home-data/MenuData";

const NavMenu = () => {
    const [navClick, setNavClick] = useState<any>();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navClick]);

    return (
        <ul className="navbar-nav align-items-lg-center">
            <li className="d-block d-lg-none">
                <div className="logo">
                    <Link to="/" className="d-block">
                        <img src="/assets/images/logo/logo_01.svg" alt="" />
                    </Link>
                </div>
            </li>
            {menu_data.map((menu) => {
                // Direct navigation link: First item or provided link
                const navigateTo = menu.has_dropdown && menu.sub_menus 
                    ? menu.sub_menus[0]?.link || menu.link 
                    : menu.link;

                return (
                    <li key={menu.id} className="nav-item">
                        <Link
                            onClick={() => setNavClick(!navClick)}
                            to={navigateTo}
                            className="nav-link"
                        >
                            {menu.title}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavMenu;
