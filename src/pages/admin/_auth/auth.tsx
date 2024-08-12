import React, { useState } from "react";
import {
	Alert,
	Box,
	Button,
	Collapse,
	IconButton,
	Link,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { AuthContainer, AuthForm, AuthWrapper } from "./styled";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

interface AuthPageProps {}

export const AuthPage: React.FC<AuthPageProps> = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const [open, setOpen] = useState<boolean>(false);

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();

		// Custom validation
		if (!email || !password) {
			setError("Email and password fields cannot be empty.");
			setOpen(true);
			return;
		}

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCredential) {
				navigate("/admin/dashboard");
			}
		} catch (err) {
			setError("Invalid email or password.");
			setOpen(true);
		}
	};

	return (
		<AuthWrapper>
			<AuthContainer>
				<AuthForm component="form" onSubmit={handleLogin}>
					<Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
						<Typography
							color={theme.palette.text.primary}
							fontSize={"24px"}
							fontFamily={"Rokkitt"}
							fontWeight={"600"}
						>
							CultureGuide
						</Typography>
						<Typography
							color={theme.palette.text.primary}
							fontSize={"14px"}
							fontFamily={"Rokkitt"}
							fontWeight={"300"}
						>
							Welcome, Admin!
						</Typography>
					</Box>
					<Box display={"flex"} flexDirection={"column"} gap={"12px"}>
						<TextField
							variant="standard"
							placeholder="Enter Email"
							type="email"
							fullWidth
							required
							autoComplete="off"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							inputProps={{
								style: {
									fontSize: 12,
									fontWeight: "300",
									fontFamily: "Poppins",
									padding: "12px 12px",
								},
							}}
							InputLabelProps={{
								style: {
									fontSize: 12,
									fontWeight: "300",
									fontFamily: "Poppins",
									padding: "12px 12px",
								},
							}}
						/>
						<TextField
							variant="standard"
							placeholder="Enter Password"
							type="password"
							fullWidth
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							inputProps={{
								style: {
									fontSize: 12,
									fontWeight: "300",
									fontFamily: "Poppins",
									padding: "12px 12px",
								},
							}}
							InputLabelProps={{
								style: {
									fontSize: 12,
									fontWeight: "300",
									fontFamily: "Poppins",
									padding: "12px 12px",
								},
							}}
						/>
					</Box>
					<Box
						display={"flex"}
						flexDirection={"column"}
						alignItems={"center"}
						gap={"8px"}
					>
						<Button type="submit" fullWidth variant="outlined">
							Submit
						</Button>
						<Collapse in={open}>
							<Alert
								severity="error"
								action={
									<IconButton
										aria-label="close"
										color="inherit"
										size="small"
										onClick={() => {
											setOpen(false);
										}}
									>
										<Close fontSize="inherit" />
									</IconButton>
								}
								sx={{ mb: 2 }}
							>
								{error}
							</Alert>
						</Collapse>
						<Link href="/">
							<Typography fontSize={"12px"}>Back to Page</Typography>
						</Link>
					</Box>
				</AuthForm>
			</AuthContainer>
		</AuthWrapper>
	);
};
