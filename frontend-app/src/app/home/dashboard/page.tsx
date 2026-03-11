import { TileModel } from "@/components/model"
import { DashboardContainer } from "./dashboard-container"
import { act, FunctionComponent } from "react"

const TilesPage: FunctionComponent<{ activeID?: string, includeWelcome?: boolean }> = async ({ activeID, includeWelcome = true }) => {

    try {
        const data = await fetch("http://localhost:3000/api/programs/tiles")

        const tiles: [] = await data.json()

        const tilesData: TileModel[] = tiles.map(tile => ({
            id: tile["id"],
            name: tile["name"],
            primaryStat: tile["therapeuticArea"],
            secondaryStat: tile["status"]
        }))


        return <DashboardContainer tilesData={tilesData} activeTileID={activeID} includeWelcome={includeWelcome} />


    } catch (error) {
        console.log(error)
    }

}

export default TilesPage