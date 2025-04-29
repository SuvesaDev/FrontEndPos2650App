import { useDispatch, useSelector } from "react-redux";

import { BsSortNumericDown } from "react-icons/bs";
import { FaPercentage, FaSearch } from "react-icons/fa";
import { FaColonSign, FaHashtag, FaTruckFast } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { MdNoteAdd } from 'react-icons/md';

import { PurchaseOrderBodyArticulosTable } from "./PurchaseOrderBodyArticulosTable";

import { 
    SetCantidadArticuloOrdenCompra,
    SetCodigoArticuloOrdenCompra, 
    SetCostoArticuloOrdenCompra, 
    SetDescripcionArticuloOrdenCompra, 
    SetDescuentoArticuloOrdenCompra, 
    SetFletesArticuloOrdenCompra, 
    SetImpuestoArticuloOrdenCompra, 
    SetIsOpenModalSearchInventoryOrdenCompra, 
    SetObservacionesArticuloOrdenCompra, 
    SetPrecioUnitarioArticuloOrdenCompra,
    SetSubtotalArticuloOrdenCompra,
    startGetOneInventoryOrdenCompra
} from "../../actions/ordenCompraAction";

export const PurchaseOrderBodyArticulos = () => {

    const dispatch = useDispatch();
        
    const { DisableInputs, ordenCompra, articulo } = useSelector((state) => state.ordenCompra);

    const { articulos } = ordenCompra;
    const { 
        codigo,
        descripcion,
        precioUnitario,
        fletes,
        costo,
        descuento,
        impuesto,
        cantidad,
        subtotal,
        observaciones 
    } = articulo;

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

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSearchInventory = () => {
        dispatch( SetIsOpenModalSearchInventoryOrdenCompra(true) )
    }

    const handleClickDownCodigo = async (e) => {
    
        if (e.key === 'Enter') {
            dispatch(startGetOneInventoryOrdenCompra( e.target.defaultValue ));
        }
    }

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
                                            value={codigo}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetCodigoArticuloOrdenCompra)
                                            }
                                            onKeyDown={handleClickDownCodigo}
                                        />
                                        <button
                                            type="button"
                                            className={ DisableInputs ? 'btn btn-primary disabled' : 'btn btn-primary' }
                                            onClick={handleSearchInventory}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalBuscarArticulo"
                                        >
                                            <FaSearch className="iconSize" />
                                        </button>
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
                                            value={descripcion}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetDescripcionArticuloOrdenCompra)
                                            }
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
                                            value={precioUnitario}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetPrecioUnitarioArticuloOrdenCompra)
                                            }
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
                                            value={fletes}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetFletesArticuloOrdenCompra)
                                            }
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
                                            value={costo}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetCostoArticuloOrdenCompra)
                                            }
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
                                            value={descuento}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetDescuentoArticuloOrdenCompra)
                                            }
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
                                            value={impuesto}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetImpuestoArticuloOrdenCompra)
                                            }
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
                                            value={cantidad}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetCantidadArticuloOrdenCompra)
                                            }
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
                                            value={subtotal}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetSubtotalArticuloOrdenCompra)
                                            }
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
                                            value={observaciones}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetObservacionesArticuloOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <button 
                                        className='btn btn-success ms-auto'
                                        // onClick={openModalFamilias}
                                    >
                                        <MdNoteAdd className='iconSize' /> Agregar
                                    </button>
                                </div>
                            </div>

                            <div className="row mb-3 text-center">
                                <hr />
                                <div className="table-responsive-md tablaP">
                                    <PurchaseOrderBodyArticulosTable columns={columns} data={articulos} />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
