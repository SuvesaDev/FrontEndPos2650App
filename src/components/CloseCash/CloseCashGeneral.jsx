import { useSelector } from "react-redux";

import { CloseCashGeneralTable } from "./CloseCashGeneralTable"

export const CloseCashGeneral = () => {

    const { cierreCaja } = useSelector(state => state.closeCash);

    const { detalleOperaciones } = cierreCaja;


    const columns = [
        {
            Header: "Forma Pago",
            accessor: "formaPago",
        },
        {
            Header: "Cajero",
            accessor: "cajero",
            Cell: ({ value, row }) => {
                if (value == null) {
                    return '';
                }
                const isDolares = [1, 3].includes(row.index);
                return isDolares
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
                    : new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);

            },
        },
        {
            Header: "Sistema",
            accessor: "sistema",
            Cell: ({ value, row }) => {
                if (value == null) {
                    return '';
                }
                const isDolares = [1, 3].includes(row.index);
                return isDolares
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
                    : new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);

            },
        },
    ];

    return (

        <>
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <h3>General</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-12 mb-3">
                            <CloseCashGeneralTable columns={columns} data={detalleOperaciones} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// OLD LAYOUT
{/* <div className='closeCash_general-inputs-titles'>
    <p id='lblCajeroCash'>Cajero</p>
    <p id='lblMedioCash'>/</p>
    <p id='lblSistemaCash'>Sistema</p>
</div>

<div className='closeCash_general-inputs-efectivoColones'>

    <div className='closeCash_general-inputs-efectivoColones-title'>
        <p>Efectivo Colones</p> 
    </div>
    <div className='closeCash_general-inputs-efectivoColones-inputs'>
        <input type='text' id='txtEfectivoColones1' name='efectivoColones1' value='0.00'/>
        <input type='text' id='txtEfectivoColones2' name='efectivoColones2' value='0.00'/>
    </div>

</div>

<div className='closeCash_general-inputs-efectivoDolares'>
    
    <div className='closeCash_general-inputs-efectivoDolares-title'>
        <p>Efectivo Dolares</p> 
    </div>
    <div className='closeCash_general-inputs-efectivoDolares-inputs'>
        <input type='text' id='txtefectivoDolares1' name='efectivoDolares1' value='0.00'/>
        <input type='text' id='txtefectivoDolares2' name='efectivoDolares2' value='0.00'/>
    </div>

</div>

<div className='closeCash_general-inputs-tarjetaColones'>
    
    <div className='closeCash_general-inputs-tarjetaColones-title'>
        <p>Tarjetas Colones</p>
    </div>
    <div className='closeCash_general-inputs-tarjetaColones-inputs'>
        <input type='text' id='txtTarjetaColones1' name='tarjetaColones1' value='0.00'/>
        <input type='text' id='txtTarjetaColones2' name='tarjetaColones2' value='0.00'/>
    </div>

</div>

<div className='closeCash_general-inputs-tarjetaDolares'>
    
    <div className='closeCash_general-inputs-tarjetaDolares-title'>
        <p>Tarjetas Dolares</p>
    </div>
    <div className='closeCash_general-inputs-tarjetaDolares-inputs'>
        <input type='text' id='txtTarjetaDolares1' name='tarjetaDolares1' value='0.00'/>
        <input type='text' id='txtTarjetaDolares2' name='tarjetaDolares2' value='0.00'/>
    </div>

</div>

<div className='closeCash_general-inputs-chequesColones'>
    
    <div className='closeCash_general-inputs-chequesColones-title'>
        <p>Cheques Colones</p>
    </div>
    <div className='closeCash_general-inputs-chequesColones-inputs'>
        <input type='text' id='txtChequesColones1' name='chequesColones1' value='0.00'/>
        <input type='text' id='txtChequesColones2' name='chequesColones2' value='0.00'/>
    </div>

</div>

<div className='closeCash_general-inputs-chequesDolares'>
    
    <div className='closeCash_general-inputs-chequesDolares-title'>
        <p>Cheques Dolares</p>
    </div>
    <div className='closeCash_general-inputs-chequesDolares-inputs'>
        <input type='text' id='txtChequesDolares1' name='chequesDolares1' value='0.00'/>
        <input type='text' id='txtChequesDolares2' name='chequesDolares2' value='0.00'/>
    </div>

</div>

<div className='closeCash_general-inputs-depositosColones'>
    
    <div className='closeCash_general-inputs-depositosColones-title'>
        <p>Depositos Colones</p>
    </div>
    <div className='closeCash_general-inputs-depositosColones-inputs'>
        <input type='text' id='txtDepositosColones1' name='depositosColones1' value='0.00'/>
        <input type='text' id='txtDepositosColones2' name='depositosColones2' value='0.00'/>
    </div>

</div>

<div className='closeCash_general-inputs-depositosDolares'>
    
    <div className='closeCash_general-inputs-depositosDolares-title'>
        <p>Depositos Dolares</p>
    </div>
    <div className='closeCash_general-inputs-depositosDolares-inputs'>
        <input type='text' id='txtDepositosDolares1' name='depositosDolares1' value='0.00'/>
        <input type='text' id='txtDepositosDolares2' name='depositosDolares2' value='0.00'/>
    </div>

</div>

<div className='closeCash_general-inputs-totales'>
    
    <div className='closeCash_general-inputs-totales-title'>
        <p id='lblTotalesCajeroCash'>Total Cajero</p>
        <p id='lblTotalesMedioCash'>/</p>
        <p id='lblTotalesSistemaCash'>Total Sistema</p>
    </div>
    
    <div className='closeCash_general-inputs-totales-inputs'>
        <input type='text' id='txttotalesCajero' name='totalesCajero' value='0.00'/>
        <input type='text' id='txttotalesSistema' name='totalesSistema' value='0.00'/>
    </div>

</div> */}

// OLD LAYOUT TABLE
{/* <table className='closeCash_general-table-main'>
    <thead>
        <tr>
            <th className='closeCash_general-table-header-formaPago'>Forma Pago</th>
            <th className='closeCash_general-table-header-cajero'>Cajero</th>
            <th className='closeCash_general-table-header-sistema'>Sistema</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td className='closeCash_general-table-formaPago'>test</td>
            <td className='closeCash_general-table-cajero'>test</td>
            <td className='closeCash_general-table-sistema'>test</td>
        </tr>
    </tbody>
</table> */}