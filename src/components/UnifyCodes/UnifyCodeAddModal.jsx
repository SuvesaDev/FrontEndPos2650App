import { useDispatch, useSelector } from 'react-redux';
import { FaHashtag, FaShop } from 'react-icons/fa6';
import { TbCircleCheck, TbCircleLetterB, TbCircleX, TbNotes } from 'react-icons/tb';

export const UnifyCodeAddModal = () => {

    const dispatch = useDispatch();
    const { modalAddUnityCodeOpen } = useSelector(state => state.unityCode);

    return (
        <>
            <div className="modal fade" id="modalVincularPuntos">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center">
                                Vincular Productos entre Puntos de Venta <FaShop className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center">
                                <div className="col-md-3 mb-3">
                                    <h5>Punto de Venta 1</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaShop className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                        >
                                            <option value="" selected disabled hidden>
                                                {" "}
                                                Seleccione...{" "}
                                            </option>
                                            <option value='1'>Venta 1</option>
                                            <option value='2'>Venta 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Código 1</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Código del Producto 1'
                                        />
                                        <button className='btn btn-primary'><TbCircleLetterB className="iconSize" /></button>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Punto de Venta 2</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaShop className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                        >
                                            <option value="" selected disabled hidden>
                                                {" "}
                                                Seleccione...{" "}
                                            </option>
                                            <option value='1'>Venta 1</option>
                                            <option value='2'>Venta 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Código 2</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Código del Producto 2'
                                        />
                                        <button className='btn btn-primary'><TbCircleLetterB className="iconSize" /></button>
                                    </div>
                                </div>


                            </div>
                            <div className='row mb-2 text-center'>
                                <div className="col-md-6 mb-3">
                                    <h5>Descripción 1</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <textarea
                                            class="form-control"
                                            rows="1"
                                            placeholder='Descripción...'
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Descripción 2</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <textarea
                                            class="form-control"
                                            rows="1"
                                            placeholder='Descripción...'
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Aceptar <TbCircleCheck className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}
