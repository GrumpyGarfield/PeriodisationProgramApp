using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ExerciseTypeAddition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Exercises",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Exercises");
        }
    }
}
