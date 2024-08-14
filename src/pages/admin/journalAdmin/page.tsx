import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	CircularProgress,
	TextField,
	Typography,
} from "@mui/material";
import { FormWrapper } from "./styled";
import { JournalTypes } from "../../../types/journal";
import { getJournal, updateJournal } from "../../../services/admin/journal";
import { Timestamp } from "firebase/firestore";

const AdminJournalForm: React.FC = () => {
	const [journal, setJournal] = useState<JournalTypes | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchJournal = async () => {
			setLoading(true);
			try {
				const fetchedJournal = await getJournal();
				setJournal(fetchedJournal);
			} catch (error) {
				console.error("Error fetching journal:", error);
				setError("Failed to fetch journal.");
			} finally {
				setLoading(false);
			}
		};

		fetchJournal();
	}, []); // Empty dependency array means this useEffect runs once on mount

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setSubmitting(true);

		try {
			if (journal) {
				await updateJournal({ ...journal, updatedAt: Timestamp.now() });
				// Handle any additional logic after updating
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setError("Failed to submit form.");
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}


	if (error) {
		return <div>{error}</div>;
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
					value={journal?.name || ""}
					onChange={(e) =>
						setJournal((prev) =>
							prev ? { ...prev, name: e.target.value } : null
						)
					}
					sx={{ mb: 2 }}
				/>
				<TextField
					label="Link"
					fullWidth
					required
					value={journal?.link || ""}
					onChange={(e) =>
						setJournal((prev) =>
							prev ? { ...prev, link: e.target.value } : null
						)
					}
					sx={{ mb: 2 }}
				/>

				<Box display={"flex"} gap={"12px"}>
					<Button type="submit" variant="contained" disabled={submitting}>
						{submitting ? (
							<Box display={"flex"} gap={"4px"}>
								<Typography>Updating</Typography>
								<CircularProgress size={24} />
							</Box>
						) : (
							"Update"
						)}
					</Button>
				</Box>
			</Box>
		</FormWrapper>
	);
};

export default AdminJournalForm;
