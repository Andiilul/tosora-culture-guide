import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddSiteInput } from "../../../../types/sites";
import {
	SiteHeroContainer,
	SiteHeroContent,
	SiteHeroWrapper,
	SiteDetailWrapper,
	SiteDetailContent,
} from "./styled";
import {
	Box,
	Button,
	IconButton,
	Radio,
	Typography,
	useTheme,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { NotFound } from "../../../_notfound/page";
import { getOneSite } from "../../../../services/sites";

interface SiteDetailProps {}

export const SiteDetail: React.FC<SiteDetailProps> = () => {
	const theme = useTheme();
	const { id } = useParams();

	const [site, setSite] = useState<AddSiteInput>({
		name: "",
		description: "",
		catchphrase: "",
		location: "",
		embedded_maplink: "",
		designationYear: new Date().getFullYear(),
		image_path: [],
	});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const scrollToId = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
	};

	useEffect(() => {
		if (id) {
			const fetchSite = async () => {
				try {
					const siteData = await getOneSite(id);
					if (siteData) {
						setSite(siteData);
					} else {
						setError("Invalid parameter: Data not found.");
					}
				} catch (error) {
					setError("Failed to fetch site data.");
				} finally {
					setLoading(false);
				}
			};

			fetchSite();
		} else {
			setLoading(false);
		}
	}, [id]);

	if (loading) {
		return <div>Loadingg....</div>;
	}
	if (error) {
		return <NotFound customMessage={error.toString()} />;
	}

	return (
		<SiteDetailWrapper>
			<SiteHeroWrapper
				sx={{
					backgroundImage: site.image_path
						? `url(${site.image_path[selectedIndex]})`
						: "",
					transition: "background-image 0.2s ease-in-out",
				}}
			>
				<SiteHeroContainer>
					<SiteHeroContent width={"100%"}>
						<Box display={"flex"} flexDirection={"column"} gap={"12px"}>
							<Typography
								fontSize={"64px"}
								textAlign={"center"}
								fontFamily={"Rokkitt"}
								textTransform={"uppercase"}
								lineHeight={"54px"}
								sx={{
									textShadow: "black 2px 2px",
								}}
							>
								{site.name}
							</Typography>
							<Typography
								fontSize={"24px"}
								textAlign={"center"}
								fontWeight={300}
								color={theme.palette.primary.main}
								fontFamily={"Poppins"}
								sx={{
									textShadow: "rgba(0,0,0,0.4) 2px 2px",
								}}
							>
								{site.catchphrase}
							</Typography>
							<Box
								justifyContent={"center"}
								display={"flex"}
								gap={"12px"}
								marginTop={"12px"}
							>
								<IconButton
									sx={{
										border: "solid white 1px",
									}}
									onClick={() =>
										setSelectedIndex(
											selectedIndex === 0
												? site.image_path.length - 1
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
										{Array.from(
											{ length: site.image_path.length },
											(_, index) => (
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
											)
										)}
									</Box>
								</Box>
								<IconButton
									sx={{
										border: "solid white 1px",
									}}
									onClick={() =>
										setSelectedIndex(
											selectedIndex === site.image_path.length - 1
												? 0
												: selectedIndex + 1
										)
									}
								>
									<ArrowRight />
								</IconButton>
							</Box>
						</Box>
						<Box
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
							maxWidth={"360px"}
							gap={"24px"}
							width={"100%"}
						>
							<Button
								href={site.location}
								sx={{
									flex: "1",
								}}
								variant="outlined"
							>
								View In Maps
							</Button>

							<Button
								onClick={() => scrollToId("detail")}
								sx={{
									flex: "1",
								}}
								variant="outlined"
							>
								Detail
							</Button>
						</Box>
					</SiteHeroContent>
				</SiteHeroContainer>
			</SiteHeroWrapper>
			<SiteDetailContent>
				<Box
					sx={{
						textAlign: "justify",
					}}
					component={"div"}
					dangerouslySetInnerHTML={{
						__html:
							site.description.length !== 0
								? site.description
								: "<p>Preview Here</p>",
					}}
				></Box>
				<Box
					component={"div"}
					id="maps"
					display={"flex"}
					flexDirection={"column"}
					gap={"12px"}
				>
					<Typography
						textAlign={"center"}
						fontFamily={"Rokkitt"}
						color={theme.palette.primary.main}
						sx={{
							fontSize: "24px",
							fontWeight: "bold",
						}}
					>
						Location
					</Typography>
					<Box
						display={"flex"}
						width={"100%"}
						height={"400px"}
						bgcolor={"white"}
					>
						<iframe
							width={"100%"}
							height={"100%"}
							title={site.name}
							src={site.embedded_maplink}
							allowFullScreen
						></iframe>
					</Box>
				</Box>
			</SiteDetailContent>
		</SiteDetailWrapper>
	);
};
