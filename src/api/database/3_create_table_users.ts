import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("cpf_cnpj").notNullable();
    table.string("name").notNullable();
    table.string("celphone").notNullable();
    table.string("email");
    table.string("password").notNullable();
    table.string("userType").notNullable();
    table.integer("farm_id").notNullable();
    table.foreign("farm_id").references("farm.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
