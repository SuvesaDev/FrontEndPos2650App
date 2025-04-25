import { FaBuildingUn } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"

export const PurchaseOrderBodyProveedor = () => {

    const dispatch = useDispatch();

    const { DisableInputs } = useSelector((state) => state.ordenCompra);

    return (
        <>
            <div className="row mb-3 text-center">

                <div className="col-md-12 mb-3">

                    <div className="card">

                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Información del Proveedor</h4>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                
                                <div className="col-md-12 mb-3">
                                    <h5>Nombre Proveedor</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBuildingUn className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Nombre del Proveedor'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
