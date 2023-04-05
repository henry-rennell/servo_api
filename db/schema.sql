create database servo_api;

create table if not exists service_stations (
   id serial primary key,
   name text not null,
   owner text not null,
   address text not null,
   suburb text not null,
   state text not null,
   lat  real not null,
   long real not null
);



insert into service_stations (owner, address, suburb, state, lat, long) values ('BP', '3701 Murray Valley Highway', 'Cobram', 'Victoria', -35.9211754139999, 145.638305815);

CREATE EXTENSION IF NOT EXISTS cube; CREATE EXTENSION IF NOT EXISTS earthdistance;