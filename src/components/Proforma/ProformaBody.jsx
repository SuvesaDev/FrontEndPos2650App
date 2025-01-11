import { AiFillExclamationCircle, AiOutlineFieldNumber } from "react-icons/ai"
import { FaCode, FaDollarSign, FaHashtag, FaMoneyBillWave, FaPercentage, FaSearch } from "react-icons/fa"
import { FaBoxesStacked, FaCirclePlus, FaColonSign } from "react-icons/fa6"
import { GoNumber } from "react-icons/go"
import { HiReceiptPercent } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { InventorySearchModal } from "../Inventory/InventorySearchModal";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetValorFiltroSearchModalInventory } from "../../actions/inventory";
import { SetCantidadDetalleActualBudgets, SetCleanDetalleActualBudgets, SetCodArticuloDetalleActualBudgets, SetDescuentoDetalleActualBudgets, SetDescuentoGeneralBudgets, SetDetalleFacturaBudgets, SetImpuestoVentaGeneralBudgets, SetIsEditArticleBudgets, SetIsNewArticleBudgets, SetMontoDescuentoDetalleActualBudgets, SetMontoImpuestoDetalleActualBudgets, SetOpenSearchInventoryBudgets, SetSubTotalDetalleActualBudgets, SetSubTotalExcentoDetalleActualBudgets, SetSubTotalExentoGeneralBudgets, SetSubTotalGeneralBudgets, SetSubTotalGravadoGeneralBudgets, SetSubtotalGravadoDetalleActualBudgets, SetTotalDetalleActualBudgets, SetTotalGeneralBudgets, startGetOneInventoryBudegtByCodArticulo } from "../../actions/budgetsAction";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoAddCircle } from "react-icons/io5";
import Swal from "sweetalert2";
import { ProformaTableArticules } from "./ProformaTableArticules";
import { TbEditCircle } from "react-icons/tb";
export const ProformaBody = () => {
    const dispatch = useDispatch();

    const { disableInputsArticles, activeButtonSave, activeButtonEdit, codigoCotizacion, disableInputCodeArticleEdit, detalleArticuloActual, customerData, moneda, detalleFactura, isEditArticle, isNewArticle } = useSelector(state => state.budgets);
    const { dollar } = useSelector(state => state.sidebar);
    const {
        codigoCliente,
        nombreCliente,
        contactoCliente,
        telefonoCliente,
        tipocedulaCliente,
        cedulaCliente,
        tipoPrecioCliente,
        maximoDescuentoCliente } = customerData;
    const {
        CodArticulo,
        Descripcion,
        Cantidad,
        Costo,
        Impuesto,
        Monto_Impuesto,
        SubtotalGravado,
        SubTotalExcento,
        SubTotal,
        Total,
        Descuento,
        Monto_Descuento,
        Precio_A,
        Precio_B,
        Precio_C,
        Precio_D,
        Cabys,
        Existencia,
        CodigoP,
        CodigoMonedaVenta,
        PrecioOtros,
        SubFamilia,
        MaxDescuento,
    } = detalleArticuloActual;

    const handleSearchArticleBudgets = async (e) => {
        dispatch(SetOpenSearchInventoryBudgets(true));
        dispatch(SetValorFiltroSearchModalInventory(""));
    }

    const handleChangeWithDispatchCalculates = ({ target }, action) => {
        const inputValue = parseFloat(target.value);
        if (!isNaN(inputValue)) {
            const newValue = Math.max(inputValue, 0);
            dispatch(action(newValue));
        } else {
            dispatch(action(0));
        }
    };


    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };


    const handleClickEditProducto = (e) => {
        if (CodArticulo !== "" && Cantidad !== 0 && Cantidad != "") {
            if (Descuento > maximoDescuentoCliente) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    html: `El cliente seleccionado tiene un <strong> máximo descuento del ${maximoDescuentoCliente}%</strong>.`,
                })
            } else {
                if (Impuesto === 0) {
                    const subTotalExentoD = (Precio_A * Cantidad);
                    const montoD = (Descuento / 100) * Precio_A * Cantidad;
                    const totalD = (Precio_A * Cantidad) - montoD;

                    const nuevoDetalleFactura = detalleFactura.map(detalle => {
                        if (detalle.CodArticulo === CodArticulo) {
                            detalle.Codigo = CodigoP,
                                detalle.Descripcion = Descripcion;
                            detalle.Cantidad = Cantidad;
                            detalle.PrecioCosto = Costo;
                            detalle.PrecioBase = Costo;
                            detalle.PrecioFlete = Costo;
                            detalle.PrecioOtros = PrecioOtros;
                            detalle.PrecioUnit = Precio_A;
                            detalle.Descuento = Descuento;
                            detalle.MontoDescuento = montoD;
                            detalle.Impuesto = Impuesto;
                            detalle.MontoImpuesto = Monto_Impuesto;
                            detalle.SubtotalGravado = SubtotalGravado;
                            detalle.SubTotalExcento = subTotalExentoD;
                            detalle.SubTotal = subTotalExentoD;
                            detalle.Total = totalD;
                            detalle.Cabys = Cabys;
                            detalle.SubFamilia = SubFamilia;
                            detalle.MaxDescuento = MaxDescuento;
                            detalle.TipoCambioValorCompra = dollar;
                            detalle.CodMonedaVenta = CodigoMonedaVenta;

                        }
                        return detalle;
                    });
                    dispatch(SetDetalleFacturaBudgets(nuevoDetalleFactura));
                    dispatch(SetIsNewArticleBudgets(true))
                    dispatch(SetIsEditArticleBudgets(false))
                    dispatch(SetCleanDetalleActualBudgets())
                } else {
                    const montoD = (Descuento / 100) * Precio_A * Cantidad;
                    const subTotalD = (Precio_A * Cantidad) - montoD;
                    const montoImpuesto = (Impuesto / 100) * subTotalD;
                    const totalD = subTotalD + montoImpuesto;
                    const nuevoDetalleFactura = detalleFactura.map(detalle => {
                        if (detalle.CodArticulo === CodArticulo) {
                            detalle.Codigo = CodigoP,
                                detalle.Descripcion = Descripcion;
                            detalle.Cantidad = Cantidad;
                            detalle.PrecioCosto = Costo;
                            detalle.PrecioBase = Costo;
                            detalle.PrecioFlete = Costo;
                            detalle.PrecioOtros = PrecioOtros;
                            detalle.PrecioUnit = Precio_A;
                            detalle.Descuento = Descuento;
                            detalle.MontoDescuento = montoD;
                            detalle.Impuesto = Impuesto;
                            detalle.MontoImpuesto = montoImpuesto;
                            detalle.SubtotalGravado = subTotalD;
                            detalle.SubTotalExcento = SubTotalExcento;
                            detalle.SubTotal = subTotalD;
                            detalle.Total = totalD;
                            detalle.Cabys = Cabys;
                            detalle.SubFamilia = SubFamilia;
                            detalle.MaxDescuento = MaxDescuento;
                            detalle.TipoCambioValorCompra = dollar;
                            detalle.CodMonedaVenta = CodigoMonedaVenta;

                        }
                        return detalle;
                    });
                    dispatch(SetDetalleFacturaBudgets(nuevoDetalleFactura));
                    dispatch(SetIsNewArticleBudgets(true))
                    dispatch(SetIsEditArticleBudgets(false))
                    dispatch(SetCleanDetalleActualBudgets())
                }
            }
        } else {
            Swal.fire("Error!", "El Código del producto y/o la Cantidad no pueden estar vacíos.", 'error')
        }
    }


    const handleClickAddProducto = (e) => {

        if (CodArticulo !== "" && Cantidad !== 0 && Cantidad != "") {
            const detalleExistente = detalleFactura.find(detalle => detalle.CodArticulo === CodArticulo);
            if (detalleExistente) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Este producto ya está en la línea de la proforma, si desea editarlo solamente de click en la tabla seleccionando el producto.',
                });
            } else {
                if (Descuento > maximoDescuentoCliente) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        html: `El cliente seleccionado tiene un <strong> máximo descuento del ${maximoDescuentoCliente}%</strong>.`,
                    })
                } else {
                    if (Impuesto === 0) {
                        const subTotalExentoD = (Precio_A * Cantidad);
                        const montoD = (Descuento / 100) * Precio_A * Cantidad;
                        const totalD = (Precio_A * Cantidad) - montoD;

                        const detalleFacturas = {
                            Codigo: CodigoP,
                            CodArticulo: CodArticulo,
                            Descripcion: Descripcion,
                            Cantidad: Cantidad,
                            PrecioCosto: Costo,
                            PrecioBase: Costo,
                            PrecioFlete: Costo,
                            PrecioOtros: PrecioOtros,
                            PrecioUnit: Precio_A,
                            Descuento: Descuento,
                            MontoDescuento: montoD,
                            Impuesto: Impuesto,
                            MontoImpuesto: Monto_Impuesto,
                            SubtotalGravado: SubtotalGravado,
                            SubTotalExcento: subTotalExentoD,
                            SubTotal: subTotalExentoD,
                            Total: totalD,
                            Cabys: Cabys,
                            SubFamilia: SubFamilia,
                            MaxDescuento: MaxDescuento,
                            TipoCambioValorCompra: dollar,
                            CodMonedaVenta: CodigoMonedaVenta,
                        }

                        dispatch(SetDetalleFacturaBudgets([...detalleFactura, detalleFacturas]));
                        dispatch(SetCleanDetalleActualBudgets());
                    } else {
                        const montoD = (Descuento / 100) * Precio_A * Cantidad;
                        const subTotalD = (Precio_A * Cantidad) - montoD;
                        const montoImpuesto = (Impuesto / 100) * subTotalD;
                        const totalD = subTotalD + montoImpuesto;

                        const detalleFacturas = {
                            Codigo: CodigoP,
                            CodArticulo: CodArticulo,
                            Descripcion: Descripcion,
                            Cantidad: Cantidad,
                            PrecioCosto: Costo,
                            PrecioBase: Costo,
                            PrecioFlete: Costo,
                            PrecioOtros: PrecioOtros,
                            PrecioUnit: Precio_A,
                            Descuento: Descuento,
                            MontoDescuento: montoD,
                            Impuesto: Impuesto,
                            MontoImpuesto: montoImpuesto,
                            SubtotalGravado: subTotalD,
                            SubTotalExcento: SubTotalExcento,
                            SubTotal: subTotalD,
                            Total: totalD,
                            Cabys: Cabys,
                            SubFamilia: SubFamilia,
                            MaxDescuento: MaxDescuento,
                            TipoCambioValorCompra: dollar,
                            CodMonedaVenta: CodigoMonedaVenta,
                        }
                        dispatch(SetDetalleFacturaBudgets([...detalleFactura, detalleFacturas]));
                        dispatch(SetCleanDetalleActualBudgets());
                    }
                }
            }
        } else {
            Swal.fire("Error!", "El Código del producto y/o la Cantidad no pueden estar vacíos.", 'error')
        }
    }

    const handleClickAddProductoWhenEdit = (e) => {

        if (CodArticulo !== "" && Cantidad !== 0 && Cantidad != "") {
            const detalleExistente = detalleFactura.find(detalle => detalle.CodArticulo === CodArticulo);
            if (detalleExistente) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Este producto ya está en la línea de la proforma, si desea editarlo solamente de click en la tabla seleccionando el producto.',
                });
            } else {
                if (Descuento > maximoDescuentoCliente) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        html: `El cliente seleccionado tiene un <strong> máximo descuento del ${maximoDescuentoCliente}%</strong>.`,
                    })
                } else {
                    if (Impuesto === 0) {
                        const subTotalExentoD = (Precio_A * Cantidad);
                        const montoD = (Descuento / 100) * Precio_A * Cantidad;
                        const totalD = (Precio_A * Cantidad) - montoD;

                        const detalleFacturas = {
                            Cotizacion: codigoCotizacion,
                            Codigo: CodigoP,
                            CodArticulo: CodArticulo,
                            Descripcion: Descripcion,
                            Cantidad: Cantidad,
                            PrecioCosto: Costo,
                            PrecioBase: Costo,
                            PrecioFlete: Costo,
                            PrecioOtros: PrecioOtros,
                            PrecioUnit: Precio_A,
                            Descuento: Descuento,
                            MontoDescuento: montoD,
                            Impuesto: Impuesto,
                            MontoImpuesto: Monto_Impuesto,
                            SubtotalGravado: SubtotalGravado,
                            SubTotalExcento: subTotalExentoD,
                            SubTotal: subTotalExentoD,
                            Total: totalD,
                            Cabys: Cabys,
                            SubFamilia: SubFamilia,
                            MaxDescuento: MaxDescuento,
                            TipoCambioValorCompra: dollar,
                            CodMonedaVenta: CodigoMonedaVenta,
                        }

                        dispatch(SetDetalleFacturaBudgets([...detalleFactura, detalleFacturas]));
                        dispatch(SetCleanDetalleActualBudgets());
                    } else {
                        const montoD = (Descuento / 100) * Precio_A * Cantidad;
                        const subTotalD = (Precio_A * Cantidad) - montoD;
                        const montoImpuesto = (Impuesto / 100) * subTotalD;
                        const totalD = subTotalD + montoImpuesto;

                        const detalleFacturas = {
                            Cotizacion: codigoCotizacion,
                            Codigo: CodigoP,
                            CodArticulo: CodArticulo,
                            Descripcion: Descripcion,
                            Cantidad: Cantidad,
                            PrecioCosto: Costo,
                            PrecioBase: Costo,
                            PrecioFlete: Costo,
                            PrecioOtros: PrecioOtros,
                            PrecioUnit: Precio_A,
                            Descuento: Descuento,
                            MontoDescuento: montoD,
                            Impuesto: Impuesto,
                            MontoImpuesto: montoImpuesto,
                            SubtotalGravado: subTotalD,
                            SubTotalExcento: SubTotalExcento,
                            SubTotal: subTotalD,
                            Total: totalD,
                            Cabys: Cabys,
                            SubFamilia: SubFamilia,
                            MaxDescuento: MaxDescuento,
                            TipoCambioValorCompra: dollar,
                            CodMonedaVenta: CodigoMonedaVenta,
                        }
                        dispatch(SetDetalleFacturaBudgets([...detalleFactura, detalleFacturas]));
                        dispatch(SetCleanDetalleActualBudgets());
                    }
                }
            }
        } else {
            Swal.fire("Error!", "El Código del producto y/o la Cantidad no pueden estar vacíos.", 'error')
        }
    }

    const validateCurrency = (value) => {
        if (moneda == 1) {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        } else if (moneda == 2) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        } else {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        }
    }

    const handleClickDownCodigo = async (e) => {
        if (e.key === 'Enter') {
            dispatch(startGetOneInventoryBudegtByCodArticulo(CodArticulo));
        }
    }

    const columns = [
        {
            Header: "Codigo",
            accessor: "CodArticulo",
        },
        {
            Header: "Descripción",
            accessor: "Descripcion",
        },
        {
            Header: "Cantidad",
            accessor: "Cantidad",
        },
        {
            Header: "Precio Unit.",
            accessor: "PrecioUnit",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "% Descuento",
            accessor: "Descuento",
        },
        {
            Header: "M.Descuento",
            accessor: "MontoDescuento",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "% IV",
            accessor: "Impuesto",
        },
        {
            Header: "M.Impuesto",
            accessor: "MontoImpuesto",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "SubTotal",
            accessor: "SubTotal",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "Total",
            accessor: "Total",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "Acciones",
            accessor: "deleteRow",
            Cell: () => (
                <button className='btn btn-danger'>
                    <MdDeleteForever className='iconSizeBtn' />
                </button>
            ),

        },
    ];

    const msgInfoDiscount = (
        <Tooltip>
            <>
                <center>
                    <strong>
                        Importante!
                    </strong>
                </center>
                La cantidad de descuento limite depende del cliente seleccionado.  {" "}
                Para modificar o agregar una cantidad de descuento mayor vaya la sección de "Clientes".
            </>
        </Tooltip>
    );

    return (
        <>
            <div className="col-md-12 mb-3">
                <div className="card">
                    <div className="card-header inline-container">
                        <h5>Artículo a Cotizar: <strong style={{ color: 'red' }}>{Descripcion}</strong></h5>
                    </div>
                    <div className="card-body">
                        <div className="row">

                            <div className="col-md-3 mb-3">
                                <h5>Código</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <GoNumber className="iconSize" />
                                    </span>
                                    {isNewArticle && !isEditArticle && (
                                        <>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder="Código del Producto"
                                                disabled={disableInputsArticles}
                                                value={CodArticulo}
                                                onKeyDown={handleClickDownCodigo}
                                                onChange={(e) => handleInputChangeWithDispatch(e, SetCodArticuloDetalleActualBudgets)}
                                            />
                                            <button
                                                type="button"
                                                id="btnBuscarArticulo"
                                                className={disableInputsArticles ? ("btn btn-primary disabled") : ("btn btn-primary")}
                                                onClick={handleSearchArticleBudgets}
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalBuscarArticulo"
                                            >
                                                <FaSearch className="iconSize" />
                                            </button>
                                        </>
                                    )}
                                    {isEditArticle && !isNewArticle && (
                                        <>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder="Código del Producto"
                                                disabled={true}
                                                value={CodArticulo}
                                                onChange={(e) => handleInputChangeWithDispatch(e, SetCodArticuloDetalleActualBudgets)}
                                            />
                                            <button
                                                type="button"
                                                id="btnBuscarArticulo"
                                                className={"btn btn-primary disabled"}
                                                disabled={true}
                                            >
                                                <FaSearch className="iconSize" />
                                            </button>
                                        </>
                                    )}


                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <h5>Precio</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaMoneyBillWave className="iconSize" />
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder="Precio Unitario del Producto"
                                        disabled={true}
                                        value={validateCurrency(Precio_A)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-2 mb-3">
                                <h5>Existencias</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaBoxesStacked className="iconSize" />
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder="Existencias del Producto"
                                        disabled={true}
                                        value={Existencia}
                                    />
                                </div>
                            </div>

                            <div className="col-md-2 mb-3">
                                <h5>Cabys</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaHashtag className="iconSize" />
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder="Cantidad del Producto"
                                        disabled={true}
                                        value={Cabys}
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
                                        type='number'
                                        min={0}
                                        className='form-control'
                                        placeholder="Cantidad del Producto"
                                        disabled={disableInputsArticles}
                                        value={Cantidad}
                                        onChange={(e) => handleInputChangeWithDispatch(e, SetCantidadDetalleActualBudgets)}
                                    />
                                </div>
                            </div>



                            <div className="col-md-3 mb-3">
                                <h5>Descuento</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaPercentage className="iconSize" />
                                    </span>
                                    <OverlayTrigger placement="top" overlay={msgInfoDiscount}>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder="Descuento para el Producto"
                                            min={0}
                                            value={Descuento}
                                            disabled={disableInputsArticles}
                                            max={maximoDescuentoCliente}
                                            onChange={(e) => handleChangeWithDispatchCalculates(e, SetDescuentoDetalleActualBudgets)}
                                        />
                                    </OverlayTrigger>
                                    <span className="input-group-text">
                                        {
                                            moneda == 1 ?
                                                <FaColonSign className="iconSize" />
                                                : moneda == 2 ?
                                                    <FaDollarSign className="iconSize" />
                                                    :
                                                    <FaColonSign className="iconSize" />
                                        }
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={validateCurrency(Monto_Descuento)}
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <h5>IV %</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <HiReceiptPercent className="iconSize" />
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder="Impuesto de Venta del Producto"
                                        disabled={true}
                                        value={Impuesto}
                                    />
                                    <span className="input-group-text">
                                        {
                                            moneda == 1 ?
                                                <FaColonSign className="iconSize" />
                                                : moneda == 2 ?
                                                    <FaDollarSign className="iconSize" />
                                                    :
                                                    <FaColonSign className="iconSize" />
                                        }
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={validateCurrency(Monto_Impuesto)}
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <h5>Sub.Gravado</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        {
                                            moneda == 1 ?
                                                <FaColonSign className="iconSize" />
                                                : moneda == 2 ?
                                                    <FaDollarSign className="iconSize" />
                                                    :
                                                    <FaColonSign className="iconSize" />
                                        }
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder="Subtotal Gravado del Producto"
                                        disabled={true}
                                        value={validateCurrency(SubtotalGravado)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <h5>Sub.Exento</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        {
                                            moneda == 1 ?
                                                <FaColonSign className="iconSize" />
                                                : moneda == 2 ?
                                                    <FaDollarSign className="iconSize" />
                                                    :
                                                    <FaColonSign className="iconSize" />
                                        }
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder="Subtotal Excento del Producto"
                                        disabled={true}
                                        value={validateCurrency(SubTotalExcento)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <h5>SubTotal</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        {
                                            moneda == 1 ?
                                                <FaColonSign className="iconSize" />
                                                : moneda == 2 ?
                                                    <FaDollarSign className="iconSize" />
                                                    :
                                                    <FaColonSign className="iconSize" />
                                        }
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder="Subtotal del Producto"
                                        disabled={true}
                                        value={validateCurrency(SubTotal)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <h5>Total</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        {
                                            moneda == 1 ?
                                                <FaColonSign className="iconSize" />
                                                : moneda == 2 ?
                                                    <FaDollarSign className="iconSize" />
                                                    :
                                                    <FaColonSign className="iconSize" />
                                        }
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder="Total del Producto"
                                        disabled={true}
                                        value={validateCurrency(Total)}
                                    />
                                </div>
                            </div>


                            <div className="col-md-3 mb-3">
                                <hr />
                                {isNewArticle && !isEditArticle && (

                                    <button disabled={disableInputsArticles} onClick={

                                        activeButtonEdit && !activeButtonSave ?
                                            handleClickAddProductoWhenEdit
                                            :
                                            handleClickAddProducto

                                    } className="btn btn-success espacio">
                                        Agregar Producto <FaCirclePlus className="iconSize" />
                                    </button>
                                )}
                                {isEditArticle && !isNewArticle && (
                                    <button disabled={disableInputsArticles} onClick={handleClickEditProducto} className="btn btn-warning espacio">
                                        Editar Producto <TbEditCircle className="iconSize" />
                                    </button>
                                )}
                            </div>

                            <hr />

                            <div className="col-md-12 mb-0">
                                <ProformaTableArticules columns={columns} data={detalleFactura} />

                                {/* {detalleFactura && Object.keys(detalleFactura).length > 0 ? (
                                ) : (
                                    <center>
                                        <div className="toast show">
                                            <div className={"card-header toast-warning"}>
                                                <strong className="me-auto">
                                                    2650 Informa <AiFillExclamationCircle className="iconSize" />
                                                </strong>
                                            </div>
                                            <div className="toast-body">
                                                <p className="text-danger">
                                                    Datos de Artículos sin Cargar.
                                                </p>
                                            </div>
                                        </div>
                                    </center>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InventorySearchModal />
        </>

    )
}
