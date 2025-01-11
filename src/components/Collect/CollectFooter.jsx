import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaRegSave, FaWindowClose, FaUserCheck } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiKeyFill } from "react-icons/pi";

import {
    CleanCollect,
    SetAllCustomersFacturasCollect,
    SetClaveInternaCollect,
    SetVisiblePasswordCollect,
    startSaveCollect,
    startValidateClaveInternaCollect
} from '../../actions/CollectAction';

import { CollectSearchCustomerModal } from './CollectSearchCustomerModal';
import { DeleteTab } from '../../actions/tabs';

export const CollectFooter = () => {

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
        abono,
        abonos,
        startOpeningCollect
    } = useSelector(state => state.collect);

    const { auth, idSurcursal } = useSelector(state => state.login);


    const {
        nombreCliente,
        identificacionCliente,
        numeroFicha,
        moneda,
        fecha,
        numeroFactura,
        saldoAnterior,
        saldoActual,
        observaciones,
        totalSaldoAnterior,
        totalMontoRecibido,
        totalSaldoActual
    } = abono;

    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;

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

            dispatch(startValidateClaveInternaCollect(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {
        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordCollect(!visiblePassword));
        }
    }

    const handleSaveCollect = (e) => {

        e.preventDefault();

        if (activeButtonSave) {


            if (moneda !== "") {
                const newCollect = {
                    numero: numeroFactura,
                    codCliente: identificacionCliente,
                    nombre: nombreCliente,
                    saldo: saldoAnterior,
                    monto: abono.abono,
                    saldo_actual: saldoActual,
                    fecha: fecha,
                    observaciones: observaciones,
                    anula: false,
                    cedulaUsuario: idUsuario,
                    contabilizado: true,
                    asiento: true,
                    codmoneda: moneda,
                    cheque: '', //No se manda
                    numCaja: numCaja,
                    banco: '', //No se manda
                    numApertura: numApertura,
                    estadoEnvio: '', //No se manda
                    idSucursal: idSucursalOF,
                    ficha: numeroFicha,
                    cobrado: false,
                    facturas: abonos,
                }

               dispatch(startSaveCollect(newCollect));
            } else {
                Swal.fire("Error!", "Seleccione una moneda de cobro válida.", "error")
            }
        }

    }

    const handleCloseWindowCollect = (e) => {

        if (startOpeningCollect) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea cancelar la creacion de abono?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {
                if (result.isDenied) {
                    e.preventDefault();
                    dispatch(CleanCollect());
                }
            });

        } else {
            e.preventDefault();
            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(CleanCollect());
        }

    }

    return (

        <>
            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonSave) ? "btn btn-success espacio" : "btn btn-success espacio disabled"} onClick={handleSaveCollect}
                    >
                        Registrar <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>
                {/* 
                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonSearch) ? "btn btn-primary espacio" : "btn btn-primary espacio disabled"}

                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div> */}
                {/* 

                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonRemove) ? "btn btn-danger espacio" : "btn btn-danger espacio disabled"}
                    >
                        Anular <RiDeleteBin2Fill className="iconSizeBtn" />
                    </button>
                </div> */}

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-warning espacio"} onClick={handleCloseWindowCollect}
                    >
                        {(startOpeningCollect) ? 'Cancelar' : 'Cerrar'} <FaWindowClose className="iconSizeBtn" onClick={handleCloseWindowCollect} />
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
                                handleInputChangeWithDispatch(e, SetClaveInternaCollect)
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

            <CollectSearchCustomerModal />
        </>

    )
}
