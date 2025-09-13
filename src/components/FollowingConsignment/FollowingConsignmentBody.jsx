import { FollowingConsignmentTabs } from "./FollowingConsignmentBody/FollowingConsignmentTabs";
import { FollowingConsignmentBodyList } from "./FollowingConsignmentBody/FollowingConsignmentBodyList/FollowingConsignmentBodyList";
import { FollowingConsignmentBodyDetails } from "./FollowingConsignmentBody/FollowingConsignmentBodyDetails/FollowingConsignmentBodyDetails";

export const FollowingConsignmentBody = () => {

  const redirectComponent = () => {
    switch ("ListadoConsignacion") {

      case "ListadoConsignacion":
        return <FollowingConsignmentBodyList />;

      case "DetalleConsignacion":
        return <FollowingConsignmentBodyDetails />;

      default:
        break;
    }
  };

  return (
    <>

          <div className="row mb-2 centerP">
            <FollowingConsignmentTabs />
          </div>

          <div className="row mb-2 text-md-center">
            <div className="col-md-12">{redirectComponent()}</div>
          </div>
    </>
  );
};
