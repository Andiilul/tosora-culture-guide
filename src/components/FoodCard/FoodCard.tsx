import { Avatar, Box, Link, Typography, useTheme } from "@mui/material";
import { CardWrapper, CardTitle } from "./styled";
import { AvTimer, MenuBook } from "@mui/icons-material";

interface FoodCardProps {
	imgUrl?: string | null;
	name: string;
	isRecipe: boolean;
	duration: number;
	id: string;
}

export const FoodCard: React.FC<FoodCardProps> = ({
	name,
	isRecipe,
	duration,
	imgUrl,
	id,
}) => {
	const theme = useTheme();
	return (
		<Link
			href={`./cuisines/${id}`}
			sx={{
				textDecoration: "none",
			}}
		>
			<CardWrapper>
				<Avatar
					src={!imgUrl || imgUrl === null ? "/assets/not-found.webp" : imgUrl}
					variant="square"
					sx={{
						width: "100%",
						height: "140px",
						aspectRatio: "1 / 1",
						objectPosition: "center",
						objectFit: "cover",
					}}
				/>
				<Box
					display={"flex"}
					width={"100%"}
					justifyContent={"flex-start"}
					alignItems={"flex-start"}
					flexDirection={"column"}
					gap={"0px"}
				>
					<Box display={"flex"} flex={1} alignItems={"center"} gap={"4px"}>
						<AvTimer color={"primary"} />
						<Typography
							fontSize={"12px"}
							fontFamily={"Poppins"}
							fontWeight={"300"}
							color={"primary"}
						>
							{duration} Min
						</Typography>
					</Box>
					<Box display={"flex"} flex={1} alignItems={"center"} gap={"4px"}>
						<MenuBook color={isRecipe ? "primary" : "disabled"} />
						<Typography
							fontSize={"12px"}
							fontFamily={"Poppins"}
							fontWeight={"300"}
							color={isRecipe ? "primary" : "#bfbfbf"}
						>
							{isRecipe ? "Available" : "Not Available"}
						</Typography>
					</Box>
				</Box>
				<CardTitle
					color={theme.palette.text.primary}
					fontFamily={"Poppins"}
					width={"100%"}
				>
					{name}
				</CardTitle>
				<Typography
					fontFamily={"Poppins"}
					fontWeight={300}
					fontSize={"10px"}
					color={"primary"}
				>
					Lihat Detail
				</Typography>
			</CardWrapper>
		</Link>
	);
};
