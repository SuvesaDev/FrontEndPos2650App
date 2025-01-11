

import { FaHashtag } from 'react-icons/fa';
import { PurchaseOrderBody } from './PurchaseOrderBody';
import { PurchaseOrderIcons } from './PurchaseOrderIcons';

export const PurchaseOrder = () => {
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <div className='row'>

                            <div className="col-md-2 mb-2">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaHashtag className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Número de Orden"
                                    />
                                </div>
                            </div>

                            <div className="col-md-8 mb-2">
                                <h3>Orden de Compra Manual</h3>
                            </div>

                            <div className="col-md-2 mb-1">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="checkAnulada"
                                        class="form-check-input checkP"
                                    />
                                    <h5 className="form-check-label textRed" for="checkAnulada">Anulada</h5>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <PurchaseOrderBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <PurchaseOrderIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
