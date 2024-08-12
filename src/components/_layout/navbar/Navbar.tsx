import { Box, Link, Typography, useTheme } from "@mui/material";
import { NavbarWrapper, NavbarMenuList, NavbarContainer } from "./styled";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import { navbarMenu } from "../../../mock/menu";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
	const path = useLocation().pathname;
	const theme = useTheme();
	const [scrolled, setScrolled] = useState(false);

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

	return (
		<NavbarWrapper
			sx={{
				backgroundColor:
					path !== "/"
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
					fontSize={"24px"}
				>
					CultureGuide
				</Typography>
				<NavbarMenuList display={"flex"}>
					{navbarMenu.map((nav, index) => (
						<Link
							key={nav.link}
							href={nav.link}
							sx={{
								textDecoration: "none",
							}}
						>
							<Box
								component={"div"}
								// onMouseEnter={() => console.log("Hovered")}
								// onMouseLeave={() => console.log("Leaving")}
							>
								<Typography
									color={
										path === "/" && !scrolled
											? "white"
											: theme.palette.text.primary
									}
									fontFamily={"Poppins"}
									fontSize={"12px"}
									fontWeight={"300"}
									key={index}
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
						</Link>
					))}
				</NavbarMenuList>
				<ThemeToggle />
			</NavbarContainer>
		</NavbarWrapper>
	);
};
