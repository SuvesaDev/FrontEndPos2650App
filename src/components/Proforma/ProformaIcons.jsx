import Swal from 'sweetalert2';
import { MdNoteAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash, FaFloppyDisk, FaMagnifyingGlass, FaUserCheck } from 'react-icons/fa6';
import { FaPrint, FaRegSave, FaSearch, FaWindowClose } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { PiKeyFill } from 'react-icons/pi';
import { DeleteTab } from '../../actions/tabs';
import { SetClaveInternaBudgets, SetCleanBudgets, SetDatosReporteBudgets, SetFechaReporteBudgets, SetVisiblePasswordBudgets, startEditBudget, startGetDatosSucursalActualBudgets, startSaveBudget, startSearchProformasBudget, startValidateClaveInternaBudgets } from '../../actions/budgetsAction';
import { ProformaClientesModal } from './ProformaClientesModal';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ProformaModalPDF } from './ProformaModalPDF';
import { ProformaPDF } from './ProformaPDF';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { ProformaSearchModal } from './ProformaSearchModal';
import { ProformaReModalPDF } from './ProformaReModalPDF';
import { TbEditCircle } from 'react-icons/tb';
export const ProformaIcons = () => {

    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.tabs);
    const {
        claveInterna,
        visiblePassword,
        disableInputsUser,
        nameUser,
        startOpeningBudget,
        activeButtonPrint,
        activeButtonSave,
        activeButtonSearch,
        activeButtonEdit,
        customerData,
        validezDias,
        tiempoEntrega,
        fechaCotizacion,
        moneda,
        monedaNombre,
        isContado,
        isCredito,
        isAnulate,
        isConfirm,
        confirmadaPor,
        costoTransporte,
        observaciones,
        subTotalGeneral,
        subTotalGravadoGeneral,
        subTotalExentoGeneral,
        descuentoGeneral,
        impuestoVentaGeneral,
        totalGeneral,
        detalleFactura,
        datosReporte,
        fechaReporte,
        datosSucursal,
        nombrequienCotiza,
        codigoCotizacion,
    } = useSelector(state => state.budgets);

    const {
        codigoCliente,
        nombreCliente,
        contactoCliente,
        telefonoCliente,
        tipocedulaCliente,
        cedulaCliente } = customerData;

    const { auth, idSurcursal } = useSelector(state => state.login);
    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;
    const { dollar } = useSelector(state => state.sidebar);

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

            dispatch(startValidateClaveInternaBudgets(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {
        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordBudgets(!visiblePassword));
        }
    }

    const handleSeacrhsProforma = () => {
        dispatch(startSearchProformasBudget());
    }



    const handleSaveNewProforma = (e) => {
        const codClienteString = codigoCliente.toString();
        const tipoCedulaString = tipocedulaCliente.toString();
        const costaRicaDateTime = format(new Date(), 'EEEE, dd MMMM, yyyy HH:mm:ss', {
            locale: es,
            timeZone: 'America/Costa_Rica',
        });
        const datosProforma = {
            fecha: fechaCotizacion,
            codCliente: codClienteString,
            nombreCliente: nombreCliente,
            contacto: contactoCliente,
            validez: validezDias,
            tiempoEntrega: tiempoEntrega,
            contado: isContado,
            credito: isCredito,
            anulado: isAnulate,
            dias: validezDias,
            observaciones: observaciones,
            subTotalGravada: subTotalGravadoGeneral,
            subTotalExento: subTotalExentoGeneral,
            descuento: descuentoGeneral,
            pagoImpuesto: impuestoVentaGeneral,
            total: totalGeneral,
            cedula: '00000000', //Preguntar por Este Dato
            codMoneda: moneda,
            monedaNombre: monedaNombre,
            subTotal: subTotalGeneral,
            tipoCambio: dollar,
            impVenta: impuestoVentaGeneral,
            transporte: costoTransporte,
            venta: false,  //Preguntar por Este Dato
            exonerar: false,  //Preguntar por Este Dato
            confirmada: isConfirm,
            confirmadaPor: confirmadaPor,
            estadoActual: "Revision",//Preguntar por Este Dato
            observacionEstado: "N/A",//Preguntar por Este Dato
            idFactura: 0,//Preguntar por Este Dato
            telefono: telefonoCliente,
            tipoCedula: tipoCedulaString,
            cedulaCliente: cedulaCliente,
            idSucursal: idSucursalOF,
            quienCotiza: nombrequienCotiza,
            fechaReporte: costaRicaDateTime,
            detalle: detalleFactura,
        }

        if (!isContado && !isCredito) {
            Swal.fire("Error!", `Debe seleccionar una forma de pago.`, 'error');
        } else {
            dispatch(startSaveBudget(datosProforma, idSucursalOF))
        }



    }

    const handleEditProforma = (e) => {
        const codClienteString = codigoCliente.toString();
        const tipoCedulaString = tipocedulaCliente.toString();
        const costaRicaDateTime = format(new Date(), 'EEEE, dd MMMM, yyyy HH:mm:ss', {
            locale: es,
            timeZone: 'America/Costa_Rica',
        });
        const proformaImprimir = {
            cotizacion1: codigoCotizacion,
            fecha: fechaCotizacion,
            codCliente: codClienteString,
            nombreCliente: nombreCliente,
            contacto: contactoCliente,
            validez: validezDias,
            tiempoEntrega: tiempoEntrega,
            contado: isContado,
            credito: isCredito,
            anulado: isAnulate,
            dias: validezDias,
            observaciones: observaciones,
            subTotalGravada: subTotalGravadoGeneral,
            subTotalExento: subTotalExentoGeneral,
            descuento: descuentoGeneral,
            pagoImpuesto: impuestoVentaGeneral,
            total: totalGeneral,
            cedula: '00000000', //Preguntar por Este Dato
            codMoneda: moneda,
            monedaNombre: monedaNombre,
            subTotal: subTotalGeneral,
            tipoCambio: dollar,
            impVenta: impuestoVentaGeneral,
            transporte: costoTransporte,
            venta: false,  //Preguntar por Este Dato
            exonerar: false,  //Preguntar por Este Dato
            confirmada: isConfirm,
            confirmadaPor: confirmadaPor,
            estadoActual: "Revision",//Preguntar por Este Dato
            observacionEstado: "N/A",//Preguntar por Este Dato
            idFactura: 0,//Preguntar por Este Dato
            telefono: telefonoCliente,
            tipoCedula: tipoCedulaString,
            cedulaCliente: cedulaCliente,
            idSucursal: idSucursalOF,
            quienCotiza: nombrequienCotiza,
            fechaReporte: costaRicaDateTime,
            detalle: detalleFactura,
        }
        dispatch(startEditBudget(proformaImprimir, idSucursalOF))
    }



    const handleCloseWindowBudgets = (e) => {
        if (startOpeningBudget) {
            Swal.fire({
                title: `¿Esta seguro(a) de cancelar la cotización?`,
                icon: 'question',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {
                if (result.isDenied) {
                    e.preventDefault();
                    dispatch(SetCleanBudgets());
                }
            });
        } else {
            e.preventDefault();
            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(SetCleanBudgets());
        }

    }


    return (
        <>

            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        onClick={handleSeacrhsProforma} className={activeButtonSearch ? ("btn btn-primary espacio") : ("btn btn-primary disabled espacio")}
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscarCotizaciones"
                    >
                        Buscar <FaSearch className="iconSize" />
                    </button>
                </div>
                {
                    (activeButtonEdit && !activeButtonSave) ? (
                        <div className="btn-group mb-2">
                            <button
                                onClick={handleEditProforma}
                                className="btn btn-warning espacio"
                                data-bs-toggle="modal"
                                data-bs-target="#modalReImprimirProforma"
                            >
                                Editar <TbEditCircle className="iconSize" />
                            </button>
                        </div>
                    ) : (
                        <div className="btn-group mb-2">
                            <button
                                onClick={handleSaveNewProforma}
                                className={(activeButtonSave ? "btn btn-success espacio" : "btn btn-success disabled espacio")}
                                data-bs-toggle="modal"
                                data-bs-target="#modalImprimirProforma"
                            >
                                Registrar <FaFloppyDisk className="iconSize" />
                            </button>
                        </div>
                    )
                }

                {/* <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                    >
                        Anular <RiDeleteBin2Fill className="iconSize" />
                    </button>
                </div> */}


                <div className="btn-group mb-2">
                    <button
                        className={activeButtonPrint ? ("btn btn-dark espacio") : ("btn btn-dark disabled espacio")}
                        data-bs-toggle="modal"
                        data-bs-target="#modalReImprimirProforma"
                    >
                        Imprimir <FaPrint className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={startOpeningBudget ? ("btn btn-danger espacio") : ("btn btn-warning espacio")} onClick={handleCloseWindowBudgets}
                    >
                        {(startOpeningBudget) ? 'Cancelar' : 'Cerrar'} <FaWindowClose className="iconSizeBtn" onClick={handleCloseWindowBudgets} />
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
                                handleInputChangeWithDispatch(e, SetClaveInternaBudgets)
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
                {/* 
                <div className="btn-group mb-2">
                    <button
                        className="btn btn-success espacio"
                    >
                        Actualizar Precios <MdUpdate className="iconSize" />
                    </button>
                </div> */}
            </div>

            <ProformaClientesModal />
            <ProformaModalPDF />
            <ProformaSearchModal />
            <ProformaReModalPDF />
        </>

    )
}
