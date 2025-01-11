import React from 'react';

import { useTable } from "react-table";
import { useSelector, useDispatch } from 'react-redux';

import { 
    CleanSearchOptionsUsers, 
    SetIsOpenModalSearchUsers, 
    startGetOneUsers 
} from '../../actions/UsersAction';

export const UsersSearchTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
    } = useTable({
        columns,
        data,
    });

    const handleSelectedRow = async (cell) => {
        
        //Obtener el id de Usuario seleccionado
        const { idUsuario } = cell.row.values;

        if( idUsuario !== null ) {
            
            // Se obtiene ese usuario
            dispatch( startGetOneUsers( idUsuario ) );

            //Cerrar el modal
            dispatch( SetIsOpenModalSearchUsers( false ) );
        
            //Clean el state de busqueda de users
            dispatch( CleanSearchOptionsUsers() );

        }

    }

    return (
    	<div className="table-responsive-md tablaP">
            
            <table className="table table-dark table-hover table-bordered text-md-center"
                {...getTableProps()}
            >
               	<thead className="table-dark">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th 
                                    {...column.getHeaderProps()}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody
                    className='table-secondary'
                    {...getTableBodyProps()}
                >
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps({
                                                onClick: () => handleSelectedRow(cell)
                                            })}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}
