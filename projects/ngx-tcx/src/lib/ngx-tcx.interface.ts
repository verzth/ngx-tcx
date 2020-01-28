export interface TCXOption {
  url : string;
  app_id : string;
  secret_key : string;
  public_key : string;
  auth : string;
  master_key : string;
}

export const AUTH_DEFAULT="none", AUTH_PARAM="param", AUTH_TIME="time";
