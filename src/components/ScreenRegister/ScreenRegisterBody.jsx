
import { TbNotes } from 'react-icons/tb';
import { FaEdit, FaHashtag } from 'react-icons/fa';
import { MdAddCircle, MdCancel } from 'react-icons/md';
import { FaMobileScreen } from 'react-icons/fa6';

export const ScreenRegisterBody = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-6 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder="Código de la Pantalla"
                        />
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <h5>Pantalla</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMobileScreen className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder="Nombre de la Pantalla"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
