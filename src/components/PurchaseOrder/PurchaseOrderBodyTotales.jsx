import { FaPercentage } from "react-icons/fa"
import { FaColonSign } from "react-icons/fa6"

export const PurchaseOrderBodyTotales = () => {

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
