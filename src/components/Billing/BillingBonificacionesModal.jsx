import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IoIosCloseCircle } from "react-icons/io";
import { FaFloppyDisk } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';

import {
    CleanCorreoComprobanteActualBilling,
    CleanCorreoComprobantesBilling,
    CleanSeletedCorreoComprobantesBilling,
    IsCorreoComprobanteEditBilling,
    OpenAddCorreosModalBilling,
    SetAddCorreoComprobantesBilling,
    SetCorreoComprobanteActualBilling,
    SetEditCorreoComprobantesBilling,
    startSaveCorreosComprobanteFacturacion
} from '../../actions/billing';

import { BillingTiposBonificacionesModalTable } from './BillingTiposBonificacionesModalTable';
import { BillingProductosBonificacionesModalTable } from './BillingProductosBonificacionesModalTable';


export const BillingBonificacionesModal = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { billings } = useSelector(state => state.billing);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const columnsTipoConfiguracion = [
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Cantidad Venta",
            accessor: "cantidadVenta",
        },
        {
            Header: "Cantidad Bonificable",
            accessor: "cantidadBonificable",
        },
    ];

    const columnsProductos = [
        {
            Header: "Codigo",
            accessor: "codigo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Cantidad",
            accessor: "cantidad",
        }
    ];

    const handleAddCorreo = (e) => {

        if (billings[numberScreen] === undefined) return;

        e.preventDefault();

        const correo = billings[numberScreen].correosComprobantes.find(correo => correo.correoComprobante === billings[numberScreen].correoComprobanteActual);

        // Add Correo
        if (billings[numberScreen].correoComprobanteActual !== '' && correo === undefined && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(billings[numberScreen].correoComprobanteActual)) {
            dispatch(SetAddCorreoComprobantesBilling({
                value: { correoComprobante: billings[numberScreen].correoComprobanteActual },
                number: numberScreen
            }));
            dispatch(CleanCorreoComprobanteActualBilling({ number: numberScreen }));
        }
    }

    const handleEditCorreo = (e) => {

        if (billings[numberScreen] === undefined) return;

        e.preventDefault();

        const correo = billings[numberScreen].correosComprobantes.find(correo => correo.correoComprobante === billings[numberScreen].seletedCorreosComprobanteEdit);
        const index = billings[numberScreen].correosComprobantes.findIndex(correo => correo.correoComprobante === billings[numberScreen].seletedCorreosComprobanteEdit);

        // Edit Correo
        if (billings[numberScreen].correoComprobanteActual !== '' && correo !== undefined && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(billings[numberScreen].correoComprobanteActual)) {
            dispatch(SetEditCorreoComprobantesBilling({
                index,
                correoComprobante: billings[numberScreen].correoComprobanteActual,
                number: numberScreen
            }));
            dispatch(IsCorreoComprobanteEditBilling({ value: false, number: numberScreen }));
            dispatch(CleanCorreoComprobanteActualBilling({ number: numberScreen }));
        }
    }

    const handleCleanCorreos = (e) => {

        if (billings[numberScreen] === undefined) return;

        e.preventDefault();

        dispatch(CleanCorreoComprobantesBilling({ number: numberScreen }));
        dispatch(IsCorreoComprobanteEditBilling({ value: false, number: numberScreen }));
        dispatch(CleanSeletedCorreoComprobantesBilling({ number: numberScreen }));
        dispatch(CleanCorreoComprobanteActualBilling({ number: numberScreen }));
    }

    const handleSaveCorreos = (e) => {

        if (billings[numberScreen] === undefined) return;

        e.preventDefault();

        const { cod_Cliente, cedula_Usuario } = billings[numberScreen].factura.encabezado;

        const correosGuardar = billings[numberScreen].correosComprobantes.map(correo => {
            return {
                correo: correo.correoComprobante
            }
        });

        const correos = {
            idCliente: cod_Cliente,
            correos: correosGuardar
        }

        dispatch(startSaveCorreosComprobanteFacturacion(correos, cedula_Usuario, numberScreen));
    }

    const closeModal = () => {

        if (billings[numberScreen] === undefined) return;

        dispatch(OpenAddCorreosModalBilling({ value: false, number: numberScreen }));

        dispatch(CleanCorreoComprobantesBilling({ number: numberScreen }));
        dispatch(IsCorreoComprobanteEditBilling({ value: false, number: numberScreen }));
        dispatch(CleanSeletedCorreoComprobantesBilling({ number: numberScreen }));
        dispatch(CleanCorreoComprobanteActualBilling({ number: numberScreen }));
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        if (billings[numberScreen] === undefined) return;
        dispatch(action({ value: target.value, number: numberScreen }));
    };

    return (
        <>

            <div className="modal fade" id="modalBonificacionFacturacion">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">
                                Bonificaciones <FaShoppingCart className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                            ></button>
                        </div>
                        
                        <div className="modal-body">

                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <h5>Lista de configuracion</h5>
                                </div>

                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>Configuracion Seleccionada</p>
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                name='Orden'
                                                className='form-control'
                                                disabled={true}
                                                value={
                                                    (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].currentConfiguracion.descripcion
                                                    : ''
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2">

                                <div className="col-md-12 mb-3">
                                    <BillingTiposBonificacionesModalTable 
                                        columns={columnsTipoConfiguracion} 
                                        data={
                                            (billings[numberScreen] !== undefined)
                                                ? billings[numberScreen].configuracionBonificacion
                                                : []
                                        } 
                                    />
                                </div>
                            </div>

                            <hr/>

                            <div className="row mb-2">
                                <h5>Lista de Articulos</h5>
                            </div>

                            <div className="row mb-2">

                                <div className="col-md-12 mb-3">
                                    <BillingProductosBonificacionesModalTable 
                                        columns={columnsProductos} 
                                        data={
                                            (billings[numberScreen] !== undefined)
                                                ? billings[numberScreen].productosBonificacion
                                                : []
                                        } 
                                    />
                                </div>
                            </div>


                        </div>
                        
                        <div className="modal-footer">
                            <button
                                type='button'
                                className='btn btn-success'
                                onClick={handleSaveCorreos}
                                data-bs-dismiss="modal"
                            >
                                Bonificar <FaFloppyDisk className="iconSize" />
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Cerrar <IoIosCloseCircle className="iconSize" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}