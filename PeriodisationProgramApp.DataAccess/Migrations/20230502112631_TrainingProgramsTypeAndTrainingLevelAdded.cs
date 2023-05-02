using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class TrainingProgramsTypeAndTrainingLevelAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TrainingLevel",
                table: "TrainingPrograms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "TrainingPrograms",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrainingLevel",
                table: "TrainingPrograms");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "TrainingPrograms");
        }
    }
}
