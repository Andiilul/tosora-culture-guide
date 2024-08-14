import {
	Box,
	styled,
	BoxProps,
	TypographyProps,
	Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";

export const Data: StyledComponent<BoxProps & { theme?: Theme }> = styled(Box)(
	() => ({
		display: "grid",
		gap: "12px",
		gridTemplateColumns: "repeat(5,minmax(0,1fr))",
	})
);

export const CultureTitle: StyledComponent<
	TypographyProps & { theme?: Theme }
> = styled(Typography)(() => ({
	fontSize: "24px",
}));

export const CultureCard: StyledComponent<BoxProps & { theme?: Theme }> =
	styled(Box)(() => ({
		display: "flex",
		gap: "12px",
	}));

export const CultureDesc: StyledComponent<TypographyProps & { theme?: Theme }> =
	styled(Typography)(() => ({
		// ellipsis 2 line
		display: "-webkit-box",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
	}));
