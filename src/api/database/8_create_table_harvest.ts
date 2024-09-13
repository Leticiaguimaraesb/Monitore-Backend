import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("harvest", (table) => {
    table.increments();
    table.date("date").notNullable();
    table.float("bags").notNullable();
    table.integer("plot_id").notNullable();
    table.foreign("plot_id").references("plot.id");
    table.integer("planting_id").notNullable();
    table.foreign("planting_id").references("planting.id");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.integer("farm_id").notNullable();
    table.foreign("farm_id").references("farm.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("harvest");
}
