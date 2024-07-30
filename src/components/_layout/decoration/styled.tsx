import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";
import { keyframes } from "@emotion/react";

// Define the keyframes for the spin animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({
	animation: `${spin} 8s linear infinite`,
}));
