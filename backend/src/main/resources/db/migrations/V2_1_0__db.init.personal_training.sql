create table personal_training_type(
id bigserial PRIMARY KEY NOT NULL,
name character varying(255)
);

create table personal_training(
id bigserial PRIMARY KEY NOT NULL,
personal_training_type_id bigint,
sessions_number bigint,
price double precision,
no_days_validity bigint
);

create table personal_trainer(
id bigserial PRIMARY KEY NOT NULL,
name character varying(255)
);
create table trainer_club(
personal_trainer_id bigint,
club_id bigint
);

create table trainer_personal_training(
personal_trainer_id bigint,
personal_training_id bigint
);
create table user_personal_training(
id bigserial PRIMARY KEY NOT NULL,
user_id bigint,
personal_training_id bigint,
start_date date,
personal_trainer_id bigint,
no_sessions_left bigint

);
create table personal_training_session(
id bigserial PRIMARY KEY NOT NULL,
user_id bigint,
personal_trainer_id bigint,
session_date date,
start_session_time character varying(255),
end_session_time character varying(255)
)