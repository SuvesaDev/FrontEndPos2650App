import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { TbNumber } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";

import { 
  SetExistenciaLotesInventory, 
  SetNumLoteLotesInventory, 
  SetVencimientoLotesInventory, 
  startEditLote, 
  startSaveLote
} from "../../../../actions/inventory";

import { InventoryBodyFeaturesLotesTable } from "./InventoryBodyFeaturesLotesTable";

export const InventoryBodyFeaturesLotes = () => {

  const dispatch = useDispatch();

  const columns = [
    {
      Header: "Num lote",
      accessor: "lote",
    },
    {
      Header: "Vencimiento",
      accessor: "vencimiento",
    },
    {
      Header: "Existencia",
      accessor: "existencia",
    },
  ];

  const {
      disableInputs,
      lotes,
      LotesInventory,
      inventory,
      isSeletedLotes,
      isEditInventory,
      isInventoryDisable,
    } = useSelector((state) => state.inventory);

    const { lote, vencimiento, existencia } = lotes;

    const handleInputChangeWithDispatch = ({ target }, action) => {
      dispatch(action(target.value));
    };

    const handleSaveLote = () => {
      
      if( lote == '' || vencimiento == '' || existencia == 0) {

        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Debe completar la informacion para crear nuevo lote.",
        });

        return;
      }

      dispatch( startSaveLote( lotes, inventory.codigo ) );

    }

    const handleEditLote = () => {
      
      if( lote == '' || vencimiento == '' || existencia == 0) {

        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Debe completar la informacion para crear nuevo lote.",
        });

        return;
      }

      dispatch( startEditLote( lotes, inventory.codigo ) );

    }

    return (
      <>
        <div className="container-fluid mt-2">

          <div className="row mb-2">
            
            <div className="col-md-4 mb-3">
              <h5>Lotes</h5>
              <div className="input-group">
                <span className="input-group-text">
                  <TbNumber className="iconSize" />
                </span>
                <input
                  type="text"
                  name="lotes"
                  className="form-control"
                  placeholder="Número lote"
                  disabled={disableInputs}
                  value={lote}
                  onChange={(e) =>
                    handleInputChangeWithDispatch(
                      e,
                      SetNumLoteLotesInventory
                    )
                  }
                />
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <h5>Vencimiento</h5>
              <div className="input-group">
                <span className="input-group-text">
                  <TbNumber className="iconSize" />
                </span>
                <input
                  type="date"
                  name="lotes"
                  className="form-control"
                  placeholder="Número lote"
                  disabled={disableInputs}
                  value={vencimiento}
                  onChange={(e) =>
                    handleInputChangeWithDispatch(
                      e,
                      SetVencimientoLotesInventory
                    )
                  }
                />
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <h5>Existencia</h5>
              <div className="input-group">
                <span className="input-group-text">
                  <TbNumber className="iconSize" />
                </span>
                <input
                  type="number"
                  name="existencia"
                  className="form-control"
                  placeholder="Número lote"
                  disabled={disableInputs}
                  value={existencia}
                  onChange={(e) =>
                    handleInputChangeWithDispatch(
                      e,
                      SetExistenciaLotesInventory
                    )
                  }
                />
              </div>
            </div>

          </div>

          <div className="row mb-2">
            <div className="col-md-4 mb-2">
              <h5>Opciones</h5>
              <div className="inline-container">
                <button
                  className={
                    disableInputs ? "btn btn-success disabled" : "btn btn-success"
                  }
                  disabled={disableInputs}
                  onClick={ isSeletedLotes ? handleEditLote : handleSaveLote}
                >
                  { isSeletedLotes ? 'Editar' : 'Agregar' } <IoAddCircle className="iconSize" />
                </button>

                <button
                  className="btn btn-danger"
                  // className={
                  //   isSeletedRelatedArticles && !isInventoryDisable
                  //     ? "btn btn-danger"
                  //     : "btn btn-danger disabled"
                  // }
                  // onClick={handleRemoveRelatedArticle}
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
              <InventoryBodyFeaturesLotesTable
                columns={columns}
                data={LotesInventory}
              />
            </div>
          </div>

        </div>
      </>
    );
};
