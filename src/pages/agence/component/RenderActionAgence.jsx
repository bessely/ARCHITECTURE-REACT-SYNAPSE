import React from 'react';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';
import { deleteAgence, getDataAgence } from '../../../services/Agence';
import { setCurrentAgence, setModalAgence, setformErreur } from '../../../store/Agences/Agence';

function RenderActionAgence({item}) {
        const dispatch = useDispatch(); 
        /**CONFIRMATION DE SUPPRESSION D'UNE AGENCE
         * @param {object}  agence 
         * @function
         */
        const deleteAgenceConfirme = (agence) => {
                Swal.fire({
                title          : agence.name,
                text           : "Confirmez la suppression ?",
                icon           : "warning",
                iconColor      : "red",
                focusConfirm   : false,
                buttonsStyling : true,
                customClass    :
                {
                        confirmButton : "btn-success",
                        cancelButton  : "btn-secondary",
                },
                confirmButtonColor : '#d33',
                showCancelButton   : true,
                showCloseButton    : true,
                confirmButtonText  : "Supprimer",
                cancelButtonText   : "Annuler",
                }).then((result) => {
                if (result.isConfirmed) {
                        dispatch(deleteAgence(agence.id));
                }
                });
        };
        return (
        <div className="btn-group" role="group" aria-label="Basic example">
                <ReactTooltip />
                <div onClick={(e) => {
                        e.preventDefault();
                        dispatch(setModalAgence({ open: true, mode:"modification", size: "xl", title: item.STR_AGEDESCRIPTION, button:true,  buttonName:"Modifier", inputstate: "", btnclass: "btn btn-primary" }));
                        dispatch(setformErreur([]))
                        dispatch(setCurrentAgence([ {LG_AGEID:item.LG_AGEID, STR_AGECODE:"", STR_AGECODEBCEAO:"", STR_AGEDESCRIPTION: "", STR_AGELOCALISATION:"", STR_AGEBP: "", STR_AGEMAIL:"", STR_AGEPHONE:"", STR_VILLE:"", STR_AGELONGITUDE:"", STR_AGELATITUDE:""} ]));
                        dispatch(getDataAgence(item.LG_AGEID));
                }} role="button">
                        <svg data-tip={"Modifier / Consulter "+item.STR_AGEDESCRIPTION} xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-primary feather feather-edit">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                </div>
                <div 
                        onClick={(e) => {
                                e.preventDefault()
                                deleteAgenceConfirme({id: item.LG_AGEID, name: item.STR_AGEDESCRIPTION});
                        }}
                        role="button">
                        <svg data-tip={"Supprimer "+item.STR_AGEDESCRIPTION} data-background-color="red" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-danger ml-4 feather feather-x-circle">
                                <circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} />
                        </svg>
                </div>
        </div>
        )
}

export default RenderActionAgence