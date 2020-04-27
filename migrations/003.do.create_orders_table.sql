CREATE TABLE orders (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    orderType TEXT NOT NULL,
    address TEXT NOT NULL,
    mobileNumber TEXT NOT NULL,
    orderComplete BOOLEAN DEFAULT FALSE NOT NULL,
    time TIMESTAMP,
    dateCreated TIMESTAMP DEFAULT now() NOT NULL,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);