import React from 'react';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';
import { deleteListe, getDataListe } from '../../../services/ValeurListe';
import { setCurrentListe, setModalListe, setformErreur } from '../../../store/Valeur/ValeurListe';

function RenderActionListList({item}) {
        const dispatch = useDispatch();

        /**SUPPRESSION D'UN ACTEUR
         * @param {object}  liste 
         * @function
         **/
        const deleteListeConfirme = (liste) => {
                Swal.fire({
                title              : liste.name,
                text               : "Confirmez la suppression ?",
                icon               : "warning",
                iconColor          : "red",
                focusConfirm       : false,
                buttonsStyling     : true,
                customClass        : {
                        confirmButton      : "btn-success",
                        cancelButton       : "btn-secondary",
                },
                confirmButtonColor : '#d33',
                showCancelButton   : true,
                showCloseButton    : true,
                confirmButtonText  : "Supprimer",
                cancelButtonText   : "Annuler",
                }).then((result) => {
                if (result.isConfirmed) {
                        dispatch(deleteListe(liste.id));
                }
                });
        };
        return (
        <div className="btn-group" role="group" aria-label="Basic example">
                <ReactTooltip />
                <div onClick={(e) => {
                                e.preventDefault();
                                dispatch(setModalListe({ open: true, mode: "modification", size: "xl", title: item.STR_LSTDESCRIPTION, button: true, buttonName: "Modifier", inputstate: "", btnclass: "btn btn-primary" }));
                                dispatch(setformErreur([]))
                                dispatch(setCurrentListe({ LG_LSTID: item.LG_LSTID, STR_LSTOTHERVALUE2: "", STR_LSTOTHERVALUE1: "", STR_LSTOTHERVALUE: "", STR_LSTVALUE: "", STR_LSTDESCRIPTION: "", LG_TYLID: "", LG_SOCID: "", AGENCE: [{}] }));
                                dispatch(getDataListe(item.LG_LSTID));
                        }}  role="button">
                        <svg data-tip={"Modifier / Consulter " + item.STR_LSTDESCRIPTION} xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-primary feather feather-edit">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                </div>
                <div
                        onClick={(e) => {
                                e.preventDefault()
                                deleteListeConfirme({ id: item.LG_LSTID, name: item.STR_LSTDESCRIPTION });
                        }}
                        role="button">
                        <svg data-tip={"Supprimer " + item.STR_LSTDESCRIPTION} data-background-color="red"  xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-danger ml-4 feather feather-x-circle">
                                <circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} />
                        </svg>
                </div>
        </div>
        )
}

export default RenderActionListList