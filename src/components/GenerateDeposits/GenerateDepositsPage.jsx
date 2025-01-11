import React from 'react'

import { GenerateDepositsIcons } from './GenerateDepositsIcons';
import { GenerateDepositsBody } from './GenerateDepositsBody';

export const GenerateDepositsPage = () => {
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Generar Depósito</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <GenerateDepositsBody />

                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <GenerateDepositsIcons />

                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
