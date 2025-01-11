import { LoansDatosProducto } from './LoansDatosProducto';
import { LoansDatosTraslado } from './LoansDatosTraslado';
import { LoansIcons } from './LoansIcons';

export const LoansPage = () => {
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Préstamo de Productos</h3>
                    </div>
                    <div className="card-body">
                        <LoansDatosTraslado />
                        <hr />
                        <LoansDatosProducto />
                    </div>
                    <div className="card-footer cartaP">
                        <LoansIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
