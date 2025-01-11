import { useSelector } from 'react-redux';

import { SettingsBodyTabs } from './SettingsBodyTabs';

import { SettingsBodyEmpresas } from './SettingsBodyEmpresas';
import { SettingsBodyPermiso } from './SettingsBodyPermiso';
import { SettingsBodyValores } from './SettingsBodyValores';
import { SettingsBodyComunicaciones } from './SettingsBodyComunicaciones';
import { SettingsBodyTarifas } from './SettingsBodyTarifas';

export const SettingsBody = () => {

    const state = useSelector(state => state.settings);
    const { currentTabSettings } = state;

    const redirectComponent = () => {

        switch (currentTabSettings) {

            // case 'Empresas':
            //     return <SettingsBodyEmpresas />

            case 'Valores':
                return <SettingsBodyValores />

            case 'ComunicacionesCorreo':
                return <SettingsBodyComunicaciones />

            case 'Permiso':
                return <SettingsBodyPermiso />

            case 'Tarifas':
                return <SettingsBodyTarifas />

            default:
                break;
        }
    }

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card text-center">
                    <div className="card-header bg-secondary text-white">
                        <SettingsBodyTabs />
                    </div>
                    <div className="card-body">{redirectComponent()}</div>
                </div>
            </div>
        </>
    )
}
