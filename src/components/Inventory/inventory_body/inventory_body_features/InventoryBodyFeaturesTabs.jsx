import { useDispatch, useSelector } from "react-redux";

import { SelectTabInventory } from "../../../../actions/inventory";

export const InventoryBodyFeaturesTabs = () => {
  const dispatch = useDispatch();

  const { 
    currentTabInventory, 
    isShowTabCodigoBarras, 
    isEditInventory,
    idTipoArticuloSelected
  } = useSelector( (state) => state.inventory );

  const { auth } = useSelector((state) => state.login);
  const { costaPets } = auth;

  const handleSelectTabInventory = (nameTab) => {
    dispatch(SelectTabInventory(nameTab));
  };

  return (
    <>
        <div className="inline-containerBtns">

            <button
            className={
                currentTabInventory == "UltimoCosto"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
            onClick={() => handleSelectTabInventory("UltimoCosto")}
            >
            Ultimo Costo
            </button>

            <button
             className={ 
                (!costaPets) 
                    ? currentTabInventory == "RebajaOtroArticulo"
                        ? "btn btn-outline-primary activeP"
                        : "btn btn-primary" 
                    : 'col-md-3 mb-3 d-none'}
            onClick={() => handleSelectTabInventory("RebajaOtroArticulo")}
            >
            Rebaja Otro Articulo
            </button>

            <button
            className={ 
                (!costaPets) 
                    ? currentTabInventory == "InformacionPost"
                        ? "btn btn-outline-primary activeP"
                        : "btn btn-primary" 
                    : 'col-md-3 mb-3 d-none'}
            onClick={() => handleSelectTabInventory("InformacionPost")}
            >
            Información POST
            </button>

            <button
            className={ 
                (!costaPets) 
                    ? currentTabInventory == "Bodega"
                        ? "btn btn-outline-primary activeP"
                        : "btn btn-primary" 
                    : 'col-md-3 mb-3 d-none'}
            onClick={() => handleSelectTabInventory("Bodega")}
            >
            Bodega
            </button>

            <button
            className={
                currentTabInventory == "Varios"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
            onClick={() => handleSelectTabInventory("Varios")}
            >
            Varios
            </button>

            <button
            className={ 
                (!costaPets) 
                    ? currentTabInventory == "Categoria"
                        ? "btn btn-outline-primary activeP"
                        : "btn btn-primary" 
                    : 'col-md-3 mb-3 d-none'}
            onClick={() => handleSelectTabInventory("Categoria")}
            >
            Categoria
            </button>

            <button
            className={ 
                (costaPets) 
                    ? (idTipoArticuloSelected == 3) 
                        ? 'col-md-3 mb-3 d-none'
                        : currentTabInventory == "Relacionados"
                            ? "btn btn-outline-primary activeP"
                            : "btn btn-primary" 
                    : currentTabInventory == "Relacionados"
                        ? "btn btn-outline-primary activeP"
                        : "btn btn-primary"
            }
            onClick={() => handleSelectTabInventory("Relacionados")}
            >
            Relacionados
            </button>

            {idTipoArticuloSelected == 3 ? (
                <button
                    className={ 
                        (costaPets && isEditInventory) 
                            ? currentTabInventory == "Formula"
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary" 
                            : 'col-md-3 mb-3 d-none'}
                    onClick={() => handleSelectTabInventory("Formula")}
                >
                Formula
                </button>
            ) : null}
            
            {idTipoArticuloSelected == 2 ? (
                <button
                    className={ 
                        (costaPets && isEditInventory) 
                            ? currentTabInventory == "Convertidor"
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary" 
                            : 'col-md-3 mb-3 d-none'}
                    onClick={() => handleSelectTabInventory("Convertidor")}
                    >
                    Convertidor
                    </button>
            ) : null }
            

            {isShowTabCodigoBarras ? (
            <button
                className={
                currentTabInventory == "CodigoBarras"
                    ? "btn btn-outline-primary activeP"
                    : "btn btn-primary"
                }
                onClick={() => handleSelectTabInventory("CodigoBarras")}
            >
                Códigos Barras
            </button>
            ) : null}

            <button
            className={ 
                (!costaPets) 
                    ? currentTabInventory == "Serie"
                        ? "btn btn-outline-primary activeP"
                        : "btn btn-primary" 
                    : 'col-md-3 mb-3 d-none'}
            onClick={() => handleSelectTabInventory("Serie")}
            >
            Serie
            </button>

            <button
            className={ 
                (!costaPets) 
                    ? currentTabInventory == "Detalle"
                        ? "btn btn-outline-primary activeP"
                        : "btn btn-primary" 
                    : 'col-md-3 mb-3 d-none'}
            onClick={() => handleSelectTabInventory("Detalle")}
            >
            Detalle Articulos
            </button>

            <button
            className={
                currentTabInventory == "Lotes"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
            onClick={() => handleSelectTabInventory("Lotes")}
            >
            Lotes
            </button>

        </div>
    </>
  );
};
