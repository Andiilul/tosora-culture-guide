import { Box, styled, BoxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";
export const NavbarContainer: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		// maxWidth: "1980px",
	}));

export const NavbarWrapper: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		padding: "12px 24px",
		color: "white",
		display: "flex",
		top: "0",
		position: "sticky",
		width: "100vw",
		overflowX: "hidden",

		zIndex: "100",
		userSelect: "none",
		justifyContent: "center",
		['@media (max-width: 1024px)']: {
		padding:"6px 12px"
		},
		['@media (max-width: 640px)']: {
			padding:"6px "
		
		},
	}));

export const NavbarMenuList: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		gap: "24px",
		['@media (max-width: 1024px)']: {
		gap:"12px"
		},
		['@media (max-width: 640px)']: {
			gap:"6px"
		
		},
	}));

export const NavItem: StyledComponent<BoxProps & { theme?: Theme }> = styled(
	Box
)(() => ({}));
