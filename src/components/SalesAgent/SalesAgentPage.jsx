import { SalesAgentBody } from "./SalesAgentBody"
import { SalesAgentIcons } from "./SalesAgentIcons"

export const SalesAgentPage = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Agentes de Venta</h3>
                    </div>
                    <div className="card-body">
                        <SalesAgentBody />
                    </div>
                    <div className="card-footer cartaP">
                        <SalesAgentIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
