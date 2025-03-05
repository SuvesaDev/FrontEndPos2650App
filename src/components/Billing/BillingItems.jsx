import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BillingItemsTable } from './BillingItemsTable';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaBoxes, FaCode, FaNewspaper, FaPercentage, FaSearch } from 'react-icons/fa';
import { MdDeleteForever, MdOutlineInventory } from 'react-icons/md';
import { MdShoppingCart } from "react-icons/md";

import { OpenSearchModalInventory, SetValorFiltroSearchModalInventory } from '../../actions/inventory';
import { InventorySearchModal } from '../Inventory/InventorySearchModal';

import {
    CleanDetalleArticuloDeleteBilling,
    SetautoFocusCantidadBilling,
    SetautoFocusCodigoBilling,
    SetautoFocusDescBilling,
    SetautoFocusPrecioUnitBilling,
    SetCantidadDetalleActualBilling,
    SetChangeDetalleBilling,
    SetCodArticuloDetalleActualBilling,
    SetDescuentoBilling,
    SetDescuentoDetalleActualBilling,
    SetImp_VentaBilling,
    SetMonto_DescuentoDetalleActualBilling,
    SetImpuestoDetalleActualBilling,
    SetMonto_ImpuestoDetalleActualBilling,
    SetOpenSearchInventoryBilling,
    SetPrecio_UnitDetalleActualBilling,
    SetSubTotalBilling,
    SetSubTotalDetalleActualBilling,
    SetSubTotalExcentoDetalleActualBilling,
    SetSubTotalExentoBilling,
    SetSubTotalGravadaBilling,
    SetSubtotalGravadoDetalleActualBilling,
    SetTotalBilling,
    startAddDetalleActualBilling,
    startEditDetalleActualBilling,
    startEditDetalleBilling,
    SetAplicaDescuento,
    startSearchCartaExoneracion,
    SetActualizoCarta,
    SetCantVetDetalleActualBilling,
    SetCantBodDetalleActualBilling,
    CleanDetalleActualBilling,
    startGetOneInventoryBillingByCodArticulo,
    SetStartEditingBilling,
    SetId_BodegaDetalleActualBilling,
    SetShowInfoMessageBilling
} from '../../actions/billing';
import { FaBarcode, FaBoxesPacking, FaCircleExclamation, FaColonSign, FaDollarSign } from 'react-icons/fa6';
import { TbEditCircle } from 'react-icons/tb';
import { IoAddCircle } from "react-icons/io5";
import { Bs0CircleFill } from 'react-icons/bs';
import { GoNumber } from 'react-icons/go';
import { AiOutlineFieldNumber } from 'react-icons/ai';

export const BillingItems = (props) => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { dollar } = useSelector(state => state.sidebar);
    const { bodegasInventory } = useSelector(state => state.bodegas);
    const { billings, showInfoMessage } = useSelector(state => state.billing);

    const {
        optionsSearchInventory,

    } = useSelector(state => state.inventory);


    const {
        valorfiltro,
    } = optionsSearchInventory;


    const columns = [
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
    ];

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    // Hacer cuando se agrega un producto, modifica
    //calculos de totales generales
    // useEffect(() => {

    //     if( billings[numberScreen] === undefined ) return;

    //     if( !billings[numberScreen].startEditing ) {
    //         console.log('entro useEffect Calculo Generales');
    //         console.log(numberScreen)
    //         let SubTotalGeneral = 0;
    //         let SubTotalExcentoGeneral = 0;
    //         let SubTotalGravadoGeneral = 0;
    //         let MontoDescuentoGeneral = 0;
    //         let MontoImpuestoGeneral = 0;

    //         if ( billings[numberScreen].factura.detalle.length !== 0) {

    //             let index = 0;

    //             billings[numberScreen].factura.detalle.forEach(linea => {
    //                 SubTotalGeneral = SubTotalGeneral + linea.SubTotal;
    //                 SubTotalExcentoGeneral = SubTotalExcentoGeneral + linea.SubTotalExcento;
    //                 SubTotalGravadoGeneral = SubTotalGravadoGeneral + linea.SubtotalGravado;
    //                 MontoDescuentoGeneral = MontoDescuentoGeneral + linea.Monto_Descuento;
    //                 MontoImpuestoGeneral = MontoImpuestoGeneral + linea.Monto_Impuesto;
    //                 index = index + 1;
    //             });

    //             dispatch( SetSubTotalBilling( { value: SubTotalGeneral, number : numberScreen } ));
    //             dispatch( SetSubTotalGravadaBilling( { value: SubTotalGravadoGeneral, number : numberScreen } ));
    //             dispatch( SetSubTotalExentoBilling( { value: SubTotalExcentoGeneral, number : numberScreen } ));
    //             dispatch( SetDescuentoBilling( { value: MontoDescuentoGeneral, number : numberScreen } ));
    //             dispatch( SetImp_VentaBilling( { value: MontoImpuestoGeneral, number : numberScreen } ));
    //             dispatch( SetTotalBilling( { value: SubTotalGeneral - MontoDescuentoGeneral + MontoImpuestoGeneral, number : numberScreen } ));
    //             dispatch( SetAplicaDescuento( { value: false, number : numberScreen } ));

    //         }
    //     }

    // }, [ ( billings[numberScreen] !== undefined ) 
    //         ? billings[numberScreen].factura.detalle 
    //         : null 
    // ]);

    // Esto se hace cuando se obtiene cliente, actualiza la carta, cambia la moneda
    // useEffect(async () => {

    //     if( billings[numberScreen] === undefined ) return;
    //     console.log('entro useEffect MAG, Precios, Exoneraciones');
    //     //Cuando se cambia el cliente hay que recalcular los subtotales, descuentos e impuestos 
    //     //Porque pueden cambiar opciones como el Mag, Precios, Exoneraciones
    //     if ( billings[numberScreen].factura.detalle.length !== 0 && !billings[numberScreen].startEditing ) {

    //         if ( billings[numberScreen].ActualizoCarta == true) {

    //             await dispatch( startSearchCartaExoneracion( billings[numberScreen].factura.encabezado.cedula_Usuario , numberScreen ));

    //             dispatch( SetActualizoCarta( { value: false, number : numberScreen } ));
    //         }

    //         await calcularTotales();
    //     }

    // }, [
    //     ( billings[numberScreen] !== undefined ) 
    //         ? (
    //             billings[numberScreen].factura.encabezado.cod_Cliente, 
    //             billings[numberScreen].ActualizoCarta, 
    //             billings[numberScreen].factura.encabezado.Cod_Moneda
    //         )
    //         : null
    // ]);

    // Se hace cuando se indica un descuento en Totals
    //Aplica Descuento General
    // useEffect(async () => {

    //     if( billings[numberScreen] === undefined ) return;
    //     console.log('entro useEffect Descuento');
    //     if ( billings[numberScreen].AplicaDescuento == true) {

    //         if ( billings[numberScreen].factura.detalle.length !== 0) {

    //             let index = 0;

    //             billings[numberScreen].factura.detalle.forEach(linea => {

    //                 if ( linea.max_Descuento > billings[numberScreen].descuentoGeneral ) {

    //                     linea.Descuento = billings[numberScreen].descuentoGeneral;

    //                 } else {

    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Producto tiene un maximo descuento de ' + linea.max_Descuento + ' %',
    //                         text: linea.Descripcion
    //                     });

    //                     linea.Descuento = linea.max_Descuento;
    //                 }

    //                 linea.SubTotal = (linea.Precio_Unit * linea.Cantidad);
    //                 linea.Monto_Descuento = linea.SubTotal * (linea.Descuento / 100);
    //                 linea.Monto_Impuesto = (linea.SubTotal - linea.Monto_Descuento) * (linea.Impuesto / 100);

    //                 if (linea.Impuesto > 0) {
    //                     linea.SubtotalGravado = linea.SubTotal;
    //                     linea.SubTotalExcento = 0;
    //                 } else {
    //                     linea.SubtotalGravado = 0;
    //                     linea.SubTotalExcento = linea.SubTotal;
    //                 }

    //                 dispatch( startEditDetalleBilling(linea, index, numberScreen) );
    //                 index = index + 1;
    //             });

    //             dispatch( SetAplicaDescuento( { value: false, number : numberScreen } ));
    //         }
    //     }

    // }, [ 
    //     ( billings[numberScreen] !== undefined )
    //         ? billings[numberScreen].AplicaDescuento 
    //         : null
    // ]);

    // Se hace cuando se marca el check de extranjero en Totals
    //Aplica porcentaje de extranjero
    // useEffect(async () => {

    //     if( billings[numberScreen] === undefined ) return;
    //     console.log('entro useEffect Extranjero');
    //     console.log(billings[numberScreen].factura.detalle)
    //     if( billings[numberScreen].aumentoExtranjero === 0 && billings[numberScreen].factura.detalle.length !== 0 ) {

    //         Swal.fire({
    //             icon: 'warning',
    //             title: 'Advertencia',
    //             text: 'No se cargo el porcentaje de aumento de extranjero'
    //         });

    //         return;
    //     }

    //     if ( billings[numberScreen].factura.detalle.length === 0) {
    //         return;
    //     }

    //     if ( billings[numberScreen].extranjero === true ) {
    //         console.log('aumentar')
    //         // Aumentar
    //         let index = 0;
    //         let montoAumento = 0;

    //         billings[numberScreen].factura.detalle.forEach(linea => {

    //             montoAumento = linea.Precio_Unit * ( billings[numberScreen].aumentoExtranjero / 100 );
    //             linea.Precio_Unit = linea.Precio_Unit + montoAumento;
    //             linea.SubTotal = (linea.Precio_Unit * linea.Cantidad);
    //             linea.Monto_Impuesto = linea.SubTotal * (linea.Impuesto / 100);

    //             if (linea.Impuesto > 0) {
    //                 linea.SubtotalGravado = linea.SubTotal;
    //                 linea.SubTotalExcento = 0;
    //             } else {
    //                 linea.SubtotalGravado = 0;
    //                 linea.SubTotalExcento = linea.SubTotal;
    //             }

    //             dispatch( startEditDetalleBilling(linea, index, numberScreen ) );

    //             index = index + 1;
    //         });

    //     } else if ( billings[numberScreen].extranjero === false ) {

    //         //Disminuir
    //         let index = 0;
    //         let montoAumento = 0;

    //         billings[numberScreen].factura.detalle.forEach(linea => {

    //             console.log(` Precio_UnitOriginal: ${linea.Precio_UnitOriginal} `);
    //             console.log(` Precio_Unit: ${linea.Precio_Unit} `);
    //             console.log(` Cantidad: ${linea.Cantidad} `);
    //             console.log(` SubTotal: ${linea.SubTotal} `);
    //             console.log(` Impuesto: ${linea.Impuesto} `);
    //             console.log(` Monto_Impuesto: ${linea.Monto_Impuesto} `);

    //             montoAumento = linea.Precio_UnitOriginal * ( billings[numberScreen].aumentoExtranjero / 100 );
    //             console.log(`Monto Aumento ${montoAumento}`);

    //             linea.Precio_Unit = linea.Precio_Unit - montoAumento;
    //             console.log(`Precio Unit ${montoAumento}`);

    //             linea.SubTotal = (linea.Precio_Unit * linea.Cantidad);
    //             console.log(`SubTotal ${montoAumento}`);

    //             linea.Monto_Impuesto = linea.SubTotal * (linea.Impuesto / 100);
    //             console.log(`Monto Impuesto ${montoAumento}`);

    //             // if (linea.Impuesto > 0) {
    //             //     linea.SubtotalGravado = linea.SubTotal;
    //             //     linea.SubTotalExcento = 0;
    //             // } else {
    //             //     linea.SubtotalGravado = 0;
    //             //     linea.SubTotalExcento = linea.SubTotal;
    //             // }

    //             console.log(linea);
    //             // dispatch( startEditDetalleBilling( linea, index, numberScreen ));

    //             index = index + 1;
    //         });

    //     }

    // }, [ 
    //     ( billings[numberScreen] !== undefined )
    //         ?? billings[numberScreen].extranjero
    // ]);


    // const handleClickAddProducto = (e) => {

    //     if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

    //     //   e.preventDefault();

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

    const calcularTotales = async () => {

        if (billings[numberScreen] === undefined) return;

        let index = 0;

        billings[numberScreen].factura.detalle.forEach(linea => {

            //Diferentes precios
            switch (billings[numberScreen].clienteFacturacionEdit.tipoPrecio) {

                case 1:

                    linea.Precio_Unit = linea.precio_A

                    if (linea.promo_Activa === true) {
                        var inicio = new Date(linea.promo_Inicio);
                        var final = new Date(linea.promo_Finaliza);
                        var hoy = new Date();

                        var i = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');
                        var f = new Date(final.getTime() - (final.getTimezoneOffset() * 60000)).toISOString().split('T');
                        var h = new Date(hoy.getTime() - (hoy.getTimezoneOffset() * 60000)).toISOString().split('T');

                        //   hoy >= inicio    hoy <= final
                        if (h[0] >= i[0] && h[0] <= f[0]) {
                            linea.Precio_Unit = linea.precio_Promo; //cambia el precio del producto al precio promocion
                        }
                    };

                    break;

                case 2:

                    linea.Precio_Unit = linea.precio_B;

                    if (linea.Precio_Unit === 0) {
                        linea.Precio_Unit = linea.precio_A;
                    }

                    break;

                case 3:

                    linea.Precio_Unit = linea.precio_C;

                    if (linea.Precio_Unit === 0) {
                        linea.Precio_Unit = linea.precio_A;
                    }

                    break;

                case 4:

                    linea.Precio_Unit = linea.precio_D;

                    if (linea.Precio_Unit === 0) {
                        linea.Precio_Unit = linea.precio_A;
                    }

                    break;

                default:
                    linea.Precio_Unit = linea.precio_A;
            }

            if (parseFloat(billings[numberScreen].factura.encabezado.Cod_Moneda) === 2) {
                linea.Precio_Unit = linea.Precio_Unit / dollar;
            }

            //Exoneraciones y Tarifa Reducida del IVA
            if (billings[numberScreen].HasCartaExoneracionBilling == true) {

                var vence = new Date(billings[numberScreen].cartaBilling.fechaVence);
                var hoy = new Date();
                var a = new Date(vence.getTime() - (vence.getTimezoneOffset() * 60000)).toISOString().split('T');
                var b = new Date(hoy.getTime() - (hoy.getTimezoneOffset() * 60000)).toISOString().split('T');

                if (a[0] >= b[0]) { //si no esta vencida                      
                    if (linea.ImpuestoOriginal >= billings[numberScreen].cartaBilling.porcentajeCompra) {
                        linea.Impuesto = linea.ImpuestoOriginal - billings[numberScreen].cartaBilling.porcentajeCompra;
                    } else {
                        linea.Impuesto = 0;
                    }
                }

            } else {

                if (linea.Mag == true && billings[numberScreen].factura.encabezado.mag == true) {
                    //Si el cliente esta inscrito en el Mag y el producto es agricola 
                    //Se aplica una tarfia reducida del IVA del 1%.
                    linea.Impuesto = 1;
                } else {
                    //Vuelve a su impuesto original
                    linea.Impuesto = linea.ImpuestoOriginal;
                }
            }

            var resulSubTotal = (linea.Precio_Unit * linea.Cantidad);
            var resulDescuento = resulSubTotal * (linea.Descuento / 100);
            var resulImpuesto = (resulSubTotal - resulDescuento) * (linea.Impuesto / 100);

            linea.Monto_Descuento = resulDescuento;
            linea.Monto_Impuesto = resulImpuesto;
            linea.SubTotal = resulSubTotal;

            if (linea.Impuesto > 0) {
                linea.SubtotalGravado = resulSubTotal;
                linea.SubTotalExcento = 0;
            } else {
                linea.SubtotalGravado = 0;
                linea.SubTotalExcento = resulSubTotal;
            }

            dispatch(startEditDetalleBilling(linea, index, numberScreen));

            index = index + 1;
        });

    }

    const handleSearchArticleBilling = async (e) => {
        dispatch(SetOpenSearchInventoryBilling({ value: true, number: numberScreen }));
        dispatch(CleanDetalleActualBilling({ number: numberScreen }));
        dispatch(SetValorFiltroSearchModalInventory(""));
    }

    const handleChangePrecioUnit = ({ target }) => {

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        dispatch(SetPrecio_UnitDetalleActualBilling({ value: target.value, number: numberScreen }));
        calculateTotalsProductCurrent({
            precioUnit: target.value,
            cantidad: billings[numberScreen].detalleArticuloActual.Cantidad,
            descuento: billings[numberScreen].detalleArticuloActual.Descuento
        });
    }

    const handleChangeCantidad = ({ target }) => {

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        dispatch(SetCantidadDetalleActualBilling({ value: target.value, number: numberScreen }));
        calculateTotalsProductCurrent({
            precioUnit: billings[numberScreen].detalleArticuloActual.Precio_Unit,
            cantidad: target.value,
            descuento: billings[numberScreen].detalleArticuloActual.Descuento
        });
    }

    const handleChangeDescuento = ({ target }) => {

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        dispatch(SetDescuentoDetalleActualBilling({ value: target.value, number: numberScreen }));
        calculateTotalsProductCurrent({
            precioUnit: billings[numberScreen].detalleArticuloActual.Precio_Unit,
            cantidad: billings[numberScreen].detalleArticuloActual.Cantidad,
            descuento: target.value
        });
    }

    const handleClickDownPrecioUnit = (e) => {

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        if (e.key === 'Enter') {
            dispatch(SetautoFocusCodigoBilling({ value: false, number: numberScreen }));
            dispatch(SetautoFocusPrecioUnitBilling({ value: false, number: numberScreen }));
            dispatch(SetautoFocusDescBilling({ value: true, number: numberScreen }));
            dispatch(SetautoFocusCantidadBilling({ value: false, number: numberScreen }));
        }
    }

    const handleClickDownDesc = (e) => {

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        if (e.key === 'Enter') {
            dispatch(SetautoFocusCodigoBilling({ value: false, number: numberScreen }));
            dispatch(SetautoFocusPrecioUnitBilling({ value: false, number: numberScreen }));
            dispatch(SetautoFocusDescBilling({ value: false, number: numberScreen }));
            dispatch(SetautoFocusCantidadBilling({ value: true, number: numberScreen }));
        }
    }

    const isNumeric = (valor, minimo) => {

        if (billings[numberScreen] === undefined) return;

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

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        if (e.key === 'Enter') {

            props.inputRefCodigo.current.blur();

            const resp = await dispatch(startGetOneInventoryBillingByCodArticulo(
                e.target.defaultValue,
                {
                    tipoPrecio: billings[numberScreen].clienteFacturacionEdit.tipoPrecio,
                    Cod_Moneda: billings[numberScreen].factura.encabezado.Cod_Moneda,
                    HasCartaExoneracionBilling: billings[numberScreen].HasCartaExoneracionBilling,
                    cartaBilling: billings[numberScreen].cartaBilling,
                    mag: billings[numberScreen].factura.encabezado.mag,
                    dollar
                },
                numberScreen
            ));

            if (resp === false) {
                props.inputRefCodigo.current.focus();
            } else {
                dispatch(SetautoFocusCodigoBilling({ value: false, number: numberScreen }));
                dispatch(SetautoFocusDescBilling({ value: false, number: numberScreen }));
                dispatch(SetautoFocusCantidadBilling({ value: false, number: numberScreen }));
                dispatch(SetautoFocusPrecioUnitBilling({ value: true, number: numberScreen }));
            }

        }
    }


    const handleClickDownCantidad = (e) => {

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        //   e.preventDefault();
        if (e.key === 'Enter') {

            //Validacion para productos sin decimales
            if (billings[numberScreen].detalleArticuloActual.sinDecimal == true
                && billings[numberScreen].detalleArticuloActual.Cantidad.toString().indexOf(".") > 0) {

                e.preventDefault();

                Swal.fire({
                    icon: 'error',
                    title: 'No se puede procesar la informacion',
                    text: 'El producto no permite ventas con decimales'
                });

                return false;
            } else {

                //Validacion de campo numerico
                if (isNumeric(billings[numberScreen].detalleArticuloActual.Precio_Unit, 0.10)
                    && isNumeric(billings[numberScreen].detalleArticuloActual.Descuento, 0)
                    && isNumeric(billings[numberScreen].detalleArticuloActual.Cantidad, 1)) {

                    // Se desactiva el startEditing
                    dispatch(SetStartEditingBilling({ value: false, number: numberScreen }));

                    if (parseFloat(billings[numberScreen].detalleArticuloActual.Descuento) <= billings[numberScreen].detalleArticuloActual.max_Descuento) {

                        if (billings[numberScreen].isEditDetalleActual) {

                            const index = parseFloat(billings[numberScreen].PosicionActual);

                            //Editar la linea detalle
                            dispatch(startEditDetalleActualBilling(
                                billings[numberScreen].detalleArticuloActual,
                                index,
                                numberScreen
                            ));

                        } else {
                            //Agregar linea detalle
                            props.inputRefCantidad.current.blur();
                            dispatch(startAddDetalleActualBilling(
                                billings[numberScreen].detalleArticuloActual,
                                numberScreen
                            ));

                        }

                    } else {

                        e.preventDefault();

                        Swal.fire({
                            icon: 'error',
                            title: 'Producto tiene un maximo descuento de ' + billings[numberScreen].detalleArticuloActual.max_Descuento + ' %',
                            text: billings[numberScreen].detalleArticuloActual.Descripcion
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
        }
    }

    const handleClickAddProducto = (e) => {

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        //   e.preventDefault();

        //Validacion para productos sin decimales
        if (billings[numberScreen].detalleArticuloActual.sinDecimal == true
            && billings[numberScreen].detalleArticuloActual.Cantidad.toString().indexOf(".") > 0) {

            e.preventDefault();

            Swal.fire({
                icon: 'error',
                title: 'No se puede procesar la informacion',
                text: 'El producto no permite ventas con decimales'
            });

            return false;
        } else {

            //Validacion de campo numerico
            if (isNumeric(billings[numberScreen].detalleArticuloActual.Precio_Unit, 0.10)
                && isNumeric(billings[numberScreen].detalleArticuloActual.Descuento, 0)
                && isNumeric(billings[numberScreen].detalleArticuloActual.Cantidad, 1)) {

                // Se desactiva el startEditing
                dispatch(SetStartEditingBilling({ value: false, number: numberScreen }));

                if (parseFloat(billings[numberScreen].detalleArticuloActual.Descuento) <= billings[numberScreen].detalleArticuloActual.max_Descuento) {

                    if (billings[numberScreen].isEditDetalleActual) {

                        const index = parseFloat(billings[numberScreen].PosicionActual);

                        //Editar la linea detalle
                        dispatch(startEditDetalleActualBilling(
                            billings[numberScreen].detalleArticuloActual,
                            index,
                            numberScreen
                        ));

                    } else {
                        //Agregar linea detalle
                        props.inputRefCantidad.current.blur();
                        dispatch(startAddDetalleActualBilling(
                            billings[numberScreen].detalleArticuloActual,
                            numberScreen
                        ));

                    }

                } else {

                    e.preventDefault();

                    Swal.fire({
                        icon: 'error',
                        title: 'Producto tiene un maximo descuento de ' + billings[numberScreen].detalleArticuloActual.max_Descuento + ' %',
                        text: billings[numberScreen].detalleArticuloActual.Descripcion
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
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;
        dispatch(action({ value: target.value, number: numberScreen }));
    };

    const calculateTotalsProductCurrent = (parametros) => {

        let precio = parseFloat(parametros.precioUnit);
        let cantidad = parseFloat(parametros.cantidad);
        let descuento = parseFloat(parametros.descuento);
        let impuesto = parseFloat(billings[numberScreen].detalleArticuloActual.ImpuestoOriginal);

        if (isNaN(precio)) return;

        if (isNaN(cantidad)) return;

        if (isNaN(descuento)) return;

        if (isNaN(impuesto)) return;


        if (billings[numberScreen] === undefined) return;

        //cuando se agrega un articulo o se cambia el precio, descuento o cantidad
        //se calcualan los subtotales, desuentos e impuestos del producto
        if (billings[numberScreen].detalleArticuloActual.codFxArticulo > 0) {

            //Diferentes precios
            switch (billings[numberScreen].clienteFacturacionEdit.tipoPrecio) {

                case 1:

                    precio = billings[numberScreen].detalleArticuloActual.precio_A;
                    dispatch(SetPrecio_UnitDetalleActualBilling({ value: billings[numberScreen].detalleArticuloActual.precio_A, number: numberScreen }));

                    //Aplica precio promocion.
                    if (billings[numberScreen].detalleArticuloActual.promo_Activa === true) {

                        var inicio = new Date(billings[numberScreen].detalleArticuloActual.promo_Inicio);
                        var final = new Date(billings[numberScreen].detalleArticuloActual.promo_Finaliza);
                        var hoy = new Date();

                        var i = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');
                        var f = new Date(final.getTime() - (final.getTimezoneOffset() * 60000)).toISOString().split('T');
                        var h = new Date(hoy.getTime() - (hoy.getTimezoneOffset() * 60000)).toISOString().split('T');

                        //   hoy >= inicio    hoy <= final
                        if (h[0] >= i[0] && h[0] <= f[0]) {
                            precio = billings[numberScreen].detalleArticuloActual.promo_Inicio; //cambia el precio del producto al precio promocion
                            dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));
                        }
                    }
                    break;

                case 2:

                    precio = billings[numberScreen].detalleArticuloActual.precio_B;

                    if (precio === 0) {
                        precio = billings[numberScreen].detalleArticuloActual.precio_A;
                    }

                    dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));

                    break;

                case 3:

                    precio = billings[numberScreen].detalleArticuloActual.precio_C;

                    if (precio === 0) {
                        precio = billings[numberScreen].detalleArticuloActual.precio_A
                    }

                    dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));

                    break;

                case 4:

                    precio = billings[numberScreen].detalleArticuloActual.precio_D;

                    if (precio === 0) {
                        precio = billings[numberScreen].detalleArticuloActual.precio_A
                    }

                    dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));

                    break;

                default:

                    precio = billings[numberScreen].detalleArticuloActual.precio_A;
                    dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));
            };

            if (parseFloat(billings[numberScreen].factura.encabezado.Cod_Moneda) === 2) {
                precio = precio / dollar;
                dispatch(SetPrecio_UnitDetalleActualBilling({ value: precio, number: numberScreen }));
            }

            //Exoneraciones y Tarifas Reducidas del IVA
            if (billings[numberScreen].HasCartaExoneracionBilling == true) {

                //comprobar si la carta esta vencida      
                var vence = new Date(billings[numberScreen].cartaBilling.fechaVence);
                var hoy = new Date();

                var a = new Date(vence.getTime() - (vence.getTimezoneOffset() * 60000)).toISOString().split('T');
                var b = new Date(hoy.getTime() - (hoy.getTimezoneOffset() * 60000)).toISOString().split('T');

                if (a[0] >= b[0]) { //si no esta vencida                      
                    if (impuesto >= billings[numberScreen].cartaBilling.porcentajeCompra) {
                        impuesto = impuesto - billings[numberScreen].cartaBilling.porcentajeCompra;
                    } else {
                        impuesto = 0;
                    }
                }

            } else {

                if (billings[numberScreen].detalleArticuloActual.Mag == true
                    && billings[numberScreen].factura.encabezado.mag == true) {
                    //Si el cliente esta inscrito en el Mag y el producto es agricola 
                    //Se aplica una tarifa reducida del IVA del 1%.
                    impuesto = 1;
                }
            }

            //Si el producto es de Consignacion
            if (billings[numberScreen].detalleArticuloActual.Consignacion == true) {

                if (billings[numberScreen].detalleArticuloActual.Existencias >= cantidad) {

                    //Primero usa las existencia de la veterinaria
                    dispatch(SetCantVetDetalleActualBilling({ value: cantidad, number: numberScreen }));
                    dispatch(SetCantBodDetalleActualBilling({ value: 0, number: numberScreen }));

                } else {

                    if (billings[numberScreen].detalleArticuloActual.Existencias > 0) {

                        // Usa las existencias de la veterinaria y lo que falta de la bodega de consignacion
                        dispatch(SetCantVetDetalleActualBilling({ value: billings[numberScreen].detalleArticuloActual.Existencias, number: numberScreen }));
                        dispatch(SetCantBodDetalleActualBilling({ value: cantidad - billings[numberScreen].detalleArticuloActual.Existencias, number: numberScreen }));

                    } else {

                        //usa solo la existencia de la bodega de consignacion
                        dispatch(SetCantVetDetalleActualBilling({ value: 0, number: numberScreen }));
                        dispatch(SetCantBodDetalleActualBilling({ value: cantidad, number: numberScreen }));
                    }

                }
            }

            var resulDescuento = (precio * cantidad) * (descuento / 100);
            var resulImpuesto = ((precio * cantidad) - resulDescuento) * (impuesto / 100);

            dispatch(SetImpuestoDetalleActualBilling({ value: parseFloat(impuesto), number: numberScreen }));
            dispatch(SetMonto_DescuentoDetalleActualBilling({ value: resulDescuento, number: numberScreen }));
            dispatch(SetMonto_ImpuestoDetalleActualBilling({ value: resulImpuesto, number: numberScreen }));

            //SubTotal
            dispatch(SetSubTotalDetalleActualBilling({ value: precio * cantidad, number: numberScreen }));

            if (impuesto > 0) {
                dispatch(SetSubtotalGravadoDetalleActualBilling({ value: precio * cantidad, number: numberScreen }));
                dispatch(SetSubTotalExcentoDetalleActualBilling({ value: 0, number: numberScreen }));
            } else {
                dispatch(SetSubtotalGravadoDetalleActualBilling({ value: 0, number: numberScreen }));
                dispatch(SetSubTotalExcentoDetalleActualBilling({ value: precio * cantidad, number: numberScreen }));
            }
        }
    }

    const msgInfoBilling = (
        <Tooltip>
            {
                billings[numberScreen] !== undefined ? (
                    billings[numberScreen].isEditDetalleActual ? (
                        <>
                            Puedes Editar  {" "}
                            el producto con Enter en el campo de Cantidad o el botón de  {" "}
                            Editar <TbEditCircle className="iconSize" />
                        </>
                    ) : (
                        <>
                            Puedes Agregar  {" "}
                            el producto con Enter en el campo de Cantidad o el botón de  {" "}
                            Agregar <IoAddCircle className="iconSize" />
                        </>
                    )
                ) : (
                    <>
                        Puedes Agregar  {" "}
                        el producto con Enter en el campo de Cantidad o el botón de  {" "}
                        Agregar <IoAddCircle className="iconSize" />
                    </>
                )
            }
        </Tooltip>
    );


    return (

        <>
            <div className='card'>

                <div className="card-header inline-container">
                    <h5>Artículo a Facturar: <strong style={{ color: 'red' }}>{(billings[numberScreen] !== undefined)
                        ? billings[numberScreen].detalleArticuloActual.Descripcion
                        : ''}</strong></h5>
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
                                    disabled={
                                        (billings[numberScreen] !== undefined)
                                            ? !billings[numberScreen].enableItems
                                            : true
                                    }
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].detalleArticuloActual.CodArticulo
                                            : ''
                                    }
                                    onChange={e => handleInputChangeWithDispatch(e, SetCodArticuloDetalleActualBilling)}
                                    onKeyDown={handleClickDownCodigo}
                                />
                                <button

                                    type="button"
                                    id="btnBuscarArticulo"
                                    className={
                                        (billings[numberScreen] !== undefined)
                                            ? (billings[numberScreen].enableItems) ? 'btn btn-primary' : 'btn btn-primary disabled'
                                            : 'btn btn-primary disabled'
                                    }
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
                                    {
                                        (billings[numberScreen] !== undefined)
                                            ? (parseFloat(billings[numberScreen].factura.encabezado.Cod_Moneda) === 2)
                                                ? <FaDollarSign className="iconSize" />
                                                : <FaColonSign className="iconSize" />
                                            : <FaColonSign className="iconSize" />
                                    }
                                </span>
                                <input

                                    className={
                                        (billings[numberScreen] !== undefined)
                                            ? (isNumeric(billings[numberScreen].detalleArticuloActual.Precio_Unit, 0))
                                                ? 'form-control'
                                                : 'txtResulPrecioInvalid'
                                            : 'form-control'
                                    }
                                    name="Precio_Unit"
                                    type='text'
                                    autoComplete="off"
                                    ref={props.inputRefPrecioUnit}
                                    disabled
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ?
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(billings[numberScreen].detalleArticuloActual.Precio_Unit)
                                            : ''
                                    }
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
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].detalleArticuloActual.Impuesto
                                            : ''
                                    }
                                />

                            </div>
                        </div>

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-3 mb-3 d-none" : "col-md-3 mb-3" :  "col-md-3 mb-3"}>
                            <h5>Bodega</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaBoxesPacking className="iconSize" />
                                </span>

                                <select
                                    name="Id_Bodega"
                                    autoComplete="off"
                                    className='form-select'
                                    disabled={
                                        (billings[numberScreen] !== undefined)
                                            ? !billings[numberScreen].enableItems
                                            : true
                                    }
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].detalleArticuloActual.Id_Bodega
                                            : ''
                                    }
                                    onChange={e => handleInputChangeWithDispatch(e, SetId_BodegaDetalleActualBilling)}
                                >
                                    <option value={0} selected disabled hidden> Seleccione... </option>
                                    {
                                        (bodegasInventory != null)
                                            ? bodegasInventory.map(tipo => {
                                                return <option value={tipo.idBodega}> {tipo.nombreBodega} </option>
                                            })
                                            : <option value=''>No Bodegas</option>
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Descuento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    className={
                                        (billings[numberScreen] !== undefined)
                                            ? (isNumeric(billings[numberScreen].detalleArticuloActual.Descuento, 0))
                                                ? 'form-control'
                                                : 'form-control textRed'
                                            : 'form-control'
                                    }
                                    name="Descuento"
                                    autoComplete="off"
                                    type='number'
                                    min="0"
                                    ref={props.inputRefDescuento}
                                    disabled={
                                        (billings[numberScreen] !== undefined)
                                            ? !billings[numberScreen].enableItems
                                            : true
                                    }
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].detalleArticuloActual.Descuento
                                            : ''
                                    }
                                    onKeyDown={handleClickDownDesc}
                                    onChange={e => handleChangeDescuento(e)}
                                />
                            </div>
                        </div>

                        {
                            (billings[numberScreen] !== undefined) 
                                ? (billings[numberScreen].isCostaPets)
                                    ?   <div className="col-md-2 mb-3">
                                            <h5>Sub Total</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    {
                                                        (billings[numberScreen] !== undefined)
                                                            ? (parseFloat(billings[numberScreen].factura.encabezado.Cod_Moneda) === 2)
                                                                ? <FaDollarSign className="iconSize" />
                                                                : <FaColonSign className="iconSize" />
                                                            : <FaColonSign className="iconSize" />
                                                    }
                                                </span>
                                                <input
                                                    name="SubTotal"
                                                    autoComplete="off"
                                                    className="form-control"
                                                    disabled={true}
                                                    value={
                                                        (billings[numberScreen] !== undefined)
                                                            ?
                                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(billings[numberScreen].detalleArticuloActual.SubTotal)
                                                            : ''
                                                    }
                                                />
                                            </div>
                                        </div>
                                    : null
                                : null
                        }

                    </div>

                    {
                        (billings[numberScreen] !== undefined) 
                            ? (billings[numberScreen].isCostaPets)
                                ?   <div className='row mb-3'>

                                        <div className="col-md-4 mb-3">
                                            <h5>Lote</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <MdShoppingCart className="iconSize" />
                                                </span>
                                                <select
                                                    name="idTipoCliente"
                                                    className="form-select"
                                                    disabled={
                                                        (billings[numberScreen] !== undefined)
                                                            ? !billings[numberScreen].enableItems
                                                            : true
                                                    }
                                                    value={
                                                        (billings[numberScreen] !== undefined)
                                                            ? billings[numberScreen].detalleArticuloActual.idLote
                                                            : ''
                                                    }
                                                    onChange={e => handleInputChangeWithDispatch(e, SetIdLoteDetalleActualBilling)}
                                                >
                                                    <option value={0} selected disabled hidden> Seleccione... </option>
                                                    {
                                                        (billings[numberScreen] !== undefined)
                                                            ?   (billings[numberScreen].lotesByArticulo != [])
                                                                    ?   billings[numberScreen].lotesByArticulo.map(lote => {
                                                                            return <option key={lote.id} value={lote.id}> {lote.lote} - {lote.vencimiento} - {lote.existencia} </option>
                                                                        })
                                                                    :   <option value=''></option>
                                                            :   <option value=''></option>
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-2 mb-3">
                                            <hr />
                                            <div className='inline-container'>
                                                <OverlayTrigger placement="top" overlay={msgInfoBilling}>
                                                    <button
                                                        className={
                                                            (billings[numberScreen] !== undefined)
                                                                ? (billings[numberScreen].enableItems)
                                                                    ? 'btn btn-dark'
                                                                    : 'btn btn-dark disabled'
                                                                : 'btn btn-dark disabled'
                                                        }
                                                    >
                                                        <FaCircleExclamation className="Iconsize" />
                                                    </button>
                                                </OverlayTrigger>
                
                                                <button
                                                    className={
                                                        (billings[numberScreen] !== undefined)
                                                            ? (billings[numberScreen].isEditDetalleActual)
                                                                ? 'btn btn-warning'
                                                                : 'btn btn-success'
                                                            : 'btn btn-success'
                                                    }
                                                    onClick={handleClickAddProducto}
                                                    disabled={
                                                        (billings[numberScreen] !== undefined)
                                                            ? !billings[numberScreen].enableItems
                                                            : true
                                                    }
                                                >
                                                    {
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
                                                    }
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                : null
                            : null
                    }

                    <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "row mb-3 d-none" : "row mb-3" :  "row mb-3"}>
                        <div className="col-md-1 mb-3"></div>
                        <div className="col-md-2 mb-3">
                            <h5>Existencias</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <MdOutlineInventory className="iconSize" />
                                </span>
                                <input
                                    name="Existencias"
                                    autoComplete="off"
                                    className="form-control"
                                    disabled={true}
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].detalleArticuloActual.Existencias
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Cantidad</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <AiOutlineFieldNumber className="iconSize" />
                                </span>
                                <input
                                    className={
                                        (billings[numberScreen] !== undefined)
                                            ? (isNumeric(billings[numberScreen].detalleArticuloActual.Cantidad, 0))
                                                ? 'form-control'
                                                : 'form-control textRed'
                                            : 'form-control'
                                    }
                                    name="Cantidad"
                                    autoComplete="off"
                                    type='number'
                                    min="0"
                                    ref={props.inputRefCantidad}
                                    disabled={
                                        (billings[numberScreen] !== undefined)
                                            ? !billings[numberScreen].enableItems
                                            : true
                                    }
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].detalleArticuloActual.Cantidad
                                            : ''
                                    }
                                    onKeyDown={handleClickDownCantidad}
                                    onChange={e => handleChangeCantidad(e)}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Existencia en Bodega</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaBoxes className="iconSize" />
                                </span>
                                <input
                                    name="ExistenciaBodega"
                                    className='form-control'
                                    autoComplete="off"
                                    disabled={true}
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].detalleArticuloActual.ExistenciaBodega
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Sub Total</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    {
                                        (billings[numberScreen] !== undefined)
                                            ? (parseFloat(billings[numberScreen].factura.encabezado.Cod_Moneda) === 2)
                                                ? <FaDollarSign className="iconSize" />
                                                : <FaColonSign className="iconSize" />
                                            : <FaColonSign className="iconSize" />
                                    }
                                </span>
                                <input
                                    name="SubTotal"
                                    autoComplete="off"
                                    className="form-control"
                                    disabled={true}
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ?
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(billings[numberScreen].detalleArticuloActual.SubTotal)
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <hr />
                            <div className='inline-container'>
                                <OverlayTrigger placement="top" overlay={msgInfoBilling}>
                                    <button
                                        className={
                                            (billings[numberScreen] !== undefined)
                                                ? (billings[numberScreen].enableItems)
                                                    ? 'btn btn-dark'
                                                    : 'btn btn-dark disabled'
                                                : 'btn btn-dark disabled'
                                        }
                                    >
                                        <FaCircleExclamation className="Iconsize" />
                                    </button>
                                </OverlayTrigger>

                                <button
                                    className={
                                        (billings[numberScreen] !== undefined)
                                            ? (billings[numberScreen].isEditDetalleActual)
                                                ? 'btn btn-warning'
                                                : 'btn btn-success'
                                            : 'btn btn-success'
                                    }
                                    onClick={handleClickAddProducto}
                                    disabled={
                                        (billings[numberScreen] !== undefined)
                                            ? !billings[numberScreen].enableItems
                                            : true
                                    }
                                >
                                    {
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
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-md-12 mb-2'>
                            <BillingItemsTable columns={columns} data={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.detalle
                                    : []
                            } />
                        </div>
                    </div>

                </div>

            </div>

            <InventorySearchModal />

        </>

    )
}
