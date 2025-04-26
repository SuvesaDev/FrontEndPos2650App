import { useSelector } from "react-redux";

import { FaPercentage } from "react-icons/fa";
import { FaColonSign } from "react-icons/fa6";

export const PurchaseOrderBodyTotales = () => {

    const { ordenCompra } = useSelector((state) => state.ordenCompra);
    const { 
        totalSubGravado,
        totalSubExento,
        totalSubTotal,
        totalDescuento,
        totalImpuestos,
        totalFinal 
    } = ordenCompra;

    return (
        <>

            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">

                    <div className="card">

                        <div className="card-footer bg-primary">
                            <div className='row'>

                                <div className="col-md-2 mb-3">
                                    <h5 className="text-white">Sub. Gravado</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Sob-Total Gravado'
                                            disabled={true}
                                            value={totalSubGravado}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5 className="text-white">Sub. Exento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Sob-Total Exento'
                                            disabled={true}
                                            value={totalSubExento}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5 className="text-white">Sub Total</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Sob-Total Final'
                                            disabled={true}
                                            value={totalSubTotal}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5 className="text-white">Descuento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Descuento Final'
                                            disabled={true}
                                            value={totalDescuento}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5 className="text-white">Impuestos</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Impuesto Final'
                                            disabled={true}
                                            value={totalImpuestos}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5 className="text-white">Total</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Total Final'
                                            disabled={true}
                                            value={totalFinal}
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
