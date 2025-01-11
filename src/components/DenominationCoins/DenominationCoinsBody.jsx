import { FaCoins, FaExchangeAlt, FaEye, FaHashtag, FaListOl, FaQuestion, FaWallet } from "react-icons/fa"
import { FaCirclePlus, FaSignsPost } from "react-icons/fa6"
import { MdPriceChange } from "react-icons/md"

export const DenominationCoinsBody = () => {
    return (
        <>
            <div className="row mb-0 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Moneda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <select
                            className="form-select"

                        >
                            <option value="" selected disabled hidden>
                                {" "}
                                Seleccione...{" "}
                            </option>
                            <option value="1">Colon</option>
                            <option value="2">Dolar</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Denominación</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <MdPriceChange className="iconSize" />
                        </span>
                        <select
                            className="form-select"

                        >
                            <option value="" selected disabled hidden>
                                {" "}
                                Seleccione...{" "}
                            </option>
                            <option value="1">Moneda</option>
                            <option value="2">Billete</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Valor</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaQuestion className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Valor de la Moneda"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
