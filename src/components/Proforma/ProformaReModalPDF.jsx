import { useSelector, useDispatch } from 'react-redux';
import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useRef } from 'react';
import { TbCircleX } from 'react-icons/tb';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { FaBilibili, FaFileInvoice } from 'react-icons/fa6';
import { ProformaRePDF } from './ProformaRePDF';
import { SetCleanAllDatosPDFBudgets } from '../../actions/budgetsAction';


export const ProformaReModalPDF = () => {

    const dispatch = useDispatch();
    const {
        datosReporteImprimir,
    } = useSelector(state => state.budgets);
    // const handleLimpiarDatosProforma = (e) => {
    //     dispatch(SetCleanAllDatosPDFBudgets())
    // }

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         const modal = document.getElementById('modalReImprimirProforma');

    //         if (modal && !modal.contains(event.target)) {
    //             handleLimpiarDatosProforma();
    //         }
    //     };

    //     document.addEventListener('click', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);
    return (
        <>
            <div className="modal fade" id="modalReImprimirProforma">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Re-Imprimir Cotización <FaFileInvoice className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                // onClick={handleLimpiarDatosProforma}
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-12 mb-2">

                                    {datosReporteImprimir && Object.keys(datosReporteImprimir).length > 0 ? (
                                        <ProformaRePDF data={datosReporteImprimir} />
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
                                                        Cotización pendiente de cargar.
                                                    </p>
                                                </div>
                                            </div>
                                        </center>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                            {/* <button type="button" onClick={handleLimpiarDatosProforma} className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
