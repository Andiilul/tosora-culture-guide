import { useCallback, useMemo } from "react";
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef,
} from "material-react-table";
import { Timestamp } from "firebase/firestore";
import { Link as Rlinks } from "react-router-dom";

interface MRTTableProps {
	data: CuisineTypes[];
	setOnDelete: (cuisine: CuisineTypes) => void; // Update this line
	setOpenDescription: (value: string) => void; // Update this line
	setOpenRecipe: (recipe: Recipe) => void; // Update this line
}

const MRTTable: React.FC<MRTTableProps> = ({
	data,
	setOnDelete,
	setOpenDescription,
	setOpenRecipe,
}) => {
	const columns = useMemo<MRT_ColumnDef<CuisineTypes>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
			},
			{
				accessorKey: "name",
				header: "Name",
			},
			{
				accessorKey: "description",
				header: "Description",
				Cell: ({ cell }) => (
					<>
						<Button onClick={() => setOpenDescription(cell.getValue<string>())}>
							Preview
						</Button>
					</>
				),
			},
			{
				accessorKey: "recipe",
				header: "Recipe",
				Cell: ({ cell }) => (
					<>
						<Button onClick={() => setOpenRecipe(cell.getValue<Recipe>())}>
							Preview
						</Button>
					</>
				),
			},
			{
				accessorKey: "image_path",
				header: "Image",
				Cell: ({ cell }) => (
					<>
						<Link href={cell.getValue<string>()}>
							<Button>Preview</Button>
						</Link>
					</>
				),
			},
			{
				accessorKey: "createdAt",
				header: "Created At",
				Cell: ({ cell }) =>
					formatDateString(cell.getValue<Timestamp>().toDate().toString()),
			},
			{
				accessorKey: "updatedAt",
				header: "Updated At",
				Cell: ({ cell }) =>
					formatDateString(cell.getValue<Timestamp>().toDate().toString()),
			},
			{
				id: "actions",
				header: "Actions",
				Cell: ({ row }) => (
					<div>
						<Rlinks to={`./edit/${row.original.id}`}>
							<IconButton color="primary">
								<Edit />
							</IconButton>
						</Rlinks>
						<IconButton color="error" onClick={() => setOnDelete(row.original)}>
							<Delete />
						</IconButton>
					</div>
				),
			},
		],
		[setOnDelete, setOpenDescription, setOpenRecipe]
	);

	const table = useMaterialReactTable({
		columns,
		data,
	});

	return <MaterialReactTable table={table} />;
};

export default MRTTable;

import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Link,
	Typography,
} from "@mui/material";
import { AdminSiteWrapper } from "./styled";
import { Delete, Edit } from "@mui/icons-material";
import { formatDateString } from "../../../services/dateformatter";
import { CuisineTypes, Recipe } from "../../../types/cuisine";
import { deleteCuisine, getAllCuisine } from "../../../services/admin/cuisine";

export const AdminCuisine: React.FC = () => {
	const [data, setData] = useState<CuisineTypes[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [onDelete, setOnDelete] = useState<undefined | CuisineTypes>(undefined);
	const [openDescription, setOpenDescription] = useState<string | undefined>(
		undefined
	);
	const [openRecipe, setOpenRecipe] = useState<Recipe | undefined>(undefined);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null); // Reset error state before fetching
		try {
			const result = await getAllCuisine();
			setData(result);
		} catch (err) {
			setError("Failed to fetch data.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const handleDelete = async (cuisine: CuisineTypes) => {
		await deleteCuisine(cuisine);
		setOnDelete(undefined);
		fetchData();
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<AdminSiteWrapper>
			<Box padding={"12px 0"}>
				<Typography color={"primary"}>Data Kuliner</Typography>
			</Box>
			<Box display={"flex"} flexDirection={"column"} gap={"24px"}>
				<Rlinks
					to={"./add"}
					style={{
						textTransform: "none",
					}}
				>
					<Button
						variant="contained"
						sx={{
							width: "max-content",
						}}
					>
						<Typography color={"#222222"}>Tambah +</Typography>
					</Button>
				</Rlinks>
				<Box>
					<MRTTable
						data={data}
						setOnDelete={setOnDelete}
						setOpenDescription={setOpenDescription}
						setOpenRecipe={setOpenRecipe}
					/>
				</Box>
			</Box>
			<Dialog
				open={onDelete !== undefined}
				onClose={() => setOnDelete(undefined)}
			>
				<DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are You Sure You Want to Delete this Cuisines?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOnDelete(undefined)}>Disagree</Button>
					<Button
						onClick={() => handleDelete(onDelete as CuisineTypes)}
						autoFocus
					>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={openRecipe !== undefined}
				onClose={() => setOpenRecipe(undefined)}
			>
				<Box
					sx={{
						minWidth: "480px",
						padding: "12px",
						minHeight: "480px",
						display: "flex",
						flexDirection: "column",
						gap: "12px",
					}}
				>
					<Typography>Resep :</Typography>
					<Box
						sx={{
							border: "1px solid #cccccc",
							borderRadius: "4px",
							padding: "4px",
							overflowY: "auto",
						}}
						flex={1}
						title="preview"
					>
						<Typography>Recipe</Typography>
						<Typography>Ingredients : </Typography>
						<ol>
							{openRecipe?.ingredients.map((map, index) => (
								<li key={index}>{map}</li>
							))}
						</ol>
						<Typography>Steps : </Typography>
						<ol>
							{openRecipe?.steps.map((map, index) => (
								<li key={index}>{map}</li>
							))}
						</ol>
					</Box>
				</Box>
			</Dialog>
			<Dialog
				open={openDescription !== undefined}
				onClose={() => setOpenDescription(undefined)}
			>
				<Box
					sx={{
						minWidth: "480px",
						padding: "12px",
						minHeight: "480px",
						display: "flex",
						flexDirection: "column",
						gap: "12px",
					}}
				>
					<Typography>Deskripsi :</Typography>
					<Box
						sx={{
							border: "1px solid #cccccc",
							borderRadius: "4px",
							padding: "4px",
							overflowY: "auto",
						}}
						flex={1}
						title="preview"
						dangerouslySetInnerHTML={{
							__html: openDescription as string,
						}}
					/>
				</Box>
			</Dialog>
		</AdminSiteWrapper>
	);
};
