import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import "./App.css";
import { useThemeContext } from "./themes/ThemeContextProvider";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { Home } from "./pages/home/page";
import { Explore } from "./pages/explore/page";
import { NotFound } from "./pages/_notfound/page";
import { MainLayout } from "./components/_layout/layout";
import { Sites } from "./pages/explore/sites/page";
import { AuthPage } from "./pages/admin/auth/auth";
import { ProtectedRoute } from "./components/protectedRoute/ProtectedRoute";
import { AdminSites } from "./pages/admin/sites/page";
import AdminSitesForm from "./pages/admin/sites/Form";
import { SiteDetail } from "./pages/explore/sites/detail/page";

function App() {
	const { theme } = useThemeContext();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route element={<ProtectedRoute type="login" />}>
						<Route path="/admin/auth" element={<AuthPage />} />
					</Route>
					<Route element={<ProtectedRoute type="admin" />}>
						<Route path="/admin" element={<MainLayout admin />}>
							<Route path="" element={<Navigate to="/admin/dashboard" />} />{" "}
							<Route path="dashboard" element={"Dashboard"} />
							<Route path="sites" element={<AdminSites />} />
							<Route path="sites/add" element={<AdminSitesForm />} />
							<Route
								path="sites/site/:id/edit"
								element={<AdminSitesForm isedit />}
							/>
							<Route path="culture" element={"Culture"} />
							<Route path="blog" element={"Blog"} />
						</Route>
					</Route>
					<Route element={<MainLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/explore" element={<Explore />} />
						<Route path="/explore/sites" element={<Sites />} />
						<Route path="/explore/sites/:id" element={<SiteDetail />} />
					</Route>
					<Route element={<MainLayout />}>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
