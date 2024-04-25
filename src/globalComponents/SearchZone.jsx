import React from 'react'


/**
 * 
 * @param {string} saisie  le state qui recoi la saisie en cours
 * @param {function} saisieEnCours  la fonction setter de saisie
 * @param {function} handleKeyUp  la fonction d'action quand on saisie une touche
 * @param {string} helpText  le petit text à afficher en bas de la zonne de saisie 
 * @returns 
 */
function SearchZone({children,saisie,saisieEnCours,handleKeyUp, helpText="Taper sur la touche Enter pour démarrer la recherche."}) {
        return (
                <div className="form card d-flex flex-wrap flex-row justify-content-between mb-3 p-3" style={{ backgroundColor: "#e0e6ed" }} >
                        <div className="col-8 m-0 field-wrapper input">
                                <input type="search" onChange={saisieEnCours} onKeyUp={handleKeyUp} value={saisie} className="form-control" id="search" aria-describedby="emailHelp1" placeholder="Affiner la recherche : saisissez un mot clé" />
                                <small id="emailHelp1" className="form-text text-muted">{helpText}</small>
                        </div>
                        {children}
                </div>
        )
}

export default SearchZone