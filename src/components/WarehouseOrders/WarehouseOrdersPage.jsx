import { WarehouseOrdersBody } from "./WarehouseOrdersBody"
import { WarehouseOrdersIcons } from "./WarehouseOrdersIcons"

export const WarehouseOrdersPage = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Registro Pedido a Bodega</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <WarehouseOrdersBody />

                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <WarehouseOrdersIcons />

                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
