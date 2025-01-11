import { useDispatch, useSelector } from 'react-redux';

import { SelectTabSettings } from '../../../actions/settings';

export const SettingsBodyTabs = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state.settings);
    const { currentTabSettings } = state;

    const handleSelectTabSettings = (nameTab) => {
        dispatch(SelectTabSettings(nameTab));
    }

    return (

        <>
            <div className="inline-containerBtns">
                <button
                    className={
                        currentTabSettings == "Valores"
                            ? "btn btn-outline-primary activeP"
                            : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabSettings('Valores')}
                >
                    Valores
                </button>

                <button
                    className={
                        currentTabSettings == "ComunicacionesCorreo"
                            ? "btn btn-outline-primary activeP"
                            : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabSettings('ComunicacionesCorreo')}
                >
                    Comunicaciones de Correo
                </button>

                <button
                    className={
                        currentTabSettings == "Permiso"
                            ? "btn btn-outline-primary activeP"
                            : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabSettings('Permiso')}
                >
                    Permiso
                </button>
            </div>
        </>
    )
}
