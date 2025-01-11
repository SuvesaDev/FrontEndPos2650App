import { BagsKilosBody } from './BagsKilosBody';
import { BagsKilosIcons } from './BagsKilosIcons';

export const BagsKilosPage = () => {
    return (

        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-secondary cartaHMod2">
                            <h4>Convertir Sacos por Kilos</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-0">
                                    <BagsKilosBody />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <BagsKilosIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
