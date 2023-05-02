using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class TrainingProgramsLikesAndRatingAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Likes",
                table: "TrainingPrograms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "TrainingPrograms",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "UserTrainingProgramLike",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    TrainingProgramId = table.Column<Guid>(type: "uuid", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTrainingProgramLike", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTrainingProgramLike_TrainingPrograms_TrainingProgramId",
                        column: x => x.TrainingProgramId,
                        principalTable: "TrainingPrograms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserTrainingProgramLike_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTrainingProgramRating",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    TrainingProgramId = table.Column<Guid>(type: "uuid", nullable: true),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTrainingProgramRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTrainingProgramRating_TrainingPrograms_TrainingProgramId",
                        column: x => x.TrainingProgramId,
                        principalTable: "TrainingPrograms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserTrainingProgramRating_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserTrainingProgramLike_TrainingProgramId",
                table: "UserTrainingProgramLike",
                column: "TrainingProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTrainingProgramLike_UserId",
                table: "UserTrainingProgramLike",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTrainingProgramRating_TrainingProgramId",
                table: "UserTrainingProgramRating",
                column: "TrainingProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTrainingProgramRating_UserId",
                table: "UserTrainingProgramRating",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTrainingProgramLike");

            migrationBuilder.DropTable(
                name: "UserTrainingProgramRating");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "TrainingPrograms");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "TrainingPrograms");
        }
    }
}
