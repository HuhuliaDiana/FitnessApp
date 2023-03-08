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
