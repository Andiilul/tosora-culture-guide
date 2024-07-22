import { Box, Snackbar, Typography, useTheme } from "@mui/material";
import {
	FooterContainer,
	FooterLeft,
	FooterMid,
	FooterRight,
	FooterWrapper,
	QuickLinks,
} from "./styled";
import { navbarMenu } from "../../../mock/menu";
import { NavTo } from "../../navigate/NavTo";
import { useState } from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
	const [open, setOpen] = useState(false);

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		{!event}
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setOpen(true);
		});
	};

	const theme = useTheme();
	return (
		<Box display={"flex"} flexDirection={"column"}>
			<FooterWrapper>
				<FooterContainer>
					<FooterLeft>
						<Typography fontSize={"28px"} fontFamily={"Rokkitt"}>
							CultureGuide
						</Typography>
						<Typography
							fontFamily={"Poppins"}
							fontSize={"14px"}
							fontWeight={"300"}
						>
							Your Gateway to Tosora's Timeless Traditions
						</Typography>

						<Typography
							fontFamily={"Poppins"}
							fontSize={"14px"}
							fontWeight={"300"}
						>
							Tosora, Kecamatan Majauleng, Kabupaten Wajo, Sulawesi Selatan
						</Typography>
						<span>
							<Typography
								fontFamily={"Poppins"}
								fontSize={"14px"}
								fontWeight={"400"}
							>
								Email:{" "}
								<Typography
									component={"span"}
									fontFamily={"Poppins"}
									fontSize={"14px"}
									fontWeight={"400"}
									onClick={() =>
										copyToClipboard("kkn.tosora112.unhas@gmail.com")
									}
									sx={{
										":hover": {
											color: theme.palette.primary.main,
											transition: "300ms",
										},
										cursor: "pointer",
										userSelect: "none",
										transition: "300ms",
									}}
								>
									@kkn.tosora112.unhas@gmail.com
								</Typography>
							</Typography>
						</span>
					</FooterLeft>
					<FooterMid>
						<Typography fontSize={"28px"} fontFamily={"Rokkitt"}>
							Quick Links
						</Typography>
						<QuickLinks>
							{navbarMenu.map((map, index) => (
								<NavTo key={index} href={map.link}>
									<Box>{map.name}</Box>
								</NavTo>
							))}
						</QuickLinks>
					</FooterMid>
					<FooterRight>
						<Typography fontSize={"28px"} fontFamily={"Rokkitt"}>
							Contact Us
						</Typography>
					</FooterRight>
				</FooterContainer>
				<Snackbar
					open={open}
					autoHideDuration={2000}
					onClose={handleClose}
					message="Copied To Clipboard"
					ContentProps={{
						sx: {
							backgroundColor: theme.palette.background.paper,
							color: theme.palette.text.primary,
						},
					}}
				/>
			</FooterWrapper>
			<Box display={"flex"} justifyContent={"center"} padding={"8px"} bgcolor={theme.palette.background.paper}>
				<Typography fontSize={"10px"} fontFamily={"Poppins"}>&copy; 2024 CultureGuide. Created by KKNT-112 Universitas Hasanuddin Team.</Typography>
			</Box>
		</Box>
	);
};
