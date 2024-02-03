import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import DataTable from '../../../globalComponents/DataTable';
import Pagination, { PAGINATION } from "../../../globalComponents/Pagination";
import { formatLargeLabel } from '../../../services/globalFunction';
import { loadDataProfilList } from '../../../services/profil';
import { setPagination } from '../../../store/Profil/Profil';
import RenderActionProfil from './RenderActionProfil';

/**
 * LE COMPOSANT LISTE DES PROFILS
*/
function ListProfil() {
    const {profilList, pagination, status} = useSelector((state) => state.profils);
    const dispatch = useDispatch(); 

    /**pagination
     * @évènement onClick
     */
    const handlePageChange = ({ selected }) => {
        dispatch(setPagination({ ...pagination, currentPage: (selected), changePageClick: true }));
        dispatch(loadDataProfilList({ start: parseInt(selected) * parseInt(PAGINATION.listParPage), listParPage: PAGINATION.listParPage }));
    };

    return (
        <>
                <DataTable
                    footer        = {true}
                    dataTableName = "profilList"
                    data          = {profilList}
                    loader        = {status.profil}
                    column        = {
                        [
                            {name : '#'              ,class:"text-left"   ,dataKey:"#"                  ,dataKeyClass:'text-left'   },
                            {name : 'DESCRIPTION'    ,class:"text-left" ,dataKey:"STR_PRODESCRIPTION" ,dataKeyClass:'text-left',
                                action : (item)=>{
                                    return (
                                        item?.STR_PRODESCRIPTION?.length>150 ?
                                            <>
                                                <ReactTooltip />
                                                <div data-tip={item.STR_PRODESCRIPTION} > {formatLargeLabel(150,item.STR_PRODESCRIPTION)}</div>
                                            </>
                                        :
                                            item.STR_PRODESCRIPTION
                                    );
                                }
                            },
                            {name : 'LIBELLE' ,class:"text-center" ,dataKey:"STR_PRONAME" ,dataKeyClass:'text-left'  ,
                                action : (item)=>{
                                    return (
                                        item?.STR_PRONAME?.length>150 ?
                                            <>
                                                <ReactTooltip />
                                                <div data-tip={item.STR_PRONAME} > {formatLargeLabel(150,item.STR_PRONAME)}</div>
                                            </>
                                        :
                                            item.STR_PRONAME
                                    );
                                }
                            },
                            {name : 'ACTION'        ,class:"text-center",dataKey:"", 
                                action: (item,index)=>{
                                    return (<RenderActionProfil item={item} index={index} />);
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

export default ListProfil