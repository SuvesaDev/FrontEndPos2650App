import { InventoryFooter } from "./InventoryFooter";
import { InventoryHeader } from "./InventoryHeader";
import { InventoryHeaderArticle } from "./InventoryHeaderArticle";
import { InventoryBody } from "./inventory_body/InventoryBody";

export const InventoryPage = () => {
  return (
    <>
      <div className="container-fluid mt-2">
        <div className="card">
          <div className="card-header cartaMods">
            <InventoryHeader />
          </div>

          <div className="card-body">
            <InventoryHeaderArticle />
            <InventoryBody />
          </div>

          <div className="card-footer cartaP">
            <InventoryFooter />
          </div>
        </div>
        <br />
      </div>
    </>
  );
};
