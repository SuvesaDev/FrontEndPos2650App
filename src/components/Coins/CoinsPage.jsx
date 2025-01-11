import { HiDocumentAdd } from 'react-icons/hi';
import { FaRegSave } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import { CoisnBody } from './CoinsBody';
import { CoinsIcons } from './CoinsIcons';

export const CoinsPage = () => {
    return (
        <>
            <div className="container-fluid mt-2 text-center">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <h3>Registro de Monedas</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <CoisnBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <CoinsIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
