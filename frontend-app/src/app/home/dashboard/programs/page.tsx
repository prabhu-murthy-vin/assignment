import { Grid } from "@/components/grid"
import { RowModel } from "@/components/model"
import { transFormTableDataForRender } from "@/lib/utils"
import { Program } from "@/models/program"

const ProgramsPage = async () => {
    try {
        const data = await fetch("http://localhost:3000/api/programs")

        const programs: [] = await data.json()

        // const programsData = programs.map(program => ({
        //     [program["id"]]: program
        // }))

        const programsData = transFormTableDataForRender(programs);

        // console.log(programsData)

        return <Grid table={programsData} config={{ columns: 8 }} />
    } catch (error) {
        console.log(error)
    }
}

export default ProgramsPage