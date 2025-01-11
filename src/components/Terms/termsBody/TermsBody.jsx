import { useSelector } from 'react-redux';

import { TermsBodyTabs } from './TermsBodyTabs';

import { TermsBodyCondiccionesUso } from './TermsBodyCondiccionesUso';
import { TermsBodyExcepciones } from './TermsBodyExcepciones';

export const TermsBody = () => {

    const state = useSelector(state => state.terms);
    const { currentTabTerms } = state;

    const redirectComponent = () => {

        switch (currentTabTerms) {

            case 'CondiccionesUso':
                return <TermsBodyCondiccionesUso />

            case 'Excepciones':
                return <TermsBodyExcepciones />

            default:
                break;
        }
    }

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card text-center">
                    <div className="card-header bg-secondary text-white">
                        <TermsBodyTabs />
                    </div>
                    <div className="card-body">{redirectComponent()}</div>
                </div>
            </div>
        </>
    )
}
