import Swal from 'sweetalert2';
import moment from 'moment';
import XMLParser from 'react-xml-parser';
import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import { customStyles } from '../../helpers/styleModal';
import { parseXML } from '../../helpers/readXML';

import { FaCalendar, FaFile, FaFileImport, FaHashtag, FaIdCard, FaSortNumericDown, FaPercentage, FaShoppingCart } from 'react-icons/fa';
import { IoIosCheckboxOutline, IoIosCheckmark, IoIosCloseCircle } from 'react-icons/io';
import { GiPriceTag } from "react-icons/gi";
import { FaBuildingUn, FaMoneyBill1, FaDeleteLeft, FaColonSign } from 'react-icons/fa6';
import { FiType } from "react-icons/fi";
import { TbNumber } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";

import { BuysImportarFacturaModalTable } from './BuysImportarFacturaModalTable';

import {
    CleanFacturaCompras,
    CleanLotesImportarFacturaCompras,
    CleanPreciosImportarFacturaCompras,
    CleanStatePricesSellPreciosImportarFacturaCompras,
    CleanStateSearchInventarioCompras,
    SetAddLoteLotesImportarFacturaCompras,
    SetArrayLotesImportarFacturaCompras,
    SetBillingImportXMLCompras,
    SetCedulaProveedorCompras,
    SetChangePrecioIVPreciosImportarFacturaCompras,
    SetChangePrecioPreciosImportarFacturaCompras,
    SetChangeUtilidadPreciosImportarFacturaCompras,
    SetCleanBillingImportXMLCompras,
    SetCod_MonedaCompraCompras,
    SetDefaultSearchInventarioCompras,
    SetDiasCompras,
    SetDisableInputsDiasCompras,
    SetEditPricesSellPreciosImportarFacturaCompras,
    SetExistenciaLotesImportarFacturaCompras,
    SetFacturaCompras,
    SetFechaCompras,
    SetHasCatalogosInternos,
    SetHasChargeFacturaCompras,
    SetIsEditPriceSellPreciosImportarFacturaCompras,
    SetIsOpenImportarXMLModalCompras,
    SetIsOpenModalPrecioImportarFacturaCompras,
    SetLoteLotesImportarFacturaCompras,
    SetNameFileReadXMLCompras,
    SetNuevosCostosArticuloImportarFacturaCompras,
    SetOnePrecioPreciosImportarFacturaCompras,
    SetPrecioIVPreciosImportarFacturaCompras,
    SetPrecioPreciosImportarFacturaCompras,
    SetProveedorCompras,
    SetRemovePricesSellPreciosImportarFacturaCompras,
    SetSearchInventarioCompras,
    SetStartReadingXMLCompras,
    SetTipoCompraCompras,
    SetTipoPreciosImportarFacturaCompras,
    SetUtilidadPreciosImportarFacturaCompras,
    SetValorBusquedaInventariosCompras,
    SetVenceCompras,
    SetVencimientoLotesImportarFacturaCompras,
    startExistProveedorCompras,
    startGetArticulosXMLCompras,
    startGetCatalogosProductosInternos
} from '../../actions/ComprasAction';
import { IoAddCircle } from 'react-icons/io5';
import { BuysPrecioImportarFacturaModalTable } from './BuysPrecioImportarFacturaModalTable';
import { BuysSearchInventarioModalTable } from './BuysSearchInventarioModalTable';
import { TbEditCircle } from 'react-icons/tb';
import { CiCalendarDate } from "react-icons/ci";
import { BuysLotesImportarFacturaModalTable } from './BuysLotesImportarFacturaModalTable';


Modal.setAppElement('#root');

export const BuysImportarFacturaModal = () => {

    var inputFile = createRef(null);

    const dispatch = useDispatch();
    const {
        isOpenImportarXMLModal,
        nameFileReadXML,
        billingImportXML,
        startReadingXML,
        hasCatalogosInternos,
        hasChargeFactura,
        preciosImportarFactura,
        getAllInventariosFilter,
        valorBusquedaInventario,
        isCostaPets,
        lotes,
        seletedNumeroLineaLotes,
        lotesByArticulo
    } = useSelector(state => state.compras);

    const {
        numeroConsecutivo,
        clave,
        emisor,
        fechaEmision,
        condicionVenta,
        plazoCredito,
        resumenFactura,
        detalleServicio,
        detalleServicioTable
    } = billingImportXML;

    const {
        identificacion,
        nombre
    } = emisor;

    const { numero } = identificacion;

    const {
        nuevoCosto,
        impuestoNeto,
        priceSell,
        selectedpriceSell,
        pricesSellBuys,
        hasChangeUtilidadPriceSell,
        hasChangePrecioPriceSell,
        hasChangePrecioIVPriceSell,
        isEditPriceSell,
        codigoProSeleted
    } = preciosImportarFactura;

    const {
        tipo,
        utilidad,
        precio,
        precioIV
    } = priceSell;

    const { 
        lote,
        vencimiento
    } = lotes;

    const columns = [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Código Prov.",
            accessor: "codigoPro",
        },
        {
            Header: "Descripcion Prov.",
            accessor: "descripcionPro",
        },
        {
            Header: "Código Interno",
            accessor: "codigoInt",
        },
        {
            Header: "Descripcion Interna",
            accessor: "descripcionInt",
        },
        {
            Header: "Presentacion",
            accessor: "presentacion",
        },
        {
            Header: "Cantidad",
            accessor: "cantidad",
        },
        {
            Header: "Regalia",
            accessor: "regalia",
        },
        {
            Header: "Acciones",
            accessor: "estado",
        }
    ];

    const columnsCostaPets = [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Código Prov.",
            accessor: "codigoPro",
        },
        {
            Header: "Descripcion Prov.",
            accessor: "descripcionPro",
        },
        {
            Header: "Código Interno",
            accessor: "codigoInt",
        },
        {
            Header: "Descripcion Interna",
            accessor: "descripcionInt",
        },
        {
            Header: "Presentacion",
            accessor: "presentacion",
        },
        {
            Header: "Cantidad",
            accessor: "cantidad",
        },
        {
            Header: "Acciones",
            accessor: "estado",
        }
    ];

    const columnsPrecio = [
        {
            Header: "Tipo",
            accessor: "tipo",
        },
        {
            Header: "Utilidad",
            accessor: "utilidad",
        },
        {
            Header: "Precio",
            accessor: "precio",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),

        },
        {
            Header: "Precio IV%",
            accessor: "precioIV",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),

        }
    ];

    const columnsInventario = [
        {
            Header: "Código",
            accessor: "cod_Articulo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Código Cabys",
            accessor: "codcabys",
        }
    ];

    const columnsLotes = [
        {
            Header: "Número lote",
            accessor: "lote",
        },
        {
            Header: "Vencimiento",
            accessor: "vencimiento",
        },
        {
            Header: "Cantidad",
            accessor: "cantidad",
        },
    ];

    useEffect(() => {

        if (startReadingXML) {

            const products = detalleServicioTable.map(detalle => {
                return {
                    codigoProveedor: detalle.codigoPro,
                    descripcionProveedor: detalle.descripcionPro
                }
            });

            dispatch(startGetCatalogosProductosInternos(products));
        }

    }, [startReadingXML]);


    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const closeModal = () => {

        if (startReadingXML) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar la lectura del XML?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    // Clean el estado de XML
                    dispatch(SetCleanBillingImportXMLCompras());

                    // Reset del name file
                    dispatch(SetNameFileReadXMLCompras(''));

                    // StartReadingXML en false
                    dispatch(SetStartReadingXMLCompras(false));

                    // HasCatalogosInternos en false
                    dispatch(SetHasCatalogosInternos(false));

                    // Cierre del modal
                    dispatch(SetIsOpenImportarXMLModalCompras(false));

                    // Se limpia el input de archivo
                    const txtFile = document.getElementById("txtFile");
                    txtFile.value = '';

                    const btnCloseModal = document.getElementById("btnCloseModal");
                    btnCloseModal.setAttribute("data-bs-dismiss", "modal");
                    btnCloseModal.click();
                    btnCloseModal.removeAttribute("data-bs-dismiss", "modal");
                }

            });
        } else {
            // Clean el estado de XML
            dispatch(SetCleanBillingImportXMLCompras());
            dispatch(SetIsOpenImportarXMLModalCompras(false));

            // Se limpia el input de archivo
            const txtFile = document.getElementById("txtFile");
            txtFile.value = '';

            // Se cierre el modal por element
            const btnCloseModal = document.getElementById("btnCloseModal");
            btnCloseModal.setAttribute("data-bs-dismiss", "modal");
            btnCloseModal.click();
            btnCloseModal.removeAttribute("data-bs-dismiss", "modal");
        }
    }

    const onClickButtonUploadFile = (e) => {
        inputFile.current.click();
    }

    const handleReadXML = (e) => {

        if (!hasExtension(e.target.files[0].name, ['.xml'])) {
            // Se muestra mensaje
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Archivo no tiene una extencion XML. Por favor intentelo de nuevo con archivos XML.'
            });
            return;
        }

        // StartReadingXML en true
        dispatch(SetStartReadingXMLCompras(false));

        // Se limpia los campos actuales
        dispatch(CleanFacturaCompras());

        // Se establece el hasChargeFactura
        dispatch(SetHasChargeFacturaCompras(false));

        // Se establece el catalogo interno en false
        dispatch(SetHasCatalogosInternos(false));

        // Establecer el nombre del archivo
        dispatch(SetNameFileReadXMLCompras(e.target.files[0].name));

        // Read XML
        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.readAsText(file);

        fileReader.onload = () => {

            // Se parse el XML
            const xmlreaded = parseXML(new XMLParser().parseFromString(fileReader.result));
            console.log(xmlreaded)
            // Se establece en state
            dispatch(SetBillingImportXMLCompras(xmlreaded));

            // StartReadingXML en true
            dispatch(SetStartReadingXMLCompras(true));
        }

        fileReader.onerror = () => {

            // Se muestra mensaje
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Ocurrio un error cargando el archivo XML, por favor intentelo de nuevo.'
            });

            // Se limpia el nombre del archivo
            dispatch(SetNameFileReadXMLCompras(''));

            // StartReadingXML en false
            dispatch(SetStartReadingXMLCompras(false));
        }
    }

    const hasExtension = (fileName, exts) => {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }

    // const handleCatalogoProductos = (e) => {

    //     e.preventDefault();

    //     if( !startReadingXML ) {
    //         return;
    //     }

    //     const products = detalleServicioTable.map( detalle => {
    //         return {
    //             codigoProveedor: detalle.codigoPro,
    //             descripcionProveedor: detalle.descripcionPro
    //         }
    //     });

    //     dispatch( startGetCatalogosProductosInternos( products ) );
    // }

    const handleImportarXML = (e) => {

        if (hasCatalogosInternos) {

            e.preventDefault();

            if (hasChargeFactura) {

                // Se cierre el modal de importar
                dispatch(SetIsOpenImportarXMLModalCompras(false));

                return;
            }

            // Se obtiene los productos que no fueron encontrados
            const noProducts = detalleServicioTable.filter((product) => product.codigoInt === "" || product.estado === false);

            if (noProducts.length > 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: `Existen ${noProducts.length} ${(noProducts.length === 1) ? 'producto' : 'productos'} que no fueron encontrados o ligados, por tal motivo no se puede continuar con la importacion.`
                });

                return;
            }

            // Se verifica que todos los articulos tengan un lote
            const noProductsLotes = detalleServicioTable.filter((product) => product.lotes.length == 0);
            if (noProductsLotes.length > 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: `Existen ${noProductsLotes.length} ${(noProductsLotes.length === 1) ? 'producto' : 'productos'} que no tiene lotes, por tal motivo no se puede continuar con la importacion.`
                });

                return;
            }

            // Se verifica que todos los articulos tengan una cantidad
            const noProductsCantidad = detalleServicioTable.filter((product) => product.cantidad == 0);
            if (noProductsCantidad.length > 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: `Existen ${noProductsCantidad.length} ${(noProductsCantidad.length === 1) ? 'producto' : 'productos'} que no tiene cantidad, por tal motivo no se puede continuar con la importacion.`
                });

                return;
            }


            // Se valida si existe el proveedors
            dispatch(startExistProveedorCompras(numero));

            // Se carga la informacion del proveedor
            loadProveedor();

            // Se carga la informacion del header de la factura
            loadHeaderFactura();

            const productos = detalleServicioTable.map(detalle => {
                return {
                    numeroLinea: detalle.numeroLinea,
                    codArticulo: detalle.codigoInt,
                    codProveedor: detalle.codigoPro
                }
            });
            
            dispatch(startGetArticulosXMLCompras(productos, detalleServicio));

            // Se establece el hasChargeFactura
            dispatch(SetHasChargeFacturaCompras(true));

            // Se cierre el modal de importar
            dispatch(SetIsOpenImportarXMLModalCompras(false));

        }

    }

    const loadProveedor = (e) => {

        // Se inserta la cedula del proveedor
        dispatch(SetCedulaProveedorCompras(numero));

        // Se inserta el nombre del proveedor
        dispatch(SetProveedorCompras(nombre));

    }

    const loadHeaderFactura = (e) => {

        //Se agrega el numeroConsecutivo
        dispatch(SetFacturaCompras(numeroConsecutivo));

        //Se agrega el tipo de Factura
        dispatch(SetTipoCompraCompras((condicionVenta == "01") ? 'contado' : 'credito'));

        //Se agrega la Fecha
        dispatch(SetFechaCompras(fechaEmision.split('T')[0]));

        if (condicionVenta == "02") {

            // Se agregan los dias
            dispatch(SetDisableInputsDiasCompras(false));

            const days = parseInt(plazoCredito);

            dispatch(SetDiasCompras(days));

            var new_date = moment(fechaEmision.split('T')[0], "YYYY-MM-DD").add('days', days);
            dispatch(SetVenceCompras(new_date.format("YYYY-MM-DD")));
        } else {
            dispatch(SetDisableInputsDiasCompras(true));
        }

        // Se agrega la moneda
        if(resumenFactura.codigoTipoMoneda!=null){
            dispatch(SetCod_MonedaCompraCompras((resumenFactura.codigoTipoMoneda.codigoMoneda === "CRC") ? 1 : 2));
        }
        else
        {
            dispatch(SetCod_MonedaCompraCompras(1));
        }
            

    }

    const handleInputChangeUtilidadWithDispatch = ({ target }) => {

        dispatch(SetChangeUtilidadPreciosImportarFacturaCompras(true));
        dispatch(SetChangePrecioPreciosImportarFacturaCompras(false));
        dispatch(SetChangePrecioIVPreciosImportarFacturaCompras(false));

        dispatch(SetUtilidadPreciosImportarFacturaCompras(target.value));

    };

    const handleInputChangePrecioWithDispatch = ({ target }) => {

        dispatch(SetChangeUtilidadPreciosImportarFacturaCompras(false));
        dispatch(SetChangePrecioPreciosImportarFacturaCompras(true));
        dispatch(SetChangePrecioIVPreciosImportarFacturaCompras(false));

        dispatch(SetPrecioPreciosImportarFacturaCompras(target.value));

    };

    const handleInputChangePrecioIVWithDispatch = ({ target }) => {

        dispatch(SetChangeUtilidadPreciosImportarFacturaCompras(false));
        dispatch(SetChangePrecioPreciosImportarFacturaCompras(false));
        dispatch(SetChangePrecioIVPreciosImportarFacturaCompras(true));

        dispatch(SetPrecioIVPreciosImportarFacturaCompras(target.value));

    };

    // UseEffect Utilidad, Precio y PrecioIV
    useEffect(() => {

        if (hasChangeUtilidadPriceSell && !hasChangePrecioPriceSell && !hasChangePrecioIVPriceSell) {
            //Utilidad
            let base = parseFloat(nuevoCosto);
            let impuesto = parseFloat(impuestoNeto);
            let util = parseFloat(utilidad);

            if (!isNaN(base) && !isNaN(impuesto) && !isNaN(util)) {

                const precio = base * (util / 100) + base;
                const precioIV = impuesto + precio;

                dispatch(SetPrecioPreciosImportarFacturaCompras(precio));
                dispatch(SetPrecioIVPreciosImportarFacturaCompras(precioIV));

            }
        } else if (hasChangePrecioPriceSell && !hasChangeUtilidadPriceSell && !hasChangePrecioIVPriceSell) {
            //Precio
            let base = parseFloat(nuevoCosto);
            let impuesto = parseFloat(impuestoNeto);
            let pre = parseFloat(precio);

            if (!isNaN(base) && !isNaN(impuesto) && !isNaN(pre)) {

                const utilidad = ((pre / base) - 1) * 100;
                const precioIV = pre + impuesto;

                dispatch(SetUtilidadPreciosImportarFacturaCompras(parseInt(utilidad)));
                dispatch(SetPrecioIVPreciosImportarFacturaCompras(precioIV));

            }
        } else if (hasChangePrecioIVPriceSell && !hasChangeUtilidadPriceSell && !hasChangePrecioPriceSell) {
            //Precio IV
            let base = parseFloat(precioBase);
            let impuesto = parseFloat(impuestoNeto);
            let preIV = parseFloat(precioIV);

            if (!isNaN(base) && !isNaN(impuesto) && !isNaN(preIV)) {

                const precio = preIV / impuesto;
                const utilidad = ((precio / base) - 1) * 100;

                dispatch(SetUtilidadPreciosImportarFacturaCompras(parseInt(utilidad)));
                dispatch(SetPrecioPreciosImportarFacturaCompras(precio));

            }
        }


    }, [utilidad, precio, precioIV]);

    const handleSavePrecio = (e) => {

        e.preventDefault();

        if (utilidad === '' || precio === '' || precioIV === '') return;

        const existPrice = pricesSellBuys.find(value => value.tipo === tipo);

        if (existPrice === undefined) {
            dispatch(SetOnePrecioPreciosImportarFacturaCompras({ tipo, utilidad, precio, precioIV }));
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: `No se puede ingresar un precio del mismo tipo ${tipo}`
            });
        }

        dispatch(CleanStatePricesSellPreciosImportarFacturaCompras());

    }

    const handleEditPrecio = (e) => {

        e.preventDefault();

        if (utilidad === '' || precio === '' || precioIV === '') return;

        const existPrice = pricesSellBuys.find(value => value.tipo === selectedpriceSell.tipo);

        if (existPrice != undefined) {

            const index = pricesSellBuys.findIndex(value => value.tipo === selectedpriceSell.tipo);

            dispatch(SetEditPricesSellPreciosImportarFacturaCompras({ index, tipo, utilidad, precio, precioIV }));

            dispatch(SetIsEditPriceSellPreciosImportarFacturaCompras(false));
            dispatch(CleanStatePricesSellPreciosImportarFacturaCompras());
        }

    }

    const handleRemovePrecio = (e) => {

        e.preventDefault();

        if (isEditPriceSell) {

            dispatch(SetRemovePricesSellPreciosImportarFacturaCompras(selectedpriceSell.tipo));

            dispatch(SetIsEditPriceSellPreciosImportarFacturaCompras(false));
            dispatch(CleanStatePricesSellPreciosImportarFacturaCompras());
        }

    }

    const handleSaveCostos = (e) => {

        e.preventDefault();

        if (pricesSellBuys.length > 0) {

            dispatch(SetNuevosCostosArticuloImportarFacturaCompras({
                codigoPro: codigoProSeleted,
                costos: pricesSellBuys,
            }));

            dispatch(CleanPreciosImportarFacturaCompras());
            dispatch(SetIsOpenModalPrecioImportarFacturaCompras(false));
        }

    }

    const closeModalPrecios = () => {

        dispatch(CleanPreciosImportarFacturaCompras());
    }

    const handleSearchInventory = async (e) => {

        e.preventDefault();

        if (valorBusquedaInventario === '') {
            dispatch(SetDefaultSearchInventarioCompras())
        } else {
            dispatch(SetSearchInventarioCompras(valorBusquedaInventario));
        }
    }

    const closeModalInventario = () => {

        //Clean el state de busqueda de inventarios
        dispatch(CleanStateSearchInventarioCompras());

    }

    const closeModalLotes = () => {

        dispatch( CleanLotesImportarFacturaCompras() );
        dispatch( SetArrayLotesImportarFacturaCompras([]) );

    }

    const handleSaveLote = () => {
        
        const existLotes = detalleServicio.find( detalle => detalle.codigoComercial.codigo == codigoProSeleted && detalle.numeroLinea == seletedNumeroLineaLotes);

        if( existLotes.lotes.length > 0 ) {

            Swal.fire({
                icon: "warning",
                title: "Lotes",
                text: "Solamente se puede agregar un lote por articulo",
            });

            return;

        }

        if( lote == '' || vencimiento == '') {

            Swal.fire({
                icon: "warning",
                title: "Error",
                text: "Debe completar la informacion para crear nuevo lote.",
            });

            return;
        }

        const newLote = {
            lote,
            vencimiento
        }

        dispatch( SetAddLoteLotesImportarFacturaCompras( {
            codigoPro: codigoProSeleted,
            numerolinea: seletedNumeroLineaLotes,
            lotes: newLote,
        } ) );

        dispatch( CleanLotesImportarFacturaCompras() );
    
    }

    return (

        <>
            <div className="modal fade" id="modalImportarFactura">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">
                                Importar Factura Electronica <FaFileImport className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="row mb-2 text-center">
                                <div className='col-md-12 mb-2'>
                                    <div className="input-group">
                                        {/* <button className='btn btn-dark' onClick={onClickButtonUploadFile}
                                        >
                                            Elegir Archivo <FaFile className='iconSize' />
                                        </button> */}

                                        <span className="input-group-text">
                                            <FaFile className="iconSize" />
                                        </span>
                                        <input
                                            type="file"
                                            id='txtFile'
                                            ref={inputFile}
                                            onChange={handleReadXML}
                                            className='form-control'
                                        />

                                        {/* <input
                                            id='txtResultoFileChooseBuys'
                                            value={nameFileReadXML}
                                            disabled={true}
                                            className='form-control'
                                        /> */}

                                    </div>

                                </div>
                            </div>

                            <div className="row mb-2 text-center">
                                <div className="col-md-6 mb-3">
                                    <h5>Consecutivo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Número de Consecutivo"
                                            name='numeroConsecutivo'
                                            value={numeroConsecutivo}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Clave</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaSortNumericDown className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Clave de Importe"
                                            name='ClaveImportarFModal'
                                            value={clave}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2 text-center">
                                <div className="col-md-3 mb-3">
                                    <h5>Cédula</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaIdCard className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cédula del Proveedor"
                                            name='numero'
                                            value={numero}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Nombre</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBuildingUn className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del Proveedor"
                                            name='nombre'
                                            value={nombre}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            type='date'
                                            name='fechaEmision'
                                            value={fechaEmision.split('T')[0]}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Estado de Compra</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            type='text'
                                            name='condicionVenta'
                                            value={(condicionVenta == "01") ? 'Contado' : 'Credito'}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2 text-center">
                                <div className="col-md-12 mb-2">
                                    <BuysImportarFacturaModalTable columns={( isCostaPets ) ? columnsCostaPets : columns} data={detalleServicioTable} />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className={(hasCatalogosInternos) ? 'btn btn-success' : 'btn btn-success disabled'}
                                data-bs-dismiss="modal"
                                onClick={handleImportarXML}
                            >
                                Aceptar <IoIosCheckboxOutline className="iconSize" />
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                id='btnCloseModal'
                                // data-bs-dismiss="modal"
                                onChange={close}
                                onClick={closeModal}
                            >
                                Cerrar <IoIosCloseCircle className="iconSize" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalImportarPrecioFactura">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">
                                Precio Venta Articulo <GiPriceTag className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-toggle="modal"
                                data-bs-target="#modalImportarFactura"
                                onClick={closeModalPrecios}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="row mb-2 text-center">
                                <div className='col-md-4 mb-2'>
                                    <h5>Nuevo Costo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <GiPriceTag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nuevo Costo"
                                            name='nuevoCosto'
                                            disabled={true}
                                            value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(nuevoCosto)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Tipo Precio</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FiType className="iconSize" />
                                        </span>
                                        <select
                                            className='form-select'
                                            name="tipo"
                                            value={tipo}
                                            onChange={e => handleInputChangeWithDispatch(e, SetTipoPreciosImportarFacturaCompras)}
                                        >
                                            <option value='A'>Tipo A</option>
                                            <option value='B'>Tipo B</option>
                                            <option value='C'>Tipo C</option>
                                            <option value='D'>Tipo D</option>
                                            <option value='P'>Tipo P</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Porcentaje Utilidad</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="0"
                                            name="utilidad"
                                            value={utilidad}
                                            onChange={e => handleInputChangeUtilidadWithDispatch(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2 text-center">
                                <div className="col-md-4 mb-3">
                                    <h5>Precio</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMoneyBill1 className="iconSize" />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="0"
                                            name="precio"
                                            value={precio}
                                            onChange={e => handleInputChangePrecioWithDispatch(e)}
                                        />
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="0"
                                            disabled
                                            value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(precio)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Precio IV%</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMoneyBill1 className="iconSize" />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="0"
                                            name="precio"
                                            value={precioIV}
                                            onChange={e => handleInputChangePrecioIVWithDispatch(e)}
                                        />
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="0"
                                            disabled
                                            value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(precioIV)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <hr />
                                    <div className='text-center'>
                                        <button
                                            className={(isEditPriceSell)
                                                ? 'btn btn-danger espacio'
                                                : 'btn btn-danger espacio disabled'
                                            }
                                            onClick={handleRemovePrecio}
                                        >
                                            Eliminar <FaDeleteLeft className="iconSize" />
                                        </button>


                                        {(isEditPriceSell) ?
                                            <>
                                                <button className='btn btn-warning espacio' onClick={handleEditPrecio}>Editar
                                                    <TbEditCircle className="iconSize" />
                                                </button>

                                            </>
                                            :
                                            <>
                                                <button className='btn btn-success espacio' onClick={handleSavePrecio}>Agregar
                                                    <IoAddCircle className="iconSize" />
                                                </button>

                                            </>

                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2 mt-2 text-center">
                                <div className="col-md-12 mb-2">
                                    <BuysPrecioImportarFacturaModalTable columns={columnsPrecio} data={pricesSellBuys} />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">

                            <button
                                className='btn btn-success'
                                onClick={handleSaveCostos}
                            >
                                Aceptar <IoIosCheckboxOutline className="iconSize" />
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                id='btnCloseModalPrecio'
                                data-bs-toggle="modal"
                                data-bs-target="#modalImportarFactura"
                                onClick={closeModalPrecios}
                            >
                                Cancelar <IoIosCloseCircle className="iconSize" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalImportarSearchInventario">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Producto <FaShoppingCart className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-toggle="modal"
                                data-bs-target="#modalImportarFactura"
                                onClick={closeModalInventario}
                            ></button>
                        </div>

                        <div className="modal-body">

                            <div className="row mb-2 text-center">

                                <div className='col-md-11 mb-2'>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaShoppingCart className="iconSize" />
                                            <h5 className='ps-2 mt-2'>Descripción</h5>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="valorBusquedaInventario"
                                            value={valorBusquedaInventario}
                                            onChange={e => handleInputChangeWithDispatch(e, SetValorBusquedaInventariosCompras)}
                                        />
                                    </div>

                                </div>

                                <div className='col-md-1 mb-2'>

                                    <button
                                        className='btn btn-success ms-2'
                                        onClick={handleSearchInventory}
                                    >
                                        Buscar
                                    </button>

                                </div>

                            </div>

                            <div className="row mb-2 mt-2 text-center">
                                <div className="col-md-12 mb-2">
                                    <BuysSearchInventarioModalTable columns={columnsInventario} data={getAllInventariosFilter} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='modal fade' id="modalLotesBuys">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">
                        
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Lotes <FaShoppingCart className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-toggle="modal"
                                data-bs-target="#modalImportarFactura"
                                onClick={closeModalLotes}
                            ></button>
                        </div>

                        <div className="modal-body">

                            <div className="container-fluid mt-2">

                                <div className="row mb-2">

                                    <div className="col-md-3 mb-3">
                                        <h5>Lotes</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <TbNumber className="iconSize" />
                                            </span>
                                            <input
                                                type="text"
                                                name="lote"
                                                className="form-control"
                                                placeholder="Número lote"
                                                value={lote}
                                                onChange={(e) =>
                                                    handleInputChangeWithDispatch(
                                                        e,
                                                        SetLoteLotesImportarFacturaCompras
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <h5>Vencimiento</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <CiCalendarDate className="iconSize" />
                                            </span>
                                            <input
                                                type="date"
                                                name="vencimiento"
                                                className="form-control"
                                                placeholder="Número lote"
                                                value={vencimiento}
                                                onChange={(e) =>
                                                    handleInputChangeWithDispatch(
                                                        e,
                                                        SetVencimientoLotesImportarFacturaCompras
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="col-md-3 mb-3">
                                        <h5>Existencia</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <TbNumber className="iconSize" />
                                            </span>
                                            <input
                                                type="number"
                                                name="existencia"
                                                className="form-control"
                                                placeholder="Número lote"
                                                value={existencia}
                                                onChange={(e) =>
                                                    handleInputChangeWithDispatch(
                                                        e,
                                                        SetExistenciaLotesImportarFacturaCompras
                                                    )
                                                }
                                            />
                                        </div>
                                    </div> */}

                                    <div className='col-md-2 mb-3'>
                                        <h5>Opciones</h5>
                                        <div className="inline-container">
                                            <button
                                                className="btn btn-success"
                                                // onClick={ isSeletedLotes ? handleEditLote : handleSaveLote}
                                                onClick={handleSaveLote}
                                            >
                                            {/* { isSeletedLotes ? 'Editar' : 'Agregar' } <IoAddCircle className="iconSize" /> */}
                                                Agregar <IoAddCircle className="iconSize" />
                                            </button>
                            
                                            <button
                                                className="btn btn-danger"
                                                // onClick={handleDisableLote}
                                                type="button"
                                            >
                                                <RiDeleteBin2Fill className="iconSize" />
                                            </button>
                                        </div>
                                        <hr />
                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-12 mb-2">
                                        <BuysLotesImportarFacturaModalTable
                                            columns={columnsLotes}
                                            data={lotesByArticulo}
                                        />
                                    </div>
                                </div>

                            </div>                           

                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#modalImportarFactura"
                                onClick={closeModalLotes}
                            >
                                Aceptar Lotes<IoIosCheckboxOutline className="iconSize" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}