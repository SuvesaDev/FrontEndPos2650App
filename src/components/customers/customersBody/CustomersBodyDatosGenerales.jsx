import { useDispatch, useSelector } from "react-redux";

import {
  FaPhone,
  FaLocationDot,
  FaLocationCrosshairs,
  FaLocationArrow,
  FaMapLocationDot,
  FaPersonCircleQuestion,
  FaPercent,
  FaUser
} from "react-icons/fa6";
import { TbMailDollar } from "react-icons/tb"; 
import { MdAttachEmail, MdPriceChange, MdMarkEmailUnread, MdOutlineChangeCircle  } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";

import {
  SetActualizadoCustomers,
  SetAgenteCustomers,
  SetCantonCustomers,
  SetCorreocuentasCustomers,
  SetCorreoFacturacionCustomers,
  SetCorreoReciboCustomers,
  SetDescuentoEspecialCustomers,
  SetDireccionCustomers,
  SetDisableCantonesCustomers,
  SetDisableDistritosCustomers,
  SetDistritoCustomers,
  SetEnviaReciboCustomers,
  SetFallecidoCustomers,
  SetFaxCustomers,
  SetInactivoCustomers,
  SetMagCustomers,
  SetNombreFantasiaCustomers,
  SetProvinciaCustomers,
  SetSinAgenteCustomers,
  SetTelefonoCustomers,
  SetTipoClienteCustomers,
  SetTipoPrecioCustomers,
  SetVariasSurcursalesCustomers,
  startGetAllCantones,
  startGetAllDistritos,
} from "../../../actions/customers";

export const CustomersBodyDatosGenerales = () => {
  const dispatch = useDispatch();
  const { agentesBilling } = useSelector((state) => state.agenteVentas);
  const { provincias } = useSelector((state) => state.provincias);
  const {
    customer,
    disableInputs,
    provinciasCustomers,
    cantonesCustomers,
    distritosCustomers,
    disableCantones,
    disableDistritos,
    sinAgente,
    variasSurcursales
  } = useSelector((state) => state.customers);

  const { auth } = useSelector((state) => state.login);
  const { costaPets } = auth;

  const {
    telefono,
    fax,
    provincia,
    canton,
    distrito,
    direccion,
    correocuentas,
    correoFacturacion,
    tipoCliente,
    agente,
    actualizado,
    fallecido,
    enviaRecibo,
    correoRecibo,
    tipoPrecio,
    descuentoEspcial,
    inactivo,
    mag,
    nombreFantasia
  } = customer;

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleChangeProvincia = ({ target }) => {
    const idProvincia = parseInt(target.value);

    //Se resetea el valor de canton
    dispatch(SetCantonCustomers(""));

    //Se desactiva los distritos
    dispatch(SetDisableDistritosCustomers(true));

    //Se cambia el valor en el estado de la provincia
    dispatch(SetProvinciaCustomers(idProvincia));

    //Se activa el combo de cantones
    dispatch(SetDisableCantonesCustomers(false));

    //Se obtiene los cantones de esa provincia
    dispatch(startGetAllCantones(idProvincia));
  };

  const handleChangeCanton = ({ target }) => {
    const idCanton = parseInt(target.value);

    //Se resetea el valor de distrito
    dispatch(SetDistritoCustomers(""));

    //Se cambia el valor en el estado del canton
    dispatch(SetCantonCustomers(idCanton));

    //Se activa el combo de distritos
    dispatch(SetDisableDistritosCustomers(false));

    //Se obtiene los distritos de ese canton
    dispatch(startGetAllDistritos(idCanton));
  };

  const handleChangeDistrito = ({ target }) => {
    const idDistrito = parseInt(target.value);

    //Se cambia el valor en el estado del canton
    dispatch(SetDistritoCustomers(idDistrito));
  };

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    dispatch(action(target.checked));
  };

  return (
<>
    <div className="card">
        <div className="card-body">

            <div className="row mb-3">
                <div className="col-md-3 mb-3">
                    <h5>Teléfono</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                        <FaPhone className="iconSize" />
                        </span>
                        <input
                        type="text"
                        name="telefono"
                        className="form-control"
                        disabled={disableInputs}
                        value={telefono}
                        placeholder="Número de Teléfono"
                        onChange={(e) =>
                            handleInputChangeWithDispatch(e, SetTelefonoCustomers)
                        }
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Provincia</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                        <FaLocationDot className="iconSize" />
                        </span>
                        <select
                        name="provincia"
                        className="form-select"
                        disabled={disableInputs}
                        value={provincia}
                        onChange={(e) => handleChangeProvincia(e)}
                        >
                        <option value="" selected disabled hidden>
                            {" "}
                            Seleccione...{" "}
                        </option>
                        {provincias != null ? (
                            provincias.length === 0 ? (
                            <option value="">No se cargaron las provincias</option>
                            ) : (
                            provincias.map((provincia) => {
                                return (
                                <option key={provincia.id} value={provincia.id}>
                                    {" "}
                                    {provincia.nombre}{" "}
                                </option>
                                );
                            })
                            )
                        ) : (
                            <option value="">No se cargaron las provincias</option>
                        )}
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Cantón</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                        <FaLocationCrosshairs className="iconSize" />
                        </span>
                        <select
                        name="canton"
                        disabled={disableCantones}
                        value={canton}
                        className="form-select"
                        onChange={(e) => handleChangeCanton(e)}
                        >
                        <option value="" selected disabled hidden>
                            {" "}
                            Seleccione...{" "}
                        </option>
                        {cantonesCustomers != null ? (
                            cantonesCustomers.length === 0 ? (
                            <option value="">No se cargaron los cantones</option>
                            ) : (
                            cantonesCustomers.map((canton) => {
                                return (
                                <option key={canton.id} value={canton.id}>
                                    {" "}
                                    {canton.nombre}{" "}
                                </option>
                                );
                            })
                            )
                        ) : (
                            <option value="">No se cargaron los cantones</option>
                        )}
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Distrito</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                        <FaLocationArrow className="iconSize" />
                        </span>
                        <select
                        name="distrito"
                        disabled={disableDistritos}
                        value={distrito}
                        className="form-select"
                        onChange={(e) => handleChangeDistrito(e)}
                        >
                        <option value="" selected disabled hidden>
                            {" "}
                            Seleccione...{" "}
                        </option>
                        {distritosCustomers != null ? (
                            distritosCustomers.length === 0 ? (
                            <option value="">No se cargaron los distritos</option>
                            ) : (
                            distritosCustomers.map((distrito) => {
                                return (
                                <option key={distrito.id} value={distrito.id}>
                                    {" "}
                                    {distrito.nombre}{" "}
                                </option>
                                );
                            })
                            )
                        ) : (
                            <option value="">No se cargaron los distritos</option>
                        )}
                        </select>
                    </div>
                </div>
            </div>

            <div className="row mb-3">

                <div className="col-md-9 mb-3">
                    <h5>Dirección</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMapLocationDot  className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="direccion"
                            className="form-control"
                            disabled={disableInputs}
                            value={direccion}
                            placeholder="Dirección del Cliente"
                            onChange={(e) =>
                            handleInputChangeWithDispatch(e, SetDireccionCustomers)
                            }
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="checkVariasSurcursales"
                            name="variasSurcursales"
                            class="form-check-input checkP"
                            disabled={disableInputs}
                            checked={variasSurcursales}
                            onChange={(e) =>
                                handleInputChangeCheckBoxWithDispatch(
                                    e,
                                    SetVariasSurcursalesCustomers
                                )
                            }
                        />
                        <h5 className="form-check-label" for="checkVariasSurcursales">Varias Surcursales</h5>
                    </div>
                    { (!variasSurcursales) 
                        ?   <div className="input-group">
                                <span className="input-group-text">
                                    <FaUser className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    disabled={disableInputs}
                                    value={nombreFantasia}
                                    placeholder="Nombre del Cliente Fantasía"
                                    onChange={(e) =>
                                        handleInputChangeWithDispatch(e, SetNombreFantasiaCustomers)
                                    }
                                />
                            </div>
                        : null
                    }
                    
                </div>
            </div>
            
            <div className="row mb-3">
                <div className="col-md-4 mb-3">
                    <h5>Correo Cuentas por Cobrar</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbMailDollar className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="correocuentas"
                            className="form-control"
                            disabled={disableInputs}
                            value={correocuentas}
                            placeholder="Correo de Cobros"
                            onChange={(e) =>
                                handleInputChangeWithDispatch(e, SetCorreocuentasCustomers)
                            }
                         />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Correo Facturacion Electronica</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <MdAttachEmail className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="correoFacturacion"
                            className="form-control"
                            disabled={disableInputs}
                            value={correoFacturacion}
                            placeholder="Correo de Facturación"
                            onChange={(e) =>
                              handleInputChangeWithDispatch(
                                e,
                                SetCorreoFacturacionCustomers
                              )
                            }
                         />
                    </div>
                </div>
                
                <div className="col-md-4 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="checkEnviaCorreo"
                            name="enviaRecibo"
                            class="form-check-input checkP"
                            disabled={disableInputs}
                            checked={enviaRecibo}
                            onChange={(e) =>
                                handleInputChangeCheckBoxWithDispatch(
                                e,
                                SetEnviaReciboCustomers
                                )
                            }
                        />
                        <h5 className="form-check-label" for="checkEnviaCorreo">¿Enviar Recibo al Correo?</h5>
                    </div>
                    {enviaRecibo ? (
                    <div className="input-group">
                        <span className="input-group-text">
                            <MdMarkEmailUnread  className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="correoRecibo"
                            disabled={disableInputs}
                            value={correoRecibo}
                            className="form-control"
                            placeholder="Correo de Recibos"
                            onChange={(e) =>
                            handleInputChangeWithDispatch(e, SetCorreoReciboCustomers)
                            }
                        />
                    </div>

                    ) : (
                    <div></div>
                    )}
                </div>
            </div>

            <div className={ costaPets ? 'row mb-3 d-none' : 'row mb-3' }>
                
                <div className="col-md-3 mb-3">
                    <h5>Tipo Cliente</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                        <FaPersonCircleQuestion  className="iconSize" />
                        </span>
                        <select
                        name="tipo"
                        disabled={disableInputs}
                        value={tipoCliente}
                        className="form-select"
                        onChange={(e) =>
                            handleInputChangeWithDispatch(e, SetTipoClienteCustomers)
                        }
                        >
                        <option value="" selected disabled hidden>
                            {" "}
                            Seleccione...{" "}
                        </option>
                        <option value="2">Fisico</option>
                        <option value="3">Juridico</option>
                        <option value="4">DIMEX</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="inline-container">
                        <h5>Agente Asignado</h5>
                        <div className="form-check">
                            <input
                            type="checkbox"
                            id="checkSinAgente"
                            name="sinAgente"
                            class="form-check-input checkP"
                            disabled={disableInputs}
                            checked={sinAgente}
                            onChange={(e) =>
                                handleInputChangeCheckBoxWithDispatch(
                                e,
                                SetSinAgenteCustomers
                                )
                            }
                            />
                            <h5 className="form-check-label" for="checkSinAgente">Sin Agente</h5>
                        </div>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                        <BsPersonLinesFill  className="iconSize" />
                        </span>
                        <select
                        name="agente"
                        disabled={disableInputs ? disableInputs : sinAgente}
                        value={agente}
                        className="form-select"
                        onChange={(e) =>
                            handleInputChangeWithDispatch(e, SetAgenteCustomers)
                        }
                        >
                        <option value="" selected disabled hidden>
                            {" "}
                            Seleccione...{" "}
                        </option>
                        {agentesBilling != null ? (
                            agentesBilling.length === 0 ? (
                            <option value="">No se cargaron los agentes</option>
                            ) : (
                            agentesBilling.map((agente) => {
                                return (
                                <option key={agente.id} value={agente.id}>
                                    {" "}
                                    {agente.name}{" "}
                                </option>
                                );
                            })
                            )
                        ) : (
                            <option value="">No se cargaron los agentes</option>
                        )}
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Tipo Precio</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                        <MdPriceChange className="iconSize" />
                        </span>
                        <select
                            name="tipoPrecio"
                            disabled={disableInputs}
                            value={tipoPrecio}
                            className="form-select"
                            onChange={(e) =>
                            handleInputChangeWithDispatch(e, SetTipoPrecioCustomers)
                            }
                        >
                            <option value="" selected disabled hidden>
                            {" "}
                            Seleccione...{" "}
                            </option>
                            <option value="1">Precio A</option>
                            <option value="2">Precio B</option>
                            <option value="3">Precio C</option>
                            <option value="4">Precio D</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Descuentos Especiales</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPercent  className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="descuento"
                            className="form-control"
                            disabled={disableInputs}
                            value={descuentoEspcial}
                            placeholder="Porcentaje de Descuento"
                            onChange={(e) =>
                                handleInputChangeWithDispatch(
                                e,
                                SetDescuentoEspecialCustomers
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            <div className={ costaPets ? 'row mb-0 d-none' : 'row mb-0' }>
                <div className="col-md-3 mb-3">
                    <div className="inline-container">
                        <div className="form-check">
                            <input
                            type="checkbox"
                            id="checkInactivado"
                            name="inactivo"
                            class="form-check-input checkP"
                            disabled={disableInputs}
                            checked={inactivo}
                            onChange={(e) =>
                            handleInputChangeCheckBoxWithDispatch(
                                e,
                                SetInactivoCustomers
                            )
                            }
                            />
                            <h5 className="form-check-label" for="checkInactivado">Inactivado</h5>
                        </div>
                        <button className="btn btn-secondary">Cambiar <MdOutlineChangeCircle  className="iconSizeBtn" /></button>
                    </div>
                    <hr />
                </div>
          
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                        type="checkbox"
                        id="checkRegistradoMAG"
                        name="mag"
                        class="form-check-input checkP"
                        disabled={disableInputs}
                        checked={mag}
                        onChange={(e) =>
                            handleInputChangeCheckBoxWithDispatch(e, SetMagCustomers)
                        }
                        />
                        <h5 className="form-check-label" for="checkRegistradoMAG">Esta Registrado en el MAG</h5>
                    </div>
                    <hr />
                </div>
                
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                        type="checkbox"
                        id="checkActualizado"
                        name="actualizado"
                        class="form-check-input checkP"
                        disabled={disableInputs}
                        checked={actualizado}
                        onChange={(e) =>
                            handleInputChangeCheckBoxWithDispatch(
                            e,
                            SetActualizadoCustomers
                            )
                        }
                        />
                        <h5 className="form-check-label" for="checkActualizado">Actualizado</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                        type="checkbox"
                        id="checkFallecido"
                        name="fallecido"
                        class="form-check-input checkP"
                        disabled={disableInputs}
                        checked={fallecido}
                        onChange={(e) =>
                            handleInputChangeCheckBoxWithDispatch(
                            e,
                            SetFallecidoCustomers
                            )
                        }
                        />
                        <h5 className="form-check-label" for="checkFallecido">Fallecido</h5>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </div>

  
</>
  );
};
