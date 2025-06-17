// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator, pgEnum } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `delphi-ai_${name}`);
export const reportTypeEnum = pgEnum("report_type", [
  "market_analysis",
  "viability",
  "financials",
]);

export const users = createTable(
  "users",
  (d) => ({
    id: d.uuid("id").primaryKey(), // Clerk User ID
    email: d.varchar("email", { length: 256 }).notNull().unique(),
  }),
  (t) => [index("email_idx").on(t.email)],
);

export const businessIdeas = createTable(
  "business_ideas",
  (d) => ({
    id: d.uuid("id").primaryKey().defaultRandom(),
    userId: d
      .uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: d.varchar("name", { length: 128 }).notNull(),
    concept: d.text("concept"),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("business_ideas_user_id_idx").on(t.userId),
    index("business_ideas_name_idx").on(t.name),
    index("business_ideas_concept_idx").on(t.concept),
  ],
);

export const viabilityReports = createTable(
  "viability_reports",
  (d) => ({
    id: d.uuid("id").primaryKey().defaultRandom(),
    businessIdeaId: d
      .uuid("business_idea_id")
      .notNull()
      .references(() => businessIdeas.id, { onDelete: "cascade" }),
    content: d.text("content").notNull(),
    url: d.varchar("url", { length: 512 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    version: d.integer("version").notNull().default(1), // Versioning for inputs
    isActive: d.boolean("is_active").notNull().default(true), // Soft delete
    isArchived: d.boolean("is_archived").notNull().default(false), // Archive flag
    archivedAt: d.timestamp({ withTimezone: true }), // Timestamp for archiving
  }),
  (t) => [
    index("viability_reports_business_idea_id_idx").on(t.businessIdeaId),
    index("viability_reports_url_idx").on(t.url),
  ],
);

export const marketAnalysisReports = createTable(
  "market_analysis_reports",
  (d) => ({
    id: d.uuid("id").primaryKey().defaultRandom(),
    businessIdeaId: d
      .uuid("business_idea_id")
      .notNull()
      .references(() => businessIdeas.id, { onDelete: "cascade" }),
    content: d.text("content").notNull(),
    url: d.varchar("url", { length: 512 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    version: d.integer("version").notNull().default(1), // Versioning for inputs
    isActive: d.boolean("is_active").notNull().default(true), // Soft delete
    isArchived: d.boolean("is_archived").notNull().default(false), // Archive flag
    archivedAt: d.timestamp({ withTimezone: true }), // Timestamp for archiving
  }),
  (t) => [
    index("market_analysis_reports_business_idea_id_idx").on(t.businessIdeaId),
    index("market_analysis_reports_url_idx").on(t.url),
  ],
);
export const financialProjections = createTable(
  "financial_projections",
  (d) => ({
    id: d.uuid("id").primaryKey().defaultRandom(),
    businessIdeaId: d
      .uuid("business_idea_id")
      .notNull()
      .references(() => businessIdeas.id, { onDelete: "cascade" }),
    content: d.text("content").notNull(),
    url: d.varchar("url", { length: 512 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    version: d.integer("version").notNull().default(1), // Versioning for inputs
    isActive: d.boolean("is_active").notNull().default(true), // Soft delete
    isArchived: d.boolean("is_archived").notNull().default(false), // Archive flag
    archivedAt: d.timestamp({ withTimezone: true }), // Timestamp for archiving
  }),
  (t) => [
    index("financial_projections_business_idea_id_idx").on(t.businessIdeaId),
    index("financial_projections_url_idx").on(t.url),
  ],
);

export const businessInputs = createTable(
  "business_inputs",
  (d) => ({
    id: d.uuid("id").primaryKey().defaultRandom(),
    businessIdeaId: d
      .uuid("business_idea_id")
      .notNull()
      .references(() => businessIdeas.id, { onDelete: "cascade" }),
    section: d.text("section").notNull(), //eg: market_analysis, viability, financials
    reportType: reportTypeEnum().notNull(),
    content: d.jsonb("content").notNull(), // JSONB to store structured data
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("business_inputs_business_idea_id_idx").on(t.businessIdeaId),
    index("business_inputs_section_idx").on(t.section),
  ],
);
