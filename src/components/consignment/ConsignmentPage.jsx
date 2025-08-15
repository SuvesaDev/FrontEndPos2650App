import { createRef } from "react";

import { ConsignmentHeader } from "./ConsignmentHeader";
import { ConsignmentHeaderCustomer } from "./ConsignmentHeaderCustomer";
import { ConsignmentConditions } from "./ConsignmentConditions";
import { ConsignmentItems } from "./ConsignmentItems";
import { ConsignmentTotals } from "./ConsignmentTotals";
import { ConsignmentFooter } from "./ConsignmentFooter";

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
                        <ConsignmentHeader />
                    </div>

                    <div className="card-body">

                        <div className="row mb-2 text-center" >
                            <div className="col-md-8 mb-1">
                                <ConsignmentHeaderCustomer />
                            </div>
                            <div className="col-md-4 mb-1">
                                <ConsignmentConditions />
                            </div>
                        </div>

                        <hr />

                        <div className="row mb-2 text-center" >
                            <div className="col-md-9 mb-3">
                                <div className='billing_items'>
                                    <ConsignmentItems
                                        inputRefPrecioUnit={textInputPrecioUnit}
                                        inputRefDescuento={textInputDescuento}
                                        inputRefCantidad={textInputCantidad}
                                        inputRefCodigo={textInputCodigo}
                                    />
                                </div>

                            </div>
            
                            <div className="col-md-3 mb-1">
                                <ConsignmentTotals />
                            </div>

                        </div>                       

                    </div>

                    <div className="card-footer cartaP">
                        <ConsignmentFooter />
                    </div>

                </div>
                <br />
            </div>

        </>

    )
}