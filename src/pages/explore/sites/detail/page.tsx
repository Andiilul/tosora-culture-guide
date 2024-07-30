import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneSite } from "../../../../services/sites";
import { AddSiteInput } from "../../../../types/sites";

interface SiteDetailProps {}

export const SiteDetail: React.FC<SiteDetailProps> = () => {
	const { id } = useParams();

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
	useEffect(() => {
		if (id) {
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
	}, [id]);

	if(loading){
		return <div>Loadingg....</div>
	}
	if(error){
		return <div>{error}</div>
	}

	return(
		<div>
			{site.name}
		</div>
	)
};
