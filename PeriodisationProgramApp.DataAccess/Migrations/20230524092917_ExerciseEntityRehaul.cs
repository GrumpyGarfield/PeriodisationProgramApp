using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ExerciseEntityRehaul : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Likes",
                table: "Exercises",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rates",
                table: "Exercises",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Exercises",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "ExerciseUsersData",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ExerciseId = table.Column<Guid>(type: "uuid", nullable: false),
                    RawStimulusMagnitude = table.Column<int>(type: "integer", nullable: false),
                    FatigueMagnitude = table.Column<int>(type: "integer", nullable: false),
                    StimulusToFatigueRatio = table.Column<double>(type: "double precision", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseUsersData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExerciseUsersData_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserExerciseLikes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ExerciseId = table.Column<Guid>(type: "uuid", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserExerciseLikes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserExerciseLikes_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserExerciseLikes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserExerciseRatings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ExerciseId = table.Column<Guid>(type: "uuid", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserExerciseRatings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserExerciseRatings_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserExerciseRatings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseUsersData_ExerciseId",
                table: "ExerciseUsersData",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_UserExerciseLikes_ExerciseId",
                table: "UserExerciseLikes",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_UserExerciseLikes_UserId",
                table: "UserExerciseLikes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserExerciseRatings_ExerciseId",
                table: "UserExerciseRatings",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_UserExerciseRatings_UserId",
                table: "UserExerciseRatings",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseUsersData");

            migrationBuilder.DropTable(
                name: "UserExerciseLikes");

            migrationBuilder.DropTable(
                name: "UserExerciseRatings");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "Rates",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Exercises");
        }
    }
}
