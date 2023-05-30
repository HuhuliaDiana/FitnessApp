create table role(
id bigserial PRIMARY KEY NOT NULL,
name character varying(20) UNIQUE
);

create table participant(
id bigserial PRIMARY KEY NOT NULL,
firstname character varying(255),
lastname character varying(255),
email character varying(255) UNIQUE,
password character varying(120),
phone character varying(120),
role_id bigint,
CONSTRAINT fk_participant_role
      FOREIGN KEY(role_id)
	  REFERENCES role(id)
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
city_id bigint,
CONSTRAINT fk_club_membership
      FOREIGN KEY(membership_id)
	  REFERENCES membership(id),
CONSTRAINT fk_club_city
      FOREIGN KEY(city_id)
	  REFERENCES city(id)
);

create table subscription_period(
id bigserial PRIMARY KEY NOT NULL,
name character varying(50) UNIQUE
);

create table subscription(
id bigserial PRIMARY KEY NOT NULL,
subscription_period_id bigint,
price double precision,
membership_id bigint,
CONSTRAINT fk_subscription_membership
      FOREIGN KEY(membership_id)
	  REFERENCES membership(id),
CONSTRAINT fk_subscription_period
      FOREIGN KEY(subscription_period_id)
	  REFERENCES subscription_period(id)
);

create table training_class_type(
id bigserial PRIMARY KEY NOT NULL,
name character varying(50) UNIQUE
);

create table training_class_hour(
id bigserial PRIMARY KEY NOT NULL,
training_class_type_id bigint,
class_name character varying(50) UNIQUE,
timer_duration bigint,
CONSTRAINT fk_training_class_hour_type
      FOREIGN KEY(training_class_type_id)
	  REFERENCES training_class_type(id)
);

create table training_class(
id bigserial PRIMARY KEY NOT NULL,
class_date timestamp without time zone,
trainer_name character varying(50),
club_id bigint,
training_class_hour_id bigint,
spots_available bigint,
CONSTRAINT fk_training_class_club
      FOREIGN KEY(club_id)
	  REFERENCES club(id),
CONSTRAINT fk_training_class_hour
      FOREIGN KEY(training_class_hour_id)
	  REFERENCES training_class_hour(id)
);

create table user_subscription(
id bigserial PRIMARY KEY NOT NULL,
user_id bigint,
CONSTRAINT fk_user_subscription_user
      FOREIGN KEY(user_id)
	  REFERENCES participant(id),
subscription_id bigint,
CONSTRAINT fk_user_subscription_subscription
      FOREIGN KEY(subscription_id)
	  REFERENCES subscription(id),
start_date date,
end_date date,
start_freeze date,
end_freeze date,
club_id bigint,
CONSTRAINT fk_user_subscription_club
      FOREIGN KEY(club_id)
	  REFERENCES club(id),
no_days_left_to_freeze bigint
);

create table booked_class(
user_id bigint,
training_class_id bigint,
CONSTRAINT fk_booked_class_user
      FOREIGN KEY(user_id)
	  REFERENCES participant(id),
CONSTRAINT fk_booked_class_training_class
      FOREIGN KEY(training_class_id)
	  REFERENCES training_class(id)

);

create table personal_training_type(
id bigserial PRIMARY KEY NOT NULL,
name character varying(255)
);

create table personal_training(
id bigserial PRIMARY KEY NOT NULL,
personal_training_type_id bigint,
sessions_number bigint,
price double precision,
no_days_validity bigint,
CONSTRAINT fk_personal_training_type
      FOREIGN KEY(personal_training_type_id)
	  REFERENCES personal_training_type(id)
);

create table personal_trainer(
id bigserial PRIMARY KEY NOT NULL,
name character varying(255)
);

create table trainer_club(
personal_trainer_id bigint,
CONSTRAINT fk_trainer_club_personal_trainer
      FOREIGN KEY(personal_trainer_id)
	  REFERENCES personal_trainer(id),
club_id bigint,
CONSTRAINT fk_trainer_club_club
      FOREIGN KEY(club_id)
	  REFERENCES club(id)
);

create table trainer_personal_training(
personal_trainer_id bigint,
CONSTRAINT fk_trainer_personal_training_trainer
      FOREIGN KEY(personal_trainer_id)
	  REFERENCES personal_trainer(id),
personal_training_id bigint,
CONSTRAINT fk_trainer_personal_training
      FOREIGN KEY(personal_training_id)
	  REFERENCES personal_training(id)
);
create table user_personal_training(
id bigserial PRIMARY KEY NOT NULL,
user_id bigint,
personal_training_id bigint,
start_date date,
personal_trainer_id bigint,
no_sessions_left bigint,
CONSTRAINT fk_user_personal_training
      FOREIGN KEY(personal_training_id)
	  REFERENCES personal_training(id),
CONSTRAINT fk_user_personal_training_personal_trainer
      FOREIGN KEY(personal_trainer_id)
	  REFERENCES personal_trainer(id),
CONSTRAINT fk_user_personal_training_user
      FOREIGN KEY(user_id)
	  REFERENCES participant(id)

);
create table personal_training_session(
id bigserial PRIMARY KEY NOT NULL,
user_personal_training_id bigint,
CONSTRAINT fk_personal_training_session_user_personal_training
      FOREIGN KEY(user_personal_training_id)
	  REFERENCES user_personal_training(id),
session_date date,
start_session_time character varying(255),
end_session_time character varying(255)
)
