import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const LayoutContentWrapper: StyledComponent<
	BoxProps & { theme?: Theme }
> = styled(Box)(({ theme }) => ({
	display: "flex",
	width: "100vw",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	backgroundColor: theme.palette.background.default,
}));

export const LayoutContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		padding: "32px 96px",
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		// backgroundColor:"green",
		maxWidth: "1980px",
		["@media (max-width: 1024px)"]: {
			padding: "32px 48px",
		},
		["@media (max-width: 640px)"]: {
			padding: "32px 16px",
		},
	}));

export const LayoutContentWrapperPlain: StyledComponent<
	BoxProps & { theme?: Theme }
> = styled(Box)(() => ({
	display: "flex",
	width: "100vw",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	// backgroundColor: theme.palette.background.default,
}));
