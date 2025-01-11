import { useSelector, useDispatch } from "react-redux";
import { IsOpenModalCreateCategoriaInventory } from "../../../../actions/inventory";
import {
  CleanNewCategoria,
  SetNewCategoria,
  startCreateCategoria,
} from "../../../../actions/CategoriasAction";

import { IoIosCloseCircle } from "react-icons/io";
import { TbCategoryFilled, TbNotes } from "react-icons/tb";
import { IoAddCircle } from "react-icons/io5";

export const InventoryBodyFeautesCategoriaModal = () => {
  const dispatch = useDispatch();

  const { isOpenModalCreateCategory } = useSelector((state) => state.inventory);
  const { newCategory } = useSelector((state) => state.categorias);
  const { auth } = useSelector((state) => state.login);

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleCreateNewCategory = async (e) => {
    e.preventDefault();

    if (newCategory !== "") {
      await dispatch(startCreateCategoria(newCategory, auth.username));
    }
  };

  return (
    <>
      <div className="modal fade" id="modalCategoriaNueva">
        <div className="modal-dialog modal-md modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Agregar Categoria <TbCategoryFilled className="iconSizeBtn" />
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body text-md-center">
              <form onSubmit={handleCreateNewCategory}>
                <div className="row mb-2">
                  <div className="col-md-12 mb-2">
                    <h5>Descripción</h5>
                    <div className="input-group">
                      <span className="input-group-text">
                        <TbNotes className="iconSize" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Descripción de la Categoria"
                        name="newCategory"
                        value={newCategory}
                        onChange={(e) =>
                          handleInputChangeWithDispatch(e, SetNewCategoria)
                        }
                      />
                    </div>
                    <center>
                      <div className="col-md-4 mb-0">
                        <hr />
                        <button
                          className="btn btn-success"
                          type="submit"
                          data-bs-dismiss="modal"
                        >
                          Agregar <IoAddCircle className="iconSize" />
                        </button>
                      </div>
                    </center>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cerrar <IoIosCloseCircle className="iconSize" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
