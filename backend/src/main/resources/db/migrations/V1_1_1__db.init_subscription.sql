create table subscription(
id bigserial PRIMARY KEY NOT NULL,
subscription_period_id bigint,
price double precision,
membership_id bigint
);
create table subscription_period(
id bigserial PRIMARY KEY NOT NULL,
name character varying(50) UNIQUE
);

create table training_class_type(
id bigserial PRIMARY KEY NOT NULL,
name character varying(50) UNIQUE
);

create table training_class_hour(
id bigserial PRIMARY KEY NOT NULL,
training_class_type_id bigint,
class_name character varying(50) UNIQUE,
timer_duration bigint
);

create table training_class(
id bigserial PRIMARY KEY NOT NULL,
class_date timestamp without time zone,
trainer_name character varying(50),
club_id bigint,
training_class_hour_id bigint,
spots_available bigint
);

create table user_subscription(
id bigserial PRIMARY KEY NOT NULL,
user_id bigint,
subscription_id bigint,
start_date date,
end_date date,
start_freeze date,
end_freeze date,
club_id bigint
);
create table booked_class(
user_id bigint,
training_class_id bigint
);