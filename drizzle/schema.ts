import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, bigint, varchar, json, text, timestamp, unique, tinyint, decimal } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const candidates = mysqlTable("candidates", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	keyPoints: json("key_points"),
	profilePic: text("profile_pic"),
	social: text("social"),
	companyId: bigint("company_id", { mode: "number" }),
	roleId: bigint("role_id", { mode: "number" }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
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
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
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
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
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
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
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
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
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
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
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
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
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
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
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
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		companyIdIdx: index("company_id_idx").on(table.companyId),
		rolesId: primaryKey(table.id),
	}
});