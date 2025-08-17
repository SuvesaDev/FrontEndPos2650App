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
    SetCodArticuloDetalleConsignment 
} from '../../actions/ConsignmentAction';

export const ConsignmentItems = (props) => {

    const dispatch = useDispatch();

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    const { dollar } = useSelector(state => state.sidebar);
    const { billings, showInfoMessage } = useSelector(state => state.billing);

    const { 
        enableItems,
        detalleArticuloActual,
        factura
    } = useSelector(state => state.consignment);

    const { 
        Descripcion,
        CodArticulo,
        Precio_Unit,
        Impuesto,
        Descuento,
        SubTotal,
        idLote,
        Cantidad
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
                            Header: "IV.%",
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
        // dispatch(SetOpenSearchInventoryBilling({ value: true, number: numberScreen }));
        // dispatch(CleanDetalleActualBilling({ number: numberScreen }));
        // dispatch(SetValorFiltroSearchModalInventory(""));
    }

    const handleChangePrecioUnit = ({ target }) => {

        // if (!enableItems) return;

        // dispatch(SetPrecio_UnitDetalleActualBilling({ value: target.value, number: numberScreen }));
        // calculateTotalsProductCurrent({
        //     precioUnit: target.value,
        //     cantidad: billings[numberScreen].detalleArticuloActual.Cantidad,
        //     descuento: billings[numberScreen].detalleArticuloActual.Descuento
        // });
    }

    const handleChangeCantidad = ({ target }) => {

        // if (!enableItems) return;

        // dispatch(SetCantidadDetalleActualBilling({ value: target.value, number: numberScreen }));
        // calculateTotalsProductCurrent({
        //     precioUnit: billings[numberScreen].detalleArticuloActual.Precio_Unit,
        //     cantidad: target.value,
        //     descuento: billings[numberScreen].detalleArticuloActual.Descuento
        // });
    }

    const handleChangeDescuento = ({ target }) => {

        // if (!enableItems) return;

        // dispatch(SetDescuentoDetalleActualBilling({ value: target.value, number: numberScreen }));
        // calculateTotalsProductCurrent({
        //     precioUnit: billings[numberScreen].detalleArticuloActual.Precio_Unit,
        //     cantidad: billings[numberScreen].detalleArticuloActual.Cantidad,
        //     descuento: target.value
        // });
    }

    const handleChangeLote = ({ target }) => {
        
        // if (!enableItems) return;

        // const idLote = target.value;
        // const loteSeleted = billings[numberScreen].lotesByArticulo.find( lot => lot.id == idLote );

        // dispatch( SetIdLoteDetalleActualBilling({ value: idLote, number: numberScreen }));
        // dispatch( SetNombreLoteDetalleActualBilling({ value: loteSeleted.lote, number: numberScreen }) );
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

        // if (!enableItems) return;

        // if (e.key === 'Enter') {

        //     props.inputRefCodigo.current.blur();

        //     const resp = await dispatch(startGetOneInventoryBillingByCodArticulo(
        //         e.target.defaultValue,
        //         {
        //             tipoPrecio: billings[numberScreen].clienteFacturacionEdit.tipoPrecio,
        //             Cod_Moneda: billings[numberScreen].factura.encabezado.Cod_Moneda,
        //             HasCartaExoneracionBilling: billings[numberScreen].HasCartaExoneracionBilling,
        //             cartaBilling: billings[numberScreen].cartaBilling,
        //             mag: billings[numberScreen].factura.encabezado.mag,
        //             dollar
        //         },
        //         numberScreen
        //     ));

        //     if (resp === false) {
        //         props.inputRefCodigo.current.focus();
        //     } else {
        //         dispatch(SetautoFocusCodigoBilling({ value: false, number: numberScreen }));
        //         dispatch(SetautoFocusDescBilling({ value: false, number: numberScreen }));
        //         dispatch(SetautoFocusCantidadBilling({ value: false, number: numberScreen }));
        //         dispatch(SetautoFocusPrecioUnitBilling({ value: true, number: numberScreen }));
        //     }

        // }
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
        
        // if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;
        
        // if( billings[numberScreen].lotesByArticulo.length == 0 ) {
            
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'No se puede procesar la informacion',
        //         text: 'El producto no tiene lotes'
        //     });

        //     return;
        // }

        // //   e.preventDefault();

        // //Validacion para productos sin decimales
        // if (billings[numberScreen].detalleArticuloActual.sinDecimal == true
        //     && billings[numberScreen].detalleArticuloActual.Cantidad.toString().indexOf(".") > 0) {

        //     e.preventDefault();

        //     Swal.fire({
        //         icon: 'error',
        //         title: 'No se puede procesar la informacion',
        //         text: 'El producto no permite ventas con decimales'
        //     });

        //     return false;
        // } else {

        //     //Validacion de campo numerico
        //     if (isNumeric(billings[numberScreen].detalleArticuloActual.Precio_Unit, 0.10)
        //         && isNumeric(billings[numberScreen].detalleArticuloActual.Descuento, 0)
        //         && isNumeric(billings[numberScreen].detalleArticuloActual.Cantidad, 1)
        //         && billings[numberScreen].detalleArticuloActual.idLote != 0) {

        //         // Se desactiva el startEditing
        //         dispatch(SetStartEditingBilling({ value: false, number: numberScreen }));

        //         if (parseFloat(billings[numberScreen].detalleArticuloActual.Descuento) <= billings[numberScreen].detalleArticuloActual.max_Descuento) {

        //             if (billings[numberScreen].isEditDetalleActual) {

        //                 const index = parseFloat(billings[numberScreen].PosicionActual);

        //                 //Editar la linea detalle
        //                 dispatch(startEditDetalleActualBilling(
        //                     billings[numberScreen].detalleArticuloActual,
        //                     index,
        //                     numberScreen
        //                 ));

        //             } else {
        //                 //Agregar linea detalle
        //                 props.inputRefCantidad.current.blur();
        //                 dispatch(startAddDetalleActualBilling(
        //                     billings[numberScreen].detalleArticuloActual,
        //                     numberScreen
        //                 ));

        //             }

        //         } else {

        //             e.preventDefault();

        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Producto tiene un maximo descuento de ' + billings[numberScreen].detalleArticuloActual.max_Descuento + ' %',
        //                 text: billings[numberScreen].detalleArticuloActual.Descripcion
        //             });
        //         }


        //     } else {

        //         e.preventDefault();

        //         Swal.fire({
        //             icon: 'error',
        //             title: 'No se puede procesar la operaccion',
        //             text: 'Por favor verifique que los datos ingresados sean correctos'
        //         });

        //     }

        // }
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;
        dispatch(action({ value: target.value, number: numberScreen }));
    };

    const calculateTotalsProductCurrent = (parametros) => {

        // let precio = parseFloat(parametros.precioUnit);
        // let cantidad = parseFloat(parametros.cantidad);
        // let descuento = parseFloat(parametros.descuento);
        // let impuesto = parseFloat(billings[numberScreen].detalleArticuloActual.ImpuestoOriginal);

        // if (isNaN(precio)) return;

        // if (isNaN(cantidad)) return;

        // if (isNaN(descuento)) return;

        // if (isNaN(impuesto)) return;


        // if (billings[numberScreen] === undefined) return;

        // //cuando se agrega un articulo o se cambia el precio, descuento o cantidad
        // //se calcualan los subtotales, desuentos e impuestos del producto
        // if (billings[numberScreen].detalleArticuloActual.codFxArticulo > 0) {

        //     //Diferentes precios
        //     switch (billings[numberScreen].clienteFacturacionEdit.tipoPrecio) {

        //         case 1:

        //             precio = billings[numberScreen].detalleArticuloActual.precio_A;
        //             dispatch(SetPrecio_UnitDetalleActualBilling({ value: billings[numberScreen].detalleArticuloActual.precio_A, number: numberScreen }));

        //             //Aplica precio promocion.
        //             if (billings[numberScreen].detalleArticuloActual.promo_Activa === true) {

        //                 var inicio = new Date(billings[numberScreen].detalleArticuloActual.promo_Inicio);
        //                 var final = new Date(billings[numberScreen].detalleArticuloActual.promo_Finaliza);
        //                 var hoy = new Date();

        //                 var i = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');
        //                 var f = new Date(final.getTime() - (final.getTimezoneOffset() * 60000)).toISOString().split('T');
        //                 var h = new Date(hoy.getTime() - (hoy.getTimezoneOffset() * 60000)).toISOString().split('T');

        //                 //   hoy >= inicio    hoy <= final
        //                 if (h[0] >= i[0] && h[0] <= f[0]) {
        //                     precio = billings[numberScreen].detalleArticuloActual.promo_Inicio; //cambia el precio del producto al precio promocion
        //                     dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));
        //                 }
        //             }
        //             break;

        //         case 2:

        //             precio = billings[numberScreen].detalleArticuloActual.precio_B;

        //             if (precio === 0) {
        //                 precio = billings[numberScreen].detalleArticuloActual.precio_A;
        //             }

        //             dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));

        //             break;

        //         case 3:

        //             precio = billings[numberScreen].detalleArticuloActual.precio_C;

        //             if (precio === 0) {
        //                 precio = billings[numberScreen].detalleArticuloActual.precio_A
        //             }

        //             dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));

        //             break;

        //         case 4:

        //             precio = billings[numberScreen].detalleArticuloActual.precio_D;

        //             if (precio === 0) {
        //                 precio = billings[numberScreen].detalleArticuloActual.precio_A
        //             }

        //             dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));

        //             break;

        //         default:

        //             precio = billings[numberScreen].detalleArticuloActual.precio_A;
        //             dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));
        //     };

        //     if (parseFloat(billings[numberScreen].factura.encabezado.Cod_Moneda) === 2) {
        //         precio = precio / dollar;
        //         dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));
        //     }

        //     //Exoneraciones y Tarifas Reducidas del IVA
        //     if (billings[numberScreen].HasCartaExoneracionBilling == true) {

        //         //comprobar si la carta esta vencida      
        //         var vence = new Date(billings[numberScreen].cartaBilling.fechaVence);
        //         var hoy = new Date();

        //         var a = new Date(vence.getTime() - (vence.getTimezoneOffset() * 60000)).toISOString().split('T');
        //         var b = new Date(hoy.getTime() - (hoy.getTimezoneOffset() * 60000)).toISOString().split('T');

        //         if (a[0] >= b[0]) { //si no esta vencida                      
        //             if (impuesto >= billings[numberScreen].cartaBilling.porcentajeCompra) {
        //                 impuesto = impuesto - billings[numberScreen].cartaBilling.porcentajeCompra;
        //             } else {
        //                 impuesto = 0;
        //             }
        //         }

        //     } else {

        //         if (billings[numberScreen].detalleArticuloActual.Mag == true
        //             && billings[numberScreen].factura.encabezado.mag == true) {
        //             //Si el cliente esta inscrito en el Mag y el producto es agricola 
        //             //Se aplica una tarifa reducida del IVA del 1%.
        //             impuesto = 1;
        //         }
        //     }

        //     //Si el producto es de Consignacion
        //     if (billings[numberScreen].detalleArticuloActual.Consignacion == true) {

        //         if (billings[numberScreen].detalleArticuloActual.Existencias >= cantidad) {

        //             //Primero usa las existencia de la veterinaria
        //             dispatch(SetCantVetDetalleActualBilling({ value: cantidad, number: numberScreen }));
        //             dispatch(SetCantBodDetalleActualBilling({ value: 0, number: numberScreen }));

        //         } else {

        //             if (billings[numberScreen].detalleArticuloActual.Existencias > 0) {

        //                 // Usa las existencias de la veterinaria y lo que falta de la bodega de consignacion
        //                 dispatch(SetCantVetDetalleActualBilling({ value: billings[numberScreen].detalleArticuloActual.Existencias, number: numberScreen }));
        //                 dispatch(SetCantBodDetalleActualBilling({ value: cantidad - billings[numberScreen].detalleArticuloActual.Existencias, number: numberScreen }));

        //             } else {

        //                 //usa solo la existencia de la bodega de consignacion
        //                 dispatch(SetCantVetDetalleActualBilling({ value: 0, number: numberScreen }));
        //                 dispatch(SetCantBodDetalleActualBilling({ value: cantidad, number: numberScreen }));
        //             }

        //         }
        //     }

        //     var resulDescuento = (precio * cantidad) * (descuento / 100);
        //     var resulImpuesto = ((precio * cantidad) - resulDescuento) * (impuesto / 100);

        //     dispatch(SetImpuestoDetalleActualBilling({ value: parseFloat(impuesto), number: numberScreen }));
        //     dispatch(SetMonto_DescuentoDetalleActualBilling({ value: resulDescuento, number: numberScreen }));
        //     dispatch(SetMonto_ImpuestoDetalleActualBilling({ value: resulImpuesto, number: numberScreen }));

        //     //SubTotal
        //     dispatch(SetSubTotalDetalleActualBilling({ value: precio * cantidad, number: numberScreen }));

        //     if (impuesto > 0) {
        //         dispatch(SetSubtotalGravadoDetalleActualBilling({ value: precio * cantidad, number: numberScreen }));
        //         dispatch(SetSubTotalExcentoDetalleActualBilling({ value: 0, number: numberScreen }));
        //     } else {
        //         dispatch(SetSubtotalGravadoDetalleActualBilling({ value: 0, number: numberScreen }));
        //         dispatch(SetSubTotalExcentoDetalleActualBilling({ value: precio * cantidad, number: numberScreen }));
        //     }
        // }
    }

    // const msgInfoBilling = (
    //     <Tooltip>
    //         {
    //             billings[numberScreen] !== undefined ? (
    //                 billings[numberScreen].isEditDetalleActual ? (
    //                     <>
    //                         Puedes Editar  {" "}
    //                         el producto con Enter en el campo de Cantidad o el botón de  {" "}
    //                         Editar <TbEditCircle className="iconSize" />
    //                     </>
    //                 ) : (
    //                     <>
    //                         Puedes Agregar  {" "}
    //                         el producto con Enter en el campo de Cantidad o el botón de  {" "}
    //                         Agregar <IoAddCircle className="iconSize" />
    //                     </>
    //                 )
    //             ) : (
    //                 <>
    //                     Puedes Agregar  {" "}
    //                     el producto con Enter en el campo de Cantidad o el botón de  {" "}
    //                     Agregar <IoAddCircle className="iconSize" />
    //                 </>
    //             )
    //         }
    //     </Tooltip>
    // );

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
                                    ref={props.inputRefCodigo}
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
                                    ref={props.inputRefPrecioUnit}
                                    disabled
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
                                    ref={props.inputRefDescuento}
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
                                    disabled={enableItems}
                                    value={idLote}
                                    onChange={e => handleChangeLote(e)}
                                >
                                    <option value={0} selected disabled hidden> Seleccione... </option>
                                    {/* {
                                        (billings[numberScreen] !== undefined)
                                            ?   (billings[numberScreen].lotesByArticulo != [])
                                                    ?   billings[numberScreen].lotesByArticulo.map(lote => {
                                                            return <option key={lote.id} value={lote.id}> {lote.lote} - {lote.vencimiento} - {lote.existencia} </option>
                                                        })
                                                    :   <option value=''></option>
                                            :   <option value=''></option>
                                    } */}
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
                                    ref={props.inputRefCantidad}
                                    disabled={enableItems}
                                    value={Cantidad}
                                    onKeyDown={handleClickDownCantidad}
                                    onChange={e => handleChangeCantidad(e)}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <hr />
                            <div className='inline-container'>
                                <OverlayTrigger placement="top"> 
                                    {/* overlay={msgInfoBilling} */}
                                    <button
                                        className={ (enableItems) ? 'btn btn-dark' : 'btn btn-dark disabled' }
                                    >
                                        <FaCircleExclamation className="Iconsize" />
                                    </button>
                                </OverlayTrigger>

                                <button
                                    className='btn btn-success'
                                    // className={
                                    //     (billings[numberScreen] !== undefined)
                                    //         ? (billings[numberScreen].isEditDetalleActual)
                                    //             ? 'btn btn-warning'
                                    //             : 'btn btn-success'
                                    //         : 'btn btn-success'
                                    // }
                                    onClick={handleClickAddProducto}
                                    disabled={!enableItems}
                                >
                                    <>
                                        Agregar <IoAddCircle className="iconSize" />
                                    </>
                                    {/* {
                                        billings[numberScreen] !== undefined ? (
                                            billings[numberScreen].isEditDetalleActual ? (
                                                <>
                                                    Editar <TbEditCircle className="iconSize" />
                                                </>
                                            ) : (
                                                <>
                                                    Agregar <IoAddCircle className="iconSize" />
                                                </>
                                            )
                                        ) : (
                                            <>
                                                Agregar <IoAddCircle className="iconSize" />
                                            </>
                                        )
                                    } */}
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
