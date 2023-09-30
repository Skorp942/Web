--Таблица вузов
CREATE TABLE Universities  (
    university_id  SERIAL PRIMARY KEY,
    university_name VARCHAR(100) NOT NULL
)

--Таблица групп
CREATE TABLE Groups   (
    group_id  SERIAL PRIMARY KEY,
    group_name  VARCHAR(100) NOT NULL,
    university_name INTEGER REFERENCES Universities(university_id)
)

--Таблица предметов
CREATE TABLE Subjects  (
    subject_id  SERIAL PRIMARY KEY,
    subject_name  VARCHAR(50) NOT NULL
)

--Таблица студентов
CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    group_name INTEGER REFERENCES Groups(group_id),
    admission_year  INTEGER NOT NULL
)

--Таблица оценок студентов
CREATE TABLE Grades (
    grade_id  SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES Students(student_id),
    lesson_id INTEGER REFERENCES Subjects(subject_id),
    grade  INTEGER NOT NULL
)

-- Заполнение значений таблиц

INSERT INTO universities ("university_id", "university_name") VALUES (1, 'КГПИ КемГУ');
INSERT INTO universities ("university_id", "university_name")  VALUES (2, 'СибГУ');
INSERT INTO universities ("university_id", "university_name")  VALUES (3, 'КемГу');

INSERT INTO groups ("group_id", "group_name", "university_name") VALUES (1, 'ММ-22', 1);
INSERT INTO groups ("group_id", "group_name", "university_name") VALUES (2, 'МОИС-22', 2);
INSERT INTO groups ("group_id", "group_name", "university_name") VALUES (3, 'ПМИб-22', 3);

INSERT INTO subjects ("subject_id", "subject_name") VALUES (1, 'Web-технологии');
INSERT INTO subjects ("subject_id", "subject_name")  VALUES (2, 'Дискретная математика');
INSERT INTO subjects ("subject_id", "subject_name")  VALUES (3, 'Философия');

INSERT INTO students ("student_id", "full_name", "birthdate", "group_name", "admission_year") VALUES (1, 'ИВанов И.И.', '2000-07-16', 1, 2022);
INSERT INTO students ("student_id", "full_name", "birthdate", "group_name", "admission_year") VALUES (2, 'Пеьров П.П.', '2001-10-21', 2, 2022);
INSERT INTO students ("student_id", "full_name", "birthdate", "group_name", "admission_year") VALUES (3, 'Сидоров С.С.', '2002-03-30', 3, 2022);

INSERT INTO grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (1, 1, 1, 5);
INSERT INTO grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (2, 2, 1, 4);
INSERT INTO grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (3, 3, 1, 3);
INSERT INTO grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (4, 1, 2, 3);
INSERT INTO grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (5, 2, 2, 4);
INSERT INTO grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (6, 3, 2, 4);
INSERT INTO grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (7, 1, 3, 4);
INSERT INTO grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (8, 2, 3, 4);
INSERT INTO grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (9, 3, 3, 5);