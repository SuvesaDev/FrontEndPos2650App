import React from 'react';

import { BankIcons } from './BankIcons';
import { BankBody } from './BankBody';

export const BankPage = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Bancos</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-3">
                                    <BankBody />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <BankIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
