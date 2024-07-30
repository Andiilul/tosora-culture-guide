import { Box, Button, Divider, Typography } from "@mui/material";
import { useThemeContext } from "../../../themes/ThemeContextProvider";
import { BrightnessHigh, BrightnessLow } from "@mui/icons-material";

const ThemeToggle = () => {
	const { mode, toggleColorMode } = useThemeContext();

	return (
		<Button
			variant="outlined"
			sx={{
				width: "94px",
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
					fontSize={"12px"}
				>
					{mode}
				</Typography>
				<Divider orientation="vertical" flexItem />
				{mode === "dark" ? (
					<BrightnessHigh fontSize="small" />
				) : (
					<BrightnessLow fontSize="small" />
				)}
			</Box>
		</Button>
	);
};

export default ThemeToggle;
