import {Link, NavLink} from "react-router-dom";
import {ROUTES, TEXT} from "@shared/constants/text";
import title from "@assets/logo/title.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top py-1">

      <div className="container-xxl">
        <Link className="navbar-brand fw-bold d-flex align-items-center py-0" to="/">
          <span className="brand-wrap">
            <img
              src={title}
              alt="열린데이터 마루"
              className="me-5"
              loading="eager"
              decoding="async"
            />
          </span>
        </Link>

        <button
          className="navbar-toggler px-3 py-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#gnb"
          aria-controls="gnb"
          aria-expanded="false"
          aria-label="메뉴 열기"
        >
          <span className="fw-semibold">메뉴</span>
        </button>

        <div id="gnb" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {/* 홈: 그대로 */}
            <li className="nav-item">
              <NavLink to={ROUTES.home} end className="nav-link navlink-underline">{TEXT.nav.home}</NavLink>
            </li>

            {/* 약국/의료 드롭다운 */}
            <li className="nav-item dropdown">
              {/* 토글은 a/button 어떤 것이든 OK. 접근성 위해 button 사용 */}
              <button
                className="nav-link dropdown-toggle navlink-underline bg-transparent border-0"
                id="navbarPharmacy"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {TEXT.nav.medical}
              </button>

              <ul className="dropdown-menu dropdown-animate border-1 rounded-4 p-2" aria-labelledby="navbarPharmacy">
                <li>
                  <NavLink
                    to={ROUTES.lungMedicineList}
                    className={({isActive}) =>
                      `dropdown-item dd-item-hover rounded-3 ${isActive ? "active" : ""}`
                    }
                  >
                    {TEXT.lungMedicine.title}
                  </NavLink>
                </li>

                {/* 섹션 확장 여지 (예시)
                <li><hr className="dropdown-divider my-2" /></li>
                <li>
                  <NavLink to="/pharmacy/map" className="dropdown-item dd-item-hover rounded-3">
                    우리동네 약국 지도
                  </NavLink>
                </li>
                */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
