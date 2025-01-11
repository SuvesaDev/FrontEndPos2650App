import { FaRegSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { LockUnlockWarehouseBody } from './LockUnlockWarehouseBody';
import { LockUnlockWarehouseIcons } from './LockUnlockWarehouseIcons';

export const LockUnlockWarehouse = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-2">
                    <div className="card">
                        <div className="card-header bg-secondary cartaHMod2">
                            <h4>Bloqueo/Desbloqueo Bodegas</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-0">
                                    <LockUnlockWarehouseBody />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <LockUnlockWarehouseIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
