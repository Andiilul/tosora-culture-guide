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
import { NotFound } from "./pages/_notfound/page";
import { MainLayout } from "./components/_layout/layout";
import { Sites } from "./pages/explore/sites/page";
import { AuthPage } from "./pages/admin/_auth/auth";
import { ProtectedRoute } from "./components/protectedRoute/ProtectedRoute";
import { AdminSites } from "./pages/admin/sitesAdmin/page";
import AdminSitesForm from "./pages/admin/sitesAdmin/Form";
import { SiteDetail } from "./pages/explore/sites/detail/page";
import AdminCuisineForm from "./pages/admin/cuisineAdmin/Form";
import { AdminCuisine } from "./pages/admin/cuisineAdmin/page";
import { AdminLocalKnowledge } from "./pages/admin/localAdmin/page";
import AdminLocalKnowledgeForm from "./pages/admin/localAdmin/Form";
import AdminEntertainmentForm from "./pages/admin/entertainmentAdmin/Form";
import { AdminEntertainment } from "./pages/admin/entertainmentAdmin/page";
import { AdminCulture } from "./pages/admin/cultureAdmin/page";
import { AdminWorks } from "./pages/admin/worksAdmin/page";
import AdminWorksForm from "./pages/admin/worksAdmin/Form";
import AdminCultureForm from "./pages/admin/cultureAdmin/Form";
import { Cuisine } from "./pages/explore/cuisine/page";
import AdminJournalForm from "./pages/admin/journalAdmin/page";
import { CuisineDetail } from "./pages/explore/cuisine/detail/page";
import { Culture } from "./pages/explore/culture/page";
import { Works } from "./pages/explore/works/page";

function App() {
	const { theme } = useThemeContext();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					{/* Admin Route */}
					<Route element={<ProtectedRoute type="login" />}>
						<Route path="/admin/auth" element={<AuthPage />} />
					</Route>
					<Route element={<ProtectedRoute type="admin" />}>
						<Route path="/admin" element={<MainLayout admin />}>
							<Route path="" element={<Navigate to="/admin/dashboard" />} />{" "}
							<Route path="dashboard" element={"Dashboard"} />
							{/*1. Situs */}
							<Route path="sites" element={<AdminSites />} />
							<Route path="sites/add" element={<AdminSitesForm />} />
							<Route
								path="sites/edit/:id"
								element={<AdminSitesForm isedit />}
							/>
							{/*2. Karya */}
							<Route path="works" element={<AdminWorks />} />
							<Route path="works/add" element={<AdminWorksForm />} />{" "}
							<Route
								path="works/edit/:id"
								element={<AdminWorksForm isedit />}
							/>
							{/*3. Kebudayaan */}
							<Route path="cultures" element={<AdminCulture />} />
							<Route path="cultures/add" element={<AdminCultureForm />} />{" "}
							<Route
								path="cultures/edit/:id"
								element={<AdminCultureForm isedit />}
							/>
							{/*4. Pengetahuan Lokal */}
							<Route path="wisdoms" element={<AdminLocalKnowledge />} />
							<Route path="wisdoms/add" element={<AdminLocalKnowledgeForm />} />
							<Route
								path="wisdoms/edit/:id"
								element={<AdminLocalKnowledgeForm isedit />}
							/>
							{/*5. Kuliner */}
							<Route path="cuisine" element={<AdminCuisine />} />
							<Route path="cuisine/add" element={<AdminCuisineForm />} />{" "}
							<Route
								path="cuisine/edit/:id"
								element={<AdminCuisineForm isedit />}
							/>
							{/* Seni dan Hiburan */}
							<Route path="entertainment" element={<AdminEntertainment />} />
							<Route
								path="entertainment/add"
								element={<AdminEntertainmentForm />}
							/>
							<Route
								path="entertainment/edit/:id"
								element={<AdminEntertainmentForm isedit />}
							/>
							<Route path="journal" element={<AdminJournalForm />} />
							{/* <Route path="blog" element={"Blog"} />
							<Route path="blog/add" element={"Blog"} />{" "}
							<Route
								path="blogs/blog/:id/edit"
								element={<AdminSitesForm isedit />}
							/> */}
						</Route>
					</Route>

					{/* User Route */}
					<Route element={<MainLayout />}>
						<Route path="/" element={<Home />} />
						{/* Sites */}
						<Route path="/explore/sites" element={<Sites />} />
						<Route path="/explore/sites/:id" element={<SiteDetail />} />
						{/* Works */}
						<Route path="/explore/works" element={<Works />} />
						<Route path="/explore/works/:id" element={<SiteDetail />} />
						{/* Culture */}
						<Route path="/explore/cultures" element={<Culture />} />
						<Route path="/explore/cultures/:id" element={<SiteDetail />} />
						{/* Local Knowledfe */}
						<Route path="/explore/wisdoms" element={<Sites />} />
						<Route path="/explore/wisdoms/:id" element={<SiteDetail />} />
						{/* Cuisines */}
						<Route path="/explore/cuisines" element={<Cuisine />} />
						<Route path="/explore/cuisines/:id" element={<CuisineDetail />} />
						{/* Arts and Entertainments */}
						<Route path="/explore/entertainments" element={<Sites />} />
						<Route path="/explore/entertainments /:id" element={<SiteDetail />} />
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
