import { Typography, useTheme } from "@mui/material";
import { NavbarWrapper, NavbarMenuList, NavbarContainer } from "./styled";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import { navbarMenu } from "../../../mock/menu";
import { useEffect, useState } from "react";
import { NavTo } from "../../navigate/NavTo";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
	const theme = useTheme();
	const [scrolled, setScrolled] = useState(false);

	const handleScroll = () => {
		const offset = window.scrollY;
		if (offset > 10) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
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
				backgroundColor: scrolled
					? theme.palette.common.white
					: "transparent",
				transition: "background-color 0.3s ease",
			}}
		>
			<NavbarContainer>
				<Typography
					fontFamily={"Rokkitt"}
					color={!scrolled ? "white" : theme.palette.text.primary}
					fontSize={"24px"}
				>
					CultureGuide
				</Typography>
				<NavbarMenuList display={"flex"}>
					{navbarMenu.map((nav, index) => (
						<NavTo href={nav.link}>
							<Typography
								color={!scrolled ? "white" : theme.palette.text.primary}
								fontFamily={"Poppins"}
								fontSize={"14px"}
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
						</NavTo>
					))}
				</NavbarMenuList>
				<ThemeToggle />
			</NavbarContainer>
		</NavbarWrapper>
	);
};
