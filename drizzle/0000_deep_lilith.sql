-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `candidates` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`key_points` json,
	`profile_pic` text,
	`social` text,
	`company_id` bigint,
	`role_id` bigint,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `candidates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`),
	CONSTRAINT `name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `parameter_scores` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`candidate_id` bigint NOT NULL,
	`parameter_id` bigint NOT NULL,
	`score` tinyint NOT NULL,
	CONSTRAINT `parameter_scores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parameter_weightages` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`p_weightage` tinyint NOT NULL,
	`parameter_id` bigint NOT NULL,
	`company_id` bigint NOT NULL,
	`role_id` bigint NOT NULL,
	CONSTRAINT `parameter_weightages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parameters` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`parameter` text NOT NULL,
	`quotient_id` bigint NOT NULL,
	CONSTRAINT `parameters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quotient_scores` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`candidate_id` bigint NOT NULL,
	`quotient_id` bigint NOT NULL,
	`total_score` decimal(4,2) NOT NULL,
	CONSTRAINT `quotient_scores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quotient_weightages` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`q_weightage` tinyint NOT NULL,
	`quotient_id` bigint NOT NULL,
	`company_id` bigint NOT NULL,
	`role_id` bigint NOT NULL,
	CONSTRAINT `quotient_weightages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quotients` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`quotient` varchar(150) NOT NULL,
	CONSTRAINT `quotients_id` PRIMARY KEY(`id`),
	CONSTRAINT `quotient` UNIQUE(`quotient`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`company_id` bigint NOT NULL,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `company_id_idx` ON `candidates` (`company_id`);--> statement-breakpoint
CREATE INDEX `role_id_idx` ON `candidates` (`role_id`);--> statement-breakpoint
CREATE INDEX `candidate_id_idx` ON `parameter_scores` (`candidate_id`);--> statement-breakpoint
CREATE INDEX `parameter_id_idx` ON `parameter_scores` (`parameter_id`);--> statement-breakpoint
CREATE INDEX `parameter_id_idx` ON `parameter_weightages` (`parameter_id`);--> statement-breakpoint
CREATE INDEX `company_id_idx` ON `parameter_weightages` (`company_id`);--> statement-breakpoint
CREATE INDEX `role_id_idx` ON `parameter_weightages` (`role_id`);--> statement-breakpoint
CREATE INDEX `quotient_id_idx` ON `parameters` (`quotient_id`);--> statement-breakpoint
CREATE INDEX `candidate_id_idx` ON `quotient_scores` (`candidate_id`);--> statement-breakpoint
CREATE INDEX `quotient_id_idx` ON `quotient_scores` (`quotient_id`);--> statement-breakpoint
CREATE INDEX `quotient_id_idx` ON `quotient_weightages` (`quotient_id`);--> statement-breakpoint
CREATE INDEX `company_id_idx` ON `quotient_weightages` (`company_id`);--> statement-breakpoint
CREATE INDEX `role_id_idx` ON `quotient_weightages` (`role_id`);--> statement-breakpoint
CREATE INDEX `company_id_idx` ON `roles` (`company_id`);
*/