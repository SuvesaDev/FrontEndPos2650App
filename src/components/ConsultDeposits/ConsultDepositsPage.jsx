import React from 'react'

import { ConsultDepositsIcons } from './ConsultDepositsIcons';
import { ConsultDepositsBody } from './ConsultDepositsBody';

export const ConsultDepositsPage = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Consulta Depósitos y Pre Depósitos</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <ConsultDepositsBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <ConsultDepositsIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
