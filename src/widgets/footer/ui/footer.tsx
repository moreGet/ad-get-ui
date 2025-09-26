export default function Footer() {
  return (
    <footer>
      <div className="container-xxl d-flex flex-wrap justify-content-between align-items-center gap-3">
        <small className="text-muted">
          © {new Date().getFullYear()} OpenData Muru. 공공데이터 기반.
        </small>
        <ul className="nav">
          <li className="nav-item"><a className="nav-link px-2" href="#">개인정보처리방침</a></li>
          <li className="nav-item"><a className="nav-link px-2" href="#">이용약관</a></li>
          <li className="nav-item"><a className="nav-link px-2" href="#">문의</a></li>
        </ul>
      </div>
    </footer>
  );
}
