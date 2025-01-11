import { useSelector, useDispatch } from 'react-redux';
import { ChargeTiqueteCaja, } from './ChargeTiqueteCaja';
import React, { useEffect } from 'react';
import { TbCircleX } from 'react-icons/tb';
import { AiFillExclamationCircle } from 'react-icons/ai';
import {FaFileInvoice } from 'react-icons/fa6';
import { SetTiqueteCajaCharge } from '../../actions/ChargeAction';


export const ChargeTicketModal = () => {

    const dispatch = useDispatch();
    const { tiquete } = useSelector(state => state.charge);
    const handleLimpiarFactura = (e) => {
        dispatch(SetTiqueteCajaCharge(""))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.getElementById('modalTiqueteVenta');

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
            <div className="modal fade" id="modalTiqueteVenta">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Imprimir Factura <FaFileInvoice className="iconSizeBtn" />
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
                                    {tiquete && Object.keys(tiquete).length > 0 ? (
                                        <ChargeTiqueteCaja data={tiquete} />
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
                                                        Factura pendiente de generar cobro.
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
