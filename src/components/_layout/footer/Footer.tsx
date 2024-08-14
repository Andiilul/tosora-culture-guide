import {
	Box,
	Link,
	Snackbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import {
	FooterContainer,
	FooterLeft,
	FooterMid,
	FooterRight,
	FooterWrapper,
	QuickLinks,
} from "./styled";
import { navbarMenu, ExploreBlog } from "../../../mock/menu";
import { useState } from "react";
import { socialMedia } from "../../../mock/socialMedia";

interface FooterProps {}
export const Footer: React.FC<FooterProps> = () => {
	const [open, setOpen] = useState(false);

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		{
			!event;
		}
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

	const medium = useMediaQuery("(max-width:1024px)");
	const small = useMediaQuery("(max-width:640px)");

	return (
		<Box display={"flex"} flexDirection={"column"}>
			<FooterWrapper>
				<FooterContainer>
					<FooterLeft>
						<Typography
							fontSize={small ? "18px" : medium ? "24px" : "28px"}
							fontFamily={"Rokkitt"}
						>
							CultureGuide
						</Typography>
						<Typography
							fontFamily={"Poppins"}
							fontSize={small ? "10px" : medium ? "12px" : "14px"}
							fontWeight={"300"}
						>
							Your Gateway to Tosora's Timeless Traditions
						</Typography>

						<Typography
							fontFamily={"Poppins"}
							fontSize={small ? "10px" : medium ? "12px" : "14px"}
							fontWeight={"300"}
						>
							Tosora, Kecamatan Majauleng, Kabupaten Wajo, Sulawesi Selatan
						</Typography>
						<span>
							<Typography
								fontFamily={"Poppins"}
								fontSize={small ? "10px" : medium ? "12px" : "14px"}
								fontWeight={"400"}
							>
								Email:{" "}
								<Typography
									component={"span"}
									fontFamily={"Poppins"}
									fontSize={small ? "10px" : medium ? "12px" : "14px"}
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
						<Typography
							fontSize={small ? "18px" : medium ? "24px" : "28px"}
							fontFamily={"Rokkitt"}
						>
							Navigate
						</Typography>
						<QuickLinks>
							{navbarMenu.map((map, index) => (
								<Link key={index} href={map.scroll}>
									<Box>{map.name}</Box>
								</Link>
							))}
						</QuickLinks>
					</FooterMid>
					<FooterMid>
						<Typography
							fontSize={small ? "18px" : medium ? "24px" : "28px"}
							fontFamily={"Rokkitt"}
						>
							Explore
						</Typography>
						<QuickLinks>
							{ExploreBlog.map((map, index) => (
								<Link key={index} href={map.link}>
									<Box>{map.name}</Box>
								</Link>
							))}
						</QuickLinks>
					</FooterMid>
					<FooterRight>
						<Typography
							fontSize={small ? "18px" : medium ? "24px" : "28px"}
							fontFamily={"Rokkitt"}
						>
							Contact Us
						</Typography>
						<Typography
							fontFamily={"Poppins"}
							fontSize={small ? "10px" : medium ? "12px" : "14px"}
							fontWeight={"300"}
						>
							Follow Our Social Media to Find Out the Latest Updates of Our
							Progress
						</Typography>
						<Box display={"flex"} gap={"12px"}>
							{socialMedia.map((map, index) => (
								<Link key={index} href={map.link}>
									<Box>{map.icon}</Box>
								</Link>
							))}
						</Box>
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
			<Box
				display={"flex"}
				justifyContent={"center"}
				padding={"8px"}
				bgcolor={theme.palette.background.paper}
			>
				<Typography fontSize={"10px"} fontFamily={"Poppins"}>
					&copy; 2024 CultureGuide. Created by KKNT-112 Universitas Hasanuddin
					Team.
				</Typography>
			</Box>
		</Box>
	);
};
