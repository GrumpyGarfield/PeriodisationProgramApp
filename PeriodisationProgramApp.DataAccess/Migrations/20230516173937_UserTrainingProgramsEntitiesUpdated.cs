using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UserTrainingProgramsEntitiesUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramLikes_TrainingPrograms_TrainingProgramId",
                table: "UserTrainingProgramLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramLikes_Users_UserId",
                table: "UserTrainingProgramLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramRatings_TrainingPrograms_TrainingProgram~",
                table: "UserTrainingProgramRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramRatings_Users_UserId",
                table: "UserTrainingProgramRatings");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "UserTrainingProgramRatings",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "TrainingProgramId",
                table: "UserTrainingProgramRatings",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "UserTrainingProgramLikes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "TrainingProgramId",
                table: "UserTrainingProgramLikes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramLikes_TrainingPrograms_TrainingProgramId",
                table: "UserTrainingProgramLikes",
                column: "TrainingProgramId",
                principalTable: "TrainingPrograms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramLikes_Users_UserId",
                table: "UserTrainingProgramLikes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramRatings_TrainingPrograms_TrainingProgram~",
                table: "UserTrainingProgramRatings",
                column: "TrainingProgramId",
                principalTable: "TrainingPrograms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramRatings_Users_UserId",
                table: "UserTrainingProgramRatings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramLikes_TrainingPrograms_TrainingProgramId",
                table: "UserTrainingProgramLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramLikes_Users_UserId",
                table: "UserTrainingProgramLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramRatings_TrainingPrograms_TrainingProgram~",
                table: "UserTrainingProgramRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramRatings_Users_UserId",
                table: "UserTrainingProgramRatings");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "UserTrainingProgramRatings",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "TrainingProgramId",
                table: "UserTrainingProgramRatings",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "UserTrainingProgramLikes",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "TrainingProgramId",
                table: "UserTrainingProgramLikes",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramLikes_TrainingPrograms_TrainingProgramId",
                table: "UserTrainingProgramLikes",
                column: "TrainingProgramId",
                principalTable: "TrainingPrograms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramLikes_Users_UserId",
                table: "UserTrainingProgramLikes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramRatings_TrainingPrograms_TrainingProgram~",
                table: "UserTrainingProgramRatings",
                column: "TrainingProgramId",
                principalTable: "TrainingPrograms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramRatings_Users_UserId",
                table: "UserTrainingProgramRatings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
