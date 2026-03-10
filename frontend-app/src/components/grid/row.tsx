import { FunctionComponent } from "react"
import { RowModel } from "../model"
import { CellView } from "./cell"

const RowView: FunctionComponent<RowModel> = (record) => {

    return <div role="cell">
        {
            Object.keys(record).map(cell => <CellView type={record[cell].type} value={record[cell].value} />)
        }
    </div>
}

export { RowView }