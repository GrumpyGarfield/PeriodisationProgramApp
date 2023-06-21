using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class TargetMuscleGroupToExercseAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TargetMuscleGroupId",
                table: "Exercises",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_TargetMuscleGroupId",
                table: "Exercises",
                column: "TargetMuscleGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_MuscleGroups_TargetMuscleGroupId",
                table: "Exercises",
                column: "TargetMuscleGroupId",
                principalTable: "MuscleGroups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_MuscleGroups_TargetMuscleGroupId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_TargetMuscleGroupId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "TargetMuscleGroupId",
                table: "Exercises");
        }
    }
}
