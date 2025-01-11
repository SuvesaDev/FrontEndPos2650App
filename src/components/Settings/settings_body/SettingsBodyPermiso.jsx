import { FaFloppyDisk, FaKey, FaUser } from "react-icons/fa6"

export const SettingsBodyPermiso = () => {
    return (
        <>
            <div className='row mb-2 text-center'>
                <h4 className="mb-3" >Permiso Para Habilitar Inventario</h4>
                <div className="col-md-3 mb-3">
                    <h5>Usuario</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <select
                            name="Usuario"
                            className="form-select"

                        >
                            <option value="" selected disabled hidden>
                                {" "}
                                Seleccione...{" "}
                            </option>
                            <option value='1'>Juan</option>
                            <option value='2'>Pedro</option>
                            <option value='3'>Carlos</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Clave</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaKey className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingrese la Clave"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Repetir Clave</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaKey className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingrese la Clave Nuevamente"
                        />
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
