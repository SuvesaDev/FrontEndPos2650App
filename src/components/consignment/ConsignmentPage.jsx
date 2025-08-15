import { createRef } from "react";

import { BillingConditions } from "../Billing/BillingConditions";
import { BillingFooter } from "../Billing/BillingFooter";
import { BillingHeader } from "../Billing/BillingHeader"
import { BillingHeaderCustomer } from "../Billing/BillingHeaderCustomer";
import { BillingItems } from "../Billing/BillingItems";
import { BillingTotals } from "../Billing/BillingTotals";

export const ConsignmentPage = () => {

    var textInputPrecioUnit = createRef(null);
    var textInputDescuento = createRef(null);
    var textInputCantidad = createRef(null);
    var textInputCodigo = createRef(null);

    return (

        <>

            <div className="container-fluid mt-2">

                <div className="card">
                    <div className="card-header cartaMods">
                        <BillingHeader />
                    </div>

                    <div className="card-body">

                        <div className="row mb-2 text-center" >
                            <div className="col-md-8 mb-1">
                                <BillingHeaderCustomer />
                            </div>
                            <div className="col-md-4 mb-1">
                                <BillingConditions />
                            </div>
                        </div>

                        <hr />

                        <div className="row mb-2 text-center" >
                            <div className="col-md-9 mb-3">
                                <div className='billing_items'>
                                    <BillingItems
                                        inputRefPrecioUnit={textInputPrecioUnit}
                                        inputRefDescuento={textInputDescuento}
                                        inputRefCantidad={textInputCantidad}
                                        inputRefCodigo={textInputCodigo}
                                    />
                                </div>

                            </div>
            
                            <div className="col-md-3 mb-1">
                                <BillingTotals />
                            </div>

                        </div>                       

                    </div>

                    <div className="card-footer cartaP">
                        <BillingFooter />
                    </div>

                </div>
                <br />
            </div>

        </>

    )
}