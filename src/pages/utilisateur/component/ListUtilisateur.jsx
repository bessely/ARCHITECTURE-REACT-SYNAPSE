import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../globalComponents/DataTable';
import Pagination, { PAGINATION } from '../../../globalComponents/Pagination';
import { loadDataAgenceList } from '../../../services/Agence';
import { loadDataUtilisateurList } from '../../../services/Utilisateur';
import { loadDataProfilList } from '../../../services/profil';
import { setPagination } from '../../../store/Utilisateurs/Utilisateur';
import ModalAssoProfil from '../../profil/component/ModalAssoProfil';
import CreatRowUtilisateur from './CreatRowUtilisateur';

function ListUtilisateur() {
    const { pagination, status, UtilisateurList } = useSelector((state) => state.utilisateurs);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadDataAgenceList({ start: 0, listParPage: 10000 }));
        dispatch(loadDataUtilisateurList({ start: 0, listParPage: PAGINATION.listParPage }));
        dispatch(loadDataProfilList({ search: "%", start: 0, length: 1000 }))
    }, [dispatch]);

    /**pagination
     * @évènement onClick
     */
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataUtilisateurList({ start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage }));
    };

    return (
        <>
            <DataTable
                column={
                    [
                        {name : '#'             ,class:"text-center",data:"#"                   },
                        {name : 'AGENCE'        ,class:"text-center",data:"LG_AGEID"            },
                        {name : 'NOM & PRENOMS' ,class:"text-center",data:"STR_UTIFIRSTLASTNAME"},
                        {name : 'EMAIL'         ,class:"text-center",data:"STR_UTIMAIL"         },
                        {name : 'TÉLÉPHONE'     ,class:"text-center",data:"STR_UTIPHONE"        },
                        {name : 'UID'           ,class:"text-center",data:"STR_UTILOGIN"        },
                        {name : 'ACTION'        ,class:"text-center",data:""                    },
                    ]
                }
                data={UtilisateurList}
            >
                <CreatRowUtilisateur />
            </DataTable>
            {/* la pagination */}
            <Pagination
                onClick   = {handlePageChange}
                nbrPage   = {pagination.nbrPage}
                forcePage = {pagination.currentPage}
            />
            {/* la pagination */}
            <ModalAssoProfil />
        </>
    )
}

export default ListUtilisateur