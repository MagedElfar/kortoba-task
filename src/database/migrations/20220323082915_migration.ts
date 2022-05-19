export const up = function (knex:any) {
    return knex.schema
        .createTable("users", function (table:any) {
            table.increments();
            table.string("username").unique().notNullable();
            table.string("email").unique().notNullable();
            table.string("password").notNullable();
            table.timestamps(true, true);
        })
        .createTable("products", function (table:any) {
            table.increments();
            table.string("title").unique().notNullable();
            table.decimal("price" , 14 , 2).notNullable();
            table.string("image").notNullable();
            table.integer("user").unsigned();
            table.timestamps(true, true);
            table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
        })
        .then(console.log("tables are created"));
    };

export const down = function (knex:any) {
return knex.schema
    .dropTable("users")
    .dropTable("products")
};
