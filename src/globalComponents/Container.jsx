import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Menu from "./Menu";
import Footer from "./Footer";
import { setSubMenuState } from '../store/Utilisateurs/Utilisateur';

/** LE CONTAINER DU CONTENU DE LA PAGE EN COURS IL CONTIENT AUSSI LE MENU ET LE FOOTER
 * @param {JSX} children Les composants enfants qui constituent le contenu de la page
 * @returns JSX
 */
function Container({ children }) {
    const { subMenuState } = useSelector((state) => state.utilisateurs);
    const dispatch         = useDispatch();

    //qd on click dans le contenu de la page je cache le menu si cetais pas deja le cas
    const handleHideOverleyClick = (e) => {
        e.preventDefault();
        dispatch(setSubMenuState("hide"));
    };

    return (
        <div className="main-container m-0 p-0" id="container" >
            <div className={"" + subMenuState === "active" ? "overlay show" : "overlay"} onClick={(e) => { handleHideOverleyClick(e) }} />
            <div className="search-overlay" />
            <Menu />
            <div id="content" className="main-content">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Container