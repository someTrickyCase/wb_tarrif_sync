import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("tariffs", (table) => {
		table.increments("id").primary();

		table.string("warehouse_name").notNullable();
		table.string("geo_name").notNullable();

		table.decimal("box_delivery_base", 10, 4).notNullable();
		table.decimal("box_delivery_coef_expr", 10, 4).notNullable();
		table.decimal("box_delivery_liter", 10, 4).notNullable();
		table.decimal("box_delivery_marketplace_base", 10, 4).notNullable();
		table.decimal("box_delivery_marketplace_coef_expr", 10, 4).notNullable();
		table.decimal("box_delivery_marketplace_liter", 10, 4).notNullable();

		table.decimal("box_storage_base", 10, 4).notNullable();
		table.decimal("box_storage_coef_expr", 10, 4).notNullable();
		table.decimal("box_storage_liter", 10, 4).notNullable();

		table.date("tariff_date").notNullable();

		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());

		table.index(["warehouse_name", "tariff_date"]);
		table.index(["tariff_date"]);

		table.unique(["warehouse_name", "tariff_date"]);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("tariffs");
}
