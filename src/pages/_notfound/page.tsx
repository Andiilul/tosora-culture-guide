import { Box, Button, Typography } from "@mui/material";
import { NotFoundContainer, NotFoundWrapper } from "./styled";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = () => {
	const navigate = useNavigate();
	return (
		<NotFoundWrapper>
			<NotFoundContainer>
				<Box
					display={"flex"}
					flexDirection={"column"}
					gap={"24px"}
					alignItems={"center"}
				>
					<Box display={"flex"} flexDirection={"column"}  alignItems={"center"} justifyContent={"center"}>
						<Typography
							fontWeight={"500"}
							fontFamily={"Rokkitt"}
							// lineHeight={"96px"}
							fontSize={"128px"}
						>
							404
						</Typography>
						{/* <Box width={"1px"} flex={1} bgcolor={"white"} />{" "} */}
						<Typography
							fontWeight={"300"}
							fontFamily={"Rokkitt"}
							fontSize={"36px"}
						>
							Oops, Something Went Wrong!
						</Typography>
					</Box>
					<Box>
						<Typography
							textAlign={"center"}
							fontWeight={"300"}
							fontSize={"20px"}
							fontFamily={"Rokkitt"}
						>
							We apologize, we cannot find the page you are looking for. <br />
							Please contact our Client Services or navigate to another page.
							Thank you...
						</Typography>
					</Box>
					<Box
						display={"grid"}
						sx={{
							gridTemplateColumns: "repeat(2 , minmax(0,1fr))",
						}}
						gap={"12px"}
					>
						<Button
							variant="outlined"
							sx={{
								textTransform: "none",
								fontFamily: "Poppins",
								fontWeight: "400",
							}}
							onClick={() => navigate("/")}
						>
							Take Me Home
						</Button>
						<Button
							variant="outlined"
							sx={{
								textTransform: "none",
								fontFamily: "Poppins",
								fontWeight: "400",
							}}
							onClick={() => navigate(-1)}
						>
							Go Back
						</Button>
					</Box>
				</Box>
			</NotFoundContainer>
		</NotFoundWrapper>
	);
};
