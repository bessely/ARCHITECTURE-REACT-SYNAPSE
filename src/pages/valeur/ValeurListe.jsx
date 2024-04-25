import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAGINATION } from "../../globalComponents/Pagination";
import SearchZone from '../../globalComponents/SearchZone';
import { searchListe } from '../../services/ValeurListe';
import { setCurrentListe, setModalListe } from '../../store/Valeur/ValeurListe';
import ListListe from './component/ListListe';
import ModalListe from './component/ModalListe';

/**
 *Contient La liste des type liste en cours modification ou en consultation
 *
 */
function ValeurList() {
  const [saisie, setSaisie] = useState("");
  const dispatch = useDispatch();
  const { currentTypeListe } = useSelector((state) => state.typelistes);

  /**La saisie dans le input de recherche  
   * @évènement onChange
  */
  function saisieEnCours(e) {
    setSaisie(e.target.value);
  }

  /**Verifie si la saisi est vide ou pas pour permettre de creer une liste
   * @evenement onClick
   */
  // eslint-disable-next-line
  const verifAddOrNoliste = () => {
    if ((currentTypeListe.STR_TYLNAME === undefined && currentTypeListe.STR_TYLDESCRIPTION === undefined) || (currentTypeListe.STR_TYLNAME === "" || currentTypeListe.STR_TYLDESCRIPTION === "")) {
      return false;
    } else {
      return true;
    }
  };

  /**manipulation des touches pendant la recherche
  * @évènement onKeyUp
  */
  const handleKeyUp = (e) => {
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "Enter") {
      if (saisie !== "") {
        dispatch(searchListe({ search: "%" + saisie + "%", start: 0, listParPage: PAGINATION.listParPage, id: currentTypeListe.LG_TYLID }));
      }else {
        dispatch(searchListe({ search: saisie, start: 0, listParPage: PAGINATION.listParPage, id: currentTypeListe.LG_TYLID }));
      }
    }
  };

  return (
    <div>
      <SearchZone
          saisie        = {saisie}
          saisieEnCours = {saisieEnCours}
          handleKeyUp   = {handleKeyUp}
      >
        <button className={"col-2 btn btn-outline-primary m-0 p-0 "}
          onClick={(e) => {
            dispatch(setModalListe({ open: true, mode: "creation", size: "xl", title: "Nouvelle Liste", button: true, buttonName: "Enregistrer", inputstate: "", btnclass: "btn btn-primary" }))
            dispatch(setCurrentListe({ LG_LSTID: "", STR_LSTOTHERVALUE2: "", STR_LSTOTHERVALUE1: "", STR_LSTOTHERVALUE: "", STR_LSTVALUE: "", STR_LSTDESCRIPTION: "", LG_TYLID: "", LG_SOCID: "" }));
          }}
        >
          Nouvelle Liste
        </button>
      </SearchZone>
      {/*LA LISTE*/}
      <div className="widget-content widget-content-area br-6">
        <ListListe />
      </div>
      {/*LA LISTE*/}
      <ModalListe />
    </div>
  )
}

export default ValeurList;