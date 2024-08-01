import {
	Box,
	styled,
	BoxProps,
	CardActionArea,
	CardActionAreaProps,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

// Define the type for FooterContainer
export const HeroWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
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
		backgroundImage: "url('/assets/image-1.jpg')",
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

export const HeroContainer: StyledComponent<BoxProps & { theme?: Theme }> =
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

export const HeroGrid: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	display: "grid",
	width: "100vw",
	gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
	padding: "0px 64px",
	maxWidth: "1440px",
	gap: "16px",
}));

export const HeroCard: StyledComponent<
	CardActionAreaProps & { theme?: Theme }
> = styled(CardActionArea)(() => ({
	borderRadius: "4px",
	padding: "12px",
}));
