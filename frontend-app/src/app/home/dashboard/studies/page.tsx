import { Grid } from "@/components/grid"
import { transFormTableDataForRender } from "@/lib/utils"
import { Study } from "@/models/study"
import { FunctionComponent } from "react"


const StudiesPage: FunctionComponent<{ id?: string }> = async ({ id }) => {
    try {
        const url = id ? `http://localhost:3000/api/studies/program/${id}` : "http://localhost:3000/api/studies";
        const data = await fetch(url)

        const studies: [] = await data.json()

        // const studiesData = studies.map(study => ({
        //     [study["id"]]: study
        // }))

        const studiesData = transFormTableDataForRender(studies)

        return <Grid table={studiesData} config={{
            columns: 11, hyperlinkRow: {
                url: "/home/dashboard/milestones"
            }
        }} />
    } catch (error) {
        console.log(error)
    }
}

export default StudiesPage