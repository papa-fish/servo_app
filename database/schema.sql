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
    long DOUBLE PRECISION NOT NULL,
    logo_url TEXT
);

UPDATE servos SET logo_url='./images/caltex.png' WHERE owner ='Caltex';
UPDATE servos SET logo_url='./images/7-eleven.png' WHERE owner ='7-Eleven Pty Ltd';
UPDATE servos SET logo_url='./images/bp.png' WHERE owner ='BP';
UPDATE servos SET logo_url='./images/shell.png' WHERE owner ='Shell';
UPDATE servos SET logo_url='./images/united.png' WHERE owner ='United';
UPDATE servos SET logo_url='./images/pin.png' WHERE logo_url IS NULL;