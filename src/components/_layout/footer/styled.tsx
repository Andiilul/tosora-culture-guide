import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

// Define the type for FooterContainer
export const FooterWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(({ theme }) => ({
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		width: "100vw",
		padding: "32px 64px",
		display: "flex",
		justifyContent: "center",
	}));

export const FooterContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "grid",
		gridTemplateColumns: "repeat(4 , minmax(0,1fr))",
		maxWidth: "1280px",
	}));

export const FooterBox: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	padding: "16px",
	gap: "12px",
}));

export const FooterLeft: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	FooterBox
)(() => ({
	display: "flex",
	flexDirection: "column",
}));

export const QuickLinks: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "4px",
	fontWeight: "400",
	fontSize: "16px",
}));

export const FooterMid: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	FooterBox
)(() => ({
	display: "flex",
	flexDirection: "column",
}));

export const FooterRight: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(FooterBox)(() => ({
		display: "flex",
		flexDirection: "column",
	}));
