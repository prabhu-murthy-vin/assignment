import { FunctionComponent } from "react"
import { CellModel } from "../model"

const CellView: FunctionComponent<CellModel> = ({ type, value }) => {
    return <div role="cell">
        {/* <span hidden aria-hidden="true"></span> */}
        <span>{value as string}</span>
    </div>
}

export { CellView }