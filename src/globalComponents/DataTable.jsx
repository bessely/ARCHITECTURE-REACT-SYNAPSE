import React from 'react';
import { BASEROOT } from '../services/serveur';

/**
 * DATATABLE 
 * @param {string} children  jsx
 * @param {array} column Structuration des données [{name:'Nom de la colonne',class:'la claass css de l'entête',dataKey:'la clé correspondante dans data', dataKeyClass:"class css de la cellule" action:'function}]
 * @param {boolean} footer pour duppliquer lentete en dessous du tableau
 * @param {array} data la listes à afficher
 * @param {string} dataTableName le nom du tableau  je m'en sert pour le reférencement du tableau sur le react dom
 * @returns jsx
 * @bessely
 */
function DataTable({children,column,footer=false,data,dataTableName,loader}) {
        const showEmptyTemplate = ()=>{
                return(
                        <tr>
                                <td colSpan={column.length} className="text-center text-20">
                                        <span className="text-center mx-auto">
                                                <img src={BASEROOT+"assets/img/empty-animate.svg"} className="m-0 p-0" height="220" alt="loader" />
                                                <small className="text-danger text-10 d-block text-wrap m-0 p-0">Aucun enregistrement trouvé !!!</small>
                                        </span>
                                </td>
                        </tr>
                )
        }
        return (
                <div className="table-responsive">
                        <table id={"zero-config"+dataTableName} className="table dt-table-hover table-striped table table-center mb-3" role="grid" style={{ width: '100%' }}>
                                {
                                        column.length>0 &&
                                                <thead>
                                                        <tr>{column.map((col,i)=>{return(<th key={"column_"+i} className={col.class}><u>{col.name}</u></th>)})}</tr>
                                                </thead>
                                }
                                <tbody>
                                {
                                        loader==="loading" ?
                                                <tr ><td colSpan={column.length} className="text-center text-20"> <img src={BASEROOT+"assets/img/preloader.svg"} height="200" alt="loader" /> </td></tr>  
                                        :
                                                data?.length>0 ?
                                                        data.map((item,index)=>{
                                                                return(
                                                                        <tr  key={dataTableName + index}>
                                                                        {
                                                                                column.map((cell,x)=>{
                                                                                        return(
                                                                                                cell?.dataKey==="#" ?
                                                                                                        <td className={cell?.dataKeyClass}>{index+1}</td>
                                                                                                :
                                                                                                        typeof(cell?.action) === "function" ?
                                                                                                                <td className={cell?.dataKeyClass}>{cell?.action(item)}</td>
                                                                                                        :
                                                                                                                <td className={cell?.dataKeyClass}>{item[cell?.dataKey]}</td>
                                                                                        )
                                                                                })
                                                                        }
                                                                        </tr>
                                                                )
                                                        })
                                                :
                                                        children===undefined || children==="" ? showEmptyTemplate() : children
                                }
                                </tbody>
                                {
                                        footer &&
                                                column.length>0 &&
                                                <tfoot className='bg-light rounded shadow-sm text-black text-decoration p-0'>
                                                        <tr>{column.map((col,i)=>{return(<th key={"footer_"+i} className={col.class}><u>{col.name}</u></th>)})}</tr>
                                                </tfoot>
                                }
                        </table>
                </div>
        )
}

export default DataTable