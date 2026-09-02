import { RawQuestion, PreparedQuestion, SkillType } from '../types';

export const STUDENT_LIST = ['Khánh Ngọc'];

export const READING_PASSAGE = {
  title: 'ONLINE LEARNING IN VIETNAM',
  paragraphs: [
    'Ten years ago, most students in Vietnam learned English only in a classroom. Today, many of them study online at home. Online lessons have become popular for several reasons.',
    'First, they save time. Students do not have to travel across the city, which can take an hour or more in heavy traffic. Second, online courses are often cheaper than traditional centres, because schools do not have to pay for large buildings.',
    'However, online learning is not perfect. Many students say they find it hard to concentrate at home. There are always things to distract them — a phone, a television, or a younger brother asking questions. Some learners also miss the chance to speak face to face with their classmates.',
    'Ms Hoa, an English teacher in Da Nang, believes the best method is a mixture of both. Her students watch video lessons at home and then come to class to practise speaking. The videos give them knowledge, she says, but the classroom gives them courage.',
    'Most experts agree that online learning will continue to grow. But they also warn that a screen cannot replace a real teacher completely.',
  ],
};

export const RAW_QUESTIONS: RawQuestion[] = [
  {"cau":1,"kyNang":"NGUPHAP","hoi":"She ____ to school by bus every morning.","A":"goes","B":"go","C":"going","D":"is go","dapAn":"A"},
  {"cau":2,"kyNang":"NGUPHAP","hoi":"I ____ my homework when my mother came home.","A":"do","B":"did","C":"have done","D":"was doing","dapAn":"D"},
  {"cau":3,"kyNang":"NGUPHAP","hoi":"If it ____ tomorrow, we will stay at home.","A":"rain","B":"rains","C":"will rain","D":"rained","dapAn":"B"},
  {"cau":4,"kyNang":"NGUPHAP","hoi":"This bridge ____ in 1990.","A":"built","B":"builds","C":"is building","D":"was built","dapAn":"D"},
  {"cau":5,"kyNang":"NGUPHAP","hoi":"My brother is ____ than me.","A":"tall","B":"taller","C":"tallest","D":"more tall","dapAn":"B"},
  {"cau":6,"kyNang":"NGUPHAP","hoi":"She is the ____ student in her class.","A":"good","B":"better","C":"best","D":"well","dapAn":"C"},
  {"cau":7,"kyNang":"NGUPHAP","hoi":"I have lived in this city ____ 2019.","A":"for","B":"since","C":"from","D":"in","dapAn":"B"},
  {"cau":8,"kyNang":"NGUPHAP","hoi":"There isn't ____ milk in the fridge.","A":"many","B":"some","C":"much","D":"a few","dapAn":"C"},
  {"cau":9,"kyNang":"NGUPHAP","hoi":"The man ____ lives next door is a doctor.","A":"which","B":"who","C":"whose","D":"whom","dapAn":"B"},
  {"cau":10,"kyNang":"NGUPHAP","hoi":"You ____ wear a helmet when you ride a motorbike. It is the law.","A":"must","B":"can","C":"may","D":"might","dapAn":"A"},
  {"cau":11,"kyNang":"NGUPHAP","hoi":"____ have you been studying English? - For three years.","A":"How long","B":"How far","C":"How often","D":"How much","dapAn":"A"},
  {"cau":12,"kyNang":"NGUPHAP","hoi":"She asked me where I ____ from.","A":"come","B":"coming","C":"have come","D":"came","dapAn":"D"},
  {"cau":13,"kyNang":"NGUPHAP","hoi":"I would rather ____ at home tonight.","A":"stay","B":"to stay","C":"staying","D":"stayed","dapAn":"A"},
  {"cau":14,"kyNang":"NGUPHAP","hoi":"Neither Nam nor his friends ____ interested in football.","A":"is","B":"am","C":"was","D":"are","dapAn":"D"},
  {"cau":15,"kyNang":"NGUPHAP","hoi":"It is the first time I ____ this film.","A":"see","B":"saw","C":"have seen","D":"had seen","dapAn":"C"},
  {"cau":16,"kyNang":"NGUPHAP","hoi":"He speaks English ____ than his sister.","A":"fluent","B":"fluently","C":"most fluently","D":"more fluently","dapAn":"D"},
  {"cau":17,"kyNang":"TUVUNG","hoi":"My teacher gave me a lot of ____ before the exam.","A":"advise","B":"advice","C":"advises","D":"advised","dapAn":"B"},
  {"cau":18,"kyNang":"TUVUNG","hoi":"She works as a ____ in a big hospital in the city centre.","A":"nurse","B":"nursing","C":"nursed","D":"nurseful","dapAn":"A"},
  {"cau":19,"kyNang":"TUVUNG","hoi":"The weather was terrible, so we had to ____ off the picnic.","A":"take","B":"put","C":"get","D":"turn","dapAn":"B"},
  {"cau":20,"kyNang":"TUVUNG","hoi":"Doing exercise every day can ____ stress after a long day at work.","A":"rise","B":"raise","C":"reduce","D":"grow","dapAn":"C"},
  {"cau":21,"kyNang":"TUVUNG","hoi":"He is very ____ about learning new languages; he studies three at the same time.","A":"bored","B":"enthusiastic","C":"careless","D":"tired","dapAn":"B"},
  {"cau":22,"kyNang":"TUVUNG","hoi":"Please ____ attention to the road signs when you drive.","A":"make","B":"do","C":"pay","D":"give","dapAn":"C"},
  {"cau":23,"kyNang":"TUVUNG","hoi":"The word 'enormous' is closest in meaning to ____.","A":"very small","B":"very slow","C":"very old","D":"very big","dapAn":"D"},
  {"cau":24,"kyNang":"TUVUNG","hoi":"My father is responsible ____ the sales department.","A":"of","B":"for","C":"with","D":"about","dapAn":"B"},
  {"cau":25,"kyNang":"TUVUNG","hoi":"Living in a big city has both advantages and ____.","A":"benefits","B":"chances","C":"disadvantages","D":"reasons","dapAn":"C"},
  {"cau":26,"kyNang":"TUVUNG","hoi":"She was deeply ____ by the beautiful scenery of Ha Long Bay.","A":"impress","B":"impressive","C":"impressed","D":"impression","dapAn":"C"},
  {"cau":27,"kyNang":"TUVUNG","hoi":"We should ____ energy by turning off the lights when we leave a room.","A":"spend","B":"save","C":"waste","D":"pay","dapAn":"B"},
  {"cau":28,"kyNang":"TUVUNG","hoi":"He ____ up smoking two years ago and feels much healthier now.","A":"gave","B":"took","C":"put","D":"got","dapAn":"A"},
  {"cau":29,"kyNang":"TUVUNG","hoi":"The company offers a good ____ and free lunch to its employees.","A":"salary","B":"money","C":"cost","D":"price","dapAn":"A"},
  {"cau":30,"kyNang":"TUVUNG","hoi":"Traffic ____ are a serious problem in Ho Chi Minh City at rush hour.","A":"blocks","B":"stops","C":"crowds","D":"jams","dapAn":"D"},
  {"cau":31,"kyNang":"TUVUNG","hoi":"The word OPPOSITE in meaning to 'increase' is ____.","A":"grow","B":"rise","C":"decrease","D":"develop","dapAn":"C"},
  {"cau":32,"kyNang":"TUVUNG","hoi":"My sister is good at ____ decisions quickly under pressure.","A":"doing","B":"taking","C":"getting","D":"making","dapAn":"D"},
  {"cau":33,"kyNang":"DOC","hoi":"What is the passage mainly about?","A":"The history of education in Vietnam","B":"The good and bad points of online learning","C":"How to become an English teacher","D":"Traffic problems in Vietnamese cities","dapAn":"B"},
  {"cau":34,"kyNang":"DOC","hoi":"According to the passage, one advantage of online lessons is that they ____.","A":"are more difficult","B":"save travelling time","C":"need large buildings","D":"have more students in each class","dapAn":"B"},
  {"cau":35,"kyNang":"DOC","hoi":"Why are online courses often cheaper?","A":"Teachers work for free","B":"Students can pay later","C":"Schools do not pay for large buildings","D":"The lessons are much shorter","dapAn":"C"},
  {"cau":36,"kyNang":"DOC","hoi":"What problem do many students have when they study at home?","A":"They cannot find a computer","B":"They have no books","C":"They find it hard to concentrate","D":"They have no teacher at all","dapAn":"C"},
  {"cau":37,"kyNang":"DOC","hoi":"The word 'distract' in the passage is closest in meaning to ____.","A":"help them study","B":"make them tired","C":"teach them something new","D":"take their attention away","dapAn":"D"},
  {"cau":38,"kyNang":"DOC","hoi":"What method does Ms Hoa believe is best?","A":"Only online lessons","B":"Only classroom lessons","C":"A mixture of online and classroom lessons","D":"No lessons at all","dapAn":"C"},
  {"cau":39,"kyNang":"DOC","hoi":"According to Ms Hoa, what does the classroom give students?","A":"courage","B":"knowledge","C":"money","D":"homework","dapAn":"A"},
  {"cau":40,"kyNang":"DOC","hoi":"What do most experts warn about?","A":"Online learning will stop soon","B":"Students should not use phones","C":"Teachers will lose their jobs","D":"A screen cannot fully replace a real teacher","dapAn":"D"}
];

export const SKILL_METADATA: Record<SkillType, { name: string; total: number; badgeColor: string; description: string }> = {
  NGUPHAP: {
    name: 'Ngữ pháp',
    total: 16,
    badgeColor: 'bg-[#5A5A40]/12 text-[#464630] border-[#5A5A40]/30',
    description: 'Grammar Focus (16 câu)',
  },
  TUVUNG: {
    name: 'Từ vựng',
    total: 16,
    badgeColor: 'bg-[#8C7355]/15 text-[#5C4830] border-[#8C7355]/30',
    description: 'Vocabulary in Context (16 câu)',
  },
  DOC: {
    name: 'Đọc hiểu',
    total: 8,
    badgeColor: 'bg-[#4D6A60]/15 text-[#304840] border-[#4D6A60]/30',
    description: 'Reading Comprehension (8 câu)',
  },
};

export const SUBMISSION_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbw00EtPyhylfx8ZUg3o7CFvc5g44RK17byvTJqy8kMY6grcfIVpTAT7Enu9NenGnBFR/exec';

/**
 * Standard Fisher-Yates shuffle helper
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Prepares the 40 questions by:
 * 1. Filtering into 3 distinct sections (NGUPHAP, TUVUNG, DOC)
 * 2. Shuffling questions within each section independently (Part 1, Part 2, Part 3 order maintained)
 * 3. Shuffling the 4 options of each question and mapping the correct content string
 */
export function generatePreparedQuiz(): PreparedQuestion[] {
  const nguPhap = RAW_QUESTIONS.filter((q) => q.kyNang === 'NGUPHAP');
  const tuVung = RAW_QUESTIONS.filter((q) => q.kyNang === 'TUVUNG');
  const doc = RAW_QUESTIONS.filter((q) => q.kyNang === 'DOC');

  const shuffledNguPhap = shuffleArray(nguPhap);
  const shuffledTuVung = shuffleArray(tuVung);
  const shuffledDoc = shuffleArray(doc);

  const combined = [...shuffledNguPhap, ...shuffledTuVung, ...shuffledDoc];

  const labels: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return combined.map((q) => {
    // Get correct text content directly from the raw question
    const correctText = q[q.dapAn];

    // Collect all 4 option texts
    const rawOptionTexts = [q.A, q.B, q.C, q.D];
    const shuffledOptionTexts = shuffleArray(rawOptionTexts);

    const options: PreparedQuestion['options'] = shuffledOptionTexts.map((text, idx) => ({
      label: labels[idx],
      text,
    }));

    return {
      originalCau: q.cau,
      kyNang: q.kyNang,
      hoi: q.hoi,
      options,
      correctText,
    };
  });
}
