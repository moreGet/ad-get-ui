// src/app/routes/not-found-page.tsx
import {useNavigate, Link} from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const goBack = () => {
    // 히스토리가 있으면 뒤로, 없으면 홈으로
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", {replace: true});
    }
  };

  return (
    <div className="container py-5 text-center">
      <h5 className="mb-3">잠시 후 다시 시도해 주세요.</h5>

      <div className="d-flex justify-content-center gap-2">
        <button type="button" className="btn btn-primary" onClick={goBack}>
          이전 페이지로
        </button>
        <Link to="/" className="btn btn-outline-secondary">
          홈으로
        </Link>
      </div>
    </div>
  );
}
