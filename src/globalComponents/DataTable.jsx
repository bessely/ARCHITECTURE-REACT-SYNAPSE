import React from 'react';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function DataTable({children,column,data}) {
        return (
                <div className="table-responsive">
                        <table id="zero-config" className="table dt-table-hover table-striped table table-center mb-3" role="grid" style={{ width: '100%' }}>
                                {
                                        column.length>0 ?
                                                <thead>
                                                        <tr>{column.map((col,i)=>{return(<th key={"column_"+i} className={col.class}>{col.name}</th>)})}</tr>
                                                </thead>
                                        :
                                                null
                                }
                                <tbody>
                                {
                                        data?.length>0 ?
                                                data.map((item,index)=>{
                                                        return(
                                                                <tr className='text-center' key={"dataxxx" + index}>
                                                                {
                                                                        column.map((cell,x)=>{
                                                                                return(
                                                                                        cell?.data==="#" ?
                                                                                                <td>{index+1}</td>
                                                                                        :
                                                                                                <td>{item[cell?.data]}</td>
                                                                                )
                                                                        })
                                                                }
                                                                </tr>
                                                        )
                                                })
                                        :
                                                children
                                }
                                </tbody>
                        </table>
                </div>
        )
}

export default DataTable