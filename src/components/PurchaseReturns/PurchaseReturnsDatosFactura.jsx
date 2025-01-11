import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetopenSearchModal } from '../../actions/ComprasAction';
import { SetDescuentoPurchaseReturns, SetImpuestoPurchaseReturns, SetIsOpenSearchComprasPurchaseReturns, SetMontoPurchaseReturns, SetSubTotalExcentoPurchaseReturns, SetSubTotalGravadoPurchaseReturns, startAddDetalleActualPurchaseReturns } from '../../actions/purchaseReturnsAction';
import { PurchaseReturnsDatosFacturaTable } from "./PurchaseReturnsDatosFacturaTable"
import { FaBoxesPacking, FaBuildingUn, FaColonSign, FaListCheck, FaMagnifyingGlass } from 'react-icons/fa6';
import { FaCalendar, FaCoins, FaExchangeAlt, FaHashtag, FaHornbill, FaPercentage } from 'react-icons/fa';
import { TbNumber } from 'react-icons/tb';
import { BsSortNumericDownAlt } from 'react-icons/bs';
import { months } from 'moment';

export const PurchaseReturnsDatosFactura = () => {
    const dispatch = useDispatch();

    const { devolucion, detalleArticuloActual } = useSelector(state => state.purchaseReturns);

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

    const { detalle } = devolucion;

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
        }
    ];

    const handleClickDownCantidad = (e) => {
        //   e.preventDefault();
        if (e.key === 'Enter') {
            dispatch(startAddDetalleActualPurchaseReturns(detalleArticuloActual))
        }
    }
    //calculos de totales generales
    useEffect(() => {
        let SubTotalGeneral = 0;
        let SubTotalExcentoGeneral = 0;
        let SubTotalGravadoGeneral = 0;
        let MontoDescuentoGeneral = 0;
        let MontoImpuestoGeneral = 0;
        if (detalle.length !== 0) {
            let index = 0;
            detalle.forEach(linea => {
                SubTotalGeneral = SubTotalGeneral + linea.SubTotal;
                SubTotalExcentoGeneral = SubTotalExcentoGeneral + linea.SubTotalExcento;
                SubTotalGravadoGeneral = SubTotalGravadoGeneral + linea.SubtotalGravado;
                MontoDescuentoGeneral = MontoDescuentoGeneral + linea.Monto_Descuento;
                MontoImpuestoGeneral = MontoImpuestoGeneral + linea.Monto_Impuesto;
                index = index + 1;
            });
        }
        dispatch(SetSubTotalGravadoPurchaseReturns(SubTotalGravadoGeneral));
        dispatch(SetSubTotalExcentoPurchaseReturns(SubTotalExcentoGeneral));
        dispatch(SetDescuentoPurchaseReturns(MontoDescuentoGeneral));
        dispatch(SetImpuestoPurchaseReturns(MontoImpuestoGeneral));
        dispatch(SetMontoPurchaseReturns(SubTotalGeneral - MontoDescuentoGeneral + MontoImpuestoGeneral));
    }, [detalle]);

    const handleOpenBuscarCompra = () => {
        dispatch(SetIsOpenSearchComprasPurchaseReturns(true));
        dispatch(SetopenSearchModal(true));

    }


    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos de la Factura</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {/* <div className="col-md-3 mb-3">
                                    <h5>Tipo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaListCheck className="iconSize" />
                                        </span>
                                        <select name='cboTipoFacturaPR' className='form-select'>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                        </select>
                                    </div>
                                </div> */}

                                <div className="col-md-4 mb-3">
                                    <h5>Número Factura</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNumber className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            placeholder="Número de Factura"
                                            type='text'
                                            name='NumeroFactura'
                                            value={NumeroFactura}
                                        />
                                        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#modalBuscaFactCompra" onClick={handleOpenBuscarCompra} >
                                            Buscar <FaMagnifyingGlass className='iconSize' />
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Proveedor</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBuildingUn className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            placeholder="Nombre del Proveedor"
                                            type='text'
                                            disabled
                                            value={Proveedor}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Monto Factura</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            placeholder="Monto de la Factura"
                                            type='text'
                                            disabled
                                            value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Monto)}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-3 mb-3"></div>
                                <div className="col-md-3 mb-3">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={Fecha}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Tipo Moneda</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCoins className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                        >
                                            <option value='COLON'>COLON</option>
                                            <option value='DOLAR'>DOLAR</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos de los Artículos Facturados</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <PurchaseReturnsDatosFacturaTable columns={columns} data={devolucion.articulos} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <h5>Código</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FaHashtag className="iconSize" />
                                                </span>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Código del Artículo'
                                                    value={detalleArticuloActual.CodArticulo}
                                                    disabled
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <h5>Precio Costo</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FaColonSign className="iconSize" />
                                                </span>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    disabled
                                                    value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(detalleArticuloActual.Precio_Costo)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <h5>Descuento</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FaPercentage className="iconSize" />
                                                </span>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={detalleArticuloActual.Descuento}
                                                    readOnly
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <h5>Lote</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FaBoxesPacking className="iconSize" />
                                                </span>
                                                <input
                                                    type='number'
                                                    className='form-control'
                                                    placeholder='0'
                                                    value={detalleArticuloActual.Lote}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <h5>Cantidad Original</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <BsSortNumericDownAlt className="iconSize" />
                                                </span>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={detalleArticuloActual.Cantidad}
                                                    readOnly
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <h5>Devoluciones</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FaExchangeAlt className="iconSize" />
                                                </span>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={detalleArticuloActual.Cantidad}
                                                    disabled
                                                    onKeyDown={handleClickDownCantidad}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
