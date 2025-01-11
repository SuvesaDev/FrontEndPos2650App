
import { TbNotes } from 'react-icons/tb';

export const CategoryActionsBody = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-2 mb-3"></div>
                <div className="col-md-8 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="1"
                            name='descripcion'
                        ></textarea>
                    </div>
                </div>
                <div className="col-md-2 mb-3"></div>
            </div>
        </>
    )
}
