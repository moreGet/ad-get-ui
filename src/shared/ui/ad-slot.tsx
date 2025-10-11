// src/shared/ui/ad-slot.tsx
type Props = {
  height?: number;
  className?: string;
  label?: string;
};

export default function AdSlot({height = 80, className = "", label = "광고"}: Props) {
  return (
    <div
      className={`bg-light border rounded d-flex align-items-center justify-content-center text-secondary ${className}`}
      style={{minHeight: height}}
      role="complementary"
      aria-label="ad-slot"
    >
      {label}
    </div>
  );
}
