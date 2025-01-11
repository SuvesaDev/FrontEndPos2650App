import { MovementItemsBody } from './MovementItemsBody';
import { MovementItemsIcons } from './MovementItemsIcons';

export const MovementItems = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Movimientos de Artículos</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <MovementItemsBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <MovementItemsIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
