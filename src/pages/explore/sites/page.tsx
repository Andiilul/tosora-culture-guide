import { Box, IconButton, Radio, Typography } from "@mui/material";
import {
	SiteContainer,
	SiteWrapper,
	SiteContent,
	CarouselContainer,
} from "./styled";
import { SlideCard } from "../../../components/slideCard";
import { siteMock } from "../../../mock/sites";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface SitesProps {}

export const Sites: React.FC<SitesProps> = () => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

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

	return (
		<SiteWrapper
			sx={{
				backgroundImage: `url("${siteMock[selectedIndex].img}")`,
				transition: "background-image 0.2s ease-in-out",
			}}
		>
			<SiteContainer>
				<SiteContent>
					<Box>
						<Typography fontFamily={"Poppins"}>Discover</Typography>
						<Typography fontFamily={"Rokkitt"}>
							{siteMock[selectedIndex].name}
						</Typography>
						<Typography>Discover</Typography>
					</Box>
					<Box display={"flex"} flexDirection={"column"}>
						<CarouselContainer>
							{siteMock.map((map, index) => (
								<div id={`slider-${index}`}>
									<SlideCard
										focus={selectedIndex === index}
										onClick={() => setSelectedIndex(index)}
										key={index}
										src={map.img}
										opacity={selectedIndex === index ? 0 : 0.8}
									/>
								</div>
							))}
						</CarouselContainer>
						<Box justifyContent={"center"} display={"flex"} gap={"12px"}>
							<IconButton
								sx={{
									border: "solid white 1px",
								}}
								onClick={() =>
									setSelectedIndex(
										selectedIndex === 0
											? siteMock.length - 1
											: selectedIndex - 1
									)
								}
							>
								<ArrowLeft />
							</IconButton>
							<Box
								display={"flex"}
								gap={"12px"}
								justifyContent={"space-between"}
								alignItems={"center	"}
								width={"100%"}
							>
								<Box
									sx={{
										display: "flex",
										width: "100%",
										justifyContent: "center",
									}}
								>
									{siteMock.map((map, index) => (
										<Radio
											key={map.name}
											sx={{
												color: "white",
												padding: "2px",
											}}
											size="small"
											checked={selectedIndex === index}
											onClick={() => setSelectedIndex(index)}
										></Radio>
									))}
								</Box>
							</Box>
							<IconButton
								sx={{
									border: "solid white 1px",
								}}
								onClick={() =>
									setSelectedIndex(
										selectedIndex === siteMock.length - 1
											? 0
											: selectedIndex + 1
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
