import { useDispatch, useSelector } from 'react-redux';

import { SelectTabSettings } from '../../../actions/settings';

export const SettingsBodyTabs = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state.settings);
    const { currentTabSettings } = state;

    const { auth } = useSelector((state) => state.login);
    const { costaPets } = auth;

    const handleSelectTabSettings = (nameTab) => {
        dispatch(SelectTabSettings(nameTab));
    }

    return (

        <>
            <div className="inline-containerBtns">
                <button
                    className={ 
                        (!costaPets) 
                            ? currentTabSettings == "Valores"
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary" 
                            : 'col-md-3 mb-3 d-none'
                    }
                    onClick={() => handleSelectTabSettings('Valores')}
                >
                    Valores
                </button>

                <button
                    className={ 
                        (!costaPets) 
                            ? currentTabSettings == "ComunicacionesCorreo"
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary" 
                            : 'col-md-3 mb-3 d-none'
                    }
                    onClick={() => handleSelectTabSettings('ComunicacionesCorreo')}
                >
                    Comunicaciones de Correo
                </button>

                <button
                    className={ 
                        (!costaPets) 
                            ? currentTabSettings == "Permiso"
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary" 
                            : 'col-md-3 mb-3 d-none'
                    }
                    onClick={() => handleSelectTabSettings('Permiso')}
                >
                    Permiso
                </button>

                <button
                    className={ 
                        (costaPets) 
                            ? currentTabSettings == "CostaPets"
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary" 
                            : 'col-md-3 mb-3 d-none'
                    }
                    onClick={() => handleSelectTabSettings('CostaPets')}
                >
                    Costa Pets
                </button>
            </div>
        </>
    )
}
