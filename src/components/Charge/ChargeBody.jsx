import React from 'react'
import { ChargeBodyLeft } from './ChargeBodyLeft'
import { ChargeBodyRight } from './ChargeBodyRight'

export const ChargeBody = () => {

    return (
        <>
            <div className="row mb-0 text-center" >
                <div className="col-md-8 mb-0">
                    <ChargeBodyLeft />

                </div>
                <div className="col-md-4 mb-0">
                    <ChargeBodyRight />
                </div>
            </div>
        </>

    )
}
