import { CategoryActionsBody } from './CategoryActionsBody';
import { CategoryActionsIcons } from './CategoryActionsIcons';

export const CategoryActions = () => {
    return (
        <>
        <div className="row">
            <div className="col-md-12 mb-3">
                <div className="card">
                    <div className="card-header bg-primary cartaHMod2">
                        <h4>Categoria de Acción</h4>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3 text-center" >
                            <div className="col-md-12 mb-0">
                                <CategoryActionsBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <CategoryActionsIcons />
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
