import { FaIdCard, FaUser } from "react-icons/fa"
import { TbNotes } from "react-icons/tb"

export const UsualCustomersHeader = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            name='clienteCedulaProforma'
                            placeholder="Nombre del Cliente"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            name='clienteCedulaProforma'
                            placeholder="Cédula del Cliente"
                        />
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <h5>Observaciones</h5>
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
