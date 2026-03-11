import { Grid } from "@/components/grid"
import { transFormTableDataForRender } from "@/lib/utils"

const MilestonesPage = async () => {
    try {
        const data = await fetch("http://localhost:3000/api/milestones")

        const milestones: [] = await data.json()

        // const milestonesData = milestones.map(milestone => ({
        //     [milestone["id"]]: Object.keys(milestone).reduce((prev, cur) => {
        //         const selected = !Array.isArray(milestone[cur]) && !(typeof milestone[cur] === "object") ? { [cur]: milestone[cur] } : {}

        //         return {
        //             ...prev,
        //             ...selected
        //         }

        //     }, {})
        // }))

        const milestonesData = transFormTableDataForRender(milestones);

        return <Grid table={milestonesData} config={{ columns: 6 }} />
    } catch (error) {
        console.log(error)
    }
}

export default MilestonesPage