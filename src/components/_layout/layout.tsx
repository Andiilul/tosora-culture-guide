import { Box } from "@mui/material";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Outlet } from "react-router-dom";
import { ScrollTop } from "./scrollTop";

export const MainLayout: React.FC = () => {
	const margin = "32px";
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				overflowX: "hidden",
				position: "relative",
			}}
		>
			<Navbar />
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Outlet />
			</Box>
			<Footer />
			<Box
				sx={{
					position: "fixed",
					bottom: margin,
					right: margin,
				}}
			>
				<ScrollTop/>
			</Box>
		</Box>
	);
};
