import { Box, Typography, useMediaQuery } from "@mui/material";
import { PageHeroes } from "../../components/PageHeroes";
import { ExploreCards } from "../../components/ExploreCards";
import { ExploreBlog } from "../../mock/menu";
import { GridLayout } from "../../components/_layout/gridLayout";

interface ExploreProps {}

export const Explore: React.FC<ExploreProps> = () => {
	const medium = useMediaQuery("(max-width:1024px)");
	const small = useMediaQuery("(max-width:640px)");

	return (
		<PageHeroes variant="plain" id="" img="/assets/explore-bg.jpeg">
			<Box display={"flex"} flexDirection={"column"}>
				<Typography
					fontFamily={"Abril Fatface"}
					textAlign={"center"}
					color={"white"}
					fontSize={small?"24px" : medium ? "36px" : "48px"}
				>
					Discover the Heart of Our Village
				</Typography>
				<Typography
					fontFamily={"Grape Nuts"}
					textAlign={"center"}
					color={"white"}
					fontSize={small?"24px" : medium ? "36px" : "48px"}
				>
					Explore Tosora
				</Typography>
			</Box>
			<Box>
				<GridLayout defaultGrid={3}>
					{ExploreBlog.map((map, index) => (
						<ExploreCards
							key={index}
							title={map.name}
							link={map.link}
							catchphrase={map.catchphrase}
						>
							{map.icon}
						</ExploreCards>
					))}
				</GridLayout>
			</Box>
		</PageHeroes>
	);
};
