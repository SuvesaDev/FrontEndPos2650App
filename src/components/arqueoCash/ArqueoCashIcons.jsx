import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { FaWindowClose } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiKeyFill } from "react-icons/pi";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { ArqueoCajaSeleccionarUsuario } from './ArqueoCashSeleccionarUsuario';

import { DeleteTab } from '../../actions/tabs';
import { 
    CleanArqueoCash, 
    SetClaveInternaArqueoCash, 
    SetOpenSearchArqueoCashModalArqueoCash, 
    SetStartOpeningArqueoCash, 
    SetTipoCambioDArqueoCash, 
    SetVisiblePasswordArqueoCash, 
    startDisableArqueoCash, 
    startEditArqueoCash, 
    startSaveArqueoCash, 
    startSearchUsuariosArqueoCash,
    startValidateClaveInternaArqueoCash
} from '../../actions/arqueocashAction';

import { ArqueoCashSearchArqueoCashModal } from './ArqueoCashSearchArqueoCashModal';
import { ArqueoCashDetalleOperacionesPDFModal } from './ArqueoCashDetalleOperacionesPDFModal';
import { ArqueoCashAddPreDepositoModal } from './ArqueoCashAddPreDepositoModal';
import { ArqueoCashSeletedAperturaModal } from './ArqueoCashSeletedAperturaModal';

import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbEditCircle } from 'react-icons/tb';

export const ArqueoCashIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector(state => state.tabs);
    const { dollar } = useSelector(state => state.sidebar);

    const {
        activeButtonNew,
        activeButtonSave,
        activeButtonSearch,
        activeButtonRemove,
        startOpening,
        arqueo,
        isEditArqueoCash,
        claveInterna,
        disableInputsUser,
        visiblePassword
    } = useSelector(state => state.ArqueCash);

    const { encabezado, efectivo, tarjeta } = arqueo;

    const {
        Id,
        EfectivoColones,
        EfectivoDolares,
        TarjetaColones,
        TarjetaDolares,
        Cheques,
        ChequesDol,
        DepositoCol,
        DepositoDol,
        Total,
        IdApertura,
        Cajero,
        TipoCambioD,
        Observaciones,
        Anulado,
        TarjetaSistema    
    } = encabezado;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleOnKeyDownUser = async (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (claveInterna == '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba su contraseña.'
                });

                return;
            }

            dispatch(startValidateClaveInternaArqueoCash(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordArqueoCash(!visiblePassword));
        }
    }

    const handleCreate = async (e) => {

        if (activeButtonNew) {
            e.preventDefault();

            dispatch(startSearchUsuariosArqueoCash());
            dispatch(SetTipoCambioDArqueoCash(dollar));
        }

    }

    const handleSearch = (e) => {

        if (activeButtonSearch) {

            e.preventDefault();
            dispatch(SetStartOpeningArqueoCash(false));
            dispatch(SetOpenSearchArqueoCashModalArqueoCash(true));

        }

    }

    const handleSaveArqueoCash = async (e) => {

        if( !activeButtonSave ) {
            return;
        }

        e.preventDefault();

        const newArqueo = {
            id: 0,
            efectivoColones: parseFloat(EfectivoColones),
            efectivoDolares: parseFloat(EfectivoDolares),
            tarjetaColones: parseFloat(TarjetaColones),
            tarjetaDolares: parseFloat(TarjetaDolares),
            cheques: parseFloat(Cheques),
            chequesDol: parseFloat(ChequesDol),
            depositoCol: parseFloat(DepositoCol),
            depositoDol: parseFloat(DepositoDol),
            total: parseFloat(Total),
            idApertura: IdApertura,
            fecha: new Date().toLocaleDateString("es-CR"), 
            cajero: Cajero,
            anulado: false,
            tipoCambioD: TipoCambioD,
            observaciones: Observaciones,
            tarjetaSistema: 0,
            otrasTarjetas: 0,
            efectivos: efectivo.map(row => {
                return {
                    id: 0,
                    idArqueo: 0,
                    idDenominacion: row.Id_Denominacion,
                    monto: parseFloat(row.Monto),
                    cantidad: parseFloat(row.Cantidad)
                }
            }),
            tarjeta: tarjeta.map(row => {
                return {
                    id: 0,
                    idArqueo: 0,
                    idTarjeta: row.IdTarjeta,
                    monto: parseFloat(row.Monto)
                }
            })                

        }    
        
        dispatch(startSaveArqueoCash(newArqueo));

    }

    const handleEditArqueoCash = async (e) => {

        if( !activeButtonSave ) {
            return;
        }

        e.preventDefault();
        
        const editArqueo = {
            id: Id,
            efectivoColones: parseFloat(EfectivoColones),
            efectivoDolares: parseFloat(EfectivoDolares),
            tarjetaColones: parseFloat(TarjetaColones),
            tarjetaDolares: parseFloat(TarjetaDolares),
            cheques: parseFloat(Cheques),
            chequesDol: parseFloat(ChequesDol),
            depositoCol: parseFloat(DepositoCol),
            depositoDol: parseFloat(DepositoDol),
            total: parseFloat(Total),
            idApertura: IdApertura,
            fecha: new Date().toLocaleDateString("es-CR"), 
            cajero: Cajero,
            anulado: false,
            tipoCambioD: TipoCambioD,
            observaciones: Observaciones,
            tarjetaSistema: TarjetaSistema,
            otrasTarjetas: 0,
            efectivos: efectivo.map(row => {
                return {
                    id: row.Id,
                    idArqueo: row.Id_Arqueo,
                    idDenominacion: row.Id_Denominacion,
                    monto: parseFloat(row.Monto),
                    cantidad: parseFloat(row.Cantidad)
                }
            }),
            tarjeta: tarjeta.map(row => {
                return {
                    id: row.Id,
                    idArqueo: row.IdArqueo,
                    idTarjeta: row.IdTarjeta,
                    monto: parseFloat(row.Monto)
                }
            })                

        }    
        
        dispatch( startEditArqueoCash( editArqueo ) );

    }
    

    const handleDisableArqueoCash = (e) => {

        e.preventDefault();

        if (activeButtonRemove && !Anulado) {
            dispatch(startDisableArqueoCash(Id));
        }

    }


    const handleCloseWindow = (e) => {

        if (startOpening || isEditArqueoCash) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar el arqueo de caja?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {
                    e.preventDefault();

                    dispatch(CleanArqueoCash());
                }

            });


        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(CleanArqueoCash());
        }

    }

    return (

        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSave
                            ? (isEditArqueoCash ? "btn btn-warning espacio" : "btn btn-success espacio")
                            : "btn btn-success espacio disabled"
                        }
                        onClick={(isEditArqueoCash) ? handleEditArqueoCash : handleSaveArqueoCash}
                    >
                        {(isEditArqueoCash) ? (
                            <>
                                Editar <TbEditCircle className="iconSizeBtn" />

                            </>
                        ) : (
                            <>
                                Registrar <MdNoteAdd className="iconSizeBtn" />
                            </>
                        )}

                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSave
                                ? "btn btn-primary espacio"
                                : "btn btn-primary espacio disabled"
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#modalCajaArqueo"
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonRemove
                                ? "btn btn-danger espacio"
                                : "btn btn-danger espacio disabled"
                        }
                        onClick={handleDisableArqueoCash}
                    >
                        Anular <RiDeleteBin2Fill className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindow}
                    >
                        {(startOpening || isEditArqueoCash) ? "Cancelar" : "Cerrar"} {""}
                        <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>


                <div className="col-md-2 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={(visiblePassword) ? 'text' : 'password'}
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaArqueoCash)}
                        />
                        <span
                            className="input-group-text"
                            onClick={
                                handleVisibleClave
                            }
                            style={{ cursor: "pointer" }}
                        >

                            {
                                (visiblePassword)
                                    ? <FaEyeSlash
                                    />
                                    : <FaEye
                                    />
                            }
                        </span>
                    </div>
                </div>
            </div>


            <ArqueoCajaSeleccionarUsuario />

            <ArqueoCashSearchArqueoCashModal />

            <ArqueoCashDetalleOperacionesPDFModal />

            <ArqueoCashAddPreDepositoModal />

            <ArqueoCashSeletedAperturaModal />
        </>
    )
}
