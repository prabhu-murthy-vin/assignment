import { Program } from "@/models/program"

const ProgramsPage = async () => {
    try {
        const data = await fetch("http://localhost:3000/api/programs")

        const programs: Program[] = await data.json()

        return <ul>
            {programs.map(program => <span>{JSON.stringify(program)}</span>)}
        </ul>
    } catch (error) {
        console.log(error)
    }
}

export default ProgramsPage