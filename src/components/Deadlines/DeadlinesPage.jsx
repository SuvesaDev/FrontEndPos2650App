import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { DeadlinesIcons } from './DeadlinesIcons';
import { DeadlinesBody } from './DeadlinesBody';

import { startGetAllPlazos } from '../../actions/DeadlinesAction';

export const DeadlinesPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch( startGetAllPlazos() );

    }, []);

    return (
        <>
            <div className="container-fluid mt-2 text-center">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <h3>Formulario de Plazos de Consignacion</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <DeadlinesBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <DeadlinesIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
