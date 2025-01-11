import { useEffect } from 'react';
import { FaSearch, FaPercentage } from 'react-icons/fa';
import { FaPersonCircleExclamation, FaCalendarDays  } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { TbNumber, TbNotes } from "react-icons/tb";
import { LuBadgePercent } from "react-icons/lu";

import { 
    SetFechaEmisionCartaExoneracion,
    SetFechaVenceCartaExoneracion,
    SetImpuestoCartaExoneracion,
    SetMotivoCartaExoneracion, 
    SetNotaCartaExoneracion, 
    SetNumeroDocumentoCartaExoneracion,
    SetPorcentajeCompraCartaExoneracion,
    startSearchCartaExoneracion,
    startSearchExoneracionHacienda
} from '../../../actions/CartaExoneracionAction';

import { startGetAllTiposExoneracion } from '../../../actions/TiposExoneracionAction';

export const CustomersBodyCartaExoneracion = () => {

    const dispatch = useDispatch();
    const { carta } = useSelector( state => state.cartaExoneracion );
    const { tiposExoneracion } = useSelector( state => state.tiposExoneracion );
    const { disableInputs, isCustomerEdit, isCustomerDisable, customer, hasCartaExoneracion } = useSelector( state => state.customers );
    
    const {
        motivo, 
        numeroDocumento,
        fechaEmision,
        fechaVence,
        porcentajeCompra,
        impuesto,
        nota
    } = carta;

    useEffect(async () => {

        if(tiposExoneracion === null && disableInputs === false) {
            await dispatch( startGetAllTiposExoneracion() ); 
        }

        if(isCustomerEdit == false) {            
            var date = new Date();
            var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');
            dispatch( SetFechaEmisionCartaExoneracion(isoDateTime[0]) );
            dispatch( SetFechaVenceCartaExoneracion(isoDateTime[0]) );
        }

        if((isCustomerEdit || isCustomerDisable)
            && ( motivo === null || numeroDocumento === null || fechaEmision === null || fechaVence === null || porcentajeCompra === 0 || impuesto === 0)) {
            await dispatch( startSearchCartaExoneracion( customer.cedula ) );
        }

    }, [tiposExoneracion, isCustomerEdit, dispatch])
    
    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch( action(target.value) );
    };

    const handleExoneracionChange = ({ target }) => {

        if(target.value <= 13) {
            dispatch( SetPorcentajeCompraCartaExoneracion(target.value) )
            dispatch( SetImpuestoCartaExoneracion( 13 -  target.value) );
        }
    };

    const handleSearchExoneracion = (e) => {
        dispatch( startSearchExoneracionHacienda( numeroDocumento ) );
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3 mb-3">
                            <h5>Motivo Exoneracion</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                <FaPersonCircleExclamation  className="iconSize" />
                                </span>
                                <select 
                                name='motivo'
                                className='form-select'
                                disabled={ disableInputs }
                                value={ motivo }
                                onChange={ e => handleInputChangeWithDispatch(e, SetMotivoCartaExoneracion) }
                                >
                                    {
                                        (tiposExoneracion != null)
                                        ? tiposExoneracion.map( tipo => {
                                            return <option value={tipo.idTipoExoneracion}> { tipo.detalle } </option>
                                        })
                                        : <option value=''>No se cargaron los motivos</option>
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <h5>Número Documento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <TbNumber className="iconSize" />
                                </span>
                                <input 
                                    type='text' 
                                    name='numeroDocumento'
                                    className='form-control'
                                    placeholder='Número de Documento'
                                    disabled={ disableInputs }
                                    value={ numeroDocumento }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetNumeroDocumentoCartaExoneracion) }
                                />
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={handleSearchExoneracion}
                                    >
                                      <FaSearch className="iconSize" />
                                </button>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <h5>Fecha Emisión</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendarDays  className="iconSize" />
                                </span>
                                <input 
                                    type="date" 
                                    name="fechaEmision"
                                    className='form-control'
                                    disabled={ disableInputs }
                                    value={ fechaEmision }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetFechaEmisionCartaExoneracion) }
                                />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <h5>Fecha Vence</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendarDays  className="iconSize" />
                                </span>
                                <input 
                                    type="date" 
                                    name="fechaVence"
                                    className='form-control'
                                    disabled={ disableInputs }
                                    value={ fechaVence }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetFechaVenceCartaExoneracion) }
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row mb-0'>
                        <div className="col-md-2 mb-3">
                            <h5>Exoneración</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <LuBadgePercent  className="iconSize" />
                                </span>
                                <input 
                                    type='text' 
                                    name='porcentajeCompra' 
                                    className='form-control'
                                    disabled={ disableInputs }
                                    value={ porcentajeCompra }
                                    onChange={e => handleExoneracionChange(e)}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Impuesto Venta</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input 
                                    type='text' 
                                    name="impuesto"
                                    className='form-control'
                                    disabled={ true }
                                    value={ impuesto }
                                    onChange={e => handleExoneracionChange(e)}
                                />
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <h5>Breve descripcion de para que productos se debe aplicar</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <TbNotes className="iconSize" />
                                </span>
                                <input 
                                    type='text' 
                                    name="nota"
                                    className='form-control'
                                    disabled={ disableInputs }
                                    value={ nota }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetNotaCartaExoneracion) }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>

    )
}

// Display respaldo
    // <div className='customers_body-carta-main'>
            
    //     <div className='customers_body-carta-first-box'>

    //         <div className='customers_body-carta-first-box-cliente'>
        
    //             <div className='customers_body-carta-first-box-cliente-labelsInputs'>
    //                 <p id='lblCECliente'>Cliente</p>
    //                 <div className='customers_body-carta-first-box-cliente-labelsInputs-inputs'>
    //                     <input type='text' name='CEidCliente' id="txtCEidCliente"/>
    //                     <input type='text' name='CENombreCliente' id="txtCENombreCliente"/>
    //                 </div>
    //             </div>

    //             <div className='customers_body-carta-first-box-cliente-buttons'>
    //                 <button id='btnCEBuscarCliente'>Buscar Cliente</button>
    //             </div>

    //         </div>

    //         <div className='customers_body-carta-first-box-data'>
                
    //             <div className='customers_body-carta-first-box-data-firstLine'>
                    
    //                 <div className='customers_body-carta-first-box-data-firstLine-motivo'>
    //                     <p id='lblCEMotivo'>Motivo Exoneracion</p>
    //                     <select id='cboCEMotivo'>
    //                         <option value='0'>Compras Autorizadas</option>
    //                     </select>
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-firstLine-numeroDocumento'>
    //                     <p id='lblCEnumeroDocumento'>Numero Documento</p>
    //                     <div className='customers_body-carta-first-box-data-firstLine-numeroDocumento-inputs'>
    //                         <input type='text' name='CENumeroDocumento' id="txtCENumeroDocumento"/>
    //                         <BsFillCheckCircleFill id='btnCECheckDocumento'/>
    //                     </div>
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-firstLine-fechaEmision'>
    //                     <p id='lblCEfechaEmision'>Fecha Emision</p>
    //                     <input type="date" id="txtCEfechaEmision" name="fechaEmision"
    //                         min="01-01-2022" max="12-31-2022" />
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-firstLine-fechaVence'>
    //                     <p id='lblCEfechaVence'>Fecha Vence</p>
    //                     <input type="date" id="txtCEfechaVence" name="fechaVence"
    //                         min="01-01-2022" max="12-31-2022" />
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-firstLine-exoneracion'>
    //                     <p id='lblCEexoneracion'>Exoneracion</p>
    //                     <div className='customers_body-carta-first-box-data-firstLine-exoneracion-inputs'>
    //                         <p id='lblCEexoneracionPorcentaje'>%</p>
    //                         <input type='text' name='CEExoneracion' id="txtCEExoneracion"/>
    //                     </div>
    //                 </div>

    //             </div>

    //             <div className='customers_body-carta-first-box-data-secondLine'>

    //                 <div className='customers_body-carta-first-box-data-secondLine-IV'>
    //                     <p id='lblCEIV'>% IV</p>
    //                     <input type="text" id="txtCEIV" name="CEIV" />
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-secondLine-descripcion'>
    //                     <p id='lblCEDescripcion'>Breve descripcion de para que productos se debe aplicar</p>
    //                     <input type="text" id="txtCEDescripcion" name="CEDescripcion" />
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-secondLine-btnAgregarCarta'>
    //                     <button id='btnCEAgregarCarta'>Agregar Carta</button>
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-secondLine-btnEliminarCarta'>
    //                     <button id='btnCEEliminarCarta'>Eliminar Carta</button>
    //                 </div>

    //             </div>

    //         </div>

    //     </div>

    //     <div className='customers_body-carta-second-box'>
            
    //         <table className='customers_body-carta-second-box-table-main'>
    //             <thead>
    //                 <tr>
    //                     <th className='customers_body-carta-second-box-table-header-tipo'>Tipo Exoneracion</th>
    //                     <th className='customers_body-carta-second-box-table-header-numeroDocumento'>Numero Documento</th>
    //                     <th className='customers_body-carta-second-box-table-header-fechaEmision'>Fecha Emision</th>
    //                     <th className='customers_body-carta-second-box-table-header-fechaVence'>Fecha Vence</th>
    //                     <th className='customers_body-carta-second-box-table-header-porcentaje'>Porcentaje Compra</th>
    //                     <th className='customers_body-carta-second-box-table-header-impuesto'>Impuesto</th>
    //                     <th className='customers_body-carta-second-box-table-header-nota'>Nota</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <td className='customers_body-carta-second-box-table-tipo'>test</td>
    //                     <td className='customers_body-carta-second-box-table-numeroDocumento'>test</td>
    //                     <td className='customers_body-carta-second-box-table-fechaEmision'>test</td>
    //                     <td className='customers_body-carta-second-box-table-fechaVence'>test</td>
    //                     <td className='customers_body-carta-second-box-table-porcentaje'>test</td>
    //                     <td className='customers_body-carta-second-box-table-impuesto'>test</td>
    //                     <td className='customers_body-carta-second-box-table-nota'>test</td>
    //                 </tr>
    //             </tbody>
    //         </table>

    //     </div>

    // </div>
