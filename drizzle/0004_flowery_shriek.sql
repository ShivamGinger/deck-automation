CREATE TABLE `candidate_status` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`candidate_id` bigint NOT NULL,
	`profile_shr_date` date,
	`status` enum('yet_to_share','joined','negotiation','on_hold','feedback_pending','dropped_out','rejected','in_process') NOT NULL,
	`round_done` tinyint,
	`reason_reject` varchar(255),
	CONSTRAINT `candidate_status_id` PRIMARY KEY(`id`),
	CONSTRAINT `candidate_id` UNIQUE(`candidate_id`)
);
--> statement-breakpoint
CREATE TABLE `group_permissions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`group_id` bigint NOT NULL,
	`permission_type` varchar(255),
	`permission_value` tinyint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `group_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`group_name` varchar(255) NOT NULL,
	`candidate_tracking_can_read` tinyint DEFAULT 0,
	`candidate_tracking_can_edit` tinyint DEFAULT 0,
	`candidate_tracking_can_create` tinyint DEFAULT 0,
	`deck_automation_can_read` tinyint DEFAULT 0,
	`deck_automation_can_edit` tinyint DEFAULT 0,
	`deck_automation_can_create` tinyint DEFAULT 0,
	`all_quotients_can_read` tinyint DEFAULT 0,
	`all_quotients_can_edit` tinyint DEFAULT 0,
	`all_quotients_can_create` tinyint DEFAULT 0,
	`users_can_read` tinyint DEFAULT 0,
	`users_can_create` tinyint DEFAULT 0,
	`users_can_delete` tinyint DEFAULT 0,
	`groups_can_read` tinyint DEFAULT 0,
	`groups_can_edit` tinyint DEFAULT 0,
	`groups_can_create` tinyint DEFAULT 0,
	`groups_can_delete` tinyint DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `status_history` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`candidate_id` bigint NOT NULL,
	`profile_shr_date` date,
	`status` enum('yet_to_share','joined','negotiation','on_hold','feedback_pending','dropped_out','rejected','in_process') NOT NULL,
	`round_done` tinyint,
	`reason_reject` varchar(255),
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `status_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_groups` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`group_id` bigint NOT NULL,
	CONSTRAINT `user_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `roles` MODIFY COLUMN `created_at` timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `candidates` ADD `email` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `candidates` ADD `curr_pos` varchar(200);--> statement-breakpoint
ALTER TABLE `candidates` ADD `curr_loc` varchar(100);--> statement-breakpoint
ALTER TABLE `candidates` ADD `experience` varchar(30);--> statement-breakpoint
ALTER TABLE `candidates` ADD `ph_num` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `candidates` ADD `fixed_lpa` decimal(5,2);--> statement-breakpoint
ALTER TABLE `candidates` ADD `var_lpa` decimal(5,2);--> statement-breakpoint
ALTER TABLE `candidates` ADD `expected_ctc` varchar(255);--> statement-breakpoint
ALTER TABLE `candidates` ADD `notice_period` varchar(255);--> statement-breakpoint
ALTER TABLE `candidates` ADD `description` varchar(255);--> statement-breakpoint
ALTER TABLE `candidates` ADD `achievement` json;--> statement-breakpoint
ALTER TABLE `candidates` ADD `gender` enum('male','female','other');--> statement-breakpoint
ALTER TABLE `candidates` ADD `curr_cmp` varchar(255);--> statement-breakpoint
ALTER TABLE `candidates` ADD `esop_rsu` decimal(5,2);--> statement-breakpoint
ALTER TABLE `users` ADD `first_name` varchar(200);--> statement-breakpoint
ALTER TABLE `users` ADD `last_name` varchar(200);--> statement-breakpoint
ALTER TABLE `users` ADD `is_admin` tinyint DEFAULT 0;--> statement-breakpoint
CREATE INDEX `candidate_id_idx` ON `candidate_status` (`candidate_id`);--> statement-breakpoint
CREATE INDEX `group_id_idx` ON `group_permissions` (`group_id`);--> statement-breakpoint
CREATE INDEX `group_id_idx` ON `user_groups` (`group_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_groups` (`user_id`);