import Swal from 'sweetalert2';
import { useSelector, useDispatch } from "react-redux";

import { FaEye, FaEyeSlash, FaFileImport, FaRegSave, FaSearch, FaWindowClose } from 'react-icons/fa';
import { BuysImportarFacturaModal } from './BuysImportarFacturaModal';
import { BuysSearchModal } from './BuysSearchModal';
import { BuysAddProveedorModal } from "./BuysAddProveedorModal";
import { BuysSearchProveedorModal } from "./BuysSearchProveedorModal";
import { InventorySearchModal } from '../Inventory/InventorySearchModal';
import { BuysSearchCodigoCabysModal } from './BuysSearchCodigoCabysModal';

import { DeleteTab } from '../../actions/tabs';
import {
    CleanCompras,
    SetClaveInternaCompras,
    SetIsOpenImportarXMLModalCompras,
    SetopenSearchModal,
    SetVisiblePasswordCompras,
    startDeleteCompra,
    startSaveCompras,
    startValidateClaveInternaCompras
} from "../../actions/ComprasAction";
import { BuysSearchInventarioModal } from './BuysSearchInventarioModal';
import { BuysPrecioImportarFacturaModal } from './BuysPrecioImportarFacturaModal';
import { MdNoteAdd } from 'react-icons/md';
import { TbEditCircle, TbTrashXFilled } from 'react-icons/tb';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { PiKeyFill } from 'react-icons/pi';

export const BuysIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector(state => state.tabs);
    const {
        compras,
        disableInputs,
        activeButtonSave,
        activeButtonSearch,
        activeButtonRemove,
        claveInterna,
        visiblePassword,
        disableInputsUser,
        cedulaUser,
        startOpeningCompras,
        isEditCompra,
        detalleArticuloActual,
        idEmpresa,
    } = useSelector(state => state.compras);

    const {
        Id_Compra,
        Factura,
        CodigoProv,
        SubTotalGravado,
        SubTotalExento,
        Descuento,
        Impuesto,
        TotalFactura,
        Fecha,
        Vence,
        Compra,
        TipoCompra,
        Cod_MonedaCompra,
        FacturaCancelado,
        TipoCambio,
        CambioImpuesto,
        idBodega,
    } = compras.encabezado;

    const handleOpenImportarFacturaModal = () => {
        if (!disableInputs) {
            dispatch(SetIsOpenImportarXMLModalCompras(true));
        }
    }

    const handleOpenBuscarCompra = () => {

        if (activeButtonSearch) {
            dispatch(SetopenSearchModal(true));
        }
    }

    const handleEliminarCompra = () => {

        if (activeButtonRemove) {
            dispatch(startDeleteCompra(Id_Compra))
        }

    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleCreateCompras = () => {

        if (!activeButtonSave) return;

        const newCompra = {
            factura: Factura,
            codigoProv: CodigoProv,
            subTotalGravado: SubTotalGravado,
            subTotalExento: SubTotalExento,
            descuento: Descuento,
            impuesto: Impuesto,
            totalFactura: TotalFactura,
            fecha: Fecha,
            vence: Vence,
            fechaIngreso: Fecha,
            motivoGasto: '',
            compra1: true,
            contabilizado: false,
            consignacion: false,
            asiento: 0,
            contaInve: false,
            asientoInve: 0,
            tipoCompra: (TipoCompra === "credito") ? 1 : 2,
            cedulaUsuario: cedulaUser,
            codMonedaCompra: parseInt(Cod_MonedaCompra),
            facturaCancelado: FacturaCancelado,
            gasto: false,
            tipoCambio: TipoCambio,
            cambioImpuesto: 0,
            taller: false,
            mascotas: false,
            numOrden: 0,
            fec: false,
            codigoActividad: '',
            enviadoDgt: false,
            estadoDgt: '',
            consecutivoDgt: '',
            claveDgt: '',
            trans: false,
            numTrans: '',
            prepagada: false,
            preAbono: 0,
            idEmpresa: idEmpresa,
            detalle: compras.detalle.map(detalle => {
                return {
                    idArticuloComprados: detalle.idArticuloComprados,
                    codigo: detalle.codFxArticulo,
                    codArticulo: `${detalle.CodArticulo}`,
                    descripcion: detalle.Descripcion,
                    base: detalle.Base,
                    montoFlete: detalle.Flete,
                    otrosCargos: detalle.Otros,
                    costo: detalle.Costo,
                    cantidad: detalle.Cantidad,
                    regalias: detalle.Regalia,
                    gravado: detalle.SubtotalGravado,
                    exento: detalle.SubTotalExcento,
                    descuentoP: detalle.Descuento,
                    descuento: (detalle.Monto_Descuento == "") ? 0 : detalle.Monto_Descuento,
                    impuestoP: detalle.Impuesto,
                    impuesto: detalle.Monto_Impuesto,
                    total: detalle.Total,
                    devoluciones: 0,
                    precioA: detalle.precio_A,
                    precioB: detalle.precio_B,
                    precioC: detalle.precio_C,
                    precioD: detalle.precio_D,
                    codMonedaVenta: 1,
                    nuevoCostoBase: 0,
                    lote: '',
                    bonificado: false,
                    codigoBonificado: 0,
                    cantidadBonificado: 0,
                    costoBonificado: 0,
                    subTotalBonificado: 0,
                    codArticuloBonificacion: '',
                    codCabys: detalle.Cabys,
                    idBodega: idBodega,
                    estadoLinea: detalle.idArticuloComprados > 0 ? 2 : 1
                }
            })
        }

        const newPrice = compras.detalle.map(detalle => {
            const transformedDetalle = {
                idArticulo: `${detalle.CodArticulo}`,
                listaPrecios: Object.keys(detalle)
                    .filter(key => key.startsWith('precio_'))
                    .map(tarifa => ({
                        tarifa: tarifa.substring(7),
                        precio: detalle[tarifa]
                    }))
            };
            return transformedDetalle;
        });

       dispatch(startSaveCompras(newCompra, 0, newPrice));
        console.log(newCompra)
    }

    const handleEditCompras = () => {

        if (!activeButtonSave) return;

        const editCompra = {
            factura: Factura,
            codigoProv: CodigoProv,
            subTotalGravado: SubTotalGravado,
            subTotalExento: SubTotalExento,
            descuento: Descuento,
            impuesto: Impuesto,
            totalFactura: TotalFactura,
            fecha: Fecha,
            vence: Vence,
            fechaIngreso: Fecha,
            motivoGasto: '',
            compra1: true,
            contabilizado: false,
            consignacion: false,
            asiento: 0,
            contaInve: false,
            asientoInve: 0,
            tipoCompra: (TipoCompra === "credito") ? 1 : 2,
            cedulaUsuario: cedulaUser,
            codMonedaCompra: parseInt(Cod_MonedaCompra),
            facturaCancelado: FacturaCancelado,
            gasto: false,
            tipoCambio: TipoCambio,
            cambioImpuesto: 0,
            taller: false,
            mascotas: false,
            numOrden: 0,
            fec: false,
            codigoActividad: '',
            enviadoDgt: false,
            estadoDgt: '',
            consecutivoDgt: '',
            claveDgt: '',
            trans: false,
            numTrans: '',
            prepagada: false,
            preAbono: 0,
            detalle: compras.detalle.map(detalle => {
                return {
                    idArticuloComprados: detalle.idArticuloComprados,
                    codigo: detalle.codFxArticulo,
                    codArticulo: `${detalle.CodArticulo}`,
                    descripcion: detalle.Descripcion,
                    base: detalle.Base,
                    montoFlete: detalle.Flete,
                    otrosCargos: detalle.Otros,
                    costo: detalle.Costo,
                    cantidad: detalle.Cantidad,
                    regalias: detalle.Regalia,
                    gravado: detalle.SubtotalGravado,
                    exento: detalle.SubTotalExcento,
                    descuentoP: detalle.Descuento,
                    descuento: (detalle.Monto_Descuento == "") ? 0 : detalle.Monto_Descuento,
                    impuestoP: detalle.Impuesto,
                    impuesto: detalle.Monto_Impuesto,
                    total: detalle.Total,
                    devoluciones: 0,
                    precioA: detalle.precio_A,
                    precioB: detalle.precio_B,
                    precioC: detalle.precio_C,
                    precioD: detalle.precio_D,
                    codMonedaVenta: 1,
                    nuevoCostoBase: 0,
                    lote: '',
                    bonificado: false,
                    codigoBonificado: 0,
                    cantidadBonificado: 0,
                    costoBonificado: 0,
                    subTotalBonificado: 0,
                    codArticuloBonificacion: '',
                    codCabys: detalle.Cabys,
                    idBodega: idBodega,
                    idEmpresa: idEmpresa,
                    estadoLinea: detalle.idArticuloComprados > 0 ? 2 : 1

                }
            })

        }

        dispatch(startSaveCompras(editCompra, Id_Compra, []));
        console.log(editCompra.detalle)
    }

    const handleOnKeyDownUser = async (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (claveInterna == '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba su contraseña.'
                });

                return;
            }

            dispatch(startValidateClaveInternaCompras(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordCompras(!visiblePassword));
        }

    }

    const handleCloseWindowCompras = (e) => {

        if (startOpeningCompras) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea cancelar la creacion de la factura de Compra?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(CleanCompras());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(CleanCompras());

        }
    }

    return (
        <>
            <div className="btn-toolbar text-center" role="toolbar">
                <div className="btn-group mb-2">
                    {(isEditCompra)
                        ?
                        <>
                            <button
                                className={
                                    activeButtonSave
                                        ? "btn btn-warning espacio"
                                        : "btn btn-warning espacio disabled"
                                }
                                onClick={handleEditCompras}
                            >
                                Editar <TbEditCircle className="iconSizeBtn" />'
                            </button>
                        </>
                        :
                        <>
                            <button
                                className={
                                    activeButtonSave
                                        ? "btn btn-success espacio"
                                        : "btn btn-success espacio disabled"
                                }
                                onClick={handleCreateCompras}
                            >
                                Registrar <MdNoteAdd className="iconSizeBtn" />
                            </button>
                        </>
                    }

                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSearch
                                ? "btn btn-primary espacio"
                                : "btn btn-primary espacio disabled"
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscaFactCompra"
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonRemove
                                ? "btn btn-danger espacio"
                                : "btn btn-danger espacio disabled"
                        }
                        onClick={handleEliminarCompra}
                    >
                        Anular
                        <TbTrashXFilled className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindowCompras}
                    >
                        {startOpeningCompras ? "Cancelar" : "Cerrar"} {""}
                        <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <a
                        className={(disableInputs) ? 'btn btn-dark espacio disabled' : 'btn btn-dark espacio'}
                        data-bs-toggle="modal"
                        data-bs-target="#modalImportarFactura"
                    >
                        Importar Factura Electronica <FaFileImport className='iconSize' />
                    </a>
                </div>

                <div className="col-md-2 mb-2 espacio">
                    <div className="form-check">
                        <input
                            class="form-check-input checkP"
                            type="checkbox"
                            id="checkCambiarMontoBuysIcons"
                            name="cambiarMonto"
                            disabled={disableInputs}
                        />
                        <h5 className="form-check-label text-white" for="checkCambiarMontoBuysIcons">Cambiar Monto</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-2 mb-2 espacio">
                    <div className="form-check">
                        <input
                            class="form-check-input checkP"
                            type="checkbox"
                            id="checkUtilidadFijaBuysIcons"
                            name="utilidadFija"
                            disabled={disableInputs}
                        />
                        <h5 className="form-check-label text-white" for="checkUtilidadFijaBuysIcons">Utilidad Fija</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-2 espacio">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={visiblePassword ? "text" : "password"}
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaCompras)}
                        />
                        <span
                            className="input-group-text"
                            onClick={handleVisibleClave}
                            style={{ cursor: "pointer" }}
                        >
                            {visiblePassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

            </div>

            <BuysImportarFacturaModal />

            <BuysSearchModal />

            <BuysAddProveedorModal />

            <BuysSearchProveedorModal />

            <InventorySearchModal />

            <BuysSearchCodigoCabysModal />

            <BuysSearchInventarioModal />

            <BuysPrecioImportarFacturaModal />
        </>

    )
}