
import { FaCalendar, FaUpload } from 'react-icons/fa';
export const TrackingQoutesHeader = () => {
    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-4 mb-3">
                    <div className='card'>
                        <div className='card-header'>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input checkP"
                                    id="txtFiltrofecha"
                                />
                                <h5 className="form-check-label" for="txtFiltrofecha">Filtrar por Fecha</h5>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className="col-md-12 mb-3">
                                <h5>Desde</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaCalendar className="iconSize" />
                                    </span>
                                    <input
                                        type='date'
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <h5>Hasta</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaCalendar className="iconSize" />
                                    </span>
                                    <input
                                        type='date'
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className='card'>
                        <div className='card-header'>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input checkP"
                                    id="txtFiltroEstado"
                                />
                                <h5 className="form-check-label" for="txtFiltroEstado">Filtrar por Estado</h5>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className="row mb-0 text-center" >
                                <div className="col-md-6 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkPenEnv"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkPenEnv">Pendiente de envio</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkPedido"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkPedido">Enviada sin Confirmar</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="row mb-2 text-center" >
                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkRecibido"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkRecibido">Revision</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkAnulada"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkAnulada">Ganada</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkAgotado"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkAgotado">Perdida</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkConfirmada"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkConfirmada">Confirmada</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className='card'>
                        <div className='card-header'>
                        </div>
                        <div className='card-body'>
                            <div className="row mb-2 text-center" >
                                <div className="col-md-6 mb-0">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkInfoFact"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkInfoFact">Información Factura</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-6 mb-0">
                                    <button className='btn btn-success'>Cargar Filtros <FaUpload className="iconSize" /></button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
