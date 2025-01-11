import { SalesAgentBody } from "../SalesAgent/SalesAgentBody"
import { SalesAgentIcons } from "../SalesAgent/SalesAgentIcons"
import { TaggerBody } from "./TaggerBody"
import { TaggerIcons } from "./TaggerIcons"

export const Tagger = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Etiquetar</h3>
                    </div>
                    <div className="card-body">
                        <TaggerBody />
                    </div>
                    <div className="card-footer cartaP">
                        <TaggerIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
