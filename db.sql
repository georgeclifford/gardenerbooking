CREATE TABLE tbl_login(
user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
username varchar(25) UNIQUE,
password varchar(15) NOT NULL,
user_type varchar(10) NOT NULL,
l_status varchar(10) NOT NULL
)

CREATE TABLE tbl_customer(
cust_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
c_phno numeric(10) UNIQUE,
user_id integer NOT NULL,
c_fname varchar(25) NOT NULL,
c_lname varchar(25) NOT NULL,
c_house varchar(25) NOT NULL,
c_street varchar(25) NOT NULL,
c_dist varchar(25) NOT NULL,
c_pin numeric(6) NOT NULL,
c_date date NOT NULL,
FOREIGN KEY (user_id) REFERENCES tbl_login (user_id)
)