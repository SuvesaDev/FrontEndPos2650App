import { useDispatch, useSelector } from "react-redux";

import { SelectTabInventory } from "../../../../actions/inventory";

export const InventoryBodyFeaturesTabs = () => {
  const dispatch = useDispatch();

  const { currentTabInventory, isShowTabCodigoBarras } = useSelector(
    (state) => state.inventory
  );

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
                currentTabInventory == "RebajaOtroArticulo"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
            onClick={() => handleSelectTabInventory("RebajaOtroArticulo")}
            >
            Rebaja Otro Articulo
            </button>

            <button
            className={
                currentTabInventory == "InformacionPost"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
            onClick={() => handleSelectTabInventory("InformacionPost")}
            >
            Información POST
            </button>

            <button
            className={
                currentTabInventory == "Bodega"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
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
                currentTabInventory == "Categoria"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
            onClick={() => handleSelectTabInventory("Categoria")}
            >
            Categoria
            </button>

            <button
            className={
                currentTabInventory == "Relacionados"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
            onClick={() => handleSelectTabInventory("Relacionados")}
            >
            Relacionados
            </button>

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
                currentTabInventory == "Serie"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
            onClick={() => handleSelectTabInventory("Serie")}
            >
            Serie
            </button>

            <button
            className={
                currentTabInventory == "Detalle"
                ? "btn btn-outline-primary activeP"
                : "btn btn-primary"
            }
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
