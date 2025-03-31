import { useDispatch, useSelector } from 'react-redux';

import { MdNoteAdd } from 'react-icons/md';

import { FamilyFamiliaTable } from './FamilyFamiliaTable';

export const FamilyFamilia = () => {

    const dispatch = useDispatch();
    
    const { familias } = useSelector((state) => state.familias);

    const columns = [
        {
          Header: "Descripcion",
          accessor: "descripcion",
        },
        {
            Header: "Acciones",
            accessor: "icon"
        }
    ];

    return (
        <>
            <div className="row mb-0 text-center">

                <div className="col-md-12 mb-0">

                    <div className="card">

                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Familias</h4>                            
                        </div>

                        <div className="card-body">

                            <div className="row mb-3 text-center">

                                <div className='col-md-9'></div>

                                <div className="col-md-3 mb-3 d-flex">
                                    <button 
                                        className='btn btn-primary ms-auto'
                                    >
                                        Nueva Familia <MdNoteAdd className='iconSize' />
                                    </button>
                                </div>

                            </div>

                            <div className="row mb-3 text-center">

                                <div className="col-md-12 mb-3">
                                    <FamilyFamiliaTable
                                        columns={columns}
                                        data={ familias }
                                    />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}


{/* <div className="card-body">
    <div className="row mb-3 text-center">
        <div className="col-md-4 mb-3">
            <h5>Descripción</h5>
            <div className="input-group">
                <span className="input-group-text">
                    <TbNotes className="iconSize" />
                </span>
                <textarea
                    class="form-control"
                    rows="1"
                ></textarea>
            </div>
        </div>

        <div className="col-md-4 mb-3">
            <h5>Observaciones</h5>
            <div className="input-group">
                <span className="input-group-text">
                    <FaEye className="iconSize" />
                </span>
                <textarea
                    class="form-control"
                    rows="1"
                ></textarea>
            </div>
        </div>
        <div className="col-md-4 mb-3">
            <hr />
            <button className='btn btn-success'>Guardar <FaFloppyDisk className='iconSize' /></button>
        </div>
    </div>

    <div className="row mb-3 text-center">
        <div className="col-md-4 mb-3">
            <h5>Venta Gravada</h5>
            <div className="input-group">
                <span className="input-group-text">
                    <FaPercentage className="iconSize" />
                </span>
                <input
                    type="text"
                    className='form-control'
                    placeholder="Porcentaje de Venta Gravada"
                />
            </div>
        </div>

        <div className="col-md-4 mb-3">
            <h5>Venta Exenta</h5>
            <div className="input-group">
                <span className="input-group-text">
                    <FaPercentage className="iconSize" />
                </span>
                <input
                    type="text"
                    className='form-control'
                    placeholder="Porcentaje de Venta Exenta"
                />
            </div>
        </div>

        <div className="col-md-4 mb-3">
            <h5>Costo Venta</h5>
            <div className="input-group">
                <span className="input-group-text">
                    <FaColonSign className="iconSize" />
                </span>
                <input
                    type="text"
                    className='form-control'
                    placeholder="Costo de Venta"
                />
            </div>
        </div>
    </div>
</div> */}