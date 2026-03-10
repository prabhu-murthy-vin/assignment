import { FunctionComponent } from "react";
import { TileModel } from "../model";
import clsx from "clsx";

const Tile: FunctionComponent<TileModel> = ({ name, primaryStat, secondaryStat }) => {
    const className = "app-tile"

    return <div className={className}>
        <h3>{name}</h3>
        <span>{primaryStat}</span>
        <span>{secondaryStat}</span>
    </div>
}

export { Tile }