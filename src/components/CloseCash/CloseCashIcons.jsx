import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {
    CleanCloseCash,
    SetClaveInternaCloseCash,
    SetIsOpenModalSearchCloseCash,
    SetVisiblePasswordCloseCash,
    startDisableCloseCash,
    startSaveCloseCash,
    startValidateClaveInternaCloseCash
} from '../../actions/CloseCashAction';
import { CloseCashSeletedAperturaModal } from './CloseCashSeletedAperturaModal';
import { DeleteTab } from '../../actions/tabs';
import { CloseCashSearchModal } from './CloseCashSearchModal';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbTrashXFilled } from 'react-icons/tb';
import { PiKeyFill } from 'react-icons/pi';
import { FaEye, FaEyeSlash, FaUserCheck, FaWindowClose } from 'react-icons/fa';
import { CloseCashReporte } from './CloseCashReporte';


export const CloseCashIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector(state => state.tabs);

    const {
        claveInterna,
        userNameCloseCash,
        cedulaUserCloseCash,
        disableInputsUser,
        visiblePassword,
        activeButtonSave,
        activeButtonSearch,
        activeButtonRemove,
        fechaCierre,
        isStartCloseCash,
        cierreCaja,
        idCierre
    } = useSelector(state => state.closeCash);

    const {
        numApertura,
        codigoCajero,
        nombre,
        totalSistema,
        diferenciaCaja
    } = cierreCaja;

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

            // Obtener el nombre de usuario
            // const nameUser = usersActive.find( user => user.id === parseInt(id) ).nombre;

            dispatch(startValidateClaveInternaCloseCash(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordCloseCash(!visiblePassword));
        }
    }

    const handleCreateCloseCash = (e) => {

        if (activeButtonSave) {

            e.preventDefault();

            console.log(parseFloat(diferenciaCaja))

            //Validar la diferencia
            if (parseFloat(diferenciaCaja) > 1500 || parseFloat(diferenciaCaja) < -1500) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'El Diferencial Caja es mayor de la cantidad permitida. Favor validar el dato.'
                });

                return;
            }

            const fechaEdit = fechaCierre.split(' ');

            const closeCash = {
                nombreUsuarioCierre: userNameCloseCash,
                cedulaUsuarioCierre: cedulaUserCloseCash,
                numApertura: numApertura,
                nombreUsuarioApertura: nombre,
                cedulaUsuarioApertura: codigoCajero,
                fecha: fechaEdit[0] + 'T' + fechaEdit[1],
                anulado: false,
                totalSistema: totalSistema
            }
            dispatch(startSaveCloseCash(closeCash));
        }

    }

    const handleDisableCloseCash = (e) => {

        if (activeButtonRemove) {

            e.preventDefault();

            dispatch(startDisableCloseCash(idCierre));
        }

    }

    const handleSearchCloseCash = (e) => {

        if (activeButtonSearch) {

            e.preventDefault();

            dispatch(SetIsOpenModalSearchCloseCash(true));
        }

    }

    const handleCloseWindowsCloseCash = (e) => {

        if (isStartCloseCash) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar la creacion de cierre de caja?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(CleanCloseCash());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(CleanCloseCash());

        }

    }

    return (
        <>

            <CloseCashReporte />
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSave
                                ? "btn btn-success espacio"
                                : "btn btn-success espacio disabled"
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#modalReporteCierre"
                        onClick={handleCreateCloseCash}
                    >
                        Registrar <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSearch
                                ? "btn btn-primary espacio"
                                : "btn btn-primary espacio disabled"
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscaCierreCajas"
                        onClick={handleSearchCloseCash}
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
                        onClick={handleDisableCloseCash}
                    >
                        Anular
                        <TbTrashXFilled className="iconSizeBtn" />
                    </button>
                </div>


                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindowsCloseCash}
                    >
                        {(isStartCloseCash) ? "Cancelar" : "Cerrar"} {""}
                        <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

                <div className="col-md-3 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={(visiblePassword) ? 'text' : 'password'}
                            name="claveInterna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            className="form-control"
                            placeholder="Clave Interna"
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaCloseCash)}
                        />
                        <span
                            className="input-group-text"
                            onClick={handleVisibleClave}
                            style={{ cursor: "pointer" }}
                        >
                            {visiblePassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                <div className="col-md-2 mb-2 espacio">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUserCheck className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={userNameCloseCash}
                        />
                    </div>
                </div>
            </div>


            <CloseCashSeletedAperturaModal />

            <CloseCashSearchModal />
        </>
    )
}
