CREATE SCHEMA lesson2

--Таблица студентов
CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    group_name INTEGER REFERENCES Groups(group_id),
    admission_year  INTEGER NOT NULL
)

--Таблица групп
CREATE TABLE Groups   (
    group_id  SERIAL PRIMARY KEY,
    group_name  VARCHAR(100) NOT NULL,
    university_name INTEGER REFERENCES University(university_id)
)

--Таблица вузов
CREATE TABLE Universities  (
    university_id  SERIAL PRIMARY KEY,
    university_name VARCHAR(100) NOT NULL
)

--Таблица предметов
CREATE TABLE Subjects  (
    subject_id  SERIAL PRIMARY KEY,
    subject_name  VARCHAR(50) NOT NULL
)

--Таблица оценок студентов
CREATE TABLE Grades (
    grade_id  SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES Students(student_id),
    lesson_id INTEGER REFERENCES Subjects(subject_id),
    grade  INTEGER NOT NULL
)

-- Заполнение значений таблиц

INSERT INTO lesson2.students ("student_id", "full_name", "birthdate", "group_name", "admission_year") VALUES (1, 'ИВанов И.И.', '2000-07-16', 1, 2022);
INSERT INTO lesson2.students ("student_id", "full_name", "birthdate", "group_name", "admission_year") VALUES (1, 'Пеьров П.П.', '2001-10-21', 2, 2022);
INSERT INTO lesson2.students ("student_id", "full_name", "birthdate", "group_name", "admission_year") VALUES (1, 'Сидоров С.С.', '2002-03-30', 3, 2022);

INSERT INTO lesson2.groups ("group_id", "group_name", "university_name") VALUES (1, 'ММ-22', 1);
INSERT INTO lesson2.groups ("group_id", "group_name", "university_name") VALUES (2, 'МОИС-22', 2);
INSERT INTO lesson2.groups ("group_id", "group_name", "university_name") VALUES (3, 'ПМИб-22', 3);

INSERT INTO lesson2.university ("university_id", "university_name") VALUES (1, 'КГПИ КемГУ');
INSERT INTO lesson2.university ("university_id", "university_name")  VALUES (2, 'СибГУ');
INSERT INTO lesson2.university ("university_id", "university_name")  VALUES (3, 'КемГу');

INSERT INTO lesson2.lessons ("subject_id", "subject_name") VALUES (1, 'Web-технологии');
INSERT INTO lesson2.lessons ("subject_id", "subject_name")  VALUES (2, 'Дискретная математика');
INSERT INTO lesson2.lessons ("subject_id", "subject_name")  VALUES (3, 'Философия');

INSERT INTO lesson2.grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (1, 1, 1, 5);
INSERT INTO lesson2.grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (2, 2, 1, 4);
INSERT INTO lesson2.grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (3, 3, 1, 3);
INSERT INTO lesson2.grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (4, 1, 2, 3);
INSERT INTO lesson2.grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (5, 2, 2, 4);
INSERT INTO lesson2.grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (6, 3, 2, 4);
INSERT INTO lesson2.grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (7, 1, 3, 4);
INSERT INTO lesson2.grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (8, 2, 3, 4);
INSERT INTO lesson2.grades ("grade_id", "student_id", "lesson_id", "grade") VALUES (9, 3, 3, 5);

