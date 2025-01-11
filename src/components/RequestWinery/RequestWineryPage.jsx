import { RequestWineryBody } from './RequestWineryBody';
import { RequestWineryIcons } from './RequestWineryIcons';

export const RequestWineryPage = () => {
    return (


        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Solicitud a Bodega</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <RequestWineryBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <RequestWineryIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
