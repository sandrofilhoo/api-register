import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, name: "sandro", email: "sandrosouzafilho@hotmail.com", date_of_birth: "2024-12-04 18:17:40.065 -0300" }
    ]);
};
