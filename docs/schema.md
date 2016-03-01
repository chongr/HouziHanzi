# Schema Information

## characters
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
unicode_value       | string    | not null
pinyin              | string    | not null
translation         | string    | not null
HSK_lvl             | integer   | not null
lesson_num          | integer   | not null

## reviewed_characters_session
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
user_id             | integer   | not null, foreign key
char_id             | integer   | not null, foreign key
time_reviewed       | timestamp | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
current_lesson  | integer   | not null, default: 1
