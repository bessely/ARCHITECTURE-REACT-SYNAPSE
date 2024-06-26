import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../../globalComponents/Container';
import NavBar from '../../globalComponents/NavBar';
import { PAGINATION } from "../../globalComponents/Pagination";
import SearchZone from '../../globalComponents/SearchZone';
import { loadDataUtilisateurList } from '../../services/Utilisateur';
import { setCurrentUtilisateur, setModalUtilisateur, setformErreur } from '../../store/Utilisateurs/Utilisateur';
import ListUtilisateur from './component/ListUtilisateur';
import ModalUtilisateur from './component/ModalUtilisateur';

function Utilisateur() {
    const [saisie, setSaisie] = useState("");
    const dispatch            = useDispatch();
    /**La saisie dans le input de recherche 
     * @évènement onChange
    */
    const saisieEnCours = (e) => {
      setSaisie(e.target.value);
    };

    /**manipulation des touches pendant la recherche
    * @évènement onKeyUp
    */
    const handleKeyUp = (e) => {
        if (e.key === "Backspace" || e.key === "Delete" || e.key ==="Enter") {
          if (saisie!=="") {
            dispatch(loadDataUtilisateurList({ search: "%"+saisie+"%", start: 0, listParPage: PAGINATION.listParPage }));
          }else{
            dispatch(loadDataUtilisateurList({ search: saisie, start: 0, listParPage: PAGINATION.listParPage }));
          }
      }
    };

    return (
      <>
        <NavBar title="Utilisateurs et Profils" />
        <Container >
          <div className="layout-px-spacing">
            {/* CONTENT AREA */}
              <div className="row card component-card_9 p-3 mt-3" >
                <SearchZone
                    saisie        = {saisie}
                    saisieEnCours = {saisieEnCours}
                    handleKeyUp   = {handleKeyUp}
                >
                  <button className="col-2 btn btn-outline-primary m-0 p-0  btn-lg"
                          onClick={(e)=>{
                              dispatch(setformErreur([]));
                              dispatch(setModalUtilisateur({ open: true, mode:"creation", size: "xl", title: "Nouvel utilisateur", button:true,  buttonName:"Enregistrer", inputstate: "", btnclass: "btn btn-primary" }));
                              dispatch(setCurrentUtilisateur([{ LG_UTIID: "", STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN:"",  AGENCE:[{}] }]));
                          }}
                  >
                    Nouvel utilisateur
                  </button>
                </SearchZone>
                <div className="widget-content widget-content-area br-6">
                  <ListUtilisateur />
                </div>
              </div>
            {/* CONTENT AREA */}
          </div>
        </Container>
        <ModalUtilisateur/>
      </>
    )
}

export default Utilisateur;