import { Box, Typography, useTheme } from "@mui/material";
import { HeroCard, HeroGrid, HeroImages, HeroWrapper } from "./styled";
import {
	AccountBalance,
	Diversity2,
	LibraryBooks,
	Public,
} from "@mui/icons-material";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
	const theme = useTheme();

	const cardList = [
		{
			title: "Discover Democracy",
			name: "Jurnal Demokrasi Tosora",
			icon: <LibraryBooks fontSize="large" />,
		},
		{
			title: "Explore Historical Sites",
			name: "Cagar Budaya Tosora",
			icon: <AccountBalance fontSize="large" />,
		},
		{
			title: "Experience Traditions",
			name: "Kebudayaan Tosora",
			icon: <Diversity2 fontSize="large" />,
		},
		{
			title: "Read Latest Post",
			name: "Blog",
			icon: <Public fontSize="large" />,
		},
	];

	return (
		<HeroWrapper>
			<Box
				display={"flex"}
				justifyContent={"center"}
				// flexDirection={"column"}
				alignItems={"center"}
				height={"100vh"}
				sx={{
					// position: "relative",
					// backgroundColor: "blue",
					padding: "64px 0px",
				}}
			>
				<Box
					sx={{
						// position: "relative",
						display: "flex",
						flexDirection: "column",
						// backgroundColor: "red",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
					}}
				>
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
							<HeroCard key={index}>
								<Box display={"flex"} gap={"12px"}>
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
				</Box>
			</Box>
			<HeroImages />
		</HeroWrapper>
	);
};
