import { useSelector } from 'react-redux';
import { PaysBodyDatosAbono } from './PaysBodyDatosAbono';
import { PaysBodyDetalleFactura } from './PaysBodyDetalleFactura';
import { PaysBodyTabs } from './PaysBodyTabs';
import { PaysBillingsBody } from './PaysBillingsBody';

export const PaysBody = () => {

    const state = useSelector(state => state.pays);
    const { currentTabPays } = state;

    const redirectComponent = () => {

        switch (currentTabPays) {

            case 'DatosAbono':
                return <PaysBodyDatosAbono />

            case 'DetalleFactura':
                return <PaysBodyDetalleFactura />

            default:
                break;
        }
    }

    return (
        <>
            <div className='row mb-2 text-center'>
                <div className='col-md-4 mb-2'>
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Facturas Pendiente de Pago</h4>
                        </div>
                        <div className="card-body">
                            <PaysBillingsBody />
                        </div>
                    </div>

                </div>
                <div className='col-md-8 mb-2'>
                    <div className="card">
                        <div className="card-header bg-secondary text-white">
                            <PaysBodyTabs />
                        </div>
                        <div className="card-body">
                            {
                                redirectComponent()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
