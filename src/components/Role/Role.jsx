import { RoleBody } from './RoleBody';
import { RoleIcons } from './RoleIcons';

export const RolePage = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Configuracion de Roles</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-3">
                                    <RoleBody/>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <RoleIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
