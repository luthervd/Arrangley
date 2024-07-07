using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrganizeApi.Migrations
{
    /// <inheritdoc />
    public partial class CheckListLabel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "Checklist",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Label",
                table: "Checklist");
        }
    }
}
