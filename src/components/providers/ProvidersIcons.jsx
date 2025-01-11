import Swal from 'sweetalert2';
import loadingImage from '../../assets/loading_snipiner.gif';
import { useDispatch, useSelector } from 'react-redux';
import { ProvidersSearchModal } from './ProvidersSearchModal';
import { DeleteTab } from '../../actions/tabs';
import {
    CleanStateProveedores,
    OpenSearchModalProveedores,
    SetActiveButtonNewProveedores,
    SetActiveButtonRemoveProveedores,
    SetActiveButtonSaveProveedores,
    SetActiveButtonSearchProveedores,
    SetDefautlButtonsProveedores,
    SetDisableInputsProveedores,
    SetHasDataProveedores,
    SetIsOpenModalSearchProveedores,
    SetIsProveedorDisableProveedores,
    SetIsProveedorEditProveedores,
    startActiveDisablesProveedores,
    startCreateProveedores,
    startEditProveedores,
    startGetAllProveedoresSearch
} from '../../actions/ProveedoresAction';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbEditCircle } from 'react-icons/tb';
import { FaCheckCircle, FaRegSave, FaSearch, FaWindowClose } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
export const ProvidersIcons = () => {

    const dispatch = useDispatch();

    const { auth } = useSelector(state => state.login);
    const { currentTab } = useSelector(state => state.tabs);
    const {
        activeButtonNew,
        activeButtonSearch,
        activeButtonSave,
        activeButtonRemove,
        proveedor,
        isProveedorEdit,
        isProveedorDisable,
        hasData,
        proveedoresSearch
    } = useSelector(state => state.proveedores);

    const {
        identificacion,
        cedula,
        nombre,
        contacto,
        telefonoCont,
        observaciones,
        telefono1,
        fax1,
        email,
        direccion,
        cuentaContable,
        descripcionCuentaContable,
        actualizado,
        inhabilitado,
        estado,
        cuentasBancariasProveedors
    } = proveedor;

    const handleSearchProveedores = async (e) => {

        e.preventDefault();

        if (activeButtonSearch) {

            await loadCatalogos();

            dispatch(CleanStateProveedores());

            dispatch(SetIsProveedorEditProveedores(false));
            dispatch(SetIsProveedorDisableProveedores(false));

            dispatch(SetActiveButtonNewProveedores(false));
            dispatch(SetActiveButtonSearchProveedores(false));
            dispatch(SetActiveButtonSaveProveedores(true));
            dispatch(SetActiveButtonRemoveProveedores(true));

            dispatch(SetDisableInputsProveedores(false));

            dispatch(SetIsOpenModalSearchProveedores(true));
        }
    }

    const handleCreateProveedores = (e) => {

        e.preventDefault();

        if (activeButtonSave) {

            // Create Proveedor
            dispatch(startCreateProveedores({
                cedula,
                nombre: nombre.toUpperCase(),
                contacto,
                telefonoCont,
                observaciones,
                telefono1,
                fax1,
                email,
                direccion,
                // montoCredito: 0,
                // plazo: 0,
                // costoTotal: true,
                // impIncluido: true,
                // pedidosMes: 0,
                // utilidadInventario: 0,
                // utilidadFija: true,
                cuentaContable,
                descripcionCuentaContable,
                actualizado,
                inhabilitado,
                // serie: true,
                // bloqueado: true,
                estado: true,
                idUsuarioCreacion: auth.username,
                fechaCreacion: new Date().toLocaleDateString("es-CR"),
                cuentasBancariasProveedors: cuentasBancariasProveedors.map(cuenta => {
                    return {
                        codigoProv: 0,
                        tipoCuenta: cuenta.tipo,
                        banco: cuenta.banco,
                        codMoneda: cuenta.cod_moneda,
                        numCuenta: cuenta.cuenta,
                        monedaNombre: cuenta.moneda,
                        idCuenta: cuenta.idCuenta,
                        estado: cuenta.estado
                    }
                })
            }));

        }
    }

    const handleNewProveedores = async (e) => {

        e.preventDefault();

        if (activeButtonNew) {
            dispatch(SetDisableInputsProveedores(false));

            dispatch(SetActiveButtonSearchProveedores(false));
            dispatch(SetActiveButtonSaveProveedores(true));
            dispatch(SetActiveButtonNewProveedores(false));
            dispatch(SetActiveButtonRemoveProveedores(false));

            dispatch(SetHasDataProveedores(true));

        }
    }

    const handleCloseProveedores = (e) => {
        e.preventDefault();

        if (hasData) {
            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea cancelar?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Si, Cancelar`,
            }).then(async (result) => {
                if (result.isDenied) {
                    dispatch(SetDefautlButtonsProveedores());
                    dispatch(SetDisableInputsProveedores(true));

                    dispatch(SetIsProveedorEditProveedores(false));
                    dispatch(SetIsProveedorDisableProveedores(false));

                    dispatch(SetHasDataProveedores(false));

                    dispatch(CleanStateProveedores());
                }
            });
        } else {
            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(SetDefautlButtonsProveedores());
            dispatch(SetDisableInputsProveedores(true));

            dispatch(SetIsProveedorEditProveedores(false));
            dispatch(SetIsProveedorDisableProveedores(false));

            dispatch(SetHasDataProveedores(false));

            dispatch(CleanStateProveedores());
        }

    }

    const handleEditProveedores = (e) => {

        e.preventDefault();

        if (activeButtonSave) {
            dispatch(startEditProveedores(identificacion, {
                cedula,
                nombre: nombre.toUpperCase(),
                contacto,
                telefonoCont,
                observaciones,
                telefono1,
                fax1,
                email,
                direccion,
                // montoCredito: 0,
                // plazo: 0,
                // costoTotal: true,
                // impIncluido: true,
                // pedidosMes: 0,
                // utilidadInventario: 0,
                // utilidadFija: true,
                cuentaContable: (cuentaContable === undefined ? null : cuentaContable),
                descripcionCuentaContable: (descripcionCuentaContable === undefined ? null : descripcionCuentaContable),
                actualizado,
                inhabilitado,
                // serie: true,
                // bloqueado: true,
                estado: true,
                idUsuarioModificacion: auth.username,
                fechaModificacion: new Date().toLocaleDateString("es-CR"),
                cuentasBancariasProveedors: cuentasBancariasProveedors.map(cuenta => {
                    return {
                        codigoProv: (identificacion) ? identificacion : cuenta.codigoProv,
                        tipoCuenta: cuenta.tipo,
                        banco: cuenta.banco,
                        codMoneda: cuenta.cod_moneda,
                        numCuenta: cuenta.cuenta,
                        monedaNombre: cuenta.moneda,
                        idCuenta: cuenta.idCuenta,
                        estado: cuenta.estado
                    }
                })
            }));
        }

    }

    const handleDisableActiveProveedores = (e) => {
        e.preventDefault();

        if (activeButtonRemove) {
            dispatch(startActiveDisablesProveedores(identificacion, !inhabilitado, (!inhabilitado) ? 1 : 2)); //TODO: Nota 1. Desactivar 2.Activar
        }
    }

    const loadCatalogos = async (e) => {

        if (proveedoresSearch.length === 0) {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere cargando catalogos',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });

            await dispatch(startGetAllProveedoresSearch());

            //Quitar el loading
            Swal.close();
        }
    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonNew
                                ? "btn btn-success espacio"
                                : "btn btn-success espacio disabled"
                        }
                        onClick={handleNewProveedores}
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn" />
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
                        data-bs-target="#modalBuscaProveedor"
                        onClick={loadCatalogos}
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            isProveedorEdit
                                ? activeButtonSave
                                    ? "btn btn-warning espacio"
                                    : "btn btn-warning espacio disabled"
                                : activeButtonSave
                                    ? "btn btn-dark espacio"
                                    : "btn btn-dark espacio disabled"
                        }

                        onClick={isProveedorEdit ? handleEditProveedores : handleCreateProveedores}
                    >
                        {isProveedorEdit ?
                            <>
                                Editar <TbEditCircle className="iconSizeBtn" />
                            </>
                            :
                            <>
                                Registrar <FaRegSave className="iconSizeBtn" />
                            </>

                        }
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            isProveedorDisable
                                ? activeButtonRemove
                                    ? "btn btn-success espacio"
                                    : "btn btn-success espacio disabled"
                                : activeButtonRemove
                                    ? "btn btn-danger espacio"
                                    : "btn btn-danger espacio disabled"
                        }
                        onClick={handleDisableActiveProveedores}
                    >
                        {isProveedorDisable ?
                            <>
                                Activar <FaCheckCircle className="iconSizeBtn" />
                            </>
                            :
                            <>
                                Deshabilitar <RiDeleteBin2Fill className="iconSizeBtn" />
                            </>
                        }
                    </button>
                </div>


                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseProveedores}
                    >
                        {(hasData) ? "Cancelar" : "Cerrar"} {""}
                        <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

            </div>

            <ProvidersSearchModal />

        </>

    )
}
