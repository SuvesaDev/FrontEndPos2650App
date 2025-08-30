import Swal from 'sweetalert2';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaPercentage, FaSearch } from 'react-icons/fa';
import { MdDeleteForever, MdShoppingCart } from 'react-icons/md';
import { FaCircleExclamation, FaColonSign } from 'react-icons/fa6';
import { TbEditCircle } from 'react-icons/tb';
import { IoAddCircle } from "react-icons/io5";
import { GoNumber } from 'react-icons/go';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import { SetValorFiltroSearchModalInventory } from '../../actions/inventory';
import { InventorySearchModal } from '../Inventory/InventorySearchModal';

import { ConsignmentItemsTable } from './ConsignmentItemsTable';

import { 
    SetCantidadDetalleConsignment,
    SetCodArticuloDetalleConsignment, 
    SetDescuentoDetalleConsignment, 
    SetidLoteDetalleConsignment, 
    SetImpuestoDetalleConsignment, 
    SetMonto_DescuentoDetalleConsignment, 
    SetMonto_ImpuestoDetalleConsignment, 
    SetnombreLoteDetalleConsignment, 
    SetOpenSearchInventoryConsignment,
    SetPrecio_UnitDetalleConsignment,
    SetPrecio_UnitOriginalDetalleConsignment,
    SetSubTotalDetalleConsignment,
    SetSubTotalExcentoDetalleConsignment,
    SetSubtotalGravadoDetalleConsignment,
    startAddDetalleActualConsignment,
    startEditDetalleActualConsignment,
    startGetOneInventoryConsignment
} from '../../actions/ConsignmentAction';

export const ConsignmentItems = () => {

    const dispatch = useDispatch();

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    const { dollar } = useSelector(state => state.sidebar);

    const { 
        enableItems,
        detalleArticuloActual,
        factura,
        lotesByArticulo,
        isEditDetalle,
        posicionActual
    } = useSelector(state => state.consignment);

    const { 
        Descripcion,
        CodArticulo,
        Precio_Unit,
        Impuesto,
        Descuento,
        SubTotal,
        idLote,
        Cantidad,
        ImpuestoOriginal,
        max_Descuento,
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
                Header: "Cantidad",
                accessor: "Cantidad",
            },
            ...( isSmallScreen
                    ? []
                    : [
                        {
                            Header: "Precio Uni.",
                            accessor: "Precio_Unit",
                            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
                        },
                        {
                            Header: "Desc.%",
                            accessor: "Descuento",
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
            },
            {
                Header: "Acciones",
                accessor: "icon",
                Cell: () => (
                    <button className='btn btn-danger'>
                        <MdDeleteForever className='iconSizeBtn' />
                    </button>
                ),
    
            },
        ],
        [isSmallScreen]
    );

    useEffect(() => {
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth < 768);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSearchArticleBilling = async (e) => {
        dispatch(SetOpenSearchInventoryConsignment(true));
        dispatch(SetValorFiltroSearchModalInventory(""));
    }

    const handleChangePrecioUnit = ({ target }) => {

        if (!enableItems) return;

        dispatch(SetPrecio_UnitDetalleConsignment(target.value));
        calculateTotalsProductCurrent({
            precioUnit: target.value,
            cantidad: Cantidad,
            descuento: Descuento
        });
    }

    const handleChangeCantidad = ({ target }) => {
        
        if (!enableItems) return;

        dispatch(SetCantidadDetalleConsignment(target.value));
        calculateTotalsProductCurrent({
            precioUnit: Precio_Unit,
            cantidad: target.value,
            descuento: Descuento
        });
    }

    const handleChangeDescuento = ({ target }) => {

        if (!enableItems) return;

        dispatch(SetDescuentoDetalleConsignment(target.value));
        calculateTotalsProductCurrent({
            precioUnit: Precio_Unit,
            cantidad: Cantidad,
            descuento: target.value
        });
    }

    const handleChangeLote = ({ target }) => {
        
        if (!enableItems) return;

        const idLote = target.value;
        const loteSeleted = lotesByArticulo.find( lot => lot.id == idLote );

        dispatch( SetidLoteDetalleConsignment(idLote ));
        dispatch( SetnombreLoteDetalleConsignment(loteSeleted.lote ) );
    }

    const handleClickDownPrecioUnit = (e) => {

        // if (!enableItems) return;

        // if (e.key === 'Enter') {
        //     dispatch(SetautoFocusCodigoBilling({ value: false, number: numberScreen }));
        //     dispatch(SetautoFocusPrecioUnitBilling({ value: false, number: numberScreen }));
        //     dispatch(SetautoFocusDescBilling({ value: true, number: numberScreen }));
        //     dispatch(SetautoFocusCantidadBilling({ value: false, number: numberScreen }));
        // }
    }

    const handleClickDownDesc = (e) => {

        // if (!enableItems) return;

        // if (e.key === 'Enter') {
        //     dispatch(SetautoFocusCodigoBilling({ value: false, number: numberScreen }));
        //     dispatch(SetautoFocusPrecioUnitBilling({ value: false, number: numberScreen }));
        //     dispatch(SetautoFocusDescBilling({ value: false, number: numberScreen }));
        //     dispatch(SetautoFocusCantidadBilling({ value: true, number: numberScreen }));
        // }
    }

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

    const handleClickDownCodigo = async (e) => {

        if (!enableItems) return;

        if (e.key === 'Enter') {

            // props.inputRefCodigo.current.blur();

            // Parametros
            const parametros = {
                Cod_Moneda: factura.encabezado.Cod_Moneda,
                dollar
            };

            //Llamar para traer el inventario desde Registro de Consignacion
            dispatch( startGetOneInventoryConsignment(e.target.defaultValue, parametros) );

            // const resp = await dispatch(startGetOneInventoryBillingByCodArticulo(
            //     e.target.defaultValue,
            //     {
            //         tipoPrecio: billings[numberScreen].clienteFacturacionEdit.tipoPrecio,
            //         Cod_Moneda: billings[numberScreen].factura.encabezado.Cod_Moneda,
            //         HasCartaExoneracionBilling: billings[numberScreen].HasCartaExoneracionBilling,
            //         cartaBilling: billings[numberScreen].cartaBilling,
            //         mag: billings[numberScreen].factura.encabezado.mag,
            //         dollar
            //     },
            //     numberScreen
            // ));

            // if (resp === false) {
            //     props.inputRefCodigo.current.focus();
            // } else {
            //     dispatch(SetautoFocusCodigoBilling({ value: false, number: numberScreen }));
            //     dispatch(SetautoFocusDescBilling({ value: false, number: numberScreen }));
            //     dispatch(SetautoFocusCantidadBilling({ value: false, number: numberScreen }));
            //     dispatch(SetautoFocusPrecioUnitBilling({ value: true, number: numberScreen }));
            // }

        }
    }

    const handleClickDownCantidad = (e) => {

        // if (!enableItems) return;

        // //   e.preventDefault();
        // if (e.key === 'Enter') {

        //     //Validacion para productos sin decimales
        //     if (billings[numberScreen].detalleArticuloActual.sinDecimal == true
        //         && billings[numberScreen].detalleArticuloActual.Cantidad.toString().indexOf(".") > 0) {

        //         e.preventDefault();

        //         Swal.fire({
        //             icon: 'error',
        //             title: 'No se puede procesar la informacion',
        //             text: 'El producto no permite ventas con decimales'
        //         });

        //         return false;
        //     } else {

        //         //Validacion de campo numerico
        //         if (isNumeric(billings[numberScreen].detalleArticuloActual.Precio_Unit, 0.10)
        //             && isNumeric(billings[numberScreen].detalleArticuloActual.Descuento, 0)
        //             && isNumeric(billings[numberScreen].detalleArticuloActual.Cantidad, 1)) {

        //             // Se desactiva el startEditing
        //             dispatch(SetStartEditingBilling({ value: false, number: numberScreen }));

        //             if (parseFloat(billings[numberScreen].detalleArticuloActual.Descuento) <= billings[numberScreen].detalleArticuloActual.max_Descuento) {

        //                 if (billings[numberScreen].isEditDetalleActual) {

        //                     const index = parseFloat(billings[numberScreen].PosicionActual);

        //                     //Editar la linea detalle
        //                     dispatch(startEditDetalleActualBilling(
        //                         billings[numberScreen].detalleArticuloActual,
        //                         index,
        //                         numberScreen
        //                     ));

        //                 } else {
        //                     //Agregar linea detalle
        //                     props.inputRefCantidad.current.blur();
        //                     dispatch(startAddDetalleActualBilling(
        //                         billings[numberScreen].detalleArticuloActual,
        //                         numberScreen
        //                     ));

        //                 }

        //             } else {

        //                 e.preventDefault();

        //                 Swal.fire({
        //                     icon: 'error',
        //                     title: 'Producto tiene un maximo descuento de ' + billings[numberScreen].detalleArticuloActual.max_Descuento + ' %',
        //                     text: billings[numberScreen].detalleArticuloActual.Descripcion
        //                 });
        //             }


        //         } else {

        //             e.preventDefault();

        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'No se puede procesar la operaccion',
        //                 text: 'Por favor verifique que los datos ingresados sean correctos'
        //             });

        //         }

        //     }
        // }
    }

    const handleClickAddProducto = (e) => {
        
        if (!enableItems) return;
        
        if( lotesByArticulo.length == 0 ) {
            
            Swal.fire({
                icon: 'error',
                title: 'No se puede procesar la informacion',
                text: 'El producto no tiene lotes'
            });

            return;
        }

        //   e.preventDefault();
        
        //Validacion de campo numerico
        if (isNumeric(Precio_Unit, 0.10)
            && isNumeric(Descuento, 0)
            && isNumeric(Cantidad, 1)
            && idLote != 0) 
        {

            if (parseFloat(Descuento) <= max_Descuento) {

                if (isEditDetalle) {

                    const index = parseFloat(posicionActual);

                    //Editar la linea detalle
                    dispatch(startEditDetalleActualConsignment(
                        detalleArticuloActual,
                        index
                    ));

                } else {
                    //Agregar linea detalle
                    dispatch( startAddDetalleActualConsignment( detalleArticuloActual ));
                }

            } else {

                e.preventDefault();

                Swal.fire({
                    icon: 'error',
                    title: 'Producto tiene un maximo descuento de ' + max_Descuento + ' %',
                    text: Descripcion
                });
            }


        } else {

            e.preventDefault();

            Swal.fire({
                icon: 'error',
                title: 'No se puede procesar la operaccion',
                text: 'Por favor verifique que los datos ingresados sean correctos'
            });

        }

    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const calculateTotalsProductCurrent = (parametros) => {
        
        let precio = parseFloat(parametros.precioUnit);
        let cantidad = parseFloat(parametros.cantidad);
        let descuento = parseFloat(parametros.descuento);
        let impuesto = ImpuestoOriginal;

        if (isNaN(precio)) return;

        if (isNaN(cantidad)) return;

        if (isNaN(descuento)) return;

        if (isNaN(impuesto)) return;


        //cuando se agrega un articulo o se cambia el precio, descuento o cantidad
        //se calcualan los subtotales, desuentos e impuestos del producto
        if (parseFloat(factura.encabezado.Cod_Moneda) === 2) {
            precio = precio / dollar;
            dispatch(SetPrecio_UnitOriginalDetalleConsignment(precio));
        }

        var resulDescuento = (precio * cantidad) * (descuento / 100);
        var resulImpuesto = ((precio * cantidad) - resulDescuento) * (impuesto / 100);

        dispatch(SetImpuestoDetalleConsignment(impuesto));
        dispatch(SetMonto_DescuentoDetalleConsignment( parseFloat(resulDescuento).toFixed(2)));
        dispatch(SetMonto_ImpuestoDetalleConsignment( parseFloat(resulImpuesto).toFixed(2)));

        //SubTotal
        dispatch(SetSubTotalDetalleConsignment( parseFloat(precio * cantidad).toFixed(2)));

        if (impuesto > 0) {
            dispatch(SetSubtotalGravadoDetalleConsignment( parseFloat(precio * cantidad ).toFixed(2)));
            dispatch(SetSubTotalExcentoDetalleConsignment( 0 ));
        } else {
            dispatch(SetSubtotalGravadoDetalleConsignment(0));
            dispatch(SetSubTotalExcentoDetalleConsignment(parseFloat(precio * cantidad ).toFixed(2)));
        }
        
    }

    const msgInfoBilling = (
        <Tooltip>
            {
                
                // (
                //     isEditDetalleActual ? (
                //         <>
                //             Puedes Editar  {" "}
                //             el producto con Enter en el campo de Cantidad o el botón de  {" "}
                //             Editar <TbEditCircle className="iconSize" />
                //         </>
                //     ) : (
                //         <>
                //             Puedes Agregar  {" "}
                //             el producto con Enter en el campo de Cantidad o el botón de  {" "}
                //             Agregar <IoAddCircle className="iconSize" />
                //         </>
                //     )
                // ) 
                
                <div>
                    Puedes Agregar  {" "}
                    el producto con Enter en el campo de Cantidad o el botón de  {" "}
                    Agregar <IoAddCircle className="iconSize" />
                </div>
                
            }
        </Tooltip>
    );

    return (

        <>
            <div className='card'>

                <div className="card-header inline-container">
                    <h5>Artículo a Facturar: <strong style={{ color: 'red' }}>{Descripcion}</strong></h5>
                </div>

                <div className="card-body">

                    <div className="row mb-3">

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
                                    // ref={props.inputRefCodigo}
                                    disabled={!enableItems}
                                    value={CodArticulo}
                                    onChange={e => handleInputChangeWithDispatch(e, SetCodArticuloDetalleConsignment)}
                                    onKeyDown={handleClickDownCodigo}
                                />
                                <button

                                    type="button"
                                    id="btnBuscarArticulo"
                                    className={ (enableItems) ? 'btn btn-primary' : 'btn btn-primary disabled' }
                                    onClick={handleSearchArticleBilling}
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalBuscarArticulo"

                                >
                                    <FaSearch className="iconSize" />
                                </button>
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
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
                                    // ref={props.inputRefPrecioUnit}
                                    value={ new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Precio_Unit) }
                                    onKeyDown={handleClickDownPrecioUnit}
                                    onChange={e => handleChangePrecioUnit(e)}

                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Impuesto V.%</h5>
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

                        <div className="col-md-2 mb-3">
                            <h5>Descuento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    className={ (isNumeric(Descuento, 0)) ? 'form-control' : 'form-control textRed' }
                                    name="Descuento"
                                    autoComplete="off"
                                    type='number'
                                    min="0"
                                    // ref={props.inputRefDescuento}
                                    disable={enableItems}
                                    value={Descuento}
                                    onKeyDown={handleClickDownDesc}
                                    onChange={e => handleChangeDescuento(e)}
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

                    </div>

                    <div className='row mb-3'>

                        <div className="col-md-4 mb-3">
                            <h5>Lote</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <MdShoppingCart className="iconSize" />
                                </span>
                                <select
                                    name="idTipoCliente"
                                    className="form-select"
                                    disabled={!enableItems}
                                    value={idLote}
                                    onChange={e => handleChangeLote(e)}
                                >
                                    <option value={0} selected disabled hidden> Seleccione... </option>
                                    {
                                        (lotesByArticulo != [])
                                        ?   lotesByArticulo.map(lote => {
                                                return <option key={lote.id} value={lote.id}> {lote.lote} - {lote.vencimiento} - {lote.existencia} </option>
                                            })
                                        :   <option value=''></option>
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Cantidad</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <AiOutlineFieldNumber className="iconSize" />
                                </span>
                                <input
                                    className={ (isNumeric(Cantidad, 0)) ? 'form-control' : 'form-control textRed'}
                                    name="Cantidad"
                                    autoComplete="off"
                                    type='number'
                                    min="0"
                                    // ref={props.inputRefCantidad}
                                    disabled={!enableItems}
                                    value={Cantidad}
                                    onKeyDown={handleClickDownCantidad}
                                    onChange={e => handleChangeCantidad(e)}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <hr />
                            <div className='inline-container'>
                                <OverlayTrigger placement="top" 
                                    overlay={msgInfoBilling}>
                                    <button
                                        className={ (enableItems) ? 'btn btn-dark' : 'btn btn-dark disabled' }
                                    >
                                        <FaCircleExclamation className="Iconsize" />
                                    </button>
                                </OverlayTrigger>

                                <button
                                    className={
                                        (isEditDetalle)
                                            ? 'btn btn-warning'
                                            : 'btn btn-success'
                                    }
                                    onClick={handleClickAddProducto}
                                    disabled={!enableItems}
                                >
                                    {
                                        isEditDetalle ? (
                                            <>
                                                Editar <TbEditCircle className="iconSize" />
                                            </>
                                        ) : (
                                            <>
                                                Agregar <IoAddCircle className="iconSize" />
                                            </>
                                        )
                                    }
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className='row mb-3'>
                        <div className='col-md-12 mb-2'>
                            <ConsignmentItemsTable 
                                columns={columns} 
                                data={factura.detalle}
                            />
                        </div>
                    </div>

                </div>

            </div>

            <InventorySearchModal />

        </>

    )
}
