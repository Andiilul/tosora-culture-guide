import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../../../../components/_layout/pageLayout/pageLayout";
import { getOneCuisine } from "../../../../services/admin/cuisine";
import { CuisineTypes } from "../../../../types/cuisine";
import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { formatDateString } from "../../../../services/dateformatter";
import {
	ArrowBack,
	AvTimer,
	DateRangeOutlined,
	RiceBowl,
} from "@mui/icons-material";

interface EntertainmentsDetailProps {}

export const EntertainmentsDetail: React.FC<EntertainmentsDetailProps> = () => {
	const { id } = useParams();
	const theme = useTheme();

	const [cuisine, setCuisine] = useState<CuisineTypes>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const image = "380px";

	useEffect(() => {
		if (id) {
			const fetchSite = async () => {
				try {
					const siteData = await getOneCuisine(id);
					if (siteData) {
						setCuisine(siteData);
					} else {
						setError("Invalid parameter: Data not found.");
					}
				} catch (error) {
					setError("Failed to fetch site data.");
				} finally {
					setLoading(false);
				}
			};

			fetchSite();
		} else {
			setLoading(false);
		}
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<PageLayout>
			<Button
				href="/explore/cuisines"
				sx={{
					width: "max-content",
				}}
				size="large"
			>
				<ArrowBack />
				Back
			</Button>
			<Box
				width={"100%"}
				display={"flex"}
				flexDirection={"column"}
				gap={"24px"}
			>
				<Typography fontFamily={"Poppins"} fontSize={"32px"} fontWeight={300}>
					{cuisine?.name}{" "}
				</Typography>
				<Box display={"flex"} gap={"12px"}>
					<Typography fontFamily={"Poppins"} fontSize={"12px"} fontWeight={300}>
						<DateRangeOutlined color="primary" fontSize="inherit" /> Created At{" "}
						{formatDateString(cuisine?.createdAt.toDate().toString() as string)}
					</Typography>
					<Typography fontFamily={"Poppins"} fontSize={"12px"} fontWeight={300}>
						<DateRangeOutlined color="primary" fontSize="inherit" /> Last
						Updated At{" "}
						{formatDateString(cuisine?.updatedAt.toDate().toString() as string)}{" "}
					</Typography>
				</Box>
				<Avatar
					variant="square"
					sx={{
						width: "100%",
						height: image,
					}}
					src={
						cuisine?.image_path ? cuisine.image_path : "/assets/not-found.webp"
					}
				></Avatar>
				<Box
					display={"flex"}
					width={"100%"}
					justifyContent={"center"}
					gap={"12px"}
				>
					<Box
						display={"flex"}
						padding={"12px"}
						flexDirection={"column"}
						alignItems={"center"}
						gap={"12px"}
					>
						<Box
							fontFamily={"Poppins"}
							fontSize={"24px"}
							display={"flex"}
							alignItems={"center"}
							gap={"4px"}
						>
							<AvTimer fontSize="inherit" />
							<Typography
								component={"span"}
								fontFamily={"Poppins"}
								fontSize={"18px"}
								fontWeight={400}
							>
								Lama Pembuatan
							</Typography>
						</Box>
						<Typography fontFamily={"Poppins"} fontSize={"14px"}>
							± {cuisine?.duration} Menit
						</Typography>
					</Box>
					<Box maxWidth={"1px"} flex={1} bgcolor={theme.palette.primary.main} />
					<Box
						display={"flex"}
						padding={"12px"}
						flexDirection={"column"}
						alignItems={"center"}
						gap={"12px"}
					>
						<Box
							fontFamily={"Poppins"}
							fontSize={"24px"}
							display={"flex"}
							alignItems={"center"}
							gap={"4px"}
						>
							<RiceBowl fontSize="inherit" />
							<Typography
								component={"span"}
								fontFamily={"Poppins"}
								fontSize={"18px"}
								fontWeight={400}
							>
								{" "}
								Jumlah Bahan
							</Typography>
						</Box>
						<Typography fontFamily={"Poppins"} fontSize={"14px"}>
							{cuisine?.recipe === null
								? "N/A"
								: cuisine?.recipe?.ingredients.length}
						</Typography>
					</Box>
				</Box>
				<Box
					display={"flex"}
					flexDirection={"column"}
					gridTemplateColumns={"repeat(2,minmax(0,1fr))"}
					gap={"48px"}
				>
					<Box display={"flex"} flexDirection={"column"} gap={"12px"}>
						<Typography fontFamily={"Poppins"} fontSize={"20px"}>
							Deskripsi :
						</Typography>
						<Typography
							fontFamily={"Poppins"}
							fontSize={"14px"}
							textAlign={"justify"}
						>
							{cuisine?.description}
						</Typography>
					</Box>
					{cuisine?.recipe === null ? (
						<Typography>Resep Tidak Tersedia</Typography>
					) : (
						<Box display={"flex"} flexDirection={"column"} gap={"12px"}>
							<Typography fontFamily={"Poppins"} fontSize={"20px"}>
								Resep :
							</Typography>
							<Typography fontFamily={"Poppins"} fontSize={"14px"}>
								Bahan Bahan :
							</Typography>
							<Typography fontFamily={"Poppins"} fontSize={"14px"}>
								<ul>
									{cuisine?.recipe?.ingredients.map((map, index) => (
										<li key={index}>{map}</li>
									))}
								</ul>
								<Typography fontFamily={"Poppins"} fontSize={"14px"}>
									Langkah Langkah :
								</Typography>
								<ol>
									{cuisine?.recipe?.steps.map((map, index) => (
										<li key={index}>{map}</li>
									))}
								</ol>
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</PageLayout>
	);
};
