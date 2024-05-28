import { CreateTestParams } from "@/types";
import client from "./client";

// // 動作確認用
// export const execTest = () => {
//   return client.get("/test");
// };
import Cookies from "js-cookie";

export const execTest = (params: CreateTestParams) => {
  return client.post("/tests", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
