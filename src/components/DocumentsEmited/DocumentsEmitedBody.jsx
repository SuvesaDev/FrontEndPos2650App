import React from 'react'
import { FaCalendar, FaFile, FaHashtag, FaSearch, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { DocumentsEmitedBodyTable } from './DocumentsEmitedBodyTable';
import { CustomerSearchModal } from '../customers/CustomerSearchModal';
import { OpenSearchModalCustomers } from '../../actions/customers';
import {
    openSearchCustomerModalDocumentsEmited,
    setCedulaCustomerDocumentsEmited,
    setcheckCustomerDocumentsEmited,
    setcheckDatesDocumentsEmited,
    setdisableInputsCustomerDocumentsEmited,
    setdisableInputsDatesDesdeDocumentsEmited,
    setdisableInputsDatesHastaDocumentsEmited,
    setdisableInputsDocumentoDocumentsEmited,
    setdisableInputsMontoDocumentsEmited,
    setDocumentoSearchDocumentsEmited,
    setFechaDesdeSearchDocumentsEmited,
    setFechaHastaSearchDocumentsEmited,
    setMontoSearchDocumentsEmited,
    startSearchCustomerDocumentsEmited,
    startSearchFacturasDocumentsEmited
} from '../../actions/documentsEmitedAction';
import { FaColonSign, FaIdCard, FaMagnifyingGlass } from 'react-icons/fa6';

export const DocumentsEmitedBody = () => {

    const dispatch = useDispatch();
    const {
        checkCustomer,
        checkDates,
        disableInputsCustomer,
        disableInputsDatesDesde,
        disableInputsDatesHasta,
        disableInputsMonto,
        disableInputsDocumento,
        customer,
        searchData,
        facturasDocumentsEmited
    } = useSelector(state => state.documentsEmited);

    const {
        cedula,
        nombre
    } = customer;

    const {
        codCliente,
        desde,
        hasta,
        monto,
        documento
    } = searchData;

    const columns = [
        {
            Header: "Factura",
            accessor: "numFactura",
        },
        {
            Header: "Tipo",
            accessor: "tipo",
        },
        {
            Header: "Nombre Cliente",
            accessor: "nombreCliente",
        },
        {
            Header: "Fecha",
            accessor: "fecha",
        },
        {
            Header: "Monto",
            accessor: "total",
        },
        {
            Header: "Estado",
            accessor: "estado",
        },
        {
            Header: "Mensaje Error",
            accessor: "mensajeError",
        }
    ];

    const handleClickOpenSearchCustomerModal = (e) => {
        e.preventDefault();
        dispatch(OpenSearchModalCustomers());
        dispatch(openSearchCustomerModalDocumentsEmited(true));
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleClickDownCedula = (e) => {
        if (e.key === 'Enter') {
            dispatch(startSearchCustomerDocumentsEmited(e.target.value))
        }
    };

    const handleClickSearchFacturas = (e) => {
        e.preventDefault();

        dispatch(startSearchFacturasDocumentsEmited(
            codCliente,
            desde,
            hasta,
            monto,
            documento
        )
        );
    }

    const handleClickRadioButtonCustomer = (e) => {

        dispatch(setcheckCustomerDocumentsEmited(true));
        dispatch(setcheckDatesDocumentsEmited(false));

        dispatch(setdisableInputsCustomerDocumentsEmited(false));
        dispatch(setdisableInputsDatesDesdeDocumentsEmited(false));
        dispatch(setdisableInputsDatesHastaDocumentsEmited(true));
        dispatch(setdisableInputsMontoDocumentsEmited(false));
        dispatch(setdisableInputsDocumentoDocumentsEmited(false));
    }

    const handleClickRadioButtonDates = (e) => {

        dispatch(setcheckCustomerDocumentsEmited(false));
        dispatch(setcheckDatesDocumentsEmited(true));

        dispatch(setdisableInputsCustomerDocumentsEmited(true));
        dispatch(setdisableInputsDatesDesdeDocumentsEmited(false));
        dispatch(setdisableInputsDatesHastaDocumentsEmited(false));
        dispatch(setdisableInputsMontoDocumentsEmited(true));
        dispatch(setdisableInputsDocumentoDocumentsEmited(true));
    }

    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="radio"
                            id="txtRadioButtonCedula"
                            name="checkCustomer"
                            class="form-check-input checkP"
                            checked={checkCustomer}
                            onChange={handleClickRadioButtonCustomer}
                        />
                        <h5 className="form-check-label" for="txtRadioButtonCedula">Cédula</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type='number'
                            className="form-control"
                            placeholder="Cédula del Cliente"
                            name='cedula'
                            value={cedula}
                            disabled={disableInputsCustomer}
                            onKeyDown={handleClickDownCedula}
                            onChange={e => handleInputChangeWithDispatch(e, setCedulaCustomerDocumentsEmited)}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleClickOpenSearchCustomerModal}
                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                    <hr />
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Nombre del Cliente"
                            disabled={true}
                            value={nombre}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            class="form-check-input checkP"
                            type="radio"
                            id="txtRadioButtonDates"
                            name="checkDates"
                            checked={checkDates}
                            onChange={handleClickRadioButtonDates}
                        />
                        <h5 className="form-check-label" for="txtRadioButtonDates">Periodo</h5>
                    </div>
                    <hr />

                    <div className='inline-container'>
                        <div className='espacio'>
                            <h5>Desde</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendar className="iconSize" />
                                </span>
                                <input
                                    type="date"
                                    name="fechaDesde"
                                    className='form-control'
                                    disabled={disableInputsDatesDesde}
                                    value={desde}
                                    onChange={e => handleInputChangeWithDispatch(e, setFechaDesdeSearchDocumentsEmited)}
                                />
                            </div>
                        </div>
                        <div className='espacio'>
                            <h5>Hasta</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendar className="iconSize" />
                                </span>
                                <input
                                    type="date"
                                    className='form-control'
                                    name="hasta"
                                    disabled={disableInputsDatesHasta}
                                    value={hasta}
                                    onChange={e => handleInputChangeWithDispatch(e, setFechaHastaSearchDocumentsEmited)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Monto</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaColonSign className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Monto"
                            name='monto'
                            disabled={disableInputsMonto}
                            value={monto}
                            onChange={e => handleInputChangeWithDispatch(e, setMontoSearchDocumentsEmited)}
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Documento</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaFile className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Documento Emitido"
                            name='documento'
                            disabled={disableInputsDocumento}
                            value={documento}
                            onChange={e => handleInputChangeWithDispatch(e, setDocumentoSearchDocumentsEmited)}
                        />
                    </div>
                </div>


                <div className="col-md-2 mb-3">
                    <hr />
                    <button
                        className='btn btn-primary'
                        onClick={handleClickSearchFacturas}
                    >
                        Buscar <FaMagnifyingGlass className='iconSize' />
                    </button>
                </div>

            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <DocumentsEmitedBodyTable columns={columns} data={facturasDocumentsEmited} />
                </div>

            </div>

            <CustomerSearchModal />

        </>

    )
}
