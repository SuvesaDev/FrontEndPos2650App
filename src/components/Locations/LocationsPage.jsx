import { LocationsHeader } from './LocationsHeader';
import { LocationsIcons } from './LocationsIcons';
import { LocationsUbicacionesE } from './LocationsUbicacionesE';

export const LocationsPage = () => {
    return (
        <>
            <div className="container-fluid mt-2 text-center">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <h3>Ubicaciones</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <LocationsHeader />
                                <LocationsUbicacionesE />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <LocationsIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
