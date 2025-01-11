import React from 'react';
// import { useSelector } from "react-redux";

export const RepaymentBodyTabValidacionAnticipio = () => {

    return (
        <div className='repayment_body-tab-validacion-anticipio-main'>
            
            <div className='repayment_body-tab-validacion-anticipio-btn'>
                <button id='btnBuscarClienteRepaymentBodyTabValidacion'>Buscar Cliente</button>
            </div>

            <div className='repayment_body-tab-validacion-anticipio-input'>
                
                <div className='repayment_body-tab-validacion-anticipio-input-nombre-label'>
                    <p id='lblNombreRepaymentBodyTabValidacionDeposito'>Nombre del Cliente</p>
                </div>

                <div className='repayment_body-tab-validacion-anticipio-input-nombre-input'>
                    <input id='txtNombreRepaymentBodyTabValidacionDeposito'/>
                </div>

            </div>

        </div>
    )
}


