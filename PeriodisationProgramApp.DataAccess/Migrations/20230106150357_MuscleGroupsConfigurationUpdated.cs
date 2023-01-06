using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class MuscleGroupsConfigurationUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_RepsInReserve",
                table: "TrainingSessions");

            migrationBuilder.DropCheckConstraint(
                name: "CK_MaintenanceVolume",
                table: "MuscleGroups");

            migrationBuilder.DropCheckConstraint(
                name: "CK_MaximumRecoverableVolume",
                table: "MuscleGroups");

            migrationBuilder.DropCheckConstraint(
                name: "CK_MinimumEffectiveVolume",
                table: "MuscleGroups");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("a83cc106-c6b1-44c3-a3c1-12d9a05f03a0"));

            migrationBuilder.AddColumn<int>(
                name: "AverageRecoveryTime",
                table: "MuscleGroups",
                type: "integer",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "MaximumRecoverableVolumeMultiplicator",
                table: "MuscleGroups",
                type: "integer",
                nullable: false,
                defaultValue: 5);

            migrationBuilder.AddCheckConstraint(
                name: "CK_RepsInReserve",
                table: "TrainingSessions",
                sql: "\"RepsInReserve\" > -1 AND \"RepsInReserve\" < 10");

            migrationBuilder.AddCheckConstraint(
                name: "CK_AverageRecoveryTime",
                table: "MuscleGroups",
                sql: "\"AverageRecoveryTime\" > 0 AND \"AverageRecoveryTime\" < 10");

            migrationBuilder.AddCheckConstraint(
                name: "CK_MaintenanceVolume",
                table: "MuscleGroups",
                sql: "\"MaintenanceVolume\" > -1 AND \"MaintenanceVolume\" < 100");

            migrationBuilder.AddCheckConstraint(
                name: "CK_MaximumRecoverableVolume",
                table: "MuscleGroups",
                sql: "\"MaximumRecoverableVolume\" > -1 AND \"MaximumRecoverableVolume\" < 100");

            migrationBuilder.AddCheckConstraint(
                name: "CK_MaximumRecoverableVolumeMultiplicator",
                table: "MuscleGroups",
                sql: "\"MaximumRecoverableVolumeMultiplicator\" > -1 AND \"MaximumRecoverableVolumeMultiplicator\" < 100");

            migrationBuilder.AddCheckConstraint(
                name: "CK_MinimumEffectiveVolume",
                table: "MuscleGroups",
                sql: "\"MinimumEffectiveVolume\" > -1 AND \"MinimumEffectiveVolume\" < 100");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_RepsInReserve",
                table: "TrainingSessions");

            migrationBuilder.DropCheckConstraint(
                name: "CK_AverageRecoveryTime",
                table: "MuscleGroups");

            migrationBuilder.DropCheckConstraint(
                name: "CK_MaintenanceVolume",
                table: "MuscleGroups");

            migrationBuilder.DropCheckConstraint(
                name: "CK_MaximumRecoverableVolume",
                table: "MuscleGroups");

            migrationBuilder.DropCheckConstraint(
                name: "CK_MaximumRecoverableVolumeMultiplicator",
                table: "MuscleGroups");

            migrationBuilder.DropCheckConstraint(
                name: "CK_MinimumEffectiveVolume",
                table: "MuscleGroups");

            migrationBuilder.DropColumn(
                name: "AverageRecoveryTime",
                table: "MuscleGroups");

            migrationBuilder.DropColumn(
                name: "MaximumRecoverableVolumeMultiplicator",
                table: "MuscleGroups");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Hash", "IsDeleted", "Salt", "Username" },
                values: new object[] { new Guid("a83cc106-c6b1-44c3-a3c1-12d9a05f03a0"), "pprcut47@yandex.ru", null, false, null, "patientZero" });

            migrationBuilder.AddCheckConstraint(
                name: "CK_RepsInReserve",
                table: "TrainingSessions",
                sql: "\"RepsInReserve\" > 0 AND \"RepsInReserve\" < 10");

            migrationBuilder.AddCheckConstraint(
                name: "CK_MaintenanceVolume",
                table: "MuscleGroups",
                sql: "\"MaintenanceVolume\" > 0 AND \"MaintenanceVolume\" < 100");

            migrationBuilder.AddCheckConstraint(
                name: "CK_MaximumRecoverableVolume",
                table: "MuscleGroups",
                sql: "\"MaximumRecoverableVolume\" > 0 AND \"MaximumRecoverableVolume\" < 100");

            migrationBuilder.AddCheckConstraint(
                name: "CK_MinimumEffectiveVolume",
                table: "MuscleGroups",
                sql: "\"MinimumEffectiveVolume\" > 0 AND \"MinimumEffectiveVolume\" < 100");
        }
    }
}
