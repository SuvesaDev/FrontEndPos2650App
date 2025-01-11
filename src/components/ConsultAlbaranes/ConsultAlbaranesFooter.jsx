import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import {
    SetAddAllFacturasPendientesConsultAlbaranes,
    SetOpenModalGenerarFacturasConsultAlbaranes,
    SetUserClaveInternaConsultAlbaranes,
    SetVisablePasswordConsultAlbaranes,
    startExistsClientConsultAlbaranes,
    startValidateClaveInternaConsultAlbaranes
} from "../../actions/consultAlbaranesAction";
import { PiKeyFill } from "react-icons/pi";
import { FaEye, FaEyeSlash, FaUserCheck } from "react-icons/fa";
import { FaBilibili } from "react-icons/fa6";
import { RiBillFill } from "react-icons/ri";

export const ConsultAlbaranesFooter = () => {

    const dispatch = useDispatch();

    const {
        albaranesFacturar,
        disableInputs,
        userClaveInterna,
        nameUser,
        disableInputPassword,
        visiblePassword
    } = useSelector(state => state.consultAlbaranes);

    const { allTiposFacturas } = useSelector(state => state.tiposFacturas);

    const handleClickGenerarFacturas = (e) => {

        if (!disableInputs) {

            e.preventDefault();

            let facturasPendientes = [];

            const cedula = albaranesFacturar[0].cedula;

            for (let i = 0; i < albaranesFacturar.length; i++) {

                let nombreCliente = albaranesFacturar[i].cliente;

                const existFactura = facturasPendientes.find(factura => factura.cliente === nombreCliente);

                if (existFactura === undefined) {

                    const albaranes = albaranesFacturar.filter(albaran => albaran.cliente === nombreCliente);

                    let total = 0;

                    albaranes.forEach(al => {
                        total += al.total;
                    });

                    facturasPendientes.push({
                        cedula: cedula,
                        cliente: nombreCliente,
                        caja: 1,
                        tipo: 'tiquete',
                        total: total
                    });
                }

            }

            // dispatch(SetOpenModalGenerarFacturasConsultAlbaranes(true));

            dispatch(SetAddAllFacturasPendientesConsultAlbaranes(facturasPendientes));

            dispatch(startExistsClientConsultAlbaranes(cedula));
        }

    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleOnKeyDownUser = async (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (userClaveInterna == '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba su contraseña.'
                });

                return;
            }

            let getTipos = true;

            if (allTiposFacturas !== null) {
                getTipos = false;
            }

            dispatch(startValidateClaveInternaConsultAlbaranes(userClaveInterna, getTipos));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputPassword) {
            e.preventDefault();
            dispatch(SetVisablePasswordConsultAlbaranes(!visiblePassword));
        }
    }

    return (

        <>
            <div className="btn-toolbar" role="toolbar">


                <div className="col-md-2 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Ingrese la Contraseña"
                            type={(visiblePassword) ? 'text' : 'password'}
                            name="userClaveInterna"
                            disabled={disableInputPassword}
                            value={userClaveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={(e) => handleInputChangeWithDispatch(e, SetUserClaveInternaConsultAlbaranes)}
                        />
                        <span
                            className="input-group-text"
                            onClick={handleVisibleClave}
                            style={{ cursor: "pointer" }}
                        >
                            {
                                (visiblePassword)
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
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
                            placeholder="Nombre del Usuario"
                            disabled={true}
                            value={nameUser}
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-2 espacio">
                    <button
                        className={(disableInputs) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                        disabled={disableInputs}
                        onClick={handleClickGenerarFacturas}
                        data-bs-toggle="modal"
                        data-bs-target="#modalGenerarFacturasGN"
                    >
                        Generar Facturas <RiBillFill  className="iconSizeBtn" />
                    </button>
                </div>
            </div>


        </>

    )
}
