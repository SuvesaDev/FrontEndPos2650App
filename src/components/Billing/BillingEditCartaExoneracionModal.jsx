import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPercentage, FaSearch } from 'react-icons/fa';
import { CartaExoneracion } from '../../models/cartaExoneracion';
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoDocumentText } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";

import {
    CloseModalEditCartaExoneracion,
    startSaveCartaExoneracion,
    startEditCartaExoneracion,
    SetFechaEmisionCartaBilling,
    SetFechaVenceCartaBilling,
    SetImpuestoCartaBilling,
    SetidTipoExoneracionCartaBilling,
    SetNotaCartaBilling,
    SetNumeroDocumentoCartaBilling,
    SetPorcentajeCompraCartaBilling,
    SetActualizoCarta,
    startSearchExoneracionHaciendaBilling
} from '../../actions/billing';
import { FaCalendar, FaFileCircleQuestion, FaFloppyDisk} from 'react-icons/fa6';
import { TbNotes } from 'react-icons/tb';
import { IoIosCloseCircle } from 'react-icons/io';


export const BillingEditCartaExoneracionModal = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { auth } = useSelector(state => state.login);
    const { currentTab } = useSelector(state => state.tabs);
    const { tiposExoneracion } = useSelector(state => state.tiposExoneracion);

    const { billings } = useSelector(state => state.billing);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const closeModal = () => {
        if (billings[numberScreen] === undefined) return;
        dispatch(CloseModalEditCartaExoneracion({ number: numberScreen }));
    }

    const handleExoneracionChange = ({ target }) => {
        if (billings[numberScreen] === undefined) return;
        if (target.value <= 13) {
            dispatch(SetPorcentajeCompraCartaBilling({ value: target.value, number: numberScreen }))
            dispatch(SetImpuestoCartaBilling({ value: 13 - target.value, number: numberScreen }));
        }
    };

    const handleInputChangeWithDispatch = ({ target }, action) => {
        if (billings[numberScreen] === undefined) return;
        dispatch(action({ value: target.value, number: numberScreen }));
    };

    const handleclickbtnCartaExoneracion = () => {

        if (billings[numberScreen] === undefined) return;

        let carta = new CartaExoneracion(
            (billings[numberScreen].HasCartaExoneracionBilling === false) ? 0 : billings[numberScreen].cartaBilling.id,
            (billings[numberScreen].HasCartaExoneracionBilling === false) ? billings[numberScreen].factura.encabezado.cedula_Usuario : billings[numberScreen].cartaBilling.cedula,
            billings[numberScreen].cartaBilling.motivo,
            billings[numberScreen].cartaBilling.numeroDocumento,
            billings[numberScreen].cartaBilling.fechaEmision,
            billings[numberScreen].cartaBilling.fechaVence,
            billings[numberScreen].cartaBilling.porcentajeCompra,
            billings[numberScreen].cartaBilling.impuesto,
            billings[numberScreen].cartaBilling.nota,
            auth.username,
            auth.username,
        );

        if (billings[numberScreen].HasCartaExoneracionBilling == true) {

            // Editar Carta
            dispatch(startEditCartaExoneracion(carta, numberScreen));

        } else {

            // Guardar Carta
            dispatch(startSaveCartaExoneracion(carta, numberScreen));

        }
    }

    const handleSearchExoneracion = (e) => {
        if (billings[numberScreen] === undefined) return;
        dispatch(startSearchExoneracionHaciendaBilling(billings[numberScreen].numeroDocumento, numberScreen));
    }

    return (
        <>
            <div className="modal fade" id="modalCartaExoneracion">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Actualizar Carta de Exoneracion <SlEnvolopeLetter className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3">
                                    <h5>Motivo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaFileCircleQuestion className="iconSize" />
                                        </span>
                                        <select
                                            name='motivo'
                                            className='form-select'
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].cartaBilling.motivo
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetidTipoExoneracionCartaBilling)}
                                        >
                                            {
                                                (tiposExoneracion !== null)
                                                    ? tiposExoneracion.map(tipo => {
                                                        return <option value={tipo.idTipoExoneracion}> {tipo.detalle} </option>
                                                    })
                                                    : <option value=''>No se cargaron los motivos</option>
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Documento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <IoDocumentText className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Número de Documento'
                                            name='numeroDocumento'
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].cartaBilling.numeroDocumento
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetNumeroDocumentoCartaBilling)}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={handleSearchExoneracion}
                                        >
                                            <FaSearch className="iconSize" />
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Fecha Emision</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            name="fechaEmision"
                                            className="form-control"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].cartaBilling.fechaEmision
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetFechaEmisionCartaBilling)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Fecha Vence</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="fechaVence"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].cartaBilling.fechaVence
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetFechaVenceCartaBilling)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <center>
                                    <div className="col-md-7 mb-3">
                                        <h5>Exoneracion</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaPercentage className="iconSize" />
                                            </span>
                                            <input
                                                type='text'
                                                name='porcentajeCompra'
                                                className="form-control"
                                                placeholder="Porcentaje de Exoneración"
                                                value={
                                                    (billings[numberScreen] !== undefined)
                                                        ? billings[numberScreen].cartaBilling.porcentajeCompra
                                                        : ''
                                                }
                                                onChange={e => handleExoneracionChange(e)}
                                            />

                                            <input
                                                type="text"
                                                name="impuesto"
                                                className="form-control"
                                                placeholder="Impuesto Venta"
                                                disabled={true}
                                                value={
                                                    (billings[numberScreen] !== undefined)
                                                        ? billings[numberScreen].cartaBilling.impuesto
                                                        : ''
                                                }
                                            />
                                        </div>
                                    </div>
                                </center>

                                <div className="col-md-12 mb-3">
                                    <h5>Descripcion</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            name="nota"
                                            className="form-control"
                                            placeholder="Breve Descripcion de para que Productos debe Aplicar"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].cartaBilling.nota
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetNotaCartaBilling)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type='button'
                                className={
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].HasCartaExoneracionBilling)
                                            ? 'btn btn-warning'
                                            : 'btn btn-success'
                                        : 'btn btn-dark success'
                                }
                                onClick={handleclickbtnCartaExoneracion}
                                data-bs-dismiss="modal"
                            >
                                {
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].HasCartaExoneracionBilling) ? (
                                            <>
                                                Actualizar <RxUpdate className="iconSize" />
                                            </>
                                        ) : (
                                            <>
                                                Registrar <FaFloppyDisk className="iconSize" />
                                            </>
                                        ) : (
                                            <>
                                                Registrar <FaFloppyDisk className="iconSize" />
                                            </>
                                        )
                                }
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