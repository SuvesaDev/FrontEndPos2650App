import React from 'react';
import { useTable } from "react-table";
import { useSelector, useDispatch } from 'react-redux';

import { startSearchOneCompraPurchaseReturns } from '../../actions/purchaseReturnsAction';
import {
    SetIsEditCompras,
    SetopenSearchModal,
    SetValorFiltroSearchModalCompras,
    startSearchOneCompra
} from '../../actions/ComprasAction';
import { AiFillExclamationCircle } from 'react-icons/ai';

export const BuysSearchModalTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const { filterProveedorInventory } = useSelector(state => state.compras);
    const { isOpenSearchComprasPurchaseReturns } = useSelector(state => state.purchaseReturns);

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
        const { IdCompra } = cell.row.values;

        if (IdCompra !== null) {

            if (isOpenSearchComprasPurchaseReturns === false) {
                //si lo llamo desde compras

                dispatch(startSearchOneCompra(IdCompra, filterProveedorInventory));

                //Clean el state de busqueda de ubicaciones
                dispatch(SetValorFiltroSearchModalCompras(''));

                // Se activa el IsEditCompra
                dispatch(SetIsEditCompras(true));

                //Cerrar el modal
                dispatch(SetopenSearchModal(false));

            }

            if (isOpenSearchComprasPurchaseReturns === true) {
                //si lo llamo desde devoluciones de compras

                //Aqui codigo para devoluciones de compras
                dispatch(startSearchOneCompraPurchaseReturns(IdCompra));
                dispatch(SetopenSearchModal(false));
            }
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
                                <th {...column.getHeaderProps()}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className="table-secondary" {...getTableBodyProps()}>
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
