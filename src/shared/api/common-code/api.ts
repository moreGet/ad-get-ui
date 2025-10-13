// src/shared/api/common-code/api.ts
import {api} from "@shared/api/common/client";

/** 서버 /common/code 응답 스키마 (필요시 맞춰 수정) */
export type CommonCodeDTO = {
  resources: Array<{
    key: string;                 // ex) "lung-medicine"
    fields: string[];            // ex) ["installationPlaceName","roadAddress"]
    labels?: Record<string, string>; // ex) { installationPlaceName: "설치 장소명", ... }
  }>;
};

/** /common/code GET */
export async function fetchCommonCode(): Promise<CommonCodeDTO> {
  return api.get<CommonCodeDTO>("/common/code");
}
