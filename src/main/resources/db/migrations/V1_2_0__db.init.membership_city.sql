
create table membership_club(
id bigserial PRIMARY KEY NOT NULL,
membership_id bigint
);

create table membership_clubs(
club_id bigint,
membership_club_id bigint NOT NULL
);


create table city_club(
id bigserial PRIMARY KEY NOT NULL,
city_id bigint
);

create table city_clubs(
club_id bigint,
city_club_id bigint
);