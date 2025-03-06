import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { FaUserCheck } from 'react-icons/fa';
//Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiKeyFill } from "react-icons/pi";
import { FaWindowClose } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";
import { MdNoteAdd } from "react-icons/md";

import {
    startSaveBilling,
    OpenModalEditCustomer,
    SetClaveInternaFacturacionBilling,
    startValidateClaveInternaBilling,
    SetVisibleClaveInternaBilling,
    startEditBilling,
    SetRemoveArrayStateBilling,
    CleanBilling
} from '../../actions/billing';
import { DeleteTab } from '../../actions/tabs';
import { BillingFacturaCreditoModal } from './BillingFacturaCreditoModal';


export const BillingFooter = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const {
        factura,
        hasCustomerBilling,
        empresas,
        aumentoExtranjero,
        billings,
        numCaja,
        numApertura
    } = useSelector(state => state.billing);

    const { currentTab } = useSelector(state => state.tabs);
    const { surcursales, auth, idSurcursal } = useSelector(state => state.login);
    const { centro } = auth;
    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;

    const { agentesBilling } = useSelector(state => state.agenteVentas);
    const { allTiposFacturas } = useSelector(state => state.tiposFacturas);
    const { bodegasInventory } = useSelector(state => state.bodegas);
    const { tiposExoneracion } = useSelector(state => state.tiposExoneracion);
    const { monedasInventory } = useSelector(state => state.monedas);
    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        if (billings[numberScreen] === undefined) return;
        dispatch(action({ value: target.value, number: numberScreen }));
    };

    const ValidacionesClientes = async () => {

        // si el cliente esta marcaddo como fallecido
        if (billings[numberScreen].factura.encabezado.fallecido == true) {
            await Swal.fire({
                icon: 'error',
                title: 'No se puede procesar la operación',
                text: 'El cliente esta registrado en el sistema como Fallecido.'
            });
            return '';
        }

        // Validacion de Empresa
        if (billings[numberScreen].factura.encabezado.empresa == '') {
            Swal.fire({
                icon: 'error',
                title: 'Empresa',
                text: 'Por favor seleccione una empresa para registrar la facturacion.'
            });
            return '';
        }

        // Validacion de Tipo Factura
        if (billings[numberScreen].factura.encabezado.tipo == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Tipo Factura',
                text: 'Por favor seleccione un tipo de factura para registrar la facturacion.'
            });
            return '';
        }

        // Validacion de Moneda
        if (billings[numberScreen].factura.encabezado.Cod_Moneda == '') {
            Swal.fire({
                icon: 'error',
                title: 'Moneda',
                text: 'Por favor seleccione una moneda para registrar la facturacion.'
            });
            return '';
        }

        // Validacion de Productos
        if (billings[numberScreen].factura.detalle.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Productos',
                text: 'Por favor seleccione un producto para registrar la facturacion.'
            });
            return '';
        }

        // Validacion de Agente
        if (billings[numberScreen].factura.encabezado.agente === false && billings[numberScreen].factura.encabezado.cod_agente === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Agentes',
                text: 'Por favor seleccione un agente o marque la casilla Sin Agente para registrar la facturacion.'
            });
            return '';
        }

        //si el cliente esta marcado como moroso
        if (billings[numberScreen].factura.encabezado.cliente_Moroso == true) {
            Swal.fire({
                icon: 'error',
                title: 'Cliente moroso',
                text: 'Favor indicarle a la cajera o a gerencia, no le comente nada al cliente.'
            });
            return '';
        }

        // Si el cliente no esta marcado como actualizado
        if (billings[numberScreen].factura.encabezado.actualizado == false) {
            return await Swal.fire({
                title: `Favor actualizar los datos del cliente antes de facturarle `,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Actualizar Datos',
                denyButtonText: `Continuar`,
            }).then(async (result) => {
                return new Promise((resolve) => {
                    if (result.isConfirmed) {
                        dispatch(OpenModalEditCustomer({ number: numberScreen }));
                        resolve('');
                    } else {
                        resolve('ok');
                    }
                })


            });
        }

        if (billings[numberScreen].factura.encabezado.tipo == '1'
            || billings[numberScreen].factura.encabezado.tipo == '5'
            || billings[numberScreen].factura.encabezado.tipo == '7') { // Si es de credito

            if (billings[numberScreen].factura.encabezado.ordenCompra == true
                && (billings[numberScreen].factura.encabezado.Orden == '0'
                    || billings[numberScreen].factura.encabezado.Orden.length < 4)
            ) { //
                Swal.fire({
                    icon: 'error',
                    title: 'No se puede procesar la operaccion',
                    text: 'Debe ingresar el numero de Orden de Compra.'
                });
                return '';
            }

            if (billings[numberScreen].factura.encabezado.sinrestriccion == false) {
                //agregar validacciones de saldo maximo
            }

        }

        return 'ok'

    }

    const ValidacionesProductos = async () => {

        let respuesta = 'ok';

        await billings[numberScreen].factura.detalle.forEach(linea => {

            if (billings[numberScreen].factura.encabezado.tipo === '1'
                || billings[numberScreen].factura.encabezado.tipo === '5'
                || billings[numberScreen].factura.encabezado.tipo === '7') { // Si es de credito
                if (linea.soloContado == true) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Solo para ventas de Contado',
                        text: linea.Descripcion
                    });
                    respuesta = '';
                }
            }

            if (linea.receta === true) {
                if (billings[numberScreen].hasCustomerBilling === false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se puede procesar la operación',
                        text: 'Favor ingresar una cédula de un cliente'
                    });
                    respuesta = '';
                }
            }
        });

        return respuesta;
    }

    const handleCreateBilling = async (e) => {

        if (billings[numberScreen] === undefined) return;

        if (!billings[numberScreen].activeButtonSave || !billings[numberScreen].hasCustomerBilling) return;

        e.preventDefault();
        let respuestaValidacionesClientes = 'ok';
        let respuestaValidacionesProductos = 'ok';

        if (billings[numberScreen].hasCustomerBilling === true) {
            //si hay cliente seleccionado validamos la info
            respuestaValidacionesClientes = await ValidacionesClientes();
        }

        respuestaValidacionesProductos = await ValidacionesProductos();

        if (respuestaValidacionesClientes === 'ok' && respuestaValidacionesProductos === 'ok') {

            const date = new Date();
            const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

            const idSucursal = surcursales.find(surcursal => surcursal.alias === centro).id;

            const newBilling = {
                tipo: billings[numberScreen].factura.encabezado.tipo,
                numCaja: String(numCaja), //TODO: Validar
                numApertura: numApertura,
                fecha: isoDateTime[0] + " " + isoDateTime[1],
                codCliente: `${billings[numberScreen].factura.encabezado.cod_Cliente}`,
                observaciones: billings[numberScreen].factura.encabezado.observaciones,
                codMoneda: billings[numberScreen].factura.encabezado.Cod_Moneda,
                orden: billings[numberScreen].factura.encabezado.Orden,
                taller: false,
                mascotas: false,
                agente: true, //TODO: Validar
                Cod_agente: parseInt(billings[numberScreen].factura.encabezado.cod_agente),
                subTotalGravada: billings[numberScreen].factura.encabezado.SubTotalGravada,
                subTotalExento: billings[numberScreen].factura.encabezado.SubTotalExento,
                subTotal: billings[numberScreen].factura.encabezado.SubTotal,
                descuento: billings[numberScreen].factura.encabezado.Descuento,
                impVenta: billings[numberScreen].factura.encabezado.Imp_Venta,
                exonerar: false, //TODO: Validar
                total: billings[numberScreen].factura.encabezado.Total,
                ficha: billings[numberScreen].factura.encabezado.ficha,
                idSucursal: idSucursal,
                idEmpresa: billings[numberScreen].factura.encabezado.empresa,
                preventa: billings[numberScreen].factura.encabezado.preventa,
                detalle: billings[numberScreen].factura.detalle.map(detalle => {
                    return {
                        codArticulo: detalle.CodArticulo,
                        codFxArticulo: detalle.codFxArticulo,
                        descripcion: detalle.Descripcion,
                        cantidad: detalle.Cantidad,
                        precioUnit: detalle.Precio_Unit,
                        descuento: detalle.Descuento,
                        montoDescuento: detalle.Monto_Descuento,
                        impuesto: detalle.Impuesto,
                        montoImpuesto: detalle.Monto_Impuesto,
                        subtotalGravado: detalle.SubtotalGravado,
                        subTotalExcento: detalle.SubTotalExcento,
                        subTotal: detalle.SubTotal,
                        cantVen: detalle.CantVet,
                        cantBod: detalle.CantBod,
                        idBodega: detalle.Id_Bodega,
                        lote: detalle.idLote
                    }
                })
            }
            const datosCliente ={
                direccion: billings[numberScreen].factura.encabezado.direccion,
                nombreCliente: billings[numberScreen].factura.encabezado.nombre_Cliente,
                cedulaCliente: billings[numberScreen].factura.encabezado.cedula_Usuario,
                vendedorEncargado: billings[numberScreen].factura.encabezado.usuario,
            }
            //console.log(newBilling)
            dispatch(startSaveBilling(newBilling, numberScreen, datosCliente,idSucursalOF));
        }

    }


    const handleEditBilling = async (e) => {

        if (billings[numberScreen] === undefined) return;

        if (!billings[numberScreen].activeButtonSave || !billings[numberScreen].hasCustomerBilling) return;

        e.preventDefault();

        const idSucursal = surcursales.find(surcursal => surcursal.alias === centro).id;

        const editBilling = {
            id: parseInt(billings[numberScreen].factura.encabezado.id),
            tipo: billings[numberScreen].factura.encabezado.tipo,
            numFactura: billings[numberScreen].factura.encabezado.num_Factura,
            numCaja: billings[numberScreen].factura.encabezado.NumeroCaja, //TODO: Validar
            fecha: billings[numberScreen].factura.encabezado.fecha,
            codCliente: `${billings[numberScreen].factura.encabezado.cod_Cliente}`,
            observaciones: billings[numberScreen].factura.encabezado.observaciones,
            codMoneda: billings[numberScreen].factura.encabezado.Cod_Moneda,
            orden: billings[numberScreen].factura.encabezado.Orden,
            taller: billings[numberScreen].factura.encabezado.Taller,
            mascotas: billings[numberScreen].factura.encabezado.Mascotas,
            agente: billings[numberScreen].factura.encabezado.agente,
            Cod_agente: parseInt(billings[numberScreen].factura.encabezado.cod_agente),
            subTotalGravada: billings[numberScreen].factura.encabezado.SubTotalGravada,
            subTotalExento: billings[numberScreen].factura.encabezado.SubTotalExento,
            subTotal: billings[numberScreen].factura.encabezado.SubTotal,
            descuento: billings[numberScreen].factura.encabezado.Descuento,
            impVenta: billings[numberScreen].factura.encabezado.Imp_Venta,
            exonerar: billings[numberScreen].factura.encabezado.Exonerar, //TODO: Validar
            total: billings[numberScreen].factura.encabezado.Total,
            ficha: billings[numberScreen].factura.encabezado.ficha,
            idSucursal: idSucursal,
            idEmpresa: billings[numberScreen].factura.encabezado.empresa,
            preventa: billings[numberScreen].factura.encabezado.preventa,
            detalle: billings[numberScreen].factura.detalle.map(detalle => {
                return {
                    idVentaDetalle: (detalle.idVentaDetalle === undefined) ? 0 : detalle.idVentaDetalle,
                    codArticulo: detalle.CodArticulo,
                    codFxArticulo: detalle.codFxArticulo,
                    descripcion: detalle.Descripcion,
                    cantidad: detalle.Cantidad,
                    precioUnit: detalle.Precio_Unit,
                    descuento: detalle.Descuento,
                    montoDescuento: detalle.Monto_Descuento,
                    impuesto: detalle.Impuesto,
                    montoImpuesto: detalle.Monto_Impuesto,
                    subtotalGravado: detalle.SubtotalGravado,
                    subTotalExcento: detalle.SubTotalExcento,
                    subTotal: detalle.SubTotal,
                    cantVen: detalle.CantVet,
                    cantBod: detalle.CantBod,
                    idBodega: detalle.Id_Bodega,
                    lote: detalle.idLote
                }
            })
        }

        dispatch(startEditBilling(editBilling, numberScreen));
    }

    const handleOnKeyDownUser = async (e) => {

        if (billings[numberScreen] === undefined) return;

        if (e.key === 'Enter') {

            e.preventDefault();

            if (billings[numberScreen].claveInterna == '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba su contraseña.'
                });

                return;
            }

            // Obtener los catalogos
            const catalogos = {
                tiposFacturas: allTiposFacturas,
                tiposIdentificacion,
                empresas,
                surcursales,
                aumentoExtranjero,
                agentes: agentesBilling,
                bodegas: bodegasInventory,
                tiposExoneracion,
                monedas: monedasInventory
            }

            dispatch(startValidateClaveInternaBilling(billings[numberScreen].usuarioFacturacion.claveInterna, numberScreen, catalogos));
        }

    }

    const handleVisibleClave = (e) => {

        if (billings[numberScreen] === undefined) return;

        if (!billings[numberScreen].disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisibleClaveInternaBilling({ value: !billings[numberScreen].visiblePassword, number: numberScreen }));
        }
    }

    const handleCloseWindow = (e) => {

        e.preventDefault();

        if (billings[numberScreen].startOpening) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar la factura?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {
                    dispatch(CleanBilling({ number: numberScreen }));
                    // dispatch( SetRemoveArrayStateBilling( parseInt(currentTab.name.split('#')[1].trim()) ) );
                }
            });

        } else {
            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(SetRemoveArrayStateBilling(parseInt(currentTab.name.split('#')[1].trim())));
        }
    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={
                            (billings[numberScreen] !== undefined)
                                ? (billings[numberScreen].activeButtonSave && billings[numberScreen].hasCustomerBilling) ? 'btn btn-dark espacio' : 'btn btn-dark espacio disabled'
                                : 'btn btn-dark espacio disabled'
                        }
                        onClick={
                            (billings[numberScreen] !== undefined)
                                ? (billings[numberScreen].isPreventaEdit) ? handleEditBilling : handleCreateBilling
                                : () => { }
                        }
                        {...((billings[numberScreen]?.factura?.encabezado?.tipo === 1 || billings[numberScreen]?.factura?.encabezado?.tipo === 5 || billings[numberScreen]?.factura?.encabezado?.tipo === 7)
                            ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#modalTiqueteVentaCredito' }
                            : {})}
                    >
                        {
                            (billings[numberScreen] !== undefined) ? (
                                <>
                                    {billings[numberScreen].isPreventaEdit ? (
                                        <>
                                            Editar <TbEditCircle className="iconSizeBtn" />
                                        </>
                                    ) : (
                                        <>
                                            Guardar <MdNoteAdd className="iconSizeBtn" />
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    Guardar <MdNoteAdd className="iconSizeBtn" />
                                </>
                            )
                        }
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                        onClick={handleCloseWindow}
                    >
                        {
                            (billings[numberScreen] !== undefined)
                                ? (billings[numberScreen].startOpening) ? 'Cancelar' : 'Cerrar'
                                : 'Cerrar'
                        } {""}
                        <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>


                <div className="col-md-2 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={
                                (billings[numberScreen] !== undefined)
                                    ? (billings[numberScreen].visiblePassword) ? 'text' : 'password'
                                    : 'password'
                            }
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsUser
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].usuarioFacturacion.claveInterna
                                    : ''
                            }
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaFacturacionBilling)}
                        />
                        <span
                            className="input-group-text"
                            onClick={
                                (billings[numberScreen] !== undefined)
                                    ? handleVisibleClave
                                    : () => { }
                            }
                            style={{ cursor: "pointer" }}
                        >
                            {
                                (billings[numberScreen] !== undefined)
                                    ? (billings[numberScreen].visiblePassword)
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    : <FaEyeSlash />
                            }
                        </span>
                    </div>
                </div>

                {billings[numberScreen] !== undefined && billings[numberScreen].factura ? (
                    <div className="col-md-2 mb-2 espacio">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUserCheck className="iconSize" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={billings[numberScreen].factura.encabezado.usuario}
                            />
                        </div>
                    </div>
                ) : ""}
            </div>

            <BillingFacturaCreditoModal />
        </>

    )
}

