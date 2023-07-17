CREATE DATABASE servo_api;

CREATE TABLE servos (
    id SERIAL PRIMARY KEY,
    featuretype TEXT NOT NULL,
    description TEXT NOT NULL,
    class TEXT NOT NULL,
    fid INTEGER,
    name TEXT NOT NULL,
    operationalstatus TEXT NOT NULL,
    owner TEXT NOT NULL,
    industryid INTEGER,
    address TEXT NOT NULL,
    suburb TEXT NOT NULL,
    state TEXT NOT NULL,
    spatialconfidence INTEGER,
    revised INTEGER,
    comment TEXT,
    lat DOUBLE PRECISION NOT NULL,
    long DOUBLE PRECISION NOT NULL
);


