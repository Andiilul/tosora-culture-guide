import {
	Box,
	Button,
	CardActionArea,
	Dialog,
	DialogActions,
	DialogTitle,
	Drawer,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Footer } from "./footer";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollTop } from "./scrollTop";
import { Navbar } from "./navbar";
import { useState } from "react";
import {
	AccountBalanceOutlined,
	Book,
	Close,
	ColorLens,
	DashboardOutlined,
	Dining,
	Diversity2Outlined,
	Menu,
	Psychology,
	SportsEsports,
} from "@mui/icons-material";
import ThemeToggle from "./theme-toggle/ThemeToggle";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export interface MainLayoutProps {
	admin?: boolean;
}

const adminMenu = [
	{
		name: "Dashboard",
		link: "/admin/dashboard",
		icon: <DashboardOutlined />,
	},
	{
		name: "Situs Budaya",
		link: "/admin/sites",
		icon: <AccountBalanceOutlined />,
	},
	{
		name: "Manuskrip dan Tradisi Lisan",
		link: "/admin/works",
		icon: <ColorLens />,
	},
	{
		name: "Kebudayaan",
		link: "/admin/cultures",
		icon: <Diversity2Outlined />,
	},
	{
		name: "Pengetahuan Lokal",
		link: "/admin/wisdoms",
		icon: <Psychology />,
	},
	{
		name: "Kuliner",
		link: "/admin/cuisine",
		icon: <Dining />,
	},
	{
		name: "Kesenian dan Hiburan",
		link: "/admin/entertainment",
		icon: <SportsEsports />,
	},
	{
		name: "Jurnal Demokrasi",
		link: "/admin/journal",
		icon: <Book />,
	},
];

export const MainLayout: React.FC<MainLayoutProps> = ({ admin = false }) => {
	const [openLogOut, setOpenLogOut] = useState<boolean>(false);
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const width = "280px";
	const path = useLocation();

	const small = useMediaQuery("(max-width:640px)");

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
		if (small) {
			return (
				<Box
						width={"100vw"}
						padding={"12px"}
						textAlign={"center"}
						height={"100vh"}
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
					>
				<Box display={"flex"} flexDirection={"column"}>
						Tidak Kompatibel Dengan Device Layar Kecil
					</Box>
					<Button href="/">Home</Button>
					
				</Box>
			);
		} else {
			return (
				<Box display={"flex"}>
					<Drawer onClose={handleDrawerClose} open={open} variant="persistent">
						<Box
							padding={"10px 14px"}
							width={width}
							display={"flex"}
							bgcolor={theme.palette.background.default}
							flexDirection={"column"}
							boxShadow={"0 2px 2px 0 rgba(0,0,0,0.3)"}
						>
							<Box
								display={"flex"}
								justifyContent={"space-between"}
								alignItems={"center"}
							>
								{/* <ThemeToggle /> */}
								<Typography fontFamily={"Rokkitt"} fontSize={"18px"}>
									CultureGuide
								</Typography>
								<IconButton onClick={handleDrawerClose}>
									<Close />
								</IconButton>
							</Box>
						</Box>
						<Box
							flex={1}
							// bgcolor={"white"}
							sx={{
								overflowY: "auto",
								display: "flex",

								flexDirection: "column",
								gap: "12px",
							}}
						>
							{adminMenu.map((map, index) => (
								<CardActionArea href={map.link} key={index}>
									<Box
										padding={"8px 16px"}
										display={"flex"}
										gap={"8px"}
										alignItems={"center"}
									>
										<Typography
											color={
												path.pathname === map.link
													? theme.palette.primary.main
													: theme.palette.text.primary
											}
											fontFamily={"Poppins"}
											fontSize={"14px"}
										>
											{map.icon}
										</Typography>
										<Typography
											color={
												path.pathname === map.link
													? theme.palette.primary.main
													: theme.palette.text.primary
											}
											fontFamily={"Poppins"}
											fontSize={"14px"}
										>
											{map.name}
										</Typography>
									</Box>
								</CardActionArea>
							))}
							<Box padding={"16px"}>
								<ThemeToggle />
							</Box>
						</Box>
					</Drawer>
					<Box
						// bgcolor={"blue"}
						width={"100%"}
						display={"flex"}
						justifyContent={"flex-end"}
					>
						<Box
							height={"100vh"}
							// bgcolor={"red"}
							sx={{
								width: open ? `calc(100% - ${width})` : "100%",
								transition: "200ms",
							}}
							display={"flex"}
							flexDirection={"column"}
						>
							<Box
								display={"flex"}
								justifyContent={"space-between"}
								padding={"12px"}
								bgcolor={theme.palette.background.paper}
							>
								<Box display={"flex"} alignItems={"center"} gap={"12px"}>
									<IconButton
										disabled={open}
										sx={{
											color: open ? "transparent" : "white",

											transition: "200ms",
										}}
										onClick={handleDrawerOpen}
									>
										<Menu
											color="primary"
											sx={{
												fontSize: open ? "0" : "24px",
												transition: "200ms",
											}}
										/>
									</IconButton>
									<Typography>Dashboard </Typography>
								</Box>
								<Box>
									<Button
										onClick={() => setOpenLogOut(true)}
										variant="outlined"
									>
										Sign out
									</Button>
								</Box>
							</Box>
							<Box padding={"24px"} sx={{ overflowY: "auto" }}>
								<Box>
									<Outlet />
								</Box>
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
