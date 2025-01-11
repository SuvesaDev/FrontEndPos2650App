import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    SetChequesArqueoCash,
    SetChequesDolArqueoCash,
    SetDepositoColArqueoCash,
    SetDepositoDolArqueoCash,
    SetEfectivoColonesArqueoCash,
    SetEfectivoDolaresArqueoCash,
    SetTarjetaColonesArqueoCash,
    SetTarjetaDolaresArqueoCash,
    SetTotalArqueoCash,
    startEditArqueoCash
} from '../../actions/arqueocashAction';
import { FaCashRegister, FaColonSign } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa';

export const ArqueoCashBodyTotales = () => {

    const dispatch = useDispatch();

    const { arqueo, isEditArqueoCash, disableInputs } = useSelector(state => state.ArqueCash);
    const { encabezado, efectivo, tarjeta, Anulado } = arqueo

    const {
        EfectivoColones,
        EfectivoDolares,
        TarjetaColones,
        TarjetaDolares,
        Cheques,
        ChequesDol,
        DepositoCol,
        DepositoDol,
        Total,
        TipoCambioD
    } = encabezado

    useEffect(async () => {

        //Calcula los totales de efectivo en colones y dolares
        let EfectivoColon = 0;
        let EfectivoDolar = 0;

        efectivo.forEach(linea => {

            if (linea.CodMoneda === 1) { //CodMoneda = 1 = COLONES
                EfectivoColon = parseFloat(EfectivoColon + linea.Total);
            }

            if (linea.CodMoneda === 2) { //CodMoneda = 1 = DOLARES
                EfectivoDolar = parseFloat(EfectivoDolar + linea.Total);
            }
        });

        dispatch(SetEfectivoColonesArqueoCash(parseFloat(EfectivoColon)));

        dispatch(SetEfectivoDolaresArqueoCash(parseFloat(EfectivoDolar)));

    }, [efectivo]);

    useEffect(async () => {

        //Calcula los totales de tarjeta en colones y dolares
        let TarjetaColon = 0;
        let TarjetaDolar = 0;

        tarjeta.forEach(linea => {

            if (linea.CodMoneda === 1) { //CodMoneda = 1 = COLONES
                TarjetaColon = TarjetaColon + linea.Monto;
            }

            if (linea.CodMoneda === 2) { //CodMoneda = 1 = DOLARES
                TarjetaDolar = TarjetaDolar + linea.Monto;
            }
        });

        dispatch(SetTarjetaColonesArqueoCash(parseFloat(TarjetaColon)));

        dispatch(SetTarjetaDolaresArqueoCash(parseFloat(TarjetaDolar)));
    }, [tarjeta]);

    useEffect(async () => {

        //Calcula el total del arqueo
        let Colones = 0;
        let Dolares = 0;
        let Total = 0;

        Colones = parseFloat(EfectivoColones) + parseFloat(TarjetaColones + parseFloat(Cheques) + parseFloat(DepositoCol));
        Dolares = parseFloat(EfectivoDolares) + parseFloat(TarjetaDolares + parseFloat(ChequesDol) + parseFloat(DepositoDol));
        Total = Colones + (Dolares * TipoCambioD);

        dispatch(SetTotalArqueoCash(parseFloat(Total)));

    }, [
        EfectivoColones,
        EfectivoDolares,
        TarjetaColones,
        TarjetaDolares,
        Cheques,
        ChequesDol,
        DepositoCol,
        DepositoDol
    ]);

    const handleChangeChequeCol = ({ target }) => {
        dispatch(SetChequesArqueoCash(target.value));
    }

    const handleChangeChequeDol = ({ target }) => {
        dispatch(SetChequesDolArqueoCash(target.value));
    }

    const handleChangeDepositoCol = ({ target }) => {
        dispatch(SetDepositoColArqueoCash(target.value));
    }

    const handleChangeDepositoDol = ({ target }) => {
        dispatch(SetDepositoDolArqueoCash(target.value));
    }

    // const handleEnterChequeDepositos = ( e ) => {

    //     if (e.key !== 'Enter') return;
        
    //     const { 
    //         Id,
    //         Cheques,
    //         ChequesDol,
    //         DepositoCol,
    //         DepositoDol
    //     } = encabezado;
        
    //     if( Id !== undefined ) {

    //         if( isEditArqueoCash ) {

    //             const newData = {
    //                 id: Id,
    //                 cheques: Cheques,
    //                 chequesDol: ChequesDol,
    //                 depositoCol: DepositoCol,
    //                 depositoDol: DepositoDol
    //             }
    //             // Type 3: Cheques y despositos edit
    //             dispatch( startEditArqueoCash( newData, 3 ) );

    //         } 
    //     }
    // }

    // const handleLostFocusChequeDepositos = ( e ) => {

    //     const { 
    //         Id,
    //         Cheques,
    //         ChequesDol,
    //         DepositoCol,
    //         DepositoDol
    //     } = encabezado;
        
    //     if( Id !== undefined ) {

    //         if( isEditArqueoCash ) {

    //             const newData = {
    //                 id: Id,
    //                 cheques: Cheques,
    //                 chequesDol: ChequesDol,
    //                 depositoCol: DepositoCol,
    //                 depositoDol: DepositoDol
    //             }
    //             // Type 3: Cheques y despositos edit
    //             dispatch( startEditArqueoCash( newData, 3 ) );

    //         } 
    //     }
    // }

    return (
        <>

            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <h3>Total General</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-6 mb-2">
                            <div className="col-md-12 mb-2">
                                <h5>Colones</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaColonSign className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(EfectivoColones)
                                        }
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-2">
                                <h5>Tarjeta Colones</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaColonSign className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(TarjetaColones)
                                        }
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-2">
                                <h5>Cheques Colones</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaColonSign className="iconSize" />
                                    </span>
                                    <input
                                        className="form-control"
                                        type='number'
                                        min="0"
                                        onKeyDown={(e) => handleEnterChequeDepositos(e)}
                                        onBlur={(e) => handleLostFocusChequeDepositos(e)}
                                        disabled={(disableInputs) ? disableInputs : isEditArqueoCash}
                                        value={Cheques}
                                        onChange={e => handleChangeChequeCol(e)}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-2">
                                <h5>Depositos Colones</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaColonSign className="iconSize" />
                                    </span>
                                    <input
                                        className="form-control"
                                        type='number'
                                        min="0"
                                        disabled={(disableInputs) ? disableInputs : isEditArqueoCash}
                                        onKeyDown={(e) => handleEnterChequeDepositos(e)}
                                        onBlur={(e) => handleLostFocusChequeDepositos(e)}
                                        value={DepositoCol}
                                        onChange={e => handleChangeDepositoCol(e)}
                                    />
                                </div>
                                <hr />
                            </div>


                        </div>

                        <div className="col-md-6 mb-2">
                            <div className="col-md-12 mb-2">
                                <h5>Dolares</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaDollarSign className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={
                                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(EfectivoDolares)
                                        }
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-2">
                                <h5>Tarjeta Dolares</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaDollarSign className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={
                                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(TarjetaDolares)
                                        }
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-2">
                                <h5>Cheques Dolares</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaDollarSign className="iconSize" />
                                    </span>
                                    <input
                                        className="form-control"
                                        type='number'
                                        min="0"
                                        disabled={(disableInputs) ? disableInputs : isEditArqueoCash}
                                        onKeyDown={(e) => handleEnterChequeDepositos(e)}
                                        onBlur={(e) => handleLostFocusChequeDepositos(e)}
                                        value={ChequesDol}
                                        onChange={e => handleChangeChequeDol(e)}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-2">
                                <h5>Depositos Dolares</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaDollarSign className="iconSize" />
                                    </span>
                                    <input
                                        className="form-control"
                                        type='number'
                                        min="0"
                                        disabled={(disableInputs) ? disableInputs : isEditArqueoCash}
                                        onKeyDown={(e) => handleEnterChequeDepositos(e)}
                                        onBlur={(e) => handleLostFocusChequeDepositos(e)}
                                        value={DepositoDol}
                                        onChange={e => handleChangeDepositoDol(e)}
                                    />
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-0 text-center" >
                        <div className="col-md-12 mb-2">
                            <h5>Total Sistema</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCashRegister className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    disabled={true}
                                    value={
                                        new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Total)
                                    }
                                />
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
