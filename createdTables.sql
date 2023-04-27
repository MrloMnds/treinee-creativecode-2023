CREATE TABLE contacts(
  id INT auto_increment NOT NULL,
  name VARCHAR(45) NOT NULL,
  address VARCHAR(150) NOT NULL,
  CONSTRAINT contacts_pk PRIMARY KEY (id),
  CONSTRAINT contacts_un_name UNIQUE KEY (name)
);

CREATE TABLE phonenumbers(
  id INT auto_increment NOT NULL,
  number VARCHAR(25) NOT NULL,
  contact_id INT NOT NULL,
  CONSTRAINT phonenumbers_pk PRIMARY KEY (id),
  CONSTRAINT phonenumbers_un_number UNIQUE KEY (number),
  CONSTRAINT phonenumbers_fk FOREIGN KEY (contact_id)
  REFERENCES contacts(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);