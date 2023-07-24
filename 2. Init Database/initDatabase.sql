--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Debian 13.3-1.pgdg100+1)
-- Dumped by pg_dump version 13.3 (Debian 13.3-1.pgdg100+1)

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
-- Name: ExerciseMuscleGroups; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."ExerciseMuscleGroups" (
    "Id" uuid NOT NULL,
    "ExerciseId" uuid NOT NULL,
    "MuscleGroupRole" integer NOT NULL,
    "Created" timestamp with time zone DEFAULT now() NOT NULL,
    "Updated" timestamp with time zone DEFAULT now() NOT NULL,
    "IsDeleted" boolean NOT NULL,
    "MuscleGroupId" uuid
);


ALTER TABLE public."ExerciseMuscleGroups" OWNER TO ppauser;

--
-- Name: ExerciseUsersData; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."ExerciseUsersData" (
    "Id" uuid NOT NULL,
    "UserId" uuid NOT NULL,
    "ExerciseId" uuid NOT NULL,
    "RawStimulusMagnitude" integer NOT NULL,
    "FatigueMagnitude" integer NOT NULL,
    "StimulusToFatigueRatio" double precision NOT NULL,
    "Created" timestamp with time zone NOT NULL,
    "Updated" timestamp with time zone NOT NULL,
    "IsDeleted" boolean NOT NULL
);


ALTER TABLE public."ExerciseUsersData" OWNER TO ppauser;

--
-- Name: Exercises; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."Exercises" (
    "Id" uuid NOT NULL,
    "Name" character varying(100) NOT NULL,
    "RawStimulusMagnitude" integer NOT NULL,
    "FatigueMagnitude" integer NOT NULL,
    "UserId" uuid NOT NULL,
    "IsPublic" boolean NOT NULL,
    "Created" timestamp with time zone DEFAULT now() NOT NULL,
    "Updated" timestamp with time zone DEFAULT now() NOT NULL,
    "IsDeleted" boolean NOT NULL,
    "StimulusToFatigueRatio" double precision GENERATED ALWAYS AS (((("RawStimulusMagnitude" + 1))::numeric / (("FatigueMagnitude" + 1))::numeric)) STORED,
    "Type" integer DEFAULT 0 NOT NULL,
    "Likes" integer DEFAULT 0 NOT NULL,
    "Rates" integer DEFAULT 0 NOT NULL,
    "Rating" double precision DEFAULT 0.0 NOT NULL,
    "Description" text,
    "YoutubeLink" text,
    "TargetMuscleGroupId" uuid,
    CONSTRAINT "CK_FatigueMagnitude" CHECK ((("FatigueMagnitude" > '-1'::integer) AND ("FatigueMagnitude" < 10))),
    CONSTRAINT "CK_RawStimulusMagnitude" CHECK ((("RawStimulusMagnitude" > '-1'::integer) AND ("RawStimulusMagnitude" < 10)))
);


ALTER TABLE public."Exercises" OWNER TO ppauser;

--
-- Name: MuscleGroupUsersData; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."MuscleGroupUsersData" (
    "Id" uuid NOT NULL,
    "UserId" uuid NOT NULL,
    "MuscleGroupId" uuid NOT NULL,
    "MaintenanceVolume" integer NOT NULL,
    "MinimumEffectiveVolume" integer NOT NULL,
    "MaximumRecoverableVolume" integer NOT NULL,
    "Created" timestamp with time zone NOT NULL,
    "Updated" timestamp with time zone NOT NULL,
    "IsDeleted" boolean NOT NULL
);


ALTER TABLE public."MuscleGroupUsersData" OWNER TO ppauser;

--
-- Name: MuscleGroups; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."MuscleGroups" (
    "Id" uuid NOT NULL,
    "MaintenanceVolume" integer NOT NULL,
    "MinimumEffectiveVolume" integer NOT NULL,
    "MaximumRecoverableVolume" integer NOT NULL,
    "Created" timestamp with time zone DEFAULT now() NOT NULL,
    "Updated" timestamp with time zone DEFAULT now() NOT NULL,
    "IsDeleted" boolean NOT NULL,
    "AverageRecoveryTime" integer DEFAULT 1 NOT NULL,
    "MaximumRecoverableVolumeMultiplicator" integer DEFAULT 5 NOT NULL,
    "Type" integer DEFAULT 0 NOT NULL,
    CONSTRAINT "CK_AverageRecoveryTime" CHECK ((("AverageRecoveryTime" > 0) AND ("AverageRecoveryTime" < 10))),
    CONSTRAINT "CK_MaintenanceVolume" CHECK ((("MaintenanceVolume" > '-1'::integer) AND ("MaintenanceVolume" < 100))),
    CONSTRAINT "CK_MaximumRecoverableVolume" CHECK ((("MaximumRecoverableVolume" > '-1'::integer) AND ("MaximumRecoverableVolume" < 100))),
    CONSTRAINT "CK_MaximumRecoverableVolumeMultiplicator" CHECK ((("MaximumRecoverableVolumeMultiplicator" > '-1'::integer) AND ("MaximumRecoverableVolumeMultiplicator" < 100))),
    CONSTRAINT "CK_MinimumEffectiveVolume" CHECK ((("MinimumEffectiveVolume" > '-1'::integer) AND ("MinimumEffectiveVolume" < 100)))
);


ALTER TABLE public."MuscleGroups" OWNER TO ppauser;

--
-- Name: TrainingPrograms; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."TrainingPrograms" (
    "Id" uuid NOT NULL,
    "Name" character varying(100) DEFAULT ''::character varying NOT NULL,
    "UserId" uuid NOT NULL,
    "IsPublic" boolean NOT NULL,
    "Created" timestamp with time zone DEFAULT now() NOT NULL,
    "Updated" timestamp with time zone DEFAULT now() NOT NULL,
    "IsDeleted" boolean NOT NULL,
    "Likes" integer DEFAULT 0 NOT NULL,
    "Rating" double precision DEFAULT 0.0 NOT NULL,
    "TrainingLevel" integer DEFAULT 0 NOT NULL,
    "Type" integer DEFAULT 0 NOT NULL,
    "Description" text,
    "NumberOfSessions" integer DEFAULT 0 NOT NULL,
    "Rates" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TrainingPrograms" OWNER TO ppauser;

--
-- Name: TrainingSessions; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."TrainingSessions" (
    "Id" uuid NOT NULL,
    "Week" integer NOT NULL,
    "DayOfWeek" integer NOT NULL,
    "RepsInReserve" integer NOT NULL,
    "TrainingProgramId" uuid,
    "Created" timestamp with time zone DEFAULT now() NOT NULL,
    "Updated" timestamp with time zone DEFAULT now() NOT NULL,
    "IsDeleted" boolean NOT NULL,
    CONSTRAINT "CK_RepsInReserve" CHECK ((("RepsInReserve" > '-1'::integer) AND ("RepsInReserve" < 10))),
    CONSTRAINT "CK_Week" CHECK ((("Week" > 0) AND ("Week" < 100)))
);


ALTER TABLE public."TrainingSessions" OWNER TO ppauser;

--
-- Name: TrainingSessionsExercises; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."TrainingSessionsExercises" (
    "Id" uuid NOT NULL,
    "TrainingSessionId" uuid NOT NULL,
    "ExerciseId" uuid,
    "Sets" integer NOT NULL,
    "Created" timestamp with time zone DEFAULT now() NOT NULL,
    "Updated" timestamp with time zone DEFAULT now() NOT NULL,
    "IsDeleted" boolean NOT NULL,
    "Order" integer DEFAULT 0 NOT NULL,
    CONSTRAINT "CK_Sets" CHECK ((("Sets" > 0) AND ("Sets" < 100)))
);


ALTER TABLE public."TrainingSessionsExercises" OWNER TO ppauser;

--
-- Name: UserExerciseLikes; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."UserExerciseLikes" (
    "Id" uuid NOT NULL,
    "UserId" uuid NOT NULL,
    "ExerciseId" uuid NOT NULL,
    "Created" timestamp with time zone NOT NULL,
    "Updated" timestamp with time zone NOT NULL,
    "IsDeleted" boolean NOT NULL
);


ALTER TABLE public."UserExerciseLikes" OWNER TO ppauser;

--
-- Name: UserExerciseRatings; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."UserExerciseRatings" (
    "Id" uuid NOT NULL,
    "UserId" uuid NOT NULL,
    "ExerciseId" uuid NOT NULL,
    "Rating" integer NOT NULL,
    "Created" timestamp with time zone NOT NULL,
    "Updated" timestamp with time zone NOT NULL,
    "IsDeleted" boolean NOT NULL
);


ALTER TABLE public."UserExerciseRatings" OWNER TO ppauser;

--
-- Name: UserTrainingProgramLikes; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."UserTrainingProgramLikes" (
    "Id" uuid NOT NULL,
    "UserId" uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    "TrainingProgramId" uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    "Created" timestamp with time zone NOT NULL,
    "Updated" timestamp with time zone NOT NULL,
    "IsDeleted" boolean NOT NULL
);


ALTER TABLE public."UserTrainingProgramLikes" OWNER TO ppauser;

--
-- Name: UserTrainingProgramRatings; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."UserTrainingProgramRatings" (
    "Id" uuid NOT NULL,
    "UserId" uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    "TrainingProgramId" uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    "Rating" integer NOT NULL,
    "Created" timestamp with time zone NOT NULL,
    "Updated" timestamp with time zone NOT NULL,
    "IsDeleted" boolean NOT NULL
);


ALTER TABLE public."UserTrainingProgramRatings" OWNER TO ppauser;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."Users" (
    "Id" uuid NOT NULL,
    "Username" text,
    "Email" text,
    "Created" timestamp with time zone NOT NULL,
    "Updated" timestamp with time zone NOT NULL,
    "IsDeleted" boolean NOT NULL,
    "FirebaseId" text
);


ALTER TABLE public."Users" OWNER TO ppauser;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: ppauser
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO ppauser;

--
-- Data for Name: ExerciseMuscleGroups; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."ExerciseMuscleGroups" ("Id", "ExerciseId", "MuscleGroupRole", "Created", "Updated", "IsDeleted", "MuscleGroupId") FROM stdin;
188104fa-e5da-4553-809c-1c922d1e1a91	ffd30cac-c390-4eea-8a59-c319c0c1ce76	3	2023-06-27 09:37:52.797814+00	2023-06-27 09:37:52.797814+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
73678d42-d01b-44b2-b85c-2f4b97044f83	ffd30cac-c390-4eea-8a59-c319c0c1ce76	3	2023-06-27 09:37:52.797814+00	2023-06-27 09:37:52.797814+00	f	049cd6ef-9667-4f46-b4c1-51093e7e64a5
a6af2a1d-c660-482b-a0b4-453227d2f790	ffd30cac-c390-4eea-8a59-c319c0c1ce76	3	2023-06-27 09:37:52.797814+00	2023-06-27 09:37:52.797814+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
e9a39646-018b-4428-b9e3-442bafda0851	ffd30cac-c390-4eea-8a59-c319c0c1ce76	2	2023-06-27 09:37:52.797814+00	2023-06-27 09:37:52.797814+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
eb9edeb8-3216-4268-8787-e1ba1d499331	ffd30cac-c390-4eea-8a59-c319c0c1ce76	1	2023-06-27 09:37:52.797814+00	2023-06-27 09:37:52.797814+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
0341c66c-578d-4801-b9cb-7b8389b08d3b	742f057b-c905-4d1c-952e-9702a6ed5ddd	1	2023-06-27 10:21:08.453027+00	2023-06-27 10:21:08.453027+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
76cdd818-8e81-4236-bc1c-7308bc27b200	742f057b-c905-4d1c-952e-9702a6ed5ddd	3	2023-06-27 10:21:08.453027+00	2023-06-27 10:21:08.453027+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
7f4ef8e2-df9b-419c-999c-527349081c00	742f057b-c905-4d1c-952e-9702a6ed5ddd	2	2023-06-27 10:21:08.453027+00	2023-06-27 10:21:08.453027+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
d499466b-dbd1-4ccc-a06c-d1f042365cc4	742f057b-c905-4d1c-952e-9702a6ed5ddd	3	2023-06-27 10:21:08.453027+00	2023-06-27 10:21:08.453027+00	f	049cd6ef-9667-4f46-b4c1-51093e7e64a5
e11ae73a-67b4-4906-8386-aeff7dc27678	742f057b-c905-4d1c-952e-9702a6ed5ddd	3	2023-06-27 10:21:08.453027+00	2023-06-27 10:21:08.453027+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
1eae6dbd-5f47-4e15-9982-f84a8bb73403	4cdb9633-0d0c-485f-a6aa-e014a137ba1a	3	2023-06-27 10:22:40.479171+00	2023-06-27 10:22:40.479171+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
33dc36dd-ed6e-4088-92ff-bc2f4c4ea73a	4cdb9633-0d0c-485f-a6aa-e014a137ba1a	2	2023-06-27 10:22:40.479171+00	2023-06-27 10:22:40.479171+00	f	049cd6ef-9667-4f46-b4c1-51093e7e64a5
9641a7a0-4e27-4be6-9325-3b076f9b8d7a	4cdb9633-0d0c-485f-a6aa-e014a137ba1a	3	2023-06-27 10:22:40.479171+00	2023-06-27 10:22:40.479171+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
b628e91b-e3ca-426a-8e60-68ee616290c6	4cdb9633-0d0c-485f-a6aa-e014a137ba1a	1	2023-06-27 10:22:40.479171+00	2023-06-27 10:22:40.479171+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
088e0a3d-b784-46e1-a861-c8675df65743	02aa4ad6-c4c9-4d13-a3de-37a3ccbef966	3	2023-06-27 10:25:01.088909+00	2023-06-27 10:25:01.088909+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
104d965e-3ebd-4fce-a968-cdf1c65b575e	02aa4ad6-c4c9-4d13-a3de-37a3ccbef966	1	2023-06-27 10:25:01.088909+00	2023-06-27 10:25:01.088909+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
da34f1a6-ee0a-4382-a40b-e74899e28e34	02aa4ad6-c4c9-4d13-a3de-37a3ccbef966	3	2023-06-27 10:25:01.088909+00	2023-06-27 10:25:01.088909+00	f	049cd6ef-9667-4f46-b4c1-51093e7e64a5
ec9db584-71df-491b-9253-25b8a5d7e54b	02aa4ad6-c4c9-4d13-a3de-37a3ccbef966	2	2023-06-27 10:25:01.088909+00	2023-06-27 10:25:01.088909+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
114e3993-1124-496f-9beb-e6a89acbfb3f	3ab7d8bd-fd8e-4c79-be17-d609cdc1aba4	3	2023-06-27 10:30:24.598457+00	2023-06-27 10:30:24.598457+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
49df0e23-7325-4fc4-a8d6-d9d28ce5f6e1	3ab7d8bd-fd8e-4c79-be17-d609cdc1aba4	1	2023-06-27 10:30:24.598457+00	2023-06-27 10:30:24.598457+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
88c7a0fc-6788-4e81-9709-5fddec700249	3ab7d8bd-fd8e-4c79-be17-d609cdc1aba4	3	2023-06-27 10:30:24.598457+00	2023-06-27 10:30:24.598457+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
fcca608d-0ea5-45c9-a5d4-aed258bdf042	79cab181-084b-4238-91dc-357b5995fafe	1	2023-06-27 10:35:42.708426+00	2023-06-27 10:35:42.708426+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
bc72c044-30cd-4bcb-be44-45ef66f51c49	c3d5428f-7599-4bcc-980a-adb6a8d1c51c	1	2023-06-27 10:37:37.296231+00	2023-06-27 10:37:37.296231+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
354e2cf6-d263-454b-b0b3-86d3a7d1f85f	71bf343f-1406-4499-ae28-3b3a4076c7f4	1	2023-06-27 10:40:34.854353+00	2023-06-27 10:40:34.854353+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
03c9f19a-a8c1-491c-a9c0-14df1e40cd73	09f9470e-a9b1-4ed7-8359-906e6ef82438	3	2023-06-27 10:42:21.511967+00	2023-06-27 10:42:21.511967+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
799c8d33-77b0-4b90-974b-84a52f36f400	09f9470e-a9b1-4ed7-8359-906e6ef82438	3	2023-06-27 10:42:21.511967+00	2023-06-27 10:42:21.511967+00	f	1cd1596a-e07b-43f9-8470-c30000bceb88
8dea893b-adc0-4c43-a5ac-0df0e53906df	09f9470e-a9b1-4ed7-8359-906e6ef82438	3	2023-06-27 10:42:21.511967+00	2023-06-27 10:42:21.511967+00	f	7b690688-728b-482b-9a91-ae400352a30f
90821586-5266-40b7-91e6-0e0430b32009	09f9470e-a9b1-4ed7-8359-906e6ef82438	2	2023-06-27 10:42:21.511967+00	2023-06-27 10:42:21.511967+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
aa9e1e49-1d61-4829-a369-127c5c52df7a	09f9470e-a9b1-4ed7-8359-906e6ef82438	2	2023-06-27 10:42:21.511967+00	2023-06-27 10:42:21.511967+00	f	049cd6ef-9667-4f46-b4c1-51093e7e64a5
d5af94f5-fc82-46dd-a34b-b612f0326a66	09f9470e-a9b1-4ed7-8359-906e6ef82438	1	2023-06-27 10:42:21.511967+00	2023-06-27 10:42:21.511967+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
f9e56eb2-80d2-4bae-a2fa-c9e90bcb3f31	09f9470e-a9b1-4ed7-8359-906e6ef82438	3	2023-06-27 10:42:21.511967+00	2023-06-27 10:42:21.511967+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
0ecd60cd-4a9c-4510-a974-4a72e6fc2692	7b9f80c2-426d-40d2-b8a7-6e46bac154a2	3	2023-06-27 10:42:33.635794+00	2023-06-27 10:42:33.635794+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
28350ed4-7303-4018-87c5-7bc5efbddb51	7b9f80c2-426d-40d2-b8a7-6e46bac154a2	2	2023-06-27 10:42:33.635794+00	2023-06-27 10:42:33.635794+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
5e1fef33-0873-43d9-968f-b42b46c82083	7b9f80c2-426d-40d2-b8a7-6e46bac154a2	3	2023-06-27 10:42:33.635794+00	2023-06-27 10:42:33.635794+00	f	1cd1596a-e07b-43f9-8470-c30000bceb88
7f3b1b74-77af-4781-9230-fe3de74b883a	7b9f80c2-426d-40d2-b8a7-6e46bac154a2	1	2023-06-27 10:42:33.635794+00	2023-06-27 10:42:33.635794+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
9a930adc-5b04-4b8d-9a2d-d5b74ed2bae1	7b9f80c2-426d-40d2-b8a7-6e46bac154a2	2	2023-06-27 10:42:33.635794+00	2023-06-27 10:42:33.635794+00	f	049cd6ef-9667-4f46-b4c1-51093e7e64a5
1b0a7260-fb5b-4a96-8732-0171fc3970a6	abd794f3-63ca-4138-9f4e-35e35c693beb	2	2023-06-27 10:42:43.714629+00	2023-06-27 10:42:43.714629+00	f	049cd6ef-9667-4f46-b4c1-51093e7e64a5
33c12e0e-db69-45bc-b480-01a56d3599c8	abd794f3-63ca-4138-9f4e-35e35c693beb	3	2023-06-27 10:42:43.714629+00	2023-06-27 10:42:43.714629+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
4e7f065d-3342-4bc8-9a80-dd26ee64d1be	abd794f3-63ca-4138-9f4e-35e35c693beb	1	2023-06-27 10:42:43.714629+00	2023-06-27 10:42:43.714629+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
a83c90ae-e7ca-4f8b-a1cf-814f17d4bca3	abd794f3-63ca-4138-9f4e-35e35c693beb	3	2023-06-27 10:42:43.714629+00	2023-06-27 10:42:43.714629+00	f	1cd1596a-e07b-43f9-8470-c30000bceb88
c169e247-0448-4105-9b98-f3297ebc69d3	abd794f3-63ca-4138-9f4e-35e35c693beb	2	2023-06-27 10:42:43.714629+00	2023-06-27 10:42:43.714629+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
f8c35de1-6dbd-4d5d-90a4-5d3beb65280a	abd794f3-63ca-4138-9f4e-35e35c693beb	3	2023-06-27 10:42:43.714629+00	2023-06-27 10:42:43.714629+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
383e7d7f-3f0d-4370-a63f-fabb6824d38c	bc82a0aa-ddeb-42ba-9cc9-76f1ae11c322	3	2023-06-27 10:42:52.131298+00	2023-06-27 10:42:52.131298+00	f	1cd1596a-e07b-43f9-8470-c30000bceb88
632a9d23-cf0d-42d7-8e05-9f203848fb84	bc82a0aa-ddeb-42ba-9cc9-76f1ae11c322	1	2023-06-27 10:42:52.131298+00	2023-06-27 10:42:52.131298+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
991fcb57-2825-45a6-a90f-82508a45f434	bc82a0aa-ddeb-42ba-9cc9-76f1ae11c322	2	2023-06-27 10:42:52.131298+00	2023-06-27 10:42:52.131298+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
b2737063-fcff-42d6-894e-bc6c290c204b	bc82a0aa-ddeb-42ba-9cc9-76f1ae11c322	3	2023-06-27 10:42:52.131298+00	2023-06-27 10:42:52.131298+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
ce7e7271-d49e-4591-8028-234ae0d885c5	bc82a0aa-ddeb-42ba-9cc9-76f1ae11c322	2	2023-06-27 10:42:52.131298+00	2023-06-27 10:42:52.131298+00	f	049cd6ef-9667-4f46-b4c1-51093e7e64a5
f3120703-4703-4445-8d3f-afe524d9c36f	bc82a0aa-ddeb-42ba-9cc9-76f1ae11c322	3	2023-06-27 10:42:52.131298+00	2023-06-27 10:42:52.131298+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
1e6552b6-142d-4514-acd9-397f54bbcdb1	fa120d1d-177d-4deb-ae1e-69ffcb111dda	2	2023-06-27 10:43:01.272688+00	2023-06-27 10:43:01.272688+00	f	049cd6ef-9667-4f46-b4c1-51093e7e64a5
74bf9cb2-1391-46a0-80ac-ec9b6241b86b	fa120d1d-177d-4deb-ae1e-69ffcb111dda	3	2023-06-27 10:43:01.272688+00	2023-06-27 10:43:01.272688+00	f	1cd1596a-e07b-43f9-8470-c30000bceb88
965f84f4-72c1-4c34-aeb8-8dde62c0715b	fa120d1d-177d-4deb-ae1e-69ffcb111dda	2	2023-06-27 10:43:01.272688+00	2023-06-27 10:43:01.272688+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
afbd3857-0640-4d1c-8bd7-75dffdb82195	fa120d1d-177d-4deb-ae1e-69ffcb111dda	3	2023-06-27 10:43:01.272688+00	2023-06-27 10:43:01.272688+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
bc0887c4-6304-4462-9951-38bfe9c74916	fa120d1d-177d-4deb-ae1e-69ffcb111dda	3	2023-06-27 10:43:01.272688+00	2023-06-27 10:43:01.272688+00	f	6396413c-3a2e-41ed-8866-d11f5ff75c9e
c32b9d11-7aef-4d7b-bbbd-a30f22a3682b	fa120d1d-177d-4deb-ae1e-69ffcb111dda	1	2023-06-27 10:43:01.272688+00	2023-06-27 10:43:01.272688+00	f	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
ddb2c43e-c86b-40f6-8d65-b9c7d6c5b811	fa120d1d-177d-4deb-ae1e-69ffcb111dda	3	2023-06-27 10:43:01.272688+00	2023-06-27 10:43:01.272688+00	f	7b690688-728b-482b-9a91-ae400352a30f
f2571f43-1ebb-4577-ac30-c625a10277df	fa120d1d-177d-4deb-ae1e-69ffcb111dda	3	2023-06-27 10:43:01.272688+00	2023-06-27 10:43:01.272688+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
2fed0e35-a127-48bf-bbae-b0b1f3693450	be80d47c-8de3-46f6-9ae3-b9d8961536bd	2	2023-06-27 10:45:42.678622+00	2023-06-27 10:45:42.678622+00	f	f79c2cbb-e972-4fe5-be61-61bb372a82cb
cc9e3914-350e-4ade-b8c1-82dd78abb296	be80d47c-8de3-46f6-9ae3-b9d8961536bd	3	2023-06-27 10:45:42.678622+00	2023-06-27 10:45:42.678622+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
f2d38f45-67ba-43ec-afe5-825dbc67f287	be80d47c-8de3-46f6-9ae3-b9d8961536bd	1	2023-06-27 10:45:42.678622+00	2023-06-27 10:45:42.678622+00	f	1cd1596a-e07b-43f9-8470-c30000bceb88
fc9375ba-c029-4696-a21c-af064b1c55f6	be80d47c-8de3-46f6-9ae3-b9d8961536bd	3	2023-06-27 10:45:42.678622+00	2023-06-27 10:45:42.678622+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
40bcdd03-3e03-4fe6-b48a-f38257cd0001	3686fc70-3a4c-4b4a-b8ac-afac219ca15e	1	2023-06-27 10:47:33.643739+00	2023-06-27 10:47:33.643739+00	f	1cd1596a-e07b-43f9-8470-c30000bceb88
763a6a12-f49a-48ac-8859-c63e54cbd400	3686fc70-3a4c-4b4a-b8ac-afac219ca15e	3	2023-06-27 10:47:33.643739+00	2023-06-27 10:47:33.643739+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
8b85b633-ff99-440c-a262-5057f90dc12f	3686fc70-3a4c-4b4a-b8ac-afac219ca15e	3	2023-06-27 10:47:33.643739+00	2023-06-27 10:47:33.643739+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
c49ef4a4-1c5c-468c-a657-b8ef4eb915c9	3686fc70-3a4c-4b4a-b8ac-afac219ca15e	2	2023-06-27 10:47:33.643739+00	2023-06-27 10:47:33.643739+00	f	f79c2cbb-e972-4fe5-be61-61bb372a82cb
baf31e8e-3cc6-42cc-b61d-d1449b1614e2	27309413-3bea-4830-b68f-fe9c01f88152	3	2023-06-27 10:49:16.843239+00	2023-06-27 10:49:16.843239+00	f	4fc8c03a-fdee-42a1-8604-09480f3a9194
d74836da-1816-481f-8cc8-37da667182aa	27309413-3bea-4830-b68f-fe9c01f88152	3	2023-06-27 10:49:16.843239+00	2023-06-27 10:49:16.843239+00	f	f90653ad-7e80-4d4e-bce6-ec190cf90e2e
e254577e-8ab7-4500-a217-cd8c5ae0d094	27309413-3bea-4830-b68f-fe9c01f88152	1	2023-06-27 10:49:16.843239+00	2023-06-27 10:49:16.843239+00	f	1cd1596a-e07b-43f9-8470-c30000bceb88
f43ddcdf-9519-419b-b644-289fdaef6f1e	27309413-3bea-4830-b68f-fe9c01f88152	2	2023-06-27 10:49:16.843239+00	2023-06-27 10:49:16.843239+00	f	f79c2cbb-e972-4fe5-be61-61bb372a82cb
4c3a0148-6a40-40e1-9149-83e38d172161	7887d5ef-5ca7-4f60-8d08-c587d9e3f27e	3	2023-06-27 10:52:14.345499+00	2023-06-27 10:52:14.345499+00	f	d3f1315f-def3-4929-b05b-7918d8c255f8
7279f62c-45b2-4552-b440-58bb3780e85d	7887d5ef-5ca7-4f60-8d08-c587d9e3f27e	2	2023-06-27 10:52:14.345499+00	2023-06-27 10:52:14.345499+00	f	f716564f-9436-42dc-b8b5-44f7d40984a2
e60d850d-d661-4de0-9558-a83abebaacf6	7887d5ef-5ca7-4f60-8d08-c587d9e3f27e	1	2023-06-27 10:52:14.345499+00	2023-06-27 10:52:14.345499+00	f	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
f5de1e00-ae69-4c7f-960e-89765ff94fb7	7887d5ef-5ca7-4f60-8d08-c587d9e3f27e	2	2023-06-27 10:52:14.345499+00	2023-06-27 10:52:14.345499+00	f	5cef5425-f742-41dd-85bc-3dea32dca081
ccf0bc70-11a2-4288-b504-6f3fd982d1c7	6d90d5a4-9fad-4acf-b41b-a39ab373fb41	1	2023-06-27 10:56:53.346806+00	2023-06-27 10:56:53.346806+00	f	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
10ace60c-581a-4f5a-bcc7-8e1e1ae11c61	8fbfeb2d-8974-4ce9-ab74-f9342093efa1	1	2023-06-27 10:59:06.218165+00	2023-06-27 10:59:06.218165+00	f	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
54f5b16a-2fea-48ed-8f14-1f43639ebd7c	8fbfeb2d-8974-4ce9-ab74-f9342093efa1	2	2023-06-27 10:59:06.218165+00	2023-06-27 10:59:06.218165+00	f	5cef5425-f742-41dd-85bc-3dea32dca081
c8f5481b-5d44-466b-b66e-9943f9af04c5	8fbfeb2d-8974-4ce9-ab74-f9342093efa1	3	2023-06-27 10:59:06.218165+00	2023-06-27 10:59:06.218165+00	f	f716564f-9436-42dc-b8b5-44f7d40984a2
28fc2616-4dde-4f77-87ef-a5406b676967	99694134-18b9-4bc2-a7bd-07d73d817b72	1	2023-06-27 11:06:15.829386+00	2023-06-27 11:06:15.829386+00	f	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
53cb4c78-14f2-48fb-89e2-8b0f111dcbba	752ce382-9f1e-46df-a1e3-6feb6575e28b	1	2023-06-27 11:08:07.506023+00	2023-06-27 11:08:07.506023+00	f	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
a21a9d81-5041-44cb-92b7-2cf67be0059e	5a50ce9a-354f-4054-b7ec-a080d574e718	1	2023-06-27 11:09:40.055009+00	2023-06-27 11:09:40.055009+00	f	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
\.


--
-- Data for Name: ExerciseUsersData; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."ExerciseUsersData" ("Id", "UserId", "ExerciseId", "RawStimulusMagnitude", "FatigueMagnitude", "StimulusToFatigueRatio", "Created", "Updated", "IsDeleted") FROM stdin;
\.


--
-- Data for Name: Exercises; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."Exercises" ("Id", "Name", "RawStimulusMagnitude", "FatigueMagnitude", "UserId", "IsPublic", "Created", "Updated", "IsDeleted", "Type", "Likes", "Rates", "Rating", "Description", "YoutubeLink", "TargetMuscleGroupId") FROM stdin;
bc82a0aa-ddeb-42ba-9cc9-76f1ae11c322	Inverted Row	8	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 09:32:05.592943+00	2023-06-27 10:42:52.087745+00	f	1	0	0	0	Inverted row is a bodyweight exercise targeting the muscles of the lats (latissimus dorsi) and upper back, using the barbell, bar of the Smith machine or something else to hang and pull from. You can change the bar height or body angle to customize the difficulty level and desired angle of the row. This variation is usually performed for moderate to high reps, such as 8-12 reps per set or more.\n\nHow to do:\n\n1. Adjust bar height or body angle to desired difficulty. Grip the bar and lean back. Keep your body erect and your head and chest up. Your arms should be fully extended. This will be your starting position.\n2. Begin by flexing the elbow to initiate the movement. Protract your shoulder blades as you do so.\n3. At the completion of the motion pause, and then return to the starting position.	https://youtu.be/KOaCM1HMwU0	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
fa120d1d-177d-4deb-ae1e-69ffcb111dda	Barbell Bent Over Row	9	4	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 08:33:53.16767+00	2023-06-27 10:43:01.210129+00	f	1	0	0	0	The barbell bent-over row is a compound exercise used to build strength and size in both the lower and upper back. It targets nearly all of the muscles in the back, but particularly the lats, rhomboids, and lower back. It is commonly utilized as an accessory movement for the deadlift in powerlifting, but is also popular in strength and muscle-focused upper-body workouts.\n\nHow to do:\n\n1. Holding a barbell with a pronated grip (palms facing down), bend your knees slightly and bring your torso forward, by bending at the waist, while keeping the back straight until it is almost parallel to the floor. Tip: Make sure that you keep the head up. The barbell should hang directly in front of you as your arms hang perpendicular to the floor and your torso. This is your starting position.\n2. Now, while keeping the torso stationary, breathe out and lift the barbell to you. Keep the elbows close to the body and only use the forearms to hold the weight. At the top contracted position, squeeze the back muscles and hold for a brief pause.\n3. Then inhale and slowly lower the barbell back to the starting position.\n4. Repeat for the recommended amount of repetitions.	https://youtu.be/6FZHJGzMFEc	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
7b9f80c2-426d-40d2-b8a7-6e46bac154a2	Machine Low Row	6	2	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 09:18:37.113867+00	2023-06-27 10:42:33.589044+00	f	1	0	0	0	The machine low row is an exercise targeting the back muscles.\n\nHow to do:\n\n1. Adjust the seat height\n2. Sit down and grab the handles\n3. Start with your arms extended\n4. Pull straight back by squeezing your lats\n5. Control the weight back to the starting position\n6. Repeat for the desired number of reps	https://youtu.be/opjbouBmUWg	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
ffd30cac-c390-4eea-8a59-c319c0c1ce76	Pull-Up	9	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 09:37:52.732494+00	2023-06-27 09:37:52.732494+00	f	1	0	0	0	The pull-up is a multi-joint bodyweight exercise that builds strength and muscle in the upper back, biceps, and core. It is often used as a measurement tool in military or tactical fitness tests, and is an excellent gauge of “relative strength” which is strength in relation to bodyweight.\n\n1. Grab the pull-up bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a distance wider than your shoulder width. For a medium grip, your hands need to be spaced out at a distance equal to your shoulder width and for a close grip at a distance smaller than your shoulder width.\n2. As you have both arms extended in front of you holding the bar at the chosen grip width, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position.\n3. Pull your torso up until the bar touches your upper chest by drawing the shoulders and the upper arms down and back. Exhale as you perform this portion of the movement. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary as it moves through space and only the arms should move. The forearms should do no other work other than hold the bar.\n4. After a second on the contracted position, start to inhale and slowly lower your torso back to the starting position when your arms are fully extended and the lats are fully stretched.\n5. Repeat this motion for the prescribed amount of repetitions.	https://youtu.be/iWpoegdfgtc	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
742f057b-c905-4d1c-952e-9702a6ed5ddd	Weighted Pull-Up	9	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 09:40:52.743797+00	2023-06-27 10:21:08.413838+00	f	1	0	0	0	The weighted pull-up is a more advanced variation of the pull-up exercise in which the lifter adds extra weight to their body. Options for adding weight include a dip belt, weighted vest, chains, a dumbbell placed between the feet or legs, or looping a kettlebell over the foot. Like other pull-up variations, the weighted pull-up builds strength and muscle in the upper back, biceps, and core.\n\nHow to do:\n\n1. Attach a weight to a dip belt and secure it around your waist. Grab the pull-up bar with the palms of your hands facing forward. For a medium grip, your hands should be spaced at shoulder width. Both arms should be extended in front of you holding the bar at the chosen grip.\n2. You'll want to bring your torso back about 30 degrees while creating a curvature in your lower back and sticking your chest out. This will be your starting position.\n3. Now, exhale and pull your torso up until your head is above your hands. Concentrate on squeezing your shoulder blades back and down as you reach the top contracted position.\n4. After a brief moment at the top contracted position, inhale and slowly lower your torso back to the starting position with your arms extended and your lats fully stretched.		baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
4cdb9633-0d0c-485f-a6aa-e014a137ba1a	Lat Pull-Down	8	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:22:40.441725+00	2023-06-27 10:22:40.441725+00	f	1	0	0	0	The lat pull-down is a cable-based exercise that's ubiquitous in gyms around the world. This back builder is easy to learn and highly effective at building back size and strength. It's usually trained in moderate to high reps, such as 8-12 reps per set. If grip strength is a limitation, you can wear wrist straps.\n\n1. Sit down on a pull-down machine with a wide bar attached to the top pulley. Make sure that you adjust the knee pad of the machine to fit your height. These pads will prevent your body from being raised by the resistance attached to the bar.\n2. Grab the bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a distance wider than shoulder width. For a medium grip, your hands need to be spaced out at a distance equal to your shoulder width and for a close grip at a distance smaller than your shoulder width.\n3. As you have both arms extended in front of you holding the bar at the chosen grip width, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position.\n4. As you breathe out, bring the bar down until it touches your upper chest by drawing the shoulders and the upper arms down and back. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary and only the arms should move. The forearms should do no other work except for holding the bar; therefore do not try to pull down the bar using the forearms.\n5. After a second at the contracted position squeezing your shoulder blades together, slowly raise the bar back to the starting position when your arms are fully extended and the lats are fully stretched. Inhale during this portion of the movement.\n6. Repeat this motion for the prescribed amount of repetitions.	https://youtu.be/EUIri47Epcg	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
02aa4ad6-c4c9-4d13-a3de-37a3ccbef966	Machine-Assisted Pull-Up	9	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:25:01.055372+00	2023-06-27 10:25:01.055372+00	f	1	0	0	0	The machine-assisted pull-up takes a classic back-building exercise and adds assistance to make the movement easier than the bodyweight version. The amount of assistance can easily be changed by moving the pin in the stack. While some people use this variation as a substitute for pull-ups or as an assistance exercise for pull-ups, it is also effective as a way to perform the pull-up motion in traditional muscle-building ranges. This variation is often performed for moderate to high reps, such as 8-12 reps per set or more, as part of upper-body or back-focused training.\n\nHow to do:\n\n1. Use an assisted pull-up machine or securely attach a heavy-duty band to a pull-up station, securing it around just one knee. The tension should be taut enough to pull that lower leg up. Grasp the bar with an overhand grip just outside shoulder width and hang at full arm extension. This is your start position.\n2. Keeping your body straight, contract your lats to pull yourself up as high as you can, driving your elbows down.\n3. Slowly release to full arm extension. Repeat for the required number of reps and safely dismount from the apparatus.	https://youtu.be/8ygapPMYK1I	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
3ab7d8bd-fd8e-4c79-be17-d609cdc1aba4	Hanging Leg Raise	8	5	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:30:24.561504+00	2023-06-27 10:30:24.561504+00	f	1	0	0	0	The hanging leg raise is an exercise targeting the abs, but which also works the lats and hip flexors. Instead of resting your forearms on the pads of a captain's chair, you perform these hanging from a bar. Experienced lifters make these look easy, but beginners may need time to build up to sets of 8-12 reps.\n\nHow to do:\n\n1. Hang from a chin-up bar with both arms extended at arms length in top of you using either a wide grip or a medium grip. The legs should be straight down with the pelvis rolled slightly backwards. This will be your starting position.\n2. Raise your legs until the torso makes a 90-degree angle with the legs. Exhale as you perform this movement and hold the contraction for a second or so.\n3. Go back slowly to the starting position as you breathe in.\n4. Repeat for the recommended amount of repetitions.	https://youtu.be/7FwGZ8qY5OU	d3f1315f-def3-4929-b05b-7918d8c255f8
79cab181-084b-4238-91dc-357b5995fafe	Machine Ab Crunch	7	4	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:35:42.7064+00	2023-06-27 10:35:42.706401+00	f	2	0	0	0	The machine crunch is a machine-based exercise targeting the abdominal muscles. It involves sitting upright in the machine and curling the torso down toward the chest against some pre-set level of resistance. On some machines, the knees also curl up torward the torso. Crunch machines usually use extra resistance in the form of selectorized weight stacks or plate loading, and are often performed for moderate to high reps, like 8-12 reps per set or higher, as part of the ab-focused portion of a workout.\n\nHow to do:\n\n1. Select a light resistance and sit down on the ab machine placing your feet under the pads provided and grabbing the top handles. Your arms should be bent at a 90 degree angle as you rest the triceps on the pads provided. This will be your starting position.\n2. At the same time, begin to lift the legs up as you crunch your upper torso. Breathe out as you perform this movement. Tip: Be sure to use a slow and controlled motion. Concentrate on using your abs to move the weight while relaxing your legs and feet.\n3. After a second pause, slowly return to the starting position as you breathe in.\n4. Repeat the movement for the prescribed amount of repetitions.	https://youtu.be/-OUSBPnHvsQ	d3f1315f-def3-4929-b05b-7918d8c255f8
c3d5428f-7599-4bcc-980a-adb6a8d1c51c	Kneeling Cable Crunch	8	4	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:37:37.290766+00	2023-06-27 10:37:37.290766+00	f	2	0	0	0	The kneeling cable crunch is a popular core isolation exercise using a rope attachment and cable stack while kneeling on the floor. It primarily targets the rectus abdominis or "six-pack" muscles, but also strengthens the deep core muscles. It is most commonly performed early in an ab workout, usually in moderate to high reps, such as 8-12 reps per set or higher.\n\nHow to do:\n\n1. Kneel below a high pulley that contains a rope attachment.\n2. Grasp cable rope attachment and lower the rope until your hands are placed next to your face.\n3. Flex your hips slightly and allow the weight to hyperextend the lower back. This will be your starting position.\n4. With the hips stationary, flex the waist as you contract the abs so that the elbows travel towards the middle of the thighs. Exhale as you perform this portion of the movement and hold the contraction for a second.\n5. Slowly return to the starting position as you inhale. Tip: Make sure that you keep constant tension on the abs throughout the movement. Also, do not choose a weight so heavy that the lower back handles the brunt of the work.\n6. Repeat for the recommended amount of repetitions.	https://youtu.be/6GMKPQVERzw	d3f1315f-def3-4929-b05b-7918d8c255f8
71bf343f-1406-4499-ae28-3b3a4076c7f4	Decline Crunch	9	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:40:34.847471+00	2023-06-27 10:40:34.847473+00	f	2	0	0	0	The decline crunch is an effective core exercise targeting the rectus abdominis.\n\nHow to do:\n\n1. Secure your legs at the end of the decline bench and lie down.\n2. Now place your hands lightly on either side of your head keeping your elbows in. Tip: Don't lock your fingers behind your head.\n3. While pushing the small of your back down in the bench to better isolate your abdominal muscles, begin to roll your shoulders off it.\n4. Continue to push down as hard as you can with your lower back as you contract your abdominals and exhale. Your shoulders should come up off the bench only about four inches, and your lower back should remain on the bench. At the top of the movement, contract your abdominals hard and keep the contraction for a second. Tip: Focus on slow, controlled movement - don't cheat yourself by using momentum.\n5. After the one second contraction, begin to come down slowly again to the starting position as you inhale.\n6. Repeat for the recommended amount of repetitions.	https://youtu.be/DAnTf16NcT0	d3f1315f-def3-4929-b05b-7918d8c255f8
09f9470e-a9b1-4ed7-8359-906e6ef82438	Dumbbell Bent Over Row	8	4	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 09:06:49.308249+00	2023-06-27 10:42:21.4539+00	f	1	0	0	0	The dumbbell bent-over row is a popular exercise to develop and strengthen the muscles of the upper and middle back, like the latissimus (lat), lower trapezius, and rear deltoids. It can work equally well in strength, muscle-building, or circuit-style fat-loss workouts.\n\nHow to do:\n\n1. With a dumbbell in each hand (palms facing your torso), bend your knees slightly and bring your torso forward by bending at the waist; as you bend make sure to keep your back straight until it is almost parallel to the floor. Tip: Make sure that you keep the head up. The weights should hang directly in front of you as your arms hang perpendicular to the floor and your torso. This is your starting position.\n2. While keeping the torso stationary, lift the dumbbells to your side (as you breathe out), keeping the elbows close to the body (do not exert any force with the forearm other than holding the weights). On the top contracted position, squeeze the back muscles and hold for a second.\n3. Slowly lower the weight again to the starting position as you inhale.\n4. Repeat for the recommended amount of repetitions.	https://youtu.be/5PoEksoJNaw	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
abd794f3-63ca-4138-9f4e-35e35c693beb	Seated Cable Row	9	2	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 09:14:16.353672+00	2023-06-27 10:42:43.668131+00	f	1	0	0	0	The cable seated row is a popular exercise to train the muscles of the upper back, including the lats (latissimus dorsi), traps, rhomboids, and rear deltoids, using a cable stack. It also targets the biceps to a lesser degree. The cable row can work well in a variety of rep-ranges, but is most popular in muscle-building workouts or as an accessory movement for strength workouts.\n\nHow to do:\n\n1. For this exercise you will need access to a low pulley row machine with a V-bar. Note: The V-bar will enable you to have a neutral grip where the palms of your hands face each other. To get into the starting position, first sit down on the machine and place your feet on the front platform or crossbar provided making sure that your knees are slightly bent and not locked.\n2. Lean over as you keep the natural alignment of your back and grab the V-bar handles.\n3. With your arms extended pull back until your torso is at a 90-degree angle from your legs. Your back should be slightly arched and your chest should be sticking out. You should be feeling a nice stretch on your lats as you hold the bar in front of you. This is the starting position of the exercise.\n4. Keeping the torso stationary, pull the handles back towards your torso while keeping the arms close to it until you touch the abdominals. Breathe out as you perform that movement. At that point you should be squeezing your back muscles hard. Hold that contraction for a second and slowly go back to the original position while breathing in.\n5. Repeat for the recommended amount of repetitions.	https://youtu.be/UCXxvVItLoM	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51
be80d47c-8de3-46f6-9ae3-b9d8961536bd	Barbell Shrug	7	4	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:45:42.645316+00	2023-06-27 10:45:42.645317+00	f	1	0	0	0	The barbell shrug is an exercise targeting the traps (trapezius muscles). It is popular in strength and muscle-focused upper-body training, and is often trained on a shoulder day. With the assistance of straps, it can be loaded heavily, but it is still usually performed for moderate to high reps, such as 8-10 reps per set.\n\nHow to do:\n\n1. Stand up straight with your feet at shoulder width as you hold a barbell with both hands in front of you using a pronated grip (palms facing the thighs). Tip: Your hands should be a little wider than shoulder width apart. You can use wrist wraps for this exercise for a better grip. This will be your starting position.\n2. Raise your shoulders up as far as you can go as you breathe out and hold the contraction for a second. Tip: Refrain from trying to lift the barbell by using your biceps.\n3. Slowly return to the starting position as you breathe in.\n4. Repeat for the recommended amount of repetitions.	https://youtu.be/M_MjF5Nm_h4	1cd1596a-e07b-43f9-8470-c30000bceb88
3686fc70-3a4c-4b4a-b8ac-afac219ca15e	Dumbbell Shrug	6	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:47:33.585132+00	2023-06-27 10:47:33.585133+00	f	1	0	0	0	The standing dumbbell shrug is a popular movement to build and strengthen the trapezius muscles. It's often trained on a bodybuilding-style shoulder or back training day, but can also work well in full-body or strength-focused training.\n\nHow to do:\n\n1. Stand erect with a dumbbell on each hand (palms facing your torso), arms extended on the sides.\n2. Lift the dumbbells by elevating the shoulders as high as possible while you exhale. Hold the contraction at the top for a second. Tip: The arms should remain extended at all times. Refrain from using the biceps to help lift the dumbbells. Only the shoulders should be moving up and down.\n3. Lower the dumbbells back to the original position.\n4. Repeat for the recommended amount of repetitions.	https://youtu.be/_t3lrPI6Ns4	1cd1596a-e07b-43f9-8470-c30000bceb88
27309413-3bea-4830-b68f-fe9c01f88152	Cable Shrug	7	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:49:16.812909+00	2023-06-27 10:49:16.81291+00	f	1	0	0	0	The cable shrug is an exercise targeting the traps, as well as hitting the shoulders and upper back. Cables allow for lighter loading which is beneficial for higher-rep sets.\n\nHow to do:\n\n1. Grasp a cable bar attachment that is attached to a low pulley with a shoulder width or slightly wider overhand (palms facing down) grip.\n2. Stand erect close to the pulley with your arms extended in front of you holding the bar. This will be your starting position.\n3. Lift the bar by elevating the shoulders as high as possible as you exhale. Hold the contraction at the top for a second. Tip: The arms should remain extended at all times. Refrain from using the biceps to help lift the bar. Only the shoulders should be moving up and down.\n4. Lower the bar back to the original position.\n5. Repeat for the recommended amount of repetitions.	https://youtu.be/YykmcX2b-LY	1cd1596a-e07b-43f9-8470-c30000bceb88
7887d5ef-5ca7-4f60-8d08-c587d9e3f27e	Triceps Dip	9	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:52:14.313823+00	2023-06-27 10:52:14.313823+00	f	1	0	0	0	The triceps dip is a bodyweight exercise performed on parallel bars or on a pull-up and dip station. It targets the triceps first, but also stretches and strengthens the chest and shoulders. Dips with a triceps focus are usually performed with an upright torso, the knees bent and crossed, and the arms close to the body. Dips can be performed for low reps for strength or higher reps for muscle growth.\n\nHow to do:\n\n1. To get into the starting position, hold your body at arm's length with your arms nearly locked above the bars.\n2. Now, inhale and slowly lower yourself downward. Your torso should remain upright and your elbows should stay close to your body. This helps to better focus on tricep involvement. Lower yourself until there is a 90 degree angle formed between the upper arm and forearm.\n3. Then, exhale and push your torso back up using your triceps to bring your body back to the starting position.\n4. Repeat the movement for the prescribed amount of repetitions.	https://youtu.be/4LA1kF7yCGo	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
6d90d5a4-9fad-4acf-b41b-a39ab373fb41	Barbell Skullcrusher	8	4	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:56:13.699567+00	2023-06-27 10:56:53.323171+00	f	2	0	0	0	The barbell skullcrusher is a popular exercise targeting the triceps muscles. The EZ-bar is used more often than a straight bar. As for the name, that’s worst-case scenario. The bar should actually come down behind the head. It is usually performed for moderate to high reps as part of an upper body or arms-focused workout. No need to chase a 1RM on this move!\n\nHow to do:\n\n1. Using a close grip, lift the bar and hold it with your elbows in as you lie on the bench. Your arms should be perpendicular to the floor. This will be your starting position.\n2. Keeping the upper arms stationary, lower the bar by allowing the elbows to flex. Inhale as you perform this portion of the movement. Pause once the bar is directly above the forehead.\n3. Lift the bar back to the starting position by extending the elbow and exhaling.\n4. Repeat.	https://youtu.be/l3rHYPtMUo8	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
8fbfeb2d-8974-4ce9-ab74-f9342093efa1	JM Press	7	5	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 10:58:44.777977+00	2023-06-27 10:59:06.178992+00	f	1	0	0	0	The JM press is essentially a cross between a close-grip bench press and a barbell skull crusher (triceps extension)—both of which are hallmark strength- and mass-gaining exercises for the triceps.\n\nIn the close-grip bench press, the lifter uses a narrower grip than on the conventional bench press—such as hands at shoulder-width, or slightly inside—to emphasize triceps involvement over the chest and shoulders. With the skull crusher, the bar is lowered to the forehead, putting a stretch on the triceps to increase activation. The JM press puts both exercises together in a movement that works the triceps in the range of motion they use to lock out the elbows in the last few inches of a bench press rep, when the weight is going up overhead. This makes it very specific to bench press gains, and, therefore, a popular exercise among powerlifters.\n\nHow to do:\n\n1. Load the bar to an appropriate weight for your training.\n2. Lay on the bench with your feet flat on the ground, driving through with your hips. Your back should be arched and your shoulder blades retracted.\n3. Take a medium pronated grip, covering the rings on the bar. Remove the bar from the rack, holding the weight above your clavicle with your arms extended. This will be your starting position.\n4. Lower the bar by displacing your elbows forward. The bar should only move vertically, making the exercise resemble a hybrid bench press and skull-crusher.\n5. Lower the weight but stop short of allowing it to touch your chest, then return the bar to the starting position.	https://youtu.be/Tih5iHyELsE	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
99694134-18b9-4bc2-a7bd-07d73d817b72	Cable Rope Push-Down	9	2	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 11:03:30.191954+00	2023-06-27 11:06:15.808188+00	f	2	0	0	0	The cable rope push-down is a popular exercise targeting the triceps muscles. It's easy to learn and perform, making it a favorite for everyone from beginners to advanced lifters. It is usually performed for moderate to high reps, such as 8-12 reps or more per set, as part of an upper-body or arm-focused workout.\n\nHow to do:\n\n1. Attach a rope attachment to a high pulley and grab with a neutral grip (palms facing each other).\n2. Standing upright with the torso straight and a very small inclination forward, bring the upper arms close to your body and perpendicular to the floor. The forearms should be pointing up towards the pulley as they hold the rope with the palms facing each other. This is your starting position.\n3. Using the triceps, bring the rope down as you bring each side of the rope to the side of your thighs. At the end of the movement the arms are fully extended and perpendicular to the floor. The upper arms should always remain stationary next to your torso and only the forearms should move. Exhale as you perform this movement.\n4. After holding for a second, at the contracted position, bring the rope slowly up to the starting point. Breathe in as you perform this step.\n5. Repeat for the recommended amount of repetitions.	https://youtu.be/-xa-6cQaZKY	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
752ce382-9f1e-46df-a1e3-6feb6575e28b	Cable Triceps Pushdown	8	4	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 11:07:43.562369+00	2023-06-27 11:08:07.487102+00	f	2	0	0	0	The cable push-down is a popular gym exercise for targeting the triceps. It utilizes straight or angled bar, which can allow you to move heavier weights more comfortably than a straight bar or rope. It is usually performed for moderate to high reps, such as 8-12 reps or more per set, as part of an upper-body or arm-focused workout.\n\nHow to do:\n\n1. Attach a straight or angled bar to a high pulley and grab with an overhand grip (palms facing down) at shoulder width.\n2. Standing upright with the torso straight and a very small inclination forward, bring the upper arms close to your body and perpendicular to the floor. The forearms should be pointing up towards the pulley as they hold the bar. This is your starting position.\n3. Using the triceps, bring the bar down until it touches the front of your thighs and the arms are fully extended perpendicular to the floor. The upper arms should always remain stationary next to your torso and only the forearms should move. Exhale as you perform this movement.\n4. After a second hold at the contracted position, bring the bar slowly up to the starting point. Breathe in as you perform this step.\n5. Repeat for the recommended amount of repetitions.	https://youtu.be/6Fzep104f0s	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
5a50ce9a-354f-4054-b7ec-a080d574e718	Cable Overhead Triceps Extension	9	3	34fbabce-0942-4df5-8d86-7e87b30b765e	t	2023-06-27 11:09:40.046731+00	2023-06-27 11:09:40.046732+00	f	2	0	0	0	The cable overhead triceps extension is a cable exercise performed in a seated position, targeting the triceps muscles. While it hits all three heads of the triceps, the overhead position helps to target the long head in particular. The seated position helps eliminate the use of momentum. It is usually performed for moderate to high reps as part of the arm-focused portion of a workout.\n\nHow to do:\n\n1. Attach a rope to the bottom pulley of the pulley machine.\n2. Grasping the rope with both hands, extend your arms with your hands directly above your head using a neutral grip (palms facing each other). Your elbows should be in close to your head and the arms should be perpendicular to the floor with the knuckles aimed at the ceiling. This will be your starting position.\n3. Slowly lower the rope behind your head as you hold the upper arms stationary. Inhale as you perform this movement and pause when your triceps are fully stretched.\n4. Return to the starting position by flexing your triceps as you breathe out.\n5. Repeat for the recommended amount of repetitions.	https://youtu.be/1u18yJELsh0	cd7c1a97-6ba3-4076-91ab-2e6ead1e367e
\.


--
-- Data for Name: MuscleGroupUsersData; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."MuscleGroupUsersData" ("Id", "UserId", "MuscleGroupId", "MaintenanceVolume", "MinimumEffectiveVolume", "MaximumRecoverableVolume", "Created", "Updated", "IsDeleted") FROM stdin;
474dcd84-0d7a-42ae-952c-67581c187f23	34fbabce-0942-4df5-8d86-7e87b30b765e	baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51	6	10	20	-infinity	-infinity	f
\.


--
-- Data for Name: MuscleGroups; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."MuscleGroups" ("Id", "MaintenanceVolume", "MinimumEffectiveVolume", "MaximumRecoverableVolume", "Created", "Updated", "IsDeleted", "AverageRecoveryTime", "MaximumRecoverableVolumeMultiplicator", "Type") FROM stdin;
049cd6ef-9667-4f46-b4c1-51093e7e64a5	4	8	20	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	1	5	3
1cd1596a-e07b-43f9-8470-c30000bceb88	0	0	10	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	1	8	13
220bdf75-4283-42c5-856d-71b59dc5affe	6	8	16	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	1	4	4
4fc8c03a-fdee-42a1-8604-09480f3a9194	0	4	15	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	1	5	6
5cef5425-f742-41dd-85bc-3dea32dca081	0	0	12	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	2	4	7
6396413c-3a2e-41ed-8866-d11f5ff75c9e	3	4	12	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	2	3	9
7b690688-728b-482b-9a91-ae400352a30f	0	0	12	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	2	6	8
b7848f67-6aa6-4572-9d47-d72268596711	6	8	18	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	2	4	10
cd7c1a97-6ba3-4076-91ab-2e6ead1e367e	4	6	16	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	1	4	14
f716564f-9436-42dc-b8b5-44f7d40984a2	4	6	20	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	2	5	5
f79c2cbb-e972-4fe5-be61-61bb372a82cb	6	8	25	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	1	5	12
f90653ad-7e80-4d4e-bce6-ec190cf90e2e	0	6	18	2023-01-09 20:12:34.919986+00	2023-01-09 20:12:34.919986+00	f	1	6	11
d3f1315f-def3-4929-b05b-7918d8c255f8	0	0	25	2023-01-09 20:12:34.919986+00	2023-01-09 20:17:57.131974+00	f	1	0	1
baab2a1f-bd2d-46b2-91ee-8dbd4e50cd51	6	10	20	2023-01-09 20:12:34.919986+00	2023-06-14 10:04:13.956319+00	f	2	5	2
\.


--
-- Data for Name: TrainingPrograms; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."TrainingPrograms" ("Id", "Name", "UserId", "IsPublic", "Created", "Updated", "IsDeleted", "Likes", "Rating", "TrainingLevel", "Type", "Description", "NumberOfSessions", "Rates") FROM stdin;
\.


--
-- Data for Name: TrainingSessions; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."TrainingSessions" ("Id", "Week", "DayOfWeek", "RepsInReserve", "TrainingProgramId", "Created", "Updated", "IsDeleted") FROM stdin;
\.


--
-- Data for Name: TrainingSessionsExercises; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."TrainingSessionsExercises" ("Id", "TrainingSessionId", "ExerciseId", "Sets", "Created", "Updated", "IsDeleted", "Order") FROM stdin;
\.


--
-- Data for Name: UserExerciseLikes; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."UserExerciseLikes" ("Id", "UserId", "ExerciseId", "Created", "Updated", "IsDeleted") FROM stdin;
\.


--
-- Data for Name: UserExerciseRatings; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."UserExerciseRatings" ("Id", "UserId", "ExerciseId", "Rating", "Created", "Updated", "IsDeleted") FROM stdin;
\.


--
-- Data for Name: UserTrainingProgramLikes; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."UserTrainingProgramLikes" ("Id", "UserId", "TrainingProgramId", "Created", "Updated", "IsDeleted") FROM stdin;
\.


--
-- Data for Name: UserTrainingProgramRatings; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."UserTrainingProgramRatings" ("Id", "UserId", "TrainingProgramId", "Rating", "Created", "Updated", "IsDeleted") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."Users" ("Id", "Username", "Email", "Created", "Updated", "IsDeleted", "FirebaseId") FROM stdin;
01faeb35-159a-454e-bf45-7343fb9cf14c	PatinentZero	pprcut47@yandex.ru	-infinity	-infinity	f	\N
5793db58-a657-434c-aee8-78aec0377413	User 5793db58-a657-434c-aee8-78aec0377413	testuser2@gmail.com	-infinity	-infinity	f	\N
e540bffd-c6ef-4d90-b780-0b3373ce49c8	User e540bffd-c6ef-4d90-b780-0b3373ce49c8	testuser2@gmail.com	-infinity	-infinity	f	\N
34fbabce-0942-4df5-8d86-7e87b30b765e	Антон Зайцев	pprcut47@gmail.com	2023-05-16 08:22:02.020191+00	2023-05-16 08:22:02.020192+00	f	tTonA1hzorOULSzgkHA8FpAFh543
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: ppauser
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20230105233633_Initial	7.0.1
20230106083635_TableConfigurations	7.0.1
20230106083800_TableConfigurationsUpdate	7.0.1
20230106150357_MuscleGroupsConfigurationUpdated	7.0.1
20230106165800_DefaultUser	7.0.1
20230106175340_EntityConfigurationUpdate	7.0.1
20230106231322_ExerciseConfigurationUpdated	7.0.1
20230106232309_ExerciseConfigurationUpdated2	7.0.1
20230107222845_EntityConfigurationUpdate2	7.0.1
20230109195110_ReconfigureMuscleGroupEntity	7.0.1
20230124192600_ExerciseTypeAddition	7.0.1
20230502074713_TrainingProgramsLikesAndRatingAdded	7.0.1
20230502112631_TrainingProgramsTypeAndTrainingLevelAdded	7.0.1
20230503132659_TrainingProgramsDescriptionAndNumberOfSessionsAdded	7.0.1
20230515090834_UsersTableUselessColumnsRemoved	7.0.1
20230515203135_UsersTableFirebaseIdAdded	7.0.1
20230516082716_UsersTableFirebaseIdSetUnique	7.0.1
20230516144737_TrainingProgramsRelationsUpdated	7.0.1
20230516173937_UserTrainingProgramsEntitiesUpdated	7.0.1
20230518155615_TrainingProgramsRatesAdded	7.0.1
20230524092917_ExerciseEntityRehaul	7.0.1
20230524112344_ExerciseMuscleGroupEntityChanged	7.0.1
20230524113159_ExerciseMuscleGroupEntityChanged2	7.0.1
20230525093143_MuscleGroupEntityRehaul	7.0.1
20230601084205_ExerciseMuscleGroupIncludeMuscleGroup	7.0.1
20230601105140_ExerciseDescriptionAndYoutubeLinkAdded	7.0.1
20230615091403_ExerciseOrderInSessionAdded	7.0.1
20230621114824_TargetMuscleGroupToExercseAdded	7.0.1
\.


--
-- Name: ExerciseMuscleGroups PK_ExerciseMuscleGroups; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."ExerciseMuscleGroups"
    ADD CONSTRAINT "PK_ExerciseMuscleGroups" PRIMARY KEY ("Id");


--
-- Name: ExerciseUsersData PK_ExerciseUsersData; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."ExerciseUsersData"
    ADD CONSTRAINT "PK_ExerciseUsersData" PRIMARY KEY ("Id");


--
-- Name: Exercises PK_Exercises; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."Exercises"
    ADD CONSTRAINT "PK_Exercises" PRIMARY KEY ("Id");


--
-- Name: MuscleGroupUsersData PK_MuscleGroupUsersData; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."MuscleGroupUsersData"
    ADD CONSTRAINT "PK_MuscleGroupUsersData" PRIMARY KEY ("Id");


--
-- Name: MuscleGroups PK_MuscleGroups; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."MuscleGroups"
    ADD CONSTRAINT "PK_MuscleGroups" PRIMARY KEY ("Id");


--
-- Name: TrainingPrograms PK_TrainingPrograms; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."TrainingPrograms"
    ADD CONSTRAINT "PK_TrainingPrograms" PRIMARY KEY ("Id");


--
-- Name: TrainingSessions PK_TrainingSessions; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."TrainingSessions"
    ADD CONSTRAINT "PK_TrainingSessions" PRIMARY KEY ("Id");


--
-- Name: TrainingSessionsExercises PK_TrainingSessionsExercises; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."TrainingSessionsExercises"
    ADD CONSTRAINT "PK_TrainingSessionsExercises" PRIMARY KEY ("Id");


--
-- Name: UserExerciseLikes PK_UserExerciseLikes; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserExerciseLikes"
    ADD CONSTRAINT "PK_UserExerciseLikes" PRIMARY KEY ("Id");


--
-- Name: UserExerciseRatings PK_UserExerciseRatings; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserExerciseRatings"
    ADD CONSTRAINT "PK_UserExerciseRatings" PRIMARY KEY ("Id");


--
-- Name: UserTrainingProgramLikes PK_UserTrainingProgramLikes; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserTrainingProgramLikes"
    ADD CONSTRAINT "PK_UserTrainingProgramLikes" PRIMARY KEY ("Id");


--
-- Name: UserTrainingProgramRatings PK_UserTrainingProgramRatings; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserTrainingProgramRatings"
    ADD CONSTRAINT "PK_UserTrainingProgramRatings" PRIMARY KEY ("Id");


--
-- Name: Users PK_Users; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_Users" PRIMARY KEY ("Id");


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: IX_ExerciseMuscleGroups_ExerciseId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_ExerciseMuscleGroups_ExerciseId" ON public."ExerciseMuscleGroups" USING btree ("ExerciseId");


--
-- Name: IX_ExerciseMuscleGroups_MuscleGroupId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_ExerciseMuscleGroups_MuscleGroupId" ON public."ExerciseMuscleGroups" USING btree ("MuscleGroupId");


--
-- Name: IX_ExerciseUsersData_ExerciseId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_ExerciseUsersData_ExerciseId" ON public."ExerciseUsersData" USING btree ("ExerciseId");


--
-- Name: IX_Exercises_TargetMuscleGroupId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_Exercises_TargetMuscleGroupId" ON public."Exercises" USING btree ("TargetMuscleGroupId");


--
-- Name: IX_Exercises_UserId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_Exercises_UserId" ON public."Exercises" USING btree ("UserId");


--
-- Name: IX_MuscleGroupUsersData_MuscleGroupId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_MuscleGroupUsersData_MuscleGroupId" ON public."MuscleGroupUsersData" USING btree ("MuscleGroupId");


--
-- Name: IX_MuscleGroupUsersData_UserId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_MuscleGroupUsersData_UserId" ON public."MuscleGroupUsersData" USING btree ("UserId");


--
-- Name: IX_TrainingPrograms_UserId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_TrainingPrograms_UserId" ON public."TrainingPrograms" USING btree ("UserId");


--
-- Name: IX_TrainingSessionsExercises_ExerciseId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_TrainingSessionsExercises_ExerciseId" ON public."TrainingSessionsExercises" USING btree ("ExerciseId");


--
-- Name: IX_TrainingSessionsExercises_TrainingSessionId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_TrainingSessionsExercises_TrainingSessionId" ON public."TrainingSessionsExercises" USING btree ("TrainingSessionId");


--
-- Name: IX_TrainingSessions_TrainingProgramId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_TrainingSessions_TrainingProgramId" ON public."TrainingSessions" USING btree ("TrainingProgramId");


--
-- Name: IX_UserExerciseLikes_ExerciseId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_UserExerciseLikes_ExerciseId" ON public."UserExerciseLikes" USING btree ("ExerciseId");


--
-- Name: IX_UserExerciseLikes_UserId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_UserExerciseLikes_UserId" ON public."UserExerciseLikes" USING btree ("UserId");


--
-- Name: IX_UserExerciseRatings_ExerciseId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_UserExerciseRatings_ExerciseId" ON public."UserExerciseRatings" USING btree ("ExerciseId");


--
-- Name: IX_UserExerciseRatings_UserId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_UserExerciseRatings_UserId" ON public."UserExerciseRatings" USING btree ("UserId");


--
-- Name: IX_UserTrainingProgramLikes_TrainingProgramId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_UserTrainingProgramLikes_TrainingProgramId" ON public."UserTrainingProgramLikes" USING btree ("TrainingProgramId");


--
-- Name: IX_UserTrainingProgramLikes_UserId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_UserTrainingProgramLikes_UserId" ON public."UserTrainingProgramLikes" USING btree ("UserId");


--
-- Name: IX_UserTrainingProgramRatings_TrainingProgramId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_UserTrainingProgramRatings_TrainingProgramId" ON public."UserTrainingProgramRatings" USING btree ("TrainingProgramId");


--
-- Name: IX_UserTrainingProgramRatings_UserId; Type: INDEX; Schema: public; Owner: ppauser
--

CREATE INDEX "IX_UserTrainingProgramRatings_UserId" ON public."UserTrainingProgramRatings" USING btree ("UserId");


--
-- Name: ExerciseMuscleGroups FK_ExerciseMuscleGroups_Exercises_ExerciseId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."ExerciseMuscleGroups"
    ADD CONSTRAINT "FK_ExerciseMuscleGroups_Exercises_ExerciseId" FOREIGN KEY ("ExerciseId") REFERENCES public."Exercises"("Id") ON DELETE CASCADE;


--
-- Name: ExerciseMuscleGroups FK_ExerciseMuscleGroups_MuscleGroups_MuscleGroupId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."ExerciseMuscleGroups"
    ADD CONSTRAINT "FK_ExerciseMuscleGroups_MuscleGroups_MuscleGroupId" FOREIGN KEY ("MuscleGroupId") REFERENCES public."MuscleGroups"("Id");


--
-- Name: ExerciseUsersData FK_ExerciseUsersData_Exercises_ExerciseId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."ExerciseUsersData"
    ADD CONSTRAINT "FK_ExerciseUsersData_Exercises_ExerciseId" FOREIGN KEY ("ExerciseId") REFERENCES public."Exercises"("Id") ON DELETE CASCADE;


--
-- Name: Exercises FK_Exercises_MuscleGroups_TargetMuscleGroupId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."Exercises"
    ADD CONSTRAINT "FK_Exercises_MuscleGroups_TargetMuscleGroupId" FOREIGN KEY ("TargetMuscleGroupId") REFERENCES public."MuscleGroups"("Id");


--
-- Name: Exercises FK_Exercises_Users_UserId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."Exercises"
    ADD CONSTRAINT "FK_Exercises_Users_UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"("Id") ON DELETE CASCADE;


--
-- Name: MuscleGroupUsersData FK_MuscleGroupUsersData_MuscleGroups_MuscleGroupId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."MuscleGroupUsersData"
    ADD CONSTRAINT "FK_MuscleGroupUsersData_MuscleGroups_MuscleGroupId" FOREIGN KEY ("MuscleGroupId") REFERENCES public."MuscleGroups"("Id") ON DELETE CASCADE;


--
-- Name: MuscleGroupUsersData FK_MuscleGroupUsersData_Users_UserId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."MuscleGroupUsersData"
    ADD CONSTRAINT "FK_MuscleGroupUsersData_Users_UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"("Id") ON DELETE CASCADE;


--
-- Name: TrainingPrograms FK_TrainingPrograms_Users_UserId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."TrainingPrograms"
    ADD CONSTRAINT "FK_TrainingPrograms_Users_UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"("Id") ON DELETE CASCADE;


--
-- Name: TrainingSessionsExercises FK_TrainingSessionsExercises_Exercises_ExerciseId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."TrainingSessionsExercises"
    ADD CONSTRAINT "FK_TrainingSessionsExercises_Exercises_ExerciseId" FOREIGN KEY ("ExerciseId") REFERENCES public."Exercises"("Id");


--
-- Name: TrainingSessionsExercises FK_TrainingSessionsExercises_TrainingSessions_TrainingSessionId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."TrainingSessionsExercises"
    ADD CONSTRAINT "FK_TrainingSessionsExercises_TrainingSessions_TrainingSessionId" FOREIGN KEY ("TrainingSessionId") REFERENCES public."TrainingSessions"("Id") ON DELETE CASCADE;


--
-- Name: TrainingSessions FK_TrainingSessions_TrainingPrograms_TrainingProgramId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."TrainingSessions"
    ADD CONSTRAINT "FK_TrainingSessions_TrainingPrograms_TrainingProgramId" FOREIGN KEY ("TrainingProgramId") REFERENCES public."TrainingPrograms"("Id");


--
-- Name: UserExerciseLikes FK_UserExerciseLikes_Exercises_ExerciseId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserExerciseLikes"
    ADD CONSTRAINT "FK_UserExerciseLikes_Exercises_ExerciseId" FOREIGN KEY ("ExerciseId") REFERENCES public."Exercises"("Id") ON DELETE CASCADE;


--
-- Name: UserExerciseLikes FK_UserExerciseLikes_Users_UserId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserExerciseLikes"
    ADD CONSTRAINT "FK_UserExerciseLikes_Users_UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"("Id") ON DELETE CASCADE;


--
-- Name: UserExerciseRatings FK_UserExerciseRatings_Exercises_ExerciseId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserExerciseRatings"
    ADD CONSTRAINT "FK_UserExerciseRatings_Exercises_ExerciseId" FOREIGN KEY ("ExerciseId") REFERENCES public."Exercises"("Id") ON DELETE CASCADE;


--
-- Name: UserExerciseRatings FK_UserExerciseRatings_Users_UserId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserExerciseRatings"
    ADD CONSTRAINT "FK_UserExerciseRatings_Users_UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"("Id") ON DELETE CASCADE;


--
-- Name: UserTrainingProgramLikes FK_UserTrainingProgramLikes_TrainingPrograms_TrainingProgramId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserTrainingProgramLikes"
    ADD CONSTRAINT "FK_UserTrainingProgramLikes_TrainingPrograms_TrainingProgramId" FOREIGN KEY ("TrainingProgramId") REFERENCES public."TrainingPrograms"("Id") ON DELETE CASCADE;


--
-- Name: UserTrainingProgramLikes FK_UserTrainingProgramLikes_Users_UserId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserTrainingProgramLikes"
    ADD CONSTRAINT "FK_UserTrainingProgramLikes_Users_UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"("Id") ON DELETE CASCADE;


--
-- Name: UserTrainingProgramRatings FK_UserTrainingProgramRatings_TrainingPrograms_TrainingProgram~; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserTrainingProgramRatings"
    ADD CONSTRAINT "FK_UserTrainingProgramRatings_TrainingPrograms_TrainingProgram~" FOREIGN KEY ("TrainingProgramId") REFERENCES public."TrainingPrograms"("Id") ON DELETE CASCADE;


--
-- Name: UserTrainingProgramRatings FK_UserTrainingProgramRatings_Users_UserId; Type: FK CONSTRAINT; Schema: public; Owner: ppauser
--

ALTER TABLE ONLY public."UserTrainingProgramRatings"
    ADD CONSTRAINT "FK_UserTrainingProgramRatings_Users_UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"("Id") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

