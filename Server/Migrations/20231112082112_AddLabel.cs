using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrganizeApi.Migrations
{
    /// <inheritdoc />
    public partial class AddLabel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "TodoItem",
                type: "text",
                nullable: false,
                defaultValue: "Personal");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Label",
                table: "TodoItem");
        }
    }
}
