import {
	Box,
	styled,
	BoxProps,

} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const HomeContentWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(({ theme }) => ({
		display: "flex",
		width: "100vw",
		padding: "32px 64px",
		justifyContent: "center",
		backgroundColor: theme.palette.background.default,
	}));
export const HomeContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		width: "100%",
		flexDirection: "column",
		// backgroundColor:"yellow",
		alignItems: "center",
		maxWidth: "1280px",
	}));

export const IntroSection: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		gap: "72px",
		padding: "32px",
	}));

export const Sites: StyledComponent<BoxProps & { theme?: Theme }> =
styled(Box)(() => ({

}));