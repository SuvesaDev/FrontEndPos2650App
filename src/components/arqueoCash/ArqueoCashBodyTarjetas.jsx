import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ArqueoCashTarjetasTable } from "./ArqueoCashTarjetasTable"

export const ArqueoCashBodyTarjetas = () => {

    const { arqueo } = useSelector(state => state.ArqueCash);
    const { tarjeta } = arqueo;


    const colTarjeta = [
        {
            Header: "Forma Pago",
            accessor: "Tarjeta",
        },
        {
            Header: "Moneda",
            accessor: "Moneda",
        },
        {
            Header: "Total",
            accessor: "Monto",
        }
    ];

    return (

        <>
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <h3>Detalle de Otras Formas de pagos</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-12 mb-0">
                            <ArqueoCashTarjetasTable columns={colTarjeta} data={tarjeta} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
