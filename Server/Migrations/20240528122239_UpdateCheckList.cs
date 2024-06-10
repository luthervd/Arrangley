using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrganizeApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCheckList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Checklist",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Checklist",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Checklist");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Checklist");
        }
    }
}
