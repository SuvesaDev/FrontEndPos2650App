import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";

import { FaListOl, FaEdit} from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";

import { DeadlinesTable } from './DeadlinesTable';

import { 
    SetCantidadDiasDeadlines, 
    SetDescripcionDeadlines, 
    startDeleteDeadline, 
    startEditDeadline, 
    startSaveDeadline
} from '../../actions/DeadlinesAction';

export const DeadlinesBody = () => {

    const dispatch = useDispatch();

    const {
        plazos,
        descripcion,
        cantidadDias,
        isEditPlazo,
        idPlazo
    } = useSelector((state) => state.deadlines);

    const columns = [
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Cantidad de dias",
            accessor: "cantidadDias",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSaveDeadline = () => {

        if( descripcion == '' || cantidadDias == 0 ) {
            Swal.fire({
                icon: 'warning',
                title: 'Plazos',
                text: 'Favor completar todos los datos.',
            });
        }

        const deadline = {
            idPlazo: 0,
            descripcion: descripcion,
            cantidadDias: cantidadDias,
            consignacion: true,
            activo: true
        }

        dispatch( startSaveDeadline(deadline) );

    }

    const handleEditDeadline = () => {

        if( descripcion == '' || cantidadDias == 0 ) {
            Swal.fire({
                icon: 'warning',
                title: 'Plazos',
                text: 'Favor completar todos los datos.',
            });
        }

        const deadline = {
            idPlazo: idPlazo,
            descripcion: descripcion,
            cantidadDias: cantidadDias,
            consignacion: true,
            activo: true
        }

        dispatch( startEditDeadline(deadline) );

    }

    const handleDeleteDeadline = () => {

        const deadline = {
            idPlazo: idPlazo,
            descripcion: descripcion,
            cantidadDias: cantidadDias,
            consignacion: true
        }

        dispatch( startDeleteDeadline(deadline) );

    }

    return (
        <>
            <div className="container-fluid mt-2">

                <div className="row mb-3 text-center">
                    <div className="col-md-2 mb-3"></div>
                    <div className="col-md-4 mb-3">
                        <h5>Descripcion</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaListOl className="iconSize" />
                            </span>
                            <input
                                name="descripcion"
                                type="text"
                                className="form-control"
                                placeholder="Descripcion"
                                onChange={(e) => {
                                    handleInputChangeWithDispatch(e, SetDescripcionDeadlines)
                                }}
                                value={ descripcion }
                            />
                        </div>
                    </div>

                    <div className="col-md-2 mb-3">
                        <h5>Cantidad de días</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaListOl className="iconSize" />
                            </span>
                            <input
                                name="cantidad"
                                type="number"
                                className="form-control"
                                placeholder="Cantidad de dias"
                                onChange={(e) => {
                                    handleInputChangeWithDispatch(e, SetCantidadDiasDeadlines)
                                }}
                                value={ cantidadDias }
                            />
                        </div>
                    </div>

                    <div className="col-md-2 mb-3">
                        <h5>Opciones</h5>
                        <div className="inline-container">
                            <button
                                className={(isEditPlazo) ? 'btn btn-warning' : 'btn btn-success'}
                                onClick={(isEditPlazo) ?  handleEditDeadline : handleSaveDeadline}
                            >
                                {(isEditPlazo) 
                                    ?   <>
                                            Editar <FaEdit className="iconSize" />
                                        </>
                                    :   <>
                                            Agregar <IoAddCircle className="iconSize" />
                                        </>
                                }
                            </button>
            
                            <button
                                className={ (isEditPlazo) ? 'btn btn-danger' : 'btn btn-danger disabled' }
                                onClick={handleDeleteDeadline}
                                type="button"
                            >
                                <RiDeleteBin2Fill className="iconSize" />
                            </button>
                        </div>
                        <hr />
                    </div>

                    <div className="col-md-3 mb-3"></div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-3 mb-3"></div>
                    <div className="col-md-6 mb-2">
                    <DeadlinesTable
                        columns={columns}
                        data={plazos}
                    />
                    </div>
                    <div className="col-md-3 mb-3"></div>
                </div>

            </div>
            
        </>

    )
}
