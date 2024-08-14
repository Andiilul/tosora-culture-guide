import {
	Avatar,
	Box,
	Button,
	CardActionArea,
	Typography,
	useTheme,
} from "@mui/material";
import { Hero } from "../../components/hero";
import {
	CardImage,
	HomeContainer,
	HomeContentWrapper,
	IntroSection,
	SpiritualSection,
} from "./styled";
import tosora from "/assets/image-1.jpg";
import { SpinDecoration } from "../../components/_layout/decoration";
import { ArrowRightAlt, Map } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Explore } from "../explore/page";
import { PageLayout } from "../../components/_layout/pageLayout/pageLayout";
import { socialMedia } from "../../mock/socialMedia";

interface HomeProps {}

const preloadImages = (imagePaths: string[]) => {
	imagePaths.forEach((path) => {
		const img = new Image();
		img.src = path;
	});
};

export const Home: React.FC<HomeProps> = () => {
	const [masjidTuaImage, setMasjidTuaImage] = useState<number>(1);
	const theme = useTheme();

	useEffect(() => {
		const imagesToPreload = [
			"/assets/masjidtua/1.jpg",
			"/assets/masjidtua/2.jpg",
			"/assets/masjidtua/3.jpg",
		];
		preloadImages(imagesToPreload);
	}, []);

	return (
		<>
			<div id="firstHero">
				<Hero />
			</div>
			<div id="explore">
				<Explore />
			</div>
			<HomeContentWrapper>
				<HomeContainer>
					<IntroSection>
						<Box
							display={"flex"}
							flexDirection={"column"}
							gap={"24px"}
							position={"relative"}
							// bgcolor={"white"}
						>
							<Box
								sx={{
									position: "absolute",
									display: "flex",
									zIndex: "0",
									left: "-68px",
									top: "-40px",
									opacity: "50%",
									animation: "spin 4s linear infinite",
								}}
							>
								<SpinDecoration>
									<Avatar
										variant="square"
										sx={{
											width: "200px",
											height: "200px",
										}}
										alt=""
										src="/assets/decoration/001.png"
									/>
								</SpinDecoration>
							</Box>
							<Box
								display={"flex"}
								flexDirection={"column"}
								gap={"24px"}
								position={"relative"}
								// bgcolor={"white"}
							>
								<Box
									display={"flex"}
									flexDirection={"column"}
									position={"relative"}
								>
									<Typography
										fontWeight={"500"}
										fontFamily={"Poppins"}
										color={theme.palette.text.secondary}
									>
										DESA TOSORA
									</Typography>
									<Typography
										fontSize={"40px"}
										fontFamily={"Rokkitt"}
										fontWeight={"400"}
									>
										Menyajikan Keindahan dan Kekayaan Budaya{" "}
										<Typography
											fontSize={"40px"}
											fontFamily={"Rokkitt"}
											fontWeight={"400"}
											component={"span"}
											color={theme.palette.primary.main}
										>
											Desa Tosora
										</Typography>
									</Typography>
								</Box>
							</Box>
							<Box height={"1px"} bgcolor={theme.palette.primary.main} />
							<Typography fontFamily={"Poppins"}>
								Tosora adalah salah satu desa di Kecamatan Majauleng, Kabupaten
								Wajo, Sulawesi Selatan. Tosora merupakan ibukota kerajaan Wajo
								dimasa lampau.
								<br />
								<br />
								Terdapat banyak warisan budaya di desa Tosora, mulai dari
								bangunan bersejarah hingga makam raja-raja Wajo.
							</Typography>
							<Box display={"flex"} gap={"24px"}>
								<Button
									onClick={() =>
										window.open("https://maps.app.goo.gl/wabPWE6zRjdCN4wH9")
									}
									sx={{
										textTransform: "none",
										display: "flex",
										gap: "12px",
										width: "max-content",
									}}
									size="large"
									variant="text"
								>
									<Typography
										fontFamily={"Poppins"}
										fontSize={"16px"}
										fontWeight={"400"}
									>
										Buka di Maps
									</Typography>
									<Map />{" "}
								</Button>
							</Box>
						</Box>

						<Box
							display={"flex"}
							flexDirection={"column"}
							alignItems={"center"}
							justifyContent={"center"}
							height={"100%"}
						>
							<Box position={"relative"} height={"300px"}>
								<Avatar
									alt=""
									src="/assets/decoration/002.png"
									style={{
										position: "absolute",
										zIndex: "0",
										left: "-40px",
										top: "60px",
										width: "200px",
										height: "200px",
									}}
								/>
								<Avatar
									alt=""
									src="/assets/decoration/001.png"
									style={{
										position: "absolute",
										zIndex: "0",
										left: "300px",
										top: "-40px",
										width: "200px",
										height: "200px",
									}}
								/>
								<Avatar
									style={{
										borderRadius: "8px",
										boxShadow: "-3px -3px 3px 0 rgba(0,0,0,0.4)",
										zIndex: "10",
										position: "relative", // Ensure this is not positioned absolutely

										height: "180px",
										width: "320px",
									}}
									src={tosora}
									alt=""
								/>
								<Avatar
									style={{
										borderRadius: "8px",
										position: "absolute",
										left: "120px",
										bottom: "0",
										zIndex: "15", // Set a lower z-index than the relative image
										boxShadow: "-3px -3px 3px 0 rgba(0,0,0,0.4)",
										height: "180px",
										width: "320px",
									}}
									src="/assets/image-2.jpg"
									alt=""
								/>
							</Box>
						</Box>
					</IntroSection>
				</HomeContainer>

				<SpiritualSection
					id="spiritual"
					sx={{
						backgroundImage: `url("/assets/masjidtua/${masjidTuaImage}.jpg")`,
					}}
				>
					<Box
						display={"flex"}
						padding={"128px 96px"}
						flexDirection={"column"}
						gap={"48px"}
						flex={"1"}
						maxWidth={"1980px"}
						position={"relative"}
						zIndex={2} // Ensure content is above the overlay
					>
						<Box display={"flex"} flexDirection={"column"}>
							<Typography
								fontFamily={"Rokkitt"}
								fontSize={"48px"}
								fontWeight={"300"}
								color={"white"} // Ensure text is readable
							>
								Jelajahi Wisata Religi
							</Typography>
							<Typography
								fontFamily={"Rokkitt"}
								fontSize={"48px"}
								fontWeight={"600"}
								color={"white"} // Ensure text is readable
							>
								Masjid Tua{" "}
								<Typography
									component={"span"}
									fontFamily={"Rokkitt"}
									fontSize={"48px"}
									fontWeight={"600"}
									color={(theme) => theme.palette.primary.main}
								>
									Tosora
								</Typography>
							</Typography>
						</Box>
						<Box
							display={"grid"}
							sx={{
								gridTemplateColumns: "repeat(2,minmax(0,1fr))",
								gap: "72px",
							}}
						>
							<Box
								display={"grid"}
								gridTemplateColumns={"repeat(3, minmax(0,1fr))"}
								gap={"12px"}
							>
								{Array.from({ length: 3 }).map((_, index) => (
									<CardActionArea
										key={index}
										onClick={() => setMasjidTuaImage(index + 1)}
									>
										<CardImage>
											<Avatar
												variant="square"
												sx={{
													height: "100%",
													width: "100%",
												}}
												src={`/assets/masjidtua/${index + 1}.jpg`}
												alt=""
											/>
										</CardImage>
									</CardActionArea>
								))}
							</Box>
							<Box
								display={"flex"}
								flexDirection={"column"}
								gap={"12px"}
								flex={"1"}
								position={"relative"}
								zIndex={2}
							>
								<Typography
									fontFamily={"Rokkitt"}
									fontSize={"32px"}
									fontWeight={"600"}
									color={"white"}
								>
									Temukan Sejarah, Alami Keindahan, Jelajahi Masa Lalu
								</Typography>
								<Typography
									fontSize={"14px"}
									fontFamily={"Poppins"}
									color={"white"}
								>
									Jelajahi keindahan dan sejarah yang tersembunyi di balik
									dinding Masjid Tua Tosora. Temukan fakta-fakta menarik dan
									cerita yang belum pernah Anda dengar sebelumnya.
								</Typography>
								<Button
									href="/explore/sites/masjid-tua-tosora"
									sx={{
										textTransform: "none",
										display: "flex",
										gap: "12px",
										width: "max-content",
										boxShadow: "none",
									}}
								>
									<Typography
										fontFamily={"Poppins"}
										fontSize={"22px"}
										fontWeight={"400"}
									>
										Jelajahi Masjid Tua
									</Typography>
									<ArrowRightAlt />
								</Button>{" "}
							</Box>
						</Box>
					</Box>
				</SpiritualSection>
				<PageLayout>
					<Box
						component={"div"}
						id="about-us"
						width={"100%"}
						display={"flex"}
						flexDirection={"column"}
						gap={"24px"}
					>
						<Typography
							fontFamily={"Rokkitt"}
							textAlign={"center"}
							fontSize={"36px"}
						>
							About Us
						</Typography>
						<Typography
							fontFamily={"Rokkitt"}
							textAlign={"center"}
							fontSize={"14px"}
						>
							Welcome to the Tosora Culture Guide, a project proudly created by
							the KKNT-112 Team from Universitas Hasanuddin. This website is
							part of our community service program, dedicated to preserving and
							sharing the rich cultural heritage of Tosora. Our mission is to
							provide an informative and engaging resource for anyone interested
							in learning about the unique traditions, history, and culture of
							Tosora. We hope this guide helps foster a deeper appreciation and
							understanding of this vibrant community. Thank you for exploring
							with us!
						</Typography>
						<Box
							display={"grid"}
							gridTemplateColumns={"repeat(4,minmax(0,1fr))"}
							gap={"4px"}
						>
							{socialMedia.map((map, index) => (
								<CardActionArea key={index} onClick={()=>window.open(map.link)}>
									<Box display={"flex"} padding={"12px"}>
										<Box>
											<Typography fontSize={"64px"}>{map.icon}</Typography>
										</Box>
										<Box
											padding={"12px"}
											display={"flex"}
											flexDirection={"column"}
											gap={"4px"}
										>
											<Typography
												fontFamily={"Poppins"}
												fontWeight={200}
												fontSize={"18px"}
											>
												{map.name}
											</Typography>
											<Typography
												fontFamily={"Poppins"}
												fontWeight={200}
												fontSize={"14px"}
											>
												{map.text}
											</Typography>
										</Box>
									</Box>
								</CardActionArea>
							))}
						</Box>
					</Box>
				</PageLayout>
			</HomeContentWrapper>
		</>
	);
};
