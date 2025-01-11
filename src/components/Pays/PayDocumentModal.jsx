import { useSelector, useDispatch } from 'react-redux';
import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useRef } from 'react';
import { TbCircleX } from 'react-icons/tb';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { FaBilibili, FaFileInvoice } from 'react-icons/fa6';
import { PayDocumentPDF } from './PayDocumentPDF';
import { SetDatosReciboImprimirPays, SetDatosSucursalPays } from '../../actions/pays';


export const PayDocumentModal = () => {
    const dispatch = useDispatch();
    const { datosReciboImprimir } = useSelector(state => state.pays);
    const handleLimpiarFactura = (e) => {
        dispatch(SetDatosReciboImprimirPays(""))
        dispatch(SetDatosSucursalPays(""))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.getElementById('modalImprimirReciboAbonoPagar');

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
            <div className="modal fade" id="modalImprimirReciboAbonoPagar">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Imprimir Recibo de Pago <FaFileInvoice className="iconSizeBtn" />
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
                                    {datosReciboImprimir && Object.keys(datosReciboImprimir).length > 0 ? (
                                        <PayDocumentPDF data={datosReciboImprimir} />
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
                                                        Pendiente de generar abono pagar.
                                                    </p>
                                                </div>
                                            </div>
                                        </center>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button"  onClick={handleLimpiarFactura} className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
