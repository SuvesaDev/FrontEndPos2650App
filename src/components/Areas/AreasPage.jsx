import { AreasBody } from './AreasBody';
import { AreasIcons } from './AreasIcons';

export const AreasPage = () => {
    return (
        <>
            <div className="container-fluid mt-2 text-center">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <h3>Registro de Areas</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <AreasBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <AreasIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
