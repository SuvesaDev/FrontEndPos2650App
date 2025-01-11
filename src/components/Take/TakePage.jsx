import { TakeBody } from './TakeBody';
import { TakeIcons } from './TakeIcons';

export const TakePage = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Toma por Proveedor</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <TakeBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <TakeIcons />
                    </div>
                </div>
            </div>
            <br />
        </>


    )
}
