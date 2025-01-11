import React from "react";
import { Switch } from "react-router-dom";

import { Navbar } from "../components/Shared/Navbar";
import { Tabs } from "../components/Shared/Tabs";

import { VetPage } from "../components/VetPage";
import { BillingPage } from "../components/Billing/BillingPage";
import { BuysPage } from "../components/Buys/BuysPage";
import { InventoryPage } from "../components/Inventory/InventoryPage";
import { ReportsPage } from "../components/Reports/ReportsPage";
import { NothingPage } from "../components/Shared/NothingPage";
import { ProvidersPage } from "../components/providers/ProvidersPage";
import { CustomersPage } from "../components/customers/CustomersPage";
import { SettingsPage } from "../components/Settings/SettingsPage";
import { CloseCashPage } from "../components/CloseCash/CloseCashPage";
import { RepaymentPage } from "../components/repayment/RepaymentPage";
import { InventoryAdjustmentPage } from "../components/InventoryAdjustment/InventoryAdjustmentPage";
import { WineriesAdjustmentPage } from "../components/WineriesAdjustment/WineriesAdjustmentPage";
import { LoansPage } from "../components/Loans/LoansPage";
import { CollectPage } from "../components/Collect/CollectPage";
import { PaysPage } from "../components/Pays/PaysPage";
import { CollectAdjustmentPage } from "../components/CollectAdjustment/CollectAdjustmentPage";
import { PaysAdjustmentPage } from "../components/PaysAdjustment/PaysAdjustmentPage";
import { LocationsPage } from "../components/Locations/LocationsPage";
import { PresentationsPage } from "../components/Presentations/PresentationsPage";
import { CoinsPage } from "../components/Coins/CoinsPage";
import { WineriesPage } from "../components/Wineries/WineriesPage";
import { FamilyPage } from "../components/Family/FamilyPage";
import { OpenCashPage } from "../components/OpenCash/OpenCashPage";
import { PrivateRoute } from "./PrivateRoute";
import { CategoryPage } from "../components/Category/CategoryPage";
import { AssignTab } from "../components/AssignTab/AssignTab";
import { Rates } from "../components/Rates/Rates";
import { DenominationCoins } from "../components/DenominationCoins/DenominationCoins";
import { CategoryActions } from "../components/CategoryActions/CategoryActions";
import { Terms } from "../components/Terms/Terms";
import { UsualCustomersPage } from "../components/UsualCustomers/UsualCustomersPage";
import { ProformaPage } from "../components/Proforma/ProformaPage";
import { TrackingQuotesPage } from "../components/TrackingQuotes/TrackingQuotesPage";
import { SalesAgentPage } from "../components/SalesAgent/SalesAgentPage";
import { BagsKilosPage } from "../components/BagsKilos/BagsKilosPage";
import { WarehouseOrdersPage } from "../components/WarehouseOrders/WarehouseOrdersPage";
import { MovementItems } from "../components/MovementItems/MovementItems";
import { RequestWineryPage } from "../components/RequestWinery/RequestWineryPage";
import { PurchaseOrder } from "../components/PurchaseOrder/PurchaseOrder";
import { PurchaseReturnsPage } from "../components/PurchaseReturns/PurchaseReturnsPage";
import { BillsPage } from "../components/Bills/BillsPage";
import { PretakePage } from "../components/Pretake/PretakePage";
import { TakePage } from "../components/Take/TakePage";
import { TaxClaimPage } from "../components/TaxClaim/TaxClaimPage";
import { AreasPage } from "../components/Areas/AreasPage";
import { CheckOrdersPage } from "../components/CheckOrders/CheckOrdersPage";
import { Raffle } from "../components/Raffle/Raffle";
import { Tagger } from "../components/Tagger/Tagger";
import { UnifyCode } from "../components/UnifyCodes/UnifyCode";
import { AssingCabysCode } from "../components/AssingCabysCode/AssingCabysCode";
import { MagIteamsList } from "../components/MagIteamsList/MagIteamsList";
import { ScreenRegister } from "../components/ScreenRegister/ScreenRegister";
import { LockUnlockWarehouse } from "../components/LockUnlockWarehouse/LockUnlockWarehouse";
import { LockUnlockCommercialHouse } from "../components/LockUnlockCommercialHouse/LockUnlockCommercialHouse";
import { TransferPointsSale } from "../components/TransferPointsSale/TransferPointsSale";
import { DocumentsEmitedPage } from "../components/DocumentsEmited/DocumentsEmitedPage";
import { ArqueoCashPage } from "../components/arqueoCash/ArqueoCashPage";
import { ConsultAlbaranesPage } from "../components/ConsultAlbaranes/ConsultAlbaranesPage";
import { UsersPage } from "../components/Users/UsersPage";
import { ChargePage } from "../components/Charge/ChargePage";
import { CompanyPage } from "../components/company/CompanyPage";
import { BranchPage } from "../components/Branch/BranchPage";
import { DownPaymentPage } from "../components/DownPayment/DownPaymentPage";
import { PreDepositsPage } from "../components/PreDeposits/PreDepositsPage";
import { GenerateDepositsPage } from "../components/GenerateDeposits/GenerateDepositsPage";
import { ConsultDepositsPage } from "../components/ConsultDeposits/ConsultDepositsPage";
import { BankPage } from "../components/Bank/BankPage";
import { InventarioPage } from "../components/ModuloInventario/InventarioPage";
import { ReportsPageMod } from "../components/ModuloReportes/ReportsPageMod";
import { FarmacyPage } from "../components/ModuloFarmacia/FarmaciaPage";
import { CountsWihoutPayPage } from "../components/CountsPay/CountswihoutpayPage";
export const VetRouter = ({ isAuthenticated }) => {
  return (
    <div>
      <Navbar />

      <Tabs />

      <Switch>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial"
          component={VetPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/customers"
          component={CustomersPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/inventory"
          component={InventoryPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/cash/opencash"
          component={OpenCashPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/cash/arqueocash"
          component={ArqueoCashPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/cash/closecash"
          component={CloseCashPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/cash/deposits/predeposits"
          component={PreDepositsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/cash/deposits/generatedeposits"
          component={GenerateDepositsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/cash/deposits/consultdeposits"
          component={ConsultDepositsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path={`/initial/billing/:billingId`}
          component={BillingPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/charge"
          component={ChargePage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/downPayment"
          component={DownPaymentPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/documents"
          component={DocumentsEmitedPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/repayment"
          component={RepaymentPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/initial/consultAlbaranes"
          component={ConsultAlbaranesPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/buy"
          component={BuysPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/providers"
          component={ProvidersPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/countswihoutpay"
          component={CountsWihoutPayPage}
        />


        
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/orders/warehouseorders"
          component={WarehouseOrdersPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/orders/checkorders"
          component={CheckOrdersPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/inventoryadjustment"
          component={InventoryAdjustmentPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/wineryadjustment"
          component={WineriesAdjustmentPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/movementitems"
          component={MovementItems}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/requestWinery"
          component={RequestWineryPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/purchaseorder"
          component={PurchaseOrder}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/purchasereturns"
          component={PurchaseReturnsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/bills"
          component={BillsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/pretake"
          component={PretakePage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/take"
          component={TakePage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/taxclaim"
          component={TaxClaimPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/pay"
          component={PaysPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/payadjustment"
          component={PaysAdjustmentPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/buys/loans"
          component={LoansPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/sales/billing/:billingId"
          component={BillingPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/sales/budgets/proforma"
          component={ProformaPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/sales/budgets/seguimiento"
          component={TrackingQuotesPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/sales/salesagent"
          component={SalesAgentPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/sales/collect"
          component={CollectPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/sales/adjustmentcollect"
          component={CollectAdjustmentPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/sales/repayment"
          component={RepaymentPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/utilities/raffle"
          component={Raffle}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/utilities/tagger"
          component={Tagger}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/utilities/unifycodes"
          component={UnifyCode}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/utilities/magitemslist"
          component={MagIteamsList}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/utilities/assigncabyscode"
          component={AssingCabysCode}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/settings"
          component={SettingsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/users"
          component={UsersPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/company"
          component={CompanyPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/branch"
          component={BranchPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/bank"
          component={BankPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/usualcustomers"
          component={UsualCustomersPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/assigntab"
          component={AssignTab}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/rates"
          component={Rates}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/locations"
          component={LocationsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/presentations"
          component={PresentationsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/coins"
          component={CoinsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/denominationcoins"
          component={DenominationCoins}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/wineries"
          component={WineriesPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/areas"
          component={AreasPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/family"
          component={FamilyPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/category"
          component={CategoryPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/screenregister"
          component={ScreenRegister}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/lockunlockwarehouse"
          component={LockUnlockWarehouse}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/lock/unlockcommercialhouse"
          component={LockUnlockCommercialHouse}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/lock/transferpointssale"
          component={TransferPointsSale}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/bagskilos"
          component={BagsKilosPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/actions"
          component={CategoryActions}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/parameters/terms"
          component={Terms}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/reports"
          component={ReportsPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/nothing"
          component={NothingPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/moduloInventario"
          component={InventarioPage}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/moduloReportes"
          component={ReportsPageMod}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/moduloFarmacia"
          component={FarmacyPage}
        />
      </Switch>
    </div>
  );
};
