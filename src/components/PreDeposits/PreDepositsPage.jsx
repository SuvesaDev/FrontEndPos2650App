import React from 'react'

import { PreDepositsIcons } from './PreDepositsIcons';
import { PreDepositsBody } from './PreDepositsBody';

export const PreDepositsPage = () => {
    return (


        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Pre Depósito</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <PreDepositsBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <PreDepositsIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
