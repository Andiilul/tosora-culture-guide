import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
	Box,
	Button,
	CircularProgress,
	TextField,
	Typography,
} from "@mui/material";
import { createSites, getOneSite, updateSite } from "../../../services/sites";
import { AddSiteInput, UpdateSiteInput } from "../../../types/sites";
import { Link as Rlinks } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebaseConfig";

interface AdminSitesFormProps {
	isedit?: boolean;
}

const AdminSitesForm: React.FC<AdminSitesFormProps> = ({ isedit = false }) => {
	const { id } = useParams<{ id?: string }>();
	const [site, setSite] = useState<AddSiteInput>({
		name: "",
		description: "",
		catchphrase: "",
		location: "",
		embedded_maplink: "",
		designationYear: new Date().getFullYear(),
		image_path: [],
	});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [redirect, setRedirect] = useState<boolean>(false);
	const [imgs, setImgs] = useState<File[]>([]);

	useEffect(() => {
		if (isedit && id) {
			const fetchSite = async () => {
				try {
					const siteData = await getOneSite(id);
					if (siteData) {
						setSite(siteData);
					} else {
						setError("Invalid parameter: Site not found.");
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
	}, [isedit, id]);

	const handleDescriptionChange = (value: string) => {
		setSite((prev) => ({ ...prev, description: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setImgs(Array.from(e.target.files));
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!isedit && imgs.length === 0) {
			return;
		}

		try {
			// Upload each image and get their URLs
			const imgUrls = await Promise.all(
				imgs.map(async (img) => {
					const imgRef = ref(storage, `sites/${Date.now()}-${img.name}`);
					await uploadBytes(imgRef, img);
					const imgUrl = await getDownloadURL(imgRef);
					return imgUrl;
				})
			);

			// Update the site object with the image URLs
			const updatedSite = {
				...site,
				image_path: imgUrls,
			};

			if (isedit && id) {
				const updateSiteInput: UpdateSiteInput = { ...updatedSite };
				await updateSite({ id, site: updateSiteInput });
				console.log("Updating site", updatedSite);
				setRedirect(true);

			} else {
				const newSite = await createSites(updatedSite);
				console.log(newSite.id);
				setRedirect(true);
				console.log("Adding new site", updatedSite);
			}
		} catch (error) {
			console.error("Failed to submit form", error);
		}
	};

	if (redirect) {
		return <Navigate to="/admin/sites" />;
	}

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <Typography color={"primary"}>{error}</Typography>;
	}

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
			<TextField
				label="Name"
				fullWidth
				required
				value={site.name}
				onChange={(e) => setSite((prev) => ({ ...prev, name: e.target.value }))}
				sx={{ mb: 2 }}
			/>
			{/* <TextField
				label="Description"
				fullWidth
				required
				multiline
				maxRows={4}
				value={site.description}
				onChange={(e) =>
					setSite((prev) => ({ ...prev, description: e.target.value }))
				}
				sx={{ mb: 2 }}
			/> */}

			<TextField
				label="Catchphrase"
				fullWidth
				required
				multiline
				maxRows={4}
				value={site.catchphrase}
				onChange={(e) =>
					setSite((prev) => ({ ...prev, catchphrase: e.target.value }))
				}
				sx={{ mb: 2 }}
			/>
			<TextField
				label="Location"
				fullWidth
				required
				value={site.location}
				onChange={(e) =>
					setSite((prev) => ({ ...prev, location: e.target.value }))
				}
				sx={{ mb: 2 }}
			/>
			<TextField
				label="Embedded Map Link"
				fullWidth
				value={site.embedded_maplink}
				onChange={(e) =>
					setSite((prev) => ({ ...prev, embedded_maplink: e.target.value }))
				}
				sx={{ mb: 2 }}
			/>
			<TextField
				label="Designation Year"
				fullWidth
				type="number"
				value={site.designationYear}
				onChange={(e) =>
					setSite((prev) => ({
						...prev,
						designationYear: Number(e.target.value),
					}))
				}
				sx={{ mb: 2 }}
			/>
			<Box
				display={"flex"}
				flexDirection={"column"}
				width={"100%"}
				mb={2}
				// bgcolor={"white"}
				padding={"12px"}
				borderRadius={"8px"}
			>
				<Typography color={"primary"} fontSize={"12px"}>
					Description :
					{/* <Typography color={"primary"} variant="caption">Rich Text Editor</Typography> */}
				</Typography>
				<Box
					display={"flex"}
					flexDirection={"column"}
					gap={"12px"}
					padding={"12px"}
				>
					<Box flex={1}>
						<Typography color={"primary"} fontSize={"12px"}>
							Editor:
						</Typography>
						<ReactQuill
							theme="snow"
							value={site.description}
							onChange={handleDescriptionChange}
						/>

						{/* {site.description} */}
					</Box>
					<Typography color={"primary"} fontSize={"12px"}>
						Preview:
					</Typography>
					<Box
						display={"flex"}
						width={"100%"}
						padding={"12px"}
						border={"#cccccc 1px solid"}
						borderRadius={"4px"}
					>
						<Box
							sx={{
								userSelect: "none",
							}}
							flex={1}
							title="preview"
							dangerouslySetInnerHTML={{
								__html:
									site.description.length !== 0
										? site.description
										: "<p>Preview Here</p>",
							}}
						/>
					</Box>
				</Box>
			</Box>
			<Box padding={"12px"}>
				<Typography fontSize={"12px"} color={"primary"}>
					Image
				</Typography>
				<input
					type="file"
					title="Picture"
					multiple
					onChange={handleFileChange}
				/>
			</Box>
			<Box display={"flex"} gap={"12px"}>
				<Button type="submit" variant="contained">
					{isedit ? "Update" : "SUBMIT"}
				</Button>
				<Rlinks to={"/admin/sites"}>
					<Button variant="text">Cancel</Button>
				</Rlinks>
			</Box>
		</Box>
	);
};

export default AdminSitesForm;
