import { useSelector } from "react-redux";

import { CloseCashDetalleOperacionesTable } from "./CloseCashDetalleOperacionesTable"

export const CloseCashDetalleOperaciones = () => {

    const { cierreCaja } = useSelector(state => state.closeCash);

    const { opcionesDePagoCierreCajas } = cierreCaja;

    for (const opcionDePago of opcionesDePagoCierreCajas) {
        const monedaPago = opcionDePago.moneda;
        console.log(monedaPago);
      }

    const columns = [
        {
            Header: "Factura",
            accessor: "factura",
        },
        {
            Header: "Tipo",
            accessor: "tipo",
        },
        {
            Header: "Moneda",
            accessor: "moneda",
     
        },
        {
            Header: "Forma Pago",
            accessor: "formaPago",
        },
        {
            Header: "Pago",
            accessor: "pago",
            Cell: ({ value, row }) => {
                const monedaPago = row.original.moneda;
                const isColon = monedaPago === "COLON";
          
                return isColon
                  ? new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value)
                  : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
              },
        },
        {
            Header: "Equivalencia",
            accessor: "equivalencia",
            Cell: ({ value, row }) => {
                const monedaPago = row.original.moneda;
                const isColon = monedaPago === "COLON";
          
                return isColon
                  ? new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value)
                  : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
              },
        }
    ];
;

    return (

        <>
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <h3>Detalle de Operaciones</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-12 mb-3">
                            <CloseCashDetalleOperacionesTable columns={columns} data={opcionesDePagoCierreCajas} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

// OLD LAYOUT
{/* <div className='closeCash_detalleOperaciones-user'>
                
    <p id='lblUserCloseCash'>Usuario →</p>
    <input id='txtUserCloseCash' name='userCloseCash' type='text' />
    <p id='lblSistemaCloseCash'>SISTEMA</p>

</div> */}

// OLD LAYOUT TABLE
{/* <table className='closeCash_detalleOperaciones-table-main'>
    <thead>
        <tr>
            <th className='closeCash_detalleOperaciones-table-header-factura'>Factura</th>
            <th className='closeCash_detalleOperaciones-table-header-tipo'>Tipo</th>
            <th className='closeCash_detalleOperaciones-table-header-moneda'>Moneda</th>
            <th className='closeCash_detalleOperaciones-table-header-formaPago'>Forma Pago</th>
            <th className='closeCash_detalleOperaciones-table-header-pago'>Pago</th>
            <th className='closeCash_detalleOperaciones-table-header-equivalencia'>Equivalencia</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td className='closeCash_detalleOperaciones-table-factura'>test</td>
            <td className='closeCash_detalleOperaciones-table-tipo'>test</td>
            <td className='closeCash_detalleOperaciones-table-moneda'>test</td>
            <td className='closeCash_detalleOperaciones-table-formaPago'>test</td>
            <td className='closeCash_detalleOperaciones-table-pago'>test</td>
            <td className='closeCash_detalleOperaciones-table-equivalencia'>test</td>
        </tr>
    </tbody>
</table> */}