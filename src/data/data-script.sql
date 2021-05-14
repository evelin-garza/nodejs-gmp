-- Users
INSERT INTO users
  (login, password, age)
values('Katrina', '8s1P0Gb8UaRWoaK', 10);
INSERT INTO users
  (login, password, age)
values('Clark', 'ZUrXgVwKPHEoy9Z', 58);
INSERT INTO users
  (login, password, age)
values('Carolina', '7JDUKYYAZq6bRyY', 25);

-- Groups
INSERT INTO groups
  (id, name, permissions)
VALUES
  ('efa817b8-f6e3-48a3-bc5a-1458eec13885', 'Admin', '{READ,WRITE,DELETE,SHARE,UPLOAD_FILES}');

