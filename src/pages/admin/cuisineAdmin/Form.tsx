import React, { ChangeEvent, useEffect, useState } from "react";
import {
	Avatar,
	Badge,
	Box,
	Button,
	CardActionArea,
	CircularProgress,
	IconButton,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { Navigate, Link as Rlinks, useParams } from "react-router-dom";
// import "react-quill/dist/quill.snow.css";

// import ReactQuill from "react-quill";
import { useTheme } from "@mui/material";
import { FormWrapper } from "./styled";
import { Add, AddAPhoto, Delete } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import {
	AddCuisineInput,
	Recipe,
	UpdateCuisineInput,
} from "../../../types/cuisine";
import {
	createCuisine,
	getOneCuisine,
	updateCuisine,
} from "../../../services/admin/cuisine";
import { deleteAllImage, uploadImages } from "../../../services/image";

interface AdminCuisineFormProps {
	isedit?: boolean;
}

const AdminCuisineForm: React.FC<AdminCuisineFormProps> = ({
	isedit = false,
}) => {
	const theme = useTheme();
	const { id } = useParams<{ id?: string }>();
	const [checked, setChecked] = useState<boolean>(true);

	const [recipe, setRecipe] = useState<Recipe>({
		ingredients: [""],
		steps: [""],
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setChecked(event.target.checked);
	};

	const handleIngredientChange = (
		index: number,
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const target = event.target as HTMLInputElement; // Type assertion
		const newIngredients = [...recipe.ingredients];
		newIngredients[index] = target.value;
		setRecipe({ ...recipe, ingredients: newIngredients });
	};

	const handleAddIngredient = (): void => {
		setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
	};

	const handleRemoveIngredient = (index: number): void => {
		const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
		setRecipe({ ...recipe, ingredients: newIngredients });
	};
	const handleStepChange = (
		index: number,
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const target = event.target as HTMLInputElement; // Type assertion
		const newSteps = [...recipe.steps];
		newSteps[index] = target.value;
		setRecipe({ ...recipe, steps: newSteps });
	};

	const handleAddStep = (): void => {
		setRecipe({ ...recipe, steps: [...recipe.steps, ""] });
	};

	const handleRemoveStep = (index: number): void => {
		const newSteps = recipe.steps.filter((_, i) => i !== index);
		setRecipe({ ...recipe, steps: newSteps });
	};

	const [cuisine, setCuisine] = useState<AddCuisineInput>({
		name: "",
		description: "",
		duration: NaN,
		image_path: "",
		recipe: null,
	});
	const [loading, setLoading] = useState<boolean>(true);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const [error, setError] = useState<string | null>(null);
	const [redirect, setRedirect] = useState<boolean>(false);
	const [imgs, setImgs] = useState<File | undefined>(undefined);

	useEffect(() => {
		if (isedit && id) {
			const fetchCuisines = async () => {
				try {
					const cuisineData = await getOneCuisine(id);
					if (cuisineData) {
						setCuisine(cuisineData);
						if (cuisineData.recipe !== null) {
							setRecipe(cuisineData.recipe);
						}
					} else {
						setError("Invalid parameter: Cuisines not found.");
					}
				} catch (error) {
					setError("Failed to fetch cuisine data.");
				} finally {
					setLoading(false);
				}
			};

			fetchCuisines();
		} else {
			setLoading(false);
		}
	}, [isedit, id]);

	const handleAdd = async () => {
		setSubmitting(true);
		const preGeneratedId = cuisine.name
			.trim()
			.replace(/\s+/g, " ")
			.replace(/ /g, "-")
			.toLowerCase();

		let imgUrls: string[] = [];
		if (imgs) {
			imgUrls = await uploadImages("cuisines", preGeneratedId, [imgs]);
		}

		const newCuisine = {
			...cuisine,
			image_path: imgUrls[0] || "",
			recipe: checked ? recipe : null,
		};
		await createCuisine(newCuisine, preGeneratedId, imgUrls[0]);
		setRedirect(true);
	};

	const handleEdit = async () => {
		if (id) {
			let imgURLS = cuisine.image_path;
			if (imgs && cuisine.image_path) {
				await deleteAllImage(cuisine.image_path);
				imgURLS = "";
			}

			if (imgs) {
				const newImgUrls = await uploadImages("cuisines", id, [imgs]);
				imgURLS = newImgUrls[0];
			}

			const updateCuisineInput: UpdateCuisineInput = {
				...cuisine,
				image_path: imgURLS,
				recipe: recipe,
			};
			await updateCuisine({ id, cuisine: updateCuisineInput });
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
		return <Navigate to="/admin/cuisine" />;
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
					label="Nama"
					fullWidth
					required
					value={cuisine.name}
					onChange={(e) =>
						setCuisine((prev) => ({ ...prev, name: e.target.value }))
					}
					sx={{ mb: 2 }}
				/>
				<TextField
					label="Deskripsi"
					fullWidth
					required
					multiline
					maxRows={4}
					value={cuisine.description}
					onChange={(e) =>
						setCuisine((prev) => ({ ...prev, description: e.target.value }))
					}
					sx={{ mb: 2 }}
				/>
				{/* <TextField
					label="Lama Pembuatan"
					fullWidth
					required
					type="number"
					value={cuisine.duration}
					onChange={(e) =>
						setCuisine((prev) => ({
							...prev,
							duration: +e.target.value,
						}))
					}
					sx={{ mb: 2 }}
				/> */}

				<TextField
					label="Lama Pembuatan (menit)"
					type="number"
					fullWidth
					required
					InputProps={{ inputProps: { min: 0 } }}
					value={cuisine.duration}
					onChange={(e) =>
						setCuisine((prev) => ({
							...prev,
							duration: Number(e.target.value), // Convert to number
						}))
					}
					sx={{ mb: 2 }}
				/>
				<Box display={"flex"} flexDirection={"column"}>
					<Box display={"flex"} gap={"12px"} alignItems={"center"}>
						<Typography fontSize={"12px"} color={"primary"}>
							Resep :
						</Typography>
						<Switch size="small" checked={checked} onChange={handleChange} />
					</Box>
					<Box display={"flex"} flexDirection={"column"} width={"100%"}>
						<Box
							display={"flex"}
							gap={"12px"}
							padding={"8px"}
							flexDirection={"column"}
							flex={1}
						>
							<Typography fontSize={"12px"} color={"primary"}>
								Bahan :
							</Typography>
							<Box display={"flex"} flexDirection={"column"} gap={"4px"}>
								{recipe.ingredients.map((ingredient, index) => (
									<Box key={index} width={"100%"} display={"flex"} gap={"8px"}>
										<TextField
											fullWidth
											required={checked}
											inputProps={{ style: { fontSize: 12 } }}
											disabled={!checked}
											size="small"
											placeholder={"Add Ingredients"}
											value={ingredient}
											onChange={(event) => handleIngredientChange(index, event)}
										/>

										<IconButton
											disabled={recipe.ingredients.length <= 1 || !checked}
											onClick={() => handleRemoveIngredient(index)}
										>
											<Delete fontSize="small" />
										</IconButton>
									</Box>
								))}
								<Button disabled={!checked} onClick={handleAddIngredient}>
									<Add />
									Tambah Bahan
								</Button>
							</Box>
						</Box>
						<Box
							display={"flex"}
							gap={"12px"}
							padding={"8px"}
							flexDirection={"column"}
							flex={1}
						>
							<Typography fontSize={"12px"} color={"primary"}>
								Langkah Langkah :
							</Typography>
							<Box display={"flex"} flexDirection={"column"} gap={"4px"}>
								{recipe.steps.map((step, index) => (
									<Box key={index} width={"100%"} display={"flex"} gap={"8px"}>
										<TextField
											fullWidth
											required={checked}
											inputProps={{ style: { fontSize: 12 } }}
											disabled={!checked}
											size="small"
											value={step}
											onChange={(event) => handleStepChange(index, event)}
										/>
										<IconButton
											disabled={recipe.steps.length <= 1 || !checked}
											onClick={() => handleRemoveStep(index)}
										>
											<Delete fontSize="small" />
										</IconButton>
									</Box>
								))}
								<Button disabled={!checked} onClick={handleAddStep}>
									<Add />
									Tambah Langkah
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
				{isedit && (
					<Box>
						<Box display={"flex"} flexDirection={"column"} gap={"8px"}>
							<Typography fontSize={"12px"} color={"primary"}>
								{cuisine.image_path ? "Current Images" : "Add Image"}
							</Typography>
							<Box padding={"8px"} display={"flex"} gap={"12px"}>
								{cuisine.image_path && (
									<Badge>
										<Box width={"100px"} height={"100px"} position={"relative"}>
											<Avatar
												src={cuisine.image_path}
												alt={cuisine.name}
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
												alt={cuisine.name}
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
														{cuisine.image_path
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
												alt={cuisine.name}
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
					<Rlinks to={"/admin/cuisine"}>
						<Button variant="text">Cancel</Button>
					</Rlinks>
				</Box>
			</Box>
		</FormWrapper>
	);
};

export default AdminCuisineForm;
