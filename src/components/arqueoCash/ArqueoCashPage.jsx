import { ArqueoCashBody } from "./ArqueoCashBody"
import { ArqueoCashIcons } from "./ArqueoCashIcons"

export const ArqueoCashPage = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Arqueo de Caja</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <ArqueoCashBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <ArqueoCashIcons />
                    </div>
                </div>
            </div>
            <br />
        </>


    )
}
