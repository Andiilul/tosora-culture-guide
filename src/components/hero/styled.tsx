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
	styled(Box)(({ theme }) => ({
		minHeight: "100vh",
		display: "flex",
		justifyContent: "center",
		// maxHeight: "1080px",
		alignItems: "center",
		flexDirection: "column",
		backgroundPosition: "bottom",
		backgroundImage:
			"linear-gradient(to top, rgba(0,0,0,0.9),rgba(0,0,0,0.75))",
		position: "relative",
		color: theme.palette.primary.main,
		["@media (max-width: 1024px)"]: {},
		["@media (max-width: 768px)"]: {},
	}));

export const HeroImages: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)({
	position: "absolute",
	zIndex: "-10",
	height: "100vh",
	width: "100vw",
	backgroundPosition: "center",
	backgroundImage: `url("/assets/image-1.jpg")`,
	backgroundSize: "cover",
});

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
