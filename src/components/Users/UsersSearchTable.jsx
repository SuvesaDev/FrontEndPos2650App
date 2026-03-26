import React, { useRef } from 'react';

import { useTable } from "react-table";
import { useSelector, useDispatch } from 'react-redux';

import { 
    CleanSearchOptionsUsers, 
    SetIsOpenModalSearchUsers, 
    startGetOneUsers 
} from '../../actions/UsersAction';

export const UsersSearchTable = ({ columns, data }) => {

    const dispatch = useDispatch();
    const { perfiles } = useSelector(state => state.users);
    const btnRef = useRef(null);

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
            dispatch( startGetOneUsers( idUsuario, perfiles ) );

            //Cerrar el modal
            dispatch( SetIsOpenModalSearchUsers( false ) );
        
            //Clean el state de busqueda de users
            dispatch( CleanSearchOptionsUsers() );

            btnRef.current.click();

        }

    }

    return (
    	<div className="table-responsive-md tablaP">
            
            <div className="btn-group mb-2 d-none">
                <button
                    ref={btnRef}
                    type="button"
                    className="d-none"
                    data-bs-dismiss="modal"
                ></button>
            </div>

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
