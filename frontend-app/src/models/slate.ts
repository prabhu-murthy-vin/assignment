export interface SlateModel {
  primaryStatText: string;
  primaryStat: number;
  personnel: string;
  status: string;
  dates: {
    startDate: Date;
    endDate: Date;
  };
}
