import { FaEye, FaHashtag, FaListOl } from "react-icons/fa"

export const PresentationsBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3"></div>
                <div className="col-md-6 mb-3">
                    <h5>Tipo de Presentación</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaListOl className="iconSize" />
                        </span>
                        <select className="form-select">
                            <option value="0">GENERAL</option>
                            <option value="1">GENERAL1</option>
                            <option value="2">GENERAL2</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3 mb-3"></div>
            </div>
        </>

    )
}
