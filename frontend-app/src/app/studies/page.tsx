import { Study } from "@/models/study"


const StudiesPage = async () => {
    try {
        const data = await fetch("http://localhost:3000/api/studies")

        const studies: Study[] = await data.json()

        return <ul>
            {studies.map(study => <span>{JSON.stringify(study)}</span>)}
        </ul>
    } catch (error) {
        console.log(error)
    }
}

export default StudiesPage