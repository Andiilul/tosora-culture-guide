import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { HeroSection, WhiteHeroSection } from "./styled";
import { ReactNode } from "react";

interface PageHeroesProps {
	img?: string;
	children: ReactNode;
	text?: string;
	id: string;
	variant?: "explore" | "plain";
}

export const PageHeroes: React.FC<PageHeroesProps> = ({
	img,
	children,
	text,
	id,
	variant = "explore",
}) => {
	const medium = useMediaQuery("(max-width:1024px)");
	const small = useMediaQuery("(max-width:640px)");

	const handleScroll = () => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	if (variant === "explore") {
		return (
			<HeroSection
				sx={{
					backgroundImage: `url(${img})`,
				}}
			>
				<Box
					display={"flex"}
					padding={small ? "32px" : medium ? "64px" : "128px 128px"}
					flexDirection={"column"}
					gap={"48px"}
					flex={"1"}
					maxWidth={"1980px"}
					position={"relative"}
					zIndex={2} // Ensure content is above the overlay
				>
					<Box display={"flex"} flexDirection={"column"}>
						<Typography
							textAlign={"center"}
							fontSize={small ? "24px" : medium ? "36px" : "48px"}
							fontWeight={"300"}
							color={"white"}
							fontFamily={"Baskervville SC"}
						>
							{children}
						</Typography>
					</Box>
					<Box display={"flex"} justifyContent={"center"}>
						<Box
							width={small ? "max-content" : "360px"}
							gap={medium ? "12px" : "24px"}
							display={"grid"}
							gridTemplateColumns={
								small ? "repeat(1,minmax(0,1fr))" : "repeat(2,minmax(0,1fr))"
							}
						>
							<Button
								variant="outlined"
								sx={{
									textTransform: "none",
									width: small ? "240px" : "100%",
								}}
								size={medium ? "small" : "large"}
								onClick={handleScroll}
							>
								<Typography fontWeight={300} fontFamily={"Poppins"}>
									{text}
								</Typography>
							</Button>

							<Button
								href="/"
								variant="outlined"
								sx={{
									textTransform: "none",
									width: small ? "240px" : "100%",
								}}
								size={medium ? "small" : "large"}
							>
								<Typography fontWeight={300} fontFamily={"Poppins"}>
									Kembali
								</Typography>
							</Button>
						</Box>
					</Box>
				</Box>
			</HeroSection>
		);
	} else {
		return (
			<WhiteHeroSection
				sx={{
					backgroundImage: `url(${img})`,
				}}
			>
				<Box
					display={"flex"}
					padding={small ? "32px" : medium ? "64px" : "128px 128px"}
					flexDirection={"column"}
					gap={"48px"}
					flex={"1"}
					maxWidth={"1980px"}
					position={"relative"}
					zIndex={2} // Ensure content is above the overlay
				>
					{children}
				</Box>
			</WhiteHeroSection>
		);
	}
};
