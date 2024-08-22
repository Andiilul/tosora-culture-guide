import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const DashboardContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({}));
