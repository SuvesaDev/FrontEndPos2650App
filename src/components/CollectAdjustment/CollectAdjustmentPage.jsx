import { CollectAdjustmentBody } from './CollectAdjustmentBody';
import { CollectAdjustmentFooter } from './CollectAdjustmentFooter';
import { CollectAdjustmentTable } from './CollectAdjustmentTable';

export const CollectAdjustmentPage = () => {
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Ajuste Cuentas Cobrar</h3>
                    </div>
                    <div className="card-body">
                        <CollectAdjustmentBody />
                        <hr />
                        <CollectAdjustmentTable />
                    </div>
                    <div className="card-footer cartaP">
                        <CollectAdjustmentFooter />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
