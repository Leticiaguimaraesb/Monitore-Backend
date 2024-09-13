import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("farm", (table) => {
    table.increments();
    table.string("cnpj").notNullable();
    table.string("name").notNullable();
    table.string("phone").notNullable();
    table.integer("address_id").notNullable();
    table.foreign("address_id").references("address.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("farm");
}
