
import { FaEye, FaPercentage, FaSalesforce } from 'react-icons/fa';
import { FaColonSign, FaFloppyDisk } from 'react-icons/fa6';
import { TbNotes } from 'react-icons/tb';

export const FamilyFamilia = () => {
    return (
        <>
            <div className="row mb-0 text-center">
                <div className="col-md-12 mb-0">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Cuentas Contables</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center">
                                <div className="col-md-4 mb-3">
                                    <h5>Descripción</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <textarea
                                            class="form-control"
                                            rows="1"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Observaciones</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaEye className="iconSize" />
                                        </span>
                                        <textarea
                                            class="form-control"
                                            rows="1"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <hr />
                                    <button className='btn btn-success'>Guardar <FaFloppyDisk className='iconSize' /></button>
                                </div>
                            </div>

                            <div className="row mb-3 text-center">
                                <div className="col-md-4 mb-3">
                                    <h5>Venta Gravada</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder="Porcentaje de Venta Gravada"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Venta Exenta</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder="Porcentaje de Venta Exenta"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Costo Venta</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder="Costo de Venta"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
