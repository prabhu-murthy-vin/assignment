export type RecordValueModel = string | number

export type RowModel = Record<string, CellModel>

export type CellTypeModel = string | number | "icon" | Date | "image"

export type CellValueModel = string | number | "HTML" | Date

export type CellModel = {
    id?: string,
    type?: CellTypeModel
    value: CellValueModel
}

export type TableModel = RowModel[]

export type TableConfig = {
    width: string | number;
    type: "compact" | "free";
    headers: Record<string, string>
}

export interface GridModel {
    table: TableModel
    config?: TableConfig
}