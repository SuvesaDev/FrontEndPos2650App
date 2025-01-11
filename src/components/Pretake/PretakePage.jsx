import { PretakeBody } from "./PretakeBody"
import { PretakeIcons } from "./PretakeIcons"

export const PretakePage = () => {
    return (


        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Registrar Pretoma</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <PretakeBody />

                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <PretakeIcons />
                    </div>
                </div>
            </div>
            <br />

        </>

    )
}
