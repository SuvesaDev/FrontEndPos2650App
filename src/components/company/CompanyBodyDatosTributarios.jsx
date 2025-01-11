import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import {
    SetClaveCompany,
    SetContrasenaCertificadoCompany,
    SetFechaResolucionCompany,
    SetNameFileUploadCompany,
    SetNumeroResolucionCompany,
    SetUsuarioCompany,
    SetVisablePasswordHaciendaCompany
} from '../../actions/CompanyAction';
import { FaCalendar, FaEye, FaEyeSlash, FaKey, FaSortNumericDownAlt, FaUpload, FaUser } from 'react-icons/fa';

export const CompanyBodyDatosTributarios = () => {

    var inputFile = createRef(null);

    const dispatch = useDispatch();

    const { nameFileUploadCompany, empresa, disableInputs, visiblePasswordHacienda } = useSelector(state => state.company);

    const {
        usuario,
        clave,
        certificado,
        numeroResolucion,
        fechaResolucion,
        contrasenaCertificado
    } = empresa;

    const onClickButtonUploadFile = (e) => {

        if (!disableInputs) {
            inputFile.current.click();
        }

    }

    const onChangeInputFileName = (e) => {
        dispatch(SetNameFileUploadCompany(e.target.files[0].name));
    }

    const handleVisiblePassword = (e) => {

        if (!disableInputs) {
            e.preventDefault();
            dispatch(SetVisablePasswordHaciendaCompany(!visiblePasswordHacienda));
        }
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Usuario API Hacienda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Usuario del API de Hacienda"
                            name='usuario'
                            disabled={disableInputs}
                            value={usuario}
                            onChange={e => handleInputChangeWithDispatch(e, SetUsuarioCompany)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Clave API Hacienda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaKey className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Clave del API de Hacienda"
                            name='clave'
                            disabled={disableInputs}
                            value={clave}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveCompany)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Certificado</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUpload className="iconSize" />
                        </span>
                        <input
                            type="file"
                            ref={inputFile}
                            onChange={onChangeInputFileName}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Número Resolución Hacienda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSortNumericDownAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Número de Resolución de Hacienda"
                            name='numeroResolucion'
                            disabled={disableInputs}
                            value={numeroResolucion}
                            onChange={e => handleInputChangeWithDispatch(e, SetNumeroResolucionCompany)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Fecha Resolución Hacienda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            className="form-control"
                            name='fechaResolucion'
                            disabled={disableInputs}
                            value={fechaResolucion}
                            onChange={e => handleInputChangeWithDispatch(e, SetFechaResolucionCompany)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Contraseña Certificado</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaKey className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='numeroResolucion'
                            placeholder="Contraseña del Certificado"
                            type={(visiblePasswordHacienda) ? 'text' : 'password'}
                            disabled={disableInputs}
                            value={contrasenaCertificado}
                            onChange={e => handleInputChangeWithDispatch(e, SetContrasenaCertificadoCompany)}
                        />

                        <span
                            className={(disableInputs)
                                ? 'input-group-text disabled'
                                : 'input-group-text'
                            }
                            onClick={handleVisiblePassword}
                            style={{ cursor: "pointer" }}
                        >
                            {
                                (visiblePasswordHacienda)
                                    ?
                                    <FaEyeSlash
                                        className='iconSize'
                                    />
                                    : <FaEye
                                        className='iconSize'
                                    />
                            }
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
