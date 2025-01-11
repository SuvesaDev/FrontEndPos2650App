import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    SetAliasBranch,
    SetEmailBranch,
    SetNombreComercialBranch,
    SetNombreFiscalBranch,
    SetNumeroDocumentoBranch,
    SetTelefonoBranch,
    SetTipoDocumentoBranch
} from '../../actions/BranchAction';
import { MdLocalGroceryStore } from 'react-icons/md';
import { GiInjustice } from "react-icons/gi";
import { FaListOl, FaUser } from 'react-icons/fa6';
export const BranchBody = () => {

    const dispatch = useDispatch();

    const {
        surcursal,
        disableInputs
    } = useSelector(state => state.branch);
    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);

    const {
        nombreComercial,
        nombreFiscal,
        tipoDocumento,
        numeroDocumento,
        alias,
        telefono,
        email
    } = surcursal;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    return (
        <>
            <div className='container-fluid mt-3'>
                <div className="row mb-2 text-center">
                    <div className="col-md-3 mb-3">
                        <h5>Nombre Comercial</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <MdLocalGroceryStore className="iconSize" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Comercial"
                                name='nombreComercial'
                                disabled={disableInputs}
                                value={nombreComercial}
                                onChange={e => handleInputChangeWithDispatch(e, SetNombreComercialBranch)}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <h5>Nombre Fiscal</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <GiInjustice className="iconSize" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Fiscal"
                                name='nombreFiscal'
                                disabled={disableInputs}
                                value={nombreFiscal}
                                onChange={e => handleInputChangeWithDispatch(e, SetNombreFiscalBranch)}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <h5>Tipo Documento</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaListOl className="iconSize" />
                            </span>
                            <select
                                name='tipoDocumento'
                                className='form-select'
                                disabled={disableInputs}
                                value={tipoDocumento}
                                onChange={e => handleInputChangeWithDispatch(e, SetTipoDocumentoBranch)}
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

                    <div className="col-md-3 mb-3">
                        <h5>Número Documento</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <GiInjustice className="iconSize" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Número Documento"
                                name='numeroDocumento'
                                disabled={disableInputs}
                                value={numeroDocumento}
                                onChange={e => handleInputChangeWithDispatch(e, SetNumeroDocumentoBranch)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row mb-0 text-center">
                    <div className="col-md-4 mb-3">
                        <h5>Alias</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUser className="iconSize" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Alias"
                                name='alias'
                                disabled={disableInputs}
                                value={alias}
                                onChange={e => handleInputChangeWithDispatch(e, SetAliasBranch)}
                            />
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h5>Teléfono</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUser className="iconSize" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Teléfono"
                                name='telefono'
                                disabled={disableInputs}
                                value={telefono}
                                onChange={e => handleInputChangeWithDispatch(e, SetTelefonoBranch)}
                            />
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h5>Correo Electrónico</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUser className="iconSize" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo Electrónico"
                                name='email'
                                disabled={disableInputs}
                                value={email}
                                onChange={e => handleInputChangeWithDispatch(e, SetEmailBranch)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
