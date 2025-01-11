
import { ProvidersForm } from "./ProvidersForm";
import { ProvidersIcons } from "./ProvidersIcons";
import { ProvidersCuentaBancaria } from "./ProvidersCuentaBancaria";

export const ProvidersPage = () => {

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Formulario de Proveedores</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <ProvidersForm />
                                <ProvidersCuentaBancaria />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <ProvidersIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
