import { FaBoxOpen, FaHashtag, FaSearch, FaSortNumericDownAlt } from 'react-icons/fa';
import { FaBoxesStacked, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { TbNotes } from 'react-icons/tb';

export const BagsKilosBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-0">
                    <div className="card">
                        <div className="card-header bg-dark cartaHMod2">
                            <h4>Articulo a Disminuir</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center">
                                <div className="col-md-3 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            name='numeroDocumento'
                                            className='form-control'
                                            placeholder='Código del Producto'

                                        />
                                        <button
                                            className="btn btn-primary"
                                            type="button"

                                        >
                                            <FaSearch className="iconSize" />
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Descripción</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Descripción del Producto"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Existencia</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBoxesStacked className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Existencia del Producto"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Cantidad Descargar</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaSortNumericDownAlt className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Cantidad del Producto"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row mb-2 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Articulo a Aumentar</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center">
                                <div className="col-md-2 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            name='numeroDocumento'
                                            className='form-control'
                                            placeholder='Código del Producto'

                                        />
                                        <button
                                            className="btn btn-primary"
                                            type="button"

                                        >
                                            <FaSearch className="iconSize" />
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Descripción</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Descripción del Producto"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Existencia</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBoxesStacked className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Existencia del Producto"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Aumentar Saco</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBoxOpen className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Aumentar por Saco"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Cantidad Descargar</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaSortNumericDownAlt className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Cantidad del Producto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-10 mb-2"></div>
                <div className="col-md-2 mb-2">
                    <hr />
                    <button className='btn btn-success espacio'>Aceptar <FaCircleCheck className='iconSize' /></button>
                    <button className='btn btn-danger espacio'>Cancelar <FaCircleXmark className='iconSize' /></button>
                </div>
            </div>
        </>

    )
}
