import { Box, Typography } from "@mui/material";
import { PageHeroes } from "../../components/PageHeroes";
import { ExploreCards } from "../../components/ExploreCards";
import { ExploreBlog } from "../../mock/menu";
import { GridLayout } from "../../components/_layout/gridLayout";

interface ExploreProps {}

export const Explore: React.FC<ExploreProps> = () => {
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			sx={{
				backgroundImage: "url('/assets/explore-bg.jpeg')",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			<PageHeroes variant="plain" id="" img="/assets/bg.jpeg">
				<Box display={"flex"} flexDirection={"column"}>
					<Typography
						fontFamily={"Abril Fatface"}
						textAlign={"center"}
						color={"white"}
						fontSize={"48px"}
					>
						Discover the Heart of Our Village
					</Typography>
					<Typography
						fontFamily={"Grape Nuts"}
						textAlign={"center"}
						color={"white"}
						fontSize={"48px"}
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
		</Box>
	);
};
