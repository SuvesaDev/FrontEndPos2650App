import { FaCoins, FaDollarSign, FaHashtag, FaMoneyBill } from "react-icons/fa"
import { FaCirclePlus, FaColonSign } from "react-icons/fa6"
import { TbEditCircle, TbNumber } from "react-icons/tb"
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { SetAbonoDetallePays, SetAllAbonosPays, SetCleanAbonoActualPays, SetIsNewAbonoPays, SetSaldoActualAbonoDetallePays, SetTotalMontoRecibidoPays, SetTotalSaldoActualPays } from "../../../actions/pays";

export const PaysBodyDetalleFactura = () => {

    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.tabs);

    const {
        moneda,
        abonoActual,
        disableInputsAbonoActual,
        abonos,
        isNewAbono,
        codigoProveedor, cedulaProveedor, nombreProveedor, fecha,
        totalMontoRecibido,
        totalSaldoActual,
    } = useSelector(state => state.pays);
    const { auth, idSurcursal } = useSelector(state => state.login);

    const { saldoActual, montoAbono, saldoAnt, abono, factura, idCompra, montoFactura, fechaFactura,
    } = abonoActual
    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;


    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };


    const validateCurrency = (value) => {
        if (moneda == 1) {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        } else if (moneda == 2) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        } else {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        }
    }

    const handleClickAddAbono = (e) => {
        if (abono > saldoActual) {
            Swal.fire("Advertencia!", "El monto del abono no puede ser superior al saldo actual de la factura.", 'warning')
        } else {
            if (abono !== "" && abono !== 0) {
                const abonoExistente = abonos.find(detalle => detalle.factura === factura);
                if (abonoExistente) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Ya existe un abono para esta factura, si desea editarlo solamente de click en la tabla seleccionando el abono.',
                    });
                } else {

                    const totalSaldoActualFactura = parseFloat(saldoActual) - parseFloat(abono);
                    const totalSaldoActualGeneral = parseFloat(totalSaldoActual) - parseFloat(abono);
                    const totalMontoRecibidoGeneral = parseFloat(abono) + parseFloat(totalMontoRecibido);
                    const AbonoConCalculos = {
                        factura: factura,
                        codProveedor: codigoProveedor,
                        montoFactura: montoFactura,
                        saldoAnt: saldoAnt,
                        abono: parseFloat(abono),
                        abonoSuMoneda: 0,
                        saldoActual: totalSaldoActualFactura,
                        idCompra: idCompra,
                        fechaFactura: fechaFactura,
                    }
                    dispatch(SetTotalMontoRecibidoPays(totalMontoRecibidoGeneral))
                    dispatch(SetTotalSaldoActualPays(Math.abs(totalSaldoActualGeneral)))
                    dispatch(SetAllAbonosPays([...abonos, AbonoConCalculos]));
                    dispatch(SetCleanAbonoActualPays());
                }
            } else {
                Swal.fire("Error!", "El monto del abono no puede estar vacío.", 'error')
            }
        }

    }

    const handleClickEditAbono = (e) => {
        if (abono > saldoActual) {
            Swal.fire("Advertencia!", "El monto del abono no puede ser superior al saldo actual de la factura.", 'warning')
        } else {
            if (abono !== "" && abono !== 0) {
                const nuevoAbonos = abonos.map(detalle => {
                    if (detalle.factura === factura) {
                        const abonoNeutro = parseFloat(detalle.abono) - parseFloat(abono);
                        const totalSaldoActualFactura = parseFloat(detalle.saldoAnt) - parseFloat(abono);
                        const totalSaldoActualGeneral = parseFloat(totalSaldoActual) + parseFloat(abonoNeutro);
                        const totalMontoRecibidoGeneral = parseFloat(totalMontoRecibido) - parseFloat(abonoNeutro);
                        detalle.codProveedor = codigoProveedor;
                        detalle.montoFactura = montoFactura;
                        detalle.saldoAnt = saldoAnt;
                        detalle.abono = abono;
                        detalle.abonoSuMoneda = 0;
                        detalle.saldoActual = totalSaldoActualFactura;
                        detalle.idCompra = idCompra;
                        detalle.fechaFactura = fechaFactura;
                        dispatch(SetTotalMontoRecibidoPays(totalMontoRecibidoGeneral))
                        dispatch(SetTotalSaldoActualPays(totalSaldoActualGeneral))
                    }
                    return detalle;
                });
                dispatch(SetAllAbonosPays(nuevoAbonos));
                dispatch(SetIsNewAbonoPays(true))
                dispatch(SetCleanAbonoActualPays())
            } else {
                Swal.fire("Error!", "El monto del abono no puede estar vacío.", 'error')
            }
        }
    }


    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-2">
                    <h5>Factura</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNumber className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={factura}
                            placeholder='Número de Factura'
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-2">
                    <h5>Monto Factura</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            {
                                moneda == 1 ?
                                    <FaColonSign className="iconSize" />
                                    : moneda == 2 ?
                                        <FaDollarSign className="iconSize" />
                                        :
                                        <FaColonSign className="iconSize" />
                            }
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={montoFactura ? validateCurrency(montoFactura) : validateCurrency(0)}
                            placeholder='Monto de la Factura'
                        />
                    </div>
                </div>

                <div className="col-md-5 mb-2">
                    <h5>Abono</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMoneyBill className="iconSize" />
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            placeholder='Total de Abono'
                            value={abono}
                            onChange={(e) => handleInputChangeWithDispatch(e, SetAbonoDetallePays)}
                            disabled={disableInputsAbonoActual}
                        />
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            placeholder='Total del Abono'
                            value={abono ? validateCurrency(abono) : validateCurrency(0)}
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">

                <div className="col-md-4 mb-2">
                    <h5>Saldo Anterior</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            {
                                moneda == 1 ?
                                    <FaColonSign className="iconSize" />
                                    : moneda == 2 ?
                                        <FaDollarSign className="iconSize" />
                                        :
                                        <FaColonSign className="iconSize" />
                            }
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            placeholder='Total de Saldo Anterior'
                            value={saldoAnt ? validateCurrency(saldoAnt) : validateCurrency(0)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-2">
                    <h5>Saldo Actual</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            {
                                moneda == 1 ?
                                    <FaColonSign className="iconSize" />
                                    : moneda == 2 ?
                                        <FaDollarSign className="iconSize" />
                                        :
                                        <FaColonSign className="iconSize" />
                            }
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            placeholder='Total de Saldo Actual'
                            value={saldoActual ? validateCurrency(saldoActual) : validateCurrency(0)}
                        />
                    </div>
                </div>
                <div className="col-md-4 mb-2">
                    <hr />
                    {
                        isNewAbono ? (
                            <>
                                <button className="btn btn-success" onClick={handleClickAddAbono} disabled={disableInputsAbonoActual}>Agregar <FaCirclePlus className="iconSize" /></button>
                            </>
                        ) :
                            <>
                                <button className="btn btn-warning" onClick={handleClickEditAbono} disabled={disableInputsAbonoActual}>Editar <TbEditCircle className="iconSize" /></button>
                            </>
                    }
                </div>
            </div>
        </>

    )
}
