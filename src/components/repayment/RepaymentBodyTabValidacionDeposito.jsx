import React from 'react';
// import { useSelector } from "react-redux";

export const RepaymentBodyTabValidacionDeposito = () => {

    return (
        <div className='repayment_body-tab-validacion-deposito-main'>
            
            <div className='repayment_body-tab-validacion-deposito-firstLine'>
                
                <div className='repayment_body-tab-validacion-deposito-firstLine-cedula'>
                    
                    <div className='repayment_body-tab-validacion-deposito-firstLine-cedula-label'>
                        <p id='lblCedulaRepaymentBodyTabValidacionDeposito'>Cédula del Cliente</p>
                    </div>

                    <div className='repayment_body-tab-validacion-deposito-firstLine-cedula-input'>
                        <input id='txtCedulaRepaymentBodyTabValidacionDeposito'/>
                    </div>

                </div>

                <div className='repayment_body-tab-validacion-deposito-firstLine-nombre'>

                    <div className='repayment_body-tab-validacion-deposito-firstLine-nombre-label'>
                        <p id='lblNombreRepaymentBodyTabValidacionDeposito'>Nombre del Cliente</p>
                    </div>

                    <div className='repayment_body-tab-validacion-deposito-firstLine-nombre-input'>
                        <input id='txtNombreRepaymentBodyTabValidacionDeposito'/>
                    </div>

                </div>

            </div>

            <div className='repayment_body-tab-validacion-deposito-secondLine'>
                
                <div className='repayment_body-tab-validacion-deposito-secondLine-cuenta-label'>
                    <p id='lblCuentaRepaymentBodyTabValidacionDeposito'>Cuenta del Cliente</p>
                </div>

                <div className='repayment_body-tab-validacion-deposito-secondLine-cuenta-input'>
                    <input id='txtCuentaRepaymentBodyTabValidacionDeposito'/>
                </div>

            </div>

        </div>
    )
}


