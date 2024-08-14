import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const HeroSection: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		position: "relative",
		display: "flex",
		width: "100%",
		backgroundSize: "cover",
		justifyContent: "center",
		backgroundPosition: "center",
		"&::before": {
			content: '""',
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.7)", // Black with 80% opacity
			zIndex: 1,
		},
	}));

export const WhiteHeroSection: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		position: "relative",
		display: "flex",
		width: "100%",
		backgroundSize: "cover",
		justifyContent: "center",
		backgroundPosition: "center",
		"&::before": {
			content: '""',
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 1,
			backgroundColor: "rgba(0, 0, 0, 0.85)", // Black with 80% opacity

		},
	}));
