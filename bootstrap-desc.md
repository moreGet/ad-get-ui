# Bootstrap 5 유틸리티 치트시트 (한글)

## 반응형 접두사 (언제부터 적용?)
| 접두사 | 의미 | 최소 화면 너비(px) |
|---|---|---|
| *(없음)* | 항상 적용 | — |
| `sm` | small | ≥ 576 |
| `md` | medium | ≥ 768 |
| `lg` | large | ≥ 992 |
| `xl` | extra large | ≥ 1200 |
| `xxl` | extra extra large | ≥ 1400 |

> 예) `pt-lg-3` = 화면이 **992px 이상**일 때만 padding-top을 3으로.

---

## 간격(Spacing)
| 패턴 | 의미 |
|---|---|
| `m` / `p` | margin / padding |
| `t` `b` `s` `e` `x` `y` | top / bottom / start(좌) / end(우) / x축(좌우) / y축(상하) |
| 크기 | `0`~`5` (작→큼), `auto`(마진 자동) |

**예시**
- `pt-2` = padding-top 2
- `mx-3` = 좌우 마진 3
- `mb-auto` = 아래쪽 마진 자동
- 반응형: `py-2 py-md-4` (md 이상에서 더 큼)

---

## 표시(display)
| 클래스 | 설명 |
|---|---|
| `d-none` / `d-block` / `d-inline` / `d-inline-block` | display 전환 |
| `d-flex` / `d-inline-flex` | Flex 컨테이너 |
| 접두사 조합 | `d-lg-none`, `d-md-flex` 처럼 해상도별 제어 |

---

## Flex 핵심
| 클래스 | 설명 |
|---|---|
| `flex-row` / `flex-column` | 주축 방향 가로 / 세로 |
| `justify-content-start/center/end/between/around` | 주축 정렬 |
| `align-items-start/center/end/stretch` | 교차축 정렬 |
| `align-self-*` | 개별 아이템 정렬 |
| `flex-wrap` / `flex-nowrap` | 줄바꿈 여부 |
| `order-0~5` | 정렬 순서 |
| `gap-0~5` | 아이템 사이 간격 |
| 반응형 | `flex-md-row`, `justify-content-lg-between` 등 |

---

## 그리드 & 거터
| 클래스 | 설명 |
|---|---|
| `row` / `col` | 그리드 행/열 |
| `col-6` / `col-md-4` | 12분할 기준 폭(모바일 6/12, md 이상 4/12) |
| `row-cols-1 row-cols-md-3` | 행당 열 개수 자동 배분 |
| `g-0~5` / `gx-*` / `gy-*` | 열/행 사이 간격(거터) |
| `justify-content-center` | 그리드 열들을 가운데로(행 내부) |

---

## 텍스트/폰트
| 클래스 | 설명 |
|---|---|
| `text-start/center/end` | 정렬(반응형 가능: `text-md-center`) |
| `fw-light/normal/semibold/bold` | 두께 |
| `fst-italic` | 이탤릭 |
| `lh-1` `lh-sm` `lh-base` `lh-lg` | 줄간격 |
| `text-truncate` | 한 줄 말줄임 |

---

## 크기/높이
| 클래스 | 설명 |
|---|---|
| `w-25/50/75/100` / `h-25/50/75/100` | 백분율 폭/높이 |
| `min-vh-100` / `min-vw-100` | 뷰포트 높이/너비 100% 최소 |
| `h-100` | 부모 높이 채우기 |

---

## 테두리/둥근 모서리
| 클래스 | 설명 |
|---|---|
| `border` / `border-0` / `border-top` … | 테두리 |
| `rounded` / `rounded-1~5` / `rounded-circle` | 라운드 |

---

## 한 줄 예시 해석
- `pt-lg-3` → **992px 이상**에서만 **위 패딩 3**
- `d-flex flex-column align-items-center gap-4` → **세로 스택**, 가운데 정렬, 아이템 간 간격 4
- `row row-cols-1 row-cols-md-3 g-5` → 모바일 1열, md 이상 3열, 카드 간격 큼
