import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from '../pages/Auth/Login';
import SignUp from "../pages/Auth/SIgnUp";
import { Navigation } from "@mui/icons-material";

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