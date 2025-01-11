import { TermsBody } from './termsBody/TermsBody';
import { TermsIcons } from './TermsIcons';

export const Terms = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Condicciones de Uso Firmado Contado</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-3">
                                    <TermsBody />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <TermsIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
