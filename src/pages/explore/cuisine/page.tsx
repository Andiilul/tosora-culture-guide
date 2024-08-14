import { Box, Typography } from "@mui/material";
import { PageLayout } from "../../../components/_layout/pageLayout/pageLayout";
import { FoodCard } from "../../../components/FoodCard";
import { CuisineTypes } from "../../../types/cuisine";
import { getAllCuisine } from "../../../services/admin/cuisine";
import { useCallback, useEffect, useState } from "react";
import { PageHeroes } from "../../../components/PageHeroes";

interface SitesProps {}

export const Cuisine: React.FC<SitesProps> = () => {
	const [data, setData] = useState<CuisineTypes[] | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	// const [isRecipe, setIsRecipe] = useState<boolean>(false);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const result = await getAllCuisine();
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
			<PageHeroes text="Kuliner" img="/assets/cuisine.jpg" id="culinary">
				Nikmati Keunikan Rasa
				<br /> Kuliner Tosora
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
								Kuliner{" "}
							</Typography>
							Desa Tosora
						</Typography>
					</Box>
					{/* <Box display={"flex"} gap={"12px"} alignItems={"center"}>
						<FormControlLabel
							control={
								<Checkbox
									value={isRecipe}
									onChange={() => setIsRecipe(!isRecipe)}
								/>
							}
							label="Memiliki Resep"
						/>
					</Box> */}
					<Box
						sx={{
							display: "grid",
							gap: "12px",
							gridTemplateColumns: "repeat(5,minmax(0,1fr))",
						}}
					>
						{data?.map((data, index) => (
								<FoodCard
									id={data.id}
									imgUrl={data.image_path}
									key={index}
									name={data.name}
									isRecipe={
										data.recipe !== null &&
										data.recipe.ingredients.length > 0 &&
										data.recipe.steps.length > 0
									}
									duration={data.duration}
								/>
							))}
					</Box>
				</Box>
			</PageLayout>
		</>
	);
};
