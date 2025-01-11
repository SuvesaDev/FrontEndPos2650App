import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BillingAddCorreosModalTable } from './BillingAddCorreosModalTable';
import { IoIosCloseCircle } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { TbEditCircle } from "react-icons/tb";
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
import { FaDeleteLeft, FaEnvelopeOpen, FaFloppyDisk } from 'react-icons/fa6';
import { FaEnvelope } from 'react-icons/fa';


export const BillingAddCorreosModal = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { billings } = useSelector(state => state.billing);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const columns = [
        {
            Header: "Correo Electronico",
            accessor: "correoComprobante",
        },
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

            <div className="modal fade" id="modalAgregaCorreos">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Correos Comprobantes <FaEnvelopeOpen className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2">
                                <div className="col-md-7 mb-3">
                                    <h5>Correo Electrónico</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaEnvelope className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            name='correoComprobanteActual'
                                            className="form-control"
                                            placeholder="Ingrese el Correo Electrónico"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].correoComprobanteActual
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetCorreoComprobanteActualBilling)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5 mb-3">
                                    <hr />
                                    <div className='inline-container'>
                                        <button
                                            type='button'
                                            className={
                                                (billings[numberScreen] !== undefined)
                                                    ? (billings[numberScreen].isCorreosComprobanteEdit)
                                                        ? 'btn btn-warning'
                                                        : 'btn btn-success'
                                                    : 'btn disabled'
                                            }
                                            onClick={
                                                (billings[numberScreen] !== undefined)
                                                    ? (billings[numberScreen].isCorreosComprobanteEdit) ? handleEditCorreo : handleAddCorreo
                                                    : () => { }
                                            }
                                        >

                                            {
                                                billings[numberScreen] !== undefined ? (
                                                    billings[numberScreen].isCorreosComprobanteEdit ? (
                                                        <>
                                                            Editar Correo <TbEditCircle className="iconSize" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            Agregar Correo <IoAddCircle className="iconSize" />
                                                        </>
                                                    )
                                                ) : (
                                                    <>
                                                        {""}
                                                    </>
                                                )
                                            }
                                        </button>

                                        <button type='button' className='btn btn-danger' onClick={handleCleanCorreos}>Limpiar Correos <FaDeleteLeft className="Iconsize" /></button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="row mb-2">
                                <div className="col-md-12 mb-3">
                                    <BillingAddCorreosModalTable columns={columns} data={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].correosComprobantes
                                            : []
                                    } />
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
                                Guardar <FaFloppyDisk className="iconSize" />
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