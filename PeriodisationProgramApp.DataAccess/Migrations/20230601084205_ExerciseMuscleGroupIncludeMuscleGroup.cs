using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ExerciseMuscleGroupIncludeMuscleGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MuscleGroupType",
                table: "ExerciseMuscleGroups");

            migrationBuilder.AddColumn<Guid>(
                name: "MuscleGroupId",
                table: "ExerciseMuscleGroups",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseMuscleGroups_MuscleGroupId",
                table: "ExerciseMuscleGroups",
                column: "MuscleGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseMuscleGroups_MuscleGroups_MuscleGroupId",
                table: "ExerciseMuscleGroups",
                column: "MuscleGroupId",
                principalTable: "MuscleGroups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseMuscleGroups_MuscleGroups_MuscleGroupId",
                table: "ExerciseMuscleGroups");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseMuscleGroups_MuscleGroupId",
                table: "ExerciseMuscleGroups");

            migrationBuilder.DropColumn(
                name: "MuscleGroupId",
                table: "ExerciseMuscleGroups");

            migrationBuilder.AddColumn<int>(
                name: "MuscleGroupType",
                table: "ExerciseMuscleGroups",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
