import { UnifyCodeBody } from './UnifyCodeBody';
import { UnifyCodeIcons } from './UnifyCodeIcons';

export const UnifyCode = () => {
    return (
        <>

            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Unir Codigo Entre Puntos de Venta</h3>
                    </div>
                    <div className="card-body">
                        <UnifyCodeBody />
                    </div>
                    <div className="card-footer cartaP">
                        <UnifyCodeIcons />
                    </div>
                </div>
            </div>
            <br />

        </>

    )
}
