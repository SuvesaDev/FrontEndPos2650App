import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { FaUserCheck } from 'react-icons/fa';
//Icons
import { FaEye, FaMoneyCheckAlt, FaSignOutAlt, FaEyeSlash } from "react-icons/fa";
import { PiKeyFill } from "react-icons/pi";
import { FaWindowClose } from "react-icons/fa";

import { DeleteTab } from '../../actions/tabs';

import { 
    SetClaveInternaFollowingConsignment, 
    SetVisiblePasswordFollowingConsignment,
    startValidateClaveInternaFollowingConsignment
} from '../../actions/FollowingConsignmentAction';

export const FollowingConsignmentFooter = () => {

    const dispatch = useDispatch();

    const { 
        activeButtonsFooter,
        visiblePassword,
        startOpening,
        usuarioFacturacion,
        plazos
    } = useSelector(state => state.followingConsignment);

    const { claveInterna, nameUser } = usuarioFacturacion;

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

    // const handleCreateBilling = async (e) => {

    //     // if (!activeButtonSave || !hasCustomerBilling) return;

    //     // e.preventDefault();
    //     // let respuestaValidacionesClientes = 'ok';

    //     // if (hasCustomerBilling === true) {
    //     //     //si hay cliente seleccionado validamos la info
    //     //     respuestaValidacionesClientes = await ValidacionesClientes();
    //     // }

    //     // if (respuestaValidacionesClientes === 'ok') {
            
    //     //     const date = new Date();
    //     //     const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

    //     //     const idSucursal = surcursales.find(surcursal => surcursal.alias === centro).id;

    //     //     const idBodegaCostaPets = bodegasInventory.find(bodega => bodega.nombreBodega == "COSTAPETS");
            
    //     //     const newBilling = {
    //     //         tipo: factura.encabezado.tipo,
    //     //         numCaja: "0",
    //     //         numApertura: null, 
    //     //         fecha: isoDateTime[0] + " " + isoDateTime[1],
    //     //         codCliente: `${factura.encabezado.cod_Cliente}`,
    //     //         observaciones: factura.encabezado.observaciones,
    //     //         codMoneda: factura.encabezado.Cod_Moneda,
    //     //         orden: "",
    //     //         taller: false,
    //     //         mascotas: false,
    //     //         agente: null,
    //     //         Cod_agente: null,
    //     //         subTotalGravada: factura.encabezado.SubTotalGravada,
    //     //         subTotalExento: factura.encabezado.SubTotalExento,
    //     //         subTotal: factura.encabezado.SubTotal,
    //     //         descuento: factura.encabezado.Descuento,
    //     //         impVenta: factura.encabezado.Imp_Venta,
    //     //         exonerar: null,
    //     //         total: factura.encabezado.Total,
    //     //         ficha: null,
    //     //         idSucursal: idSucursal,
    //     //         idEmpresa:  "1",
    //     //         preventa: true,
    //     //         idClienteSucursal: null,
    //     //         idPlazo: factura.encabezado.plazo,
    //     //         esConsignacion: true,
    //     //         consignacionAceptada: false,
    //     //         detalle: factura.detalle.map(detalle => {
    //     //             return {
    //     //                 idVentaDetalle : 0,
    //     //                 codArticulo: detalle.CodArticulo,
    //     //                 codFxArticulo: detalle.codFxArticulo,
    //     //                 descripcion: detalle.Descripcion,
    //     //                 cantidad: detalle.Cantidad,
    //     //                 precioUnit: detalle.Precio_Unit,
    //     //                 descuento: detalle.Descuento,
    //     //                 montoDescuento: detalle.Monto_Descuento,
    //     //                 impuesto: detalle.Impuesto,
    //     //                 montoImpuesto: detalle.Monto_Impuesto,
    //     //                 subtotalGravado: detalle.SubtotalGravado,
    //     //                 subTotalExcento: detalle.SubTotalExcento,
    //     //                 subTotal: detalle.SubTotal,
    //     //                 cantVen: detalle.CantVet,
    //     //                 cantBod: detalle.CantBod,
    //     //                 idBodega: idBodegaCostaPets.idBodega,
    //     //                 lote: detalle.idLote,
    //     //                 numeroLote: ''
    //     //             }
    //     //         })
    //     //     }

    //     //     const datosCliente ={
    //     //         direccion: factura.encabezado.direccion,
    //     //         nombreCliente: factura.encabezado.nombre_Cliente,
    //     //         cedulaCliente: factura.encabezado.cedula_Usuario,
    //     //         vendedorEncargado: factura.encabezado.usuario,
    //     //     }

    //     //     dispatch( startSaveConsignment(newBilling, datosCliente, idSucursalOF) );
    //     // }

    // }

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

            dispatch( startValidateClaveInternaFollowingConsignment(claveInterna, catalogos));
        }
    }

    const handleVisibleClave = (e) => {
        if (!activeButtonsFooter) {
            e.preventDefault();
            dispatch(SetVisiblePasswordFollowingConsignment(!visiblePassword));
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
                        className={(activeButtonsFooter) ? 'btn btn-success espacio' : 'btn btn-success espacio disabled' }
                        // onClick={ (isEditConsignment) ? handleEditBilling : handleCreateBilling }
                    >
                        <>
                            Generar movimiento contable <FaMoneyCheckAlt className="iconSizeBtn" />
                        </>
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonsFooter) ? 'btn btn-primary espacio' : 'btn btn-primary espacio disabled' }
                        // onClick={handleCreateBilling}
                    >
                        Despachar <FaSignOutAlt className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                        // onClick={handleCloseWindow}
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
                            disabled={activeButtonsFooter}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaFollowingConsignment)}
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

                <div className="col-md-2 mb-2 espacio">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUserCheck className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={nameUser}
                        />
                    </div>
                </div>

            </div>

        </>

    )
}

