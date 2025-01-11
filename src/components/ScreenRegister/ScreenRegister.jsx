import { HiDocumentAdd } from 'react-icons/hi';
import { FaRegSave, FaSearch } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import { ScreenRegisterBody } from './ScreenRegisterBody';
import { ScreenRegisterIcons } from './ScreenRegisterIcons';

export const ScreenRegister = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-2">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Módulo de Pantallas</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-0">
                                    <ScreenRegisterBody />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <ScreenRegisterIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
