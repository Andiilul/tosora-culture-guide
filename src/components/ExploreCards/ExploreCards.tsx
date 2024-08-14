import { Box, Link, Typography } from "@mui/material";
import { CardWrapper } from "./styled";
import { ArrowRight } from "@mui/icons-material";

interface ExploreCardsProps {
	children: React.ReactNode;
	title: string;
	catchphrase: string;
	link: string;
}

export const ExploreCards: React.FC<ExploreCardsProps> = ({
	children,
	title,
	link,
	catchphrase,
}) => {
	// const theme = useTheme();
	return (
		<Link
			href={`${link}`}
			sx={{
				textDecoration: "none",
			}}
		>
			<CardWrapper>
				<Box
					display={"flex"}
					gap={"12px"}
					justifyContent={"flex-start"}
					alignItems={"flex-start"}
				>
					<Box display={"flex"}>
						<Typography color={"primary"} fontSize={"48px"}>
							{children}
						</Typography>
					</Box>
					<Box
						display={"flex"}
						padding={"12px"}
						gap={"4px"}
						flexDirection={"column"}
					>
						<Typography
							fontFamily={"Poppins"}
							color={"primary"}
							fontSize={"16px"}
							fontWeight={600}
						>
							{title}
						</Typography>
						<Typography
							fontFamily={"Poppins"}
							fontSize={"12px"}
							color={"white"}
							fontWeight={300}
							lineHeight={"14px"}
							height={"42px"}
							
						>
							{catchphrase}
						</Typography>
					</Box>
				</Box>
				<Box
					justifyContent={"flex-end"}
					width={"100%"}
					display={"flex"}
					alignItems={"center"}
				>
					Lihat Selengkapnya <ArrowRight />
				</Box>
			</CardWrapper>
		</Link>
	);
};
