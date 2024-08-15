import { Box, Link, Typography, useMediaQuery } from "@mui/material";
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
	const medium = useMediaQuery("(max-width:1024px)");
	const small = useMediaQuery("(max-width:640px)");
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
					flexDirection={small ? "column" : "row"}
					gap={small ? "0px" : medium ? "6px" : "12px"}
					justifyContent={small ? "center" : "flex-start"}
					alignItems={small ? "center" : "flex-start"}
					width={"100%"}
				>
					<Box display={"flex"}>
						<Typography color={"primary"} fontSize={"48px"}>
							{children}
						</Typography>
					</Box>
					<Box
						width={"100%"}
						display={"flex"}
						padding={"12px"}
						gap={"4px"}
						flexDirection={"column"}
						flex={1}
					>
						<Typography
							fontFamily={"Poppins"}
							color={"primary"}
							flex={1}
							textAlign={small ? "center" : "left"}
							fontSize={small ? "12px" : medium ? "14px" : "16px"}
							fontWeight={small ? 300 : medium ? 400 : 600}
						>
							{title}
						</Typography>
						<Typography
							display={small ? "none" : "inline"}
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
					{small ? "Detail" : "Lihat Selengkapnya"} <ArrowRight />
				</Box>
			</CardWrapper>
		</Link>
	);
};
