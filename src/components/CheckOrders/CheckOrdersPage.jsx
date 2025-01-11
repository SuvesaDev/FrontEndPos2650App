import { CheckOrdersBody } from './CheckOrdersBody';
import { CheckOrdersHeader } from './CheckOrdersHeader';
import { CheckOrdersIcons } from './CheckOrdersIcons';

export const CheckOrdersPage = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Consultar Pedidos</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <CheckOrdersHeader />
                                <CheckOrdersBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <CheckOrdersIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
