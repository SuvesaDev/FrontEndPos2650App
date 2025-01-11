import React from 'react';

import { RepaymentIcons } from './RepaymentIcons';
import { RepaymentBodyGeneral } from './RepaymentBodyGeneral';
import { AiOutlineFieldNumber } from 'react-icons/ai';

export const RepaymentPage = () => {

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <div className="row">
                            <div className="col-md-2 mb-0">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <AiOutlineFieldNumber className="iconSize" />
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='numeroDevolucion'
                                        placeholder="Número de Devolucion"
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 mb-0"></div>
                            <div className="col-md-3 mb-0">
                                <h3>Devoluciones del Cliente</h3>
                            </div>
                            <div className="col-md-3 mb-0"></div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <RepaymentBodyGeneral />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <RepaymentIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}