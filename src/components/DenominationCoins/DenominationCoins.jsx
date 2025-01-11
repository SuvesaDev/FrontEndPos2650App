import { DenominationCoinsBody } from './DenominationCoinsBody';
import { DenominationCoinsIcons } from './DenominationCoinsIcons';

export const DenominationCoins = () => {
    return (
        <>
        <div className="container-fluid mt-2 text-center">
            <div className="card">
                <div className="card-header cartaHMods3">
                    <h3>Denominación Monedas</h3>
                </div>
                <div className="card-body">
                    <div className="row mb-3 text-center" >
                        <div className="col-md-12 mb-3">
                            <DenominationCoinsBody />
                        </div>
                    </div>
                </div>
                <div className="card-footer cartaP">
                    <DenominationCoinsIcons />
                </div>
            </div>
        </div>
        <br />
    </>
    )
}
