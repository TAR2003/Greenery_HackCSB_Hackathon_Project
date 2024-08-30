SELECT * FROM USERINFO

UPDATE USERINFO SET IMAGE = '/user/masnoon.png' WHERE ID = 1

UPDATE USERINFO SET IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/330px-Tomato_je.jpg'
	where image like 'http%'

select * from commentxpost


CREATE TABLE ReactXPost (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    react VARCHAR(50) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE
);

	select * from reactxpost

insert into reactxpost (post_id,user_id, react) 
	values (4, 6, 'dislike' )

	select * from reactxharvest

select * from commentxharvest

		select * from plantinfo

	select * from harvest
update harvest set image= 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Agriculture_in_Volgograd_Oblast_002.JPG'

	select * from post

select * from chat

INSERT INTO commentxpost (user_id, post_id, TEXT, TIME) VALUES 
(6, 1, 'Nice post, thanks a lot for posting that ' , '2024-08-21 12:00:00'),
(6, 1, '222thanks a lot for posting that ' , '2024-08-21 12:00:00'),
(6, 1, 'What a  comment it is good' , '2024-08-21 12:00:00'),
(6, 1, 'Uradhura comment ' , '2024-08-21 12:00:00'),
(6, 1, 'What is going on here  ' , '2024-08-21 12:00:00'),
(6, 1, 'what is wrong with you ' , '2024-08-21 12:00:00')

	INSERT INTO commentxharvest (user_id, harvest_id, TEXT, TIME) VALUES 
(6, 1, 'It was a good harvest ' , '2024-08-21 12:00:00'),
(6, 1, 'two number harvest thanks a lot for posting that ' , '2024-08-21 12:00:00'),
(6, 1, 'What a  comment it is good harvest season time indeed' , '2024-08-21 12:00:00'),
(6, 1, 'Uradhura comment ' , '2024-08-21 12:00:00'),
(6, 1, 'another harvest comment ' , '2024-08-21 12:00:00'),
(6, 1, 'we have seen another harvest ' , '2024-08-21 12:00:00')

update post set 
	image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/450px-Mangos_-_single_and_halved.jpg' where id < 4

update post set 
	image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/330px-Tomato_je.jpg'
where id > 3 and id < 8

update post set 
	image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dragonfruit_Chiayi_market.jpg/330px-Dragonfruit_Chiayi_market.jpg'
where id >= 8

SELECT * FROM REACTXPOST WHERE POST_ID = 1 and user_id = 6
		
select count(*) from reactxpost where react = 'like'
		
select count(*) from reactxpost where react = 'dislike'

select react from reactxpost where post_id = 1 and user_id = 6

insert into reactxpost (post_id, user_id, react) values (6, 6, 'like')

		insert into reactxharvest (harvest_id, user_id, react) values (2, 6, 'like')

delete from reactxpost where post_id = 6 and user_id = 6

		delete from reactxharvest where harvest_id = 1 and user_id = 6

ALTER TABLE reactxpost ADD CONSTRAINT unique_post_user UNIQUE (post_id, user_id);


ALTER TABLE reactxharvest ADD CONSTRAINT unique_harvest_user UNIQUE (harvest_id, user_id);

ALTER TABLE reactxanswer ADD CONSTRAINT unique_answer_user UNIQUE (answer_id, user_id);

select * from reactxanswer

select * from forumanswer

	select * from forumquestion

insert into reactxanswer (answer_id, user_id, react) values(3,6, 'dislike')


select * from forumanswer



ALTER TABLE plantinfo
DROP COLUMN description;

select * from plantinfo

select id,name from plantinfo where name ilike 'Alo%'

delete from plantinfo where name = 'aloe vera'
	
CREATE TABLE plantjournals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES userinfo(id) ON DELETE CASCADE,
    plant_id INTEGER REFERENCES plantinfo(id) ON DELETE CASCADE,
    journalname VARCHAR(500) NOT NULL,
	TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE JOURNALMESSAGES (
	ID SERIAL PRIMARY KEY,
	JOURNAL_ID INTEGER REFERENCES PLANTJOURNALS(ID) ON DELETE CASCADE,
	MESSAGE VARCHAR(500),
	TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

create table reminders (
	id serial primary key,
	message varchar(500),
	journal_id integer references plantjournals(id) on delete cascade,
	time timestamp default current_timestamp
	
)

SELECT *
FROM reminders r
WHERE r.time::date = current_timestamp::date
  AND r.journal_id = ANY (
    SELECT p.id
    FROM plantjournals p
    WHERE p.user_id = 6
  );



select * from plantjournals

select * from journalmessages


select * from reminders

insert into plantjournals (user_id, journalname)values
	(1,'new Alow vera plant'),
(1,'another mint plant'),
(1,'island pomgrenates')

update plantjournals set time = current_timestamp where id = 1

insert into journalmessages (journal_id, message)
values (1, 'Starting a journal about that ')
, (1, 'whats wrong now')
, (2, 'a new start for journal no 2'),
(2, 'another one 2 ')
, (3, 'statrtngin  three'),
(3, 'again 3'),
(3, 'again 3 two num ber')

insert into reminders (message, journal_id, time) values
('new time 3 t',6, '08-30-2024')

delete from reminders where time::date  < current_timestamp::date

select current_timestamp::date from reminders where time::date = current_timestamp::date

select * from plantjournals where user_id = 1

ALTER TABLE plantjournals
DROP COLUMN plant_id;

	
select * from journalmessages where journal_id = 1 order by time desc

select * from reminders where time::date = current_timestamp::date and
journal_id = any(select id from plantjournals where user_id = 1)

update post set text = 'sample Post caption for community posts' where id > 15

update commentxpost set text = 'sample comment for community post'
update commentxharvest set text = 'sample coment for harvest post'

select * from post
select * from harvest
select * from commentxpost
select * from commentxharvest


