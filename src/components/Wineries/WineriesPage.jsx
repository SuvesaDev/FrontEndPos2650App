import { HiDocumentAdd } from 'react-icons/hi';
import { FaRegSave } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImCancelCircle} from 'react-icons/im';
import { WineriesBody } from './WineriesBody';
import { WineriesIcons } from './WineriesIcons';

export const WineriesPage = () => {
    return (
        <>
            <div className="container-fluid mt-2 text-center">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <h3>Bodegas</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <WineriesBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <WineriesIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
