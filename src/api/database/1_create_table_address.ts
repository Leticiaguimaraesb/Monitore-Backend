import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("address", (table) => {
    table.increments();
    table.string("street");
    table.integer("number");
    table.string("complement");
    table.string("neighborhood");
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("cep").notNullable();
    table.string("reference_point").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("address");
}
