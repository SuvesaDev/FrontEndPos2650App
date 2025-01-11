import { useEffect, createRef } from "react";
import { useSelector } from "react-redux";

import { ConsultAlbaranesBody } from "./ConsultAlbaranesBody"
import { ConsultAlbaranesFooter } from "./ConsultAlbaranesFooter"
import { ConsultAlbaranesModal } from "./ConsultAlbaranesModal"
import { ConsultAlbaranesGenerarFacturasModal } from "./ConsultAlbaranesGenerarFacturasModal";
import { CustomerSearchModal } from "../customers/CustomerSearchModal";
import { ConsultAlbaranesAddCustomerModal } from "./ConsultAlbaranesAddCustomerModal";

export const ConsultAlbaranesPage = () => {

    var textInputCodigo = createRef(null);
    var textInputCantidad = createRef(null);
    var textInputDescuento = createRef(null);

    const {
        autoFocusDescConsultAlbaranes,
        autoFocusCantidadConsultAlbaranes,
        autoFocusCodigoConsultAlbaranes
    } = useSelector(state => state.consultAlbaranes);

    useEffect(() => {

        if (autoFocusDescConsultAlbaranes) {
            textInputDescuento.current.focus();
        }

        if (autoFocusCantidadConsultAlbaranes) {
            textInputCantidad.current.focus();
        }

        if (autoFocusCodigoConsultAlbaranes) {
            textInputCodigo.current.focus();
        }

    }, [autoFocusDescConsultAlbaranes, autoFocusCantidadConsultAlbaranes, autoFocusCodigoConsultAlbaranes]);

    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Consulta Albaranes</h3>
                    </div>

                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <ConsultAlbaranesBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <ConsultAlbaranesFooter />
                    </div>
                </div>
            </div>
            <br />

            <ConsultAlbaranesModal
                inputRefDescuento={textInputDescuento}
                inputRefCantidad={textInputCantidad}
                inputRefCodigo={textInputCodigo}
            />
            <ConsultAlbaranesGenerarFacturasModal />
            <CustomerSearchModal />
            <ConsultAlbaranesAddCustomerModal />
        </>

    )
}
