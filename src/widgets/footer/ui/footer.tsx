// src/shared/ui/footer.tsx
import {Link} from "react-router-dom";
import {useState} from "react"
import CopyrightAttributionModal from "@shared/ui/modals/copyright-attribution-modal"
import ContactSupportModal from "@shared/ui/modals/contact-support-modal"

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  return (
    <footer>
      <div className="container-xxl d-flex flex-wrap justify-content-between align-items-center gap-3">
        <small className="text-muted footer-text-sm">
          © {new Date().getFullYear()} OpenData Maru.
        </small>

        <ul className="nav">
          <li className="nav-item">
            <button
              type="button"
              className="nav-link px-2 text-muted"
              onClick={() => setOpenContact(true)}
            >
              문의
            </button>
          </li>
          <li className="nav-item">
            <Link to="/terms" className="nav-link px-2 text-muted">
              이용약관
            </Link>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="nav-link px-2 text-muted"
              onClick={() => setOpen(true)}
            >
              저작권
            </button>
          </li>
        </ul>
      </div>

      <CopyrightAttributionModal open={open} onClose={() => setOpen(false)}/>
      <ContactSupportModal open={openContact} onClose={() => setOpenContact(false)}/>
    </footer>
  );
}
