import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';

import {
    CleanClienteMAGBilling,
    CloseModalMAGCustomer
} from '../../actions/billing';
import { SiHappycow } from 'react-icons/si';
import { FaCalendar, FaUser } from 'react-icons/fa';
import { IoIosCloseCircle, IoMdOptions } from 'react-icons/io';
import { TbEditCircle, TbNotes } from 'react-icons/tb';

Modal.setAppElement('#root');

export const BillingMAGCustomerModal = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { billings } = useSelector(state => state.billing);


    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const closeModal = () => {
        dispatch(CloseModalMAGCustomer({ number: numberScreen }));
        dispatch(CleanClienteMAGBilling({ number: numberScreen }));
    }

    return (

        <>

            <div className="modal fade" id="modalConsultaMAG">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Consulta Registro MAG <SiHappycow className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-md-12 mb-3">
                                    <h5>Nombre del Cliente</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del Cliente"
                                            name='nombre'
                                            disabled={true}
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].ClienteMAG.nombre
                                                    : ''
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Estado</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <IoMdOptions className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            type='text'
                                            name='estadoModalMAGCustomer'
                                            disabled={true}
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].ClienteMAG.estado
                                                    : ''
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Fecha Baja</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            name='fechaModalMAGCustomer'
                                            class="form-control"
                                            disabled={true}
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].ClienteMAG.fechabaja[0]
                                                    : ''
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <br />
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkActivoMAG"
                                            name="activaMag"
                                            class="form-check-input checkP"
                                            checked={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].ClienteMAG.activaMag
                                                    : false
                                            }
                                        />
                                        <h5 className="form-check-label textRed" for="checkActivoMAG">Indicador Activo MAG</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <h5>Observaciones</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <textarea
                                            class="form-control"
                                            name='MAGCustomerModal'
                                            cols="3"
                                            rows="5"
                                        ></textarea>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type='button'
                                className='btn btn-warning' disabled={true} >
                                Editar <TbEditCircle className="iconSize" />
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
