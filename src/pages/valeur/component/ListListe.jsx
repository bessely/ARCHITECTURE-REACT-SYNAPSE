import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../globalComponents/DataTable';
import Pagination, { PAGINATION } from '../../../globalComponents/Pagination';
import { loadDataListe } from '../../../services/ValeurListe';
import { setPagination } from '../../../store/Valeur/ValeurListe';
import RenderActionListList from './RenderActionListList';

/**
 * 
 * @returns LA MODAL DES LISTES D'UNE TYPE LISTE
 */
function ListeListe() {
    const { ListListe, pagination, status } = useSelector((state) => state.listes);
    const { modalTypeListe, currentTypeListe } = useSelector((state) => state.typelistes);
    const dispatch = useDispatch();
    useEffect(() => {
        //alert(currentTypeListe.LG_TYLID)
        dispatch(loadDataListe({ start: 0, listParPage: PAGINATION.listParPage, id: currentTypeListe.LG_TYLID }));
    }, [dispatch, currentTypeListe.LG_TYLID]);

    /**pagination
     * @évènement onClick
     **/
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataListe({ start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage, id: currentTypeListe.LG_TYLID }));
    };


    return (
        <div className={modalTypeListe.mode === "modification" ? "table-responsive" : "table-responsive  d-none"} >
            <DataTable
                footer        = {true}
                dataTableName = "ListListe"
                data          = {ListListe}
                loader        = {status.liste}
                column        = {
                    [
                        {name : '#'             ,class:"text-left"   ,dataKey:"#"                  ,dataKeyClass:'text-left'   },
                        {name : 'DESCRIPTION'   ,class:"text-center" ,dataKey:"STR_LSTDESCRIPTION"  ,dataKeyClass:'text-center' },
                        {name : 'VALEUR'       ,class:"text-center" ,dataKey:"STR_LSTVALUE"         ,dataKeyClass:'text-center'} ,
                        {name : 'ACTION'        ,class:"text-center" ,dataKey:"", 
                            action: (item)=>{
                                return (<RenderActionListList item={item} />);
                            }, 
                            dataKeyClass:'text-center'
                        }
                    ]
                }
            />
            {/* la pagination */}
            <Pagination
                onClick   = {handlePageChange}
                nbrPage   = {pagination.nbrPage}
                forcePage = {pagination.currentPage}
            />
            {/* la pagination */}
        </div>
    )
}

export default ListeListe