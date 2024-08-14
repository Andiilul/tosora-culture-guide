import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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

	const medium = useMediaQuery("(max-width:1024px)");
	const small = useMediaQuery("(max-width:640px)");

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
			icon: (
				<LibraryBooks
					fontSize={small ? "small" : medium ? "medium" : "large"}
				/>
			),
			onclick: handleRedirectJournal,
		},
		{
			title: "Find Spiritual Peace",
			name: "Wisata Religi Masjid Tua",
			icon: <Mosque fontSize={small ? "small" : medium ? "medium" : "large"} />,
			onclick: handleScrollReligi,
		},
		{
			title: "Explore Historical Sites",
			name: "Situs Budaya Tosora",
			icon: (
				<AccountBalance
					fontSize={small ? "small" : medium ? "medium" : "large"}
				/>
			),
			onclick: handleNavigate,
		},
		{
			title: "Experience Traditions",
			name: "Kebudayaan Tosora",
			onclick: handleNavigateCulture,
			icon: (
				<Diversity2 fontSize={small ? "small" : medium ? "medium" : "large"} />
			),
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
					textAlign={"center"}
					fontSize={small?"80px" :medium? "140px" :"160px"}
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
							<Box
								display={"flex"}
								flexDirection={small ? "column" : medium ? "column" : "row"}
								gap={"12px"}
								alignItems={"center"}
							>
								<Typography color={theme.palette.primary.main}>
									{map.icon}
								</Typography>
								<Box display={"flex"} flexDirection={"column"}>
									<Typography
										textAlign={small ? "center" : medium ? "center" : "left"}
										color={"white"}
										fontSize={small ? "8px" : medium ? "12px" : "14px"}
									>
										{map.title}
									</Typography>
									{!small && (
										<Typography
											textAlign={small ? "center" : medium ? "center" : "left"}
											color={"white"}
											sx={{
												fontSize: "12px",
											}}
										>
											{map.name}
										</Typography>
									)}
								</Box>
							</Box>
						</HeroCard>
					))}
				</HeroGrid>
			</HeroContainer>
		</HeroWrapper>
	);
};
