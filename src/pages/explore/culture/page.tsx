import { Avatar, Box, CardActionArea, Typography } from "@mui/material";
import { PageLayout } from "../../../components/_layout/pageLayout/pageLayout";
import { useCallback, useEffect, useState } from "react";
import { PageHeroes } from "../../../components/PageHeroes";
import { CultureTypes } from "../../../types/culture";
import { getAllCulture } from "../../../services/admin/culture";
import { CultureCard, CultureDesc, CultureTitle } from "./styled";
import { ArrowRight } from "@mui/icons-material";

interface CultureProps {}

export const Culture: React.FC<CultureProps> = () => {
	const [data, setData] = useState<CultureTypes[] | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const result = await getAllCulture();
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

	return (
		<>
			<PageHeroes text="Budaya" img="/assets/culture.jpg" id="culinary">
				Rasakan Kekayaan Budaya <br /> Hidup di Tosora
			</PageHeroes>
			<PageLayout>
				<Box
					width={"100%"}
					display={"flex"}
					flexDirection={"column"}
					gap={"12px"}
				>
					<Box width={"100%"} component={"div"} id="culinary">
						<Typography
							textAlign={"center"}
							fontSize={"42px"}
							fontFamily={"Rokkitt"}
						>
							<Typography
								fontSize={"42px"}
								fontFamily={"Rokkitt"}
								color={"primary"}
								component={"span"}
							>
								Budaya{" "}
							</Typography>
							Desa Tosora
						</Typography>
					</Box>

					<Box
						sx={{
							display: "grid",
							gap: "12px",
							gridTemplateColumns: "repeat(2,minmax(0,1fr))",
						}}
					>
						{data?.map((map, index) => (
							<CardActionArea key={index}>
								<CultureCard
									display="flex"
									alignItems="flex-start"
									padding={"24px"}
									height={"100%"}
								>
									<Avatar
										src={map.image_path[0] ? map.image_path[0]:"/assets/not-found.webp"}
										variant="square"
										sx={{
											width: "160px",
											height: "160px",
										}}
									/>
									<Box
										display={"flex"}
										flexDirection={"column"}
										justifyContent={"space-between"}
										height={"100%"}
									>
										<Box display={"flex"} flexDirection={"column"}>
											<CultureTitle fontFamily={"Poppins"} fontWeight={500}>
												{map.name}
											</CultureTitle>
											<Typography
												fontFamily={"Poppins"}
												fontWeight={"300"}
												fontSize={"12px"}
												color={"secondary"}
											>
												{map.type === "customs"? "Adat-Istiadat" :"Ritual"}
											</Typography>
											<CultureDesc
												fontSize={"14px"}
												fontFamily={"Poppins"}
												fontWeight={200}
											>
												{map.description}
											</CultureDesc>
										</Box>
										<Box
											display={"flex"}
											alignItems={"center"}
											padding={"12px"}
											justifyContent={"flex-end"}
										>
											<Typography fontSize={"16px"} color={"primary"}>
												Cek Selengkapnya
											</Typography>
											<Typography fontSize={"16px"} color={"primary"}>
												<ArrowRight fontSize="inherit" />
											</Typography>
										</Box>
									</Box>
								</CultureCard>
							</CardActionArea>
						))}
					</Box>
				</Box>
			</PageLayout>
		</>
	);
};
