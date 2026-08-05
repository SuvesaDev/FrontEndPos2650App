import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from "react-table";

import { useSelector, useDispatch } from 'react-redux';

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { SetCurrentConfiguracionBonificacionBilling, SetDisabledTableBonificacionBilling } from '../../actions/billing';

export const BillingTiposBonificacionesModalTable = ({ columns, data }) => {

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
        page, // en vez de rows usamos "page"
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
        
        //Obtener el correo seleccionado
        const { idConfiguracionBonificacion } = cell.row.original;

        if (idConfiguracionBonificacion !== null) {
            dispatch(SetCurrentConfiguracionBonificacionBilling({ value: cell.row.original, number: numberScreen }));
            dispatch(SetDisabledTableBonificacionBilling({ value: false, number: numberScreen }));
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
                                                    onClick: () => handleSelectedRow(cell)
                                                })}

                                            >
                                                {
                                                    (cell.column.id === 'iconVer')
                                                        ? (usuarioAceptaConsignacion) 
                                                            ? cell.render("Cell")
                                                            : null
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