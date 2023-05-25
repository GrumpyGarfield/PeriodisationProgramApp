using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class MuscleGroupEntityRehaul : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroups_Users_UserId",
                table: "MuscleGroups");

            migrationBuilder.DropIndex(
                name: "IX_MuscleGroups_UserId",
                table: "MuscleGroups");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MuscleGroups");

            migrationBuilder.CreateTable(
                name: "MuscleGroupUsersData",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    MuscleGroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    MaintenanceVolume = table.Column<int>(type: "integer", nullable: false),
                    MinimumEffectiveVolume = table.Column<int>(type: "integer", nullable: false),
                    MaximumRecoverableVolume = table.Column<int>(type: "integer", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MuscleGroupUsersData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MuscleGroupUsersData_MuscleGroups_MuscleGroupId",
                        column: x => x.MuscleGroupId,
                        principalTable: "MuscleGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MuscleGroupUsersData_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MuscleGroupUsersData_MuscleGroupId",
                table: "MuscleGroupUsersData",
                column: "MuscleGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_MuscleGroupUsersData_UserId",
                table: "MuscleGroupUsersData",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MuscleGroupUsersData");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "MuscleGroups",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_MuscleGroups_UserId",
                table: "MuscleGroups",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroups_Users_UserId",
                table: "MuscleGroups",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
