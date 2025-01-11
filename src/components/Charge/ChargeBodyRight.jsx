import React from 'react'
import { useSelector } from 'react-redux';

import { ChargeBodyFormaPagoTable } from './ChargeBodyFormaPagoTable'
import { FaColonSign } from 'react-icons/fa6';

export const ChargeBodyRight = () => {

    let iconCoin = '₡';

    const {
        totalCobrar,
        entregado,
        cambio,
        preventa,
        isSearchPreventa,
        cobrar
    } = useSelector(state => state.charge);

    if (preventa.length > 0) {
        if (preventa[0].moneda === 'COLON') {
            iconCoin = '₡';
        } else {
            iconCoin = '$';
        }
    }

    const columns = [
        {
            Header: "Tipo Pago",
            accessor: "nombreFormaPago",
        },
        {
            Header: "Importe",
            accessor: "montoPago",
        }
    ];

    return (

        <>

            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header bg-primary cartaHMod2">
                        <h4>Formas de Pago</h4>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-2">
                                <ChargeBodyFormaPagoTable columns={columns} data={cobrar} />
                                <hr />
                                <div className='col-md-12 mb-2'>
                                    <div className="input-group" >
                                        <span className="input-group-text">
                                            A Cobrar: {' '}
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            disabled={true}
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(totalCobrar)
                                            }
                                        />
                                        <span className="input-group-text">
                                            <FaColonSign className='iconSize' />
                                        </span>
                                    </div>
                                </div>

                                <div className='col-md-12 mb-2'>
                                    <div className="input-group" >
                                        <span className="input-group-text">
                                            Entregado: {' '}
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            disabled={true}
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(entregado)
                                            }
                                        />
                                        <span className="input-group-text">
                                            <FaColonSign className='iconSize' />
                                        </span>
                                    </div>
                                </div>


                                <div className='col-md-12 mb-2'>
                                    <div className="input-group" >
                                        <span className="input-group-text">
                                            Cambio: {' '}
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            disabled={true}
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(cambio)
                                            }
                                        />
                                        <span className="input-group-text">
                                            <FaColonSign className='iconSize' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
