ALTER TABLE `candidates` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `companies` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `parameter_scores` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `parameter_weightages` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `parameters` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `quotient_scores` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `quotient_weightages` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `quotients` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `roles` ADD `created_at` timestamp DEFAULT (now());