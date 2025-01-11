import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    SetCantonCompany,
    SetCorreoCompany,
    SetDisableInputCantonesCompany,
    SetDisableInputDistritoCompany,
    SetDistritoCompany,
    SetIdentificacionCompany,
    SetNombreCompany,
    SetOtrasSeñasCompany,
    SetProvinciaCompany,
    SetSucursalCompany,
    SetTelefonoCompany,
    SetTipoIdentificacionCompany,
    startGetAllCantonesCompany,
    startGetAllDistritosCompany
} from '../../actions/CompanyAction';
import { FaEnvelope, FaIdCard, FaListOl, FaPhoneAlt } from 'react-icons/fa';
import { MdFamilyRestroom } from 'react-icons/md';
import { FaLocationDot, FaMapLocationDot, FaShop } from 'react-icons/fa6';

export const CompanyBodyDatosEmisor = () => {

    const dispatch = useDispatch();
    const {
        empresa,
        cantonesCompany,
        distritosCompany,
        disableInputCantones,
        disableInputDistritos,
        disableInputIdentificacion,
        disableInputs
    } = useSelector(state => state.company);
    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);
    const { provincias } = useSelector(state => state.provincias);

    const {
        tipoIdentificacion,
        identificacion,
        nombre,
        correo,
        telefono,
        sucursal,
        provincia,
        canton,
        distrito,
        otrasSeñas,
    } = empresa;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeProvincia = ({ target }) => {

        const idProvincia = parseInt(target.value);

        //Se resetea el valor de canton
        dispatch(SetCantonCompany(0));

        //Se resetea el valor de canton
        dispatch(SetDistritoCompany(0));

        //Se desactiva los distritos
        dispatch(SetDisableInputDistritoCompany(true));

        //Se cambia el valor en el estado de la provincia
        dispatch(SetProvinciaCompany(idProvincia));

        //Se activa el combo de cantones
        dispatch(SetDisableInputCantonesCompany(false));

        //Se obtiene los cantones de esa provincia
        dispatch(startGetAllCantonesCompany(idProvincia));
    }

    const handleChangeCanton = ({ target }) => {

        const idCanton = parseInt(target.value);

        //Se resetea el valor de distrito
        dispatch(SetDistritoCompany(0));

        //Se cambia el valor en el estado del canton
        dispatch(SetCantonCompany(idCanton));

        //Se activa el combo de distritos
        dispatch(SetDisableInputDistritoCompany(false));

        //Se obtiene los distritos de ese canton
        dispatch(startGetAllDistritosCompany(idCanton));
    }

    const handleChangeDistrito = ({ target }) => {

        const idDistrito = parseInt(target.value);

        //Se cambia el valor en el estado del canton
        dispatch(SetDistritoCompany(idDistrito));
    }

    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Tipo Identificación</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaListOl className="iconSize" />
                        </span>
                        <select
                            className='form-select'
                            name="tipoIdentificacion"
                            disabled={disableInputs}
                            value={tipoIdentificacion}
                            onChange={e => handleInputChangeWithDispatch(e, SetTipoIdentificacionCompany)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (tiposIdentificacion != null)
                                    ? (tiposIdentificacion.length === 0)
                                        ? <option value=''>No se cargaron los Tipos Documentos</option>
                                        : tiposIdentificacion.map(tipoD => {
                                            return <option key={tipoD.codigoFe} value={tipoD.codigoFe}> {tipoD.descripcion} </option>
                                        })
                                    : <option value=''>No se cargaron los Tipos Documentos</option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Identificación</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Identificación de la Empresa"
                            name='identificacion'
                            disabled={(disableInputs) ? disableInputs : disableInputIdentificacion}
                            value={identificacion}
                            onChange={e => handleInputChangeWithDispatch(e, SetIdentificacionCompany)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Razón Social</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <MdFamilyRestroom className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Razón Social de la Empresa"
                            name='nombre'
                            disabled={disableInputs}
                            value={nombre}
                            onChange={e => handleInputChangeWithDispatch(e, SetNombreCompany)}
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Correo Electronico</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaEnvelope className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Correo Electronico de la Empresa"
                            name='correo'
                            disabled={disableInputs}
                            value={correo}
                            onChange={e => handleInputChangeWithDispatch(e, SetCorreoCompany)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Teléfono</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPhoneAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Teléfono de la Empresa"
                            name='telefono'
                            disabled={disableInputs}
                            value={telefono}
                            onChange={e => handleInputChangeWithDispatch(e, SetTelefonoCompany)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>N. Sucursal</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaShop className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Sucursal de la Empresa"
                            name='sucursal'
                            disabled={disableInputs}
                            value={sucursal}
                            onChange={e => handleInputChangeWithDispatch(e, SetSucursalCompany)}
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Provincia</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMapLocationDot className="iconSize" />
                        </span>
                        <select
                            className='form-select'
                            name="provincia"
                            disabled={disableInputs}
                            value={provincia}
                            onChange={e => handleChangeProvincia(e)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (provincias != null)
                                    ? (provincias.length === 0)
                                        ? <option value=''>No se cargaron las provincias</option>
                                        : provincias.map(provincia => {
                                            return <option key={provincia.id} value={provincia.id}> {provincia.nombre} </option>
                                        })
                                    : <option value=''>No se cargaron las provincias</option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Canton</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMapLocationDot className="iconSize" />
                        </span>
                        <select
                            className='form-select'
                            name="canton"
                            disabled={(disableInputs) ? disableInputs : disableInputCantones}
                            value={canton}
                            onChange={e => handleChangeCanton(e)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (cantonesCompany != null)
                                    ? (cantonesCompany.length === 0)
                                        ? <option value=''>No se cargaron los cantontes</option>
                                        : cantonesCompany.map(canton => {
                                            return <option key={canton.id} value={canton.id}> {canton.nombre} </option>
                                        })
                                    : <option value=''>No se cargaron los cantontes</option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Distrito</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMapLocationDot className="iconSize" />
                        </span>
                        <select
                            className='form-select'
                            name="distrito"
                            disabled={(disableInputs) ? disableInputs : disableInputDistritos}
                            value={distrito}
                            onChange={e => handleChangeDistrito(e)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (distritosCompany != null)
                                    ? (distritosCompany.length === 0)
                                        ? <option value=''>No se cargaron los distritos</option>
                                        : distritosCompany.map(distrito => {
                                            return <option key={distrito.id} value={distrito.id}> {distrito.nombre} </option>
                                        })
                                    : <option value=''>No se cargaron los distritos</option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Otras Señas (Dirección)</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaLocationDot className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="1"
                            cols="50"
                            name='otrasSeñas'
                            disabled={disableInputs}
                            value={otrasSeñas}
                            onChange={e => handleInputChangeWithDispatch(e, SetOtrasSeñasCompany)}
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}
