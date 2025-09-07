import {Link, NavLink} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container-xxl">
        <Link className="navbar-brand fw-bold" to="/">찾아와! 홈즈</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#gnb"
                aria-controls="gnb" aria-expanded="false" aria-label="메뉴 열기">
          <span className="navbar-toggler-icon"/>
        </button>

        <div id="gnb" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink to="/" end className="nav-link">홈</NavLink></li>
            <li className="nav-item"><NavLink to="/listing" className="nav-link">매물목록</NavLink></li>
            <li className="nav-item"><a className="nav-link" href="#">실거래가</a></li>
            <li className="nav-item"><a className="nav-link" href="#">청약/임대</a></li>
            <li className="nav-item"><a className="nav-link" href="#">인프라</a></li>
            <li className="nav-item"><a className="nav-link" href="#">쇼핑</a></li>
          </ul>

          <form className="d-none d-lg-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <input className="form-control" placeholder="지역/아파트 검색"/>
          </form>
        </div>
      </div>
    </nav>
  );
}
