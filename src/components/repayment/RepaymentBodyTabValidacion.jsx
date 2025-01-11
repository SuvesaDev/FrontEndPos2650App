import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { RepaymentBodyTabValidacionEfectivo } from './RepaymentBodyTabValidacionEfectivo';
import { RepaymentBodyTabValidacionDeposito } from './RepaymentBodyTabValidacionDeposito';
import { RepaymentBodyTabValidacionAnticipio } from './RepaymentBodyTabValidacionAnticipio';


export const RepaymentBodyTabValidacion = () => {

    const dispatch = useDispatch();

    const { allPersonal } = useSelector(state => state.repayment);

    return (
        <div className='repayment_body-tab-validacion-main'>

            <div className='repayment_body-tab-validacion-user'>
                
                <div className='repayment_body-tab-validacion-user-title'>
                    <p id='lblTitleUserRepaymentBodyTabValidation'>Usuario</p>
                </div>

                <div className='repayment_body-tab-validacion-user-usuario'>
                    
                    <div className='repayment_body-tab-validacion-user-usuario-title'>
                        <p id='lblTitleUsuarioRepaymentBodyTabValidation'>Seleccionar Usuario recibo devolución</p>
                    </div>

                    <div className='repayment_body-tab-validacion-user-usuario-input'>
                        <select
                            id='cboUsuarioRepaymentBodyTabValidation'
                        >
                            <option value='' selected disabled hidden> Seleccione... </option>
                                {

                                    (allPersonal != null)
                                        ? (allPersonal.length === 0)
                                            ? <option value=''>No se cargaron el personal</option>
                                            : allPersonal.map(personal => {
                                                return <option key={personal.idPersonal} value={personal.idPersonal}> {personal.nombrePersonal} </option>
                                            })
                                        : <option value=''>No se cargaron el personal</option>

                                }
                        </select>
                    </div>

                </div>

                <div className='repayment_body-tab-validacion-user-observaciones'>
                    
                    <div className='repayment_body-tab-validacion-user-observaciones-title'>
                        <p id='lblTitleObservacionesRepaymentBodyTabValidation'>Observaciones</p>
                    </div>

                    <div className='repayment_body-tab-validacion-user-observaciones-opciones'>
                        
                        <div className='repayment_body-tab-validacion-user-observaciones-opciones-opcion1'>
                            <button id='btnOpcion1RepaymentBodyTabValidacion'>
                                Refacturacion
                            </button>
                        </div>

                        <div className='repayment_body-tab-validacion-user-observaciones-opciones-opcion2'>
                            <button id='btnOpcion2RepaymentBodyTabValidacion'>
                                Sin Existencia
                            </button>
                        </div>

                        <div className='repayment_body-tab-validacion-user-observaciones-opciones-opcion3'>
                            <button id='btnOpcion3RepaymentBodyTabValidacion'>
                                Cambio por Otro
                            </button>
                        </div>

                    </div>

                    <div className='repayment_body-tab-validacion-user-observaciones-input'>
                        <textarea id="txtObservacionesRepaymentBodyTabValidacion"/>
                    </div>

                </div>

            </div>

            <div className='repayment_body-tab-validacion-tipo'>
                
                <div className='repayment_body-tab-validacion-tipo-title'>
                    <p id='lblTitleTipoDevolucionesRepaymentBodyTabValidacion'>Tipo de Devolución</p>
                </div>

                <div className='repayment_body-tab-validacion-tipo-tabs'>
                    
                    <div className='repayment_body-tab-validacion-tipo-tabs-efectivo'>
                        <button className='btnEfectivoRepaymentBodyTabValidacion'>Efectivo</button>
                    </div>

                    <div className='repayment_body-tab-validacion-tipo-tabs-deposito'>
                        <button className='btnDepositoRepaymentBodyTabValidacion'>Deposito</button>
                    </div>

                    <div className='repayment_body-tab-validacion-tipo-tabs-anticipio'>
                        <button className='btnAnticipioRepaymentBodyTabValidacion'>Anticipio</button>
                    </div>

                </div>

                <div className='repayment_body-tab-validacion-tipo-contenido'>
                    <RepaymentBodyTabValidacionAnticipio />
                </div>

            </div>

        </div>
    )
}


