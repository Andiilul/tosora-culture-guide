import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
	Avatar,
	Badge,
	Box,
	Button,
	CardActionArea,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import { Link as Rlinks } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import { deleteAllImage, uploadImages } from "../../../services/image";
import { useTheme } from "@mui/material";
import { FormWrapper } from "./styled";
import { AddAPhoto, Cancel, Delete, Undo } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { AddCultureInput, UpdateCultureInput } from "../../../types/culture";
import {
	createCulture,
	getOneCulture,
	updateCulture,
} from "../../../services/admin/culture";

interface AdminCultureFormProps {
	isedit?: boolean;
}

const AdminCultureForm: React.FC<AdminCultureFormProps> = ({
	isedit = false,
}) => {
	const theme = useTheme();
	const { id } = useParams<{ id?: string }>();
	const [culture, setCulture] = useState<AddCultureInput>({
		name: "",
		description: "",
		type: "customs",
		image_path: [],
	});
	const [loading, setLoading] = useState<boolean>(true);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const [error, setError] = useState<string | null>(null);
	const [redirect, setRedirect] = useState<boolean>(false);
	const [imgs, setImgs] = useState<File[]>([]);
	const [preDeletedImage, setPreDeletedImage] = useState<string[]>([]);

	useEffect(() => {
		if (isedit && id) {
			const fetchCulture = async () => {
				try {
					const cultureData = await getOneCulture(id);
					if (cultureData) {
						setCulture(cultureData);
					} else {
						setError("Invalid parameter: Culture not found.	");
					}
				} catch (error) {
					setError("Failed to fetch culture data.");
				} finally {
					setLoading(false);
				}
			};

			fetchCulture();
		} else {
			setLoading(false);
		}
	}, [isedit, id]);

	const handleDeleteClick = (map: string) => {
		setPreDeletedImage((prev) => [...prev, map]);
	};

	const handleUndoClick = (map: string) => {
		setPreDeletedImage((prev) => prev.filter((image) => image !== map));
	};

	const handleChangeType = (event: SelectChangeEvent) => {
		const selectedType = event.target.value as "customs" | "rites";
		setCulture((prev) => ({ ...prev, type: selectedType }));
	};

	const handleAdd = async () => {
		const preGeneratedId = culture.name
			.trim()
			.replace(/\s+/g, " ")
			.replace(/ /g, "-")
			.toLowerCase();
		const imgUrls = await uploadImages("culture", preGeneratedId, imgs);
		const newCulture = { ...culture, image_path: imgUrls };
		await createCulture(newCulture, preGeneratedId);
		setRedirect(true);
	};

	const handleEdit = async () => {
		if (id) {
			let imgUrls = culture.image_path;

			if (preDeletedImage.length > 0) {
				await deleteAllImage(preDeletedImage);
				imgUrls = imgUrls.filter((url) => !preDeletedImage.includes(url));
			}

			if (imgs.length > 0) {
				const newImgUrls = await uploadImages("cultures", id, imgs);
				imgUrls = [...imgUrls, ...newImgUrls];
			}

			const updateCultureInput: UpdateCultureInput = {
				...culture,
				image_path: imgUrls,
			};
			await updateCulture({ id, culture: updateCultureInput });
			setRedirect(true);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!isedit && imgs.length === 0) {
			return;
		}

		setSubmitting(true);

		try {
			if (isedit) {
				await handleEdit();
			} else {
				await handleAdd();
			}
		} catch (error) {
			console.error("Failed to submit form", error);
		} finally {
			setSubmitting(false);
		}
	};

	if (redirect) {
		return <Navigate to="/admin/cultures" />;
	}

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <Typography color={"primary"}>{error}</Typography>;
	}

	return (
		<FormWrapper>
			<Box
				display={"flex"}
				flexDirection={"column"}
				gap={"12px"}
				component="form"
				onSubmit={handleSubmit}
				sx={{ mt: 2 }}
			>
				<TextField
					label="Name"
					fullWidth
					required
					value={culture.name}
					onChange={(e) =>
						setCulture((prev) => ({ ...prev, name: e.target.value }))
					}
					sx={{ mb: 2 }}
				/>
				<TextField
					label="Description"
					fullWidth
					required
					value={culture.description}
					onChange={(e) =>
						setCulture((prev) => ({ ...prev, description: e.target.value }))
					}
					sx={{ mb: 2 }}
				/>
				<FormControl>
					<InputLabel id="demo-simple-select-label">Type</InputLabel>
					<Select
						value={culture.type}
						placeholder="Type"
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Type"
						onChange={handleChangeType}
					>
						<MenuItem value={"customs"}>Adat Istiadat</MenuItem>
						<MenuItem value={"rites"}>Ritual</MenuItem>
					</Select>
				</FormControl>
				{isedit && !imgs && (
					<Box>
						<Box display={"flex"} flexDirection={"column"} gap={"8px"}>
							<Typography fontSize={"12px"} color={"primary"}>
								Current Images :
							</Typography>
							<Box padding={"8px"} display={"flex"} gap={"12px"}>
								{culture.image_path.map((map, index) => (
									<Badge key={index}>
										<Box width={"100px"} height={"100px"} position={"relative"}>
											<Avatar
												src={map}
												alt={culture.name}
												sx={{
													width: "100%",
													height: "100%",
													borderRadius: "4px",
													border: "1px solid",

													objectPosition: "left",
													zIndex: "0",
												}}
											/>
										</Box>
										{preDeletedImage.includes(map) ? (
											<Box
												width={"100%"}
												height={"100%"}
												position={"absolute"}
												top={0}
												left={0}
												zIndex={1}
											>
												<CardActionArea
													onClick={() => handleUndoClick(map)}
													sx={{
														width: "100%",
														height: "100%",
														opacity: "0.8",
														transition: " 200ms",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														backgroundColor: "rgba(0,0,0,0.9)",
														":hover": {
															opacity: "1",
															transition: " 200ms",
														},
													}}
												>
													<Undo />
													<Typography>Undo</Typography>
												</CardActionArea>
											</Box>
										) : (
											<Box
												width={"100%"}
												height={"100%"}
												position={"absolute"}
												top={0}
												left={0}
												zIndex={1}
											>
												<CardActionArea
													sx={{
														width: "100%",
														height: "100%",
														opacity: "0",
														transition: " 200ms",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														backgroundColor: "rgba(0,0,0,0.9)",
														":hover": {
															opacity: "1",
															transition: " 200ms",
														},
													}}
													onClick={() => handleDeleteClick(map)}
												>
													<Delete />
													<Typography>Delete</Typography>
												</CardActionArea>
											</Box>
										)}
									</Badge>
								))}
							</Box>
						</Box>
					</Box>
				)}
				<Box display={"flex"} flexDirection={"column"} gap={"8px"}>
					<Typography fontSize={"12px"} color={"primary"}>
						Add Images :
					</Typography>
					<Box display={"flex"} padding={"8px"} gap={"12px"}>
						<Box display={"flex"} gap={"12px"}>
							{imgs.length > 0 && (
								<>
									{imgs.map((img, index) => (
										<Box
											key={index}
											width={"100px"}
											height={"100px"}
											border={"1px solid" + theme.palette.common.black}
											position={"relative"}
											borderRadius={"4px"}
										>
											<Avatar
												src={URL.createObjectURL(img)}
												alt={culture.name}
												sx={{
													width: "100%",
													height: "100%",
													borderRadius: "4px",
													objectPosition: "left",
												}}
											/>
											<CardActionArea
												onClick={() => {
													setImgs((prev) => prev.filter((_, i) => i !== index));
												}}
												sx={{
													position: "absolute",
													display: "flex",
													top: "0",
													left: "0",
													justifyContent: "center",
													alignItems: "center",
													width: "100%",
													height: "100%",
													opacity: "0",
													backgroundColor: "rgba(0,0,0,0.9)",
													transition: "200ms",
													":hover": {
														opacity: "1",
														transition: "200ms",
													},
												}}
											>
												<Box
													display={"flex"}
													fontSize={"12px"}
													gap={"4px"}
													alignItems={"center"}
												>
													<Cancel fontSize="inherit" />
													<Typography fontSize={"12px"}>Cancel</Typography>
												</Box>
											</CardActionArea>
										</Box>
									))}
								</>
							)}
						</Box>
						<Dropzone
							onDrop={(acceptedFiles) =>
								setImgs((prev) => [...prev, ...acceptedFiles])
							}
							accept={{ "image/png": [], "image/webp": [], "image/jpeg": [] }}
						>
							{({ getRootProps, getInputProps }) => (
								<Box
									{...getRootProps()}
									sx={{
										border: "1px solid",
										borderColor: theme.palette.primary.main,
										borderRadius: "4px",
										textAlign: "center",
										width: "100px",
										height: "100px",
										cursor: "pointer",
									}}
								>
									<input {...getInputProps()} />
									<CardActionArea
										sx={{
											display: "flex",
											width: "100%",
											height: "100%",
											justifyContent: "center",
											flexDirection: "column",
											gap: "8px",
											padding: "4px",
										}}
									>
										<AddAPhoto />
										<Typography
											fontSize={"12px"}
											lineHeight={"10px"}
											fontFamily={"Poppins"}
											fontWeight={"200"}
										>
											Add or Drop Image{" "}
										</Typography>
									</CardActionArea>
								</Box>
							)}
						</Dropzone>
					</Box>
				</Box>
				{/* preview file img*/}

				<Box display={"flex"} gap={"12px"}>
					<Button type="submit" variant="contained" disabled={submitting}>
						{submitting ? (
							<Box display={"flex"} gap={"4px"}>
								<Typography>{isedit ? "Updating" : "Submitting"}</Typography>
								<CircularProgress size={24} />
							</Box>
						) : isedit ? (
							"Update"
						) : (
							"Submit"
						)}
					</Button>
					<Rlinks to={"/admin/cultures"}>
						<Button variant="text">Cancel</Button>
					</Rlinks>
				</Box>
			</Box>
		</FormWrapper>
	);
};

export default AdminCultureForm;
