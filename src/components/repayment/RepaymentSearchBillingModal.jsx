import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { RepaymentSearchBillingModalTable } from './RepaymentSearchBillingModalTable';
import {
    CleanStateSearchBillingModalRepayment,
    SetCheckCajaSearchBillingModalRepayment,
    SetCheckFechasSearchBillingModalRepayment,
    SetCheckNombreClienteSearchBillingModalRepayment,
    SetCheckTipoSearchBillingModalRepayment,
    SetIsOpenSearchBillingModalRepayment,
    SetValueCajaSearchBillingModalRepayment,
    SetValueFechasSearchBillingModalRepayment,
    SetValueNombreClienteSearchBillingModalRepayment,
    SetValueTipoSearchBillingModalRepayment,
    startSearchBillingRepayment
} from '../../actions/repaymentAction';
import { FaCalendar, FaCashRegister, FaExchangeAlt, FaListOl, FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import { FaUser } from 'react-icons/fa6';


export const RepaymentSearchBillingModal = () => {

    const dispatch = useDispatch();

    const { allTiposFacturas } = useSelector(state => state.tiposFacturas);
    const {
        isOpenSearchBillingModal,
        optionsSearchBillingRepayment,
        searchBillingRepayment
    } = useSelector(state => state.repayment);

    const {
        Tipo,
        Caja,
        Nombre,
        Fechas,
        valueTipo,
        valueCaja,
        valueNombreCliente,
        valueFecha
    } = optionsSearchBillingRepayment;

    const columns = [
        {
            Header: "Número Factura",
            accessor: "numFactura",
        },
        {
            Header: "Nombre Cliente",
            accessor: "nombreCliente",
        },
        {
            Header: "Fecha",
            accessor: "fecha",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleCheckTipo = ({ target }) => {
        dispatch(SetCheckTipoSearchBillingModalRepayment(target.checked));
        dispatch(SetCheckCajaSearchBillingModalRepayment(false));
        dispatch(SetCheckNombreClienteSearchBillingModalRepayment(false));
        dispatch(SetCheckFechasSearchBillingModalRepayment(false));
    }

    const handleCheckCaja = ({ target }) => {
        dispatch(SetCheckTipoSearchBillingModalRepayment(false));
        dispatch(SetCheckCajaSearchBillingModalRepayment(target.checked));
        dispatch(SetCheckNombreClienteSearchBillingModalRepayment(false));
        dispatch(SetCheckFechasSearchBillingModalRepayment(false));
    }

    const handleCheckNombreCliente = ({ target }) => {
        dispatch(SetCheckTipoSearchBillingModalRepayment(false));
        dispatch(SetCheckCajaSearchBillingModalRepayment(false));
        dispatch(SetCheckNombreClienteSearchBillingModalRepayment(target.checked));
        dispatch(SetCheckFechasSearchBillingModalRepayment(false));
    }

    const handleCheckFechas = ({ target }) => {
        dispatch(SetCheckTipoSearchBillingModalRepayment(false));
        dispatch(SetCheckCajaSearchBillingModalRepayment(false));
        dispatch(SetCheckNombreClienteSearchBillingModalRepayment(false));
        dispatch(SetCheckFechasSearchBillingModalRepayment(target.checked));
    }

    const handleSearch = async (e) => {

        e.preventDefault();

        let filters = {
            tipo: null,
            caja: null,
            nombreCliente: null,
            fecha: null
        }

        if (Tipo === true && Caja === false && Nombre === false && Fechas === false) {

            if (valueTipo === 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar el Tipo Factura para realizar la busqueda.',
                });
                return;
            }

            filters = {
                ...filters,
                tipo: valueTipo
            }

        } else if (Tipo === false && Caja === true && Nombre === false && Fechas === false) {

            if (valueCaja === 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar el Número Caja para realizar la busqueda.',
                });
                return;
            }

            filters = {
                ...filters,
                caja: valueCaja
            }

        } else if (Tipo === false && Caja === false && Nombre === true && Fechas === false) {

            if (valueNombreCliente === '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar el Nombre Cliente para realizar la busqueda.',
                });
                return;
            }

            filters = {
                ...filters,
                nombreCliente: valueNombreCliente
            }

        } else if (Tipo === false && Caja === false && Nombre === false && Fechas === true) {

            if (valueFecha === '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar la fecha para realizar la busqueda.',
                });
                return;
            }

            filters = {
                ...filters,
                fecha: valueFecha
            }

        }

        dispatch(startSearchBillingRepayment(filters));

    }

    const closeModal = () => {

        // Cerrar el modal
        dispatch(SetIsOpenSearchBillingModalRepayment(false));

        // Limpiar el estado de busqueda
        dispatch(CleanStateSearchBillingModalRepayment());

    }

    return (
        <>
            <div className="modal fade" id="modalBuscarFactDevo">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Factura Devoluciones <FaExchangeAlt className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSearch}>
                                <div className="row mb-2">
                                    <div className="col-md-3 mb-3">
                                        <div className="form-check">
                                            <input
                                                class="form-check-input checkP"
                                                type='checkbox'
                                                id='checkTipoFacturaSearchBillingModalRepayment'
                                                checked={Tipo}
                                                onChange={e => handleCheckTipo(e)}
                                            />
                                            <h5 className="form-check-label" for="checkTipoFacturaSearchBillingModalRepayment">Tipo</h5>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaListOl className="iconSize" />
                                            </span>
                                            <select
                                                className='form-select'
                                                disabled={!Tipo}
                                                value={valueTipo}
                                                onChange={e => handleInputChangeWithDispatch(e, SetValueTipoSearchBillingModalRepayment)}
                                            >
                                                <option value={0} selected disabled hidden> Seleccione... </option>
                                                {

                                                    (allTiposFacturas != null)
                                                        ? (allTiposFacturas.length === 0)
                                                            ? <option value=''>No Tipos de Factura</option>
                                                            : allTiposFacturas.map(tipoF => {
                                                                return <option key={tipoF.codigo} value={tipoF.codigo}> {tipoF.descripcion} </option>
                                                            })
                                                        : <option value=''>No Tipos de Factura</option>

                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <div className="form-check">
                                            <input
                                                class="form-check-input checkP"
                                                type='checkbox'
                                                id='checkNumeroCajaSearchBillingModalRepayment'
                                                checked={Caja}
                                                onChange={e => handleCheckCaja(e)}
                                            />
                                            <h5 className="form-check-label" for="checkNumeroCajaSearchBillingModalRepayment">Caja</h5>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaCashRegister className="iconSize" />
                                            </span>
                                            <input
                                                type='number'
                                                min="0"
                                                className='form-control'
                                                disabled={!Caja}
                                                value={valueCaja}
                                                onChange={e => handleInputChangeWithDispatch(e, SetValueCajaSearchBillingModalRepayment)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <div className="form-check">
                                            <input
                                                class="form-check-input checkP"
                                                type='checkbox'
                                                id='checkNombreClienteSearchBillingModalRepayment'
                                                checked={Nombre}
                                                onChange={e => handleCheckNombreCliente(e)}
                                            />
                                            <h5 className="form-check-label" for="checkNombreClienteSearchBillingModalRepayment">Nombre Cliente</h5>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaUser className="iconSize" />
                                            </span>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Nombre del Cliente'
                                                disabled={!Nombre}
                                                value={valueNombreCliente}
                                                onChange={e => handleInputChangeWithDispatch(e, SetValueNombreClienteSearchBillingModalRepayment)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <div className="form-check">
                                            <input
                                                class="form-check-input checkP"
                                                type='checkbox'
                                                id='checkFechasSearchBillingModalRepayment'
                                                checked={Fechas}
                                                onChange={e => handleCheckFechas(e)}
                                            />
                                            <h5 className="form-check-label" for="checkFechasSearchBillingModalRepayment">Desde Fecha</h5>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaCalendar className="iconSize" />
                                            </span>
                                            <input
                                                type='date'
                                                disabled={!Fechas}
                                                value={valueFecha}
                                                className='form-control'
                                                onChange={e => handleInputChangeWithDispatch(e, SetValueFechasSearchBillingModalRepayment)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <button type='submit' className='btn btn-primary'>Buscar <FaSearch className='iconSize' /></button>
                                    </div>
                                </div>
                            </form>
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <RepaymentSearchBillingModalTable columns={columns} data={searchBillingRepayment} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
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
