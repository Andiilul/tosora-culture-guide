import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import "./App.css";
import { useThemeContext } from "./themes/ThemeContextProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/page";
import { Explore } from "./pages/explore/page";
import { NotFound } from "./pages/_notfound/page";
import { MainLayout } from "./components/_layout/layout";
import { Navbar } from "./components/_layout/navbar";
import { Sites } from "./pages/explore/sites/page";

function App() {
	const { theme } = useThemeContext();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Navbar />
				<Routes>
					<Route element={<MainLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/explore" element={<Explore />} />
						<Route path="/explore/sites" element={<Sites />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
