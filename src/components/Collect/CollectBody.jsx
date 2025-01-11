import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { TbNumber } from "react-icons/tb"
import { FaSearch } from 'react-icons/fa';
import { FaCircleExclamation, FaColonSign, FaDollarSign } from "react-icons/fa6"
import {
    FaCalendar,
    FaCoins,
    FaHashtag,
    FaUser,
    FaMoneyBill,
    FaPlus
} from "react-icons/fa"

import {
    CleanFacturaActualCollect,
    SetAbonoAbonoCollect,
    SetAbonoFacturaActualCollect,
    SetAllCustomersFacturasCollect,
    SetCedulaCustomerAbonoCollect,
    SetCustomerResulCollect,
    SetDisableBtnAddCollect,
    SetFechaFacturaAbonoCollect,
    SetInteresesAbonoCollect,
    SetInteresesFacturaActualCollect,
    SetMonedaAbonoCollect,
    SetMontoFacturaAbonoCollect,
    SetNewAbonoCollect,
    SetNombreCustomerAbonoCollect,
    SetNumeroFacturaAbonoCollect,
    SetSaldoActualAbonoCollect,
    SetSaldoActualFacturaActualCollect,
    SetSaldoAnteriorAbonoCollect,
    SetSaldoPrevioFacturaActualCollect,
    SetTotalMontoRecibidoAbonoCollect,
    SetTotalSaldoActualAbonoCollect,
    SetTotalSaldoAnteriorAbonoCollect,
    startAllCustomersFacturasCollect,
    startSearchOneCustomerCollect
} from "../../actions/CollectAction";

import { CollectFacturasPendienteTable } from "./CollectFacturasPendienteTable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoAddCircle } from "react-icons/io5";

export const CollectBody = () => {

    const dispatch = useDispatch();

    const { monedasInventory } = useSelector(state => state.monedas);

    const {
        disableInputs,
        abono,
        facturasPendiente,
        facturaActual,
        disableBtnAddCollect
    } = useSelector(state => state.collect);

    const {
        cedulaCliente,
        nombreCliente,
        moneda
    } = abono;

    const {
        numero,
        fecha,
        monto,
        intereses,
        saldoPrevio,
        saldoActual,
        montoTotal,
        factura
    } = facturaActual;

    const columns = [
        {
            Header: "Número Factura",
            accessor: "idFactura",
        },
        {
            Header: "Fecha",
            accessor: "fecha",
            Cell: ({ value }) => {
                const formattedDate = new Date(value).toLocaleString().replace(',', '');
                return formattedDate;
            },
        }
    ];

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

    const handleOnKeyDownCustomer = async (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (cedulaCliente == '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba una cedula valida.'
                });

                return;
            }
            dispatch(SetNombreCustomerAbonoCollect(''));
            dispatch(startSearchOneCustomerCollect(cedulaCliente));
        }

    }

    const handleChangeIntereses = (e) => {

        e.preventDefault();

        if (e.target.value === '') {
            dispatch(SetInteresesFacturaActualCollect(0));
            return;
        }

        const intereses = parseFloat(e.target.value);
        const saldoPrevio = parseFloat(monto) + intereses;

        // Se actualizan los intereses
        dispatch(SetInteresesFacturaActualCollect(intereses));

        // Se actualizan el Saldos Previo 
        dispatch(SetSaldoPrevioFacturaActualCollect(saldoPrevio));

        // Se actualizan el Abono 
        dispatch(SetAbonoFacturaActualCollect(saldoPrevio));

        // Se actualizan el Saldo Actual 
        dispatch(SetSaldoActualFacturaActualCollect(0));

    }

    const handleChangeAbono = (e) => {

        e.preventDefault();
        const abono = parseFloat(e.target.value);
        const saldoPrevio = parseFloat(monto) + intereses;

        // Se actualizan el Abono 
        dispatch(SetAbonoFacturaActualCollect(abono));

        // Se actualizan el Saldo Actual 
        dispatch(SetSaldoActualFacturaActualCollect(saldoPrevio - abono));

    }

    const handleOnKeyDownAddCollect = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCollect();
        }
    }

    const handleAddCollect = async (e) => {
        if (!disableBtnAddCollect) {
            e.preventDefault();
            addCollect();
        }
    }

    const addCollect = () => {

        if (facturaActual.abono !== 0 && numero != "") {
            // Se obtiene el nuevo objeto
            const newCollect = {
                idFactura: factura,
                fecha: fecha,
                monto: monto,
                saldo_Ant: saldoPrevio,
                intereses: intereses,
                abono: facturaActual.abono,
                saldo: saldoActual,
                tipo: '1',
                abono_SuMoneda: 1,
            }
            
            // Se agrega en el estado
            dispatch(SetNumeroFacturaAbonoCollect(newCollect.idFactura));
            dispatch(SetFechaFacturaAbonoCollect(newCollect.fecha));
            dispatch(SetMontoFacturaAbonoCollect(newCollect.monto));
            dispatch(SetSaldoAnteriorAbonoCollect(newCollect.saldo_Ant));
            dispatch(SetInteresesAbonoCollect(newCollect.intereses));
            dispatch(SetAbonoAbonoCollect(newCollect.abono));
            dispatch(SetSaldoActualAbonoCollect(newCollect.saldo));

            // Se agrega en la tabla
            dispatch(SetNewAbonoCollect(newCollect));

            // Se limpia la factura actual
            dispatch(CleanFacturaActualCollect());
            dispatch(SetDisableBtnAddCollect(true));

            // Se agregan los totales
            dispatch(SetTotalSaldoAnteriorAbonoCollect(saldoPrevio));
            dispatch(SetTotalMontoRecibidoAbonoCollect(newCollect.abono));
            dispatch(SetTotalSaldoActualAbonoCollect(parseFloat(montoTotal) - parseFloat(newCollect.abono)));
        } else {
            Swal.fire("Error!", "Debe ingresar un monto de Abono válido.", "error")
        }
    }

    const msgInfoBilling = (
        <Tooltip>
            <>
                Puedes Agregar  {" "}
                el producto con Enter en el campo de Cantidad o el botón de  {" "}
                Agregar <IoAddCircle className="iconSize" />
            </>
        </Tooltip>
    );


    const handleGetFacturasCredito = (e) => {
        dispatch(startAllCustomersFacturasCollect());
    }

    return (
        <>
            <div className="row mb-2 text-center">

                <div className="col-md-8 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos del Cliente</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-md-3 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Código del Cliente"
                                            disabled={disableInputs}
                                            value={cedulaCliente}
                                            onKeyDown={handleOnKeyDownCustomer}
                                            onChange={e => handleInputChangeWithDispatch(e, SetCedulaCustomerAbonoCollect)}
                                        />
                                        <button
                                            type="button"
                                            className={
                                                (disableInputs)
                                                    ? 'btn btn-primary disabled'
                                                    : 'btn btn-primary'
                                            }
                                            onClick={handleGetFacturasCredito}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalBuscarClientesD"
                                        >
                                            <FaSearch className="iconSize" />
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-9 mb-3">
                                    <h5>Nombre</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del Cliente"
                                            disabled={true}
                                            value={nombreCliente}
                                        />
                                    </div>
                                </div>

                                {/* <div className="col-md-3 mb-3">
                                    <br />
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkordenCompraCustomersB"
                                            name="ordenCompra"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkordenCompraCustomersB">Filtrar Incobrables</h5>
                                    </div>
                                    <hr />
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos Generales</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-md-6 mb-3">
                                    <h5>Moneda</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCoins className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                            disabled={disableInputs}
                                            value={moneda}
                                            onChange={e => handleInputChangeWithDispatch(e, SetMonedaAbonoCollect)}
                                        >
                                            <option value={''} selected disabled hidden> Seleccione... </option>
                                            {
                                                (monedasInventory != null)
                                                    ? (monedasInventory.length === 0)
                                                        ? <option value=''>No Monedas</option>
                                                        : monedasInventory.map(moneda => {
                                                            return <option key={moneda.codMoneda} value={moneda.codMoneda}> {moneda.monedaNombre} </option>
                                                        })
                                                    : <option value=''>No Monedas</option>
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            disabled={true}
                                            value={abono.fecha}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='row mb-2 text-center'>

                <div className='col-md-4 mb-2'>
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Facturas Pendiente de Pago</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-0">
                                <CollectFacturasPendienteTable columns={columns} data={facturasPendiente} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-8 mb-2'>
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4>Datos de la Factura</h4>
                        </div>
                        <div className="card-body">

                            <div className="row mb-2">
                                <div className="col-md-3 mb-2">
                                    <h5>Factura</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNumber className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Número de Factura'
                                            value={factura}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            disabled={true}
                                            value={fecha}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Monto</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            {moneda == 1 ?
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
                                            placeholder='Monto de la Factura'
                                            disabled={true}
                                            value={validateCurrency(monto)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Saldo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMoneyBill className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Total de Saldo'
                                            disabled={true}
                                            value={validateCurrency(monto)} />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col-md-3 mb-2">
                                    <h5>Intereses</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPlus className="iconSize" />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder='Intereses de la Factura'
                                            disabled={disableInputs}
                                            value={intereses}
                                            onChange={e => handleChangeIntereses(e)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            disabled={true}
                                            value={validateCurrency(intereses)}
                                            onChange={e => handleChangeIntereses(e)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Saldo Previo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            {moneda == 1 ?
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
                                            placeholder='Saldo Previo de la Factura'
                                            disabled={true}
                                            value={validateCurrency(saldoPrevio)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Abono </h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMoneyBill className="iconSize" />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Monto del Abono"
                                            disabled={disableInputs}
                                            min={0}
                                            value={facturaActual.abono}
                                            onKeyDown={handleOnKeyDownAddCollect}
                                            onChange={e => handleChangeAbono(e)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            disabled={true}
                                            value={facturaActual.abono ? validateCurrency(facturaActual.abono)
                                                :
                                                validateCurrency(0)
                                            }
                                            onChange={e => handleChangeAbono(e)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Saldo Actual</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Saldo Actual de la Factura'
                                            disabled={true}
                                            value={saldoActual ? validateCurrency(saldoActual)
                                                :
                                                validateCurrency(0)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex flex-row-reverse'>

                                <button
                                    className={
                                        (!disableInputs)
                                            ? 'btn btn-success ms-2'
                                            : 'btn btn-success ms-2 disabled'
                                    }
                                    onClick={handleAddCollect}
                                >
                                    Agregar <IoAddCircle className="iconSize" />
                                </button>

                                <OverlayTrigger placement="top" overlay={msgInfoBilling}>
                                    <button
                                        className={
                                            (!disableInputs)
                                                ? 'btn btn-dark'
                                                : 'btn btn-dark disabled'
                                        }
                                    >
                                        <FaCircleExclamation className="Iconsize" />
                                    </button>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
