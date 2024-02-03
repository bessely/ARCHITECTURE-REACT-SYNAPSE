import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../globalComponents/DataTable';
import Pagination, { PAGINATION } from '../../../globalComponents/Pagination';
import { loadDataTypeListeList } from '../../../services/Valeur';
import { setPagination } from '../../../store/Valeur/Valeur';
import RenderActionTypeList from './RenderActionTypeList';

/**
 * LA LISTE DES TYPE LISTE (LA PREMIER LISTE VISIBLE SUR LA PAGE)
 */
function ListTypeListe() {
    const { TypeListeList, pagination, status } = useSelector((state) => state.typelistes);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadDataTypeListeList({ start: 0, listParPage: PAGINATION.listParPage }));
    }, [dispatch]);

    /**pagination
     * @évènement onClick
     */
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataTypeListeList({ start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage }));
    };

    return (
        <>
            <DataTable
                footer        = {true}
                dataTableName = "TypeListeList"
                data          = {TypeListeList}
                loader        = {status.typeliste}
                column        = {
                    [
                        {name : '#'             ,class:"text-left"   ,dataKey:"#"                  ,dataKeyClass:'text-left'   },
                        {name : 'DESCRIPTION'   ,class:"text-center" ,dataKey:"STR_TYLDESCRIPTION"  ,dataKeyClass:'text-center' },
                        {name : 'LIBELLÉ'       ,class:"text-center" ,dataKey:"STR_TYLNAME"         ,dataKeyClass:'text-center'} ,
                        {name : 'ACTION'        ,class:"text-center" ,dataKey:"", 
                            action: (item)=>{
                                return (<RenderActionTypeList item={item} />);
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
        </>
    )
}

export default ListTypeListe