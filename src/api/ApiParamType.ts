export type ResGetVersion = string;

export type ReqQueryVisitor = {
  queryDate: string;
  startTime: string;
  endTime: string;
};

export type ResQueryVisitor = {
  returnCode: string;
  returnMsg: string;
  resultList?: Visitor[];
};

export type Visitor = {
  capture_datetime: string;
  class_label: string;
  dbid: number;
  img_path: string;
  predict_probability: number;
};
