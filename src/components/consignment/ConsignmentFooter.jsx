import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { FaUserCheck } from 'react-icons/fa';
//Icons
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
import { PiKeyFill } from "react-icons/pi";
import { FaWindowClose } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";
import { MdNoteAdd } from "react-icons/md";

import { DeleteTab } from '../../actions/tabs';

import { 
    CleanConsignment,
    SetclaveInternaConsignment, 
    SetvisiblePasswordConsignment,
    startEditConsignment,
    startSaveConsignment,
    startValidateClaveInternaConsignment
} from '../../actions/ConsignmentAction';
import { ConsignmentSearchModal } from './ConsignmentSearchModal';

export const ConsignmentFooter = () => {

    const dispatch = useDispatch();

    const { 
        activeButtonSave,
        hasCustomerBilling,
        startOpening,
        visiblePassword,
        disableInputsUser,
        usuarioFacturacion,
        factura,
        plazos,
        activeButtonSearch,
        isEditConsignment
    } = useSelector(state => state.consignment);

    const { claveInterna } = usuarioFacturacion;

    const { currentTab } = useSelector(state => state.tabs);
    const { surcursales, auth, idSurcursal } = useSelector(state => state.login);
    const { centro } = auth;
    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;

    const { allTiposFacturas } = useSelector(state => state.tiposFacturas);
    const { monedasInventory } = useSelector(state => state.monedas);
    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);
    const { bodegasInventory } = useSelector(state => state.bodegas);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const ValidacionesClientes = async () => {

        // si el cliente esta marcaddo como fallecido
        if (factura.encabezado.fallecido == true) {
            await Swal.fire({
                icon: 'error',
                title: 'No se puede procesar la operación',
                text: 'El cliente esta registrado en el sistema como Fallecido.'
            });
            return '';
        }

        // Validacion de Tipo Factura
        if (factura.encabezado.tipo == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Tipo Factura',
                text: 'Por favor seleccione un tipo de factura para registrar la facturacion.'
            });
            return '';
        }

        // Validacion de Moneda
        if (factura.encabezado.Cod_Moneda == '') {
            Swal.fire({
                icon: 'error',
                title: 'Moneda',
                text: 'Por favor seleccione una moneda para registrar la facturacion.'
            });
            return '';
        }

        // Validacion de Productos
        if (factura.detalle.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Productos',
                text: 'Por favor seleccione un producto para registrar la facturacion.'
            });
            return '';
        }

        //si el cliente esta marcado como moroso
        if (factura.encabezado.cliente_Moroso == true) {
            Swal.fire({
                icon: 'error',
                title: 'Cliente moroso',
                text: 'Favor indicarle a la cajera o a gerencia, no le comente nada al cliente.'
            });
            return '';
        }

        // Si el cliente no esta marcado como actualizado
        if (factura.encabezado.actualizado == false) {
            return await Swal.fire({
                title: `Favor actualizar los datos del cliente antes de facturarle `,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Actualizar Datos',
                denyButtonText: `Continuar`,
            }).then(async (result) => {
                return new Promise((resolve) => {
                    if (result.isConfirmed) {
                        // dispatch(OpenModalEditCustomer({ number: numberScreen }));
                        resolve('');
                    } else {
                        resolve('ok');
                    }
                })


            });
        }

        return 'ok'

    }

    const handleCreateBilling = async (e) => {

        if (!activeButtonSave || !hasCustomerBilling) return;

        e.preventDefault();
        let respuestaValidacionesClientes = 'ok';

        if (hasCustomerBilling === true) {
            //si hay cliente seleccionado validamos la info
            respuestaValidacionesClientes = await ValidacionesClientes();
        }

        if (respuestaValidacionesClientes === 'ok') {
            
            const date = new Date();
            const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

            const idSucursal = surcursales.find(surcursal => surcursal.alias === centro).id;

            const idBodegaCostaPets = bodegasInventory.find(bodega => bodega.nombreBodega == "COSTAPETS");
            
            const newBilling = {
                tipo: factura.encabezado.tipo,
                numCaja: "0",
                numApertura: null, 
                fecha: isoDateTime[0] + " " + isoDateTime[1],
                codCliente: `${factura.encabezado.cod_Cliente}`,
                observaciones: factura.encabezado.observaciones,
                codMoneda: factura.encabezado.Cod_Moneda,
                orden: "",
                taller: false,
                mascotas: false,
                agente: null,
                Cod_agente: null,
                subTotalGravada: factura.encabezado.SubTotalGravada,
                subTotalExento: factura.encabezado.SubTotalExento,
                subTotal: factura.encabezado.SubTotal,
                descuento: factura.encabezado.Descuento,
                impVenta: factura.encabezado.Imp_Venta,
                exonerar: null,
                total: factura.encabezado.Total,
                ficha: null,
                idSucursal: idSucursal,
                idEmpresa:  "1",
                preventa: true,
                idClienteSucursal: null,
                idPlazo: factura.encabezado.plazo,
                esConsignacion: true,
                detalle: factura.detalle.map(detalle => {
                    return {
                        idVentaDetalle : 0,
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
                        idBodega: idBodegaCostaPets.idBodega,
                        lote: detalle.idLote
                    }
                })
            }

            const datosCliente ={
                direccion: factura.encabezado.direccion,
                nombreCliente: factura.encabezado.nombre_Cliente,
                cedulaCliente: factura.encabezado.cedula_Usuario,
                vendedorEncargado: factura.encabezado.usuario,
            }

            dispatch( startSaveConsignment(newBilling, datosCliente, idSucursalOF) );
        }

    }

    const handleEditBilling = async (e) => {

        if (!activeButtonSave || !hasCustomerBilling) return;

        e.preventDefault();
        let respuestaValidacionesClientes = 'ok';

        if (hasCustomerBilling === true) {
            //si hay cliente seleccionado validamos la info
            respuestaValidacionesClientes = await ValidacionesClientes();
        }

        if (respuestaValidacionesClientes === 'ok') {
            
            const date = new Date();
            const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

            const idSucursal = surcursales.find(surcursal => surcursal.alias === centro).id;

            const idBodegaCostaPets = bodegasInventory.find(bodega => bodega.nombreBodega == "COSTAPETS");
            
            const editBilling = {
                id: parseInt(factura.encabezado.id),
                numFactura: factura.encabezado.num_Factura,
                tipo: factura.encabezado.tipo,
                numCaja: "0",
                numApertura: null, 
                fecha: isoDateTime[0] + " " + isoDateTime[1],
                codCliente: `${factura.encabezado.cod_Cliente}`,
                observaciones: factura.encabezado.observaciones,
                codMoneda: factura.encabezado.Cod_Moneda,
                orden: "",
                taller: false,
                mascotas: false,
                agente: null,
                Cod_agente: null,
                subTotalGravada: factura.encabezado.SubTotalGravada,
                subTotalExento: factura.encabezado.SubTotalExento,
                subTotal: factura.encabezado.SubTotal,
                descuento: factura.encabezado.Descuento,
                impVenta: factura.encabezado.Imp_Venta,
                exonerar: null,
                total: factura.encabezado.Total,
                ficha: null,
                idSucursal: idSucursal,
                idEmpresa:  "1",
                preventa: true,
                idClienteSucursal: null,
                idPlazo: factura.encabezado.plazo,
                esConsignacion: true,
                detalle: factura.detalle.map(detalle => {
                    return {
                        idVentaDetalle : (detalle.idVentaDetalle != null) ? detalle.idVentaDetalle : 0,
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
                        idBodega: idBodegaCostaPets.idBodega,
                        lote: detalle.idLote
                    }
                })
            }
            console.log(editBilling);
            dispatch( startEditConsignment(editBilling) );
        }
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

            // Obtener los catalogos
            const catalogos = {
                tiposFacturas: allTiposFacturas,
                tiposIdentificacion,
                surcursales,
                monedas: monedasInventory,
                plazos,
                bodegas: bodegasInventory
            }

            dispatch( startValidateClaveInternaConsignment(claveInterna, catalogos));
        }
    }

    const handleVisibleClave = (e) => {
        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetvisiblePasswordConsignment(!visiblePassword));
        }
    }

    const handleCloseWindow = (e) => {

        e.preventDefault();

        if (startOpening) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar la consignacion?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {
                    dispatch(CleanConsignment());
                }
            });

        } else {
            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
        }
    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonSave && hasCustomerBilling) ? 'btn btn-success espacio' : 'btn btn-success espacio disabled' }
                        onClick={ (isEditConsignment) ? handleEditBilling : handleCreateBilling }
                    >
                        {
                            (isEditConsignment) ? (
                                <>
                                    Editar <TbEditCircle className="iconSizeBtn" />
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
                        className={(activeButtonSearch) ? 'btn btn-primary espacio' : 'btn btn-primary espacio disabled' }
                        // onClick={handleCreateBilling}
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscarConsignacion"
                    >
                        Buscar <FaSearch className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                        onClick={handleCloseWindow}
                    >
                        {
                            (startOpening)
                                ? 'Cancelar'
                                : 'Cerrar'
                        } 
                        {"  "}
                        <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

                <div className="col-md-2 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={ (visiblePassword) ? 'text' : 'password' }
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetclaveInternaConsignment)}
                        />
                        <span
                            className="input-group-text"
                            onClick={handleVisibleClave}
                            style={{ cursor: "pointer" }}
                        >
                            {
                                (visiblePassword)
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </span>
                    </div>
                </div>

                {factura ? (
                    <div className="col-md-2 mb-2 espacio">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUserCheck className="iconSize" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={factura.encabezado.usuario}
                            />
                        </div>
                    </div>
                ) : ""}

            </div>

            <ConsignmentSearchModal />

        </>

    )
}

