import Swal from 'sweetalert2';
import { MdNoteAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash, FaMagnifyingGlass, FaUserCheck } from 'react-icons/fa6';
import { FaPrint, FaRegSave, FaWindowClose } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { PiKeyFill } from 'react-icons/pi';
import { DeleteTab } from '../../actions/tabs';
import { SetClaveInternaPays, SetCleanPays, SetVisiblePasswordPays, startValidateClaveInternaPays, SetDatosReciboImprimirPays, startSavePays, startSearchAbonosPays, startPrintPays } from '../../actions/pays';
import { PaysSearchProveedorModal } from './PaysSearchProveedorModal';
import { PayDocumentModal } from './PayDocumentModal';
import { PayReSearchModal } from './PayReSearchModal';

export const PaysIcons = () => {

    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.tabs);

    const {
        activeButtonSave,
        activeButtonSearch,
        activeButtonRemove,
        claveInterna,
        visiblePassword,
        disableInputsUser,
        nameUser,
        idUsuario,
        numApertura,
        numCaja,
        fecha,
        startOpeningPays,
        isEnableButtonPrint,
        moneda,
        numeroDocumento,
        tipoPago,
        banco,
        cuentaBanco,
        totalSaldoAnterior,
        totalMontoRecibido,
        totalSaldoActual,
        numeroRecibo,
        abonoActual,
        cuentaProveedor,
        observaciones,
        abonos,
        cedulaProveedor,
        nombreProveedor,
        codigoProveedor,
    } = useSelector(state => state.pays);
    const { auth, idSurcursal } = useSelector(state => state.login);
    const { dollar } = useSelector(state => state.sidebar);

    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;


    const fechaSinTiempo = fecha.split("T")[0];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleOnKeyDownUser = async (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (claveInterna == '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba su contraseña.'
                });

                return;
            }

            dispatch(startValidateClaveInternaPays(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {
        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordPays(!visiblePassword));
        }
    }

    const handleSearchAbonos = () => {
        dispatch(startSearchAbonosPays());
    }


    const handleCloseWindowPays = (e) => {

        if (startOpeningPays) {
            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea cancelar la creacion del abono?`,
                icon: 'question',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {
                if (result.isDenied) {
                    e.preventDefault();
                    dispatch(SetCleanPays());
                }
            });

        } else {
            e.preventDefault();
            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(SetCleanPays());
        }

    }

    const handleSavePays = (e) => {
        e.preventDefault();
        if (activeButtonSave) {
            if (moneda !== "") {
                const newPay = {
                    documento: numeroDocumento,
                    tipoDocumento: tipoPago,
                    cuentaBancaria: cuentaBanco,
                    codigoBanco: banco,
                    saldoCuenta: totalSaldoAnterior,
                    monto: totalMontoRecibido,
                    saldoActual: totalSaldoActual,
                    saldoAnterior: totalSaldoAnterior,
                    fecha: fecha,
                    recibo: numeroRecibo,
                    cedulaUsuario: "00000000",
                    codProveedor: codigoProveedor,
                    nombreProveedor: nombreProveedor,
                    codMoneda: moneda,
                    tipoCambio: dollar,
                    montoLetras: "Pendiente",
                    cuentaDestino: parseInt(cuentaProveedor),
                    observaciones: observaciones,
                    idSucursal: idSucursalOF,
                    usuario: nameUser,
                    detalle: abonos
                }
                console.log(newPay)
               dispatch(startSavePays(newPay, idSucursalOF));

            } else {
                Swal.fire("Error!", "Seleccione una moneda de cobro válida.", "error")
            }
        }

    }

    const handlePrintPays = (e) => {
        e.preventDefault();
        if (isEnableButtonPrint) {
            const oldPay = {
                documento: numeroDocumento,
                tipoDocumento: tipoPago,
                cuentaBancaria: cuentaBanco,
                codigoBanco: banco,
                saldoCuenta: totalSaldoAnterior,
                monto: totalMontoRecibido,
                saldoActual: totalSaldoActual,
                fecha: fechaSinTiempo,
                recibo: numeroRecibo,
                cedulaUsuario: "00000000",
                codProveedor: codigoProveedor,
                nombreProveedor: nombreProveedor,
                codMoneda: moneda,
                tipoCambio: dollar,
                montoLetras: "Pendiente",
                cuentaDestino: parseInt(cuentaProveedor),
                observaciones: observaciones,
                idSucursal: idSucursalOF,
                usuario: nameUser,
                detalle: abonos
            }
            console.log(oldPay)
            dispatch(startPrintPays(oldPay, idSucursalOF));
        }

    }


    return (
        <>
            <div className="btn-toolbar" role="toolbar">



                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonSave) ? "btn btn-success espacio" : "btn btn-success espacio disabled"}
                        onClick={handleSavePays}
                        data-bs-toggle="modal"
                        data-bs-target="#modalImprimirReciboAbonoPagar"
                    >
                        Registrar <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonSearch) ? "btn btn-primary espacio" : "btn btn-primary espacio disabled"}
                        onClick={handleSearchAbonos}
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscarAbonosPagar"
                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div>

                {/* <div className="btn-group mb-2">
                    <button
                        className={(activeButtonRemove) ? "btn btn-danger espacio" : "btn btn-danger espacio disabled"}
                    >
                        Anular <RiDeleteBin2Fill className="iconSizeBtn" />
                    </button>
                </div> */}

                <div className="btn-group mb-2">
                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#modalImprimirReciboAbonoPagar"
                        onClick={handlePrintPays}
                        className={(isEnableButtonPrint) ? "btn btn-dark espacio" : "btn btn-dark espacio disabled"}
                    >
                        Imprimir <FaPrint className="iconSizeBtn" />
                    </button>
                </div>


                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-warning espacio"} onClick={handleCloseWindowPays}
                    >
                        {(startOpeningPays) ? 'Cancelar' : 'Cerrar'} <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

                <div className="col-md-3 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={visiblePassword ? "text" : "password"}
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={(e) =>
                                handleInputChangeWithDispatch(e, SetClaveInternaPays)
                            }
                        />
                        <span
                            className="input-group-text"
                            onClick={handleVisibleClave}
                            style={{ cursor: "pointer" }}
                        >
                            {visiblePassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                <div className="col-md-2 mb-2 espacio">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUserCheck className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={nameUser}
                        />
                    </div>
                </div>
            </div>
            <PaysSearchProveedorModal />
            <PayDocumentModal />
            <PayReSearchModal />
        </>
    )
}
