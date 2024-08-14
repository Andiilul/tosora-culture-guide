import { Box, Typography, useTheme } from "@mui/material";
import { HeroCard, HeroContainer, HeroGrid, HeroWrapper } from "./styled";
import {
	AccountBalance,
	Diversity2,
	LibraryBooks,
	Mosque,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getJournal } from "../../services/admin/journal";
import { useState, useEffect } from "react";
import { JournalTypes } from "../../types/journal";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate("/explore/sites");
	};
	const handleNavigateCulture = () => {
		navigate("/explore/cultures");
	};


	const theme = useTheme();
	const handleScrollReligi = () => {
		const element = document.getElementById("spiritual");
		element?.scrollIntoView({ behavior: "smooth" });
	};

	const [journal, setJournal] = useState<JournalTypes | null>(null);

	useEffect(() => {
		const fetchJournal = async () => {
			try {
				const fetchedJournal = await getJournal();
				setJournal(fetchedJournal);
			} catch (error) {
				console.error("Error fetching journal:", error);
			} finally {
				console.log("Success");
			}
		};

		fetchJournal();
	}, []);

	const handleRedirectJournal = () => {
		if (journal) {
			window.open(journal.link, "_blank");
		}
	};

	const cardList = [
		{
			title: "Discover Democracy",
			name: "Jurnal Demokrasi Tosora",
			icon: <LibraryBooks fontSize="large" />,
			onclick: handleRedirectJournal,
		},
		{
			title: "Find Spiritual Peace",
			name: "Wisata Religi Masjid Tua",
			icon: <Mosque fontSize="large" />,
			onclick: handleScrollReligi,
		},
		{
			title: "Explore Historical Sites",
			name: "Situs Budaya Tosora",
			icon: <AccountBalance fontSize="large" />,
			onclick: handleNavigate,
		},
		{
			title: "Experience Traditions",
			name: "Kebudayaan Tosora",
			onclick: handleNavigateCulture,
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
