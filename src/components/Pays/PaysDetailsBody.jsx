

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { FaBuilding, FaFileAlt, FaPiggyBank, FaWallet } from "react-icons/fa"
import { FaMoneyBill } from "react-icons/fa6"
import { PaysDetailsTable } from './PaysDetailsTable';
import { format } from 'date-fns';
import { MdDeleteForever } from 'react-icons/md';

export const PaysDetailsBody = () => {

    const { abonos, moneda } = useSelector(state => state.pays);


    const validateCurrency = (value) => {
        if (moneda == 1) {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        } else if (moneda == 2) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        } else {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        }
    }

    const hasFecha = (obj) => obj.hasOwnProperty('fechaFactura') && obj.fechaFactura;
    let columnsBase = [
        {
            Header: "N° Factura",
            accessor: "factura",
        },
        {
            Header: "Monto Factura",
            accessor: "montoFactura",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "Saldo Anterior",
            accessor: "saldoAnt",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "Saldo Actual",
            accessor: "saldoActual",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "Monto Abono",
            accessor: "abono",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
    ];

    const hasAnyFecha = abonos.some(hasFecha);

    const columns = hasAnyFecha
        ? [
            {
                Header: "Fecha Factura",
                accessor: "fechaFactura",
                Cell: ({ value }) => value ? format(new Date(value), 'yyyy/MM/dd') : '',
            },
            ...columnsBase,
            {
                Header: "Acciones",
                accessor: "deleteRow",
                Cell: () => (
                    <button className='btn btn-danger'>
                        <MdDeleteForever className='iconSizeBtn' />
                    </button>
                ),
            },
        ]
        : [
            ...columnsBase,
            {
                Header: "Acciones",
                accessor: "deleteRow",
                Cell: () => (
                    <button className='btn btn-danger disabled'>
                        No Disponible
                    </button>
                ),
            },
        ];


    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <PaysDetailsTable
                        columns={columns}
                        data={abonos.lenght ? abonos : abonos}
                    />
                </div>
            </div>
        </>

    )
}
