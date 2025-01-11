import { useSelector, useDispatch } from "react-redux";
import { CleanPurchaseReturns, SetCantidadDetalleActualPurchaseReturns, SetCodArticuloDetalleActualPurchaseReturns, SetPrecioCostoDetalleActualPurchaseReturns, SetopenSearchModalPurchaseReturns, startSaveDevolucion } from "../../actions/purchaseReturnsAction";
import { PurchaseReturnsSearchModal } from "./PurchaseReturnsSearchModal";
import { DeleteTab } from '../../actions/tabs';
import { BuysSearchModal } from "../Buys/BuysSearchModal";
import { FaRegSave, FaWindowClose } from 'react-icons/fa';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiBroomBold } from "react-icons/pi";
import { SetDescuentoDetalleActualCompras } from "../../actions/ComprasAction";


export const PurchaseReturnsIcons = () => {

    const dispatch = useDispatch();
    const { devolucion } = useSelector(state => state.purchaseReturns);
    const { currentTab } = useSelector(state => state.tabs);

    const {
        Id_Factura_Compra,
        NumeroFactura,
        Proveedor,
        SaldoAnt_Fact,
        SubTotalGravado,
        SubTotalExcento,
        Descuento,
        Impuesto,
        Monto,
        Fecha,
        Cedula_Usuario,
        Cod_Moneda,
        idBodega
    } = devolucion.encabezado;

    const handleCreateDevolucion = () => {

        const newDevoluccion = {
            devolucion: 0,
            idFacturaCompra: Id_Factura_Compra,
            saldoAntFact: SaldoAnt_Fact,
            subTotalGravado: SubTotalGravado,
            subTotalExcento: SubTotalExcento,
            descuento: Descuento,
            impuesto: Impuesto,
            monto: Monto,
            fecha: Fecha,
            cedulaUsuario: "",
            codMoneda: Cod_Moneda,
            nombrePro: Proveedor,
            idSucursal: 0,
            detalle: devolucion.detalle.map(detalle => {
                return {
                    consecutivo: 0,
                    devolucion: 0,
                    codigo: detalle.codFxArticulo,
                    descripcion: detalle.Descripcion,
                    cantidad: detalle.Cantidad,
                    precioCosto: detalle.Precio_Costo,
                    precioBase: detalle.Precio_Base,
                    precioFlete: detalle.Precio_Flete,
                    precioOtros: detalle.Precio_Otros,
                    descuento: detalle.Descuento,
                    montoDescuento: detalle.Monto_Descuento,
                    impuesto: detalle.Impuesto,
                    montoImpuesto: detalle.Monto_Impuesto,
                    subtotalGravado: detalle.SubtotalGravado,
                    subTotalExcento: detalle.SubTotalExcento,
                    subTotal: detalle.SubTotal,
                    numero: String(detalle.Numero),
                    idBodega: idBodega

                }
            })

        }
        console.log(newDevoluccion)
        dispatch(startSaveDevolucion(newDevoluccion));
    }

    const handleOpenBuscarPurchaseReturns = () => {
        dispatch(SetopenSearchModalPurchaseReturns(true));
    }

    const handleLimpiarPurcchaseReturns = () => {
        dispatch(CleanPurchaseReturns())
        dispatch(SetCodArticuloDetalleActualPurchaseReturns(0))
        dispatch(SetCantidadDetalleActualPurchaseReturns(0))
        dispatch(SetPrecioCostoDetalleActualPurchaseReturns(0))
        dispatch(SetDescuentoDetalleActualCompras(0))
    }

    const handleCloseWindowReturnCompras = (e) => {
        e.preventDefault();
        dispatch(DeleteTab(currentTab.name, currentTab.routePage));
        dispatch(CleanPurchaseReturns())

    }


    return (
        <>
            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-success espacio"}
                        onClick={handleCreateDevolucion}

                    >
                        Registrar <FaRegSave className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-primary espacio"}
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscaDevolucionCompra"

                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div>


                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-dark espacio"}
                        onClick={handleLimpiarPurcchaseReturns}
                    >
                        Limpiar <PiBroomBold className="iconSizeBtn" />
                    </button>
                </div>

                {/*                 
                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-danger espacio"}
                    >
                        Anular <RiDeleteBin2Fill className="iconSizeBtn" />
                    </button>
                </div> */}

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-warning espacio"}
                        onClick={handleCloseWindowReturnCompras}
                    >
                        Cerrar <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>
            </div>

            <BuysSearchModal />
            <PurchaseReturnsSearchModal />
        </>

    )
}
