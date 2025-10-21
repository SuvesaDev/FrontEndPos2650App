import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaPercentage, FaSearch } from 'react-icons/fa';
import { MdDeleteForever, MdShoppingCart } from 'react-icons/md';
import { FaCircleExclamation, FaColonSign } from 'react-icons/fa6';
import { TbEditCircle } from 'react-icons/tb';
import { IoAddCircle } from "react-icons/io5";
import { GoNumber } from 'react-icons/go';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import { FollowingConsignmentBodyDetailsItemsTable } from './FollowingConsignmentBodyDetailsItemsTable';

import { 
    SetCantidadFollowingConsignment, 
    SetMontoImpuestoFollowingConsignment, 
    SetPrecioUnitFollowingConsignment, 
    SetSubTotalFollowingConsignment, 
    startEditDetalleActualFollowingConsignment 
} from '../../../../actions/FollowingConsignmentAction';

export const FollowingConsignmentBodyDetailsItems = () => {

    const dispatch = useDispatch();

    const { dollar } = useSelector(state => state.sidebar);

    const { 
        factura, 
        isDespachar, 
        detalleArticuloActual,
        isEditDetalle,
        cantidadMaximaPermitida,
        posicionActual
    } = useSelector(state => state.followingConsignment);

    const {
        CodArticulo,
        Precio_Unit,
        Impuesto,
        Cantidad,
        CantidadMaxima,
        SubTotal,
        nombreLote,
        Descuento,
        ImpuestoOriginal
    } = detalleArticuloActual;

    const columns = useMemo(
        () => [
            {
                Header: "Código",
                accessor: "CodArticulo",
            },
            {
                Header: "Descripcion",
                accessor: "Descripcion",
            },
            {
                Header: "Cantidad Original",
                accessor: "CantidadMaxima",
            },
            {
                Header: "Cantidad Despachar",
                accessor: "Cantidad",
            },
            ...( false
                    ? []
                    : [
                        {
                            Header: "Precio Uni.",
                            accessor: "Precio_Unit",
                            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
                        },
                        {
                            Header: "IV",
                            accessor: "Monto_Impuesto",
                            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
                        },
                        {
                            Header: "Lote",
                            accessor: "nombreLote",
                        },
                    ]
                ),
            {
                Header: "SubTotal",
                accessor: "SubTotal",
                Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
            }
        ],
        [true]
    );

    const isNumeric = (valor, minimo) => {

        let ultimoCaracter = String(valor).charAt(String(valor).length - 1);
        let primerCaracter = String(valor).charAt(0);

        if (valor === "") {
            return false;
        }
        if (isNaN(primerCaracter)) {
            return false;
        }
        if (isNaN(ultimoCaracter)) {
            return false;
        }
        if (isNaN(valor)) {
            return false;
        }
        if (parseFloat(valor) < parseFloat(minimo)) {
            return false;
        }

        return true;
    }

    const handleChangeCantidad = ({ target }) => {
            
        dispatch(SetCantidadFollowingConsignment(target.value));
        calculateTotalsProductCurrent({
            precioUnit: Precio_Unit,
            cantidad: target.value,
            descuento: Descuento
        });
    }

    const calculateTotalsProductCurrent = (parametros) => {
            
        let precio = parseFloat(parametros.precioUnit);
        let cantidad = parseFloat(parametros.cantidad);
        let descuento = parseFloat(parametros.descuento);
        let impuesto = ImpuestoOriginal;

        if (isNaN(precio)) return;

        if (isNaN(cantidad)) return;

        if (isNaN(descuento)) return;

        if (isNaN(impuesto)) return;

        var resulImpuesto = ((precio * cantidad)) * (impuesto / 100);
        dispatch(SetMontoImpuestoFollowingConsignment( parseFloat(resulImpuesto).toFixed(2)));

        //cuando se agrega un articulo o se cambia el precio, descuento o cantidad
        //se calcualan los subtotales, desuentos e impuestos del producto
        if (parseFloat(factura.encabezado.Cod_Moneda) === 2) {
            precio = precio / dollar;
            dispatch(SetPrecioUnitFollowingConsignment(precio));
        }

        //SubTotal
        dispatch(SetSubTotalFollowingConsignment( parseFloat(precio * cantidad).toFixed(2)));
        
    }

    const handleClickEditDetalle = (e) => {
                            
            //   e.preventDefault();
            
            //Validacion de campo numerico
            if (isNumeric(Cantidad, 1)) 
            {
                const index = parseFloat(posicionActual);

                //Editar la linea detalle
                dispatch(startEditDetalleActualFollowingConsignment(
                    detalleArticuloActual,
                    index
                ));


            } else {
    
                e.preventDefault();
    
                Swal.fire({
                    icon: 'error',
                    title: 'No se puede procesar la operaccion',
                    text: 'Por favor verifique que los datos ingresados sean correctos'
                });
    
            }
    
    }

    return (

        <>
            <div className='card'>

                <div className="card-header inline-container">
                    <h5>Articulos de la consignacion: </h5>
                </div>

                <div className="card-body">

                    <div className={ (isDespachar) ? 'row mb-3' : 'row mb-3 d-none' }>
                    
                        <div className="col-md-3 mb-3">
                            <h5>Código</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <GoNumber
                                        className="iconSize" />
                                </span>
                                <input
                                    className='form-control'
                                    type='number'
                                    min="0"
                                    placeholder='0'
                                    autoComplete="off"
                                    disabled={true}
                                    value={CodArticulo}
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
                                    className= { isNumeric(Precio_Unit, 0) ? 'form-control' : 'txtResulPrecioInvalid' }
                                    name="Precio_Unit"
                                    type='text'
                                    autoComplete="off"
                                    disabled={true}
                                    value={ new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Precio_Unit) }

                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Impuesto</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    name="Impuesto"
                                    autoComplete="off"
                                    disabled={true}
                                    value={Impuesto}
                                />

                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Lote</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <MdShoppingCart className="iconSize" />
                                </span>
                                <input
                                    name="lotes"
                                    autoComplete="off"
                                    className="form-control"
                                    disabled={true}
                                    value={nombreLote}
                                />
                            </div>
                        </div>

                    </div>

                    <div className={ (isDespachar) ? 'row mb-3' : 'row mb-3 d-none' }>
                        <div className="col-md-2 mb-3">
                            <h5>Cantidad Original</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <AiOutlineFieldNumber className="iconSize" />
                                </span>
                                <input
                                    className={ (isNumeric(Cantidad, 0)) ? 'form-control' : 'form-control textRed'}
                                    name="Cantidad"
                                    autoComplete="off"
                                    type='number'
                                    disabled={true}
                                    value={CantidadMaxima}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Cantidad Despachar</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <AiOutlineFieldNumber className="iconSize" />
                                </span>
                                <input
                                    className={ (isNumeric(Cantidad, 0)) ? 'form-control' : 'form-control textRed'}
                                    name="Cantidad"
                                    autoComplete="off"
                                    type='number'
                                    max={cantidadMaximaPermitida}
                                    min={1}
                                    disabled={!isEditDetalle}
                                    value={Cantidad}
                                    onChange={(e) => handleChangeCantidad(e)}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Sub Total</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    name="SubTotal"
                                    autoComplete="off"
                                    className="form-control"
                                    disabled={true}
                                    value={ new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(SubTotal)}
                                />
                            </div>
                        </div>

                        <div className="col-md-1 mb-3">
                            <hr />
                            <div className='inline-container'>
                                <button
                                    className={ (isEditDetalle) ? 'btn btn-warning' : 'btn btn-warning disabled' }
                                    onClick={handleClickEditDetalle}
                                >
                                    Editar <TbEditCircle className="iconSize" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-md-12 mb-2'>
                            <FollowingConsignmentBodyDetailsItemsTable 
                                columns={columns} 
                                data={factura.detalle}
                            />
                        </div>
                    </div>

                </div>

            </div>

        </>

    )
}
