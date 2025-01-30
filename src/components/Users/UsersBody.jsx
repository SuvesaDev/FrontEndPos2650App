import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { TbAbc, TbNotes } from 'react-icons/tb';


import {
    SetAplicarDescUsers,
    SetCambiarPrecioUsers,
    SetClaveEntradaUsers,
    SetClaveInternaUsers,
    SetEmailUsers,
    SetExistNegativaUsers,
    SetIdUsuarioUsers,
    SetInicialesUsers,
    SetIsAdministradoCostaPetsUsers,
    SetIsAgenteCostaPetsUsers,
    SetIsEqualsClaveUsers,
    SetMaximoVentasUsers,
    SetNombreUsers,
    SetObservacionesUsers,
    SetPerfilUsers,
    SetPorcDescUsers,
    SetPorcPrecioUsers,
    SetShowCostaPetsUsers,
    SetShowInfoMessageUsers,
    SetUsuarioUsers,
    SetVisibleClaveEntradaUsers,
    SetVisibleClaveInternaUsers
} from '../../actions/UsersAction';
import { FaCashRegister, FaEnvelope, FaEye, FaEyeSlash, FaIdCard, FaKey, FaPercentage, FaUser, FaUserCircle } from 'react-icons/fa';

export const UsersBody = () => {

    const dispatch = useDispatch();
    const {
        isVisableClaveEntrada,
        isVisableClaveInterna,
        disableInputs,
        isEquealsClave,
        showInfoMessageClave,
        showCostaPets,
        perfiles,
        user
    } = useSelector(state => state.users);

    const {
        idUsuario,
        nombre,
        claveEntrada,
        claveInterna,
        perfil,
        iniciales,
        cambiarPrecio,
        porcPrecio,
        aplicarDesc,
        porcDesc,
        existNegativa,
        usuario,
        observaciones,
        email,
        maximoVentas,
        isAdministradorCostaPets,
        isAgenteCostaPets
    } = user;

    useEffect(() => {

        if (claveEntrada !== '' && claveInterna !== '') {

            if (claveEntrada === claveInterna) {
                dispatch(SetIsEqualsClaveUsers(true));
            } else {
                dispatch(SetIsEqualsClaveUsers(false));
            }
        } else {
            dispatch(SetIsEqualsClaveUsers(true));
        }

    }, [claveEntrada, claveInterna]);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
        dispatch(action(target.checked));
    };

    const handleVisibleClaveEntrada = (e) => {

        if (!disableInputs) {

            e.preventDefault();
            dispatch(SetVisibleClaveEntradaUsers(!isVisableClaveEntrada));
        }

    }

    const handleVisibleClaveInterna = (e) => {

        if (!disableInputs) {

            e.preventDefault();
            dispatch(SetVisibleClaveInternaUsers(!isVisableClaveInterna));
        }

    }

    const handleMouseEnter = (e) => {
        e.preventDefault();
        dispatch(SetShowInfoMessageUsers(true));
    }

    const handleMouseLeave = (e) => {
        e.preventDefault();
        dispatch(SetShowInfoMessageUsers(false));
    }

    const handleInputChangePerfil = ({ target }, action) => {
        
        const namePerfilSelected = perfiles.find( perfil => perfil.idPerfil == target.value );

        if(namePerfilSelected.descripcion === "Costa Pets"){
            dispatch(SetShowCostaPetsUsers(true));
        } else {
            dispatch(SetShowCostaPetsUsers(false));
        }

        dispatch(action(target.value));
    };

    const handleInputChangeCheckAdminCostaPets = () => {
        dispatch(SetIsAdministradoCostaPetsUsers(true));
        dispatch(SetIsAgenteCostaPetsUsers(false));
    };

    const handleInputChangeCheckAgenteCostaPets = () => {
        dispatch(SetIsAdministradoCostaPetsUsers(false));
        dispatch(SetIsAgenteCostaPetsUsers(true));
    };

    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Identificacion Usuario</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Identificacion del Usuario"
                            name='idUsuario'
                            disabled={disableInputs}
                            value={idUsuario}
                            onChange={e => handleInputChangeWithDispatch(e, SetIdUsuarioUsers)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de la Persona"
                            name='nombre'
                            disabled={disableInputs}
                            value={nombre}
                            onChange={e => handleInputChangeWithDispatch(e, SetNombreUsers)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Iniciales</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbAbc className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Iniciales del Usuario"
                            name='iniciales'
                            disabled={disableInputs}
                            value={iniciales}
                            onChange={e => handleInputChangeWithDispatch(e, SetInicialesUsers)}
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Usuario</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUserCircle className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de Usuario"
                            name='usuario'
                            disabled={disableInputs}
                            value={usuario}
                            onChange={e => handleInputChangeWithDispatch(e, SetUsuarioUsers)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Clave Entrada
                        <BsFillInfoCircleFill className='iconSize espacio' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                        {
                            (showInfoMessageClave)
                                ? <p className="fondoPop">La clave debe tener un carácter especial (!?$#@...), un número, una mayúscula y una minúscula y de 8 caracteres.</p>
                                : null
                        }</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaKey className="iconSize" />
                        </span>
                        <input
                            className={(isEquealsClave) ? 'form-control' : 'form-control disabled'}
                            name='claveEntrada'
                            placeholder='Clave Entrada'
                            type={(isVisableClaveEntrada) ? 'text' : 'password'}
                            disabled={disableInputs}
                            value={claveEntrada}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveEntradaUsers)}
                        />
                        <span className="input-group-text">
                            {
                                (isVisableClaveEntrada)
                                    ? <FaEyeSlash
                                        id={(disableInputs) ? 'iconSize disabled' : 'iconSize'}
                                        onClick={handleVisibleClaveEntrada}
                                    />
                                    : <FaEye
                                        id={(disableInputs) ? 'iconSize disabled' : 'iconSize'}
                                        onClick={handleVisibleClaveEntrada}
                                    />
                            }
                        </span>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Clave Interna</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaKey className="iconSize" />
                        </span>
                        <input
                            className={(isEquealsClave) ? 'form-control' : 'form-control disabled'}
                            placeholder='Clave Interna'
                            name='claveInterna'
                            type={(isVisableClaveInterna) ? 'text' : 'password'}
                            disabled={disableInputs}
                            value={claveInterna}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaUsers)}
                        />
                        <span className="input-group-text">
                            {
                                (isVisableClaveInterna)
                                    ? <FaEyeSlash
                                        id={(disableInputs) ? 'iconSize disabled' : 'iconSize'}
                                        onClick={handleVisibleClaveInterna}
                                    />
                                    : <FaEye
                                        id={(disableInputs) ? 'iconSize disabled' : 'iconSize'}
                                        onClick={handleVisibleClaveInterna}
                                    />
                            }
                        </span>
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Perfil</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <select
                            className='form-select'
                            name='perfil'
                            disabled={disableInputs}
                            value={perfil}
                            onChange={e => handleInputChangePerfil(e, SetPerfilUsers)}
                        >
                            <option value="" selected disabled hidden>
                                {" "}
                                Seleccione...{" "}
                            </option>
                            {perfiles.length > 0 ? (
                                perfiles.map((tipo) => {
                                    return (
                                        <option value={tipo.idPerfil}>
                                        {" "}
                                        {tipo.descripcion}{" "}
                                        </option>
                                    );
                                })
                            ) : (
                                <option value="">No se cargaron los perfiles</option>
                            )}
                            {/* <option value={1}>Administrador</option>
                            <option value={2}>Cajero</option>
                            <option value={3}>Costa Pets</option> */}
                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Correo Electronico</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaEnvelope className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Correo Electronico"
                            name='email'
                            disabled={disableInputs}
                            value={email}
                            onChange={e => handleInputChangeWithDispatch(e, SetEmailUsers)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Máximo Ventas</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCashRegister className="iconSize" />
                        </span>
                        <input
                            type='number'
                            className="form-control"
                            name='cantidadPreventas'
                            min="1"
                            disabled={disableInputs}
                            value={maximoVentas}
                            onChange={e => handleInputChangeWithDispatch(e, SetMaximoVentasUsers)}
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-0 text-center">

                <div className="col-md-6 mb-2">
                    <h5>Opciones en Ventas y Cotizaciones</h5>
                    <hr />
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input checkP"
                                    id='checkExistenciaUserBody'
                                    name='existNegativa'
                                    disabled={disableInputs}
                                    checked={existNegativa}
                                    onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetExistNegativaUsers)}
                                />
                                <h5 className="form-check-label" for="checkExistenciaUserBody">Ventas con Existencia en Negativo</h5>
                            </div>
                            <hr />
                        </div>

                        <div className="col-md-12 mb-3">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input checkP"
                                            id='checkPreciosUserBody'
                                            name='cambiarPrecio'
                                            disabled={disableInputs}
                                            checked={cambiarPrecio}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetCambiarPrecioUsers)}
                                        />
                                        <h5 className="form-check-label" for="checkPreciosUserBody">Cambiar Precios</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            type='number'
                                            min='0'
                                            max='100'
                                            name='porcPrecio'
                                            disabled={disableInputs}
                                            value={porcPrecio}
                                            onChange={e => handleInputChangeWithDispatch(e, SetPorcPrecioUsers)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-12 mb-3">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input checkP"
                                            name='aplicarDesc'
                                            disabled={disableInputs}
                                            checked={aplicarDesc}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetAplicarDescUsers)}
                                        />
                                        <h5 className="form-check-label" for="aplicarDesc">Aplicar Descuento</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            type='number'
                                            min='0'
                                            max='100'
                                            name='porcDesc'
                                            disabled={disableInputs}
                                            value={porcDesc}
                                            onChange={e => handleInputChangeWithDispatch(e, SetPorcDescUsers)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-2">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="4"
                            cols="50"
                            name='observaciones'
                            disabled={disableInputs}
                            value={observaciones}
                            onChange={e => handleInputChangeWithDispatch(e, SetObservacionesUsers)}
                        ></textarea>
                    </div>

                    <div className={showCostaPets ? 'mt-3' : 'mt-3 d-none'}>
                        <h5>CostaPets</h5>
                        <hr />

                        <div className="col-md-12 mb-3">
                            <div className='row'>

                                <div className="col-md-6 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input checkP"
                                            id='checkEsCostaPetsUserBody'
                                            name='existNegativa'
                                            disabled={disableInputs}
                                            checked={isAdministradorCostaPets}
                                            onChange={e => handleInputChangeCheckAdminCostaPets()}
                                        />
                                        <h5 className="form-check-label" for="checkEsCostaPetsUserBody">Es Administrador</h5>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input checkP"
                                            id='checkEsAgenteCostaPetsUserBody'
                                            name='existNegativa'
                                            disabled={disableInputs}
                                            checked={isAgenteCostaPets}
                                            onChange={e => handleInputChangeCheckAgenteCostaPets()}
                                        />
                                        <h5 className="form-check-label" for="checkEsAgenteCostaPetsUserBody">Es Agente</h5>
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
