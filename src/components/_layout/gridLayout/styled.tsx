import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";
export const TwoGrid: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	display: "grid",
	gap: "12px",
	gridTemplateColumns: "repeat(2,minmax(0,1fr))",
	["@media (max-width: 640px)"]: {
		gridTemplateColumns: "repeat(1,minmax(0,1fr))",
	},
}));

export const ThreeGrid: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	display: "grid",
	gap: "12px",
	gridTemplateColumns: "repeat(3,minmax(0,1fr))",
	["@media (max-width: 1024px)"]: {
		gap: "8px",
		gridTemplateColumns: "repeat(2,minmax(0,1fr))",
	},
	["@media (max-width: 640px)"]: {
		gridTemplateColumns: "repeat(2,minmax(0,1fr))",
		gap: "4px",
	},
}));
export const FourGrid: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	display: "grid",
	gap: "12px",
	gridTemplateColumns: "repeat(4,minmax(0,1fr))",
	["@media (max-width: 1024px)"]: {
		gap: "8px",
		gridTemplateColumns: "repeat(2,minmax(0,1fr))",
	},
	["@media (max-width: 640px)"]: {
		gridTemplateColumns: "repeat(2,minmax(0,1fr))",
		gap: "4px",
	},
}));
