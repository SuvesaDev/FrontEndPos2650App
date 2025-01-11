import { FaHashtag } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { CollectBody } from './CollectBody';
import { CollectFooter } from './CollectFooter';
import { CollectTable } from './CollectTable';
import { TbNumber } from 'react-icons/tb';

export const CollectPage = () => {

    const { abono } = useSelector(state => state.collect);

    const { numeroFicha } = abono;

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <div className='row'>
                            <div className="col-md-2 mb-2">
                                <div className="input-group">
                                    <span className="input-group-text">
                                         <strong>Recibo Nº</strong>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Número de Recibo"
                                        disabled={ true }
                                        value={ numeroFicha }
                                    />
                                </div>
                            </div>
                            <div className="col-md-8 mb-2">
                                <h3>Recibo de Dinero</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <CollectBody />
                        <CollectTable />
                    </div>
                    <div className="card-footer cartaP">
                        <CollectFooter />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
