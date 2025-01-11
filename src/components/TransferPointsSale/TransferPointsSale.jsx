import { TranferPointsSaleBody } from './TranferPointsSaleBody';
import { TranferPointsSaleIcons } from './TranferPointsSaleIcons';

export const TransferPointsSale = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-secondary cartaHMod2">
                            <h4>Traslados Entre Puntos de Venta</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-0">
                                    <TranferPointsSaleBody />

                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <TranferPointsSaleIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
