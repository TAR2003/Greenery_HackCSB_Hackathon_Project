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

CREATE TABLE UserXPlant (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    plant_id INT NOT NULL,
    no_of_plants INT NOT NULL,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE,
    FOREIGN KEY (plant_id) REFERENCES PlantInfo(id) ON DELETE CASCADE
);


CREATE TABLE ForumQuestion (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    user_id INT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE
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
    time TIME NOT NULL,
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









