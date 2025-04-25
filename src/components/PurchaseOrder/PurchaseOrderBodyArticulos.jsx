import { useDispatch, useSelector } from "react-redux";

import { BsSortNumericDown } from "react-icons/bs";
import { FaPercentage } from "react-icons/fa";
import { FaColonSign, FaHashtag, FaTruckFast } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";

import { PurchaseOrderBodyArticulosTable } from "./PurchaseOrderBodyArticulosTable";

export const PurchaseOrderBodyArticulos = () => {

    const dispatch = useDispatch();
        
    const { DisableInputs } = useSelector((state) => state.ordenCompra);

    const columns = [
        {
          Header: "Codigo",
          accessor: "codigo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Precio Unitario",
            accessor: "precioUnitario",
        },
        {
            Header: "Cantidad",
            accessor: "cantidad",
        },
        {
            Header: "% IV",
            accessor: "impuesto",
        },
        {
            Header: "% Descuento",
            accessor: "descuento",
        },
        {
            Header: "Gravado",
            accessor: "gravado",
        },
        {
            Header: "Acciones",
            accessor: "icon"
        }
    ];

    return (
        <>

            <div className="row mb-3 text-center">

                <div className="col-md-12 mb-3">

                    <div className="card">

                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Información del Articulo</h4>
                        </div>

                        <div className="card-body">

                            <div className="row mb-3">
                                <div className="col-md-3 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Código del Artículo'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Descripción</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Descripción del Artículo'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Precio Unitario</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Precio del Artículo'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Fletes</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaTruckFast className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Fletes del Artículo'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3 text-center">
                                
                                <div className="col-md-2 mb-3">
                                    <h5>Costo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Costo Total'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Descuento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Descuento Total'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Impuesto</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Impuesto Total'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Cantidad</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsSortNumericDown className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Cantidad Total'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>SubTotal</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Sob-Total Final'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3 text-center">
                                <div className="col-md-3 mb-3"> </div>
                                <div className="col-md-6 mb-3">
                                    <h5>Observaciones</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Observaciones Extras'
                                            disabled={DisableInputs}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3"> </div>
                            </div>

                            <div className="row mb-3 text-center">
                                <hr />
                                <div className="table-responsive-md tablaP">
                                    <PurchaseOrderBodyArticulosTable columns={columns} data={[
                                        {
                                            codigo : 'test',
                                            descripcion : 'test',
                                            precioUnitario : 'test',
                                            cantidad : 'test',
                                            impuesto : 'test',
                                            descuento : 'test',
                                            gravado : 'test',
                                        }
                                    ]} />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
