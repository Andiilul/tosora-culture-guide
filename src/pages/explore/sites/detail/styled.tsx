import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const SiteDetailWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	}));
export const SiteHeroWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
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
			padding: "48px",
			height:"max-content",
			minHeight:"540px"

		},
		["@media (max-width: 640px)"]: {
			padding: "16px",
			height:"max-content",
			minHeight:"360px"

		},
	}));

export const SiteHeroContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		position: "relative",
		zIndex: "1",
		display: "flex",
		flex: "1",
		flexDirection: "column",
		maxWidth: "1980px",
		alignItems: "center",
		justifyContent: "center",
	}));
export const SiteHeroContent: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		flexDirection: "column",
		gap: "12px",
		alignItems: "center",
		justifyContent: "center",
	}));

export const SiteDetailContent: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		padding: "64px 96px",
		flexDirection: "column",
		gap: "24px",
		width: "100%",
		['@media (max-width: 1024px)']: {
		padding:"32px"
		},
		['@media (max-width: 640px)']: {
			padding:"32px 16px"
		
		},
	}));
