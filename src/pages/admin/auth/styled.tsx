import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const AuthWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(({ theme }) => ({
		backgroundColor: theme.palette.background.default,
		width: "100vw",
		minHeight: "100vh",
		padding: "64px 96px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	}));

export const AuthContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		maxWidth: "1440px",
		flexDirection: "row",
		boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.4)",
	}));

export const AuthForm: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	display: "flex",
	flexDirection: "column",
	color: "#222222",
	flex: "1",
	gap: "24px",
	padding: "48px",
	minWidth: "360px",
}));
