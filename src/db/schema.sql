pragma foreign_keys = on;

drop table if exists employees;
drop table if exists titles;


create table titles (
  id integer primary key autoincrement,
  name text not null unique
);

create table employees (
  id integer primary key autoincrement,
  username text unique not null,
  age integer not null check (age between 18 and 80),
  skills text not null,
  title_id integer not null,
  foreign key (title_id) references titles(id)
);

insert into titles (name) values
  ('Junior Developer'),
  ('Mid Developer'),
  ('Senior Developer'),
  ('Team Lead'),
  ('DevOps Engineer');

insert into employees (username, age, skills, title_id) VALUES
  ('biggetti', 24, 'JavaScript, React, CSS',  1),
  ('joe', 26, 'Java, Spring Boot, PostgreSQL', 2),
  ('gilfoyle', 26, 'Typescript, NestJS, PostgreSQL, AWS', 3),
  ('jared', 28, 'Docker, Kubernetes, AWS', 5),
  ('rick', 30, 'Python, Django, Team management', 4);
