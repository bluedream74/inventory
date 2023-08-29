import { RouterProvider, createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from '../pages/Auth/Login';
import SignUp from "../pages/Auth/SIgnUp";
import ProductRegister from "../pages/ProductRegister/ProductRegister";
import ColorRegister from "../pages/ColorRegister/ColorRegister";
import SizeRegister from "../pages/SizeRegister/SizeRegister";
import SeasonRegister from "../pages/SeasonRegister/SeasonRegister";
import BrandRegister from "../pages/BrandRegister/BrandRegister";
import ItemRegister from "../pages/ItemRegister/ItemRegister";
import MaterialRegister from "../pages/MaterialRegister/MaterialRegister";
import DeliveryRegister from "../pages/DeliveryRegister/DeliveryRegister";
import ChargerRegister from "../pages/ChargerRegister/ChargerRegister";
import DealerRegister from "../pages/DealerRegister/DealerRegister";
import ExhibitionRegister from "../pages/ExhibitionRegister/ExhibitionRegister";
import IncomingDepartmentRegister from "../pages/IncomingDepartmentRegister/IncomingDepartmentRegister";
import OriginCountryRegister from "../pages/OriginCountry/OriginCountryRegister";
import StorehouseRegister from "../pages/StorehouseRegister/StorehouseRegister";
import EntrustRegister from "../pages/EntrustRegister/EntrustRegister";
import DeposittypeRegister from "../pages/DeposittypeRegister/DeposittypeRegister";
import OrderSlip from "../pages/OrderSlip/OrderSlip";
import { AuthLayout } from "../layouts/AuthLayout";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Home } from "../pages/Home";
import { ConsignmentSlip } from "../pages/ConsignmentSlip";
import { DepositSlip } from "../pages/DepositSlip";
import { PurchaseOrderSlip } from "../pages/purchaseOrderSlip";
import { PurchaseSlip } from "../pages/purchaseSlip";
import { CollectionSlip } from "../pages/CollectionSlip";
import { PaymentSlip } from "../pages/PaymentSlip";
import { SaleSlip } from "../pages/SaleSlip";
import FactoryRegister from "../pages/FactoryRegister/FactoryRegister";
import { ProductLedger } from "../pages/Product_ledger";


export const Router = () => {
  return (
    <Routes>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route path="" element={<DefaultLayout />}>
        {/* begin register */}
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path="product_register" element={<ProductRegister />} />
        <Route path="color_register" element={<ColorRegister />} />
        <Route path="size_register" element={<SizeRegister />} />
        <Route path="season_register" element={<SeasonRegister />} />
        <Route path="brand_register" element={<BrandRegister />} />
        <Route path="material_register" element={<MaterialRegister />} />
        <Route path="size_register" element={<SizeRegister />} />      
        <Route path="delivery_register" element={<DeliveryRegister />} />   
        <Route path="origin_country_register" element={<OriginCountryRegister />} />
        <Route path="item_register" element={<ItemRegister />} />
        <Route path="entrust_register" element={<EntrustRegister />} />
        <Route path="storehouse_register" element={<StorehouseRegister />} />
        <Route path="factory_register" element={<FactoryRegister />} />

        {/* begin Exhibition Sales  */}
        <Route path="charger_register" element={<ChargerRegister />} />
        <Route path="dealer_register" element={<DealerRegister />} />
        <Route path="exhibition_register" element={<ExhibitionRegister />} />
        <Route path="incomingdepartment_register" element={<IncomingDepartmentRegister />} />
        <Route path="deposittype_register" element={<DeposittypeRegister/>}/>
        {/* begin slip */}
        <Route path="product_ledger" element={<ProductLedger />} />
        <Route path="order_slip" element={<OrderSlip />} />
        <Route path="consignment_slip" element={<ConsignmentSlip />} />
        <Route path="sale_slip" element={<SaleSlip />} />
        <Route path="deposit_slip" element={<DepositSlip />} />
        <Route path="purchase_order_slip" element={<PurchaseOrderSlip />} />
        <Route path="purchase_slip" element={<PurchaseSlip />} />
        <Route path="collection_slip" element={<CollectionSlip />} />
        <Route path="payment_slip" element={<PaymentSlip />} />
      </Route>

    </Routes>
  )

}