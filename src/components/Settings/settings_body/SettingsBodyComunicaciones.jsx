
import { FaEnvelope, FaKey, FaQuestion, FaUser } from 'react-icons/fa6';
import { TbNotes } from 'react-icons/tb';
export const SettingsBodyComunicaciones = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <br />
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="facturasVencidas"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="facturasVencidas">Mostrar Facturas Vencidas al Inicio del Programa</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Direccion de Correo</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaEnvelope className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Direccion de Correo Electrónico"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Usuario</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de Usuario"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Contraseña</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaKey className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Contraseña del Usuario"
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <br />
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="autenticacion"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="autenticacion">Autenticación</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <br />
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="conexCifrada"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="conexCifrada">Conexión Cifrada</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Asunto</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaQuestion className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Asunto del Correo"
                        />
                    </div>
                </div>


                <div className="col-md-3 mb-3">
                    <h5>Mensaje</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="1"
                            name="observaciones"
                        >
                        </textarea>
                    </div>
                </div>
            </div>
        </>

    )
}
