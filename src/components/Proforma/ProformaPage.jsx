import { AiOutlineFieldNumber } from "react-icons/ai"
import { ProformaDatos } from "./ProformaDatos"
import { ProformaIcons } from "./ProformaIcons"
import { ProformaBody } from "./ProformaBody"
import { ProformaTotals } from "./ProformaTotals"
import { useDispatch, useSelector } from 'react-redux';
export const ProformaPage = () => {

    const {
        codigoCotizacion
    } = useSelector(state => state.budgets);
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <div className="row text-center">
                            <div className="col-md-2 mb-2">
                                <div className="input-group">
                                    {
                                        codigoCotizacion ? (
                                            <>
                                                <span className="input-group-text">
                                                    <strong>Cotización Nº</strong>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Número de Recibo"
                                                    disabled={true}
                                                    value={codigoCotizacion}
                                                />
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )

                                    }

                                </div>
                            </div>
                            <div className="col-md-10 mb-0">
                                <h3>Formula de Cotizaciones</h3>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <ProformaDatos />
                                <ProformaBody />
                                <hr />
                                <ProformaTotals />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <ProformaIcons />
                    </div>
                </div>
            </div>
            <br />
        </>


    )
}
