CREATE TABLE `doctors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT 'doctor' NOT NULL,
	`type` text DEFAULT 'doctor' NOT NULL,
	`address` text DEFAULT '' NOT NULL,
	`phone` text(11) DEFAULT '' NOT NULL,
	`phone2` text(11) DEFAULT '' NOT NULL,
	`colabStartDate` text DEFAULT (CURRENT_DATE) NOT NULL,
	`isActive` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `doctors_id_unique` ON `doctors` (`id`);