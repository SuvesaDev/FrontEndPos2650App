import Swal from 'sweetalert2';
import loadingImage from '../../assets/loading_snipiner.gif';
import { useDispatch, useSelector } from 'react-redux';

import { FaWindowClose, FaEyeSlash, FaEye } from 'react-icons/fa';
import { PiKeyFill } from "react-icons/pi";

import { 
    CleanStateBonificaciones, 
    SetClaveInternaBonificaciones, 
    SetVisibleClaveInternaBonificaciones,
    startValidateClaveInternaBonificaciones
} from '../../actions/BonificacionesAction';
import { 
    CleanStateOrdenCompra,
    SetClaveInternaOrdenCompra, 
    SetVisibleClaveInternaOrdenCompra,
    startValidateClaveInternaOrdenCompra
} from '../../actions/ordenCompraAction';
import { DeleteTab } from '../../actions/tabs';
import { InventorySearchModal } from '../Inventory/InventorySearchModal';


export const BonusesIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector(state => state.tabs);

    const { 
        claveInterna,
        visibleClaveInterna,
        disableInputsUser,
        nameUser
    } = useSelector((state) => state.bonificaciones);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleCloseWindow = (e) => {
    
        e.preventDefault();
 
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea cerrar la bonificacion?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Mantener',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            if (result.isDenied) {
                // Delete this tab
                dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            
                dispatch(CleanStateBonificaciones());
            }
        });

        
    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisibleClaveInternaBonificaciones(!visibleClaveInterna));
        }
    }

    const handleOnKeyDownUser = async (e) => {
    
        if( disableInputsUser ) return;

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

            dispatch( startValidateClaveInternaBonificaciones(claveInterna));
        }
    
    }

    return (

        <>
            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-warning espacio"}
                        onClick={handleCloseWindow}
                    >
                        Cerrar <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

                <div className="col-md-2 mt-1 ms-3">
                    <div className="input-group">
                        
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>

                        <input
                            type={ (visibleClaveInterna) ? 'text' : 'password' }
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaBonificaciones)}
                        />
                        <span
                            className="input-group-text"
                            onClick={handleVisibleClave}
                            style={{ cursor: "pointer" }}
                        >
                            {
                                (visibleClaveInterna)
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </span>
                        
                    </div>
                </div>

                <div className="col-md-2 mt-1 ms-3">
                    <input
                        type='text'
                        name="claveInterna"
                        className="form-control"
                        placeholder="Nombre de Usuario"
                        disabled={true}
                        value={nameUser}
                    />
                </div>

            </div>

            <InventorySearchModal />

        </>

    )
}
