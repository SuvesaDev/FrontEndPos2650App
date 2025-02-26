import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { PresentationsBody } from './PresentationsBody';
import { PresentationsIcons } from './PresentationsIcons';

import { startAllPresentaciones } from '../../actions/PresentacionesAction';

export const PresentationsPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch( startAllPresentaciones() );

    }, []);

    return (
        <>
            <div className="container-fluid mt-2 text-center">
                <div className="card">
                    <div className="card-header cartaHMods3">
                        <h3>Formulario de Presentaciones</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-3">
                                <PresentationsBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <PresentationsIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
