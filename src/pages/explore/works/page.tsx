import { Box, Typography } from "@mui/material";
import { PageLayout } from "../../../components/_layout/pageLayout/pageLayout";
import { useCallback, useEffect, useState } from "react";
import { PageHeroes } from "../../../components/PageHeroes";
import { getAllWorks } from "../../../services/admin/works";
import { WorksTypes } from "../../../types/works";

interface WorksProps {}

export const Works: React.FC<WorksProps> = () => {
	const [data, setData] = useState<WorksTypes[] | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const result = await getAllWorks();
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
			<PageHeroes text="Budaya" img="/assets/Works.jpg" id="culinary">
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
					
					</Box>
				</Box>
			</PageLayout>
		</>
	);
};
