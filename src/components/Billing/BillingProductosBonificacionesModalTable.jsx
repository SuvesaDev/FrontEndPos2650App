import React, { useEffect, useState } from 'react';
import { usePagination, useTable } from "react-table";

import { useSelector, useDispatch } from 'react-redux';

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import {
    IsCorreoComprobanteEditBilling,
    SeletedCorreoComprobantesBilling,
    SetCantidadProductosBonificacionBilling,
    SetCorreoComprobanteActualBilling
} from '../../actions/billing';

export const BillingProductosBonificacionesModalTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { billings } = useSelector(state => state.billing);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 3 },
        },
        usePagination
    );

    const handleSelectedRow = async (cell) => {
        console.log(cell)
        // //Obtener el correo seleccionado
        // const { correoComprobante } = cell.row.values;

        // if (correoComprobante !== null) {
        //     dispatch(SeletedCorreoComprobantesBilling({ value: correoComprobante, number: numberScreen }));
        //     dispatch(SetCorreoComprobanteActualBilling({ value: correoComprobante, number: numberScreen }));
        //     dispatch(IsCorreoComprobanteEditBilling({ value: true, number: numberScreen }));
        // }
    }

    const handleChangeCantidad = async ({ target }, cell) => {
        
        //Obtener el correo seleccionado
        const { id } = cell.row.original;

        const payload = {
            id: id,
            cantidad: target.value
        };

        if (id !== null) {
            dispatch(SetCantidadProductosBonificacionBilling({ value: payload, number: numberScreen }));
        }

    }

    return (
        <>
            <div class="table-responsive-md tablaP">

                <table
                    {...getTableProps()}
                    className="table table-bordered table-hover text-lg-center"
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

                    <tbody className="table-white"
                        {...getTableBodyProps()}
                    >
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps({
                                                    // onClick: (cell.column.id === 'iconVer' || cell.column.id === 'iconAprobar')
                                                    //     ? () => handleSelectedRow(cell)
                                                    //     : () => {},
                                                    // onClick: () => handleSelectedRow(cell)
                                                })}

                                            >
                                                {
                                                    (cell.column.id === 'cantidad')
                                                        ? <input 
                                                            type="number" 
                                                            min="0" 
                                                            value={cell.value} 
                                                            onChange={(e) => handleChangeCantidad(e, cell)}
                                                        />
                                                        : cell.render("Cell")
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="d-flex justify-content-center align-items-center mt-3">

                    <button 
                        className='btn btn-primary me-3' 
                        onClick={() => gotoPage(0)} 
                        disabled={!canPreviousPage}
                    >
                        <FaArrowAltCircleLeft className="iconSizeBtn"/>
                    </button>
                    
                    <button 
                        onClick={() => previousPage()} 
                        disabled={!canPreviousPage}
                        className='btn btn-primary me-3' 
                    >
                        Anterior
                    </button>

                    <button 
                        onClick={() => nextPage()} 
                        disabled={!canNextPage}
                        className='btn btn-success me-3' 
                    >
                        Siguiente
                    </button>

                    <button 
                        onClick={() => gotoPage(pageCount - 1)} 
                        disabled={!canNextPage}
                        className='btn btn-success me-3' 
                    >
                        <FaArrowAltCircleRight className="iconSizeBtn"/>
                    </button>

                    <span>
                        Página{" "}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>
                    </span>
                </div>

            </div>
        </>
    )
}