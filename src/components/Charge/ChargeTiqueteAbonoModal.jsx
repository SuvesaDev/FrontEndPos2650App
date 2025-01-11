
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { TbCircleX } from 'react-icons/tb';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { FaBilibili, FaFileInvoice } from 'react-icons/fa6';
import { CleanStateCharge, SetIsTiqueteAbonoCajaCharge, SetTiqueteAbonoCajaCharge } from '../../actions/ChargeAction';
import { ChargeTiqueteAbono } from './ChargeTiqueteAbono';


export const ChargeTiqueteAbonoModal = () => {

    const dispatch = useDispatch();
    const { tiqueteAbono } = useSelector(state => state.charge);
    const handleLimpiarAbono = (e) => {
        dispatch(SetTiqueteAbonoCajaCharge(""))
        dispatch(SetIsTiqueteAbonoCajaCharge(false))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.getElementById('modalTiqueteAbono');

            if (modal && !modal.contains(event.target)) {
                handleLimpiarAbono();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="modal fade" id="modalTiqueteAbono">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Imprimir Factura <FaFileInvoice className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleLimpiarAbono}
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-12 mb-2">
                                    {tiqueteAbono && Object.keys(tiqueteAbono).length > 0 ? (
                                         <ChargeTiqueteAbono data={tiqueteAbono} />
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
                            <button type="button" onClick={handleLimpiarAbono} className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
