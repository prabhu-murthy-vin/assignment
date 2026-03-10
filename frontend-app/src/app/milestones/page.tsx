import { Milestone } from "@/models/milestone"

const MilestonesPage = async () => {
    try {
        const data = await fetch("http://localhost:3000/api/milestones")

        const milestones: Milestone[] = await data.json()

        return <ul>
            {milestones.map(milestone => <span>{JSON.stringify(milestone)}</span>)}
        </ul>
    } catch (error) {
        console.log(error)
    }
}

export default MilestonesPage