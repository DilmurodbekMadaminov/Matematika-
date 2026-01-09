
import { Question } from '../types';

const questionsList: Question[] = [
  {
    id: 1,
    text: "Determinantning a₁₁ elementining algebraik to'ldiruvchisini toping:\n\n│ a₁₁  a₁₂ │\n│ a₂₁  a₂₂ │",
    options: ["a₂₂", "a₁₂", "-a₁₂", "-a₁₁"],
    correctAnswer: 0
  },
  {
    id: 2,
    text: "Quyidagi determinant nolga teng ekanligi ma'lum bo'lsa, x ning qiymatini toping:\n\n│ 1  2 │\n│ 3  x │  =  0",
    options: ["6", "-6", "3", "-3"],
    correctAnswer: 0
  },
  {
    id: 3,
    text: "Agar tenglik o'rinli bo'lsa, k ni toping:\n\n│  4  2 │         │ -8  2 │\n│ -3  1 │  =  k · │  6  1 │",
    options: ["-1/2", "1", "2", "1/2"],
    correctAnswer: 0
  },
  {
    id: 4,
    text: "Tenglamani yeching:\n\n        │  4  2 │\n10x  =  │ -3  1 │",
    options: ["1", "-2", "2", "-1"],
    correctAnswer: 0
  },
  {
    id: 5,
    text: "Determinantni hisoblang:\n\n│ a₁  a₁  b₁ │\n│ a₂  a₂  b₂ │\n│ a₃  a₃  b₃ │",
    options: ["0", "-1", "1", "a₁ a₂ b₃"],
    correctAnswer: 0
  },
  {
    id: 6,
    text: "Determinantning a elementi minorini hisoblang:\n\n│  a  -2  3 │\n│  4   0  5 │\n│ -1  -3  2 │",
    options: ["15", "-13", "-15", "17"],
    correctAnswer: 0
  },
  {
    id: 7,
    text: "Determinantning A₂₁ algebraik to'ldiruvchisini hisoblang:\n\n      │ 1  0  3 │\nΔ  =  │ 0  4  2 │\n      │ 2  1  5 │",
    options: ["3", "4", "-3", "5"],
    correctAnswer: 0
  },
  {
    id: 8,
    text: "A va B matritsalar berilgan, A·B matritsani toping:\n\n    ⎛ 2  3  0 ⎞\nA = ⎜ 4  1  5 ⎟\n    ⎝         ⎠\n\n    ⎛  1  7 ⎞\nB = ⎜ -2  3 ⎟\n    ⎝  6  0 ⎠",
    options: ["(-4 23; 32 31)", "(3 11; 5 4; 6 5)", "(8 5; 45 18)", "(8 5 3; 7 31 32)"],
    correctAnswer: 0
  },
  {
    id: 9,
    text: "Agar A matritsa berilgan bo'lsa, α·A ni toping (bunda α ∈ R):\n\n    ⎛ a₁₁  a₁₂ ⎞\nA = ⎜          ⎟\n    ⎝ a₂₁  a₂₂ ⎠",
    options: ["(αa₁₁ αa₁₂; αa₂₁ αa₂₂)", "(αa₁₁ a₁₂; a₂₁ a₂₂)", "(a₁₁ αa₁₂; a₂₁ a₂₂)", "(a₁₁ a₁₂; a₂₁ αa₂₂)"],
    correctAnswer: 0
  },
  {
    id: 10,
    text: "Agar tenglik o'rinli bo'lsa, m ni toping:\n\n⎛  4  -2 ⎞       ⎛  2  -1 ⎞\n⎜        ⎟  =  m ⎜        ⎟\n⎝ -6   2 ⎠       ⎝ -3   1 ⎠",
    options: ["2", "-2", "4", "-4"],
    correctAnswer: 0
  },
  {
    id: 11,
    text: "A va B matritsalar berilgan bo'lsa, 2A + B ni toping:\n\n    ⎛ 1  0 ⎞      ⎛ 0  1 ⎞\nA = ⎜      ⎟  B = ⎜      ⎟\n    ⎝ 0  1 ⎠      ⎝ 1  1 ⎠",
    options: ["(2 1; 1 3)", "(2 1; 1 2)", "(0 2; 1 3)", "(1 0; 2 3)"],
    correctAnswer: 0
  },
  {
    id: 12,
    text: "m ning qanday qiymatida sistema yechimga ega bo'lmaydi?\n\n⎧ 6x - 4y = 15\n⎨\n⎩ 2x + my = 3",
    options: ["-4/3", "3/4", "3/4", "3"],
    correctAnswer: 0
  },
  {
    id: 13,
    text: "A(6; 4; 2) va B(8; -2; 5) berilgan bo'lsa, AB vektorning uzunligini toping.",
    options: ["7", "6", "5", "3"],
    correctAnswer: 0
  },
  {
    id: 14,
    text: "Sistemaning yechimini toping:\n\n⎧ x = 1\n⎪\n⎨ x + 2y = 3\n⎪\n⎩ x + y - z = 0",
    options: ["(1;1;2)", "(1;-1;2)", "(1;1;0)", "(1;1;1)"],
    correctAnswer: 0
  },
  {
    id: 15,
    text: "a = (2; 3; -1) va b = (1; -5; m) vektorlar m ning qanday qiymatlarida o'zaro perpendikulyar bo'ladi?",
    options: ["-13", "-11", "13", "14"],
    correctAnswer: 0
  },
  {
    id: 16,
    text: "a = 2i - j va b = 3k vektorlar berilgan. a × b vektor ko'paytmani toping.",
    options: ["-3i - 6j", "3i + 6j", "3i - 6j", "-3i + 6j"],
    correctAnswer: 0
  },
  {
    id: 17,
    text: "a(x₁;y₁;z₁), b(x₂;y₂;z₂), c(x₃;y₃;z₃) vektorlarning komplanarlik sharti qanday?",
    options: ["Det(x₁,y₁,z₁; x₂,y₂,z₂; x₃,y₃,z₃) = 0", "Det ≠ 0", "x₁x₂ + y₁y₂ + z₁z₂ = 0", "Koordinatalar yig'indisi 0"],
    correctAnswer: 0
  },
  {
    id: 18,
    text: "a = 2i + 3j va b = 3i - 2j vektorlarning skalyar ko'paytmasini toping.",
    options: ["0", "4", "-1", "3"],
    correctAnswer: 0
  },
  {
    id: 19,
    text: "Vektor ko'paytma uchun quyidagilardan qaysi biri noto'g'ri?",
    options: ["a × b = b × a", "|a × b| = |a||b|sin(a,b)", "a × (b + c) = a × b + a × c", "λ(a × b) = (λa) × b"],
    correctAnswer: 0
  },
  {
    id: 20,
    text: "(k × j) · i aralash ko'paytmasini hisoblang.",
    options: ["-1", "0", "i", "1"],
    correctAnswer: 0
  },
  {
    id: 21,
    text: "Agar A(x₁, y₁) va B(x₂, y₂) nuqtalar berilgan bo'lsa, AB kesma o'rtasining abstsissasi x_c ni toping.",
    options: ["x_c = (x₁ + x₂) / 2", "x_c = (x₁ - x₂) / 2", "x_c = (x₂ - x₁) / 2", "x_c = (x₁ + x₂) / 3"],
    correctAnswer: 0
  },
  {
    id: 22,
    text: "A(2; -1) nuqtadan o'tuvchi va y = -0.5x + 5 to'g'ri chiziqqa perpendikulyar bo'lgan to'g'ri chiziq tenglamasini tuzing.",
    options: ["y = 2x - 5", "y = 2x - 7", "y = 2x + 7", "y = -2x + 7"],
    correctAnswer: 0
  },
  {
    id: 23,
    text: "6x + 3y - 2 = 0 to'g'ri chiziqqa perpendikulyar bo'lgan to'g'ri chiziqning burchak koeffitsientini toping.",
    options: ["2", "-2", "1/2", "-1/2"],
    correctAnswer: 0
  },
  {
    id: 24,
    text: "x + 4 = 0 va y + 6 = 0 to'g'ri chiziqlar orasidagi burchakni toping.",
    options: ["π/2", "π/4", "π/3", "0"],
    correctAnswer: 0
  },
  {
    id: 25,
    text: "y - 2x + 3 = 0 to'g'ri chiziqning Oy o'qi bilan kesishgan nuqtasining ordinatasi nimaga teng?",
    options: ["-3", "1", "-2", "3"],
    correctAnswer: 0
  },
  {
    id: 26,
    text: "P(4; 1) nuqtadan koordinatalar boshigacha bo'lgan masofani toping.",
    options: ["√17", "4", "√5", "√19"],
    correctAnswer: 0
  },
  {
    id: 27,
    text: "x²/20 + y²/16 = 1 ellipsning M(0; 4) nuqtasidan o'tuvchi urinmaning tenglamasini toping.",
    options: ["y = 4", "y = x + 4", "x = 4", "y = -4"],
    correctAnswer: 0
  },
  {
    id: 28,
    text: "5x² + 125y² = 625 ellips o'qlari uzunliklarini toping.",
    options: ["a = 5, b = √5", "a = 5, b = 5", "a = 5, b = -5", "a = √5, b = 5"],
    correctAnswer: 0
  },
  {
    id: 29,
    text: "Ax + By + Cz + D = 0 tekislik Ox o'qi bilan qaysi nuqtada kesishadi?",
    options: ["(-D/A; 0; 0)", "(A; 0; 0)", "(D/A; 0; 0)", "(A; B; C)"],
    correctAnswer: 0
  },
  {
    id: 30,
    text: "Normali n = {1; 2; 3} bo'lgan, koordinatalar boshidan o'tuvchi tekislik tenglamasini tuzing.",
    options: ["x + 2y + 3z = 0", "x/2 + y/3 + z = 0", "x + y + z = 1", "x + 2y + 3z = 1"],
    correctAnswer: 0
  },
  {
    id: 31,
    text: "Quyidagi nuqtalarning qaysi biri 2x + y + z - 1 = 0 tekislikda yotadi?",
    options: ["(0; 1; 0)", "(0; 1; 1)", "(0; 0; 0)", "(0; 0; 2)"],
    correctAnswer: 0
  },
  {
    id: 32,
    text: "x = t, y = t, z = 3t - 5 to'g'ri chiziq va x + y - 4 = 0 tekislik kesishgan nuqtasini toping.",
    options: ["(2; 2; 1)", "(0; 0; 5)", "(1; 1; 3)", "(0; 0; 5)"],
    correctAnswer: 0
  },
  {
    id: 33,
    text: "Koordinatalar boshidan 2x - y - 2z - 9 = 0 tekislikkacha bo'lgan masofani toping.",
    options: ["3", "4", "2", "1"],
    correctAnswer: 0
  },
  {
    id: 34,
    text: "Ellipsning katta yarim o'qi 5 ga, kichik yarim o'qi 2 ga teng. Uning tenglamasini tuzing.",
    options: ["x²/25 + y²/4 = 1", "x²/5 + y²/2 = 1", "(x-5)² + (y-2)² = 1", "x²/5 - y²/2 = 1"],
    correctAnswer: 0
  },
  {
    id: 35,
    text: "x²/16 - y²/9 = 1 giperbola fokuslarining koordinatalarini toping.",
    options: ["F₁(5; 0), F₂(-5; 0)", "F₁(-3; 0), F₂(3; 0)", "F₁(-4; 0), F₂(4; 0)", "F₁(4; 0), F₂(-4; 0)"],
    correctAnswer: 0
  },
  {
    id: 36,
    text: "{x : x ∈ R, a < x < b} to'plam nima deb ataladi?",
    options: ["Interval", "Segment", "Yarim segment", "Nur"],
    correctAnswer: 0
  },
  {
    id: 37,
    text: "Qaysi holda f(x) funksiyaning a nuqtadagi uzilishi bartaraf qilish mumkin bo'lgan uzilish deyiladi?",
    options: ["f(a-0) = f(a+0) ≠ f(a)", "f(a-0) > f(a+0)", "f(a+0) va f(a-0) mavjud emas", "f(a+0) ≠ f(a-0)"],
    correctAnswer: 0
  },
  {
    id: 38,
    text: "Limitni hisoblang:\n\n       (1 - x)ᵃ - 1\nlim   ─────────────\nx→0         x",
    options: ["-a", "1/a", "a", "lg a"],
    correctAnswer: 0
  },
  {
    id: 39,
    text: "y = 1/(x²-1) funksiyaning uzilish nuqtalari va turini aniqlang.",
    options: ["x=±1 nuqtalarda 2-tur", "x=1 da 2-tur", "x=-1 da 2-tur", "x=±1 da 1-tur"],
    correctAnswer: 0
  },
  {
    id: 40,
    text: "y = arcsin x funksiyaning differensialini toping.",
    options: ["dy = dx / √(1-x²)", "dy = -dx / √(1-x²)", "dy = dx / (1+x²)", "dy = -dx / (1+x²)"],
    correctAnswer: 0
  },
  {
    id: 41,
    text: "y = ln(1 - cos x) funksiyaning hosilasi topilsin.",
    options: ["ctg(x/2)", "tg(x/2)", "-tg(x/2)", "-ctg(x/2)"],
    correctAnswer: 0
  },
  {
    id: 42,
    text: "y = e^(-cos x) funksiyaning hosilasi topilsin.",
    options: ["y' = sin x · e^(-cos x)", "y' = cos x · e^(-cos x)", "y' = -sin x · e^(-cos x)", "y' = -cos x · e^(-cos x)"],
    correctAnswer: 0
  },
  {
    id: 43,
    text: "Ketma-ketlikning limitini toping:\n\n       3n² + n + 1\nxₙ = ─────────────\n           2ⁿ",
    options: ["0", "3/2", "-1", "1"],
    correctAnswer: 0
  },
  {
    id: 44,
    text: "Limitni hisoblang:\n\n      x² - 3x + 2\nlim   ───────────\nx→1      x - 1",
    options: ["-1", "0", "1", "6"],
    correctAnswer: 0
  },
  {
    id: 45,
    text: "Limitni hisoblang:\n\n      tg(8x)\nlim   ──────\nx→0      x",
    options: ["8", "0", "-8", "5"],
    correctAnswer: 0
  },
  {
    id: 46,
    text: "Limitni hisoblang:\n\n      ln(1 + x)\nlim   ─────────\nx→0      4x",
    options: ["1/4", "1/2", "-1/4", "e"],
    correctAnswer: 0
  },
  {
    id: 47,
    text: "a ning qaysi qiymatida funksiya uzluksiz bo'ladi?\n\n       ⎧ (x²-16)/(x-4), x ≠ 4\nf(x) = ⎨\n       ⎩ a,             x = 4",
    options: ["a=8", "a=16", "a=5", "a=4"],
    correctAnswer: 0
  },
  {
    id: 48,
    text: "f(x) = arctg(x³ + 1) funksiya hosilasining x=0 nuqtadagi qiymatini toping.",
    options: ["0", "1.5", "1", "-3"],
    correctAnswer: 0
  },
  {
    id: 49,
    text: "y = 3ˣ funksiyaning 10-tartibli hosilasini toping.",
    options: ["3ˣ · (ln 3)¹⁰", "3ˣ · ln 3", "3ˣ · ln⁹ 3", "(3ˣ / ln 3) · 10"],
    correctAnswer: 0
  },
  {
    id: 50,
    text: "y = 3x - x³ funksiyaning monoton o'suvchi oralig'ini toping.",
    options: ["-1 ≤ x ≤ 1", "0 ≤ x ≤ 1", "1 ≤ x < +∞", "-√3 ≤ x ≤ √3"],
    correctAnswer: 0
  },
  {
    id: 51,
    text: "Limitni hisoblang:\n\n       n³ - 100n² + 1\nlim   ────────────────\nn→∞     100n³ + 15n",
    options: ["1/100", "100", "3", "1"],
    correctAnswer: 0
  },
  {
    id: 52,
    text: "Limitni hisoblang:\n\n       2ⁿ - 1\nlim   ───────\nn→∞    2ⁿ + 1",
    options: ["1", "2", "0", "-2"],
    correctAnswer: 0
  },
  {
    id: 53,
    text: "f(x) = 1 / √(x²-1) funksiyaning aniqlanish sohasini toping.",
    options: ["(-∞; -1) ∪ (1; ∞)", "(-∞; 1)", "(1; ∞)", "(-1; ∞)"],
    correctAnswer: 0
  },
  {
    id: 54,
    text: "y = arccos((3x+4)/5) funksiyaning aniqlanish sohasini toping.",
    options: ["[-3; 1/3]", "(-1; 2)", "(0; +∞)", "[0; +∞]"],
    correctAnswer: 0
  },
  {
    id: 55,
    text: "Funksiyalardan qaysi biri toq funksiya?",
    options: ["y = sin x³ - 7x", "y = 2^cosx + sin 3x", "y = (2x-3)/sin x", "y = sin 3x · tg 5x"],
    correctAnswer: 0
  },
  {
    id: 56,
    text: "y = (x-3)/(x³-9x) funksiyaning uzilish nuqtalarini toping.",
    options: ["0; -3; 3", "0; -1; 3", "1; -3; 3", "0; 3; 5"],
    correctAnswer: 0
  },
  {
    id: 57,
    text: "Qaysi funksiyaning x=2 nuqtada hosilasi mavjud emas?",
    options: ["f(x)=|x-2|", "f(x)=(x-2)²", "f(x)=(2-x)e^(x-2)", "f(x)=e^(x-2)"],
    correctAnswer: 0
  },
  {
    id: 58,
    text: "Lopital qoidasi bo'yicha hisoblang:\n\n      e^tgx - e^x\nlim   ───────────\nx→0     tgx - x",
    options: ["1", "7", "8", "2"],
    correctAnswer: 0
  },
  {
    id: 59,
    text: "Agar ketma-ketlik yaqinlashuvchi bo'lsa, u ... bo'ladi.",
    options: ["chegaralangan", "chegaralanmagan", "monoton", "to'g'ri javob yo'q"],
    correctAnswer: 0
  },
  {
    id: 60,
    text: "Agar lim xₙ = a, lim yₙ = a va xₙ ≤ zₙ ≤ yₙ bo'lsa, lim zₙ nimaga teng?",
    options: ["a", "< a", "> a", "0"],
    correctAnswer: 0
  },
  {
    id: 61,
    text: "A(2; 3) nuqtadan o'tuvchi va OX o'qi bilan 45° burchak hosil qiluvchi to'g'ri chiziq tenglamasi.",
    options: ["y = x + 1", "y = 2x + 3", "y = 2x + 1", "y = x + 3"],
    correctAnswer: 0
  },
  {
    id: 62,
    text: "(-4; 6) nuqtadan o'tib, koordinata o'qlari bilan 6 yuzali uchburchak hosil qiluvchi chiziq tenglamasi.",
    options: ["x/4 + y/3 = 1", "x/-4 + y/3 = 1", "y = -4x + 3", "x - 2y + 3z = 0"],
    correctAnswer: 0
  },
  {
    id: 63,
    text: "5x - y + 7 = 0 va 2x - 3y + 1 = 0 to'g'ri chiziqlar orasidagi burchakni toping.",
    options: ["45°", "arctg 3/4", "arctg 2", "30°"],
    correctAnswer: 0
  },
  {
    id: 64,
    text: "A(-1; 3) va B(4; -2) nuqtalardan o'tuvchi to'g'ri chiziq tenglamasini yozing.",
    options: ["y = -x + 2", "y = 4x + 3", "y = 3x - 2", "5x + 6y = 1"],
    correctAnswer: 0
  },
  {
    id: 65,
    text: "x² + 4y² = 16 ellipsning ekstrisentrisitetini toping.",
    options: ["√3 / 2", "2√3", "2", "3"],
    correctAnswer: 0
  },
  {
    id: 66,
    text: "x + 2y - 1 = 0 tenglamaning burchak koeffitsiyentini toping.",
    options: ["-1/2", "1", "2", "1/2"],
    correctAnswer: 0
  },
  {
    id: 67,
    text: "y² = 4x parabola direktrisasini toping.",
    options: ["x = -1", "x = 1", "x = 2", "x = -2"],
    correctAnswer: 0
  },
  {
    id: 68,
    text: "x² = 4y parabola direktrisasini toping.",
    options: ["y = -1", "y = 1", "y = 2", "y = -2"],
    correctAnswer: 0
  },
  {
    id: 69,
    text: "Determinantni hisoblang:\n\n│ 1  1  2 │\n│ 2  2  4 │\n│ 2  1  1 │",
    options: ["0", "1", "2", "-1"],
    correctAnswer: 0
  },
  {
    id: 70,
    text: "Determinantni hisoblang:\n\n│  1   3 │\n│ -2   2 │",
    options: ["8", "1", "3", "5"],
    correctAnswer: 0
  },
  {
    id: 71,
    text: "y = k₁x + b₁ va y = k₂x + b₂ to'g'ri chiziqlarning perpendikulyarlik sharti.",
    options: ["k₁k₂ = -1", "k₁ + k₂ = 0", "k₁k₂ = 1", "k₁ - k₂ = 0"],
    correctAnswer: 0
  },
  {
    id: 72,
    text: "y = k₁x + b₁ va y = k₂x + b₂ to'g'ri chiziqlarning parallellik sharti.",
    options: ["k₁ - k₂ = 0", "k₁ + k₂ = 0", "k₁k₂ = 1", "k₁k₂ = -1"],
    correctAnswer: 0
  },
  {
    id: 73,
    text: "M₁(1; -1; 2), M₂(2; 1; 2) va M₃(1; 1; 4) nuqtalardan o'tuvchi tekislik tenglamasi.",
    options: ["2x - y + z = 5", "x - y + z = 0", "x - 2y + 3z = 0", "2y - 3z + 7 = 0"],
    correctAnswer: 0
  },
  {
    id: 74,
    text: "3-tartibli determinant ni hisoblang (2x2 qismi):\n\n│ 3  -2 │\n│ 4   6 │",
    options: ["26", "24", "28", "10"],
    correctAnswer: 0
  },
  {
    id: 75,
    text: "Determinantni hisoblang:\n\n│  2a   a │\n│ -a   2a │",
    options: ["5a²", "2a²", "-2a", "a"],
    correctAnswer: 0
  },
  {
    id: 76,
    text: "Tenglamalar sistemasini yeching:\n\n⎧ 5x + 2y = 4\n⎨\n⎩ 7x + 4y = 8",
    options: ["(0; 2)", "(2; -3)", "(1; 0.25)", "(0; 1)"],
    correctAnswer: 0
  },
  {
    id: 77,
    text: "Limitni hisoblang:\n\n      x² - 4\nlim   ──────\nx→2   x - 2",
    options: ["4", "0", "2", "6"],
    correctAnswer: 0
  },
  {
    id: 78,
    text: "Limitni hisoblang:\n\n       x² - 5x - 6\nlim   ─────────────\nx→-1      x + 1",
    options: ["-7", "2", "3", "4"],
    correctAnswer: 0
  },
  {
    id: 79,
    text: "Limitni hisoblang:\n\n          n³ + 4n²\nlim   ────────────────\nn→∞   2n³ + n² - n + 1",
    options: ["1/2", "1", "1/3", "-1/4"],
    correctAnswer: 0
  },
  {
    id: 80,
    text: "Limitni hisoblang:\n\n           n⁴ - 1\nlim   ──────────────────\nn→∞   n³ + 2n² + 3n - 1",
    options: ["∞", "1/2", "-1/4", "0"],
    correctAnswer: 0
  },
  {
    id: 81,
    text: "y = 10/x³ funksiya hosilasini toping.",
    options: ["-30/x⁴", "-30x⁴", "40/x⁴", "-40x⁴"],
    correctAnswer: 0
  },
  {
    id: 82,
    text: "y = sin 6x funksiya hosilasini toping.",
    options: ["6 cos 6x", "cos 6x / 6", "-6 cos 6x", "cos 6x"],
    correctAnswer: 0
  },
  {
    id: 83,
    text: "y = x² cos x funksiya hosilasini toping.",
    options: ["x(2 cos x - x sin x)", "x(2 cos x + x sin x)", "x(2 sin x + x cos x)", "x(2 sin x - x² cos x)"],
    correctAnswer: 0
  },
  {
    id: 84,
    text: "y = cos x / x² funksiya hosilasini toping.",
    options: ["-(x sin x + 2 cos x) / x³", "sin x / 2x", "x sin x + 2 cos x / x³", "-sin x / 2x"],
    correctAnswer: 0
  },
  {
    id: 85,
    text: "y = sin²x funksiya hosilasini toping.",
    options: ["sin 2x", "2 cos x", "-2 sin x cos x", "2 sin x"],
    correctAnswer: 0
  },
  {
    id: 86,
    text: "y = ln(x² + 2x) funksiya hosilasini toping.",
    options: ["2(x+1)/(x²+2x)", "1/(x²+2x)", "(x+1)²/x³", "(x+1)/(x²+2x)"],
    correctAnswer: 0
  },
  {
    id: 87,
    text: "y = x² · 2ˣ funksiya hosilasini toping.",
    options: ["(2x + x² ln 2) · 2ˣ", "2ˣ⁺¹ · ln 2 · x", "(2 + x ln 2) · 2ˣ", "2x · 2ˣ"],
    correctAnswer: 0
  },
  {
    id: 88,
    text: "y = arcsin √(1 - 4x) funksiya hosilasini toping.",
    options: ["-1 / √(x - 4x²)", "-2 / √(4x - 16x²)", "-4 / √(1 - 16x²)", "-4 / √(1 - 4x)"],
    correctAnswer: 0
  },
  {
    id: 89,
    text: "y = 2^(x²) funksiya hosilasini toping.",
    options: ["2^(x²) · 2x · ln 2", "2^(x²) · ln 2", "2^(2x)", "2^(x²) · 2x"],
    correctAnswer: 0
  },
  {
    id: 90,
    text: "Determinantdan qanday ko'paytuvchilarni tashqariga chiqarish mumkin?\n\n│  2   6   1 │\n│ 10  15   5 │\n│ 14  21   7 │",
    options: ["2, 3", "2, 3, 5, 7", "2, 3, 5", "2, 3, 7"],
    correctAnswer: 0
  },
  {
    id: 91,
    text: "Determinantni hisoblang:\n\n      │ 3  2  1 │\nΔ  =  │ 0  5  4 │\n      │ 9  6  3 │",
    options: ["0", "15", "26", "-12"],
    correctAnswer: 0
  },
  {
    id: 92,
    text: "Determinant a₂₁ elementining M₂₁ minorini toping:\n\n│ 3  2   1 │\n│ 4  0   5 │\n│ 1  6  -3 │",
    options: ["-12", "5", "-8", "10"],
    correctAnswer: 0
  },
  {
    id: 93,
    text: "3A - B ni hisoblang:\n\n    ⎛ 1  2  3 ⎞     ⎛ 1  2  0 ⎞\nA = ⎜ 3  1  2 ⎟ B = ⎜ 3  1  3 ⎟\n    ⎝ 2  1  4 ⎠     ⎝ 1  2  4 ⎠",
    options: ["(2 4 9; 6 2 3; 5 1 8)", "(-2 2 3; 6 2 9; 7 1 8)", "(-2 8 9; 6 2 9; 5 1 8)", "(-2 8 9; 6 2 9; 5 1 8)"],
    correctAnswer: 0
  },
  {
    id: 94,
    text: "2A + 5B ni toping:\n\n    ⎛ 3  5 ⎞     ⎛ 2   3 ⎞\nA = ⎜      ⎟ B = ⎜       ⎟\n    ⎝ 4  1 ⎠     ⎝ 1  -2 ⎠",
    options: ["(16 25; 13 -8)", "(16 -3; 13 -1)", "(10 25; 1 -4)", "(1 -1; 1 0)"],
    correctAnswer: 0
  },
  {
    id: 95,
    text: "A² ni toping:\n\n    ⎛ 3  2 ⎞\nA = ⎜      ⎟\n    ⎝ 1  4 ⎠",
    options: ["(11 14; 7 18)", "(39 86; 47 78)", "(41 78; 38 83)", "(-10 4; 7 12)"],
    correctAnswer: 0
  },
  {
    id: 96,
    text: "Matritsalarni ko'paytirish mumkinmi?\n\nA(4x3) · B(4x5)",
    options: ["Yo'q", "Ha, 4x5", "Ha, 3x5", "Ha, 4x4"],
    correctAnswer: 0
  },
  {
    id: 97,
    text: "A · X = B tenglamaning yechimi qanday?",
    options: ["X = A⁻¹ · B", "X = B · A⁻¹", "X = A · B", "X = A · B⁻¹"],
    correctAnswer: 0
  },
  {
    id: 98,
    text: "M₁(x₁; y₁; z₁) va M₂(x₂; y₂; z₂) nuqtalar berilsa, M₁M₂ vektor koordinatalari:",
    options: ["(x₂-x₁; y₂-y₁; z₂-z₁)", "(x₁-x₂; y₁-y₂; z₁-z₂)", "(x₁+x₂; y₁+y₂; z₁+z₂)", "(x₁x₂; y₁y₂; z₁z₂)"],
    correctAnswer: 0
  },
  {
    id: 99,
    text: "A(0;0;1), B(3;2;1), C(4;6;5), D(1;6;3). a = AB + CD vektorni toping.",
    options: ["(5; 14; 10)", "(0; 2; -2)", "(4; 7; -2)", "(7; 1; 0)"],
    correctAnswer: 0
  },
  {
    id: 100,
    text: "Agar |a|=2, |b|=3, a^b=60° bo'lsa, a·b skalyar ko'paytma nimaga teng?",
    options: ["3", "4", "2", "6"],
    correctAnswer: 0
  },
  {
    id: 101,
    text: "Determinantdan qanday ko‘paytuvchilarni tashqariga chiqarish mumkin?\n\n    │ 2  6  1 │\nΔ = │ 10 15 5 │\n    │ 14 21 7 │",
    options: ["2, 3", "2, 3, 5, 7", "2, 3, 5", "2, 3, 7"],
    correctAnswer: 0
  },
  {
    id: 102,
    text: "Δ = │ 3  2  1 │\n    │ 0  5  4 │\n    │ 9  6  3 │ ni hisoblang.",
    options: ["0", "15", "26", "-12"],
    correctAnswer: 0
  },
  {
    id: 103,
    text: "Δ = │ 3  2  1 │\n    │ 4  0  5 │\n    │ 1  6 -3 │ determinant a₂₁ elementining M₂₁ minori topilsin.",
    options: ["-12", "-8", "10", "5"],
    correctAnswer: 0
  },
  {
    id: 104,
    text: "Δ = │ 3  2  1 │\n    │ 0  5  4 │\n    │ 2 -1  3 │ determinantni a₃₂ elementining A₃₂ algebraik to‘ldiruvchisi topilsin.",
    options: ["-12", "-8", "5", "10"],
    correctAnswer: 0
  },
  {
    id: 105,
    text: "Matritsalar berilgan, 3A-B matritsani toping:\n\n    ⎛ 2 -1  4 ⎞     ⎛ 1 -2  4 ⎞\nA = ⎜ 3  1 -2 ⎟ B = ⎜ 3  1  3 ⎟\n    ⎝ 1  2 -3 ⎠     ⎝ 1 -2  0 ⎠",
    options: ["( 5 -1 -8 )\n( 6  2 -9 )\n( 2  8 -9 )", "( 5 -1 -8 )\n( 4  2 -3 )\n( 2  8 -9 )", "( 5 -1  8 )\n( 6  2  9 )\n( 2  8  9 )", "( 5 -1  8 )\n( 6  2 -9 )\n( 2  8 -9 )"],
    correctAnswer: 0
  },
  {
    id: 106,
    text: "Matritsalar berilgan, 2A+5B matritsani toping:\n\n    ⎛ 3 5 ⎞     ⎛ 2  3 ⎞\nA = ⎜     ⎟ B = ⎜      ⎟\n    ⎝ 4 1 ⎠     ⎝ 1 -2 ⎠",
    options: ["( 16  25 )\n( 13 -8 )", "( 16 -3 )\n( 13 -1 )", "( 10  25 )\n( 1  -4 )", "( 1  -1 )\n( 1   0 )"],
    correctAnswer: 0
  },
  {
    id: 107,
    text: "A² matritsalarni toping:\n\n    ⎛ 3 2 ⎞\nA = ⎜     ⎟\n    ⎝ 1 4 ⎠",
    options: ["( 11 14 )\n( 7  18 )", "( 39 86 )\n( 47 78 )", "( 41 78 )\n( 38 83 )", "( -10 4 )\n(  7 12 )"],
    correctAnswer: 0
  },
  {
    id: 108,
    text: "A·B matritsalarni toping:\n\n    ⎛ 2 3 0 ⎞     ⎛ 1  7 ⎞\nA = ⎜       ⎟ B = ⎜ -2 3 ⎟\n    ⎝ 4 1 5 ⎠     ⎝ 6  0 ⎠",
    options: ["( -4 23 )\n( 32 31 )", "( 3 11 )\n( 5  4 )\n( 6  5 )", "( 8  5 )\n( 45 18 )", "( 8  5  3 )\n( 7  31 32 )"],
    correctAnswer: 0
  },
  {
    id: 109,
    text: "Quyidagi ko‘paytmalarni qaysi birini bajarish mumkin?",
    options: ["A₄ₓ₃ · B₃ₓ₅", "A₄ₓ₃ · B₄ₓ₅", "A₃ₓ₄ · B₅ₓ₃", "A₅ₓ₄ · B₅ₓ₃"],
    correctAnswer: 0
  },
  {
    id: 110,
    text: "A · X = B matritsali tenglamaning yechimi qanday bo‘ladi?",
    options: ["X = A⁻¹B", "X = BA⁻¹", "X = A·B", "X = A·B⁻¹"],
    correctAnswer: 0
  },
  {
    id: 111,
    text: "M₁(x₁; y₁; z₁) va M₂(x₂; y₂; z₂) nuqtalar berilsa, M₁M₂ vektorning koordinalari qanday bo‘ladi?",
    options: ["(x₂-x₁; y₂-y₁; z₂-z₁)", "(x₁-x₂; y₁-y₂; z₁-z₂)", "(x₁+x₂; y₁+y₂; z₁+z₂)", "(x₁·x₂; y₁·y₂; z₁·z₂)"],
    correctAnswer: 0
  },
  {
    id: 112,
    text: "Agar A(0;0;1), B(3;2;1), C(4;6;5), D(1;6;3) berilgan bo‘lsa, a = AB + CD vektorni toping.",
    options: ["a = (0; 2; -2)", "a = (5; 14; 10)", "a = (4; 7; -2)", "a = (7; 1; 0)"],
    correctAnswer: 0
  },
  {
    id: 113,
    text: "A(6; 4; 2) va B(8; -2; 5) berilgan bo‘lsa, AB vektorning uzunligini toping.",
    options: ["7", "3", "6", "5"],
    correctAnswer: 0
  },
  {
    id: 114,
    text: "Agar |a|=2, |b|=3, a^b=60° bo‘lsa, a·b skalyar ko‘paytma nimaga teng?",
    options: ["3", "4", "2", "6"],
    correctAnswer: 0
  },
  {
    id: 115,
    text: "a = (2; 3; -1) va b = (1; -5; m) vektorlar m ning qanday qiymatlarida o‘zaro perpendikulyar bo‘ladi?",
    options: ["-13", "-11", "13", "14"],
    correctAnswer: 0
  },
  {
    id: 116,
    text: "a = 2i - j va b = 3k vektorlar berilgan. a × b vektorli ko‘paytma topilsin.",
    options: ["-3i - 6j", "3i + 6j", "3i - 6j", "-3i - 6j"],
    correctAnswer: 0
  },
  {
    id: 117,
    text: "a(x₁; y₁; z₁), b(x₂; y₂; z₂), c(x₃; y₃; z₃) vektorlarning komplanarlik sharti.",
    options: ["Det(x₁,y₁,z₁; x₂,y₂,z₂; x₃,y₃,z₃) = 0", "Det ≠ 0", "x₁x₂ + y₁y₂ + z₁z₂ = 0", "Koordinatalar yig'indisi 0"],
    correctAnswer: 0
  },
  {
    id: 120,
    text: "Ordinata o‘qidagi b = -3 nuqtadan o‘tuvchi va Ox o‘qining musbat yo‘nalishi bilan α = π/6 burchak tashkil qiluvchi to‘g‘ri chiziq tenglamasini ko‘rsating.",
    options: ["x - √3y - 3√3 = 0", "3x - 3y - 2 = 0", "y = (√3/3)x + 3", "√3y + x - 3 = 0"],
    correctAnswer: 0
  },
  {
    id: 121,
    text: "A(3; -1) va B(4; 2) nuqtalar orqali o‘tuvchi to‘g‘ri chiziq tenglamasi tuzilsin.",
    options: ["y = 3x - 10", "y = -3x - 10", "y = 3x + 10", "y = 3x - 8"],
    correctAnswer: 0
  },
  {
    id: 122,
    text: "A(2; -1) nuqtadan o‘tuvchi va y = -0.5x + 5 to‘g‘ri chiziqqa perpendikulyar bo‘lgan to‘g‘ri chiziq tenglamasi tuzilsin.",
    options: ["y = 2x - 5", "y = -2x + 7", "y = 2x + 7", "y = 2x - 7"],
    correctAnswer: 0
  },
  {
    id: 123,
    text: "M(3; -1) va N(7; 2) nuqtalar orasidagi masofa topilsin.",
    options: ["5", "6", "8", "10"],
    correctAnswer: 0
  },
  {
    id: 124,
    text: "M(2; 1) nuqtadan 3x + 4y + 5 = 0 to‘g‘ri chiziqqacha bo‘lgan masofa topilsin.",
    options: ["3", "1", "2", "4"],
    correctAnswer: 0
  },
  {
    id: 125,
    text: "2x - 3y - z + 12 = 0 va 5x + y + Cz - 15 = 0 tekisliklar C ning qanday qiymatida perpendikulyar bo‘ladi.",
    options: ["7", "5", "9", "11"],
    correctAnswer: 0
  },
  {
    id: 126,
    text: "(x-2)/3 = (y+1)/2 = (z-5)/-1 to‘g‘ri chiziq va Ax + 2y + 7z + 5 = 0 tekislik A ning qanday qiymatida parallel bo‘ladi?",
    options: ["1", "-2", "-1", "0"],
    correctAnswer: 0
  },
  {
    id: 127,
    text: "x²/20 + y²/16 = 1 ellipsning M(0; 4) nuqtasidan o‘tuvchi urinmaning tenglamasini toping.",
    options: ["y = 4", "y = x + 4", "x = 4", "y = -4"],
    correctAnswer: 0
  },
  {
    id: 128,
    text: "25x² + 125y² = 625 ellips o‘qlari ning uzunliklari topilsin.",
    options: ["a = 5, b = √5", "a = 5, b = -5", "a = 5, b = 5", "a = √5, b = 5"],
    correctAnswer: 0
  },
  {
    id: 129,
    text: "4x² - 9y² = 36 giperbolaning yarim o‘qlari uzunliklari topilsin.",
    options: ["a = 3, b = 2", "a = 2, b = 3", "a = 3, b = -2", "a = -3, b = 2"],
    correctAnswer: 0
  },
  {
    id: 130,
    text: "Fokuslari orasidagi masofa 2c=8, uchlari orasidagi masofa 2a=6 bo‘lgan giperbola tenglamasi tuzilsin.",
    options: ["x²/9 - y²/7 = 1", "x²/9 - y²/6 = 1", "x²/6 - y²/4 = 1", "x²/8 - y²/6 = 1"],
    correctAnswer: 0
  },
  {
    id: 131,
    text: "y² = 8x parabola direktrisasi tenglamasini tuzing.",
    options: ["x = -2", "x = 2", "x = 4", "x = -4"],
    correctAnswer: 0
  },
  {
    id: 132,
    text: "Fokusi (6; 0) nuqtada bo‘lgan parabola tenglamasi tuzilsin.",
    options: ["y² = 24x", "y² = 8x", "y² = 4x", "y² = 14x"],
    correctAnswer: 0
  },
  {
    id: 135,
    text: "x² + y² - 6x = 0 aylananing radiusi aniqlansin.",
    options: ["R = 3", "R = 6", "R = 1", "R = 4"],
    correctAnswer: 0
  },
  {
    id: 136,
    text: "Radiusi R = 2 ga teng va markazi C(-1; 3) nuqtada bo‘lgan aylana tenglamasi tuzilsin.",
    options: ["(x+1)² + (y-3)² = 4", "x² + y² - 2x + 6y + 6 = 0", "x² + y² + 2x + 6y + 6 = 0", "x² + y² + 2x - 6y = 0"],
    correctAnswer: 0
  },
  {
    id: 138,
    text: "Hisoblang: lim(x→4) (x² - 2x - 8) / (x² - 16)",
    options: ["3/4", "2/3", "-2/3", "4/3"],
    correctAnswer: 0
  },
  {
    id: 139,
    text: "Hisoblang: lim(x→∞) (1 - 3/x)ˣ",
    options: ["e⁻³", "-3e³", "3e³", "e³"],
    correctAnswer: 0
  },
  {
    id: 140,
    text: "Hisoblang: lim(x→∞) sin(2/x) / (3/x)",
    options: ["2/3", "-3/2", "3/2", "-2/3"],
    correctAnswer: 0
  },
  {
    id: 141,
    text: "Hisoblang: lim(x→∞) (2x² + 3) / (x² + 3x + 5)",
    options: ["2", "1", "3", "4"],
    correctAnswer: 0
  },
  {
    id: 142,
    text: "Hisoblang: lim(x→∞) √(x² + 3 + x) / (2x - 1)",
    options: ["1", "0,5", "1,5", "2"],
    correctAnswer: 0
  },
  {
    id: 143,
    text: "Hisoblang: lim(x→-1) (x² - 1) / (x³ + 1)",
    options: ["-2/3", "1", "-1", "2"],
    correctAnswer: 0
  },
  {
    id: 144,
    text: "Hisoblang: lim(x→0) x · ctg(x/2)",
    options: ["2", "π/2", "2/π", "-π/2"],
    correctAnswer: 0
  },
  {
    id: 145,
    text: "Hisoblang: lim(x→3) (1/(x-3) - 6/(x²-9))",
    options: ["1/6", "-3", "+∞", "0"],
    correctAnswer: 0
  },
  {
    id: 146,
    text: "y = 1/(3ˣ⁻²) funksiyaning uzluksizligi tekshirilsin va uzilish nuqtasining turi aniqlansin.",
    options: ["Uzluksiz funksiya", "Funksiya x=2 nuqtada 2-tur uzilishga ega.", "Funksiya x=2 nuqtada 1-tur uzilishga ega.", "x=2 qutilib bo‘ladigan uzilish nuqta"],
    correctAnswer: 0
  },
  {
    id: 147,
    text: "y = 1/(x²-1) funksiyaning uzluksizligi tekshirilsin va uzilish nuqtasining turi aniqlansin.",
    options: ["Funksiya x=±1 nuqtalarda 2-tur uzilishga ega.", "Funksiya x=±1 nuqtalarda 1-tur uzilishga ega.", "Funksiya x=1 nuqtada 2-tur uzilishga ega.", "Funksiya x=-1 nuqtada 2-tur uzilishga ega."],
    correctAnswer: 0
  },
  {
    id: 148,
    text: "y = (3-x²)³ funksiyaning hosilasi topilsin:",
    options: ["-6x(3-x²)²", "3x(3-x²)²", "6x(3-x²)²", "-3x(3-x²)²"],
    correctAnswer: 0
  },
  {
    id: 149,
    text: "y = ln(1 - cos x) funksiyaning hosilasi topilsin:",
    options: ["ctg(x/2)", "tg(x/2)", "-tg(x/2)", "-ctg(x/2)"],
    correctAnswer: 0
  },
  {
    id: 150,
    text: "y = e^(-cos x) funksiyaning hosilasi topilsin:",
    options: ["y' = sin x · e^(-cos x)", "y' = -cos x · e^(-cos x)", "y' = cos x · e^(-cos x)", "y' = -sin x · e^(-cos x)"],
    correctAnswer: 0
  },
  {
    id: 151,
    text: "y = (1 - x³)/π funksiyaning hosilasi topilsin:",
    options: ["-3x²/π", "(3/π)x²", "(3/π²)x²", "(3/π)x²"],
    correctAnswer: 0
  },
  {
    id: 152,
    text: "y = sin(x²) funksiyaning hosilasi topilsin:",
    options: ["y' = 2x cos(x²)", "y' = 2sin x", "y' = 2x sin(x²)", "y' = 2cos(x²)"],
    correctAnswer: 0
  },
  {
    id: 153,
    text: "y = x ln x funksiyaning y' hosilasi topilsin:",
    options: ["ln x + 1", "1 + 1/x", "x + 1/x", "1/x"],
    correctAnswer: 0
  },
  {
    id: 154,
    text: "x = ln t, y = t² - 1 funksiyaning dy/dx hosilasi topilsin:",
    options: ["2t²", "1/(2t²)", "2t", "t²"],
    correctAnswer: 0
  },
  {
    id: 155,
    text: "y = arcsin(eˣ) funksiyaning hosilasi topilsin:",
    options: ["eˣ / √(1 - e^(2x))", "eˣ / √(1 + e^(2x))", "1 / √(1 - e^(2x))", "-eˣ / √(1 - e^(2x))"],
    correctAnswer: 0
  },
  {
    id: 156,
    text: "x² + y² = 1 oshkormas funksiyaning hosilasi topilsin:",
    options: ["y' = -x/y", "y' = x/y", "y' = y/x", "y' = -y/x"],
    correctAnswer: 0
  },
  {
    id: 157,
    text: "y = arccos(1-2x) funksiya hоsilasini tоping",
    options: ["1 / √(x - x²)", "-2 / √(1 - 2x)", "1 / (1 - 2x)", "-1 / (1 - 2x)"],
    correctAnswer: 0
  },
  {
    id: 158,
    text: "y = x - arctg x funksiya hоsilasini tоping",
    options: ["x² / (1 + x²)", "1 / (1 + x²)", "1 - 1/cos²x", "1 + 1/(1+x²)"],
    correctAnswer: 0
  },
  {
    id: 159,
    text: "y = 4x - x² funksiyaning ekstremumini hisоblang",
    options: ["x=2, ymax=4", "x=4, y=0", "x=0, ymin=0", "x=1, ymax=3"],
    correctAnswer: 0
  },
  {
    id: 160,
    text: "y = √x funksiyaning o‘sish oraliqini toping",
    options: ["x > 0", "x < 0", "x > 1", "x < 1"],
    correctAnswer: 0
  },
  {
    id: 161,
    text: "y = ln x funksiyaning kamayish oraliqini toping",
    options: ["Funksiya x > 0 da faqat o‘suvchi", "x > 0", "x < 0", "x < 1"],
    correctAnswer: 0
  },
  {
    id: 162,
    text: "y = x² funksiyaning o‘sish oraliqini toping",
    options: ["x > 0", "x < 3", "x > 1", "x < 1"],
    correctAnswer: 0
  },
  {
    id: 163,
    text: "x² + y² - 2x + y = 0 aylananing markazini toping.",
    options: ["(1, -1/2)", "(1, 2)", "(0, 2)", "(1, 1)"],
    correctAnswer: 0
  },
  {
    id: 164,
    text: "lim(n→∞) (n² - 1) / (n³ + n² - n - 1) ni aniqlang",
    options: ["0", "1/2", "1/3", "1"],
    correctAnswer: 0
  },
  {
    id: 165,
    text: "lim(x→2) (x² - 5x + 6) / (x² - 4) ni aniqlang",
    options: ["-1/4", "1/2", "1/3", "-2/3"],
    correctAnswer: 0
  },
  {
    id: 166,
    text: "To'g'ri chiziqning umumiy tеnglamasini kursating",
    options: ["Ax+By+C=0", "y=kx+b", "x/a + y/b = 1", "xcosα+ysinα-ρ=0"],
    correctAnswer: 0
  },
  {
    id: 167,
    text: "To'g'ri chiziqning nоrmal tеnglamasini kursating",
    options: ["xcosα+ysinα-ρ=0", "Ax+By+C=0", "y=kx+b", "x/a + y/b = 1"],
    correctAnswer: 0
  },
  {
    id: 168,
    text: "To'g'ri chiziqning kеsmalar buyicha tеnglamasini kursating",
    options: ["x/a + y/b = 1", "Ax+By+C=0", "y=kx+b", "xcosα+ysinα-ρ=0"],
    correctAnswer: 0
  },
  {
    id: 169,
    text: "To'g'ri chiziqning burchak kоeffitsiеnti tеnglamasini kursating",
    options: ["y=kx+b", "Ax+By+C=0", "x/a + y/b = 1", "xcosα+ysinα-ρ=0"],
    correctAnswer: 0
  },
  {
    id: 170,
    text: "Aylana tеnglamasini kursating",
    options: ["(x-a)² + (y-b)² = R²", "x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "y² = 2px"],
    correctAnswer: 0
  },
  {
    id: 171,
    text: "Ellips tеnglamasini kursating",
    options: ["x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "(x-a)² + (y-b)² = R²", "y² = 2px"],
    correctAnswer: 0
  },
  {
    id: 172,
    text: "Gipеrbоla tеnglamasini kursating",
    options: ["x²/a² - y²/b² = 1", "x²/a² + y²/b² = 1", "(x-a)² + (y-b)² = R²", "y² = 2px"],
    correctAnswer: 0
  },
  {
    id: 173,
    text: "Parabоla tеnglamasini kursating",
    options: ["y² = 2px", "x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "(x-a)² + (y-b)² = R²"],
    correctAnswer: 0
  },
  {
    id: 174,
    text: "lim(n→∞) (n² + 1) / (n² - n - 1) ni aniqlang",
    options: ["1", "1/2", "1/3", "0"],
    correctAnswer: 0
  },
  {
    id: 175,
    text: "lim(x→1) (x - 1) / (√x - 1) ni aniqlang",
    options: ["2", "1", "1/4", "-2/3"],
    correctAnswer: 0
  },
  {
    id: 176,
    text: "│ sin a   cos a │\n│ -cos a  sin a │ ni hisoblang",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0
  },
  {
    id: 177,
    text: "│ -x  1  x │\n│  0 -x -1 │\n│  x  1 -x │ ni hisoblang",
    options: ["-2x", "-4x²", "2x³", "2"],
    correctAnswer: 0
  },
  {
    id: 178,
    text: "lim(x→a) (√x - √a) / (x - a) (a > 0) ni hisoblang",
    options: ["1/(2√a)", "-0,5", "-1", "1"],
    correctAnswer: 0
  },
  {
    id: 179,
    text: "lim(x→∞) (3x - 1) / (x² + 1) ni hisoblang",
    options: ["0", "∞", "3", "1"],
    correctAnswer: 0
  },
  {
    id: 180,
    text: "lim(x→-2) (3x + 6) / (x³ + 8) ni hisoblang",
    options: ["1/4", "1/3", "3", "4"],
    correctAnswer: 0
  },
  {
    id: 181,
    text: "lim(x→1) (1/(x-1) - 2/(x²-1)) ni hisoblang",
    options: ["1/2", "1/4", "1", "2"],
    correctAnswer: 0
  },
  {
    id: 182,
    text: "y = x + 2√x funksiya hоsilasini tоping",
    options: ["1 + 1/√x", "1/(1+√x)", "x²/2 + √x", "1 + 2x·√x"],
    correctAnswer: 0
  },
  {
    id: 183,
    text: "y = sin √x funksiya hоsilasini tоping",
    options: ["cos(√x) / (2√x)", "cos √x", "√x · cos √x", "cos √x / √x"],
    correctAnswer: 0
  },
  {
    id: 184,
    text: "y = a^(sin x) funksiya hоsilasini tоping",
    options: ["a^(sin x) · cos x · ln a", "a^(sin x) · ln a", "a^(sin x) / ln a", "a^(sin x) · cos x"],
    correctAnswer: 0
  },
  {
    id: 185,
    text: "x² + y² + x = 0 aylananing radiusini toping.",
    options: ["1/2", "1", "1/3", "2"],
    correctAnswer: 0
  },
  {
    id: 186,
    text: "x² + y² + 4y = 0 aylananing markazini toping.",
    options: ["(0, -2)", "(1, 2)", "(1, -1/2)", "(1, 1)"],
    correctAnswer: 0
  },
  {
    id: 187,
    text: "y = xⁿ funksiya diffеrеnsialini aniqlang",
    options: ["dy = n xⁿ⁻¹ dx", "dy = xⁿ⁻¹ dx", "dy = (xⁿ⁺¹)/(n+1) dx", "F(x) = (xⁿ⁺¹)/(n+1)"],
    correctAnswer: 0
  },
  {
    id: 188,
    text: "Tenglamalar sistemasini yeching:\n⎧ x - 2y + 3z = 4\n⎨ 7x - 4y - z = 6\n⎩ -x + 2y - 3z = -4",
    options: ["(0; 1; 1)", "(1; 2; -3)", "(1; 0; 1)", "(2; 0; 1)"],
    correctAnswer: 0
  },
  {
    id: 189,
    text: "Tenglamalar sistemasini yeching:\n⎧ -2x + 2y + z = 0\n⎨ 3x + y - z = 4\n⎩ x - 2y - 2z = -1",
    options: ["(1; 1; 0)", "(0; 1; 1)", "(1; 0; 2)", "(2; 0; 1)"],
    correctAnswer: 0
  },
  {
    id: 190,
    text: "x² + y² - 2y = 0 aylananing radiusini toping.",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0
  },
  {
    id: 191,
    text: "y = √(x+1) funksiyaning o‘sish oraliqini toping",
    options: ["x ≥ -1", "x > 0", "x ≤ -1", "x < 1"],
    correctAnswer: 0
  },
  {
    id: 192,
    text: "│ 2 -1  2 │\n│ 2  0  4 │\n│ 0  1  1 │ ni hisoblang",
    options: ["-2", "1", "0", "-1"],
    correctAnswer: 0
  },
  {
    id: 193,
    text: "│   x    4 │\n│ -2x²  2x │ ni hisoblang",
    options: ["10x²", "3x²", "x²", "2x²"],
    correctAnswer: 0
  },
  {
    id: 194,
    text: "y = log₂ x funksiya diffеrеnsialini aniqlang",
    options: ["dy = 1/(x ln 2) dx", "dy = 1/(2x) dx", "dy = xⁿ⁺¹/(n+1) dx", "dy = 1/(2x ln 2) dx"],
    correctAnswer: 0
  },
  {
    id: 195,
    text: "Boshlari bir nuqtaga keltirilgan noldan farqli a va b vektorlar oxirlarini birlashtirish natijasida xosil bo‘lgan uchburchak yuzi:",
    options: ["Ularning vektor ko‘paytmasi modulini yarmiga teng.", "Shu vektorlar modullari ko‘paytmasiga teng.", "Shu vektorlar modullari ko‘paytmasining yarmiga teng.", "Ularning skalyar ko‘paytmasi modulini yarmiga teng."],
    correctAnswer: 0
  },
  {
    id: 196,
    text: "Uzunliklari teng, bir xil yo‘nalishga ega ikkita vektorlarga ...",
    options: ["o‘zaro teng vektorlar deyiladi.", "birlik vektorlar deyiladi;", "Qarama-qarshi vektorlar deyiladi;", "ortogonal vektorlar deyiladi;"],
    correctAnswer: 0
  },
  {
    id: 197,
    text: "To‘g‘ri chiziqning kesmalardagi tenglamasini aniqlang",
    options: ["x/a + y/b = 1", "ax+by+c=0", "y=kx+l", "(x-x₁)/(x₂-x₁) = (y-y₁)/(y₂-y₁)"],
    correctAnswer: 0
  },
  {
    id: 198,
    text: "Ellips deb nimaga aytiladi?",
    options: ["Tekislikda fiksirlangan F₁ va F₂ nuqtalargacha masofalarining yig‘indisi o‘zgarmas bo‘lgan nuqtalarning geometrik o‘rniga.", "Tekislikda fiksirlangan F₁ va F₂ nuqtalardan bir xil uzoqlikdagi barcha nuqtalarning geometrik o‘rniga.", "Tekislikda fiksirlangan nuqta va to‘g‘ri chiziqdan bir xil uzoqlikdagi nuqtalar o‘rniga.", "Masofalarning ayirmasi o'zgarmas bo'lgan nuqtalar o'rniga."],
    correctAnswer: 0
  },
  {
    id: 199,
    text: "Ikkita bir xil tartibli matrisalarning yig‘indisi deb",
    options: ["mos elementlarini qo‘shishdan hosil qilingan matrisaga aytiladi.", "mos elementlarini ko‘paytirishdan hosil qilingan matrisaga aytiladi.", "Birinchi matrisaning satri elementlarini ikkinchi matrisaning ustuni elementlariga ko‘paytirib qo‘shishdan hosil qilingan matrisaga aytiladi.", "Birinchi matrisaning satri elementlarini ikkinchi matrisaning ustuni elementlariga qo‘shishdan hosil qilingan matrisaga aytiladi."],
    correctAnswer: 0
  },
  {
    id: 206,
    text: "a = -2i + 3j + βk, b = αi - 6j + 2k vektorlar α va β ning qanday qiymatlarida kollinear bo‘ladi?",
    options: ["α = 4; β = -1", "α = 1; β = 2", "α = 0; β = 1", "α = 5; β = 3"],
    correctAnswer: 0
  },
  {
    id: 207,
    text: "x²/25 + y²/9 = 1 ellips tenglamasidan ε eksstentrisitet qiymatini aniqlang.",
    options: ["4/5", "5/4", "2/5", "3/4"],
    correctAnswer: 0
  },
  {
    id: 208,
    text: "Determinatni xisoblang:\n│  1  0 -1 │\n│  2  3  1 │\n│  3  4 -2 │",
    options: ["-9", "10", "1", "0"],
    correctAnswer: 0
  },
  {
    id: 209,
    text: "5x - y + 7 = 0 va 3x + 2y = 0 to‘g‘ri chiziqlar orasidagi burchakni aniqlang.",
    options: ["45°", "30°", "60°", "90°"],
    correctAnswer: 0
  },
  {
    id: 210,
    text: "x va y vektorlarning uzunliklari 11 va 23 ga, bu vektorlar ayirmasining uzunligi 30 ga teng. Shu vektorlar yig‘indisining uzunligini toping.",
    options: ["20", "34", "64", "42"],
    correctAnswer: 0
  },
  {
    id: 211,
    text: "a(1; 2) va b(2;1) vektorlar orasidagi burchakning sinusini toping.",
    options: ["3/5", "4/5", "4/7", "1/6"],
    correctAnswer: 0
  },
  {
    id: 212,
    text: "Uchinchi tartibli determinantni qaysi elementining minori │ a₁₁ a₁₃ │\n│ a₂₁ a₂₃ │ ko‘rinishda bo‘ladi?",
    options: ["a₃₂", "a₁₁", "a₂₁", "a₃₁"],
    correctAnswer: 0
  },
  {
    id: 213,
    text: "Birlik matrisa deb,",
    options: ["bosh diagonal elementlari birga teng bo‘lib, qolgan elementlari nollardan iborat matrisaga aytiladi.", "barcha elementlari birga teng matrisaga aytiladi.", "yordamchi diagonal elementlari birga teng bo‘lib, qolgan elementlari nollardan iborat matrisaga aytiladi.", "diagonal matrisaga aytiladi."],
    correctAnswer: 0
  },
  {
    id: 214,
    text: "a = i + 2j - k, b = 3i - j + 2k (a, b) skalyar ko‘paytmani toping",
    options: ["-1", "1", "2", "3"],
    correctAnswer: 0
  },
  {
    id: 215,
    text: "x/2 - y/4 = 5 to'ri chiziqning 0y o‘qi bilan kesishish nuqtasini toping.",
    options: ["(0; -20)", "(0; -15)", "(20; -1)", "(0; 20/3)"],
    correctAnswer: 0
  },
  {
    id: 216,
    text: "Kramer formulasida Δ = 0 bo‘lsa, tenglamalar sistemasi",
    options: ["yechimga ega emas yoki cheksiz ko'p yechimga ega", "Yagona yechimga ega", "Cheksiz ko‘p yechimga ega", "Ikkita yechimga ega"],
    correctAnswer: 0
  },
  {
    id: 217,
    text: "Tekislikda berilgan ikki nuqtadan bir xil uzoqlikda joylashgan nuqtalarning geometrik o'rni... dan iborat bo'ladi.",
    options: ["to‘g'ri chiziq", "Aylana", "Ellips", "Sfera"],
    correctAnswer: 0
  },
  {
    id: 218,
    text: "Tekislikdagi ixtiyoriy nuqtasidan berilgan to‘g‘ri chiziqqacha va berilgan nuqtagacha bo‘lgan masofalari teng bo‘lgan nuqtalarning geometrik o'rni... dan iborat bo‘ladi.",
    options: ["parabola", "Aylana", "Giperbola", "Ellips"],
    correctAnswer: 0
  },
  {
    id: 219,
    text: "Ushbu 3y + 2x - 9 = 0 tenglama bilan berilgan to‘g‘ri chiziqning burchak koeffistienti topilsin",
    options: ["-2/3", "-1", "-0,5", "1/2"],
    correctAnswer: 0
  },
  {
    id: 220,
    text: "Agar {xₙ} ketma-ketlik uchun ∃a ∀ε>0 ∃n₀∈N ∀n>n₀ |xₙ - a| < ε shart bajarilsa, u xolda ...",
    options: ["Ketma-ketlik yaqinlashuvchi", "Ketma-ketlik uzoqlashuvchi", "To‘g‘ri javob yo‘q", "Yaqinlashuvchi xam , uzoqlashuvchi xam emas"],
    correctAnswer: 0
  },
  {
    id: 221,
    text: "lim(n→∞) (-1)ⁿ yaqinlashishga tekshiring:",
    options: ["Uzoqlashuvchi", "Yaqinlashuvchi", "Yaqinlashuvchi xam , uzoqlashuvchi xam emas", "To‘g‘ri javob yo‘q"],
    correctAnswer: 0
  },
  {
    id: 222,
    text: "Agar {xₙ} yaqinlashuvchi bo‘lsa ...",
    options: ["chegaralangan", "Chegaralanmagan", "yuqoridan chegaralangan", "quyidan chegaralangan"],
    correctAnswer: 0
  },
  {
    id: 223,
    text: "Quyidagi funksiyalardan qaysi biri juft funksiya?",
    options: ["y = x²", "y = x - 2", "y = x³ - 3", "y = x + 1"],
    correctAnswer: 0
  },
  {
    id: 224,
    text: "Quyidagi nuqtalarning qaysi biri f(x) = -3x + 4 funksiyaning grafigiga tegishli?",
    options: ["(2; -2)", "(3; -5)", "(-3; 5)", "(5; -3)"],
    correctAnswer: 0
  },
  {
    id: 225,
    text: "Quyidagi funksiyalardan qaysi biri (-∞; 0) oraliqda o‘suvchi?",
    options: ["y = 3x + 2", "y = 3/x", "y = 6 - 3x", "y = x²"],
    correctAnswer: 0
  },
  {
    id: 226,
    text: "f(x) = (x-2)/(x²-1) funksiya aniqlanish soxasini toping.",
    options: ["(-∞;1) ∪ (-1;1) ∪ (1;+∞)", "R", "(-∞;1) ∪ (1+∞)", "(1;+∞)"],
    correctAnswer: 0
  },
  {
    id: 227,
    text: "lim(x→∞) (√2x² + 1) / (5x - 1) limitni hisoblang:",
    options: ["√2 / 5", "∞", "2/5", "-1"],
    correctAnswer: 0
  },
  {
    id: 228,
    text: "f(x) funksiya x = x₀ nuqtada uzluksiz deyiladi, agarda ...",
    options: ["lim(x→x₀) f(x) = f(x₀)", "lim(x→x₀) f(x) = a", "lim(x→x₀) f(x) = ∞", "limit mavjud emas"],
    correctAnswer: 0
  },
  {
    id: 229,
    text: "Agar f(x) funksiya [a, b] da uzluksiz bo‘lsa u shu oraliqda",
    options: ["Chegaralangan", "O‘suvchi bo‘ladi", "Kamayuvchi bo‘ladi", "Differenstiallanuvchi"],
    correctAnswer: 0
  },
  {
    id: 230,
    text: "y = 10/x³, y' topilsin:",
    options: ["-30/x⁴", "-30/x", "-30/x²", "30/x³"],
    correctAnswer: 0
  },
  {
    id: 231,
    text: "Boshlari bir nuqtaga keltirilgan noldan farqli a va b vektorlarlardan yasalgan parallelogramning yuzi.",
    options: ["Ularning vektor ko‘paytmasining moduliga teng.", "Shu vektorlar uzunliklari ko‘paytmasiga teng.", "Shu vektorlar ko‘paytmasining yarmiga teng.", "Ularning skalyar ko‘paytmasining moduliga teng."],
    correctAnswer: 0
  },
  {
    id: 232,
    text: "Kanonik tenglama bilan berilgan ellipsning eksstentrisiteti deb qanday songa aytiladi?",
    options: ["e = c/a bu yerda c = √(a² - b²)", "e = a/c", "e = √(a² + b²)/a", "e = b/a"],
    correctAnswer: 0
  },
  {
    id: 233,
    text: "a = -i + j va b = i - 2j + 2k vektorlar orasidagi burchakni aniqlang.",
    options: ["135°", "30°", "45°", "60°"],
    correctAnswer: 0
  },
  {
    id: 234,
    text: "x²/25 + y²/9 = 1 ellips tenglamasidan ε eksstentrisitet qiymatini aniqlang.",
    options: ["4/5", "5/4", "2/5", "3/4"],
    correctAnswer: 0
  },
  {
    id: 235,
    text: "Determinatni xisoblang:\n│  a  c -b │\n│  a  0  b │\n│  b  a -c │",
    options: ["-2a²b + c²a - b²c", "b²c - 2a²b + c²a", "0", "b²c"],
    correctAnswer: 0
  },
  {
    id: 236,
    text: "Uchlari A(1;-2;4) va B(3;-4;2) nuqtalarda bo‘lgan kesma o‘rtasining koordinatalarini toping.",
    options: ["(2;-3;3)", "(2;-4;3)", "(3;-3;3)", "(2;-3;4)"],
    correctAnswer: 0
  },
  {
    id: 237,
    text: "Agar |a|=6, |a+b|=11 va |a-b|=7 bo‘lsa, |b| ning qiymatini toping.",
    options: ["√85", "7", "5", "2√7"],
    correctAnswer: 1
  },
  {
    id: 238,
    text: "Agar |a|=2, |b|=4 a va b vektorlar orasidagi burchak π/3 ga teng bo‘lsa, 3a-2b va 5a-6b vektorlarning skalyar ko‘paytmasini toping.",
    options: ["-252", "364", "264", "140"],
    correctAnswer: 3
  },
  {
    id: 239,
    text: "m x n matrisa deb",
    options: ["m ta satr n ta ustundan iborat sonlar jadvaliga aytiladi", "m ta ustun n ta satrdan iborat sonlar jadvaliga aytiladi.", "m ta satr n ta ustundan iborat sonlar ko‘paytmasiga aytiladi", "m ta satr n ta ustundan iborat sonlar ko‘paytmalarining yig‘indisiga aytiladi"],
    correctAnswer: 0
  },
  {
    id: 241,
    text: "Quyidagi mulohazalardan qaysi biri noto‘g‘ri?",
    options: ["Matrisalar uchun quyidagi tenglik har doim o‘rinli: AB=BA", "m x n tartibli matrisaga n x p tartibli matrisani ko‘paytirsa, m x p tartibli matrisa hosil bo‘ladi.", "m x n tartibli matrisaga m x n tartibli matrisani qo‘shsa, m x n tartibli matrisa hosil bo‘ladi.", "Matrisalar ko‘paytmasining determinanti, ularning determinantlari ko‘paytmasiga tengdir."],
    correctAnswer: 0
  },
  {
    id: 242,
    text: "Matrisaning teskarisi mavjud bo‘lishligi uchun",
    options: ["determinanti noldan farqli bo‘lishligi zarur va etarli", "determinanti nolga teng bo‘lishligi zarur va etarli", "Kvadrat matrisa bo‘lishligi zarur va etarli", "diagonal matrisa bo‘lishligi zarur va etarli."],
    correctAnswer: 0
  },
  {
    id: 243,
    text: "Sistemaning yechimini Kramer usuli bilan toping:\n⎧ -5x₁ + 7x₂ = 3\n⎩ 2x₁ - 3x₂ = -1",
    options: ["x₁ = -2, x₂ = -1", "Δ = 0 va Kramer usulida echib bo‘lmaydi", "yechim yo‘q", "cheksiz ko‘p yechim"],
    correctAnswer: 0
  },
  {
    id: 244,
    text: "Agar ellips uchun a = 5 va c = 1,4 bo‘lsa, uning ekssentrisitetini toping.",
    options: ["ε = 0,28", "ε = 0,8", "ε = 0,1", "ε = 0,18"],
    correctAnswer: 0
  },
  {
    id: 245,
    text: "Uchburchakning uchlari A(3;-2;1), B(3;0;2) va C(1;2;5) nuqtalarda joylashgan. Shu uchburchakning BD medianasi va AC asosi orasidagi burchakni toping.",
    options: ["90°", "30°", "60°", "45°"],
    correctAnswer: 0
  },
  {
    id: 246,
    text: "5x - y + 7 = 0 va 3x + 2y = 0 to‘g‘ri chiziqlar orasidagi burchakni aniqlang.",
    options: ["45°", "30°", "60°", "90°"],
    correctAnswer: 0
  },
  {
    id: 247,
    text: "Kramer formulasida Δₓ = Δ_y = Δ_z = Δ = 0 bo‘lsa, tenglamalar sistemasi",
    options: ["cheksiz ko‘p yechimga ega", "yechimga ega emas", "yagona yechimga ega", "ikkita yechimga ega."],
    correctAnswer: 0
  },
  {
    id: 248,
    text: "M(-4; 10) nuqtadan o‘tib, koordinata o‘qlaridan teng kesmalar ajratuvchi to‘g‘ri chiziq tenglamasi tuzilsin.",
    options: ["x + y - 6 = 0", "x - y + 14 = 0", "y - 2x - 18 = 0", "3x - 2y + 8 = 0"],
    correctAnswer: 0
  },
  {
    id: 249,
    text: "Tekislikda berilgan nuqtadan bir xil uzoqlikda joylashgan nuqtalarning geometrik o‘rni… dan iborat bo‘ladi.",
    options: ["aylana", "To‘gri chiziq", "ellips", "parabola"],
    correctAnswer: 0
  },
  {
    id: 250,
    text: "Ushbu 3y + 5x + 15 = 0 tenglama bilan berilgan to‘g‘ri chiziqning burchak koeffistienti topilsin",
    options: ["-5/3", "-1", "-5", "-3"],
    correctAnswer: 0
  },
  {
    id: 251,
    text: "Agar {xₙ} ketma-ketlik uchun ∃a: ∀ε>0 ∃n₀∈N ∀n>n₀ |xₙ - a| < ε shart bajarilsa, u xolda ...",
    options: ["Ketma-ketlik yaqinlashuvchi", "Ketma-ketlik uzoqlashuvchi", "Yaqinlashuvchi xam , uzoqlashuvchi xam emas", "To‘g‘ri javob yo‘q"],
    correctAnswer: 0
  },
  {
    id: 252,
    text: "lim(n→∞) (1 + 1/n)ⁿ limitni xisoblang:",
    options: ["e", "1", "2", "0"],
    correctAnswer: 0
  },
  {
    id: 253,
    text: "Agar {xₙ} yaqinlashuvchi bo‘lsa, uning limiti …",
    options: ["yagona", "2 ta", "mavjud emas", "Cheksiz"],
    correctAnswer: 0
  },
  {
    id: 254,
    text: "Quyidagi funkstiyalardan qaysi biri toq funkstiya?",
    options: ["y = x³ - x", "y = x²", "y = x³ - 3", "y = x⁴ - 1"],
    correctAnswer: 0
  },
  {
    id: 255,
    text: "Quyidagi nuqtalardan qay biri f(x) = -2x + 5 funkstiyaning grafigiga tegishli?",
    options: ["(2;1)", "(1;2)", "(2;3)", "(0;1)"],
    correctAnswer: 0
  },
  {
    id: 256,
    text: "Quyidagi funkstiyalardan qaysi biri (0; +∞) oraliqda kamayuvchi?",
    options: ["y = -4/x", "y = x + 8", "y = 3 - x", "y = √x / 2"],
    correctAnswer: 0
  },
  {
    id: 257,
    text: "Juft funkstiya uchun quyidagilardan qaysi biri o‘rinli ?",
    options: ["Ordinatalar funkstiya grafigi o‘qiga nisbatan simmetrik", "Faqat o‘sadi", "Faqat kamayadi", "Funkstiya grafigi koordinatalar boshiga nisbatan simmetrik"],
    correctAnswer: 0
  },
  {
    id: 258,
    text: "lim(x→-1) (x² - x + 2) / (x³ + 1) limitni hisoblang:",
    options: ["-1", "-3", "5", "0"],
    correctAnswer: 0
  },
  {
    id: 259,
    text: "x = x₀ nuqta f(x) funkstiyaning 1-tur uzilish nuqtasi deyiladi, agarda …",
    options: ["f(x₀-0) va f(x₀+0) lar mavjud, f(x₀-0) ≠ f(x₀+0)", "lim f(x) = a", "f(x₀) < f(x)", "f(x₀-0) mavjud emas"],
    correctAnswer: 0
  },
  {
    id: 261,
    text: "Quyidagi tenglamalardan qaysi biri ellipsning kanonik tenglamasi?",
    options: ["x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "x²/a² - y²/b² = -1", "y² = 2px"],
    correctAnswer: 0
  },
  {
    id: 262,
    text: "9x² + 25y² = 225 ellips tenglamasidan fokuslari koordinatasini ko‘rsating.",
    options: ["F₁(-4; 0); F₂(4; 0)", "F₁(-2; 0); F₂(2; 0)", "F₁(-1; 0); F₂(1; 0)", "F₁(-3; 0); F₂(3; 0)"],
    correctAnswer: 0
  },
  {
    id: 263,
    text: "|a|=6, |b|=5 va ular orasidagi burchak 30° ekanligi ma’lum bo‘lsa ularning vektor ko‘paytmasini modulini aniqlang.",
    options: ["15", "5", "10", "12"],
    correctAnswer: 0
  },
  {
    id: 264,
    text: "Matrisani matrisaga ko‘paytiring:\n\n⎛ 4  5 ⎞   ⎛  1  2 ⎞\n⎜      ⎟ · ⎜       ⎟\n⎝ -1 11⎠   ⎝ -2  3 ⎠",
    options: ["Matrisalarni ko‘paytirib bo‘lmaydi", "(-4 23)\n(1 2)", "(-1 11)\n(4 5)", "(3 2)\n(-3 3)"],
    correctAnswer: 0
  },
  {
    id: 265,
    text: "a(8;6) vektor b va c vektorlarga yoyilgan. Agar a = μb + λc, c(10;-3) va b(-2;1) bo‘lsa, μ·λ ning qiymatini aniqlang.",
    options: ["100", "120", "115", "110"],
    correctAnswer: 0
  },
  {
    id: 266,
    text: "m x n matrisa deb",
    options: ["m ta satr n ta ustundan iborat sonlar jadvaliga aytiladi.", "m ta ustun n ta satrdan iborat sonlar jadvaliga aytiladi.", "m ta satr n ta ustundan iborat sonlar ko‘paytmasiga aytiladi", "m ta satr n ta ustundan iborat sonlar ko‘paytmalarining yig‘indisiga aytiladi"],
    correctAnswer: 0
  },
  {
    id: 267,
    text: "Agar determinantning ikkita satri elementlari bir xil bo‘lsa uning qiymati :",
    options: ["nolga teng bo‘ladi", "manfiy bo‘ladi", "musbat bo‘ladi", "noldan farqli bo‘ladi."],
    correctAnswer: 0
  },
  {
    id: 268,
    text: "Agar determinantning biror satri (ustuni)ning elementlarni biror songa ko‘paytirib boshqa bir satr (ustun)ning mos elementlariga qo‘shilsa, determinantning qiymati",
    options: ["o‘zgarmaydi", "nolga teng bo‘ladi", "ishorasiga o‘zgaradi", "o‘zgaradi."],
    correctAnswer: 0
  },
  {
    id: 269,
    text: "a = i + 2j - k, b = 3i - j + 2k vektorlar orasidagi burchak kosinusini toping.",
    options: ["cosφ = -1/(2√21)", "cosφ = 1", "cosφ = 1/(2√21)", "cosφ = √2/3"],
    correctAnswer: 0
  },
  {
    id: 270,
    text: "x/2 - y/4 = 5 to'ri chiziqning burchak koeffisentini aniqlang.",
    options: ["k = 2", "k = 3", "k = 3/2", "k = -3/2"],
    correctAnswer: 0
  },
  {
    id: 271,
    text: "Koordinata boshidan M₁(1; 4) va M₂(-1; -2) nuqtalardan o‘tuvchi to'ri chiziqqacha bo‘lgan masofa topilsin.",
    options: ["1/√10", "√2/10", "-1/10", "1/10"],
    correctAnswer: 0
  },
  {
    id: 272,
    text: "Agar |a|=7, |b|=17 va |a-b|=3√35 bo‘lsa, |a+b| ning qiymatini toping.",
    options: ["19", "20", "8√3", "9√2"],
    correctAnswer: 0
  },
  {
    id: 273,
    text: "Uchlari A (1;1), B(-2;3) va C (-1;-2) nuqtalarda bo‘lgan uchburchakning A va B burchaklarini toping.",
    options: ["45°; 90°", "60°; 30°", "90°; 45°", "30°; 90°"],
    correctAnswer: 0
  },
  {
    id: 274,
    text: "Ushbu determinantni hisoblang:\n\n│ 2008 0 2007 │\n│ 2009 2  551 │\n│ 2007 0 2006 │",
    options: ["2", "2008", "-2008", "-2"],
    correctAnswer: 0
  },
  {
    id: 275,
    text: "Kramer formulasida Δ ≠ 0 bo‘lsa, tenglamalar sistemasi",
    options: ["yagona yechimga ega", "yechimga ega emas", "cheksiz ko‘p yechimga ega", "ikkita yechimga ega."],
    correctAnswer: 0
  },
  {
    id: 276,
    text: "Tekislikdagi ixtiyoriy nuqtasidan berilgan ikki nuqtasigacha bo‘lgan masofalar ayirmasining moduli o‘garmas bo‘lgan nuqtalarning geometrik o‘rni… dan iborat bo‘ladi.",
    options: ["giperbola", "Aylana", "Ellips", "Sfera"],
    correctAnswer: 0
  },
  {
    id: 277,
    text: "Ushbu 3x + √3y + 1 = 0 tenglama bilan berilgan to‘g‘ri chiziqning burchak koeffistienti topilsin.",
    options: ["-√3", "√3", "-5", "3"],
    correctAnswer: 0
  },
  {
    id: 279,
    text: "lim(n→∞) (2n² - 1) / (3 - n²) limitni xisoblang:",
    options: ["-2", "2", "2/3", "3/2"],
    correctAnswer: 0
  },
  {
    id: 280,
    text: "Toq funkstiyalarga nisbatan quyidagilardan qaysi biri o‘rinli ?",
    options: ["Funkstiya grafigi koordinatalar boshiga nisbatan simmetrik", "Faqat o‘sadi", "Ordinatalar funkstiya grafigi o‘qiga nisbatan simmetrik", "Faqat kamayadi"],
    correctAnswer: 0
  },
  {
    id: 281,
    text: "lim(x→0) x / sin(3x) limitni hisoblang:",
    options: ["1/3", "1", "-1/3", "-1"],
    correctAnswer: 0
  },
  {
    id: 282,
    text: "y = (3x) / (x² - 1) funkstiya qaysi nuqtada uzilishga ega ?",
    options: ["x = ±1", "x = 0", "x = 1", "x = -1"],
    correctAnswer: 0
  },
  {
    id: 283,
    text: "y = ln(x - 1), y' topilsin:",
    options: ["1/(x - 1)", "1", "x", "x - 1"],
    correctAnswer: 0
  },
  {
    id: 284,
    text: "Tekislikdagi, ixtiyoriy nuqtasidan berilgan ikki nuqtasigacha bo‘lgan masofalarning yigindisi o‘zgarmas bo‘lgan nuqtalarning geometrik o'rni… dan iborat bo‘ladi.",
    options: ["ellips", "Aylana", "To'gri chiziq", "Tekislik"],
    correctAnswer: 0
  },
  {
    id: 285,
    text: "Agar bir jinsli chiziqli tеnglamalar sistеmasining kоeffitsiеntlaridan tuzilgan matritsaning dеtеrminanti nоlga tеng bo`lsa, bu sistеma nеchta еchimga ega?",
    options: ["chеksiz ko`p", "1", "yechimi yo`q", "2"],
    correctAnswer: 0
  },
  {
    id: 286,
    text: "Quyidagi matritsalardan qaysi birining dеtеrminanti nоldan farqli?",
    options: ["birlik matritsa", "ikkita bir хil satrlarga ega bo`lgan matritsa", "prоpоrtsiоnal ustunlarga ega bo`lgan matritsa", "bitta ustuni nоllalardan ibоrat matritsa"],
    correctAnswer: 0
  },
  {
    id: 287,
    text: "Uchburchakning uchlari (1;2); (3;4) va (5;-1) nuqtalarda joylashgan. Shu ushburchak medianalarining kesishgan nuqtasi koordinatalarini toping.",
    options: ["(3; 5/3)", "(2;3)", "(3;2)", "(3;3)"],
    correctAnswer: 0
  },
  {
    id: 288,
    text: "Quyidagi mulohazalardan qaysi biri to‘g‘ri?",
    options: ["Ikkita matrisalar yig‘indisining determinanti, ularning determinantlari yig‘indisiga tengdir.", "m x n tartibli matrisaga m x n tartibli matrisani ko‘paytirsa, m x n tartibli matrisa hosil bo‘ladi.", "Istalgan matrisa uchun teskari matrisani topish mumkin", "Determinantning istalgan satri elementlarini o‘zining algebraik to‘ldiruvchilarga ko‘paytmalarining yig‘indisi determinantning qiymatiga tengdir"],
    correctAnswer: 3
  },
  {
    id: 289,
    text: "a va b kollinear vektorlar berilgan. |a|=|b|=3 bo‘lsa, (a+b) va (a-b) qanday burchak tashkil etadi.",
    options: ["90°", "30°", "45°", "60°"],
    correctAnswer: 0
  },
  {
    id: 290,
    text: "lim(n→∞) (n² - n) / (1 - n) limitni xisoblang:",
    options: ["∞", "½", "0", "2"],
    correctAnswer: 0
  },
  {
    id: 291,
    text: "x = t, y = t, z = 3t - 5 to‘g‘ri chiziq va x + y - 4 = 0 tеkislik kеsishgan nuqtasining kооrdinatalarini tоping.",
    options: ["(2;2;1)", "(0;0;5)", "(1;1;3)", "(0;0;5)"],
    correctAnswer: 0
  },
  {
    id: 292,
    text: "Kооrdinatalar bоshidan 2x - y - 2z - 9 = 0 tеkislikkacha bo‘lgan masоfani tоping",
    options: ["3", "4", "2", "1"],
    correctAnswer: 0
  },
  {
    id: 293,
    text: "Ordinata o‘qidagi b = -3 nuqtadan o‘tuvchi va Ox o‘qining musbat yo‘nalishi bilan α = π/6 burchak tashkil qiluvchi to‘g‘ri chiziq tenglamasini ko‘rsating.",
    options: ["x - √3y - 3√3 = 0", "3x - 3y - 2 = 0", "y = (√3/3)x + 3", "√3y + x - 3 = 0"],
    correctAnswer: 0
  },
  {
    id: 294,
    text: "A(2; -1) nuqtadan o‘tuvchi va y = -0.5x + 5 to‘g‘ri chiziqqa per-pendikulyar bo‘lgan to‘g‘ri chiziq tenglamasi tuzilsin.",
    options: ["y = 2x - 5", "y = -2x + 7", "y = 2x + 7", "y = 2x - 7"],
    correctAnswer: 0
  },
  {
    id: 295,
    text: "2x - 3y - z + 12 = 0 va 5x + y + Cz - 15 = 0 tekisliklar C ning qanday qiymatida perpendikulyar bo‘ladi.",
    options: ["7", "5", "9", "11"],
    correctAnswer: 0
  },
  {
    id: 296,
    text: "(x-2)/3 = (y+1)/2 = (z-5)/-1 to‘g‘ri chiziq va Ax + 2y + 7z + 5 = 0 tekislik A ning qanday qiymatida parallel bo‘ladi?",
    options: ["1", "-2", "-1", "0"],
    correctAnswer: 0
  },
  {
    id: 297,
    text: "Funksiyaning aniqlanish sохasini tоping: y = arccos((3x + 4)/5)",
    options: ["[-3;1/3]", "(0;+∞)", "[0;+∞]", "(-1;2)"],
    correctAnswer: 0
  },
  {
    id: 298,
    text: "Δ = │ 3  2  1 │\n    │ 4  0  5 │\n    │ 1  6 -3 │ determinant a₂₁ elementining M₂₁ minori topilsin.",
    options: ["-12", "5", "-8", "10"],
    correctAnswer: 0
  },
  {
    id: 299,
    text: "y = √(16 - x²) funksiyaning qiymatlar sohasini toping.",
    options: ["[0, 4]", "[0, 2]", "[-4, 0]", "[-4, 4]"],
    correctAnswer: 0
  },
  {
    id: 300,
    text: "M (2;1) nuqtadan 3x + 4y + 5 = 0 to’g’ri chiziqqacha bo’lgan masofa topilsin.",
    options: ["3", "1", "2", "4"],
    correctAnswer: 0
  },
  {
    id: 335,
    text: "To‘g‘ri chiziqning kеsmalar buyicha tеnglamasini kursating",
    options: ["x/a + y/b = 1", "Ax+By+C=0", "y=kx+b", "xcosα+ysinα-ρ=0"],
    correctAnswer: 0
  },
  {
    id: 336,
    text: "To‘g‘ri chiziqning burchak kоeffitsiеnti tеnglamasini kursating",
    options: ["y=kx+b", "Ax+By+C=0", "x/a + y/b = 1", "xcosα+ysinα-ρ=0"],
    correctAnswer: 0
  },
  {
    id: 337,
    text: "A(2; -1) nuqtadan o‘tuvchi va y = -0.5x + 5 to‘g‘ri chiziqqa pеr-pеndikulyar bo‘lgan to‘g‘ri chiziq tеnglamasi tuzilsin.",
    options: ["y = 2x - 5", "y = 2x - 7", "y = 2x + 7", "y = -2x + 7"],
    correctAnswer: 0
  },
  {
    id: 338,
    text: "Agar 6x + 3y - 2 = 0 to‘g‘ri chiziq bеrilgan bo‘lsa, unga perpendikular bo‘lgan to‘g‘ri chiziqning burchak kоeffitsiеntini tоping.",
    options: ["1/2", "-2", "2", "-1/2"],
    correctAnswer: 0
  },
  {
    id: 339,
    text: "x + 4 = 0 va y + 6 = 0 to‘g‘ri chiziqlar оrasidagi burchakni tоping.",
    options: ["π/2", "π/4", "π/3", "0"],
    correctAnswer: 0
  },
  {
    id: 340,
    text: "Nоrmali n = {1; 2; 3} vеktоr bo‘lgan, kооrdinatalar bоshidan o‘tuvchi tеkislik tеnglamasini tuzing.",
    options: ["x + 2y + 3z = 0", "x/2 + y/3 + z = 0", "x + 2y + 3z = 1", "x/2 + y/2 + z/3 = 1"],
    correctAnswer: 0
  }
];

export const allQuestions: Question[] = questionsList;

export const getQuestionsByVariant = (variant: number): Question[] => {
  const questionsPerVariant = 30; // 30 tests per variant
  const start = (variant - 1) * questionsPerVariant;
  // Handle edge case for last variant if less than 30
  return allQuestions.slice(start, start + questionsPerVariant);
};

export const totalVariants = Math.ceil(allQuestions.length / 30);
