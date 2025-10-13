// 문구(라벨) 모음
export const TEXT = {
  nav: {
    home: "홈",
    lungMedicine: "(폐)의약품 수거함",
  },
  lungMedicine: {
    title: "(폐)의약품 수거함",
    description: "복용하지 않는 필요없는 약이 있으신가요?",
    listPageTitle: "(폐)의약품 수거함 목록",
  },
} as const;

// 라우트 경로도 함께 중앙관리
export const ROUTES = {
  home: "/",
  lungMedicineList: "/lung-medicine/list",
  lungMedicineDetail: "/lung-medicine/:id",
} as const;

// 타입이 필요하면 이렇게 꺼내 쓸 수 있음
export type Text = typeof TEXT;
export type Routes = typeof ROUTES;
