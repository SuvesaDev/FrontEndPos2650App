import { useSelector, useDispatch } from 'react-redux';
import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useRef } from 'react';
import { TbCircleX } from 'react-icons/tb';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { FaBilibili, FaFileInvoice } from 'react-icons/fa6';
import { ProformaPDF } from './ProformaPDF';
import { SetCleanAllDatosPDFBudgets } from '../../actions/budgetsAction';


export const ProformaModalPDF = () => {

    const dispatch = useDispatch();
    const {
        datosReporte,
    } = useSelector(state => state.budgets);
    const handleLimpiarDatosProforma = (e) => {
        dispatch(SetCleanAllDatosPDFBudgets())
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.getElementById('modalImprimirProforma');

            if (modal && !modal.contains(event.target)) {
                handleLimpiarDatosProforma();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="modal fade" id="modalImprimirProforma">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Imprimir Cotización <FaFileInvoice className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleLimpiarDatosProforma}
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-12 mb-2">

                                    {datosReporte && Object.keys(datosReporte).length > 0 ? (
                                        <ProformaPDF data={datosReporte} />
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
                                                        Cotización pendiente de generar.
                                                    </p>
                                                </div>
                                            </div>
                                        </center>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" onClick={handleLimpiarDatosProforma} className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
