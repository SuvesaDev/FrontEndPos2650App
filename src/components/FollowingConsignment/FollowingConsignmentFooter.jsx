import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { FaUserCheck } from 'react-icons/fa';
//Icons
import { FaEye, FaCheckCircle, FaEyeSlash } from "react-icons/fa";
import { PiKeyFill } from "react-icons/pi";
import { FaWindowClose } from "react-icons/fa";
import { CiInboxOut } from "react-icons/ci";

import { DeleteTab } from '../../actions/tabs';

import { 
    CleanFollowingConsignment,
    SetClaveInternaFollowingConsignment, 
    SetVisiblePasswordFollowingConsignment,
    startValidateClaveInternaFollowingConsignment
} from '../../actions/FollowingConsignmentAction';

export const FollowingConsignmentFooter = () => {

    const dispatch = useDispatch();

    const { 
        activeButtonsFooter,
        visiblePassword,
        startOpening,
        usuarioFacturacion,
        plazos,
        activeButtonAprobado,
        activeButtonDespachar
    } = useSelector(state => state.followingConsignment);

    const { claveInterna, nameUser } = usuarioFacturacion;

    const { currentTab } = useSelector(state => state.tabs);
    const { surcursales, auth, idSurcursal } = useSelector(state => state.login);
    const { centro } = auth;
    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;

    const { allTiposFacturas } = useSelector(state => state.tiposFacturas);
    const { monedasInventory } = useSelector(state => state.monedas);
    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);
    const { bodegasInventory } = useSelector(state => state.bodegas);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleAprobadoConsignacion = async (e) => {

        if(activeButtonAprobado) {
            
        }

    }

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

            // Obtener los catalogos
            const catalogos = {
                tiposFacturas: allTiposFacturas,
                tiposIdentificacion,
                surcursales,
                monedas: monedasInventory,
                plazos,
                bodegas: bodegasInventory
            }

            dispatch( startValidateClaveInternaFollowingConsignment(claveInterna, catalogos));
        }
    }

    const handleVisibleClave = (e) => {
        if (!activeButtonsFooter) {
            e.preventDefault();
            dispatch(SetVisiblePasswordFollowingConsignment(!visiblePassword));
        }
    }

    const handleCloseWindow = (e) => {

        e.preventDefault();

        if (startOpening) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea limpiar el siguimiento de las consignaciones?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {
                    dispatch(CleanFollowingConsignment());
                }
            });

        } else {
            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
        }
    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">

                <div className={(activeButtonAprobado) ? 'btn-group mb-2' : 'btn-group mb-2 d-none'}>
                    <button
                        className= {
                            (activeButtonsFooter) 
                                ? 'btn btn-success espacio' 
                                : 'btn btn-success espacio disabled' 
                            }
                        onClick={handleAprobadoConsignacion}
                    >
                        Aprobado <FaCheckCircle className="iconSizeBtn" />
                    </button>
                </div>

                <div className={(activeButtonDespachar) ? 'btn-group mb-2' : 'btn-group mb-2 d-none'}>
                    <button
                        className= {
                            (activeButtonsFooter) 
                                ? 'btn btn-success espacio' 
                                : 'btn btn-success espacio disabled' 
                            }
                        onClick={handleAprobadoConsignacion}
                    >
                        Despachar <CiInboxOut className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                        onClick={handleCloseWindow}
                    >
                        {
                            (startOpening)
                                ? 'Cancelar'
                                : 'Cerrar'
                        } 
                        {"  "}
                        <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

                <div className="col-md-2 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={ (visiblePassword) ? 'text' : 'password' }
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={activeButtonsFooter}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaFollowingConsignment)}
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
                            disabled={true}
                            value={nameUser}
                        />
                    </div>
                </div>

            </div>

        </>

    )
}

