import { CardActionArea } from "@mui/material";
import { CardWrapper } from "./styled";

interface FoodCardProps {}

export const FoodCard: React.FC<FoodCardProps> = () => {
	return (
		<CardActionArea>
			<CardWrapper>FoodCard</CardWrapper>
		</CardActionArea>
	);
};
