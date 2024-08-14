import {
	styled,
	CardActionArea,
	CardActionAreaProps,
	TypographyProps,
	Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";
export const CardWrapper: StyledComponent<
	CardActionAreaProps & { theme?: Theme }
> = styled(CardActionArea)(() => ({
	padding: "12px",
	borderRadius: "2px",
	display: "flex",
	flexDirection: "column",
	gap: "8px",
}));

export const CardTitle: StyledComponent<TypographyProps & { theme?: Theme }> =
	styled(Typography)(() => ({
		overflow: "hidden",
		textOverflow: "ellipsis",
		display: "-webkit-box",
		WebkitLineClamp: "2",
		WebkitBoxOrient: "vertical",
		fontSize: "14px",
		lineHeight: "16px",
		height:"32px"
	}));
