import React, { useState, useRef } from 'react';
import {
  STUDENT_LIST,
  READING_PASSAGE,
  SKILL_METADATA,
  SUBMISSION_ENDPOINT,
  generatePreparedQuiz,
} from './data/questions';
import {
  AppScreen,
  PreparedQuestion,
  UserAnswerRecord,
  SubmissionPayload,
  SkillType,
} from './types';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  GraduationCap,
  Sparkles,
  ChevronRight,
  FileText,
  AlertCircle,
  Award,
  Send,
  UserCheck,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('NAME_SELECTION');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [quizQuestions, setQuizQuestions] = useState<PreparedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionText, setSelectedOptionText] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'CORRECT' | 'INCORRECT'>('ALL');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const readingRef = useRef<HTMLDivElement>(null);

  // Start a new quiz session with freshly shuffled sections & options
  const handleStartQuiz = () => {
    if (!selectedStudent) return;
    const questions = generatePreparedQuiz();
    setQuizQuestions(questions);
    setCurrentIndex(0);
    setSelectedOptionText('');
    setUserAnswers([]);
    setSyncStatus('idle');
    setScreen('QUIZ');
  };

  // Handle answering and moving to the next question / submitting
  const handleNextQuestion = () => {
    if (!selectedOptionText || !quizQuestions[currentIndex]) return;

    const currentQ = quizQuestions[currentIndex];
    const isCorrect = selectedOptionText === currentQ.correctText;

    const answerRecord: UserAnswerRecord = {
      originalCau: currentQ.originalCau,
      questionIndex: currentIndex,
      hoi: currentQ.hoi,
      kyNang: currentQ.kyNang,
      options: currentQ.options,
      selectedText: selectedOptionText,
      correctText: currentQ.correctText,
      isCorrect,
    };

    const updatedAnswers = [...userAnswers, answerRecord];
    setUserAnswers(updatedAnswers);
    setSelectedOptionText('');

    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setScreen('RESULT');
      submitResults(updatedAnswers, selectedStudent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Submit test results to Google Apps Script Web App
  const submitResults = async (answers: UserAnswerRecord[], studentName: string) => {
    const rawTotalCorrect = answers.filter((a) => a.isCorrect).length;

    const nguPhapDung = answers.filter((a) => a.kyNang === 'NGUPHAP' && a.isCorrect).length;
    const tuVungDung = answers.filter((a) => a.kyNang === 'TUVUNG' && a.isCorrect).length;
    const docDung = answers.filter((a) => a.kyNang === 'DOC' && a.isCorrect).length;

    const payload: SubmissionPayload = {
      ten: studentName,
      lop: 'IELTS 4.0-4.5',
      diem: rawTotalCorrect,
      tongCau: 40,
      url: typeof window !== 'undefined' ? window.location.href : '',
      chiTiet: {
        NGUPHAP: { dung: nguPhapDung, tong: 16 },
        TUVUNG: { dung: tuVungDung, tong: 16 },
        DOC: { dung: docDung, tong: 8 },
      },
    };

    setSyncStatus('sending');

    try {
      await fetch(SUBMISSION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });
      setSyncStatus('success');
    } catch (error) {
      console.error('Lỗi khi gửi kết quả bài thi:', error);
      setSyncStatus('error');
    }
  };

  // Reset to initial screen
  const handleRestart = () => {
    setScreen('NAME_SELECTION');
    setSelectedStudent('');
    setQuizQuestions([]);
    setCurrentIndex(0);
    setSelectedOptionText('');
    setUserAnswers([]);
    setSyncStatus('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate scores for result screen
  const totalCorrect = userAnswers.filter((a) => a.isCorrect).length;
  const scorePercentage = Math.round((totalCorrect / 40) * 100);

  const getSkillScores = (skill: SkillType) => {
    const list = userAnswers.filter((a) => a.kyNang === skill);
    const correct = list.filter((a) => a.isCorrect).length;
    const total = SKILL_METADATA[skill].total;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, total, pct };
  };

  const filteredAnswers = userAnswers.filter((a) => {
    if (reviewFilter === 'CORRECT') return a.isCorrect;
    if (reviewFilter === 'INCORRECT') return !a.isCorrect;
    return true;
  });

  const currentQuestion = quizQuestions[currentIndex];

  return (
    <div id="app-container" className="min-h-screen bg-[#F2F0E9] flex flex-col justify-between text-[#2D2D2D] font-sans selection:bg-[#D4C9B0]">
      {/* Header Navigation */}
      <header id="main-header" className="bg-white/75 backdrop-blur-md border-b border-[#D4C9B0] sticky top-0 z-30 shadow-xs">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#5A5A40] flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] tracking-tight">
                  IELTS PRACTICE
                </h1>
                <span className="text-[11px] font-sans font-bold px-2 py-0.5 bg-[#D4C9B0]/60 text-[#5A5A40] rounded-full border border-[#D4C9B0]">
                  BAND 4.0–4.5
                </span>
              </div>
              <p className="text-xs text-[#6B6B55]">Bài luyện tập trắc nghiệm toàn diện</p>
            </div>
          </div>

          {selectedStudent && screen !== 'NAME_SELECTION' && (
            <div className="flex items-center space-x-2 bg-white/90 border border-[#D4C9B0] text-[#5A5A40] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
              <UserCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span className="text-[#2D2D2D]">{selectedStudent}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: CHỌN TÊN */}
          {screen === 'NAME_SELECTION' && (
            <motion.div
              key="name-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Introduction Card */}
              <div id="intro-card" className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#D4C9B0] shadow-sm space-y-6">
                <div className="inline-flex items-center space-x-2 bg-[#5A5A40]/10 text-[#5A5A40] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#5A5A40]/20">
                  <Sparkles className="w-4 h-4 text-[#5A5A40]" />
                  <span>Chuẩn bị bài tập tiếng Anh</span>
                </div>

                <div className="space-y-2.5">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2D2D] tracking-tight">
                    Bài tập Trắc nghiệm Tiếng Anh
                  </h2>
                  <p className="text-[#5A5A40] text-sm sm:text-base leading-relaxed">
                    Trình độ IELTS band 4.0 – 4.5. Đề gồm 40 câu hỏi trắc nghiệm chia theo 3 phần kỹ năng, giúp em củng cố vững chắc nền tảng ngữ pháp, từ vựng và kỹ năng đọc hiểu.
                  </p>
                </div>

                {/* Structure Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                  <div className="bg-[#F2F0E9] border border-[#D4C9B0] rounded-2xl p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A5A40] block mb-1">
                      Phần 1
                    </span>
                    <p className="font-serif text-base font-bold text-[#2D2D2D]">Ngữ pháp</p>
                    <p className="text-xs text-[#6B6B55] mt-1">16 câu hỏi trắc nghiệm</p>
                  </div>
                  <div className="bg-[#F2F0E9] border border-[#D4C9B0] rounded-2xl p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7355] block mb-1">
                      Phần 2
                    </span>
                    <p className="font-serif text-base font-bold text-[#2D2D2D]">Từ vựng</p>
                    <p className="text-xs text-[#6B6B55] mt-1">16 câu hỏi trắc nghiệm</p>
                  </div>
                  <div className="bg-[#F2F0E9] border border-[#D4C9B0] rounded-2xl p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4D6A60] block mb-1">
                      Phần 3
                    </span>
                    <p className="font-serif text-base font-bold text-[#2D2D2D]">Đọc hiểu</p>
                    <p className="text-xs text-[#6B6B55] mt-1">8 câu hỏi kèm bài đọc</p>
                  </div>
                </div>

                <hr className="border-[#E5E2D8]" />

                {/* Student Name Selection Form */}
                <div className="space-y-3">
                  <label htmlFor="student-select" className="block text-sm font-bold text-[#2D2D2D]">
                    Chọn tên của em <span className="text-amber-800">*</span>
                  </label>
                  
                  <div className="relative">
                    <select
                      id="student-select"
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full bg-white border-2 border-[#D4C9B0] text-[#2D2D2D] text-base rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/20 transition-all appearance-none font-medium cursor-pointer"
                    >
                      <option value="" disabled>
                        -- Nhấp vào đây để chọn tên của em --
                      </option>
                      {STUDENT_LIST.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#5A5A40]">
                      <ChevronRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>

                  <p className="text-xs text-[#6B6B55] italic">
                    * Hệ thống tự động xáo trộn câu hỏi và các đáp án cho mỗi lượt làm bài.
                  </p>
                </div>

                {/* Start Button */}
                <div className="pt-2">
                  <button
                    id="btn-start-quiz"
                    type="button"
                    disabled={!selectedStudent}
                    onClick={handleStartQuiz}
                    className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-full font-bold uppercase tracking-wider text-sm transition-all shadow-md ${
                      selectedStudent
                        ? 'bg-[#5A5A40] hover:bg-[#464630] text-white cursor-pointer active:scale-[0.99] shadow-[#5A5A40]/20'
                        : 'bg-[#E5E2D8] text-[#8C8C75] cursor-not-allowed'
                    }`}
                  >
                    <span>Bắt đầu làm bài</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: MÀN HÌNH LÀM BÀI */}
          {screen === 'QUIZ' && currentQuestion && (
            <motion.div
              key={`question-${currentIndex}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Progress & Meta Header Card */}
              <div id="quiz-header-card" className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#D4C9B0] shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif text-base font-bold text-[#2D2D2D]">
                      Câu {currentIndex + 1}
                    </span>
                    <span className="text-[#8C8C75]">/</span>
                    <span className="text-[#6B6B55] font-medium">40 câu</span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      SKILL_METADATA[currentQuestion.kyNang].badgeColor
                    }`}
                  >
                    {SKILL_METADATA[currentQuestion.kyNang].name}
                  </span>
                </div>

                {/* Progress Bar with Natural Tones */}
                <div className="w-full bg-[#E5E2D8] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#5A5A40] h-2 rounded-full transition-all duration-300 ease-out shadow-inner"
                    style={{ width: `${((currentIndex + 1) / 40) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Reading Passage if DOC */}
              {currentQuestion.kyNang === 'DOC' && (
                <div
                  ref={readingRef}
                  id="reading-passage-box"
                  className="bg-white rounded-3xl border border-[#D4C9B0] overflow-hidden shadow-sm space-y-0"
                >
                  <div className="p-4 sm:p-5 bg-[#5A5A40] text-white flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <BookOpen className="w-5 h-5 text-[#D4C9B0]" />
                      <h2 className="font-serif italic text-base sm:text-lg font-medium">
                        Phần 3: Bài Đọc (Reading Passage)
                      </h2>
                    </div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest border border-white/30 px-2.5 py-0.5 rounded-full text-[#E5E2D8]">
                      Tài liệu đọc
                    </span>
                  </div>

                  <div className="p-5 sm:p-7 space-y-3.5 text-sm sm:text-base leading-relaxed text-[#4A4A35] max-h-80 overflow-y-auto custom-scroll pr-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2D2D] mb-3">
                      {READING_PASSAGE.title}
                    </h3>

                    {READING_PASSAGE.paragraphs.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className={`text-justify ${
                          pIdx === 2
                            ? 'italic bg-[#F2F0E9] p-4 rounded-2xl border-l-4 border-[#5A5A40] text-[#2D2D2D]'
                            : ''
                        }`}
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  <div className="px-5 py-2.5 bg-[#F2F0E9] border-t border-[#E5E2D8] text-xs text-[#6B6B55] italic">
                    * Em có thể cuộn bài đọc để tra cứu thông tin bất cứ lúc nào khi làm bài.
                  </div>
                </div>
              )}

              {/* Question Card */}
              <div id="question-card" className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#D4C9B0] shadow-sm space-y-6">
                <div className="space-y-2">
                  <div className="inline-block px-3.5 py-1 rounded-full bg-[#D4C9B0]/40 text-[#5A5A40] text-xs font-bold uppercase tracking-wider">
                    Câu hỏi {currentIndex + 1}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2D2D2D] leading-snug">
                    {currentQuestion.hoi}
                  </h3>
                </div>

                {/* 4 Options with Natural Tones Design */}
                <div className="grid gap-3.5">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOptionText === option.text;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        id={`option-${option.label}`}
                        onClick={() => setSelectedOptionText(option.text)}
                        className={`w-full min-h-[56px] text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer group ${
                          isSelected
                            ? 'border-[#5A5A40] bg-[#F2F0E9] shadow-sm'
                            : 'border-[#D4C9B0] bg-white hover:border-[#5A5A40] hover:bg-[#F2F0E9]/70 text-[#2D2D2D]'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 pr-2">
                          <span
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#5A5A40] text-white'
                                : 'bg-[#F2F0E9] text-[#5A5A40] border border-[#D4C9B0] group-hover:bg-[#5A5A40] group-hover:text-white'
                            }`}
                          >
                            {option.label}
                          </span>
                          <span className={`text-base sm:text-lg leading-snug ${isSelected ? 'font-medium text-[#2D2D2D]' : 'text-[#3D3D30]'}`}>
                            {option.text}
                          </span>
                        </div>

                        <div className="shrink-0 ml-2">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-[#5A5A40] bg-[#5A5A40] text-white'
                                : 'border-[#D4C9B0] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <button
                    id="btn-next-question"
                    type="button"
                    disabled={!selectedOptionText}
                    onClick={handleNextQuestion}
                    className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-full font-bold uppercase tracking-wider text-sm transition-all shadow-md ${
                      selectedOptionText
                        ? 'bg-[#5A5A40] hover:bg-[#464630] text-white cursor-pointer active:scale-[0.99] shadow-[#5A5A40]/25'
                        : 'bg-[#E5E2D8] text-[#8C8C75] cursor-not-allowed'
                    }`}
                  >
                    <span>
                      {currentIndex === quizQuestions.length - 1 ? 'Nộp bài hoàn thành' : 'Câu tiếp theo'}
                    </span>
                    {currentIndex === quizQuestions.length - 1 ? (
                      <Send className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: MÀN HÌNH KẾT QUẢ */}
          {screen === 'RESULT' && (
            <motion.div
              key="result-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Score Banner Card */}
              <div id="result-summary-card" className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#D4C9B0] shadow-sm text-center space-y-4">
                <div className="w-14 h-14 bg-[#5A5A40]/15 text-[#5A5A40] rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <Award className="w-7 h-7" />
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6B6B55]">
                    Kết quả bài kiểm tra • {selectedStudent}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5A5A40] tracking-tight">
                    Em đúng {totalCorrect}/40 câu
                  </h2>
                  <p className="text-sm text-[#4A4A35]">
                    Đạt tỉ lệ chính xác <span className="font-bold text-[#2D2D2D]">{scorePercentage}%</span>
                  </p>
                </div>

                {/* Cloud Sync Indicator */}
                <div className="pt-1 flex items-center justify-center">
                  {syncStatus === 'sending' && (
                    <span className="inline-flex items-center space-x-1.5 text-xs text-[#8C7355] bg-[#8C7355]/10 border border-[#8C7355]/30 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-[#8C7355] animate-pulse"></span>
                      <span>Đang đồng bộ kết quả về hệ thống...</span>
                    </span>
                  )}
                  {syncStatus === 'success' && (
                    <span className="inline-flex items-center space-x-1.5 text-xs text-[#5A5A40] bg-[#5A5A40]/10 border border-[#5A5A40]/30 px-3 py-1 rounded-full font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span>Đã lưu kết quả thành công</span>
                    </span>
                  )}
                  {syncStatus === 'error' && (
                    <span className="inline-flex items-center space-x-1.5 text-xs text-[#6B6B55] bg-[#E5E2D8] border border-[#D4C9B0] px-3 py-1 rounded-full">
                      <AlertCircle className="w-3.5 h-3.5 text-[#6B6B55]" />
                      <span>Đã hoàn thành bài làm</span>
                    </span>
                  )}
                </div>

                <hr className="border-[#E5E2D8] my-4" />

                {/* Three Skill Breakdown Table */}
                <div className="space-y-3.5 text-left">
                  <h3 className="font-serif text-base font-bold text-[#2D2D2D]">
                    Kết quả chi tiết theo từng kỹ năng:
                  </h3>

                  {(['NGUPHAP', 'TUVUNG', 'DOC'] as SkillType[]).map((skill) => {
                    const score = getSkillScores(skill);
                    const meta = SKILL_METADATA[skill];
                    return (
                      <div
                        key={skill}
                        className="bg-[#F2F0E9] border border-[#D4C9B0] rounded-2xl p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${meta.badgeColor}`}>
                              {meta.name}
                            </span>
                            <span className="text-xs text-[#6B6B55]">({skill})</span>
                          </div>
                          <span className="font-bold text-[#2D2D2D]">
                            {score.correct}/{score.total} câu ({score.pct}%)
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-[#E5E2D8] rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              skill === 'NGUPHAP'
                                ? 'bg-[#5A5A40]'
                                : skill === 'TUVUNG'
                                ? 'bg-[#8C7355]'
                                : 'bg-[#4D6A60]'
                            }`}
                            style={{ width: `${score.pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Restart Button */}
                <div className="pt-3">
                  <button
                    id="btn-restart-quiz"
                    type="button"
                    onClick={handleRestart}
                    className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-full font-bold uppercase tracking-wider text-sm bg-[#5A5A40] hover:bg-[#464630] text-white transition-all shadow-md cursor-pointer active:scale-[0.99]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm lại từ đầu</span>
                  </button>
                </div>
              </div>

              {/* Review Section */}
              <div id="review-section" className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#D4C9B0] shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E2D8]">
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-5 h-5 text-[#5A5A40]" />
                    <h3 className="font-serif font-bold text-[#2D2D2D] text-lg sm:text-xl">
                      Xem lại chi tiết câu hỏi
                    </h3>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center space-x-1.5 bg-[#F2F0E9] p-1 rounded-2xl border border-[#D4C9B0] text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setReviewFilter('ALL')}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        reviewFilter === 'ALL'
                          ? 'bg-[#5A5A40] text-white shadow-xs'
                          : 'text-[#5A5A40] hover:text-[#2D2D2D]'
                      }`}
                    >
                      Tất cả (40)
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewFilter('CORRECT')}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        reviewFilter === 'CORRECT'
                          ? 'bg-[#5A5A40] text-white shadow-xs'
                          : 'text-[#5A5A40] hover:text-[#2D2D2D]'
                      }`}
                    >
                      Đúng ({totalCorrect})
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewFilter('INCORRECT')}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        reviewFilter === 'INCORRECT'
                          ? 'bg-[#5A5A40] text-white shadow-xs'
                          : 'text-[#5A5A40] hover:text-[#2D2D2D]'
                      }`}
                    >
                      Sai ({40 - totalCorrect})
                    </button>
                  </div>
                </div>

                {/* Answers Review List */}
                <div className="space-y-4">
                  {filteredAnswers.map((ans) => (
                    <div
                      key={ans.questionIndex}
                      className={`rounded-2xl p-4 sm:p-5 border transition-all ${
                        ans.isCorrect
                          ? 'bg-[#5A5A40]/5 border-[#5A5A40]/30'
                          : 'bg-[#8C5555]/5 border-[#8C5555]/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                              ans.isCorrect ? 'bg-[#5A5A40]' : 'bg-[#8C5555]'
                            }`}
                          >
                            {ans.isCorrect ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </span>
                          <span className="font-serif font-bold text-[#2D2D2D] text-sm">
                            Câu {ans.questionIndex + 1}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                              SKILL_METADATA[ans.kyNang].badgeColor
                            }`}
                          >
                            {SKILL_METADATA[ans.kyNang].name}
                          </span>
                        </div>

                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            ans.isCorrect
                              ? 'bg-[#5A5A40]/15 text-[#464630]'
                              : 'bg-[#8C5555]/15 text-[#6B3B3B]'
                          }`}
                        >
                          {ans.isCorrect ? 'Chính xác' : 'Chưa đúng'}
                        </span>
                      </div>

                      {/* Question Text */}
                      <p className="font-serif text-[#2D2D2D] text-base sm:text-lg mb-3 pl-8 font-medium">
                        {ans.hoi}
                      </p>

                      {/* Answers Breakdown */}
                      <div className="pl-8 space-y-1.5 text-xs sm:text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-[#6B6B55] font-medium">Đáp án em chọn:</span>
                          <span
                            className={`font-semibold px-2.5 py-0.5 rounded-lg ${
                              ans.isCorrect
                                ? 'bg-[#5A5A40]/15 text-[#2D2D2D]'
                                : 'bg-[#8C5555]/15 text-[#6B3B3B] line-through'
                            }`}
                          >
                            {ans.selectedText}
                          </span>
                        </div>

                        {!ans.isCorrect && (
                          <div className="flex items-center space-x-2">
                            <span className="text-[#6B6B55] font-medium">Đáp án đúng là:</span>
                            <span className="font-bold bg-[#5A5A40]/15 text-[#2D2D2D] px-2.5 py-0.5 rounded-lg">
                              {ans.correctText}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredAnswers.length === 0 && (
                    <div className="text-center py-8 text-[#6B6B55] text-sm">
                      Không có câu hỏi nào trong mục lọc này.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Status Bar */}
      <footer id="main-footer" className="bg-[#5A5A40] text-[#D4C9B0] py-3.5 px-4 text-center text-xs uppercase tracking-[0.15em] border-t border-[#464630]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>IELTS Foundation 4.0 – 4.5 • Writing & Reading Center</span>
          <div className="flex items-center space-x-3 text-[11px] opacity-90">
            <span className="inline-flex items-center space-x-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>Online</span>
            </span>
            <span>•</span>
            <span>Tự động xáo trộn đề & đáp án</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
