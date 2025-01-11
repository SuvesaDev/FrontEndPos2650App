
import { TbCircleLetterB, TbNotes } from "react-icons/tb";
import { FaCoins, FaFileAlt, FaHashtag } from "react-icons/fa";
import { FaCalendar, FaBoxesStacked, FaBuildingUn } from "react-icons/fa6";
import { ImSortNumbericDesc } from "react-icons/im";
import { IoAddCircle } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";

export const PaysAdjustmentDatosGenerales = () => {
    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-3 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Código del Proveedor"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Proveedor</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBuildingUn className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del Proveedor"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Moneda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <select
                            name="tipoPrecio"
                            className="form-select"

                        >
                            <option value="" selected disabled hidden>
                                {" "}
                                Seleccione...{" "}
                            </option>
                            <option value='COLON'>COLON</option>
                            <option value='DOLAR'>DOLAR</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Fecha</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center" >

                <div className="col-md-3 mb-3">
                    <h5>Tipo de Nota</h5>
                    <div className="inline-container">
                        <div className="form-check">
                            <input
                                type="radio"
                                id="radioCredito"
                                class="form-check-input checkP"
                            />
                            <h5 className="form-check-label" for="radioCredito">Crédito</h5>
                        </div>

                        <div className="form-check">
                            <input
                                type="radio"
                                id="radioDebito"
                                class="form-check-input checkP"
                            />
                            <h5 className="form-check-label" for="radioDebito">Débito</h5>
                        </div>

                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Documuento Proveedor</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaFileAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Documento del Proveedor"
                        />
                    </div>
                </div>

                <div className="col-md-5 mb-3">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="1"
                            placeholder="Anotaciones Extra"

                        >
                        </textarea>
                    </div>
                </div>
            </div>

        </>

    )
}
