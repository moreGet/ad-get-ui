// 공통 페이지 정보
export type PageInfo = {
  currentPage: number; // 0-based
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
};

// 리스트 아이템(목록 API 전용)
export type LungMedicineListItem = {
  id: number;
  installationPlaceName: string;
  roadAddress: string;
  createdAt: string;  // ISO
  updatedAt: string;  // ISO
};

// 리스트 응답
export type LungMedicineListResponse = {
  contents: LungMedicineListItem[];
  pageInfo: PageInfo;
};

// 디테일 아이템(상세 API 전용)
export type LungMedicineDetail = {
  id: number;
  installationPlaceName: string;
  provinceName: string;
  cityDistrictName: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  managementAgencyName: string;
  managementAgencyPhoneNumber: string | null;
  dataReferenceDate: string; // ISO
  createdAt: string;         // ISO
  updatedAt: string;         // ISO
};
