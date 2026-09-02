export type SkillType = 'NGUPHAP' | 'TUVUNG' | 'DOC';

export interface RawQuestion {
  cau: number;
  kyNang: SkillType;
  hoi: string;
  A: string;
  B: string;
  C: string;
  D: string;
  dapAn: 'A' | 'B' | 'C' | 'D';
}

export interface ShuffledOption {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface PreparedQuestion {
  originalCau: number;
  kyNang: SkillType;
  hoi: string;
  options: ShuffledOption[];
  correctText: string;
}

export interface UserAnswerRecord {
  originalCau: number;
  questionIndex: number; // 0-based
  hoi: string;
  kyNang: SkillType;
  options: ShuffledOption[];
  selectedText: string;
  correctText: string;
  isCorrect: boolean;
}

export interface SkillDetail {
  dung: number;
  tong: number;
}

export interface SubmissionPayload {
  ten: string;
  lop: string;
  diem: number;
  tongCau: number;
  url: string;
  chiTiet: {
    NGUPHAP: SkillDetail;
    TUVUNG: SkillDetail;
    DOC: SkillDetail;
  };
}

export type AppScreen = 'NAME_SELECTION' | 'QUIZ' | 'RESULT';
