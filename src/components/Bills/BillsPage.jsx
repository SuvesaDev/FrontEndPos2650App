import { BillsBodyDetalle } from "./BillsBodyDetalle"
import { BillsBodyHeader } from "./BillsBodyHeader"
import { BillsIcons } from "./BillsIcons"

export const BillsPage = () => {
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Registro de Gastos</h3>
                    </div>

                    <div className="card-body">
                        <BillsBodyHeader />
                        <hr />
                        <BillsBodyDetalle />
                    </div>

                    <div className="card-footer cartaP">
                        <BillsIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
