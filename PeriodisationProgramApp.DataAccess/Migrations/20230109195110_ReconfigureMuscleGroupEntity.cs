using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ReconfigureMuscleGroupEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "MuscleGroups");

            migrationBuilder.RenameColumn(
                name: "MuscleGroupKind",
                table: "ExerciseMuscleGroups",
                newName: "MuscleGroupRole");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "MuscleGroups",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "MuscleGroups");

            migrationBuilder.RenameColumn(
                name: "MuscleGroupRole",
                table: "ExerciseMuscleGroups",
                newName: "MuscleGroupKind");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "MuscleGroups",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }
    }
}
