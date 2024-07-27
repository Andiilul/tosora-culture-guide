import { Box, Typography, useTheme } from "@mui/material";
import { HeroCard, HeroContainer, HeroGrid, HeroWrapper } from "./styled";
import {
	AccountBalance,
	Diversity2,
	LibraryBooks,
	Mosque,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate("/explore/sites");
	};
	const theme = useTheme();
	const handleScrollReligi = () => {
		const element = document.getElementById("spiritual");
		element?.scrollIntoView({ behavior: "smooth" });
	};

	const cardList = [
		{
			title: "Discover Democracy",
			name: "Jurnal Demokrasi Tosora",
			icon: <LibraryBooks fontSize="large" />,
		},
		{
			title: "Find Spiritual Peace",
			name: "Wisata Religi Masjid Tua",
			icon: <Mosque fontSize="large" />,
			onclick: handleScrollReligi,
		},
		{
			title: "Explore Historical Sites",
			name: "Cagar Budaya Tosora",
			icon: <AccountBalance fontSize="large" />,
			onclick: handleNavigate,
		},
		{
			title: "Experience Traditions",
			name: "Kebudayaan Tosora",
			icon: <Diversity2 fontSize="large" />,
		},
	];

	return (
		<HeroWrapper
			sx={{
				backgroundImage: "url('/assets/image-1.jpg')",
			}}
		>
			<HeroContainer>
				<Typography
					color={"white"}
					fontWeight={"bold"}
					fontFamily={"Rokkitt"}
					fontSize={"160px"}
					sx={{
						alignContent: "center",
						flex: "1",
						userSelect: "none",
					}}
				>
					TOSORA
				</Typography>
				<HeroGrid>
					{cardList.map((map, index) => (
						<HeroCard key={index} onClick={map.onclick}>
							<Box display={"flex"} gap={"12px"} alignItems={"center"}>
								<Typography color={theme.palette.primary.main}>
									{map.icon}
								</Typography>
								<Box display={"flex"} flexDirection={"column"}>
									<Typography color={"white"}>{map.title}</Typography>
									<Typography
										color={"white"}
										sx={{
											fontSize: "12px",
										}}
									>
										{map.name}
									</Typography>
								</Box>
							</Box>
						</HeroCard>
					))}
				</HeroGrid>
			</HeroContainer>
		</HeroWrapper>
	);
};
