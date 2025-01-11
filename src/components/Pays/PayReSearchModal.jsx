import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { PayReSearchModalTable } from './PayReSearchModalTable';
import { SetAbonosHechosDefaultPays, SetAllProveedoresFacturasDefaultPays, startGetAllBancosPays } from '../../actions/pays';
import { FaMoneyBill, FaTruckFast } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';
import { format } from 'date-fns';

export const PayReSearchModal = () => {

    const dispatch = useDispatch();

    const { abonosHechos, abonosHechosDefault } = useSelector(state => state.pays);


    useEffect(() => {
        if (abonosHechos != null) {
            dispatch(SetAbonosHechosDefaultPays(abonosHechos))
        }
    }, [abonosHechos])

    const validateCurrency = (value, moneda) => {
        if (moneda === 1) {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        } else if (moneda === 2) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        } else {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        }
    };
 

    const columns = [
        {
            Header: "Fecha Abono",
            accessor: "fecha",
            Cell: ({ value }) => value ? value.replace('T', ' ') : '',
        },
        {
            Header: "Abono Pagar Nº",
            accessor: "documento",
        },
        {
            Header: "Monto Abono",
            accessor: "monto",
            Cell: ({ value, row }) => value ? validateCurrency(value, row.original.codMoneda) : validateCurrency(0, row.original.codMoneda),
        },
        {
            Header: "Tipo Documento",
            accessor: "tipoDocumento",
        },
        {
            Header: "Nº Recibo",
            accessor: "recibo",
        },
    ];
    
    return (

        <>
            <div className="modal fade" id="modalBuscarAbonosPagar">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Abono Pagar <FaMoneyBill  className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <PayReSearchModalTable columns={columns}
                                        data={abonosHechos.length ? abonosHechos : abonosHechosDefault} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Cerrar <IoIosCloseCircle className="iconSize" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}