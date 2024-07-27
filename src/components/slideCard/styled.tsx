import { Box, styled, BoxProps, CardActionArea, CardActionAreaProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const SliderWrapper: StyledComponent<CardActionAreaProps & { theme?: Theme }> =
	styled(CardActionArea)(() => ({
		minWidth: "160px",
		height:"240px",
		position: "relative",
		overflow: "hidden", // Ensure the overlay doesn't overflow the wrapper
		boxShadow: "2px 4px 3px 2px rgba(0, 0, 0, 0.25)",	
	}));

export const Overlay: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	
}));
