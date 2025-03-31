import { useSelector, useDispatch } from 'react-redux';

import { FaWindowClose } from 'react-icons/fa';
import { DeleteTab } from '../../actions/tabs';

import { CleanFamiliasFamily } from '../../actions/FamiliasAction';

export const FamilyIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector((state) => state.tabs);

    const handleCloseWindow = (e) => {

        e.preventDefault();

        dispatch(DeleteTab(currentTab.name, currentTab.routePage));
        dispatch(CleanFamiliasFamily());
        
    };

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                
                {/* <div className="btn-group mb-2">
                    <button
                        className="btn btn-success espacio"
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>
                <div className="btn-group mb-2">
                    <button
                        className="btn btn-primary espacio"
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-dark espacio"
                    >
                        Registrar <FaFloppyDisk className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                    >
                        Eliminar <RiDeleteBin2Fill className="iconSize" />
                    </button>
                </div> */}

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindow}
                    >
                        Cerrar <FaWindowClose className="iconSize" />
                    </button>
                </div>
            </div>
        </>
    )
}
