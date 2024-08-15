import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { NavbarWrapper, NavbarMenuList, NavbarContainer } from "./styled";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navbarMenu } from "../../../mock/menu";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
	const path = useLocation().pathname;
	const navigate = useNavigate();
	const theme = useTheme();
	const [scrolled, setScrolled] = useState(false);
	const scrollTargetRef = useRef<string | null>(null);

	const handleScroll = () => {
		const offset = window.scrollY;
		setScrolled(offset > 10);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleMenuClick = (scrollTarget: string) => {
		if (path !== "/") {
			// Save the target in a ref and navigate to the home page
			scrollTargetRef.current = scrollTarget;
			navigate("/");
		} else {
			// Scroll to the section on the current page
			scrollToTarget(scrollTarget);
		}
	};

	const scrollToTarget = (scrollTarget: string) => {
		const element = document.getElementById(scrollTarget);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		// When path changes to "/", check if there's a scroll target to move to
		if (path === "/" && scrollTargetRef.current) {
			scrollToTarget(scrollTargetRef.current);
			scrollTargetRef.current = null; // Reset after scrolling
		}
	}, [path]);

	const medium = useMediaQuery("(max-width:1024px)");
	const small = useMediaQuery("(max-width:640px)");
	return (
		<NavbarWrapper
			sx={{
				backgroundColor:
					path !== "/" && path !== "/explore"
						? theme.palette.common.white
						: scrolled
						? theme.palette.common.white
						: "transparent",
				transition: "background-color 0.3s ease",
				position: path === "/" ? "fixed" : "sticky",
				top: "0",
			}}
		>
			<NavbarContainer>
				<Typography
					fontFamily={"Rokkitt"}
					color={
						path === "/" && !scrolled ? "white" : theme.palette.text.primary
					}
					fontSize={small ? "14px" : medium ? "16px" : "24px"}
				>
					CultureGuide
				</Typography>
				<NavbarMenuList display={"flex"}>
					{navbarMenu.map((nav, index) => (
						<Box
							component="div"
							key={index}
							onClick={() => handleMenuClick(nav.scroll)}
							sx={{
								cursor: "pointer",
							}}
						>
							<Typography
								color={
									path === "/" && !scrolled
										? "white"
										: theme.palette.text.primary
								}
								fontFamily={"Poppins"}
								fontSize={small ? "8px" : medium ? "10px" : "12px"}
								fontWeight={"300"}
								sx={{
									":hover": {
										color: theme.palette.primary.main,
										transition: "ease-in-out 300ms",
									},
									transition: "300ms",
								}}
							>
								{nav.name}
							</Typography>
						</Box>
					))}
				</NavbarMenuList>
				<ThemeToggle />
			</NavbarContainer>
		</NavbarWrapper>
	);
};
