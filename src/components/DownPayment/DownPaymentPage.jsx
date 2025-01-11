import React from 'react'

import { DownPaymentIcons } from './DownPaymentIcons'
import { DownPaymentBody } from './DownPaymentBody'

export const DownPaymentPage = () => {
    return (

        <>

            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Entrega a Cuenta</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <DownPaymentBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <DownPaymentIcons />
                    </div>
                </div>
            </div>

        </>


    )
}
