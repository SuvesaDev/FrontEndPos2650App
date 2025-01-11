import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from "react-table";
import { SetopenSearchModalRepayment, SetValorFiltroSearchModalRepayment, startSearchOneRepayment } from '../../actions/repaymentAction';

export const RepaymentSearchModalTable = ({ columns, data }) => {

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

        // //Obtener el id de presentacion seleccionado
        const { Id } = cell.row.values;

        if (Id !== null) {

            dispatch(startSearchOneRepayment(Id));

            //Clean el state de busqueda de ubicaciones
            dispatch(SetValorFiltroSearchModalRepayment(''));

            //Set default filter
            //dispatch( SetDefaultProveedorFilterCompras( proveedoresInventory ) )

            //Cerrar el modal
            dispatch(SetopenSearchModalRepayment(false));
        }

    }

    return (
        <div className="table-responsive-md tablaP">
            <table
                {...getTableProps()}
                className="table table-dark table-hover table-bordered text-md-center"
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
