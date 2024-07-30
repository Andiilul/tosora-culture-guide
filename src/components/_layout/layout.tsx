import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Drawer,
	IconButton,
	useTheme,
} from "@mui/material";
import { Footer } from "./footer";
import { Outlet } from "react-router-dom";
import { ScrollTop } from "./scrollTop";
import { Navbar } from "./navbar";
import { useState } from "react";
import { Close, Menu } from "@mui/icons-material";
import ThemeToggle from "./theme-toggle/ThemeToggle";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";


export interface MainLayoutProps {
	admin?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ admin = false }) => {
	const [openLogOut, setOpenLogOut] = useState<boolean>(false);
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const width = "220px";

	const handleLogOut = () => {
		signOut(auth)
			.then(() => {
				console.log("Logged Out");
			})
			.catch((error) => {
				console.error("Error signing out: ", error);
			});
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const margin = "32px";

	if (admin) {
		return (
			<Box display={"flex"}>
				<Drawer onClose={handleDrawerClose} open={open} variant="persistent">
					<Box width={width} display={"flex"}>
						<IconButton onClick={handleDrawerClose}>
							<Close />
						</IconButton>
						<ThemeToggle />
					</Box>
				</Drawer>
				<Box
					height={"100vh"}
					sx={{
						marginLeft: open ? width : 0,
						transition: "200ms",
					}}
					display={"flex"}
					flexDirection={"column"}
					flex={1}
					width={"100vw"}
				>
					<Box
						display={"flex"}
						justifyContent={"space-between"}
						padding={"12px"}
						bgcolor={theme.palette.background.paper}
					>
						<Box display={"flex"}>
							<IconButton
								sx={{
									width: open ? "0px" : "max-content",
									transition: "200ms",
								}}
								onClick={handleDrawerOpen}
							>
								<Menu
									sx={{
										fontSize: open ? "0" : "24px",
										transition: "200ms",
									}}
								/>
							</IconButton>
						</Box>

						<Button onClick={() => setOpenLogOut(true)} variant="outlined">
							Sign out
						</Button>
					</Box>
					<Box padding={"24px"} sx={{ overflowY: "auto" }}>
						<Box>
							<Outlet />
						</Box>
					</Box>
				</Box>
				<Dialog open={openLogOut} onClose={() => setOpenLogOut(false)}>
					<DialogTitle fontSize={"16px"} id="alert-dialog-title">
						Confirm Sign Out
					</DialogTitle>
					<DialogActions>
						<Button onClick={() => setOpenLogOut(false)}>Cancel</Button>
						<Button onClick={handleLogOut} autoFocus>
							Sign Out
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		);
	}

	if (!admin) {
		return (
			<>
				<Navbar />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
						position: "relative",
					}}
				>
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
						<ScrollTop />
					</Box>
				</Box>
			</>
		);
	}
};
