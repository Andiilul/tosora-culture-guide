import { useCallback, useMemo } from "react";
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef,
} from "material-react-table";
import { Timestamp } from "firebase/firestore";
import { Link as Rlinks } from "react-router-dom";

interface MRTTableProps {
	data: SitesTypes[];
	setOnDelete: (site: SitesTypes) => void; // Update this line
	setOpenDescription: (value: string) => void; // Update this line
}

const MRTTable: React.FC<MRTTableProps> = ({
	data,
	setOnDelete,
	setOpenDescription,
}) => {
	const columns = useMemo<MRT_ColumnDef<SitesTypes>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				Cell: ({ cell }) => {
					const copyToClipboard = (text: string) => {
						navigator.clipboard.writeText(text).then(() => {});
					};

					return (
						<Button
							variant="text"
							sx={{
								textTransform: "none",
							}}
							onClick={() => copyToClipboard(cell.getValue() as string)}
						>
							{cell.getValue() as string}
						</Button>
					);
				},
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
				accessorKey: "catchphrase",
				header: "Catchphrase",
			},
			{
				accessorKey: "location",
				header: "Location",
				Cell: ({ cell }) => (
					<Link
						href={`${cell.getValue<string>()}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						View In Map
					</Link>
				),
			},
			{
				accessorKey: "embedded_maplink",
				header: "Embedded Map",
				Cell: ({ cell }) => (
					<Tooltip title={`${cell.getValue<string>()}`}>
						<Button>Copy</Button>
					</Tooltip>
				),
			},
			{
				accessorKey: "designationYear",
				header: "Designation Year",
			},
			{
				accessorKey: "image_path",
				header: "Image",
				Cell: ({ cell }) => (
					<>
						{cell.getValue<string[]>().map((url, index) => (
							<Link key={index} href={url}>
								<Button key={index} title={url}>
									Preview
								</Button>
							</Link>
						))}
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
		[setOnDelete, setOpenDescription]
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
	Tooltip,
	Typography,
} from "@mui/material";
import { AdminSiteWrapper } from "./styled";
import { SitesTypes } from "../../../types/sites";
import { deleteSite, getAllSites } from "../../../services/admin/sites";
import { Delete, Edit } from "@mui/icons-material";
import { formatDateString } from "../../../services/dateformatter";

export const AdminSites: React.FC = () => {
	const [data, setData] = useState<SitesTypes[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [onDelete, setOnDelete] = useState<undefined | SitesTypes>(undefined);
	const [openDescription, setOpenDescription] = useState<string | undefined>(
		undefined
	);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const result = await getAllSites(); // Replace with your collection name
			setData(result); // Ensure result matches SitesTypes
		} catch (error) {
			setError("Failed to fetch data.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData(); // Fetch data on mount
	}, [fetchData]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const handleDelete = async (sites: SitesTypes) => {
		await deleteSite(sites);
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
				<Typography color={"primary"}>Data Situs Budaya</Typography>
			</Box>			<Box display={"flex"} flexDirection={"column"} gap={"24px"}>
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
						Are You Sure You Want to Delete this Site
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOnDelete(undefined)}>Disagree</Button>
					<Button
						onClick={() => handleDelete(onDelete as SitesTypes)}
						autoFocus
					>
						Agree
					</Button>
				</DialogActions>
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
