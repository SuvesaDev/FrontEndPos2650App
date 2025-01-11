import { BuysHeaderFactura } from "./BuysHeaderFactura"
import { BuysProveedor } from "./BuysProveedor"

export const BuysHeader = () => {

    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-6 mb-2">
                    <BuysProveedor />
                </div>

                <div className="col-md-6 mb-2">
                    <BuysHeaderFactura />
                </div>
            </div>
        </>

    )
}
