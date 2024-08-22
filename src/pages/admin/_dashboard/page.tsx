import React, { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

interface DashboardProps {}

interface Data {
	sites: number;
	works: number;
	cultures: number;
	wisdoms: number;
	cuisine: number;
	entertainment: number;
}

export const Dashboard: React.FC<DashboardProps> = () => {
	const [dataCounts, setDataCounts] = useState<Data>({
		sites: NaN,
		works: NaN,
		cultures: NaN,
		wisdoms: NaN,
		cuisine: NaN,
		entertainment: NaN,
	});

	useEffect(() => {
		const fetchDataCounts = async () => {
			try {
				const sitesSnapshot = await getCountFromServer(collection(db, "sites"));
				const worksSnapshot = await getCountFromServer(collection(db, "works"));
				const culturesSnapshot = await getCountFromServer(
					collection(db, "culture")
				);
				const wisdomsSnapshot = await getCountFromServer(
					collection(db, "wisdom")
				);
				const cuisineSnapshot = await getCountFromServer(
					collection(db, "cuisine")
				);
				const entertainmentSnapshot = await getCountFromServer(
					collection(db, "entertainments")
				);

				setDataCounts({
					sites: sitesSnapshot.data().count,
					works: worksSnapshot.data().count,
					cultures: culturesSnapshot.data().count,
					wisdoms: wisdomsSnapshot.data().count,
					cuisine: cuisineSnapshot.data().count,
					entertainment: entertainmentSnapshot.data().count,
				});
			} catch (error) {
				console.error("Error fetching data counts:", error);
			}
		};

		fetchDataCounts();
	}, []);

	return (
		<div>
			<h1>Dashboard</h1>
			<ul>
				<li>Sites: {dataCounts.sites}</li>
				<li>Works: {dataCounts.works}</li>
				<li>Cultures: {dataCounts.cultures}</li>
				<li>Wisdoms: {dataCounts.wisdoms}</li>
				<li>Cuisine: {dataCounts.cuisine}</li>
				<li>Entertainment: {dataCounts.entertainment}</li>
			</ul>
		</div>
	);
};
