// src/shared/ui/footer.tsx
import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container-xxl d-flex flex-wrap justify-content-between align-items-center gap-3">
        <small className="text-muted footer-text-sm">
          © {new Date().getFullYear()} OpenData Maru. 공공데이터 기반.
        </small>

        <ul className="nav">
          <li className="nav-item">
            <Link to="/terms" className="nav-link px-2 text-muted">
              이용약관
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/copyright" className="nav-link px-2 text-muted">
              저작권
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link px-2 text-muted">
              문의
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}