import { BillingConsignmentBody } from "./BillingConsignmentBody"
import { BillingConsignmentFooter } from "./BillingConsignmentFooter"


export const BillingConsignmentPage = () => {

    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Facturacion de Consignaciones</h3>
                    </div>
        
                    <div className="card-body">
                        <BillingConsignmentBody />
                    </div>
        
                    <div className="card-footer cartaP">
                        <BillingConsignmentFooter />
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}