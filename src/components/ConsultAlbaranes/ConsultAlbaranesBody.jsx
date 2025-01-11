import { useDispatch, useSelector } from "react-redux";

import { getEnvVariables } from "../../helpers";
import {
    SetAddAllAlbaranesFacturarConsultAlbaranes,
    SetEditLineaAlbaranConsultAlbaranes,
    SetMostrarTodosAlbaranesConsultAlbaranes,
    SetRemoveAllAlbaranesFacturarConsultAlbaranes,
    SetclienteConsultAlbaranes,
    Setfecha_desdeConsultAlbaranes,
    Setfecha_hastaConsultAlbaranes,
    SetmascotaConsultAlbaranes,
    checkExtranjeroTodosConsultAlbaranes,
    checkMarcaTodosConsultAlbaranes,
    startGetAlbaranes,
    startSearchAlbaranesConsultAlbaranes
} from "../../actions/consultAlbaranesAction";

import { ConsultAlbaranesBodyTable } from "./ConsultAlbaranesBodyTable"
import { addTab } from "../../actions/tabs";
import { FaCalendar, FaDog, FaUser } from "react-icons/fa";
import { BsClipboard2DataFill } from "react-icons/bs";

export const ConsultAlbaranesBody = () => {

    const { VITE_URL_QVET, VITE_ID_QVET } = getEnvVariables();

    const dispatch = useDispatch();
    const {
        albaranes,
        albarnesTable,
        searchAlbaran,
        checkMarcaTodos,
        checkExtrajerosTodos,
        disableInputs,
        aumentoExtranjero
    } = useSelector(state => state.consultAlbaranes);
    const { surcursales, auth } = useSelector(state => state.login);
    const { centro } = auth;

    const {
        cliente,
        mascota,
        fecha_desde,
        fecha_hasta
    } = searchAlbaran;

    const columns = [
        {
            Header: "Cliente",
            accessor: "cliente",
        },
        {
            Header: "Mascota",
            accessor: "mascota",
        },
        {
            Header: "Fecha",
            accessor: "fecha",
        },
        {
            Header: "Subtotal",
            accessor: "subtotal",
        },
        {
            Header: "Descuento",
            accessor: "descuento",
        },
        {
            Header: "Impuesto",
            accessor: "impuesto",
        },
        {
            Header: "Total",
            accessor: "total",
        },
        {
            Header: "Responsable",
            accessor: "responsable",
        },
        {
            Header: "Facturar",
            accessor: "facturar",
        },
        {
            Header: "Extranjero",
            accessor: "extranjero",
        },
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleClickObtenerDatos = (e) => {

        e.preventDefault();
        console.log(surcursales)
        console.log(centro)
        const idSucursal = surcursales.find(surcursal => surcursal.alias === centro).id;

        dispatch(startGetAlbaranes(VITE_URL_QVET, VITE_ID_QVET, idSucursal));

    }

    const handleCheckMarcarTodos = ({ target }) => {

        // Se pone el check en las filas
        dispatch(checkMarcaTodosConsultAlbaranes(target.checked));

        if (target.checked) {
            // Se agregan todos los albaranes a facturar
            dispatch(SetAddAllAlbaranesFacturarConsultAlbaranes(albarnesTable));
        } else {
            dispatch(SetRemoveAllAlbaranesFacturarConsultAlbaranes())
        }

    };

    const handleCheckExtranjeroTodos = ({ target }) => {

        // Aumentar el porcentaje de extranjero de las filas seleccionadas
        if (aumentoExtranjero === 0) {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'No se cargo el porcentaje de aumento de extranjero'
            });

            return;
        }

        if (albarnesTable.length === 0) {
            return;
        }

        if (checkExtrajerosTodos === false) {

            // Aumentar
            let index = 0;
            let montoAumento = 0;

            albarnesTable.forEach(linea => {

                if (linea.subtotal === linea.subtotalOriginal) {
                    montoAumento = linea.subtotal * (aumentoExtranjero / 100);
                    linea.subtotal = linea.subtotal + montoAumento;
                    linea.total = linea.subtotal + linea.impuesto;

                    dispatch(SetEditLineaAlbaranConsultAlbaranes(linea, index));
                }

                index = index + 1;
            });


        } else if (checkExtrajerosTodos === true) {

            // Disminuir
            let index = 0;
            let montoAumento = 0;

            albarnesTable.forEach(linea => {

                montoAumento = linea.subtotalOriginal * (aumentoExtranjero / 100);
                linea.subtotal = linea.subtotal - montoAumento;
                linea.total = linea.subtotal + linea.impuesto;

                dispatch(SetEditLineaAlbaranConsultAlbaranes(linea, index));

                index = index + 1;
            });
        }

        // Se pone el check en las filas
        dispatch(checkExtranjeroTodosConsultAlbaranes(target.checked));

    };

    const handleSearchAlbaranes = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            // Se valida que al menos un filtro de busqueda este lleno
            if (cliente === '' && mascota === '' && fecha_desde === '' && fecha_hasta === '') return;

            const filtros = {
                cliente,
                mascota,
                fecha_desde,
                fecha_hasta
            }

            dispatch(startSearchAlbaranesConsultAlbaranes(albarnesTable, filtros));

        }
    }

    const handleSearchDatesAlbaranes = (e) => {

        e.preventDefault();

        // Se valida que al menos un filtro de busqueda este lleno
        if (fecha_desde === '' && fecha_hasta === '') return;

        const filtros = {
            cliente,
            mascota,
            fecha_desde,
            fecha_hasta
        }

        dispatch(startSearchAlbaranesConsultAlbaranes(albarnesTable, filtros));
    }

    const handleMostrarTodosAlbaranes = (e) => {
        e.preventDefault();

        dispatch(SetMostrarTodosAlbaranesConsultAlbaranes());
    }

    const handleClickOpcionesPago = (e) => {

        const newTab = {
            title: 'Cobrar',
            path: '/initial/charge'
        };

        dispatch(addTab(newTab.title, newTab.path));
    }

    const handleClickDevoluciones = (e) => {

        const newTab = {
            title: 'Devoluciones',
            path: '/initial/repayment'
        }

        dispatch(addTab(newTab.title, newTab.path));
    }

    const handleClickAperturaCaja = (e) => {

        const newTab = {
            title: 'Apertura Caja',
            path: '/initial/cash/opencash'
        }

        dispatch(addTab(newTab.title, newTab.path));
    }

    const handleClickArqueoCaja = (e) => {

        const newTab = {
            title: 'Arqueo Caja',
            path: '/initial/cash/arqueocash'
        }

        dispatch(addTab(newTab.title, newTab.path));
    }

    return (

        <>
            <div className="row mb-2 text-center">
                <div className="col-md-12 mb-2">
                    <div className="inline-containerBtns">
                        <button type="button" className="btn btn-primary" onClick={handleClickOpcionesPago}>Opciones de Pago</button>

                        <button type="button" className="btn btn-primary">Anticipios Clientes</button>

                        <button type="button" className="btn btn-primary">Depositos</button>

                        <button type="button" className="btn btn-primary">Abonos CxC</button>

                        <button type="button" className="btn btn-primary">Cuentas Albaran</button>

                        <button type="button" className="btn btn-primary" onClick={handleClickDevoluciones}>Devoluciones</button>

                        <button type="button" className="btn btn-primary" onClick={handleClickAperturaCaja}>Apertura Caja</button>

                        <button type="button" className="btn btn-primary" onClick={handleClickArqueoCaja}>Arqueo Caja</button>

                    </div >
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Cliente</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="cliente"
                            disabled={disableInputs}
                            value={cliente}
                            onChange={e => handleInputChangeWithDispatch(e, SetclienteConsultAlbaranes)}
                            onKeyDown={e => handleSearchAlbaranes(e)}
                            className="form-control"
                            placeholder="Nombre del Cliente"
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Mascota</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaDog className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="mascota"
                            disabled={disableInputs}
                            value={mascota}
                            onChange={e => handleInputChangeWithDispatch(e, SetmascotaConsultAlbaranes)}
                            onKeyDown={e => handleSearchAlbaranes(e)}
                            className="form-control"
                            placeholder="Nombre de la Mascota"
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <hr />
                    <button className={(disableInputs) ? 'btn btn-dark disabled' : 'btn btn-dark'}
                        disabled={disableInputs}
                        onClick={handleClickObtenerDatos}>Obtener Datos <BsClipboard2DataFill className="iconSize" /></button>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Desde</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            name="fecha_desde"
                            className="form-control"
                            disabled={disableInputs}
                            value={fecha_desde}
                            onChange={e => handleInputChangeWithDispatch(e, Setfecha_desdeConsultAlbaranes)}
                            onKeyDown={e => handleSearchAlbaranes(e)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Hasta</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            name="fecha_hasta"
                            className="form-control"
                            type="date"
                            disabled={disableInputs}
                            value={fecha_hasta}
                            onChange={e => handleInputChangeWithDispatch(e, Setfecha_hastaConsultAlbaranes)}
                            onKeyDown={e => handleSearchAlbaranes(e)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="checkSoloMostrarCA"
                            disabled={disableInputs}
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="checkSoloMostrarCA">Solo Mostrar Albaranes Pendientes de Facturar</h5>
                    </div>
                    <hr />
                    <div className="inline-container">

                    </div>
                    <button
                        className={(disableInputs) ? 'btn btn-dark disabled espacio' : 'btn btn-dark espacio'}
                        disabled={disableInputs}
                        onClick={handleSearchDatesAlbaranes}
                    >
                        Buscar Fechas
                    </button>

                    <button
                        className={(disableInputs) ? 'btn btn-dark disabled' : 'btn btn-dark '}
                        disabled={disableInputs}
                        onClick={handleMostrarTodosAlbaranes}
                    >
                        Mostrar todos
                    </button>
                </div>
                <div className="col-md-2 mb-3">
                    <div className="inline-container">
                        <div className="form-check">
                            <input
                                class="form-check-input checkP"
                                type="checkbox"
                                id="checkMarcarTodosCA"
                                name="checkMarcaTodos"
                                disabled={disableInputs}
                                checked={checkMarcaTodos}
                                onChange={e => handleCheckMarcarTodos(e)}
                            />
                            <h5 className="form-check-label" for="checkMarcarTodosCA">Marcar Todos</h5>
                            <hr />
                        </div>

                        <div className="form-check">
                            <input
                                class="form-check-input checkP"
                                type="checkbox"
                                id="checkExtranjeroTodosCA"
                                name="checkExtrajerosTodos"
                                disabled={disableInputs}
                                checked={checkExtrajerosTodos}
                                onChange={e => handleCheckExtranjeroTodos(e)}
                            />
                            <h5 className="form-check-label" for="checkExtranjeroTodosCA">Extranjero</h5>
                            <hr />
                        </div>

                    </div>
                </div>
            </div>

            <div className="row text-center">
                <div className="col-md-12 mb-2">
                    <ConsultAlbaranesBodyTable columns={columns} data={albarnesTable} />
                </div>
            </div>
        </>

    )
}
