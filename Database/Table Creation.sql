CREATE TABLE UserInfo(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    image TEXT,
    location VARCHAR(100),
    text TEXT
);

CREATE TABLE CompanyInfo(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    image TEXT,
    text TEXT
);

CREATE TABLE PlantInfo(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image TEXT,
    description TEXT
);

CREATE TABLE Chat (
	id SERIAL PRIMARY KEY,
	sender INT NOT NULL,
	receiver INT NOT NULL,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
)

CREATE TABLE UserXPlant (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    plant_id INT NOT NULL,
    no_of_plants INT NOT NULL,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, --it stores the time when an user planted the tree
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (plant_id) REFERENCES PlantInfo(id) ON DELETE CASCADE
);


CREATE TABLE ForumQuestion (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    user_id INT NOT NULL,
	plant_id INT,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
	FOREIGN KEY (plant_id) REFERENCES PlantInfo(id) ON DELETE CASCADE
);

CREATE TABLE ForumAnswer (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    text TEXT NOT NULL,
    user_id INT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES ForumQuestion(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE
);

CREATE TABLE ReactXAnswer (
    id SERIAL PRIMARY KEY,
    answer_id INT NOT NULL,
    user_id INT NOT NULL,
    react VARCHAR(50) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (answer_id) REFERENCES ForumAnswer(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE
);

CREATE TABLE Harvest (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    plant_id INT NOT NULL,
    image TEXT,
    text TEXT,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (plant_id) REFERENCES PlantInfo(id) ON DELETE CASCADE
);

CREATE TABLE ReactXHarvest (
    id SERIAL PRIMARY KEY,
    harvest_id INT NOT NULL,
    user_id INT NOT NULL,
    react VARCHAR(50) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (harvest_id) REFERENCES Harvest(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE
);

CREATE TABLE CommentXHarvest (
    id SERIAL PRIMARY KEY,
    harvest_id INT NOT NULL,
    text TEXT NOT NULL,
    user_id INT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (harvest_id) REFERENCES Harvest(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE
);

CREATE TABLE Post (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    plant_id INT NOT NULL,
    text TEXT NOT NULL,
    image TEXT,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    advice_or_plantation VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (plant_id) REFERENCES PlantInfo(id) ON DELETE CASCADE
);

CREATE TABLE ReactXPost (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    react VARCHAR(50) NOT NULL,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
);

CREATE TABLE CommentXPost (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    text TEXT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
);

CREATE TABLE ReactXComment (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    react VARCHAR(50) NOT NULL,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES CommentXPost(id) ON DELETE CASCADE
);

CREATE TABLE Notification (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    text TEXT NOT NULL,
    status VARCHAR(10) CHECK (status IN ('read', 'unread')) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
);

CREATE TABLE Product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    text TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE UserXProduct (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    no_of_same_product INT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE
);


CREATE TABLE CompanyXProduct (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    product_id INT NOT NULL,
    no_of_stock INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES CompanyInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE
);

CREATE TABLE ProductReview (
	id SERIAL PRIMARY KEY,
	product_id INT NOT NULL,
	user_id INT NOT NULL,
	rating INT NOT NULL,
	text TEXT,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE
);

insert into UserInfo (name, email, password, image, location, text) values ('Worthington Loudiane', 'wloudiane0@miibeian.gov.cn', 'tQ5@62EceE9sE2uh', 'http://dummyimage.com/164x100.png/ff4444/ffffff', 'Imotski', 'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
insert into UserInfo (name, email, password, image, location, text) values ('Allyn Hause', 'ahause1@weibo.com', 'pE9$Cn)f9og', 'http://dummyimage.com/108x100.png/5fa2dd/ffffff', 'Almeria', 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.');
insert into UserInfo (name, email, password, image, location, text) values ('Kora Meldrum', 'kmeldrum2@arstechnica.com', 'nM5`H%2l(RDE', 'http://dummyimage.com/218x100.png/dddddd/000000', 'Mekon', 'In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.');
insert into UserInfo (name, email, password, image, location, text) values ('Maisey Pendergrast', 'mpendergrast3@topsy.com', 'dX5%Sjv&Hi,(aJ', 'http://dummyimage.com/240x100.png/cc0000/ffffff', 'Genova', 'Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.');
insert into UserInfo (name, email, password, image, location, text) values ('Vina Dadge', 'vdadge4@arizona.edu', 'mL3*{}b+CSAGp<8#', 'http://dummyimage.com/227x100.png/cc0000/ffffff', 'Tiaodeng', 'In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.');


INSERT INTO PlantInfo (name, image, description)
VALUES 
('Aloe Vera', 'http://example.com/aloe-vera.jpg', 'Aloe Vera is a succulent plant species of the genus Aloe. Known for its medicinal properties.'),
('Basil', 'http://example.com/basil.jpg', 'Basil is a culinary herb of the mint family, used in many dishes.'),
('Mint', 'http://example.com/mint.jpg', 'Mint is a refreshing herb, often used in beverages and desserts.'),
('Rosemary', 'http://example.com/rosemary.jpg', 'Rosemary is an aromatic herb with needle-like leaves, used for seasoning.'),
('Thyme', 'http://example.com/thyme.jpg', 'Thyme is a herb with a strong flavor, often used in Mediterranean cooking.'),
('Lavender', 'http://example.com/lavender.jpg', 'Lavender is known for its fragrant flowers and is often used in aromatherapy.');


INSERT INTO UserXPlant (user_id, plant_id, no_of_plants)
VALUES
(1, 1, 5),
(1, 2, 3),
(2, 1, 2),
(2, 3, 1),
(3, 2, 4),
(3, 4, 7),
(4, 3, 3),
(4, 5, 6),
(5, 4, 2),
(5, 5, 8);

-- Insert dummy data into the Post table
INSERT INTO Post (user_id, plant_id, text, image, advice_or_plantation)
VALUES 
(1, 1, 'Tomato plants are thriving this season!', 'https://example.com/images/post1.jpg', 'plantation'),
(1, 2, 'Basil is growing well, any tips for pruning?', 'https://example.com/images/post2.jpg', 'advice'),
(2, 3, 'Pumpkin patch is looking great for Halloween!', 'https://example.com/images/post3.jpg', 'plantation'),
(2, 4, 'Corn stalks are reaching new heights!', 'https://example.com/images/post4.jpg', 'plantation'),
(3, 5, 'Blueberry bushes are loaded with berries this year.', 'https://example.com/images/post5.jpg', 'plantation'),
(3, 1, 'Carrots are growing nicely, how to know when to harvest?', 'https://example.com/images/post6.jpg', 'advice'),
(4, 2, 'Strawberries are ripening fast, any advice on picking?', 'https://example.com/images/post7.jpg', 'advice'),
(4, 1, 'Second batch of tomatoes planted, looking good!', 'https://example.com/images/post8.jpg', 'plantation'),
(5, 2, 'Basil harvest was great, what to do with the surplus?', 'https://example.com/images/post9.jpg', 'advice'),
(5, 3, 'Pumpkins are ready for harvest!', 'https://example.com/images/post10.jpg', 'plantation'),
(4, 4, 'Corn is ready to be picked, any recipes?', 'https://example.com/images/post11.jpg', 'advice'),
(3, 5, 'Blueberries are sweet and juicy, best season yet.', 'https://example.com/images/post12.jpg', 'plantation'),
(2, 2, 'Carrots are almost ready, looking forward to the harvest.', 'https://example.com/images/post13.jpg', 'plantation'),
(1, 3, 'Strawberries are abundant, need storage tips.', 'https://example.com/images/post14.jpg', 'advice');



INSERT INTO Harvest (user_id, plant_id, image, text )
VALUES (1, 1, 'http://example.com/harvest1.jpg', 'Harvested some fresh aloe vera.');

INSERT INTO Harvest (user_id, plant_id, image, text)
VALUES (1, 2, 'http://example.com/harvest2.jpg', 'Collected mint leaves for tea.');

INSERT INTO Harvest (user_id, plant_id, image, text)
VALUES (2, 1, 'http://example.com/harvest3.jpg', 'Gathered some aloe vera for skincare.');

INSERT INTO Harvest (user_id, plant_id, image, text)
VALUES (2, 3, 'http://example.com/harvest4.jpg', 'Picked some fresh basil for cooking.');

INSERT INTO Harvest (user_id, plant_id, image, text)
VALUES (3, 2, 'http://example.com/harvest5.jpg', 'Mint leaves are perfect for refreshing drinks.');

INSERT INTO Harvest (user_id, plant_id, image, text)
VALUES (3, 3, 'http://example.com/harvest6.jpg', 'Basil harvested for pasta sauce.');

INSERT INTO ForumQuestion (text, user_id, plant_id)
VALUES
    ('What is the best soil for growing tomatoes?', 1, 1),
    ('How often should I water my succulents?', 2, 2),
    ('What are the benefits of using organic fertilizer?', 3, NULL),
    ('How do I prevent pests from attacking my roses?', 4, 3),
    ('What is the ideal temperature for growing orchids?', 5, 4),
    ('Can I grow herbs indoors?', 1, 5),
    ('How do I prune my bonsai tree?', 2, 1),
    ('What are the best companion plants for corn?', 3, 2),
    ('How do I transplant seedlings?', 4, NULL),
    ('What are the common diseases affecting apple trees?', 5, 3);

INSERT INTO ForumAnswer (question_id, text, user_id)
VALUES
    (1, 'You should use loamy soil for tomatoes as it provides good drainage and nutrients.', 2),
    (1, 'I have had success with a mix of compost and garden soil.', 3),
    (2, 'Water your succulents once a week during summer and once every two weeks in winter.', 1),
    (2, 'It depends on the type of succulent, but generally once every two weeks.', 4),
    (3, 'Organic fertilizers improve soil structure and provide slow-release nutrients.', 5),
    (4, 'Use neem oil or insecticidal soap to keep pests away from your roses.', 3),
    (5, 'Orchids prefer temperatures between 60-80°F (15-27°C).', 2),
    (6, 'Yes, you can grow herbs indoors as long as they get enough light.', 4),
    (6, 'Place your herbs near a sunny window or use grow lights.', 1),
    (7, 'Prune your bonsai tree in early spring before new growth starts.', 5),
    (8, 'Corn grows well with beans, squash, and cucumbers.', 2),
    (9, 'Transplant seedlings when they have at least two sets of true leaves.', 3),
    (10, 'Common diseases include apple scab, powdery mildew, and fire blight.', 4),
    (10, 'Ensure good air circulation and use fungicides to prevent diseases.', 1);


-- Assuming you have the following data in UserInfo and PlantInfo tables for foreign key references:
-- UserInfo table:
-- id | name 
-- 1  | Alice 
-- 2  | Bob 
-- 3


SELECT * FROM UserInfo;

SELECT * FROM Harvest;

SELECT * FROM Post;

SELECT * FROM UserXPlant;

SELECT * FROM ForumQuestion;

SELECT * FROM ForumAnswer;

-- ALTER TABLE ForumQuestion
-- ADD COLUMN plant_id INT,
-- ADD FOREIGN KEY (plant_id) REFERENCES PlantInfo(id) ON DELETE CASCADE;



DROP TABLE ProductReview;
DROP TABLE CompanyXProduct;
DROP TABLE UserXProduct;
DROP TABLE Product;
DROP TABLE Notification;
DROP TABLE ReactXComment;
DROP TABLE CommentXPost;
DROP TABLE ReactXPost;
DROP TABLE Post;
DROP TABLE CommentXHarvest;
DROP TABLE ReactXHarvest;
DROP TABLE Harvest;
DROP TABLE ReactXAnswer;
DROP TABLE ForumAnswer;
DROP TABLE ForumQuestion;
DROP TABLE UserXPlant;
DROP TABLE PlantInfo;
DROP TABLE CompanyInfo;
DROP TABLE UserInfo;









