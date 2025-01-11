import { CountsWihoutPayBody } from './CountsWihoutPayBody';
import { CountsWihoutPayFooter } from './CountsWihoutPayFooter';

export const CountsWihoutPayPage = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Estado de Cuentas por Pagar</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <CountsWihoutPayBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <CountsWihoutPayFooter />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
