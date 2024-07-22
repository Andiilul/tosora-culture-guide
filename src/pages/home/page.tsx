import { Box, Typography, useTheme } from "@mui/material";
import { Hero } from "../../components/hero";
import { HomeContainer, HomeContentWrapper, IntroSection } from "./styled";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
	const theme = useTheme();
	return (
		<>
			<Hero />
			<HomeContentWrapper>
				<HomeContainer>
					<IntroSection>
						<Box
							flex={"1"}
							display={"flex"}
							flexDirection={"column"}
							gap={"24px"}
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
								fontFamily={"League Spartan"}
								fontWeight={"700"}
							>
								Menyajikan Keindahan dan Kekayaan Budaya{" "}
								<Typography
									fontSize={"40px"}
									fontFamily={"League Spartan"}
									fontWeight={"700"}
									component={"span"}
									color={theme.palette.primary.main}
								>
									Desa Tosora
								</Typography>
							</Typography>
							<Typography fontFamily={"Poppins"}>
								Tosora adalah salah satu desa di Kecamatan Majauleng, Kabupaten
								Wajo, Sulawesi Selatan. Tosora merupakan ibukota kerajaan Wajo
								dimasa lampau.
								<br />
								<br />
								Terdapat banyak warisan budaya di desa Tosora, mulai dari
								bangunan bersejarah hingga makam raja-raja Wajo.
							</Typography>
						</Box>
						<Box
							flex={"1"}
							display={"flex"}
							flexDirection={"column"}
							justifyContent={"center"}
							height={"100%"}
						>
							<Box position={"relative"} height={"300px"}>
								<img
									style={{
										borderRadius: "8px",
										boxShadow: "-3pxX -3px 3px 0 rgba(0,0,0,0.4)",
									}}
									height={180}
									src="./public/images/image-1.jpg"
									alt=""
								/>
								<img
									style={{
										borderRadius: "8px",
										position: "absolute",
										left: "40%",
										bottom: "0",
										boxShadow: "-3px -3px 3px 0 rgba(0,0,0,0.4)",
									}}
									height={180}
									src="./public/images/image-2.jpg"
									alt=""
								/>
							</Box>
						</Box>
					</IntroSection>
					
				</HomeContainer>
			</HomeContentWrapper>
		</>
	);
};
