// src/app/routes/home.tsx
import DashboardCard from "@shared/ui/dashboard-card";
import AdSlot from "@shared/ui/ad-slot";
import {ROUTES, TEXT} from "@shared/constants/text";
// import lungIcon from "@app/assets/react.svg"; // 샘플 아이콘(원하면 다른 이미지로 교체)

export default function Home() {
  return (
    <div className="container py-4">
      <div className="vstack gap-4"> {/* ← 섹션들 사이 간격 */}
        {/* 광고 */}
        <div className="container-fluid px-0">
          <AdSlot height={80}/>
        </div>

        {/* 3칸 그리드 */}
        <div className="row row-cols-1 row-cols-md-2 gx-3 gy-4"> {/* ← 가로gx/세로gy 간격 */}
          <div className="col">
            <DashboardCard
              to={ROUTES.lungMedicineList}
              title={TEXT.lungMedicine.title}
              description={TEXT.lungMedicine.description}
              imgAlt={TEXT.lungMedicine.title}
            />
          </div>
          <div className="col">
            <DashboardCard
              to="/lung-medicine/list"
              title="카드 2"
              description="desc"
              imgAlt="폐의약품 수거함"
            />
          </div>
        </div>

        {/* 광고 */}
        <div className="container-fluid px-0">
          <AdSlot height={80}/>
        </div>
      </div>
    </div>
  );
}
