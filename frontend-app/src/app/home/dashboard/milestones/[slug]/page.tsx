import { FunctionComponent } from "react";
import styles from "./milestone-view.module.css";
import dayjs from "dayjs";
import clsx from "clsx";
import Link from "next/link";
import { Grid } from "@/components/grid";
import { transFormTableDataForRender } from "@/lib/utils";

interface MilestoneModel {
    id: string;
    studyId: string;
    name: string;
    plannedDate: Date;
    actualDate: Date;
    status: string
}

const getColor = function (text: string) {
    const isDanger = new RegExp("delay|error|risk", "ig")
    const isGreen = new RegExp("complete|success", "ig")
    const isAmber = new RegExp("delayed|wait", "ig")

    if (isDanger.test(text)) {
        return "danger"
    } else if (isGreen.test(text)) {
        return "success"
    } else if (isAmber.test(text)) {
        return "amber"
    } else {
        return "default"
    }
}

const MilestoneView: FunctionComponent<{ items: MilestoneModel[], programName: string, progId: string, studyId: string }> = ({ items, programName, progId, studyId }) => {
    console.log(items)
    return <div className={styles.container}>
        <header className={styles.header}>
            <span>
                <Link href={`/home/dashboard/${progId}`}>
                    {`${programName} (${progId})`}
                </Link>
            </span>
            <span>&gt;</span>
            <span>
                {studyId}
            </span>
        </header>
        <ul className={styles.milestone_items}>
            {
                items.map((item, index) => (
                    <li key={`${index}_${item.id}`}>
                        <div className={styles.milestone_item}>
                            <span className={clsx([styles.icon, styles[getColor(item.status)]])}></span>
                            <div className={styles.data}>
                                <span className={styles.date}>{dayjs(item.actualDate).format("ddd-mm-YYYY")}</span>
                                <div className={styles.name}>{item.name}</div>
                                <div className={styles.text}>{item.status}</div>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
        <div>
            <Grid table={transFormTableDataForRender(items as [])} config={{ columns: 6 }} />
        </div>
        <footer className={styles.footer}></footer>
    </div>
}


export default async function ({ params }) {
    const { slug: studyID } = await params;

    const studyData = await fetch(`http://localhost:3000/api/milestones/study/${studyID}`)

    const data = await studyData.json()

    // console.log(data);

    const { programId, name, id } = data[0]?.study;

    return <MilestoneView items={data} programName={name} progId={programId} studyId={id} />

}