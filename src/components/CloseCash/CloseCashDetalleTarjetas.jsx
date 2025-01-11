import { useSelector } from "react-redux";

import { CloseCashDetalleTarjetasTable } from "./CloseCashDetalleTarjetasTable"

export const CloseCashDetalleTarjetas = () => {

    const { cierreCaja } = useSelector(state => state.closeCash);

    const { detalleFormasPago } = cierreCaja;

    const columns = [
        {
            Header: "Tarjeta",
            accessor: "descripcion",
        },
        {
            Header: "Moneda",
            accessor: "moneda",
        },
        {
            Header: "Total Cajero",
            accessor: "totalCajero",
        },
        {
            Header: "Total Sistema",
            accessor: "totalsistema",
        }
    ];

    return (


        <>
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <h3>Detalles Tarjetas de Crédito</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-12 mb-3">
                            <CloseCashDetalleTarjetasTable columns={columns} data={detalleFormasPago} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

// OLD LAYOUT
{/* <table className='closeCash_detalleTarjetas-table-main'>
    <thead>
        <tr>
            <th className='closeCash_detalleTarjetas-table-header-tarjeta'>Tarjeta</th>
            <th className='closeCash_detalleTarjetas-table-header-moneda'>Moneda</th>
            <th className='closeCash_detalleTarjetas-table-header-totalCajero'>Total Cajero</th>
            <th className='closeCash_detalleTarjetas-table-header-totalSistema'>Total Sistema</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td className='closeCash_detalleTarjetas-table-tarjeta'>TARJETA COLONES</td>
        <td className='closeCash_detalleTarjetas-table-moneda'>COLON</td>
        <td className='closeCash_detalleTarjetas-table-totalCajero'>0.00</td>
        <td className='closeCash_detalleTarjetas-table-totalSistema'>0.00</td>
    </tr>
    </tbody>
</table> */}