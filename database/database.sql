create database games;

use games;

create table games(
    id int(11) not null auto_increment primary key,
    title varchar(150),
    description varchar(255),
    image varchar(200),
    created_at timestamp default current_timestamp
);