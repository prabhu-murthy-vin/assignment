import { Card } from "@/components/card";
import { FunctionComponent } from "react";
import styles from "./info.module.css";


const InfoContainer: FunctionComponent<{ progData: Record<string, any>, studiesData: [] }> = ({ progData, studiesData }) => {
    return <div className={styles.info_container}>
        {/* <div>
            <Card title="Program Info" data={progData} />
        </div> */}
        <div className={styles.studies_container}>
            {
                studiesData.map(data => <div className={styles.study_wrap}><Card title="Studies info" data={data} /></div>)
            }
        </div>
    </div>
}

export default async function Info({ params }) {
    const { slug: progID } = await params;

    const progData = await fetch(`http://localhost:3000/api/programs/${progID}`);

    const studiesData = await fetch(`http://localhost:3000/api/studies/program/${progID}`)

    const _progData = await progData.json();
    const _studiesData = await studiesData.json();

    return <InfoContainer progData={_progData} studiesData={_studiesData} />

}