import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("stages", (table) => {
    table.increments();
    table.string("stage").notNullable();
    table.integer("culture_id").notNullable();
    table.foreign("culture_id").references("culture.id");
    table.integer("order");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("stages");
}
