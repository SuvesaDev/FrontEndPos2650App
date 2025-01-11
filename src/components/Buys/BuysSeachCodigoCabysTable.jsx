import React from 'react';
import { useTable } from "react-table";
import { useDispatch } from 'react-redux';
import {
    CleanSearchCodigoCabysCompras,
    SetCabysDetalleActualCompras,
    SetIsOpenModalSearchCodigoCabysCompras
} from '../../actions/ComprasAction';
import { AiFillExclamationCircle } from 'react-icons/ai';
export const BuysSearchCodigoCabysTable = ({ columns, data }) => {

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

        //Obtener el id de presentacion seleccionado
        const { codigo } = cell.row.values;

        if (codigo !== null) {

            // Cargar el codigo
            dispatch(SetCabysDetalleActualCompras(codigo));

            // Limpiar el estado de busqueda y los resultados
            dispatch(CleanSearchCodigoCabysCompras());

            // Cerrar el modal
            dispatch(SetIsOpenModalSearchCodigoCabysCompras(false));

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

                <tbody className="table-secondary"
                    {...getTableBodyProps()}
                >
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length}>
                                <center>
                                    <div className="toast show">
                                        <div className={"card-header toast-warning"}>
                                            <strong className="me-auto">
                                                2650 Informa{" "}
                                                <AiFillExclamationCircle className="iconSize" />
                                            </strong>
                                        </div>
                                        <div className="toast-body">
                                            <p className="text-danger">
                                                No existen coincidencias con lo ingresado.
                                            </p>
                                        </div>
                                    </div>
                                </center>
                            </td>
                        </tr>
                    ) : (
                        rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps({
                                                onClick: () => handleSelectedRow(cell),
                                            })}
                                            data-bs-dismiss="modal"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>

        </div>
    )
}

