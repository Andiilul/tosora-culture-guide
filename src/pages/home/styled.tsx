import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const HomeContentWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(({ theme }) => ({
		display: "flex",
		width: "100vw",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		backgroundColor: theme.palette.background.default,
	}));
export const HomeContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		padding: "32px 32px",
		width: "100%",
		flexDirection: "column",
		// backgroundColor:"green",
		alignItems: "center",
		maxWidth: "1980px",
		['@media (max-width: 1024px)']: {
		padding:"16px 16px"
		},
		['@media (max-width: 768px)']: {
		padding:"8px 8px"
		},
	}));

export const IntroSection: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		// backgroundColor:"yellow",
		display: "grid",
		gridTemplateColumns: "repeat(2,minmax(0,1fr))",
		padding: "128px 64px",
		// backgroundColor:"grey"
		['@media (max-width: 1024px)']: {
			gridTemplateColumns: "repeat(1,minmax(0,1fr))",
			gap:"32px",
			paddding:"64px 32px"
		},
		['@media (max-width: 768px)']: {
			padding:"32px 16px"
		},
	}));

export const SpiritualSection: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		position: "relative",
		display: "flex",
		width: "100%",
		backgroundSize: "cover",
		justifyContent:"center",
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
export const CardImage: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	borderRadius: "4px",
	height:"400px",
	backgroundColor: "white",
	overflow: "hidden",
	"& img": {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
	['@media (max-width: 1024px)']: {
		height:"200px",
	},
	['@media (max-width: 768px)']: {
		height:"100px",
	},
}));
