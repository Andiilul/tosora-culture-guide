import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const ExploreContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		padding: "32px 96px",
		width: "100%",
		flexDirection: "column",
		// alignItems: "flex-star t",
		backgroundColor: "rgba(255,255,255,0.3)",
		maxWidth: "1980px",
	}));
