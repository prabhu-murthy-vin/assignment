import { FunctionComponent } from "react"
import { GridModel } from "../model"
import { RowView } from "./row"

const Grid: FunctionComponent<GridModel> = ({ table, config }) => {
    return <div role="table">
        {table.map(record => <RowView {...record} />)}
    </div>
}


export { Grid }