import { FamilyFamilia } from './FamilyFamilia';
import { FamilyIcons } from './FamilyIcons';
import { FamilySubFamilia } from './FamilySubFamilia';

export const FamilyPage = () => {
    return (
        <>
            <div className="container-fluid mt-2 text-center">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <h3>Familias/Sub-Familias</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <FamilyFamilia />
                                <hr />
                                <FamilySubFamilia />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <FamilyIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
