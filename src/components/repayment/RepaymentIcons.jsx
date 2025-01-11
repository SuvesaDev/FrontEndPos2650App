import Swal from 'sweetalert2';
import { useSelector, useDispatch } from "react-redux";

import { HiDocumentAdd } from 'react-icons/hi';
import { FaRegSave, FaSearch } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { FaUserCheck } from 'react-icons/fa';
//Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiKeyFill } from "react-icons/pi";
import { FaWindowClose } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";
import { MdNoteAdd } from "react-icons/md";

import { RepaymentSearchModal } from "./RepaymentSearchModal";
import {
    CleanFacturaRepayment,
    CleanRepayment,
    SetClaveInternaRepayment,
    SetVisiblePasswordRepayment,
    SetopenSearchModalRepayment,
    startSaveRepayment,
    startValidateClaveInternaRepayment
} from "../../actions/repaymentAction";
import { RepaymentSearchBillingModal } from './RepaymentSearchBillingModal';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';

export const RepaymentIcons = () => {

    const dispatch = useDispatch();
    const {
        devolucion,
        activeButtonSaveRepayment,
        activeButtonSearchRepayment,
        activeButtonRemoveRepayment,
        claveInterna,
        visiblePassword,
        disableInputsUser,
        nameUser
    } = useSelector(state => state.repayment);

    const {auth, idSurcursal} = useSelector(state => state.login)
    const {
        Id_Factura,
        SaldoAnt_Fact,
        SubTotalGravado,
        SubTotalExcento,
        Descuento,
        Impuesto,
        Monto,
        Fecha,
        Cedula_Usuario,
        Cod_Moneda,
        caja,
        MontoDevolucion,
        Num_Apertura,
        UsuarioRecibio,
        NotasDevolucion,
        IdSucursal
    } = devolucion.encabezado;

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

            dispatch(startValidateClaveInternaRepayment(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordRepayment(!visiblePassword));
        }
    }

    const handleCreateRepayment = () => {
        const newRepayment = {
            devolucion: 0,
            idFactura: parseFloat(Id_Factura),
            saldoAntFact: parseFloat(SaldoAnt_Fact),
            subTotalGravado: parseFloat(SubTotalGravado),
            subTotalExcento: parseFloat(SubTotalExcento),
            descuento: parseFloat(Descuento),
            impuesto: parseFloat(Impuesto),
            monto: parseFloat(Monto),
            fecha: new Date().toLocaleDateString("es-CR"),
            cedulaUsuario: Cedula_Usuario,
            codMoneda: parseInt(Cod_Moneda),
            caja: parseInt(caja),
            consecutivo: 0,
            enviadodgt: true,
            estadodgt: '',
            consecutivodgt: '',
            clavedgt: '',
            montoDevolucion: parseFloat(MontoDevolucion),
            numApertura: parseInt(Num_Apertura),
            usuarioRecibio: UsuarioRecibio,
            notasDevolucion: NotasDevolucion,
            idSucursal: 3,
            detalle: devolucion.detalle.map(detalle => {
                return {
                    consecutivo: 0,
                    codigo: detalle.codFxArticulo,
                    descripcion: detalle.Descripcion,
                    cantidad: parseFloat(detalle.Cantidad),
                    cantVet: detalle.CantVet,
                    cantBod: detalle.CantBod,
                    precioCosto: detalle.Precio_Costo,
                    precioBase: detalle.Precio_Base,
                    precioFlete: detalle.Precio_Flete,
                    precioOtros: detalle.Precio_Otros,
                    precioUnit: detalle.Precio_Unit,
                    descuento: detalle.Descuento,
                    montoDescuento: detalle.Monto_Descuento,
                    impuesto: detalle.Impuesto,
                    montoImpuesto: detalle.Monto_Impuesto,
                    subtotalGravado: detalle.SubtotalGravado,
                    subTotalExcento: detalle.SubTotalExcento,
                    subTotal: detalle.SubTotal,
                    idArtVenta: detalle.Id_Art_Venta,
                    idArticuloV: String(detalle.id_articulo_V),
                    idBodega: detalle.idBodega
                }
            })

        }

        console.log(newRepayment);

        dispatch(startSaveRepayment(newRepayment));

    }

    const handleOpenBuscarRepayment = () => {
        dispatch(SetopenSearchModalRepayment(true));
    }

    const handleLimpiarRepayment = () => {
        dispatch(CleanRepayment())
    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button className={(activeButtonSaveRepayment) ? 'btn btn-success espacio' : 'btn btn-success espacio'}
                        onClick={handleCreateRepayment}
                    >
                        Registrar <FaFloppyDisk className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button className={(activeButtonSearchRepayment) ? 'btn btn-primary espacio' : 'btn btn-primary disabled espacio'}
                        onClick={handleOpenBuscarRepayment}
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscarDevoVentas"
                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button className={(activeButtonRemoveRepayment) ? 'btn btn-danger espacio' : 'btn btn-danger disabled espacio'}
                    >
                        Anular <RiDeleteBin2Fill className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button className={(activeButtonRemoveRepayment) ? 'btn btn-warning espacio' : 'btn btn-warning disabled espacio'}

                    >
                        Cerrar <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>


                <div className="col-md-2 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={(visiblePassword) ? 'text' : 'password'}
                            className="form-control"
                            placeholder="Clave Interna"
                            name="claveInterna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaRepayment)}
                        />
                        <span
                            className="input-group-text"
                            onClick={handleVisibleClave}
                            style={{ cursor: "pointer" }}
                        >
                            {
                                (visiblePassword)
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
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
            <RepaymentSearchModal />
            <RepaymentSearchBillingModal />
        </>
    )
}
