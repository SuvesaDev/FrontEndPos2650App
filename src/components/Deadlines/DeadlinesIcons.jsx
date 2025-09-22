import { useDispatch, useSelector } from 'react-redux';

import { FaWindowClose } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';

import { DeleteTab } from '../../actions/tabs';
// import { CleanPresentations } from '../../actions/PresentacionesAction';

export const DeadlinesIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector(state => state.tabs);

    const handleCloseTab = () => {

        // Delete this tab
        // dispatch(DeleteTab(currentTab.name, currentTab.routePage));

        // dispatch(CleanPresentations());
    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={ handleCloseTab }
                    >
                        Cerrar <FaWindowClose className="iconSize" />
                    </button>
                </div>
            </div>
        </>
    )
}
