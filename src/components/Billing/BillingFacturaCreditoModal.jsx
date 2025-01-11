import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { TbCircleX } from 'react-icons/tb';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { FaBilibili, FaFileInvoice } from 'react-icons/fa6';
import { BillingFacturaCreditoReporte } from './BillingFacturaCreditoReporte';
import { SetDatosImprimirCreditoBilling } from '../../actions/billing';

Modal.setAppElement('#root');

export const BillingFacturaCreditoModal = () => {

    const dispatch = useDispatch();
    const { datosImprimirCredito } = useSelector(state => state.billing);
    const handleLimpiarFactura = (e) => {
        dispatch(SetDatosImprimirCreditoBilling(""))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.getElementById('modalTiqueteVentaCredito');

            if (modal && !modal.contains(event.target)) {
                handleLimpiarFactura();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="modal fade" id="modalTiqueteVentaCredito">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Imprimir Factura Crédito <FaFileInvoice className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleLimpiarFactura}
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-12 mb-2">
                                    {datosImprimirCredito && Object.keys(datosImprimirCredito).length > 0 ? (
                                        <BillingFacturaCreditoReporte data={datosImprimirCredito} />
                                    ) : (
                                        <center>
                                            <div className="toast show">
                                                <div className={"card-header toast-warning"}>
                                                    <strong className="me-auto">
                                                        2650 Informa <AiFillExclamationCircle className="iconSize" />
                                                    </strong>
                                                </div>
                                                <div className="toast-body">
                                                    <p className="text-danger">
                                                        Factura crédito pendiente de registrar.
                                                    </p>
                                                </div>
                                            </div>
                                        </center>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" onClick={handleLimpiarFactura} className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
