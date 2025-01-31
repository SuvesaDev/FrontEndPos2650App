import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { TbCategoryFilled, TbEditCircle } from "react-icons/tb";
import {
  CleanCategoriaActualInventory,
  IsCategoriaEditInventory,
  IsOpenModalCreateCategoriaInventory,
  SetAddCategoriaInventory,
  SetCategoriaActualInventory,
  SetDeleteCategoriaInventory,
  SetEditCategoriaInventory,
  SetIndexCategoriaInventory,
} from "../../../../actions/inventory";
import { InventoryBodyFeaturesCategoriaTable } from "./InventoryBodyFeaturesCategoriaTable";
import { startDisableCategoriaxInventario } from "../../../../actions/CategoriasAction";

export const InventoryBodyFeaturesCategoria = () => {
  const dispatch = useDispatch();

  const {
    inventory,
    disableInputs,
    categoriaActual,
    isCategoriaEdit,
    indexCategoria,
  } = useSelector((state) => state.inventory);
  const { categoriasInventory } = useSelector((state) => state.categorias);
  const { auth } = useSelector((state) => state.login);

  const { categorias, codigo } = inventory;

  const columns = [
    {
      Header: "Código",
      accessor: "id",
    },
    {
      Header: "Categoria",
      accessor: "descripcion",
    },
  ];

  const handleInputChangeCategoria = ({ target }) => {
    dispatch(SetCategoriaActualInventory(parseInt(target.value)));
  };

  const handleAddCategory = (e) => {
    const existCategory = categorias.find((c) => c.id == categoriaActual);

    if (existCategory === undefined) {
      const category = categoriasInventory.find((c) => c.id == categoriaActual);
      dispatch(SetAddCategoriaInventory(category));
      dispatch(CleanCategoriaActualInventory());
    }
  };

  const handleEditCategory = (e) => {
    const category = categoriasInventory.find((c) => c.id == categoriaActual);
    dispatch(
      SetEditCategoriaInventory({
        index: indexCategoria,
        id: category.id,
        descripcion: category.descripcion,
      })
    );
    dispatch(CleanCategoriaActualInventory());
    dispatch(SetIndexCategoriaInventory(null));
    dispatch(IsCategoriaEditInventory(false));
  };

  const handleDeleteCategory = (e) => {
    if (isCategoriaEdit) {
      const category = categoriasInventory.find((c) => c.id == categoriaActual);
      const selectCategory = categorias.find((c) => c.id == categoriaActual);

      if (selectCategory.idCategoriaxInventario != undefined) {
        dispatch(
          startDisableCategoriaxInventario(
            selectCategory.id,
            selectCategory.descripcion,
            codigo,
            category,
            auth.username
          )
        );
      } else {
        dispatch(SetDeleteCategoriaInventory(category));
        dispatch(CleanCategoriaActualInventory());
        dispatch(SetIndexCategoriaInventory(null));
        dispatch(IsCategoriaEditInventory(false));
      }
    }
  };

  const handleCreateNewCategory = (e) => {
    if (!disableInputs) {
      dispatch(IsOpenModalCreateCategoriaInventory(true));
    }
  };

  return (
    <>
      <div className="container-fluid mt-2">

        <div className="row mb-2">

          <div className="col-md-6 mb-2">
            <h5>Categoría</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbCategoryFilled className="iconSize" />
              </span>
              <select
                name="categoria"
                className="form-select"
                disabled={disableInputs}
                value={categoriaActual}
                onChange={(e) => handleInputChangeCategoria(e)}
              >
                <option value={0} selected disabled hidden>
                  {" "}
                  Seleccione...{" "}
                </option>
                {categoriasInventory != null ? (
                  categoriasInventory.map((tipo) => {
                    return (
                      <option value={tipo.id}> {tipo.descripcion} </option>
                    );
                  })
                ) : (
                  <option value="">No se cargaron las categorias</option>
                )}
              </select>

              <button
                className={
                  disableInputs
                    ? "btn btn-secondary disabled"
                    : isCategoriaEdit
                    ? "btn btn-warning"
                    : "btn btn-success"
                }
                disabled={disableInputs}
                onClick={
                  isCategoriaEdit ? handleEditCategory : handleAddCategory
                }
              >
                {isCategoriaEdit ? (
                  <>
                    Cambiar <TbEditCircle className="iconSize" />
                  </>
                ) : (
                  <>
                    Agregar <IoAddCircle className="iconSize" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="col-md-1 mb-0"></div>

          <div className="col-md-5 mb-2">
            <h5>Opciones</h5>
            <div className="inline-container">
              <button
                className={
                  disableInputs ? "btn btn-dark disabled" : "btn btn-dark"
                }
                data-bs-toggle="modal"
                data-bs-target="#modalCategoriaNueva"
              >
                Nueva Categoria <IoAddCircle className="iconSize" />
              </button>

              <button
                className={
                  !disableInputs && isCategoriaEdit
                    ? "btn btn-danger"
                    : "btn btn-danger disabled"
                }
                onClick={handleDeleteCategory}
                type="button"
              >
                <RiDeleteBin2Fill className="iconSize" />
              </button>
            </div>
            <hr />
          </div>

        </div>

        <div className="row mb-3">
          <div className="col-md-12 mb-2">
            <InventoryBodyFeaturesCategoriaTable
              columns={columns}
              data={categorias}
            />
          </div>
        </div>
      </div>
    </>
  );
};
