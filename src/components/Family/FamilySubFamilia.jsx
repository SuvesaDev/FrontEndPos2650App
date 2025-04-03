import { useDispatch, useSelector } from 'react-redux';

import { MdNoteAdd } from 'react-icons/md';

import { FamilySubFamiliaTable } from './FamilySubFamiliaTable';

import { 
    SetClosingModalSubFamiliasFamily, 
    SetIsCreateSubFamiliasFamily 
} from '../../actions/FamiliasAction';

export const FamilySubFamilia = () => {

    const dispatch = useDispatch();
        
    const { subFamilias, isSeletedFamilia } = useSelector((state) => state.familias);

    const columns = [
        {
          Header: "Codigo SubFamilia",
          accessor: "subCodigo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Acciones",
            accessor: "icon"
        }
    ];

    const openModalSubFamilias = () => {
        dispatch( SetClosingModalSubFamiliasFamily(false) );
        dispatch( SetIsCreateSubFamiliasFamily(true) );
    }

    return (
        <>
            <div className="row mb-0 text-center">

                <div className="col-md-12 mb-0">

                    <div className="card">

                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Sub-Familias</h4>
                        </div>

                        <div className="card-body">

                            <div className="row mb-3 text-center" >

                                <div className='col-md-9'></div>

                                <div className="col-md-3 mb-3 d-flex">
                                    <button 
                                        className='btn btn-primary ms-auto'
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalSubFamilia"
                                        disabled={!isSeletedFamilia}
                                        onClick={openModalSubFamilias}
                                    >
                                        Nueva SubFamilia <MdNoteAdd className='iconSize' />
                                    </button>
                                </div>

                            </div>

                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-0">
                                    <FamilySubFamiliaTable 
                                        columns={columns}
                                        data={ subFamilias }
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


{/* <div className="row mb-3 text-center">
    <div className="col-md-3 mb-3">
        <h5>Código</h5>
        <div className="input-group">
            <span className="input-group-text">
                <FaHashtag className="iconSize" />
            </span>
            <input
                type="text"
                className='form-control'
                placeholder="Código de la Sub-Familia"
            />
        </div>
    </div>

    <div className="col-md-3 mb-3">
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

    <div className="col-md-3 mb-3">
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
    <div className="col-md-3 mb-3">
        <hr />
        <button className='btn btn-primary espacio'>Nuevo <MdNoteAdd className='iconSize' /></button>
        <button className='btn btn-success espacio'>Agregar <FaCirclePlus className='iconSize' /></button>
    </div>
</div> */}