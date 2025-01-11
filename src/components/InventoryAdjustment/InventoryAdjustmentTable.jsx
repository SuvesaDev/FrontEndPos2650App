import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from "react-table";
import { startDeleteDetalleActualInventoryAdjustment } from '../../actions/InventoryAdjustmentAction';
import { FaPercentage } from "react-icons/fa"
import { FaColonSign } from "react-icons/fa6"

export const InventoryAdjustmentTable = ({ columns, data }) => {
    const dispatch = useDispatch();

    const { ajuste } = useSelector(state => state.InventoryAdjustment);

    const { detalle } = ajuste;

    const {
        TotalEntrada,
        TotalSalida,
        SaldoAjuste
    } = ajuste.encabezado;

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

    const handleDeleteRow = (cell) => {
        //Obtener el CodArticulo de articulo seleccionado
        const { CodArticulo } = cell.row.values;

        console.log(cell.row.value);

        if (CodArticulo !== null) {
            dispatch(startDeleteDetalleActualInventoryAdjustment(detalle[cell.row.id]));
        }
    }

    const handleSelectedRow = (cell) => {

    }

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div className="table-responsive-md tablaP">
                        <table
                            {...getTableProps()}
                            className="table table-dark table-hover table-bordered text-md-center">
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
                                className="table-secondary"
                                {...getTableBodyProps()}
                            >
                                {rows.map((row, i) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()} >
                                            {row.cells.map(cell => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps({
                                                            onClick: (cell.column.id === 'icon')
                                                                ? () => handleDeleteRow(cell)
                                                                : () => handleSelectedRow(cell),
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
                </div>


                <div className="card-footer bg-primary">
                    <div className='row text-md-center'>
                        <div className="col-md-3 mb-3"></div>

                        <div className="col-md-2 mb-3">
                            <h5 className="text-white">Total Entrada</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={TotalEntrada}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5 className="text-white">Total Salida</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={TotalSalida}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5 className="text-white">Total Ajuste</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={SaldoAjuste}

                                />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3"></div>
                    </div>
                </div>
            </div>
        </>

    )
}
