drop database if exists ban_linh_kien;
create database ban_linh_kien;
use ban_linh_kien;

create table app_user (
id bigint primary key auto_increment,
user_name varchar(255),
full_name varchar(255),
email varchar(255),
address varchar(255),
image varchar(255),
phone varchar(255),
`password` varchar(255),
flag_deleted bit default 1,
flag_online bit default 1
);

create table app_role (
id bigint primary key auto_increment,
name_role varchar(255),
flag_deleted bit default 1
);

create table user_role(
id bigint primary key auto_increment,
app_user_id bigint not null,
app_role_id bigint not null,
foreign key(app_user_id) references app_user(id),
foreign key(app_role_id) references app_role(id)
);

create table type_product(
id_type bigint primary key auto_increment,
name_type varchar(255)
);

create table product(
id_product bigint primary key auto_increment,
code_product varchar(255),
name_product varchar(255),
quantity int,
price float,
`description` varchar(255),
flag_deleted bit default 1,
id_type bigint not null,
foreign key(id_type) references type_product(id_type)
);

create table image(
id bigint primary key auto_increment,
image_path longtext,
flag_deleted bit default 1,
id_product bigint not null,
foreign key(id_product) references product(id_product)
);

create table orders(
id bigint primary key auto_increment,
code_orders varchar(255),
date_time varchar(255),
flag_deleted bit default 1,
app_user_id bigint not null,
foreign key(app_user_id) references app_user(id)
);

create table orders_detail(
id bigint primary key auto_increment,
price float,
quantity int,
flag_deleted bit default 1,
id_order bigint not null,
id_product bigint not null,
foreign key(id_order) references orders(id),
foreign key(id_product) references product(id_product)
);

create table cart_detail(
id bigint auto_increment primary key,
quantity int,
app_user_id bigint not null,
id_product bigint not null,
foreign key(app_user_id) references app_user(id),
foreign key(id_product) references product(id_product)
);
