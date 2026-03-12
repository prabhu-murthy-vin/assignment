import { Grid } from "@/components/grid";
import { transFormTableDataForRender } from "@/lib/utils";

const ProgramsPage = async () => {
	try {
		const data = await fetch("http://localhost:3000/api/programs");

		const programs: [] = await data.json();

		const programsData = transFormTableDataForRender(programs);

		return <Grid table={programsData} config={{ columns: 8 }} />;
	} catch (error) {
		console.log(error);
	}
};

export default ProgramsPage;
