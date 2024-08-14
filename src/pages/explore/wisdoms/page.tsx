import { Avatar, Box, CardActionArea, Typography } from "@mui/material";
import { PageLayout } from "../../../components/_layout/pageLayout/pageLayout";
import { useCallback, useEffect, useState } from "react";
import { PageHeroes } from "../../../components/PageHeroes";
import { ArrowForward } from "@mui/icons-material";
import { WorksCard, WorksTitle, WorksDesc } from "./styled";
import { LocalKnowledgeTypes } from "../../../types/local-knowledge";
import { getAllLocalKnowledge } from "../../../services/admin/local-knowledge";

interface WisdomsProps {}

export const Wisdoms: React.FC<WisdomsProps> = () => {
	const [data, setData] = useState<LocalKnowledgeTypes[] | undefined>(
		undefined
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	data;

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const result = await getAllLocalKnowledge();
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
			<PageHeroes text="Kebijaksanaan" img="/assets/wisdoms.webp" id="wisdoms">
				Temukan Kebijaksanaan yang Diturunkan
				<br />
				Melalui Generasi di Tosora
			</PageHeroes>
			<PageLayout>
				<Box
					width={"100%"}
					display={"flex"}
					flexDirection={"column"}
					gap={"12px"}
				>
					<Box width={"100%"} component={"div"} id="wisdoms">
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
								Pengetahuan{" "}
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
								<WorksCard
									display="flex"
									alignItems="flex-start"
									padding={"24px"}
									height={"100%"}
								>
									<Avatar
										src={
											map.image_path ? map.image_path : "/assets/not-found.webp"
										}
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
										flex={1}
									>
										<Box display={"flex"} flexDirection={"column"} flex={1}>
											<WorksTitle fontFamily={"Poppins"} fontWeight={500}>
												{map.name}
											</WorksTitle>
											<Typography
												fontFamily={"Poppins"}
												fontWeight={"300"}
												fontSize={"12px"}
												color={"primary"}
											>
												{map.type === "local-knowledges"
													? "Pengetahuan Lokal"
													: "Teknologi Lokal"}
											</Typography>
											<WorksDesc
												fontSize={"14px"}
												fontFamily={"Poppins"}
												fontWeight={200}
											>
												{map.description}
											</WorksDesc>
										</Box>
										<Box
											display={"flex"}
											alignItems={"center"}
											padding={"12px"}
											justifyContent={"flex-end"}
										>
											<Typography fontSize={"16px"} color={"primary"}>
												Detail
											</Typography>
											<Typography
												fontSize={"16px"}
												lineHeight={"12px"}
												color={"primary"}
											>
												<ArrowForward fontSize="inherit" />
											</Typography>
										</Box>
									</Box>
								</WorksCard>
							</CardActionArea>
						))}
					</Box>
				</Box>
			</PageLayout>
		</>
	);
};
