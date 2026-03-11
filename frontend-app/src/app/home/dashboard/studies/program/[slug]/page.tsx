import { Grid } from "@/components/grid"
import { transFormTableDataForRender } from "@/lib/utils"


export default async function ({ params }) {
    try {
        const { slug: progID } = await params;
        const data = await fetch(`http://localhost:3000/api/studies/program/${progID}`)

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