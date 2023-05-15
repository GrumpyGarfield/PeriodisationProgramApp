using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UsersTableFirebaseIdAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramLike_TrainingPrograms_TrainingProgramId",
                table: "UserTrainingProgramLike");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramLike_Users_UserId",
                table: "UserTrainingProgramLike");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramRating_TrainingPrograms_TrainingProgramId",
                table: "UserTrainingProgramRating");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTrainingProgramRating_Users_UserId",
                table: "UserTrainingProgramRating");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTrainingProgramRating",
                table: "UserTrainingProgramRating");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTrainingProgramLike",
                table: "UserTrainingProgramLike");

            migrationBuilder.RenameTable(
                name: "UserTrainingProgramRating",
                newName: "UserTrainingProgramRatings");

            migrationBuilder.RenameTable(
                name: "UserTrainingProgramLike",
                newName: "UserTrainingProgramLikes");

            migrationBuilder.RenameIndex(
                name: "IX_UserTrainingProgramRating_UserId",
                table: "UserTrainingProgramRatings",
                newName: "IX_UserTrainingProgramRatings_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserTrainingProgramRating_TrainingProgramId",
                table: "UserTrainingProgramRatings",
                newName: "IX_UserTrainingProgramRatings_TrainingProgramId");

            migrationBuilder.RenameIndex(
                name: "IX_UserTrainingProgramLike_UserId",
                table: "UserTrainingProgramLikes",
                newName: "IX_UserTrainingProgramLikes_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserTrainingProgramLike_TrainingProgramId",
                table: "UserTrainingProgramLikes",
                newName: "IX_UserTrainingProgramLikes_TrainingProgramId");

            migrationBuilder.AddColumn<string>(
                name: "FirebaseId",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTrainingProgramRatings",
                table: "UserTrainingProgramRatings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTrainingProgramLikes",
                table: "UserTrainingProgramLikes",
                column: "Id");

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
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTrainingProgramRatings",
                table: "UserTrainingProgramRatings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTrainingProgramLikes",
                table: "UserTrainingProgramLikes");

            migrationBuilder.DropColumn(
                name: "FirebaseId",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "UserTrainingProgramRatings",
                newName: "UserTrainingProgramRating");

            migrationBuilder.RenameTable(
                name: "UserTrainingProgramLikes",
                newName: "UserTrainingProgramLike");

            migrationBuilder.RenameIndex(
                name: "IX_UserTrainingProgramRatings_UserId",
                table: "UserTrainingProgramRating",
                newName: "IX_UserTrainingProgramRating_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserTrainingProgramRatings_TrainingProgramId",
                table: "UserTrainingProgramRating",
                newName: "IX_UserTrainingProgramRating_TrainingProgramId");

            migrationBuilder.RenameIndex(
                name: "IX_UserTrainingProgramLikes_UserId",
                table: "UserTrainingProgramLike",
                newName: "IX_UserTrainingProgramLike_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserTrainingProgramLikes_TrainingProgramId",
                table: "UserTrainingProgramLike",
                newName: "IX_UserTrainingProgramLike_TrainingProgramId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTrainingProgramRating",
                table: "UserTrainingProgramRating",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTrainingProgramLike",
                table: "UserTrainingProgramLike",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramLike_TrainingPrograms_TrainingProgramId",
                table: "UserTrainingProgramLike",
                column: "TrainingProgramId",
                principalTable: "TrainingPrograms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramLike_Users_UserId",
                table: "UserTrainingProgramLike",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramRating_TrainingPrograms_TrainingProgramId",
                table: "UserTrainingProgramRating",
                column: "TrainingProgramId",
                principalTable: "TrainingPrograms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTrainingProgramRating_Users_UserId",
                table: "UserTrainingProgramRating",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
