import { TaxClaimBody } from './TaxClaimBody';
import { TaxClaimIcons } from './TaxClaimcons';

export const TaxClaimPage = () => {
    return (

        
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Pre Toma Fisica General</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                            <TaxClaimBody />


                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                    <TaxClaimIcons />

                    </div>
                </div>
            </div>
            <br />

        </>

    )
}