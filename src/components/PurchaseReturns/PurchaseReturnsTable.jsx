import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from "react-table";
import { FaPercentage } from "react-icons/fa"
import { FaColonSign } from "react-icons/fa6"
export const PurchaseReturnsTable = ({ columns, data }) => {
    const dispatch = useDispatch();

    const { devolucion } = useSelector(state => state.purchaseReturns);

    const {
        Id_Factura_Compra,
        NumeroFactura,
        Proveedor,
        SaldoAnt_Fact,
        SubTotalGravado,
        SubTotalExcento,
        Descuento,
        Impuesto,
        Monto,
        Fecha,
        Cedula_Usuario,
        Cod_Moneda,
    } = devolucion.encabezado;

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
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td
                                                    // {...cell.getCellProps({
                                                    //     onClick: () => handleSelectedRow(cell),
                                                    // })}

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
                    <div className='row'>

                        <div className="col-md-2 mb-3">
                            <hr />
                            <h5 className='text-white'>Totales de Devolución</h5>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5 className="text-white">Sub. Gravado</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Sob-Total Gravado'
                                    disabled
                                    value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(SubTotalGravado)}

                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5 className="text-white">Sub. Exento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Sob-Total Exento'
                                    disabled
                                    value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(SubTotalExcento)}
                                />
                            </div>
                        </div>


                        <div className="col-md-2 mb-3">
                            <h5 className="text-white">Descuento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Descuento Final'
                                    value={Descuento}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5 className="text-white">Impuesto</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Impuesto Final'
                                    disabled
                                    value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Impuesto)}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5 className="text-white">Total</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Total Final'
                                    value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Monto)}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
