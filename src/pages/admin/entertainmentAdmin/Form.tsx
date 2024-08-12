import React, { useEffect, useState } from "react";
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
import { Navigate, Link as Rlinks, useParams } from "react-router-dom";
// import "react-quill/dist/quill.snow.css";

// import ReactQuill from "react-quill";
import { useTheme } from "@mui/material";
import { FormWrapper } from "./styled";
import { AddAPhoto, Delete } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { deleteAllImage, uploadImages } from "../../../services/image";

import {
	AddEntertainmentInput,
	UpdateEntertainmentInput,
} from "../../../types/entertainment";
import {
	createEntertainments,
	getOneEntertainments,
	updateEntertainment,
} from "../../../services/admin/entertainment";

interface AdminEntertainmentFormProps {
	isedit?: boolean;
}

const AdminEntertainmentForm: React.FC<AdminEntertainmentFormProps> = ({
	isedit = false,
}) => {
	const theme = useTheme();
	const { id } = useParams<{ id?: string }>();

	const [entertainment, setEntertainment] = useState<AddEntertainmentInput>({
		name: "",
		description: "",
		type: "Arts",
		image_path: "",
	});

	const handleChangeType = (event: SelectChangeEvent) => {
		const selectedType = event.target.value as
			| "Arts"
			| "Folk-Games"
			| "Traditional-Sports";
		setEntertainment((prev) => ({ ...prev, type: selectedType }));
	};

	const [loading, setLoading] = useState<boolean>(true);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const [error, setError] = useState<string | null>(null);
	const [redirect, setRedirect] = useState<boolean>(false);
	const [imgs, setImgs] = useState<File | undefined>(undefined);

	useEffect(() => {
		if (isedit && id) {
			const fetchEntertainment = async () => {
				try {
					const entertainmentData = await getOneEntertainments(id);
					if (entertainmentData) {
						setEntertainment(entertainmentData);
					} else {
						setError("Invalid parameter: Knowledge not found.");
					}
				} catch (error) {
					setError("Failed to fetch knowledge data.");
				} finally {
					setLoading(false);
				}
			};

			fetchEntertainment();
		} else {
			setLoading(false);
		}
	}, [isedit, id]);

	const handleAdd = async () => {
		setSubmitting(true);
		const preGeneratedId = entertainment.name
			.trim()
			.replace(/\s+/g, " ")
			.replace(/ /g, "-")
			.toLowerCase();

		let imgUrls: string[] = [];
		if (imgs) {
			imgUrls = await uploadImages("entertainment", preGeneratedId, [imgs]);
		}

		const newEntertainments = {
			...entertainment,
			image_path: imgUrls[0] || "",
		};
		await createEntertainments(newEntertainments, preGeneratedId, imgUrls[0]);
		setRedirect(true);
	};

	const handleEdit = async () => {
		if (id) {
			let imgURLS = entertainment.image_path;
			if (imgs && entertainment.image_path) {
				await deleteAllImage(entertainment.image_path);
				imgURLS = "";
			}

			if (imgs) {
				const newImgUrls = await uploadImages("wisdom", id, [imgs]);
				imgURLS = newImgUrls[0];
			}

			const updateWisdoms: UpdateEntertainmentInput = {
				...entertainment,
				image_path: imgURLS,
			};
			await updateEntertainment({ id, entertainment: updateWisdoms });
			setRedirect(true);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
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
		return <Navigate to="/admin/entertainment" />;
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
				sx={{ mt: 2 }}
				onSubmit={handleSubmit}
			>
				<TextField
					label="Name"
					fullWidth
					required
					value={entertainment.name}
					onChange={(e) =>
						setEntertainment((prev) => ({ ...prev, name: e.target.value }))
					}
					sx={{ mb: 2 }}
				/>
				<TextField
					label="Description"
					fullWidth
					required
					multiline
					maxRows={4}
					value={entertainment.description}
					onChange={(e) =>
						setEntertainment((prev) => ({
							...prev,
							description: e.target.value,
						}))
					}
					sx={{ mb: 2 }}
				/>
				<FormControl>
					<InputLabel id="demo-simple-select-label">Type</InputLabel>
					<Select
						value={entertainment.type}
						placeholder="Type"
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Type"
						onChange={handleChangeType}
					>
						<MenuItem value={"Arts"}>Seni</MenuItem>
						<MenuItem value={"Folk-Games"}>Permainan Rakyat</MenuItem>
						<MenuItem value={"Traditional-Sports"}>
							Olahraga Tradisional
						</MenuItem>
					</Select>
				</FormControl>
				{isedit && (
					<Box>
						<Box display={"flex"} flexDirection={"column"} gap={"8px"}>
							<Typography fontSize={"12px"} color={"primary"}>
								{entertainment.image_path ? "Current Images" : "Add Image"}
							</Typography>
							<Box padding={"8px"} display={"flex"} gap={"12px"}>
								{entertainment.image_path && (
									<Badge>
										<Box width={"100px"} height={"100px"} position={"relative"}>
											<Avatar
												src={entertainment.image_path}
												alt={entertainment.name}
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
									</Badge>
								)}
								{imgs ? (
									<Badge>
										<Box width={"100px"} height={"100px"} position={"relative"}>
											<Avatar
												src={imgs ? URL.createObjectURL(imgs) : ""}
												alt={entertainment.name}
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
										<Box
											width={"100%"}
											height={"100%"}
											position={"absolute"}
											top={0}
											left={0}
											zIndex={1}
										>
											<CardActionArea
												onClick={() => setImgs(undefined)}
												sx={{
													width: "100%",
													height: "100%",
													opacity: "0.3",
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
												<Delete />
												<Typography>Cancel</Typography>
											</CardActionArea>
										</Box>
									</Badge>
								) : (
									<Dropzone
										multiple={false}
										onDrop={(acceptedFiles) => setImgs(acceptedFiles[0])}
										accept={{
											"image/png": [],
											"image/webp": [],
											"image/jpeg": [],
										}}
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
														{entertainment.image_path
															? "Change Image"
															: "Add or Drop Image"}
													</Typography>
												</CardActionArea>
											</Box>
										)}
									</Dropzone>
								)}
							</Box>
						</Box>
					</Box>
				)}
				{!isedit && (
					<Box display={"flex"} flexDirection={"column"} gap={"8px"}>
						<Typography fontSize={"12px"} color={"primary"}>
							Add Images :
						</Typography>
						<Box display={"flex"} padding={"8px"} gap={"12px"}>
							<Box display={"flex"} gap={"12px"}>
								{imgs ? (
									<Badge>
										<Box width={"100px"} height={"100px"} position={"relative"}>
											<Avatar
												src={imgs ? URL.createObjectURL(imgs) : ""}
												alt={entertainment.name}
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
										<Box
											width={"100%"}
											height={"100%"}
											position={"absolute"}
											top={0}
											left={0}
											zIndex={1}
										>
											<CardActionArea
												onClick={() => setImgs(undefined)}
												sx={{
													width: "100%",
													height: "100%",
													opacity: "0.3",
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
												<Delete />
												<Typography>Cancel</Typography>
											</CardActionArea>
										</Box>
									</Badge>
								) : (
									<Dropzone
										multiple={false}
										onDrop={(acceptedFiles) => setImgs(acceptedFiles[0])}
										accept={{
											"image/png": [],
											"image/webp": [],
											"image/jpeg": [],
										}}
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
								)}
							</Box>
						</Box>
					</Box>
				)}
				{/* preview file img*/}
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
					<Rlinks to={"/admin/entertainment"}>
						<Button variant="text">Cancel</Button>
					</Rlinks>
				</Box>
			</Box>
		</FormWrapper>
	);
};

export default AdminEntertainmentForm;
