CREATE TABLE tbl_login(
user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
username varchar(25) UNIQUE,
password varchar(15) NOT NULL,
user_type varchar(10) NOT NULL,
l_status varchar(10) NOT NULL
)

CREATE TABLE tbl_staff(
staff_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
s_phno numeric(10) UNIQUE,
user_id integer NOT NULL,
s_fname varchar(25) NOT NULL,
s_lname varchar(25) NOT NULL,
s_house varchar(25) NOT NULL,
s_street varchar(25) NOT NULL,
s_dist varchar(25) NOT NULL,
s_pin numeric(6) NOT NULL,
s_date date NOT NULL,
FOREIGN KEY (user_id) REFERENCES tbl_login (user_id)
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

CREATE TABLE tbl_category(
cat_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
cat_name varchar(50) NOT NULL,
cat_desc varchar(500) NOT NULL,
cat_price decimal(8,2) NOT NULL,
cat_status varchar(10) NOT NULL
)

CREATE TABLE tbl_card(
card_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
cust_id integer NOT NULL,
card_no numeric(16) NOT NULL,
card_name varchar(25) NOT NULL,
bank_name varchar(25) NOT NULL,
card_type varchar(15) NOT NULL,
exp_date varchar(25) NOT NULL,
card_status varchar(10) NOT NULL,
FOREIGN KEY (cust_id) REFERENCES tbl_customer (cust_id)
)

CREATE TABLE tbl_specmaster(
sm_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
staff_id integer NOT NULL,
FOREIGN KEY (staff_id) REFERENCES tbl_staff (staff_id)
)

CREATE TABLE tbl_specchild(
sc_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
sm_id integer NOT NULL,
cat_id integer NOT NULL,
sc_status varchar(10) NOT NULL,
FOREIGN KEY (sm_id) REFERENCES tbl_specmaster (sm_id),
FOREIGN KEY (cat_id) REFERENCES tbl_category (cat_id)
)

CREATE TABLE tbl_bookingmaster(
bmaster_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
cust_id integer NOT NULL,
tot_amt decimal(8,2) NOT NULL,
bm_date date NOT NULL,
bm_status varchar(15) NOT NULL,
FOREIGN KEY (cust_id) REFERENCES tbl_customer (cust_id)
)

CREATE TABLE tbl_bookingchild(
bchild_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
bmaster_id integer NOT NULL,
cat_id integer NOT NULL,
bc_name varchar(25) NOT NULL,
bc_house varchar(25) NOT NULL,
bc_street varchar(25) NOT NULL,
bc_dist varchar(25) NOT NULL,
bc_pin varchar(25) NOT NULL,
bc_time time NOT NULL,
bc_date date NOT NULL,
bc_hours integer NOT NULL,
FOREIGN KEY (bmaster_id) REFERENCES tbl_bookingmaster (bmaster_id),
FOREIGN KEY (cat_id) REFERENCES tbl_category (cat_id)
)

CREATE TABLE tbl_payment(
pay_id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
bmaster_id integer NOT NULL,
card_id integer NOT NULL,
pay_type varchar(15) NOT NULL,
pay_status varchar(15) NOT NULL,
pay_date date NOT NULL,
FOREIGN KEY (bmaster_id) REFERENCES tbl_bookingmaster (bmaster_id),
FOREIGN KEY (card_id) REFERENCES tbl_card (card_id)
)