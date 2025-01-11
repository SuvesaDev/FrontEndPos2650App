import { LockUnlockCommercialHouseBody } from './LockUnlockCommercialHouseBody';
import { LockUnlockCommercialHouseIcons } from './LockUnlockCommercialHouseIcons';

export const LockUnlockCommercialHouse = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-2">
                    <div className="card">
                        <div className="card-header bg-secondary cartaHMod2">
                            <h4>Bloqueo/Desbloqueo Casa Comercial</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-0">
                                    <LockUnlockCommercialHouseBody />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <LockUnlockCommercialHouseIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
