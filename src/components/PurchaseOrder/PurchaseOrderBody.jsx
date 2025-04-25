
import { PurchaseOrderBodyProveedor } from "./PurchaseOrderBodyProveedor"
import { PurchaseOrderBodyOpciones } from "./PurchaseOrderBodyOpciones"
import { PurchaseOrderBodyArticulos } from "./PurchaseOrderBodyArticulos"
import { PurchaseOrderBodyTotales } from "./PurchaseOrderBodyTotales"

export const PurchaseOrderBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <PurchaseOrderBodyProveedor />
                </div>

                <div className="col-md-9 mb-3">
                    <PurchaseOrderBodyOpciones />
                </div>
            </div>

            <div className="row mb-3 text-center">
                <PurchaseOrderBodyArticulos />
            </div>

            <div className="row mb-3 text-center">
                <PurchaseOrderBodyTotales />
            </div>
        </>

    )
}
