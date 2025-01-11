import { useSelector } from 'react-redux';

import { ArqueoCashDesgloceTable } from "./ArqueoCashDesgloceTable"


export const ArqueoCashBodyDesgloceEfectivo = () => {

    const { arqueo } = useSelector(state => state.ArqueCash);
    const { efectivo } = arqueo;

    const colDenominaciones = [
        {
            Header: "Moneda",
            accessor: "Moneda",
        },
        {
            Header: "Tipo",
            accessor: "Tipo",
        },
        {
            Header: "Denominacion",
            accessor: "Monto",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),

        },
        {
            Header: "Cantidad",
            accessor: "Cantidad",
        },
        {
            Header: "Total",
            accessor: "Total",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        }
    ];

    return (

        <>
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <h3>Desgloce Efectivo</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-12 mb-0">
                            <ArqueoCashDesgloceTable columns={colDenominaciones} data={efectivo} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
