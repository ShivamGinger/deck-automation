import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, unique, bigint, date, mysqlEnum, tinyint, varchar, json, text, timestamp, decimal } from "drizzle-orm/mysql-core"
import { sql, InferSelectModel } from "drizzle-orm"


export const candidateStatus = mysqlTable("candidate_status", {
	id: bigint("id", { mode: "number" }).notNull(),
	candidateId: bigint("candidate_id", { mode: "number" }).notNull(),
	profileShrDate: date("profile_shr_date", { mode: 'string' }),
	status: mysqlEnum("status", ['yet_to_share','joined','negotiation','on_hold','feedback_pending','dropped_out','rejected','in_process']).notNull(),
	roundDone: tinyint("round_done"),
	reasonReject: varchar("reason_reject", { length: 255 }),
},
(table) => {
	return {
		candidateIdIdx: index("candidate_id_idx").on(table.candidateId),
		candidateStatusId: primaryKey(table.id),
		candidateId: unique("candidate_id").on(table.candidateId),
	}
});

export const candidates = mysqlTable("candidates", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	keyPoints: json("key_points"),
	profilePic: text("profile_pic"),
	social: text("social"),
	companyId: bigint("company_id", { mode: "number" }),
	roleId: bigint("role_id", { mode: "number" }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	email: varchar("email", { length: 50 }).notNull(),
	currPos: varchar("curr_pos", { length: 200 }),
	currLoc: varchar("curr_loc", { length: 100 }),
	experience: varchar("experience", { length: 30 }),
	phNum: varchar("ph_num", { length: 20 }).notNull(),
	fixedLpa: decimal("fixed_lpa", { precision: 5, scale: 2 }),
	varLpa: decimal("var_lpa", { precision: 5, scale: 2 }),
	expectedCtc: decimal("expected_ctc", { precision: 5, scale: 2 }),
	noticePeriod: varchar("notice_period", { length: 255 }),
},
(table) => {
	return {
		companyIdIdx: index("company_id_idx").on(table.companyId),
		roleIdIdx: index("role_id_idx").on(table.roleId),
		candidatesId: primaryKey(table.id),
	}
});

export const companies = mysqlTable("companies", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		companiesId: primaryKey(table.id),
		name: unique("name").on(table.name),
	}
});

export const parameterScores = mysqlTable("parameter_scores", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	candidateId: bigint("candidate_id", { mode: "number" }).notNull(),
	parameterId: bigint("parameter_id", { mode: "number" }).notNull(),
	score: tinyint("score").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		candidateIdIdx: index("candidate_id_idx").on(table.candidateId),
		parameterIdIdx: index("parameter_id_idx").on(table.parameterId),
		parameterScoresId: primaryKey(table.id),
	}
});

export const parameterWeightages = mysqlTable("parameter_weightages", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	pWeightage: tinyint("p_weightage").notNull(),
	parameterId: bigint("parameter_id", { mode: "number" }).notNull(),
	companyId: bigint("company_id", { mode: "number" }).notNull(),
	roleId: bigint("role_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		companyIdIdx: index("company_id_idx").on(table.companyId),
		parameterIdIdx: index("parameter_id_idx").on(table.parameterId),
		roleIdIdx: index("role_id_idx").on(table.roleId),
		parameterWeightagesId: primaryKey(table.id),
	}
});

export const parameters = mysqlTable("parameters", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	parameter: text("parameter").notNull(),
	quotientId: bigint("quotient_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		quotientIdIdx: index("quotient_id_idx").on(table.quotientId),
		parametersId: primaryKey(table.id),
	}
});

export const quotientScores = mysqlTable("quotient_scores", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	candidateId: bigint("candidate_id", { mode: "number" }).notNull(),
	quotientId: bigint("quotient_id", { mode: "number" }).notNull(),
	totalScore: decimal("total_score", { precision: 4, scale: 2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		candidateIdIdx: index("candidate_id_idx").on(table.candidateId),
		quotientIdIdx: index("quotient_id_idx").on(table.quotientId),
		quotientScoresId: primaryKey(table.id),
	}
});

export const quotientWeightages = mysqlTable("quotient_weightages", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	qWeightage: tinyint("q_weightage").notNull(),
	quotientId: bigint("quotient_id", { mode: "number" }).notNull(),
	companyId: bigint("company_id", { mode: "number" }).notNull(),
	roleId: bigint("role_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		companyIdIdx: index("company_id_idx").on(table.companyId),
		quotientIdIdx: index("quotient_id_idx").on(table.quotientId),
		roleIdIdx: index("role_id_idx").on(table.roleId),
		quotientWeightagesId: primaryKey(table.id),
	}
});

export const quotients = mysqlTable("quotients", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	quotient: varchar("quotient", { length: 150 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		quotientsId: primaryKey(table.id),
		quotient: unique("quotient").on(table.quotient),
	}
});

export const roles = mysqlTable("roles", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	companyId: bigint("company_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		companyIdIdx: index("company_id_idx").on(table.companyId),
		rolesId: primaryKey(table.id),
	}
});

export const statusHistory = mysqlTable("status_history", {
	id: bigint("id", { mode: "number" }).notNull(),
	candidateId: bigint("candidate_id", { mode: "number" }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	profileShrDate: date("profile_shr_date", { mode: 'string' }),
	status: mysqlEnum("status", ['yet_to_share','joined','negotiation','on_hold','feedback_pending','dropped_out','rejected','in_process']).notNull(),
	roundDone: tinyint("round_done"),
	reasonReject: varchar("reason_reject", { length: 255 }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		statusHistoryId: primaryKey(table.id),
	}
});

export const users = mysqlTable("users", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		userEmailIdx: index("user_email_idx").on(table.email),
		usersId: primaryKey(table.id),
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export type Candidates = InferSelectModel<typeof candidates>;
export type CandidatesStatus = InferSelectModel<typeof candidateStatus>;
export type StatusHistory = InferSelectModel<typeof statusHistory>;
export type Companies = InferSelectModel<typeof companies>;
export type ParameterScores = InferSelectModel<typeof parameterScores>;
export type ParameterWeightages = InferSelectModel<typeof parameterWeightages>;
export type Parameters = InferSelectModel<typeof parameters>;
export type QuotientScores = InferSelectModel<typeof quotientScores>;
export type QuotientWeightages = InferSelectModel<typeof quotientWeightages>;
export type Quotients = InferSelectModel<typeof quotients>;
export type Role = InferSelectModel<typeof roles>;
export type User = InferSelectModel<typeof users>;