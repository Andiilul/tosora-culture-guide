import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		"process.env.VITE_PUBLIC_apiKey": JSON.stringify(process.env.apiKey),
		"process.env.VITE_PUBLIC_projectId": JSON.stringify(process.env.projectId),
		"process.env.VITE_PUBLIC_storageBucket": JSON.stringify(process.env.storageBucket),
		"process.env.VITE_PUBLIC_messagingSenderId": JSON.stringify(
			process.env.messagingSenderId
		),
		"process.env.VITE_PUBLIC_appId": JSON.stringify(process.env.appId),
	},
});
