import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
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
import CustomerRegister from "../pages/CustomerRegister/CustomerRegister";
import DeposittypeRegister from "../pages/DeposittypeRegister/DeposittypeRegister";
import OrderSlip from "../pages/OrderSlip/OrderSlip";

const Routes = () => {
	const { token } = useAuth();

	// Define public routes accessible to all users
	const routesForPublic = [
		{
			path: "/service",
			element: <div>Service Page</div>,
		},
		{
			path: "/about-us",
			element: <div>About Us</div>,
		},
		// "Not Found" route
    {
      path: "*",
      element: <Navigate to="/home" />,
    },
	];

	// Define routes accessible only to authenticated users
	const routesForAuthenticatedOnly = [
		{
			element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
			children: [
				{
					path: "/home",
					element: <div>User Home Page</div>,
				},
				{
					path: "/profile",
					element: <div>User Profile</div>,
				},
				{
					path: "/logout",
					element: <div>Logout</div>,
				},
				{
					path: "/product_register",
					element: <ProductRegister />
				},
				{
					path: "/color_register",
					element: <ColorRegister />
				},
				{
					path: "/size_register",
					element: <SizeRegister />
				},
				{
					path: "/season_register",
					element: <SeasonRegister />
				},
				{
					path: "/brand_register",
					element: <BrandRegister />
				},
				{
					path: "/item_register",
					element: <ItemRegister />
				},
				{
					path: "/material_register",
					element: <MaterialRegister />
				},
				{
					path: "/delivery_register",
					element: <DeliveryRegister />
				},
				{
					path: "/charger_register",
					element: <ChargerRegister />
				},
				{
					path: "/dealer_register",
					element: <DealerRegister />
				},
				{
					path: "/exhibition_register",
					element: <ExhibitionRegister />
				},
				{
					path: "/incoming_department_register",
					element: <IncomingDepartmentRegister />
				},
				{
					path: "/origin_country_register",
					element: <OriginCountryRegister />
				},
				{
					path: "/storehouse_register",
					element: <StorehouseRegister />
				},
				{
					path: "/customer_register",
					element: <CustomerRegister />
				},
				{
					path: "/deposittype_register",
					element: <DeposittypeRegister />
				},
				{
					path: "/order_slip",
					element: <OrderSlip />
				}
			],
		},
	];

	// Define routes accessible only to non-authenticated users
	const routesForNotAuthenticatedOnly = [
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/signup",
			element: <SignUp />
		}
	];

	// Combine and conditionally include routes based on authentication status
	const router = createBrowserRouter([
		...routesForPublic,
		...(!token ? routesForNotAuthenticatedOnly : []),
		...routesForAuthenticatedOnly,
	]);

	// Provide the router configuration using RouterProvider
	return <RouterProvider router={router} />;
};

export default Routes;