import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const SiteDetailWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		position: "relative",
		padding: "64px 128px",
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
	}));

export const SiteDetailContainer: StyledComponent<BoxProps & { theme?: Theme }> =
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

export const SiteDetailContent: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		width: "100%",
		height: "max-content",
		display: "grid",
		gap: "24px",
		gridTemplateColumns: "repeat(2,minmax(0,1fr))",
	}));
