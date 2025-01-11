import Swal from 'sweetalert2';
import { MdNoteAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash, FaMagnifyingGlass, FaUserCheck } from 'react-icons/fa6';
import { FaPrint, FaRegSave, FaWindowClose } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { PiKeyFill } from 'react-icons/pi';
import { DeleteTab } from '../../actions/tabs';
import { SetClaveInternaWihoutPay, SetCleanWihoutPay, SetVisiblePasswordWihoutPay, startValidateClaveInternaWihoutPay } from '../../actions/countswihoutpay';
import { CountsWihoutPaySearchProveedorModal } from './CountsWihoutPaySearchProveedorModal';

export const CountsWihoutPayFooter = () => {

    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.tabs);
    const {
        claveInterna,
        visiblePassword,
        disableInputsUser,
        nameUser,
    } = useSelector(state => state.wihoutpay);

    const { auth, idSurcursal } = useSelector(state => state.login);
    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;

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

            dispatch(startValidateClaveInternaWihoutPay(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {
        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordWihoutPay(!visiblePassword));
        }
    }

    const handleCloseWindowWihoutPay = (e) => {
        e.preventDefault();
        dispatch(DeleteTab(currentTab.name, currentTab.routePage));
        dispatch(SetCleanWihoutPay());
    }



    return (
        <>
            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-warning espacio"} onClick={handleCloseWindowWihoutPay}
                    >
                        Cerrar <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

                <div className="col-md-3 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={visiblePassword ? "text" : "password"}
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={(e) =>
                                handleInputChangeWithDispatch(e, SetClaveInternaWihoutPay)
                            }
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
                            value={nameUser}
                        />
                    </div>
                </div>
            </div>
            <CountsWihoutPaySearchProveedorModal />
        </>
    )
}
