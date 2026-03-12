import { Grid } from "@/components/grid";
import { transFormTableDataForRender } from "@/lib/utils";

const MilestonesPage = async () => {
	try {
		const data = await fetch("http://localhost:3000/api/milestones");

		const milestones: [] = await data.json();

		const milestonesData = transFormTableDataForRender(milestones);

		return <Grid table={milestonesData} config={{ columns: 6 }} />;
	} catch (error) {
		console.log(error);
	}
};

export default MilestonesPage;
