import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const SiteWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		position: "relative",
		padding: "64px 96px",
		height: "100vh",
		maxHeight: "720px",
		justifyContent: "Center",
		alignItems: "center",
		width: "100%",
		backgroundSize: "cover",
		backgroundPosition: "center",
		"&::before": {
			content: '""',
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.6)",
			zIndex: 1,
		},
		["@media (max-width: 1024px)"]: {
			minHeight: "640px",

			height: "max-content",
			padding: "48px",
		},
		["@media (max-width: 640px)"]: {
			minHeight: "360px",
			height: "max-content",
			padding: "16px",
		},
	}));

export const SiteContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		// backgroundColor: "rgba(255,255,255,0.4)",
		position: "relative",
		zIndex: "1",
		display: "flex",
		flex: "1",
		flexDirection: "column",
		maxWidth: "1980px",
		alignItems: "center",
		justifyContent: "center",
	}));

export const SiteContent: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		width: "100%",
		height: "max-content",
		display: "grid",
		gap: "24px",
		gridTemplateColumns: "repeat(2,minmax(0,1fr))",
		["@media (max-width: 1024px)"]: {},
		["@media (max-width: 640px)"]: {
			gridTemplateColumns: "repeat(1,minmax(0,1fr))",
			gap: "12px",
		},
	}));

export const CarouselContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		flex: "1",
		padding: "24px 0px",
		display: "flex",
		gap: "20px",
		overflowY: "visible",
		overflowX: "auto",
		userSelect: "none",
		scrollbarWidth: "none", // Hide scrollbar for Firefox
		"&::-webkit-scrollbar": {
			display: "none", // Hide scrollbar for Chrome, Safari, and Opera
		},
	}));
