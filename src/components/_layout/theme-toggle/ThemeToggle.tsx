import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { useThemeContext } from "../../../themes/ThemeContextProvider";
import { BrightnessHigh, BrightnessLow } from "@mui/icons-material";

const ThemeToggle = () => {
	const { mode, toggleColorMode } = useThemeContext();

	const medium = useMediaQuery("(max-width:1024px)");
	const small = useMediaQuery("(max-width:640px)");
	return (
		<Button
			variant="outlined"
			sx={{
				width: small ? "64px" : medium ? "94px" : "94px",
				height: small ? "24px" : medium ? "36px" : "36px",
				borderRadius: "24px",
				borderColor: `${mode == "light" ? "#1ab69d" : "#ffffff"}`,
				color: `${mode == "light" ? "#1ab69d" : "#ffffff"}`,
				":hover": {
					color: `${mode == "light" ? "#1ab69d" : "#1ab69d"}`,
					borderColor: `${mode == "light" ? "#1ab69d" : "#1ab69d"}`,
				},
			}}
			onClick={toggleColorMode}
		>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					flexDirection: `${mode === "light" ? "row" : "row-reverse"}`,
				}}
			>
				<Typography
					sx={{
						textTransform: "capitalize",
						// bgcolor: "red",
					}}
					fontSize={small? "8px" :"12px"}
				>
					{mode}
				</Typography>
				<Divider orientation="vertical" flexItem />
				{mode === "dark" ? (
					<Typography fontSize={small ? "14px" : "14px"} lineHeight={"12px"}>
						<BrightnessHigh fontSize={small ? "inherit" : "small"} />
					</Typography>
				) : (
					<Typography fontSize={small ? "14px" : "14px"}>
						<BrightnessLow fontSize={small ? "inherit" : "small"} />
					</Typography>
				)}
			</Box>
		</Button>
	);
};

export default ThemeToggle;
