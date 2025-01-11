import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTruckFast } from 'react-icons/fa6';
import { IoIosCloseCircle } from "react-icons/io";
import { SetProveedoresDefaultWihoutPay } from '../../actions/countswihoutpay';
import { ProformaSeacrhModalTable } from './ProformaSeacrhModalTable';
import { count } from 'node-fpdf/src/PHP_CoreFunctions';
import { FaReceipt } from 'react-icons/fa';


export const ProformaSearchModal = () => {

    const dispatch = useDispatch();
    const {
        allCotizaciones,
    } = useSelector(state => state.budgets);

    const formattedCotizaciones = allCotizaciones.map(cotizacion => {
        const formattedDetalle = cotizacion.detalle.map(detalle => {
            const formattedDetalleKeys = Object.fromEntries(
                Object.entries(detalle).map(([key, value]) => [key.charAt(0).toUpperCase() + key.slice(1), value])
            );
            return formattedDetalleKeys;
        });
    
        const formattedCotizacionKeys = Object.fromEntries(
            Object.entries(cotizacion).map(([key, value]) => [key.charAt(0).toUpperCase() + key.slice(1), value])
        );
        formattedCotizacionKeys.detalle = formattedDetalle;
        return formattedCotizacionKeys;
    });

    const validateCurrency = (value, moneda) => {
        if (moneda == 1) {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        } else if (moneda == 2) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        } else {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        }
    }

    const columns = [
        {
            Header: "N° Cotización",
            accessor: "Cotizacion1",
        },
        {
            Header: "Cliente",
            accessor: "NombreCliente",
        },
        {
            Header: "Fecha",
            accessor: "FechaReporte",
        },
        {
            Header: "M.Descuento",
            accessor: "Descuento",
            Cell: ({ value, row }) => value ? validateCurrency(value, row.original.codMoneda) : validateCurrency(0, row.original.codMoneda),
        },
        {
            Header: "% IV",
            accessor: "ImpVenta",
            Cell: ({ value, row }) => value ? validateCurrency(value, row.original.codMoneda) : validateCurrency(0, row.original.codMoneda),
        },
        {
            Header: "Transporte",
            accessor: "Transporte",
            Cell: ({ value, row }) => value ? validateCurrency(value, row.original.codMoneda) : validateCurrency(0, row.original.codMoneda),
        },
        {
            Header: "Total",
            accessor: "Total",
            Cell: ({ value, row }) => value ? validateCurrency(value, row.original.codMoneda) : validateCurrency(0, row.original.codMoneda),
        },
        {
            Header: "N° Productos",
            accessor: "Detalle",
            Cell: ({ value }) => count(value),
        },
        {
            Header: "Anulada",
            accessor: "Anulado",
            Cell: ({ value }) => value ? "SI" : "NO"
        }
    ];
    

    return (
        <>
            <div className="modal fade" id="modalBuscarCotizaciones">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Cotización <FaReceipt className="iconSizeBtn" />
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
                                    <ProformaSeacrhModalTable
                                        columns={columns}
                                        data={formattedCotizaciones.length ? formattedCotizaciones : formattedCotizaciones}
                                    />
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
