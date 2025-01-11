import { CategoryBody } from "./CategoryBody"
import { CategoryIcons } from "./CategoryIcons"

export const CategoryPage = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Categoría</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center" >
                                <div className="col-md-12 mb-3">
                                    <CategoryBody />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer cartaP">
                            <CategoryIcons />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
