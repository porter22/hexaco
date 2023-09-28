--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO agzid;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    answer_type character varying NOT NULL,
    answer_text character varying,
    answer_choice_id character varying,
    answer_choice_label character varying,
    answer_number double precision,
    field_id character varying NOT NULL,
    form_response_id character varying NOT NULL
);


ALTER TABLE public.answers OWNER TO agzid;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_id_seq OWNER TO agzid;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: fields; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.fields (
    form_response_id character varying NOT NULL,
    field_type character varying NOT NULL,
    field_title character varying NOT NULL,
    field_nonunique_id character varying,
    composite_id character varying NOT NULL
);


ALTER TABLE public.fields OWNER TO agzid;

--
-- Name: form; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.form (
    id character varying(255) NOT NULL,
    title character varying(255)
);


ALTER TABLE public.form OWNER TO agzid;

--
-- Name: form_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.form_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.form_id_seq OWNER TO agzid;

--
-- Name: form_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.form_id_seq OWNED BY public.form.id;


--
-- Name: form_responses; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.form_responses (
    event_id character varying NOT NULL,
    form_id character varying NOT NULL,
    token character varying NOT NULL,
    submitted_at timestamp without time zone NOT NULL,
    user_id integer NOT NULL,
    observant_id integer NOT NULL
);


ALTER TABLE public.form_responses OWNER TO agzid;

--
-- Name: form_responses_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.form_responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.form_responses_id_seq OWNER TO agzid;

--
-- Name: form_responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.form_responses_id_seq OWNED BY public.form_responses.event_id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE public.groups OWNER TO agzid;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.groups_id_seq OWNER TO agzid;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;


--
-- Name: hexaco_mapping; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.hexaco_mapping (
    id integer NOT NULL,
    field_nonunique_id character varying NOT NULL,
    "Trait" character varying NOT NULL,
    "Facet" character varying NOT NULL,
    question_text character varying NOT NULL,
    question_number integer NOT NULL,
    "NRCode" character varying NOT NULL
);


ALTER TABLE public.hexaco_mapping OWNER TO agzid;

--
-- Name: hexaco_mapping_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.hexaco_mapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hexaco_mapping_id_seq OWNER TO agzid;

--
-- Name: hexaco_mapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.hexaco_mapping_id_seq OWNED BY public.hexaco_mapping.id;


--
-- Name: observers; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.observers (
    id integer NOT NULL,
    user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.observers OWNER TO agzid;

--
-- Name: observers_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.observers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.observers_id_seq OWNER TO agzid;

--
-- Name: observers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.observers_id_seq OWNED BY public.observers.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    question_text character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.questions OWNER TO agzid;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO agzid;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer,
    report_text character varying(255)
);


ALTER TABLE public.reports OWNER TO agzid;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_id_seq OWNER TO agzid;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: responses; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.responses (
    id integer NOT NULL,
    user_id integer NOT NULL,
    question_id integer NOT NULL,
    response_text character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.responses OWNER TO agzid;

--
-- Name: responses_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.responses_id_seq OWNER TO agzid;

--
-- Name: responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.responses_id_seq OWNED BY public.responses.id;


--
-- Name: scheduled_group_assessments; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.scheduled_group_assessments (
    id integer NOT NULL,
    assessment_category character varying NOT NULL,
    selected_assessment character varying NOT NULL,
    group_id integer,
    scheduled_timestamp timestamp without time zone NOT NULL
);


ALTER TABLE public.scheduled_group_assessments OWNER TO agzid;

--
-- Name: scheduled_group_assessments_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.scheduled_group_assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scheduled_group_assessments_id_seq OWNER TO agzid;

--
-- Name: scheduled_group_assessments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.scheduled_group_assessments_id_seq OWNED BY public.scheduled_group_assessments.id;


--
-- Name: scheduled_individual_assessments; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.scheduled_individual_assessments (
    id integer NOT NULL,
    assessment_category character varying NOT NULL,
    selected_assessment character varying NOT NULL,
    employee_id integer,
    observer_id integer,
    scheduled_timestamp timestamp without time zone NOT NULL
);


ALTER TABLE public.scheduled_individual_assessments OWNER TO agzid;

--
-- Name: scheduled_individual_assessments_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.scheduled_individual_assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scheduled_individual_assessments_id_seq OWNER TO agzid;

--
-- Name: scheduled_individual_assessments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.scheduled_individual_assessments_id_seq OWNED BY public.scheduled_individual_assessments.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: agzid
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    firstname character varying(255),
    lastname character varying(255),
    group_id integer
);


ALTER TABLE public.users OWNER TO agzid;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: agzid
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO agzid;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: agzid
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: form id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.form ALTER COLUMN id SET DEFAULT nextval('public.form_id_seq'::regclass);


--
-- Name: form_responses event_id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.form_responses ALTER COLUMN event_id SET DEFAULT nextval('public.form_responses_id_seq'::regclass);


--
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);


--
-- Name: hexaco_mapping id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.hexaco_mapping ALTER COLUMN id SET DEFAULT nextval('public.hexaco_mapping_id_seq'::regclass);


--
-- Name: observers id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.observers ALTER COLUMN id SET DEFAULT nextval('public.observers_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: responses id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.responses ALTER COLUMN id SET DEFAULT nextval('public.responses_id_seq'::regclass);


--
-- Name: scheduled_group_assessments id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.scheduled_group_assessments ALTER COLUMN id SET DEFAULT nextval('public.scheduled_group_assessments_id_seq'::regclass);


--
-- Name: scheduled_individual_assessments id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.scheduled_individual_assessments ALTER COLUMN id SET DEFAULT nextval('public.scheduled_individual_assessments_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.alembic_version (version_num) FROM stdin;
9b8ed176c56d
\.


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.answers (id, answer_type, answer_text, answer_choice_id, answer_choice_label, answer_number, field_id, form_response_id) FROM stdin;
6795	text	Аслан	\N	\N	\N	01H8SWCPSW1VDGGQRWYWAY8P7V:::zWhyrTBgOR9C	01H8SWCPSW1VDGGQRWYWAY8P7V
6796	text	Баслан	\N	\N	\N	01H8SWCPSW1VDGGQRWYWAY8P7V:::ObCCWNP6wSdP	01H8SWCPSW1VDGGQRWYWAY8P7V
6797	text	Паслан	\N	\N	\N	01H8SWCPSW1VDGGQRWYWAY8P7V:::rAQVeTozb7yl	01H8SWCPSW1VDGGQRWYWAY8P7V
6798	number	\N	\N	\N	3	01H8SWCPSW1VDGGQRWYWAY8P7V:::SYMLS2owCNRP	01H8SWCPSW1VDGGQRWYWAY8P7V
6799	number	\N	\N	\N	4	01H8SWCPSW1VDGGQRWYWAY8P7V:::eSIHAiPWp7f8	01H8SWCPSW1VDGGQRWYWAY8P7V
6800	number	\N	\N	\N	2	01H8SWCPSW1VDGGQRWYWAY8P7V:::TcIbg9gq29na	01H8SWCPSW1VDGGQRWYWAY8P7V
6801	number	\N	\N	\N	5	01H8SWCPSW1VDGGQRWYWAY8P7V:::7nzNUmPGtIoS	01H8SWCPSW1VDGGQRWYWAY8P7V
6802	number	\N	\N	\N	2	01H8SWCPSW1VDGGQRWYWAY8P7V:::S86Z17sVTc6O	01H8SWCPSW1VDGGQRWYWAY8P7V
6803	number	\N	\N	\N	4	01H8SWCPSW1VDGGQRWYWAY8P7V:::7SJP7UabLc2y	01H8SWCPSW1VDGGQRWYWAY8P7V
6804	number	\N	\N	\N	1	01H8SWCPSW1VDGGQRWYWAY8P7V:::SE6J1zyz5tYG	01H8SWCPSW1VDGGQRWYWAY8P7V
6805	number	\N	\N	\N	4	01H8SWCPSW1VDGGQRWYWAY8P7V:::hxZdBkIGsBZR	01H8SWCPSW1VDGGQRWYWAY8P7V
6806	number	\N	\N	\N	3	01H8SWCPSW1VDGGQRWYWAY8P7V:::hTVpkOFmOIWX	01H8SWCPSW1VDGGQRWYWAY8P7V
6807	number	\N	\N	\N	5	01H8SWCPSW1VDGGQRWYWAY8P7V:::jsRh6V670ul2	01H8SWCPSW1VDGGQRWYWAY8P7V
6808	number	\N	\N	\N	1	01H8SWCPSW1VDGGQRWYWAY8P7V:::YSK2X04IjBOz	01H8SWCPSW1VDGGQRWYWAY8P7V
6809	number	\N	\N	\N	4	01H8SWCPSW1VDGGQRWYWAY8P7V:::7eJeqWcEUbc5	01H8SWCPSW1VDGGQRWYWAY8P7V
6810	number	\N	\N	\N	2	01H8SWCPSW1VDGGQRWYWAY8P7V:::YSwooSfHV1yh	01H8SWCPSW1VDGGQRWYWAY8P7V
6811	number	\N	\N	\N	5	01H8SWCPSW1VDGGQRWYWAY8P7V:::710Y22HBmwM0	01H8SWCPSW1VDGGQRWYWAY8P7V
6812	number	\N	\N	\N	2	01H8SWCPSW1VDGGQRWYWAY8P7V:::fXVJuGSDrt58	01H8SWCPSW1VDGGQRWYWAY8P7V
6813	number	\N	\N	\N	4	01H8SWCPSW1VDGGQRWYWAY8P7V:::ehL61M1sWlYZ	01H8SWCPSW1VDGGQRWYWAY8P7V
6814	number	\N	\N	\N	3	01H8SWCPSW1VDGGQRWYWAY8P7V:::cj3e00WNfqn9	01H8SWCPSW1VDGGQRWYWAY8P7V
6815	number	\N	\N	\N	5	01H8SWCPSW1VDGGQRWYWAY8P7V:::e9kfL9Il6aLi	01H8SWCPSW1VDGGQRWYWAY8P7V
6816	number	\N	\N	\N	1	01H8SWCPSW1VDGGQRWYWAY8P7V:::deOb43mZlCM9	01H8SWCPSW1VDGGQRWYWAY8P7V
6817	number	\N	\N	\N	5	01H8SWCPSW1VDGGQRWYWAY8P7V:::f4GssClllVX6	01H8SWCPSW1VDGGQRWYWAY8P7V
6818	number	\N	\N	\N	4	01H8SWCPSW1VDGGQRWYWAY8P7V:::b28lNgJ3iHhl	01H8SWCPSW1VDGGQRWYWAY8P7V
6819	number	\N	\N	\N	4	01H8SWCPSW1VDGGQRWYWAY8P7V:::1UYFnELaymqz	01H8SWCPSW1VDGGQRWYWAY8P7V
6820	number	\N	\N	\N	5	01H8SWCPSW1VDGGQRWYWAY8P7V:::oSY5wmVDEKod	01H8SWCPSW1VDGGQRWYWAY8P7V
6821	number	\N	\N	\N	3	01H8SWCPSW1VDGGQRWYWAY8P7V:::7MfvxeyTdbG3	01H8SWCPSW1VDGGQRWYWAY8P7V
6822	text	ничего	\N	\N	\N	01H8SWCPSW1VDGGQRWYWAY8P7V:::1wgBVFjqHNu3	01H8SWCPSW1VDGGQRWYWAY8P7V
\.


--
-- Data for Name: fields; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.fields (form_response_id, field_type, field_title, field_nonunique_id, composite_id) FROM stdin;
01H8SWCPSW1VDGGQRWYWAY8P7V	short_text	Укажите свое имя и фамилию	zWhyrTBgOR9C	01H8SWCPSW1VDGGQRWYWAY8P7V:::zWhyrTBgOR9C
01H8SWCPSW1VDGGQRWYWAY8P7V	short_text	Укажите имя сотрудника	ObCCWNP6wSdP	01H8SWCPSW1VDGGQRWYWAY8P7V:::ObCCWNP6wSdP
01H8SWCPSW1VDGGQRWYWAY8P7V	short_text	Укажите фамилию сотрудника	rAQVeTozb7yl	01H8SWCPSW1VDGGQRWYWAY8P7V:::rAQVeTozb7yl
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она может долго смотреть на картину.	SYMLS2owCNRP	01H8SWCPSW1VDGGQRWYWAY8P7V:::SYMLS2owCNRP
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она удостоверяется, что все находится на своих местах.	eSIHAiPWp7f8	01H8SWCPSW1VDGGQRWYWAY8P7V:::eSIHAiPWp7f8
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она остается недружелюбным/недружелюбной к тому, кто был груб с ним/ней.	TcIbg9gq29na	01H8SWCPSW1VDGGQRWYWAY8P7V:::TcIbg9gq29na
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Людям не нравится разговаривать с ним/ней.	7nzNUmPGtIoS	01H8SWCPSW1VDGGQRWYWAY8P7V:::7nzNUmPGtIoS
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она боится боли.	S86Z17sVTc6O	01H8SWCPSW1VDGGQRWYWAY8P7V:::S86Z17sVTc6O
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Ему/Ей трудно врать.	7SJP7UabLc2y	01H8SWCPSW1VDGGQRWYWAY8P7V:::7SJP7UabLc2y
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она думает, что наука скучна.	SE6J1zyz5tYG	01H8SWCPSW1VDGGQRWYWAY8P7V:::SE6J1zyz5tYG
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она откладывает сложные задачи как можно дольше.	hxZdBkIGsBZR	01H8SWCPSW1VDGGQRWYWAY8P7V:::hxZdBkIGsBZR
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она часто высказывает критику.	hTVpkOFmOIWX	01H8SWCPSW1VDGGQRWYWAY8P7V:::hTVpkOFmOIWX
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она легко знакомится с незнакомцами.	jsRh6V670ul2	01H8SWCPSW1VDGGQRWYWAY8P7V:::jsRh6V670ul2
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она волнуется меньше других.	YSK2X04IjBOz	01H8SWCPSW1VDGGQRWYWAY8P7V:::YSK2X04IjBOz
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она хотел/хотела бы знать, как заработать много денег нечестным путем.	7eJeqWcEUbc5	01H8SWCPSW1VDGGQRWYWAY8P7V:::7eJeqWcEUbc5
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	У него/неё богатое воображение.	YSwooSfHV1yh	01H8SWCPSW1VDGGQRWYWAY8P7V:::YSwooSfHV1yh
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	В работе он/она предпочитает точность.	710Y22HBmwM0	01H8SWCPSW1VDGGQRWYWAY8P7V:::710Y22HBmwM0
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она склонен/склонна быстро соглашаться с другими.	fXVJuGSDrt58	01H8SWCPSW1VDGGQRWYWAY8P7V:::fXVJuGSDrt58
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Ему/Ей нравится общаться с другими.	ehL61M1sWlYZ	01H8SWCPSW1VDGGQRWYWAY8P7V:::ehL61M1sWlYZ
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она может легко преодолеть трудности самостоятельно.	cj3e00WNfqn9	01H8SWCPSW1VDGGQRWYWAY8P7V:::cj3e00WNfqn9
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она хочет быть знаменитым/знаменитой.	e9kfL9Il6aLi	01H8SWCPSW1VDGGQRWYWAY8P7V:::e9kfL9Il6aLi
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Ему/Ей нравятся люди со странными идеями.	deOb43mZlCM9	01H8SWCPSW1VDGGQRWYWAY8P7V:::deOb43mZlCM9
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она часто делает что-то не задумываясь.	f4GssClllVX6	01H8SWCPSW1VDGGQRWYWAY8P7V:::f4GssClllVX6
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Даже когда со ним/с ней плохо обращаются, он/она сохраняет спокойствие.	b28lNgJ3iHhl	01H8SWCPSW1VDGGQRWYWAY8P7V:::b28lNgJ3iHhl
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она редко бывает веселым/веселой.	1UYFnELaymqz	01H8SWCPSW1VDGGQRWYWAY8P7V:::1UYFnELaymqz
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она плачет во время грустных или романтических фильмов.	oSY5wmVDEKod	01H8SWCPSW1VDGGQRWYWAY8P7V:::oSY5wmVDEKod
01H8SWCPSW1VDGGQRWYWAY8P7V	opinion_scale	Он/Она считает, что он/она имеет право на особое отношение к себе.	7MfvxeyTdbG3	01H8SWCPSW1VDGGQRWYWAY8P7V:::7MfvxeyTdbG3
01H8SWCPSW1VDGGQRWYWAY8P7V	long_text	Есть ли у Вас какие-либо заключительные комментарии, которые Вы хотели бы высказать?	1wgBVFjqHNu3	01H8SWCPSW1VDGGQRWYWAY8P7V:::1wgBVFjqHNu3
\.


--
-- Data for Name: form; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.form (id, title) FROM stdin;
dHwfnWvK	Employee Evaluation Form [DEMO] (copy)
bkbkbk	This form does not exist in Typeform
\.


--
-- Data for Name: form_responses; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.form_responses (event_id, form_id, token, submitted_at, user_id, observant_id) FROM stdin;
01H8SWCPSW1VDGGQRWYWAY8P7V	dHwfnWvK	cr3fda74ytxccch4h5yq7uhcr3fdabvc	2023-08-26 21:35:52	12345	12
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.groups (id, name, created_at) FROM stdin;
1	Test Group	2023-07-19 01:46:01.656326
2	Test Group	2023-07-19 02:08:39.748836
3	Group 4	2023-07-19 02:46:51.939489
4	TestGroup	2023-09-01 14:51:02.327574
\.


--
-- Data for Name: hexaco_mapping; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.hexaco_mapping (id, field_nonunique_id, "Trait", "Facet", question_text, question_number, "NRCode") FROM stdin;
\.


--
-- Data for Name: observers; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.observers (id, user_id, email, created_at) FROM stdin;
1	2	observer1@example.com	2023-06-02 13:20:07.061159
2	2	observer2@example.com	2023-06-02 13:20:07.061159
3	3	observer3@example.com	2023-06-02 13:20:07.061159
4	1	observer@example.com	2023-06-02 16:11:14.552757
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.questions (id, question_text, created_at) FROM stdin;
1	Question 1	2023-06-02 13:20:07.061159
2	Question 2	2023-06-02 13:20:07.061159
3	Question 3	2023-06-02 13:20:07.061159
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.reports (id, created_at, user_id, report_text) FROM stdin;
1	2023-06-02 13:20:07.061159	\N	\N
2	2023-06-02 13:20:07.061159	\N	\N
\.


--
-- Data for Name: responses; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.responses (id, user_id, question_id, response_text, created_at) FROM stdin;
1	2	1	Answer 1	2023-06-02 13:20:07.061159
2	2	2	Answer 2	2023-06-02 13:20:07.061159
3	2	3	Answer 3	2023-06-02 13:20:07.061159
4	3	1	Answer 1	2023-06-02 13:20:07.061159
5	3	2	Answer 2	2023-06-02 13:20:07.061159
6	3	3	Answer 3	2023-06-02 13:20:07.061159
7	1	1	Answer 1	2023-06-02 16:03:01.050436
8	1	2	Answer 2	2023-06-02 16:03:01.050436
\.


--
-- Data for Name: scheduled_group_assessments; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.scheduled_group_assessments (id, assessment_category, selected_assessment, group_id, scheduled_timestamp) FROM stdin;
1	group	dHwfnWvK	3	2023-09-19 17:15:00.277
2	group	dHwfnWvK	1	2023-09-19 17:15:00.277
\.


--
-- Data for Name: scheduled_individual_assessments; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.scheduled_individual_assessments (id, assessment_category, selected_assessment, employee_id, observer_id, scheduled_timestamp) FROM stdin;
1	individual	dHwfnWvK	5	13	2023-09-19 17:15:00.277
2	individual	dHwfnWvK	2	5	2023-09-19 17:15:00.277
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: agzid
--

COPY public.users (id, username, email, password, role, created_at, firstname, lastname, group_id) FROM stdin;
1	hradmin	hradmin@example.com	hashedpassword	hradmin	2023-06-02 13:20:07.061159	\N	\N	\N
11	hradmin3	hradmin3@test.com	$2b$12$HWXodNMqnMhk.8md9BAFiOMzp60mc2tvlp39rDgjZVtcUBbaOz5/m	hradmin	2023-06-13 18:00:50.965044	\N	\N	\N
14	hradmin4	hradmin4@test.com	$2b$12$Bc0RaPce4eE1YbihETggh.j1Jx3.vJt1WP5FFbMPfb.MMqOhDsz9m	hradmin	2023-07-17 19:52:12.665096	\N	\N	\N
5	pemployee51	pemployee51@example.com	hashedpassword	pemployee	2023-06-02 13:51:42.321324	\N	\N	3
13	pemp5	pemp5@mail.com	$2b$12$kg2CUZfmk50jsSF.VPWAoeRs4VMytzcFJcAotecRPIQee.w4Q8IMi	pemployee	2023-06-13 19:09:07.397459	Jimmy	Robson	\N
12345	test12345	test5@gmail.com	$2b$12$YjtTJTXni78rPpKawvrTJupvaK0vRQoAnSze8v6HQsWFw5C1se1Q6	pemployee	2023-07-18 00:54:12.177953	\N	\N	\N
3	pemployee2	pemployee2@example.com	hashedpassword	pemployee	2023-06-02 13:20:07.061159	\N	\N	4
2	pemployee1	pemployee1@example.com	hashedpassword	pemployee	2023-06-02 13:20:07.061159	Anna	Barboza	4
12	pemp4	pemp4@mail.com	$2b$12$Dbv0DQ4K1p5k1AyAW1cQnOdIwOeoOPE.P7j9jedNrP8Zf6FaYlb7m	pemployee	2023-06-13 19:07:07.13296	Tommy	Scott	4
\.


--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.answers_id_seq', 6822, true);


--
-- Name: form_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.form_id_seq', 1, false);


--
-- Name: form_responses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.form_responses_id_seq', 26, true);


--
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.groups_id_seq', 4, true);


--
-- Name: hexaco_mapping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.hexaco_mapping_id_seq', 1, false);


--
-- Name: observers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.observers_id_seq', 4, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.questions_id_seq', 3, true);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.reports_id_seq', 2, true);


--
-- Name: responses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.responses_id_seq', 8, true);


--
-- Name: scheduled_group_assessments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.scheduled_group_assessments_id_seq', 2, true);


--
-- Name: scheduled_individual_assessments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.scheduled_individual_assessments_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: agzid
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: fields composite_id_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.fields
    ADD CONSTRAINT composite_id_pkey PRIMARY KEY (composite_id);


--
-- Name: form form_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.form
    ADD CONSTRAINT form_pkey PRIMARY KEY (id);


--
-- Name: form_responses form_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.form_responses
    ADD CONSTRAINT form_responses_pkey PRIMARY KEY (event_id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: hexaco_mapping hexaco_mapping_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.hexaco_mapping
    ADD CONSTRAINT hexaco_mapping_pkey PRIMARY KEY (id);


--
-- Name: observers observers_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.observers
    ADD CONSTRAINT observers_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: responses responses_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (id);


--
-- Name: scheduled_group_assessments scheduled_group_assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.scheduled_group_assessments
    ADD CONSTRAINT scheduled_group_assessments_pkey PRIMARY KEY (id);


--
-- Name: scheduled_individual_assessments scheduled_individual_assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.scheduled_individual_assessments
    ADD CONSTRAINT scheduled_individual_assessments_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_fields_field_nonunique_id; Type: INDEX; Schema: public; Owner: agzid
--

CREATE INDEX ix_fields_field_nonunique_id ON public.fields USING btree (field_nonunique_id);


--
-- Name: answers answers_field_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_field_id_fkey FOREIGN KEY (field_id) REFERENCES public.fields(composite_id);


--
-- Name: fields fields_form_response_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.fields
    ADD CONSTRAINT fields_form_response_id_fkey FOREIGN KEY (form_response_id) REFERENCES public.form_responses(event_id);


--
-- Name: form_responses form_responses_observant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.form_responses
    ADD CONSTRAINT form_responses_observant_id_fkey FOREIGN KEY (observant_id) REFERENCES public.users(id);


--
-- Name: form_responses form_responses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.form_responses
    ADD CONSTRAINT form_responses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: observers observers_pemployee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.observers
    ADD CONSTRAINT observers_pemployee_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: reports reports_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: responses responses_pemployee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_pemployee_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: responses responses_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: scheduled_group_assessments scheduled_group_assessments_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.scheduled_group_assessments
    ADD CONSTRAINT scheduled_group_assessments_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- Name: scheduled_group_assessments scheduled_group_assessments_selected_assessment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.scheduled_group_assessments
    ADD CONSTRAINT scheduled_group_assessments_selected_assessment_fkey FOREIGN KEY (selected_assessment) REFERENCES public.form(id);


--
-- Name: scheduled_individual_assessments scheduled_individual_assessments_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.scheduled_individual_assessments
    ADD CONSTRAINT scheduled_individual_assessments_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.users(id);


--
-- Name: scheduled_individual_assessments scheduled_individual_assessments_observer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.scheduled_individual_assessments
    ADD CONSTRAINT scheduled_individual_assessments_observer_id_fkey FOREIGN KEY (observer_id) REFERENCES public.users(id);


--
-- Name: scheduled_individual_assessments scheduled_individual_assessments_selected_assessment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.scheduled_individual_assessments
    ADD CONSTRAINT scheduled_individual_assessments_selected_assessment_fkey FOREIGN KEY (selected_assessment) REFERENCES public.form(id);


--
-- Name: users users_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: agzid
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- PostgreSQL database dump complete
--

