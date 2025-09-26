type CardItem = {
  id: number;
  title: string;
  desc: string;
};

const cards: CardItem[] = Array.from({length: 9}).map((_, i) => ({
  id: i + 1,
  title: `카드 ${i + 1}`,
  desc: `설명 텍스트… (예시)`,
}));

export default function LungMedicineListPage() {
  return (
    // 바깥은 전체폭이지만 overflow는 숨김
    <div className="container-fluid overflow-hidden d-flex flex-column align-items-center gap-5">
      <div className="text-muted text-center pt-3 w-100">광고</div>

      {/* 가운데 정렬용 래퍼: 최대폭 + mx-auto */}
      <div className="container mx-auto px-2" style={{ maxWidth: 1680 }}>
      {/* 3 x 3 카드, 가로/세로 간격 넉넉 */}
        <div className="row g-4 justify-content-center">
          {cards.map(c => (
            <div key={c.id} className="col-12 col-sm-auto d-flex justify-content-center">
              <div className="card" style={{ width: 240, maxWidth: '100%' }}>
                <div className="card-body d-flex flex-column align-items-center text-center">
                  <h5 className="card-title mb-2">{c.title}</h5>
                  <p className="card-text text-muted mb-3">{c.desc}</p>
                  <a href="#" className="btn btn-primary mt-auto">자세히</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-muted text-center w-100">광고</div>
    </div>
  );
}
