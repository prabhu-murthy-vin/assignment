import { Slate } from "@/components/slate"
import { SlateModel } from "@/models/slate"
import { FunctionComponent } from "react"
import TilesPage from "../../page"
import styles from "./styles.module.css"
import StudiesPage from "../../studies/page"

const Container: FunctionComponent<{ slateData: SlateModel, progID: string, progName: string }> = ({ slateData, progID, progName }) => {
    return <div className={styles.container}>
        <div className={styles.programs_container}>
            <TilesPage activeID={progID} includeWelcome={false} />
        </div>
        <div className={styles.main_slate_container}>
            <h3 className={styles.program_title}>{progName}</h3>
            <Slate {...slateData} />
        </div>
        <div className={styles.table_container}>
            <h3 className={styles.studies_title}>Studies</h3>
            <StudiesPage id={progID} />
        </div>
    </div>
}

export default async function DashboardMain({ params }) {
    const { slug: progID } = await params

    const programData = await fetch(`http://localhost:3000/api/programs/${progID}`)

    const data = await programData.json()

    const preparedData = {
        dates: {
            startDate: data.startDate,
            endDate: data.endDate
        },
        personnel: data.manager,
        primaryStat: data.studies.length,
        primaryStatText: "Studies",
        status: data.status,
        name: data.name
    } as SlateModel

    return <Container slateData={preparedData} progID={progID} progName={data.name} />
}