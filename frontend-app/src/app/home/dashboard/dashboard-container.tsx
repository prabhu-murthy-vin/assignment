"use client"

import { TileModel } from "@/components/model";
import { Tiles } from "@/components/tiles";
import { FunctionComponent, useEffect } from "react";
import styles from "./dashboard.module.css";
import Welcome from "./(welcome)/welcome";

interface DashboardContainerProps {
    tilesData: TileModel[];
    activeTileID?: string;
    includeWelcome?: boolean;
}

const DashboardContainer: FunctionComponent<DashboardContainerProps> = ({ tilesData, activeTileID, includeWelcome }) => {

    return <div className={styles.container}>
        <Tiles items={tilesData} activeTileID={activeTileID} />
        {includeWelcome ? <Welcome /> : null}
    </div>
}

export { DashboardContainer }