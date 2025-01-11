import { TrackingQoutesBody } from './TrackingQoutesBody';
import { TrackingQoutesHeader } from './TrackingQoutesHeader';
import { TrackingQoutesIcons } from './TrackingQoutesIcons';

export const TrackingQuotesPage = () => {
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Seguimiento Cotizaciones</h3>
                    </div>
                    <div className="card-body">
                        <TrackingQoutesHeader />
                        <hr />
                        <TrackingQoutesBody />
                    </div>
                    <div className="card-footer cartaP">
                        <TrackingQoutesIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
