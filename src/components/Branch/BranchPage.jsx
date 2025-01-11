
import { BranchIcons } from './BranchIcons';
import { BranchBody } from './BranchBody';

export const BranchPage = () => {

    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Surcursales</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-3">
                                    <BranchBody />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <BranchIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
