import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { BsSortNumericDown } from "react-icons/bs";
import { FaPercentage, FaSearch, FaEdit } from "react-icons/fa";
import { FaColonSign, FaHashtag } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { MdNoteAdd } from 'react-icons/md';

import { PurchaseOrderBodyArticulosTable } from "./PurchaseOrderBodyArticulosTable";

import { 
    CleanStateArticuloOrdenCompra,
    SetAddOneArticulosOrdenCompra,
    SetCantidadArticuloOrdenCompra,
    SetCodigoArticuloOrdenCompra,
    SetDescripcionArticuloOrdenCompra, 
    SetDescuentoArticuloOrdenCompra,
    SetEditArticuloOrdenCompra,
    SetImpuestoArticuloOrdenCompra, 
    SetIsEditArticuloOrdenCompra, 
    SetIsOpenModalSearchInventoryOrdenCompra, 
    SetPrecioUnitarioArticuloOrdenCompra,
    SetSubtotalArticuloOrdenCompra,
    SetTotalArticuloOrdenCompra,
    SetTotalDescuentoOrdenCompra,
    SetTotalFinalOrdenCompra,
    SetTotalImpuestosOrdenCompra,
    SetTotalSubTotalOrdenCompra,
    startGetOneInventoryOrdenCompra
} from "../../actions/ordenCompraAction";

export const PurchaseOrderBodyArticulos = () => {

    const dispatch = useDispatch();
        
    const { disableInputsArticulo, ordenCompra, articulo, isEditArticulo, indexArticuloSeleted } = useSelector((state) => state.ordenCompra);

    const { articulos } = ordenCompra;
    const { 
        idArticulo,
        codigo,
        descripcion,
        precioUnitario,
        descuento,
        impuesto,
        cantidad,
        subtotal,
        total,
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
            Header: "Total",
            accessor: "total",
        },
        {
            Header: "Acciones",
            accessor: "icon"
        }
    ];

    useEffect(() => {
        
        let totalSubTotal = 0;
        let totalDescuento = 0;
        let totalImpuesto = 0;
        let total = 0;

        if( articulos.length > 0 ) {

            articulos.forEach(articulo => {

                totalSubTotal += parseFloat(articulo.subtotal);
                totalDescuento += parseFloat(articulo.montoDescuento);
                totalImpuesto += parseFloat(articulo.montoImpuesto);
                total += parseFloat(articulo.total);

            });

            dispatch( SetTotalSubTotalOrdenCompra(parseFloat(totalSubTotal).toFixed(2)) );
            dispatch( SetTotalDescuentoOrdenCompra(parseFloat(totalDescuento).toFixed(2)) );
            dispatch( SetTotalImpuestosOrdenCompra(parseFloat(totalImpuesto).toFixed(2)) );
            dispatch( SetTotalFinalOrdenCompra(parseFloat(total).toFixed(2)) );

        } else {
            dispatch( SetTotalSubTotalOrdenCompra(0) );
            dispatch( SetTotalDescuentoOrdenCompra(0) );
            dispatch( SetTotalImpuestosOrdenCompra(0) );
            dispatch( SetTotalFinalOrdenCompra(0) );
        }
    
        return () => {}

    }, [articulos]);
    

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

    const handleChangeCantidad = ({ target }) => {

        let cantidad = parseInt(target.value);
        let subTotal = parseFloat(precioUnitario) * cantidad;

        if( parseInt(descuento) != 0 ) {
            let montoDescuento = (subTotal * descuento) / 100;
            subTotal = subTotal - montoDescuento;
        }

        let montoImpuesto = (subTotal * impuesto) / 100;
        let total = subTotal + montoImpuesto;

        dispatch( SetCantidadArticuloOrdenCompra(cantidad) );
        dispatch( SetSubtotalArticuloOrdenCompra(subTotal.toFixed(2)) );
        dispatch( SetTotalArticuloOrdenCompra(parseFloat(total).toFixed(2)) );

    }

    const handleChangeDescuento = ({ target }) => {

        let descuento = parseInt(target.value);
        let subTotal = parseFloat(precioUnitario) * cantidad;

        let montoDescuento = (subTotal * descuento) / 100;
        let nuevoSubtotal = subTotal - montoDescuento;

        let montoImpuesto = (nuevoSubtotal * impuesto) / 100;
        let total = nuevoSubtotal + montoImpuesto;

        dispatch( SetDescuentoArticuloOrdenCompra(descuento) );
        dispatch( SetSubtotalArticuloOrdenCompra(nuevoSubtotal.toFixed(2)) );
        dispatch( SetTotalArticuloOrdenCompra(parseFloat(total).toFixed(2)) );

    }

    const handleChangeImpuesto = ({ target }) => {

        let nuevoImpuesto = parseInt(target.value);
        let subTotal = parseFloat(precioUnitario) * cantidad;

        if( parseInt(descuento) != 0 ) {
            let montoDescuento = (subTotal * descuento) / 100;
            subTotal = subTotal - montoDescuento;
        }

        let montoImpuesto = (subTotal * nuevoImpuesto) / 100;
        let total = subTotal + montoImpuesto;

        dispatch( SetImpuestoArticuloOrdenCompra(nuevoImpuesto) );
        dispatch( SetSubtotalArticuloOrdenCompra(subTotal.toFixed(2)) );
        dispatch( SetTotalArticuloOrdenCompra(parseFloat(total).toFixed(2)) );

    }

    const handleAddArticulo = () => {

        if( codigo == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, seleccione un producto para agregar.'
            });

            return;
        }

        let montoDescuento = (subtotal * descuento) / 100;
        let montoImpuesto = (subtotal * impuesto) / 100;

        const newArticle = {
            idArticulo,
            codigo,
            descripcion,
            precioUnitario,
            descuento,
            impuesto,
            cantidad,
            subtotal,
            total,
            observaciones,
            montoDescuento,
            montoImpuesto
        }

        dispatch( SetAddOneArticulosOrdenCompra(newArticle) );
        dispatch( CleanStateArticuloOrdenCompra() );

    }

    const handleEditArticulo = () => {
        
        if( codigo == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, seleccione un producto para editar.'
            });

            return;
        }

        let montoDescuento = (subtotal * descuento) / 100;
        let montoImpuesto = (subtotal * impuesto) / 100;

        const editArticle = {
            idArticulo,
            codigo,
            descripcion,
            precioUnitario,
            descuento,
            impuesto,
            cantidad,
            subtotal,
            total,
            observaciones,
            montoDescuento,
            montoImpuesto
        }

        dispatch( SetEditArticuloOrdenCompra({ index: indexArticuloSeleted, article: editArticle }) );
        dispatch( SetIsEditArticuloOrdenCompra(false) );
        dispatch( CleanStateArticuloOrdenCompra() );

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
                                            disabled={disableInputsArticulo}
                                            value={codigo}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetCodigoArticuloOrdenCompra)
                                            }
                                            onKeyDown={handleClickDownCodigo}
                                        />
                                        <button
                                            type="button"
                                            className={ disableInputsArticulo ? 'btn btn-primary disabled' : 'btn btn-primary' }
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
                                            disabled={disableInputsArticulo}
                                            value={descripcion}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetDescripcionArticuloOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Precio Unitario</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Precio del Artículo'
                                            disabled={disableInputsArticulo}
                                            value={precioUnitario}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetPrecioUnitarioArticuloOrdenCompra)
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
                                            type='number'
                                            min="0" 
                                            className='form-control'
                                            placeholder='Descuento Total'
                                            disabled={disableInputsArticulo}
                                            value={descuento}
                                            onChange={(e) =>
                                                handleChangeDescuento(e, SetDescuentoArticuloOrdenCompra)
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
                                            type='number'
                                            min="0"
                                            className='form-control'
                                            placeholder='Impuesto Total'
                                            disabled={disableInputsArticulo}
                                            value={impuesto}
                                            onChange={(e) => handleChangeImpuesto(e) }
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="row mb-3 text-center">  

                                <div className="col-md-2 mb-3">
                                    <h5>Cantidad</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsSortNumericDown className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            min="1"
                                            className='form-control'
                                            placeholder='Cantidad Total'
                                            disabled={disableInputsArticulo}
                                            value={cantidad}
                                            onChange={(e) => handleChangeCantidad(e)}
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
                                            disabled={true}
                                            value={subtotal}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetSubtotalArticuloOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Total</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Sob-Total Final'
                                            disabled={true}
                                            value={total}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetSubtotalArticuloOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3 flex-column justify-content-end">
                                    <button 
                                        className={ 
                                            (isEditArticulo)
                                                ? (disableInputsArticulo) 
                                                    ? 'btn btn-warning ms-auto disabled' 
                                                    : 'btn btn-warning ms-auto' 
                                                : (disableInputsArticulo) 
                                                    ? 'btn btn-success ms-auto disabled' 
                                                    : 'btn btn-success ms-auto' 
                                        }
                                        onClick={ (isEditArticulo) ? handleEditArticulo : handleAddArticulo}
                                    >
                                        { (isEditArticulo)
                                            ? <div>
                                                <FaEdit className='iconSize' /> Editar
                                            </div>
                                            : <div>
                                                <MdNoteAdd className='iconSize' /> Agregar
                                            </div> 
                                        }
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
