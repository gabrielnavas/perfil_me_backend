-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.3-beta1
-- PostgreSQL version: 13.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: postgres | type: DATABASE --
-- DROP DATABASE IF EXISTS postgres;
CREATE DATABASE postgres
	ENCODING = 'UTF8'
	LC_COLLATE = 'en_US.utf8'
	LC_CTYPE = 'en_US.utf8'
	TABLESPACE = pg_default
	OWNER = postgres;
-- ddl-end --
COMMENT ON DATABASE postgres IS E'default administrative connection database';
-- ddl-end --


-- object: perfilme | type: SCHEMA --
-- DROP SCHEMA IF EXISTS perfilme CASCADE;
CREATE SCHEMA perfilme;
-- ddl-end --
ALTER SCHEMA perfilme OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,perfilme;
-- ddl-end --

-- object: public.user_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.user_id_seq CASCADE;
CREATE SEQUENCE public.user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.user_id_seq OWNER TO postgres;
-- ddl-end --

-- object: perfilme."user" | type: TABLE --
-- DROP TABLE IF EXISTS perfilme."user" CASCADE;
CREATE TABLE perfilme."user" (
	id integer NOT NULL DEFAULT nextval('public.user_id_seq'::regclass),
	name character varying(80) NOT NULL,
	description character varying(255),
	photo_path character varying(500),
	password character varying(100) NOT NULL,
	email character varying(80) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE perfilme."user" OWNER TO postgres;
-- ddl-end --

-- object: public.links_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.links_id_seq CASCADE;
CREATE SEQUENCE public.links_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.links_id_seq OWNER TO postgres;
-- ddl-end --

-- object: perfilme.links | type: TABLE --
-- DROP TABLE IF EXISTS perfilme.links CASCADE;
CREATE TABLE perfilme.links (
	id integer NOT NULL DEFAULT nextval('public.links_id_seq'::regclass),
	custom_name character varying NOT NULL,
	code_type_link integer NOT NULL,
	id_user integer NOT NULL,
	CONSTRAINT links_pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE perfilme.links OWNER TO postgres;
-- ddl-end --

-- object: public.type_link_code_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.type_link_code_seq CASCADE;
CREATE SEQUENCE public.type_link_code_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.type_link_code_seq OWNER TO postgres;
-- ddl-end --

-- object: perfilme.type_link | type: TABLE --
-- DROP TABLE IF EXISTS perfilme.type_link CASCADE;
CREATE TABLE perfilme.type_link (
	code integer NOT NULL DEFAULT nextval('public.type_link_code_seq'::regclass),
	name character varying NOT NULL,
	link character varying NOT NULL,
	CONSTRAINT type_link_pk PRIMARY KEY (code)

);
-- ddl-end --
ALTER TABLE perfilme.type_link OWNER TO postgres;
-- ddl-end --

-- object: perfilme.authentication_token | type: TABLE --
-- DROP TABLE IF EXISTS perfilme.authentication_token CASCADE;
CREATE TABLE perfilme.authentication_token (
	id serial NOT NULL,
	token varchar NOT NULL,
	id_user integer NOT NULL,
	CONSTRAINT authentication_token_pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE perfilme.authentication_token OWNER TO postgres;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE perfilme.authentication_token DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE perfilme.authentication_token ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES perfilme."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: type_link_fk | type: CONSTRAINT --
-- ALTER TABLE perfilme.links DROP CONSTRAINT IF EXISTS type_link_fk CASCADE;
ALTER TABLE perfilme.links ADD CONSTRAINT type_link_fk FOREIGN KEY (code_type_link)
REFERENCES perfilme.type_link (code) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE perfilme.links DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE perfilme.links ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES perfilme."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: "grant_CU_eb94f049ac" | type: PERMISSION --
GRANT CREATE,USAGE
   ON SCHEMA public
   TO postgres;
-- ddl-end --

-- object: "grant_CU_cd8e46e7b6" | type: PERMISSION --
GRANT CREATE,USAGE
   ON SCHEMA public
   TO PUBLIC;
-- ddl-end --


