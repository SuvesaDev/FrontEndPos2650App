import { UsualCustomersBody } from './UsualCustomersBody';
import { UsualCustomersHeader } from './UsualCustomersHeader';
import { UsualCustomersIcons } from './UsualCustomersIcons';

export const UsualCustomersPage = () => {
    return (
        <>
            <div className="container-fluid mt-2 text-center">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <h3>Clientes Frecuentes</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <UsualCustomersHeader />
                                <UsualCustomersBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <UsualCustomersIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
