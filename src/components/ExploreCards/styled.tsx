import { styled, CardActionArea, CardActionAreaProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";
export const CardWrapper: StyledComponent<
	CardActionAreaProps & { theme?: Theme }
> = styled(CardActionArea)(() => ({
	padding: "12px",
	borderRadius: "2px",
	display: "flex",
	flexDirection: "column",
	alignItems:"flex-start",
	boxShadow:"0px 0px 2px 0px rgba(0,0,0,0.2)"
}));
