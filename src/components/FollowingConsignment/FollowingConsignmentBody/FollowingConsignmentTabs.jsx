import { useDispatch, useSelector } from "react-redux";

import { SetSeletedTabFollowingConsignment } from "../../../actions/FollowingConsignmentAction";

export const FollowingConsignmentTabs = () => {

  const dispatch = useDispatch();

  const { 
        visibleTabDetalle,
        seletedTab
    } = useSelector(state => state.followingConsignment);


  const handleSelectTab = (nameTab) => {
    dispatch(SetSeletedTabFollowingConsignment(nameTab));
  };

  return (
    <>
      <div className="col-md-3 mb-2"></div>

      <div className="col-md-2 mb-2">
        <button
          className={
            seletedTab == "ListadoConsignacion"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => handleSelectTab("ListadoConsignacion")}
        >
          Listado de Consignaciones
        </button>
      </div>

      <div className={ (visibleTabDetalle) ? 'col-md-2 mb-2' : 'col-md-2 mb-2 d-none' }>
        <button
          className={
            seletedTab == "DetalleConsignacion"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => handleSelectTab("DetalleConsignacion")}
        >
          Detalle Consignacion
        </button>
      </div>

      <div className="col-md-3 mb-2"></div>

    </>
  );
};
