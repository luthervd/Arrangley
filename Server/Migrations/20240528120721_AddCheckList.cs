using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace OrganizeApi.Migrations
{
    /// <inheritdoc />
    public partial class AddCheckList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CheckListId",
                table: "TodoItem",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Checklist",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Checklist", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TodoItem_CheckListId",
                table: "TodoItem",
                column: "CheckListId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItem_Checklist_CheckListId",
                table: "TodoItem",
                column: "CheckListId",
                principalTable: "Checklist",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoItem_Checklist_CheckListId",
                table: "TodoItem");

            migrationBuilder.DropTable(
                name: "Checklist");

            migrationBuilder.DropIndex(
                name: "IX_TodoItem_CheckListId",
                table: "TodoItem");

            migrationBuilder.DropColumn(
                name: "CheckListId",
                table: "TodoItem");
        }
    }
}
