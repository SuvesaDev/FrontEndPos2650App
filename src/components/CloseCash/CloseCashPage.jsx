import { CloseCashApertura } from './CloseCashApertura';
import { CloseCashCierreCaja } from './CloseCashCierreCaja';
import { CloseCashDetalleOperaciones } from './CloseCashDetalleOperaciones';
import { CloseCashDetalleTarjetas } from './CloseCashDetalleTarjetas';
import { CloseCashGeneral } from './CloseCashGeneral';
import { CloseCashIcons } from './CloseCashIcons';
import { CloseCashPeriodo } from './CloseCashPeriodo';

export const CloseCashPage = () => {
    return (


        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Cierre de Caja</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-6 mb-3">
                                <CloseCashPeriodo />
                                <hr />
                                <CloseCashApertura />
                                <hr />
                                <CloseCashGeneral />
                            </div>
                            <div className="col-md-6 mb-3">
                                <CloseCashCierreCaja />
                                <hr />
                                <CloseCashDetalleTarjetas />
                                <hr />
                                <CloseCashDetalleOperaciones />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <CloseCashIcons />
                    </div>
                </div>
            </div>
            <br />

        </>

    )
}
