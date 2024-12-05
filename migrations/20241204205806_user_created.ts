import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // Coluna ID autoincrementável
    table.string("name").notNullable(); // Nome do usuário
    table.string("email").notNullable().unique(); // Email único
    table.date("date_of_birth").notNullable(); // Data de nascimento
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Timestamp de criação
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Timestamp de atualização
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users"); // Remove a tabela em caso de rollback
}