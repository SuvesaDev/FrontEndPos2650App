import { WineriesAdjustmentDatos } from './WineriesAdjustmentDatos';
import { WineriesAdjustmentDetalleAjuste } from './WineriesAdjustmentDetalleAjuste';
import { WineriesAdjustmentIcons } from './WineriesAdjustmentIcons';
import { WineriesAdjustmentTable } from './WineriesAdjustmentTable';

export const WineriesAdjustmentPage = () => {
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Ajuste Bodega Inventario</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <WineriesAdjustmentDatos />
                                <hr />
                                <WineriesAdjustmentDetalleAjuste />
                                <hr />
                                <WineriesAdjustmentTable />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <WineriesAdjustmentIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
