import axiosInstance, {apiWrapper} from './axiosConfig';
import * as ApiParamType from './ApiParamType';

// [GET] 查詢服務版本號
export const getVersion = () => {
  return apiWrapper<ApiParamType.ResGetVersion>(
    axiosInstance.get('/api/version'),
  );
};

// [POST] 查詢訪客列表
export const queryVisitor = (queryParam: ApiParamType.ReqQueryVisitor) => {
  return apiWrapper<ApiParamType.ResQueryVisitor>(
    axiosInstance.post('/api/queryVisitor', queryParam),
  );
};
