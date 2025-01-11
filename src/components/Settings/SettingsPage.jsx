import { SettingsIcons } from './SettingsIcons';
import { SettingsBody } from './settings_body/SettingsBody';

export const SettingsPage = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Configuración</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-3">
                                    <SettingsBody />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <SettingsIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
