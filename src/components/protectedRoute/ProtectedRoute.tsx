import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebaseConfig";

interface ProtectedRouteProps {
	type: "admin" | "login";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ type }) => {
	const [logged, setLogged] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setLogged(!!user);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	if (loading) {
		return <div>Authenticating...</div>;
	}

	if (type === "admin") {
		return logged ? <Outlet /> : <Navigate to="/admin/auth" />;
	} else {
		return !logged ? <Outlet /> : <Navigate to="/admin/dashboard" />;
	}
};
