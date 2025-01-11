import { PaysAdjustmentBody } from "./PaysAdjustmentBody"
import { PaysAdjustmentDatosGenerales } from "./PaysAdjustmentDatosGenerales"
import { PaysAdjustmentFooter } from "./PaysAdjustmentFooter"
import { PaysAdjustmentIcons } from "./PaysAdjustmentIcons"

export const PaysAdjustmentPage = () => {
    return (


        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Notas de Crédito y Débito</h3>
                    </div>
                    <div className="card-body">
                        <PaysAdjustmentDatosGenerales />
                        <hr />
                        <PaysAdjustmentBody />
                        <hr />
                        <PaysAdjustmentFooter />
                    </div>
                    <div className="card-footer cartaP">
                        <PaysAdjustmentIcons />
                    </div>
                </div>
            </div>
            <br />

        </>

    )
}
