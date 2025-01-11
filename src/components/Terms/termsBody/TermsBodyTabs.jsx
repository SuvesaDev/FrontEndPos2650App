import { useDispatch, useSelector } from 'react-redux';
import { SelectTabTerms } from '../../../actions/terms';


export const TermsBodyTabs = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state.terms);
    const { currentTabTerms } = state;

    const handleSelectTabTerms = (nameTab) => {
        dispatch(SelectTabTerms(nameTab));
    }

    return (
        <>
            <div className="inline-containerBtns">
                <button
                    className={
                        currentTabTerms == "CondiccionesUso"
                            ? "btn btn-outline-primary activeP"
                            : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabTerms('CondiccionesUso')}
                >
                    Condiciones de Uso
                </button>

                <button
                    className={
                        currentTabTerms == "Excepciones"
                            ? "btn btn-outline-primary activeP"
                            : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabTerms('Excepciones')}
                >
                    Excepciones
                </button>

            </div>
        </>
    )
}
