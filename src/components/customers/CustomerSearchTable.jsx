import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from "react-table";

import {
    ActiveButtonNewCustomers,
    ActiveButtonRemoveCustomers,
    ActiveButtonSaveCustomers,
    ActiveButtonSearchCustomers,
    ActiveCredito,
    CleanSearchCustomers,
    CloseSearchModalCustomers,
    DisableInputsCustomers,
    IsCustomerDisable,
    IsCustomerEditCustomers,
    SelectedSearchCustomers,
    SetDisableCantonesCustomers,
    SetDisableDistritosCustomers,
    SetStartOpeningCustomers,
    startGetAllCantones,
    startGetAllDistritos
} from '../../actions/customers';

import {
    hasCustomerBilling,
    hasHeader,
    OpenSearchCustomerBilling,
    SetActualizadoBilling,
    SetCedulaUsuarioBilling,
    SetClienteMorosoBilling,
    SetCodClienteBilling,
    SetCorreoComprobantesBilling,
    SetCustomerEditBilling,
    SetDireccionBilling,
    SetFallecidoBilling,
    SetIdTipoClienteBilling,
    SetIsEnableActiveCreditoBilling,
    SetMagBilling,
    SetNombreClienteBilling,
    SetObligaOrdenCompraBilling,
    SetObservacionesBilling,
    SetSinRestriccionBilling,
    SetTelefonoBilling,
    startSearchCartaExoneracion,
} from '../../actions/billing';

import {
    openSearchCustomerModalDocumentsEmited,
    setCustomerDocumentsEmited,
    setCustomerIDSearchDocumentsEmited
} from '../../actions/documentsEmitedAction';

import {
    SetIndexCustomerSeletedTableConsultAlbaranes,
    SetOpenModalSearchCustomerConsultAlbaranes,
    SetUpdateCustomerFacturasPendientesConsultAlbaranes
} from '../../actions/consultAlbaranesAction';
import { startGetAllProvincias } from '../../actions/ProvinciasAction';

export const CustomerSearchTable = ({ columns, data }) => {

    const [numberScreen, setnumberScreen] = useState(null);

    const dispatch = useDispatch();

    const { billings } = useSelector(state => state.billing);
    const { openSearchCustomerModalDE } = useSelector(state => state.documentsEmited);
    const { currentTab } = useSelector(state => state.tabs);
    const { openModalSearchCustomerConsultAlbaranes, indexCustomerSeletedTable, facturasPendiente } = useSelector(state => state.consultAlbaranes);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
    } = useTable({
        columns,
        data,
    });


    // useEffect(() => {
    //     const modalElement = document.getElementById('modalBuscarClientes');
    //     const handleHiddenModal = () => {
    //         closeModal();
    //     };

    //     modalElement.addEventListener('hidden.bs.modal', handleHiddenModal);

    //     return () => {
    //         modalElement.removeEventListener('hidden.bs.modal', handleHiddenModal);
    //     };
    // }, []);


    const closeModal = () => {
        if (openSearchCustomerModalDE) {
            dispatch(openSearchCustomerModalDocumentsEmited(false));
        } else if (openModalSearchCustomerConsultAlbaranes) {
            dispatch(SetOpenModalSearchCustomerConsultAlbaranes(false));
            dispatch(SetIndexCustomerSeletedTableConsultAlbaranes(null));
        } else {
            dispatch(ActiveButtonNewCustomers(true));
            dispatch(ActiveButtonSearchCustomers(true));
            dispatch(ActiveButtonSaveCustomers(false));
            dispatch(ActiveButtonRemoveCustomers(false));
            dispatch(DisableInputsCustomers(true));
        }
    }

    const handleSelectedRow = async (cell) => {

        //Buscar en el listado obtener el cliente
        const { cedula, nombre, telefono_01 } = cell.row.values;
        const customer = data.find(customer => customer.cedula === cedula && customer.nombre === nombre && customer.telefono_01 === telefono_01);

        if (billings[numberScreen] !== undefined) {

            if (!billings[numberScreen].openSearchCustomerBilling) {
                return;
            }

            //Buscar cliente desde Facturacion
            // Se obtiene el cliente seleccionado
            const {
                identificacion,
                nombre,
                cedula,
                observaciones,
                telefono_01,
                direccion,
                correoComprobante,
                idTipoIdentificacion,
                agente,
                e_Mail,
                actualizado,
                fallecido,
                enviarRecibo,
                correoRecibo,
                tipoprecio,
                descuentoEspecial,
                mag,
                anulado,
                abierto,
                cliente_Moroso,
                ordenCompra,
                sinrestriccion
            } = customer;

            const customerEditBilling = {
                identificacion: identificacion,
                idTipoCliente: idTipoIdentificacion,
                telefono: telefono_01,
                direccion: direccion,
                correocuentas: e_Mail,
                correoFacturacion: correoComprobante,
                agente: agente,
                actualizado: actualizado,
                fallecido: fallecido,
                enviaRecibo: enviarRecibo,
                correoRecibo: correoRecibo,
                tipoPrecio: tipoprecio,
                descuentoEspcial: descuentoEspecial,
                inactivo: anulado,
                mag: mag,
                abierto: abierto
            }

            await dispatch(startSearchCartaExoneracion(cedula, numberScreen));

            // Se establece la cedula, tipoCliente y nombre del cliente
            dispatch(SetCedulaUsuarioBilling({ value: cedula, number: numberScreen }));
            dispatch(SetIdTipoClienteBilling({ value: idTipoIdentificacion, number: numberScreen }));
            dispatch(SetNombreClienteBilling({ value: nombre, number: numberScreen }));

            // Se establece el telefono, direccion, correo comprobantes
            dispatch(SetTelefonoBilling({ value: telefono_01, number: numberScreen }));
            dispatch(SetDireccionBilling({ value: direccion, number: numberScreen }));
            dispatch(SetCorreoComprobantesBilling({ value: correoComprobante, number: numberScreen }));

            // Se establece el MAG, Fallecido, Actualizado
            dispatch(SetMagBilling({ value: mag, number: numberScreen }));
            dispatch(SetFallecidoBilling({ value: fallecido, number: numberScreen }));
            dispatch(SetActualizadoBilling({ value: actualizado, number: numberScreen }));

            // Se establece Cliente Moroso, ObligaOrdenCompra, SinRestriccion
            dispatch(SetClienteMorosoBilling({ value: cliente_Moroso, number: numberScreen }));
            dispatch(SetObligaOrdenCompraBilling({ value: ordenCompra, number: numberScreen }));
            dispatch(SetSinRestriccionBilling({ value: sinrestriccion, number: numberScreen }));

            // Se establece el customer Edit , HasCustomerBilling
            dispatch(SetCustomerEditBilling({ value: customerEditBilling, number: numberScreen }));
            dispatch(hasCustomerBilling({ value: true, number: numberScreen }));

            // Se establece el CodCliente
            dispatch(SetCodClienteBilling({ value: identificacion, number: numberScreen }));

            // Se establece HasHeader, OpenSearchCustomerBilling y IsEnableActiveCredito
            dispatch(hasHeader({ value: true, number: numberScreen }));
            dispatch(OpenSearchCustomerBilling({ value: false, number: numberScreen }));
            dispatch(SetIsEnableActiveCreditoBilling({ value: abierto, number: numberScreen }));

           //Cerrar el modal
           dispatch(CloseSearchModalCustomers());
           //Clean el state de busqueda
           dispatch(CleanSearchCustomers());

        } else if (openSearchCustomerModalDE) {

            //Buscar cliente desde Documentos Emitidos
            const {
                identificacion,
                nombre,
                cedula
            } = customer;

            const customerDocumentsEmited = {
                identificacion: identificacion,
                cedula: cedula,
                nombre: nombre,
            }

            dispatch(setCustomerDocumentsEmited(customerDocumentsEmited));
            dispatch(setCustomerIDSearchDocumentsEmited(identificacion));
            dispatch(openSearchCustomerModalDocumentsEmited(false));

        } else if (openModalSearchCustomerConsultAlbaranes) {

            const { nombre } = customer;

            // Busca cliente desde Consulta Albaranes
            dispatch(SetUpdateCustomerFacturasPendientesConsultAlbaranes({
                index: parseInt(indexCustomerSeletedTable),
                cliente: nombre
            }));

            dispatch(SetOpenModalSearchCustomerConsultAlbaranes(false));
            dispatch(SetIndexCustomerSeletedTableConsultAlbaranes(null));


        } else {

            // Busca cliente desde la pantalla de clientes

            // Transforma el objeto JSON
            const searchCustomer = {
                identificacion: customer.identificacion,
                nombre: customer.nombre,
                nombreFantasia: customer.nombreFantasia,
                cedula: customer.cedula,
                observaciones: customer.observaciones,
                telefono: customer.telefono_01,
                fax: customer.fax_01,
                provincia: customer.idProvincia,
                canton: customer.idCanton,
                distrito: customer.idDistrito,
                direccion: customer.direccion,
                correocuentas: customer.e_Mail,
                correoFacturacion: customer.correoComprobante,
                tipoCliente: customer.idTipoIdentificacion,
                agente: customer.agente,
                actualizado: customer.actualizado,
                fallecido: customer.fallecido,
                enviaRecibo: customer.enviarRecibo,
                correoRecibo: customer.correoRecibo,
                tipoPrecio: customer.tipoprecio,
                descuentoEspcial: customer.descuentoEspecial,
                inactivo: customer.anulado,
                mag: customer.mag,
                abierto: customer.abierto,
                codMonedaCredito: customer.codMonedaCredito,
                plazoCredito: customer.plazo_Credito,
                maxCredito: customer.max_Credito,
                descuento: customer.descuento,
                empresa: customer.empresa,
                sinrestriccion: customer.sinrestriccion,
                clienteMoroso: customer.cliente_Moroso,
                ordenCompra: customer.ordenCompra,
                estado: customer.estado
            };
            //seleccionarlo y meterlo al estado
            dispatch(SelectedSearchCustomers(searchCustomer));

            // Si tiene credito se activa el checkbox
            if (customer.codMonedaCredito != null || customer.plazo_Credito != null
                || customer.max_Credito != null || customer.descuento != null) {
                dispatch(ActiveCredito(true));
            }

            //Habilitar los inputs
            dispatch(DisableInputsCustomers((customer.estado) ? false : true));

            //Modificar los botones
            dispatch(ActiveButtonSearchCustomers(true));
            dispatch(ActiveButtonSaveCustomers((customer.estado) ? true : false));
            dispatch(ActiveButtonNewCustomers(false));
            dispatch(ActiveButtonRemoveCustomers(true));

            //Si cliente esta disable se indica
            if (!customer.estado) {
                dispatch(IsCustomerDisable(true))
            }

            //Indicar que es usuario para editar
            dispatch(IsCustomerEditCustomers((customer.estado) ? true : false));

            //Set Start Opening
            dispatch(SetStartOpeningCustomers(true));

            // Se obtiene las provincias
            dispatch(startGetAllProvincias());

            //Se activa el combo de cantones
            dispatch(SetDisableCantonesCustomers(false));

            //Se obtiene los cantones de esa provincia
            dispatch(startGetAllCantones(searchCustomer.provincia));

            //Se activa el combo de distritos
            dispatch(SetDisableDistritosCustomers(false));

            // Se obtiene los distritos
            dispatch(startGetAllDistritos(searchCustomer.canton));
        }

        //Cerrar el modal
        dispatch(CloseSearchModalCustomers());

        //Clean el state de busqueda
        dispatch(CleanSearchCustomers());
    }
    return (
        <>
            <div class="table-responsive-md tablaP">
                <table
                    {...getTableProps()}
                    className="table table-bordered table-hover text-lg-center"
                >
                    <thead className="table-dark">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="table-white"
                        {...getTableBodyProps()}
                    >
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps({
                                                    onClick: (e) => {
                                                        handleSelectedRow(cell);
                                                    }
                                                })}
                                                data-bs-dismiss="modal"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </>
    )
}
