create table personal_training_type(
id bigserial PRIMARY KEY NOT NULL,
name character varying(255)
);

create table personal_training(
id bigserial PRIMARY KEY NOT NULL,
personal_training_type_id bigint,
sessions_number bigint,
price double precision
);

create table personal_trainer(
id bigserial PRIMARY KEY NOT NULL,
name character varying(255),
personal_training_type_id bigint
);
create table trainer_club(
personal_trainer_id bigint,
club_id bigint
);