CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;

CREATE TABLE public.pointtable
(
    id SERIAL PRIMARY KEY,
    point_name character varying(64),
    description character varying(100),
    geom geography
)

INSERT INTO pointtable (point_name, description, geom)
VALUES ('TestPolygon',  'A polygon feature', 
		'POINT(41.660316 1.432044)')

--prova1
CREATE TABLE pointstb (
    id SERIAL PRIMARY KEY, 
    name varchar(40), 
    description varchar(255),
    geom geometry
    );

INSERT INTO pointstb (name, description, geom) VALUES 
  ('postgresprova', 'bondiaaaaaa', 'POINT(41.00 1.00)')

UPDATE pointstb SET name = 'testfinal', description = 'testdescript'
WHERE name = 'testorigen';

SELECT * FROM pointstb WHERE name = testfinal;

DELETE FROM pointstb WHERE name=ebre;