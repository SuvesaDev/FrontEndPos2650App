import { FaEye, FaHashtag } from "react-icons/fa"
import { FaFloppyDisk } from "react-icons/fa6"
import { TbNotes } from "react-icons/tb"

export const LocationsHeader = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder="Código de la Ubicación"
                        />
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
                            placeholder="Descripcion de la Ubicación"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Observación</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaEye className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="1"
                            name="observaciones"

                        ></textarea>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-success">Guardar <FaFloppyDisk className="iconSize" /></button>
                </div>
            </div>
        </>

    )
}
