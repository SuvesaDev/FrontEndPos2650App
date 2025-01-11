import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PurchaseReturnsDatosFactura } from './PurchaseReturnsDatosFactura';
import { PurchaseReturnsIcons } from './PurchaseReturnsIcons';
import { PurchaseReturnsTable } from './PurchaseReturnsTable';
import { FaHashtag } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';

export const PurchaseReturnsPage = () => {
    const dispatch = useDispatch();

    const { devolucion } = useSelector(state => state.purchaseReturns);

    const columns = [
        {
            Header: "Código",
            accessor: "CodArticulo",
        },
        {
            Header: "Descripcion",
            accessor: "Descripcion",
        },
        {
            Header: "Cantidad",
            accessor: "Cantidad",
        },
        {
            Header: "Costo",
            accessor: "Precio_Costo",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),

        },
        {
            Header: "Descuento %",
            accessor: "Descuento",
        },
        {
            Header: "Impuesto %",
            accessor: "Impuesto",
        },
        {
            Header: "Gravado",
            accessor: "SubtotalGravado",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),

        },
        {
            Header: "Exento",
            accessor: "SubTotalExcento",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),

        },
        {
            Header: "Subtotal",
            accessor: "SubTotal",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),

        },
    ];

    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <div className='row text-center'>
                            {/* <div className="col-md-2 mb-2">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaHashtag className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Número de Devolución"
                                    />
                                </div>
                            </div> */}

                            <div className="col-md-12 mb-2">
                                <h3>Devoluciones Compra</h3>
                            </div>

                            {/* <div className="col-md-2 mb-1">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaCalendar className="iconSize" />
                                    </span>
                                    <input
                                        type="date"
                                        className="form-control"
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <PurchaseReturnsDatosFactura />
                                <PurchaseReturnsTable columns={columns} data={devolucion.detalle} />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <PurchaseReturnsIcons />
                    </div>
                </div>
            </div>
            <br />

        </>

    )
}
