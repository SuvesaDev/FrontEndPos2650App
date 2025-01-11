import { PaysBody } from './PaysBody/PaysBody';
import { PaysDatosProveedor } from './PaysDatosProveedor';
import { PaysDetailsBody } from './PaysDetailsBody';
import { PaysIcons } from './PaysIcons';
import { PaysObservaciones } from './PaysObservaciones';

export const PaysPage = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Abono a Proveedores</h3>
                    </div>

                    <div className="card-body">
                        <PaysDatosProveedor />
                        <hr />
                        <PaysBody />
                        <hr />
                        <PaysDetailsBody />
                        <hr />
                        <PaysObservaciones />
                    </div>
                    <div className="card-footer cartaP">
                        <PaysIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
