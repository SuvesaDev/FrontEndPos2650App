

import { FaBoxesPacking, FaBuildingUn, FaColonSign, FaListCheck, FaListOl } from 'react-icons/fa6';
import { FaCalendar, FaCoins, FaExchangeAlt, FaHashtag, FaHornbill, FaPercentage } from 'react-icons/fa';
import { TbNumber } from 'react-icons/tb';
import { BsSortNumericDownAlt } from 'react-icons/bs';

export const BillsBodyHeader = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Encabezado</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <h5>Proveedor</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBuildingUn className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            placeholder="Nombre del Proveedor"
                                            type='text'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Tipo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaListOl className="iconSize" />
                                        </span>
                                        <select name='cboTipoFacturaPR' className='form-select'>
                                            <option value='1'>Factura</option>
                                            <option value='2'>Nota de crédito</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Número Factura</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNumber className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            placeholder="Número de Factura"
                                            type='text'
                                            name='NumeroFactura'

                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Tipo Moneda</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCoins className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                        >
                                            <option value='COLON'>COLON</option>
                                            <option value='DOLAR'>DOLAR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
