create table participant(
id bigserial PRIMARY KEY NOT NULL,
firstname character varying(255),
lastname character varying(255),
email character varying(255) UNIQUE,
password character varying(120),
phone character varying(120) UNIQUE
);

create table role(
id bigserial PRIMARY KEY NOT NULL,
name character varying(20) UNIQUE
);

create table user_role(
role_id bigint,
user_id bigint NOT NULL
);
create table membership(
id bigserial PRIMARY KEY NOT NULL,
name character varying(20) UNIQUE
);
create table city(
id bigserial PRIMARY KEY NOT NULL,
name character varying(20) UNIQUE
);

create table club(
id bigserial PRIMARY KEY NOT NULL,
name character varying(255),
address character varying(255),
phone character varying(255),
membership_id bigint,
city_id bigint
);

create table club_role(
id bigserial PRIMARY KEY NOT NULL,
club_id bigint
);

create table club_roles(
role_id bigint,
club_role_id bigint NOT NULL
);

create table club_roles_user(
user_id bigint NOT NULL,
club_role_id bigint NOT NULL
);

create table club_user(
user_id bigint NOT NULL,
club_id bigint NOT NULL
);

create table user_roles(
role_id bigint,
user_id bigint NOT NULL
);
