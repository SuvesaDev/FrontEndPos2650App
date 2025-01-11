

import { FaCalendar } from 'react-icons/fa';
import { SiMicrosoftexcel } from "react-icons/si";
export const CheckOrdersHeader = () => {
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
                                            id="checkSolicitado"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkSolicitado">Solicitado</h5>
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
                                        <h5 className="form-check-label" for="checkPedido">Pedido</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="row mb-2 text-center" >
                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkRecibido"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkRecibido">Recibido</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkAnulada"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkAnulada">Anulada</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkAgotado"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkAgotado">Agotado</h5>
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
                            <div className="row mb-0 text-center" >
                                <div className="col-md-6 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkPedidosBodega"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkPedidosBodega">Pedidos Bodega</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkPendientesSoli"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkPendientesSoli">Pendientes Solicitar</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="row mb-2 text-center" >
                                <div className="col-md-6 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkPendientesRecibir"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkPendientesRecibir">Pendientes Recibir</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <button className='btn btn-success'>Exportar Excel <SiMicrosoftexcel className="iconSize" />  </button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
