import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ChargeHeader } from './ChargeHeader'
import { ChargeBody } from './ChargeBody'
import { ChargeFooter } from './ChargeFooter'

export const ChargePage = () => {

    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Cobrar</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <ChargeHeader />
                                <hr />
                                <ChargeBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <ChargeFooter />
                    </div>
                </div>
            </div>
            <br />
        </>



    )
}
