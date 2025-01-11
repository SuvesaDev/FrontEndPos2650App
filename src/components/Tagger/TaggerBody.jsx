import { FaBarcode, FaBoxTissue, FaColonSign, FaHashtag, FaPrint } from "react-icons/fa6"
import { TbCopy, TbNotes, TbNumber } from "react-icons/tb"

export const TaggerBody = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Barra</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBarcode className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Código de Barra"
                        />
                        <button className="btn btn-dark">F1</button>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Código Secuencial"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Texto</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Texto"
                        />
                    </div>
                </div>


                <div className="col-md-3 mb-3">
                    <h5>Precio</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaColonSign className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Precio"
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Cantidad</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNumber className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cantidad"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Copias</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbCopy className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Copias"
                        />
                    </div>
                </div>


                <div className="col-md-3 mb-3">
                    <h5>Presentación</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBoxTissue className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Presentación"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-primary">Imprimir Etiquetas <FaPrint className="iconSize" /> </button>
                </div>
            </div>

            <hr />
            <div className="row mb-2 text-center">
                <p>Image</p>
            </div>

        </>

    )
}
