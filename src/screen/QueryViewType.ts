import * as ApiParamType from '../api/ApiParamType';

export type StateType = {
  isLoading: boolean;
  btnLock: boolean;
  vistorList: Array<ApiParamType.Visitor>;
};
