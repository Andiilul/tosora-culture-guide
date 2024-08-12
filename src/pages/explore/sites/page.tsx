import {
	Box,
	Button,
	IconButton,
	Link,
	Radio,
	Typography,
	useTheme,
} from "@mui/material";
import {
	SiteContainer,
	SiteWrapper,
	SiteContent,
	CarouselContainer,
} from "./styled";
import { SlideCard } from "../../../components/slideCard";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { getAllSites } from "../../../services/admin/sites";
import { SitesTypes } from "../../../types/sites";
import { NotFound } from "../../_notfound/page";

interface SitesProps {}

export const Sites: React.FC<SitesProps> = () => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [data, setData] = useState<SitesTypes[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const theme = useTheme();

	useEffect(() => {
		const element = document.getElementById(`slider-${selectedIndex}`);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start",
			});
		}
	}, [selectedIndex]);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const result = await getAllSites();
			setData(result);
		} catch (error) {
			setError("Failed to fetch data.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	// Make sure to handle cases where data might be empty
	if (data.length === 0) {
		return <NotFound statusCode="204"/>;
	}

	const currentSite = data[selectedIndex];
	const imagePaths = Array.isArray(currentSite.image_path)
		? currentSite.image_path
		: [currentSite.image_path];

	const formattedName = currentSite.name.toLowerCase().replace(/ /g, "-");

	return (
		<SiteWrapper
			sx={{
				backgroundImage: `url("${imagePaths[0]}")`,
				transition: "background-image 0.2s ease-in-out",
			}}
		>
			<SiteContainer>
				<SiteContent>
					<Box
						display={"flex"}
						flexDirection={"column"}
						gap={"12px"}
						color={"white"}
					>
						<Typography
							fontFamily={"Poppins"}
							fontSize={"12px"}
							color={"#cccccc"}
						>
							DISCOVER
						</Typography>
						<Typography
							fontFamily={"Poppins"}
							fontSize={"28px"}
							fontWeight={"600"}
							color={"white"}
							sx={{
								textShadow: "2px 2px rgba(0,0,0,0.4)",
							}}
						>
							Situs Budaya :{" "}
						</Typography>
						<Typography
							fontFamily={"League Spartan"}
							fontSize={"28px"}
							fontWeight={"600"}
							sx={{
								textShadow: "2px 2px rgba(0,0,0,0.8)",
							}}
							color={theme.palette.primary.main}
						>
							{currentSite.name}
						</Typography>
						<Typography
							sx={{
								textShadow: "2px 2px rgba(0,0,0,0.4)",
							}}
							fontFamily={"Poppins"}
							fontSize={"14px"}
						>
							{currentSite.catchphrase}
						</Typography>
						<Box>
							<Link href={`/explore/sites/${formattedName}`}>
								<Button
									variant="text"
									sx={{
										textTransform: "none",
									}}
									size="large"
								>
									<Typography
										fontFamily={"Poppins"}
										fontSize={"14px"}
										fontWeight={600}
									>
										Cek Detail
									</Typography>
									<ArrowRight />
								</Button>
							</Link>
						</Box>
					</Box>
					<Box display={"flex"} flexDirection={"column"}>
						<CarouselContainer>
							{data.map((map, index) => {
								const imagePath = Array.isArray(map.image_path)
									? map.image_path[0] // Show the first image if multiple are available
									: map.image_path;

								return (
									<div id={`slider-${index}`} key={index}>
										<SlideCard
											focus={selectedIndex === index}
											onClick={() => setSelectedIndex(index)}
											src={imagePath as string}
											opacity={selectedIndex === index ? 0 : 0.8}
										/>
									</div>
								);
							})}
						</CarouselContainer>
						<Box justifyContent={"center"} display={"flex"} gap={"12px"}>
							<IconButton
								sx={{
									border: "solid white 1px",
								}}
								onClick={() =>
									setSelectedIndex(
										selectedIndex === 0 ? data.length - 1 : selectedIndex - 1
									)
								}
							>
								<ArrowLeft />
							</IconButton>
							<Box
								display={"flex"}
								gap={"12px"}
								justifyContent={"space-between"}
								alignItems={"center"}
								width={"100%"}
							>
								<Box
									sx={{
										display: "flex",
										width: "100%",
										justifyContent: "center",
									}}
								>
									{Array.from({ length: data.length }, (_, index) => (
										<Radio
											key={index}
											sx={{
												color: "white",
												padding: "2px",
											}}
											size="small"
											checked={selectedIndex === index}
											onClick={() => setSelectedIndex(index)}
										/>
									))}
								</Box>
							</Box>
							<IconButton
								sx={{
									border: "solid white 1px",
								}}
								onClick={() =>
									setSelectedIndex(
										selectedIndex === data.length - 1 ? 0 : selectedIndex + 1
									)
								}
							>
								<ArrowRight />
							</IconButton>
						</Box>
					</Box>
				</SiteContent>
			</SiteContainer>
		</SiteWrapper>
	);
};
