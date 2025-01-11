

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { FaBuilding, FaFileAlt, FaPiggyBank, FaWallet } from "react-icons/fa"
import { FaMoneyBill } from "react-icons/fa6"
import { PaysBillingsTable } from './PaysBillingsTable';
import { format } from 'date-fns';

export const PaysBillingsBody = () => {

    const { facturasProveedor, codigoProveedor, cedulaProveedor, nombreProveedor, fecha } = useSelector(state => state.pays);

    const dataProve = {
        codigoProveedor: codigoProveedor,
        cedulaProveedor: cedulaProveedor,
        nombreProveedor: nombreProveedor,
        fecha: fecha,
    }
    const columns = [

        {
            Header: "Fecha",
            accessor: "fecha",
            Cell: ({ value }) => format(new Date(value), 'yyyy/MM/dd'),
        },
        {
            Header: "N° Factura",
            accessor: "idFactura",
        },
  
        , {
            Header: "Monto Factura",
            accessor: "montoFactura",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },

        , {
            Header: "Saldo Anterior",
            accessor: "saldoActual",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },
    ];
    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <PaysBillingsTable
                        columns={columns}
                        data={facturasProveedor.lenght ? facturasProveedor : facturasProveedor}
                        dataProveedor={dataProve}
                    />
                </div>
            </div>
        </>

    )
}
