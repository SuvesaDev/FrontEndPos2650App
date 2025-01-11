import { useSelector, useDispatch } from 'react-redux';
import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useRef } from 'react';
import { TbCircleX } from 'react-icons/tb';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { FaBilibili, FaFileInvoice } from 'react-icons/fa6';
import { CloseCashReporte } from './CloseCashReporte';
import { SetReporteCloseCash } from '../../actions/CloseCashAction';


export const CloseCashReporteModal = () => {

    const dispatch = useDispatch();
    const { tiqueteCierre } = useSelector(state => state.closeCash);
    const handleLimpiarReporte = (e) => {
        dispatch(SetReporteCloseCash(""))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.getElementById('modalReporteCierre');

            if (modal && !modal.contains(event.target)) {
                handleLimpiarReporte();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="modal fade" id="modalReporteCierre">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Imprimir Reporte Cierre de Caja <FaFileInvoice className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleLimpiarReporte}
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-12 mb-2">
                                    {/* {tiqueteCierre && Object.keys(tiqueteCierre).length > 0 ? (
                                        <CloseCashReporte data={tiqueteCierre} />
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
                                                        Reporte de Caja pendiente de generar.
                                                    </p>
                                                </div>
                                            </div>
                                        </center>
                                    )} */}

                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" onClick={handleLimpiarReporte} className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
