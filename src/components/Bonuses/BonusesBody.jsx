import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";

import { FaCoins, FaHashtag, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import { BonusesTable } from "./BonusesTable";

import { 
    SetBonificacionBonificaciones,
    SetCantidadRequeridaBonificaciones, 
    SetIsOpenModalSearchBonificaciones,
    startAddNewBonificaciones
} from "../../actions/BonificacionesAction";

export const BonusesBody = () => {

    const dispatch = useDispatch();

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const { 
        disableInputs,
        bonificacion,
        bonificaciones
    } = useSelector((state) => state.bonificaciones);

    const {
        cantidadRequerida,
        nombreArticulo,
        idArticulo
    } = bonificacion;

    const columns = [
        {
            Header: "Cantidad Requerida",
            accessor: "cantidadRequerida",
        },
        {
            Header: "Bonificaciones",
            accessor: "bonificacion"
        },
        {
            Header: "Codigo Articulo",
            accessor: "idArticulo"
        },
        {
            Header: "Descripcion",
            accessor: "nombreArticulo"
        },
        {
            Header: "Acciones",
            accessor: "icon"
        }
    ];

    const handleSearchArticulo = () => {
        dispatch( SetIsOpenModalSearchBonificaciones(true) );
    }

    const handleAddBonificacion = () => {

        if( cantidadRequerida == 0 || bonificacion.bonificacion == 0 || idArticulo == 0 ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Favor completar todos los datos.'
            });
            return;
        }

        const newBonificacion = {
            cantidadRequerida,
            bonificacion : bonificacion.bonificacion,
            idArticulo,
            nombreArticulo
        }

        dispatch( startAddNewBonificaciones( newBonificacion ) );

    }

    return (
        <>
            <div className="row mb-3 text-center">

                <div className="col-md-3 mb-3">
                    <h5>Cantidad Requerida</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="number"
                            disabled={disableInputs}
                            className='form-control'
                            placeholder="Cantidad Requerida"
                            value={cantidadRequerida}
                            onChange={(e) => handleInputChangeWithDispatch(e, SetCantidadRequeridaBonificaciones)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Bonificacion</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <input
                            type="number"
                            disabled={disableInputs}
                            className='form-control'
                            placeholder="Bonificacion"
                            value={bonificacion.bonificacion}
                            onChange={(e) => handleInputChangeWithDispatch(e, SetBonificacionBonificaciones)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Articulo</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCartShopping className="iconSize" />
                        </span>
                        <input
                            type="text"
                            disabled={true}
                            className='form-control'
                            placeholder="Articulo"
                            value={nombreArticulo}
                        />
                        <button
                            type="button"
                            className={ disableInputs ? 'btn btn-primary disabled' : 'btn btn-primary' }
                            onClick={handleSearchArticulo}
                            data-bs-toggle="modal"
                            data-bs-target="#modalBuscarArticulo"
                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-1 mb-3">
                    <div style={{ height: "20px" }}></div>
                    <button 
                        className={ (disableInputs) ? 'btn btn-success disabled' : 'btn btn-success'  }
                        onClick={handleAddBonificacion}
                    >
                        Agregar
                    </button>
                </div>

            </div>

            <div className="row mb-0 text-center" style={{ height: "300px" }} >
                <BonusesTable columns={columns} data={ bonificaciones } />
            </div>
        </>

    )
}
