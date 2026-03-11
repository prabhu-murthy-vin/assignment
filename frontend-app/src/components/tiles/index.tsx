"use client"

import { FunctionComponent } from "react";
import { TileModel } from "../model";
import styles from "./tile.module.css";
import clsx from "clsx";
import { Tile } from "./tile";

const Tiles: FunctionComponent<{ items: TileModel[], activeTileID?: string }> = ({ items, activeTileID }) => {

    const classes = clsx([styles.tiles])

    return <ul className={classes}>
        {
            items.map((item, index) => <div key={`${item.id}_${index}`}>
                <Tile
                    name={item.name}
                    primaryStat={item.primaryStat}
                    secondaryStat={item.secondaryStat}
                    id={item.id}
                    active={activeTileID === item.id}
                />
            </div>)
        }
    </ul>
}

export { Tiles }