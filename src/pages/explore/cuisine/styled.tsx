import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const CuisineLists: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "grid",
		gap: "12px",
		gridTemplateColumns: "repeat(5,minmax(0,1fr))",
	}));
