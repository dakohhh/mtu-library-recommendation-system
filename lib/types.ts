export type SubjectOption = {
  id: number;
  label: string;
};

export type Student = {
  id: string;
  firstname: string;
  lastname: string;
  othername?: string;
  matric_no: string;
  level: number;
  academic_session: string;
  department: number;
  chapel_group_number: number;
  chapel_seat_number: number;
};

export type Books = {
  id: string;
  title: string;
  author: string;
  language_code: string;
  genres: string;
};

export type AcademicSessionAPI = {
  id: string;
  session: string;
  semester: string;
};

export type AcademicSession = {
  id: string;
  label: string;
};

export type AbsentStudent = Student & {
  title_of_service?: string;
};



