using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ExerciseConfigurationUpdated2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "StimulusToFatigueRatio",
                table: "Exercises",
                type: "double precision",
                precision: 38,
                scale: 1,
                nullable: false,
                computedColumnSql: "cast(\"RawStimulusMagnitude\" + 1 as decimal) / (\"FatigueMagnitude\" + 1)",
                stored: true,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldPrecision: 38,
                oldScale: 1,
                oldComputedColumnSql: "(\"RawStimulusMagnitude\" + 1) / (\"FatigueMagnitude\" + 1)",
                oldStored: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "StimulusToFatigueRatio",
                table: "Exercises",
                type: "double precision",
                precision: 38,
                scale: 1,
                nullable: false,
                computedColumnSql: "(\"RawStimulusMagnitude\" + 1) / (\"FatigueMagnitude\" + 1)",
                stored: true,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldPrecision: 38,
                oldScale: 1,
                oldComputedColumnSql: "cast(\"RawStimulusMagnitude\" + 1 as decimal) / (\"FatigueMagnitude\" + 1)",
                oldStored: true);
        }
    }
}
