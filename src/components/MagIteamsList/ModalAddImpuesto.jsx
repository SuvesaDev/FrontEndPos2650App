import { useDispatch, useSelector } from 'react-redux';
import { FaPercentage } from 'react-icons/fa';
import { TbCircleX ,TbCircleCheck } from 'react-icons/tb';

export const ModalAddImpuesto = () => {

    const dispatch = useDispatch();
    const { modalAddImpuestoOpen } = useSelector(state => state.magIteamsList);

    return (
        <>
            <div className="modal fade" id="modalNuevoImpuesto">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center">
                                Selecciones el Nuevo Impuesto <FaPercentage className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center">
                                <div className="col-md-12 mb-3">
                                    <h5>Nuevo Impuesto</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                        >
                                            <option value="" selected disabled hidden>
                                                {" "}
                                                Seleccione...{" "}
                                            </option>
                                            <option value='1'>Impuesto 1</option>
                                            <option value='2'>Impuesto 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Cambiar Impuesto <TbCircleCheck className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}