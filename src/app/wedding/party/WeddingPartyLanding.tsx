"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const navItems = [
  { label: "일정", target: "schedule" },
  { label: "장소", target: "venue" },
  { label: "드레스 코드", target: "style" },
  { label: "FAQ", target: "faq" },
  { label: "RSVP", target: "rsvp" },
];

const scheduleItems = [
  {
    time: "12:00 ~ 19:00",
    title: "전체 행사 일정",
    description:
      "12시부터 19시까지 자유롭게 오셔서 즐기실 수 있습니다. 편한 시간에 방문해 주세요.",
  },
  {
    time: "12:30 ~ 15:00",
    title: "식사 & 이야기",
    description:
      "전문 케이터링이 준비한 음식과 함께 편안한 대화를 나누는 시간입니다. 간단한 안주와 주류도 많이 준비되어 있습니다.",
  },
  {
    time: "15:00 ~ 16:30",
    title: "(나는 솔로 애청자가 만든) 솔로 테이블",
    description:
      "서로의 지인들이 자연스럽게 어울릴 수 있도록 준비한 시간입니다. 간단한 게임과 대화 주제로 어색함을 풀어 드려요. 혹시 모르죠 여기서 새로운 인연을 찾게될지..?",
  },
  {
    time: "17:00 ~ 18:00",
    title: "경품 추첨 및 퀴즈 타임",
    description:
      "작은 선물과 함께 즐거운 시간을 준비했습니다. 행운의 주인공이 되어 보세요!",
  },
];

const faqItems = [
  {
    question: "선물이나 축의금을 준비해야 하나요?",
    answer:
      "전혀 부담 가지지 않으셔도 됩니다. 편하게 오셔서 같이 이야기 나눠 주시는 것만으로도 충분해요.",
  },
  {
    question: "혼자 가도 괜찮나요?",
    answer:
      "네, 물론입니다. 혼자 오시는 분들도 많으니 편하게 오세요. 새로운 인연도 만날 수 있을 거예요.",
  },
  {
    question: "늦게 가도 되나요?",
    answer:
      "네, 12시부터 7시까지 언제든지 오시면 됩니다. 언제와도 음식과 음료가 준비되어 있어요.",
  },
  {
    question: "드레스 코드가 많이 신경 쓰이는데요?",
    answer:
      "엄격한 드레스 코드는 아니니 너무 걱정하지 않으셔도 됩니다. 편안하고 기분 좋은 옷차림이면 충분해요.",
  },
  {
    question: "아이를 데려가도 괜찮나요?",
    answer:
      "네, 아이들도 환영합니다. 함께 오실 계획이라면 RSVP에 적어 주시면 준비에 도움이 됩니다.",
  },
];

const attendanceOptions = [
  { value: "attending", label: "참석 예정" },
  { value: "maybe", label: "아직 고민 중" },
  { value: "not_attending", label: "어렵습니다" },
];

const soloTableOptions = [
  { value: "yes", label: "네" },
  { value: "no", label: "아니요, 괜찮아요" },
];

const initialFormState = {
  name: "",
  attendance: "",
  guestsCount: "",
  soloTable: "",
  message: "",
};

type FormState = typeof initialFormState;

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export default function WeddingPartyLanding() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showNav, setShowNav] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowNav(!entry.isIntersecting);
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  const isSubmitDisabled = useMemo(() => {
    return status === "loading";
  }, [status]);

  const handleChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.attendance || !form.soloTable) {
      setStatus("error");
      setErrorMessage("이름, 참석 여부, 솔로 테이블 여부를 입력해 주세요.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/wedding/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          guestsCount: form.guestsCount ? Number(form.guestsCount) : 0,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
          errorBody?.message ||
            "제출에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      }

      setStatus("success");
      setForm(initialFormState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "잠시 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
    }
  };

  return (
    <main className="scroll-smooth bg-[#080103] text-white">
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,77,118,0.28),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(120,5,24,0.45),_transparent_65%)]" />
        <div className="relative z-10">
          <header
            className={`fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-[#080103]/85 backdrop-blur transition duration-500 ${
              showNav
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
            }`}
            aria-hidden={!showNav}
          >
            <div className="mx-auto flex max-w-6xl justify-end px-6 py-4">
              <nav className="flex flex-wrap gap-4 text-xs font-medium text-[#D9B8C1] sm:text-sm">
                {navItems.map((item) => (
                  <a
                    key={item.target}
                    href={`#${item.target}`}
                    className="tracking-wide transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          <section
            id="hero"
            ref={heroRef}
            className="relative isolate min-h-[100svh] overflow-hidden"
          >
            <div className="absolute inset-0">
              <div
                className="h-full w-full bg-[url('/wedding-hero.jpg')] bg-cover bg-center"
                role="presentation"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#140103]/60 to-transparent" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-end px-6 py-16 text-left text-white">
              <div className="space-y-5 sm:max-w-3xl">
                <p className="text-xs uppercase tracking-[0.6em] text-[#FF6B81]">
                  PRE-WEDDING INVITATION
                </p>
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                  신태섭 · 노한솔의
                  <br />
                  청첩파티에 초대합니다
                </h1>
                <p className="text-base leading-relaxed text-[#FCE6EA] md:text-lg">
                  결혼식을 앞두고, <br />
                  서로의 지인에게 서로를 소개하는
                  <br />
                  작은 모임을 준비했습니다.
                  <br />
                  <br />
                  함께 식사도 하고 이야기도 나누면서
                  <br /> 결혼 소식도 천천히 전하고 싶습니다.
                </p>
              </div>
            </div>
            {!showNav && (
              <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.3em] text-white/70 animate-pulse">
                <span className="text-[0.65rem] uppercase">
                  Scroll to explore
                </span>
                <span className="text-lg">↓</span>
              </div>
            )}
          </section>

          <section id="schedule" className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-[#FF6B81]">
                  진행 일정
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  타임 테이블
                </h2>
                <p className="mt-1 text-md text-[#E4C4CE]">
                  시간은 대략적인 계획이며, 현장에서 유동적으로 변동될 수
                  있습니다.
                </p>
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {scheduleItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-[#1c050a] p-6"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-[#FF8CB0]">
                    {item.time}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-base text-[#E6C6CF]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="venue" className="mx-auto max-w-6xl px-6 py-16">
            <div className="rounded-[32px] border border-white/10 bg-[#1c050a] p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-[#FF6B81]">
                장소 안내
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                인핸스 Drift 라운지
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-4 text-[#F4DDE4]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-[#FF8CB0]">
                      주소
                    </p>
                    <p className="mt-2 text-lg">
                      서울특별시 서초구 서초중앙로8길 89-17, B1
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-[#FF8CB0]">
                      가까운 역
                    </p>
                    <p className="mt-2 text-lg">
                      남부터미널역 2번 출구 도보 10분
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-[#FF8CB0]">
                      주차
                    </p>
                    <p className="mt-2 text-base text-[#E4C4CE]">
                      건물 내 주차 공간이 넉넉하지 않습니다.
                      <br />
                      가능하면 대중교통 이용을 부탁드려요.
                    </p>
                  </div>
                  <p className="text-sm text-[#D8A6AF]">
                    길이 헷갈리면 언제든 연락 주세요. <br />
                    자세한 위치는 아래 지도를 참고해 주세요.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://naver.me/xdp3hNm5"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-[#FF6B81] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#5fd4ff]"
                    >
                      네이버 지도 열기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="style" className="mx-auto max-w-4xl px-6 py-16">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-[#FF6B81]">
                드레스 코드
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Black & Red의 크리스마스 무드
              </h2>
              <div className="mt-6 space-y-4 text-lg text-[#F4DDE4]">
                <p>
                  엄격한 드레스 코드는 아니지만, 크리스마스 느낌의 Black & Red
                  톤으로 맞춰 주시면 감사하겠습니다.
                </p>
                <ul className="list-disc space-y-2 pl-6 text-base text-[#E4C4CE]">
                  <li>너무 격식 있는 정장까지는 전혀 필요 없어요.</li>
                  <li>포인트가 되는 간단한 아이템이면 충분합니다.</li>
                  <li>편한 신발, 운동화도 괜찮습니다.</li>
                </ul>
                <p>
                  본인이 봐도 기분 좋고 편안한 옷차림이면 가장 잘 어울릴 거예요
                  :)
                </p>
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-6 py-16">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.4em] text-[#FF6B81]">
                FAQ
              </p>
              <h2 className="text-3xl font-semibold text-white">미리 궁금해하실 질문들</h2>
              <div className="rounded-[32px] border border-white/10 bg-[#1c050a]">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="border-b border-white/5 last:border-none"
                  >
                    <summary className="cursor-pointer list-none px-6 py-5 text-lg font-semibold text-white">
                      {item.question}
                    </summary>
                    <p className="px-6 pb-6 text-base text-[#E6C6CF]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="rsvp" className="mx-auto max-w-3xl px-6 pb-24">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-[#FF6B81]">
                RSVP
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                참석 여부를 알려 주세요
              </h2>
              <p className="mt-4 text-base text-[#F4DDE4]">
                준비를 위해 아래 정보를 간단히 남겨 주시면 큰 도움이 됩니다.
                참석 여부가 바뀌어도 괜찮으니 편하게 알려 주세요.
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm text-[#E4C4CE]" htmlFor="name">
                    이름
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#080103] px-4 py-3 text-white focus:border-[#FF5C8A] focus:outline-none"
                    placeholder="예: 김지영"
                  />
                </div>
                <div>
                  <label
                    className="text-sm text-[#E4C4CE]"
                    htmlFor="attendance"
                  >
                    참석 여부
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    required
                    value={form.attendance}
                    onChange={handleChange("attendance")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#080103] px-4 py-3 text-white focus:border-[#FF5C8A] focus:outline-none"
                  >
                    <option value="" disabled>
                      선택해 주세요
                    </option>
                    {attendanceOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#080103] text-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="text-sm text-[#E4C4CE]"
                    htmlFor="guestsCount"
                  >
                    동행 인원 (본인을 제외한 인원 수)
                  </label>
                  <input
                    id="guestsCount"
                    name="guestsCount"
                    type="number"
                    min={0}
                    max={5}
                    value={form.guestsCount}
                    onChange={handleChange("guestsCount")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#080103] px-4 py-3 text-white focus:border-[#FF5C8A] focus:outline-none"
                    placeholder="0"
                  />
                </div>
                <div>
                  <span className="text-sm text-[#E4C4CE]">
                    솔로 테이블 참여 여부
                  </span>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    {soloTableOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex flex-1 cursor-pointer items-center gap-2 rounded-2xl border px-4 py-3 text-sm transition ${
                          form.soloTable === option.value
                            ? "border-[#FF6B81] bg-white/10 text-white"
                            : "border-white/10 bg-transparent text-[#E4C4CE]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="soloTable"
                          value={option.value}
                          checked={form.soloTable === option.value}
                          onChange={handleChange("soloTable")}
                          className="h-4 w-4 accent-[#FF6B81]"
                          required
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#E4C4CE]" htmlFor="message">
                    남기고 싶은 말
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange("message")}
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#080103] px-4 py-3 text-white focus:border-[#FF5C8A] focus:outline-none"
                    placeholder="편하게 한마디 남겨 주세요 :)"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="w-full rounded-full bg-[#FF5C8A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#FF6F98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? "전송 중..." : "RSVP 보내기"}
                </button>
                <div className="text-sm text-[#E4C4CE]">
                  {status === "success" && (
                    <p className="text-[#6EE7B7]" role="status">
                      RSVP가 정상적으로 접수되었습니다. 함께해 주셔서
                      감사합니다!
                    </p>
                  )}
                  {status === "error" && errorMessage && (
                    <p className="text-[#FF8CB0]" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </section>

          <footer className="border-t border-white/5 bg-[#080103]/80 py-12 text-center text-sm text-[#C98795]">
            <p>
              궁금하신 점이 있거나 일정/참석 여부가 바뀌면 편하게 연락 주세요.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#7D3A44]">
              © 2025 신태섭 & 노한솔. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
