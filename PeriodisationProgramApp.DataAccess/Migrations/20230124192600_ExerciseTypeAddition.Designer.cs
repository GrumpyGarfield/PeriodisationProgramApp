﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PeriodisationProgramApp.DataAccess;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20230124192600_ExerciseTypeAddition")]
    partial class ExerciseTypeAddition
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.Exercise", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<int>("FatigueMagnitude")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<int>("RawStimulusMagnitude")
                        .HasColumnType("integer");

                    b.Property<double>("StimulusToFatigueRatio")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasPrecision(38, 1)
                        .HasColumnType("double precision")
                        .HasComputedColumnSql("cast(\"RawStimulusMagnitude\" + 1 as decimal) / (\"FatigueMagnitude\" + 1)", true);

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Exercises", t =>
                        {
                            t.HasCheckConstraint("CK_FatigueMagnitude", "\"FatigueMagnitude\" > -1 AND \"FatigueMagnitude\" < 10");

                            t.HasCheckConstraint("CK_RawStimulusMagnitude", "\"RawStimulusMagnitude\" > -1 AND \"RawStimulusMagnitude\" < 10");
                        });
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.ExerciseMuscleGroup", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<Guid>("ExerciseId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("MuscleGroupId")
                        .HasColumnType("uuid");

                    b.Property<int>("MuscleGroupRole")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseId");

                    b.HasIndex("MuscleGroupId");

                    b.ToTable("ExerciseMuscleGroups");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.MuscleGroup", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("AverageRecoveryTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(1);

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<int>("MaintenanceVolume")
                        .HasColumnType("integer");

                    b.Property<int>("MaximumRecoverableVolume")
                        .HasColumnType("integer");

                    b.Property<int>("MaximumRecoverableVolumeMultiplicator")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(5);

                    b.Property<int>("MinimumEffectiveVolume")
                        .HasColumnType("integer");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("MuscleGroups", t =>
                        {
                            t.HasCheckConstraint("CK_AverageRecoveryTime", "\"AverageRecoveryTime\" > 0 AND \"AverageRecoveryTime\" < 10");

                            t.HasCheckConstraint("CK_MaintenanceVolume", "\"MaintenanceVolume\" > -1 AND \"MaintenanceVolume\" < 100");

                            t.HasCheckConstraint("CK_MaximumRecoverableVolume", "\"MaximumRecoverableVolume\" > -1 AND \"MaximumRecoverableVolume\" < 100");

                            t.HasCheckConstraint("CK_MaximumRecoverableVolumeMultiplicator", "\"MaximumRecoverableVolumeMultiplicator\" > -1 AND \"MaximumRecoverableVolumeMultiplicator\" < 100");

                            t.HasCheckConstraint("CK_MinimumEffectiveVolume", "\"MinimumEffectiveVolume\" > -1 AND \"MinimumEffectiveVolume\" < 100");
                        });
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingProgram", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("TrainingPrograms");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingSession", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<int>("DayOfWeek")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<int>("RepsInReserve")
                        .HasColumnType("integer");

                    b.Property<Guid?>("TrainingProgramId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<int>("Week")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TrainingProgramId");

                    b.ToTable("TrainingSessions", t =>
                        {
                            t.HasCheckConstraint("CK_RepsInReserve", "\"RepsInReserve\" > -1 AND \"RepsInReserve\" < 10");

                            t.HasCheckConstraint("CK_Week", "\"Week\" > 0 AND \"Week\" < 100");
                        });
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingSessionExercise", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<Guid?>("ExerciseId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<int>("Sets")
                        .HasColumnType("integer");

                    b.Property<Guid>("TrainingSessionId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseId");

                    b.HasIndex("TrainingSessionId");

                    b.ToTable("TrainingSessionsExercises", t =>
                        {
                            t.HasCheckConstraint("CK_Sets", "\"Sets\" > 0 AND \"Sets\" < 100");
                        });
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Hash")
                        .HasColumnType("text");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Salt")
                        .HasColumnType("text");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.Exercise", b =>
                {
                    b.HasOne("PeriodisationProgramApp.Domain.Entities.User", null)
                        .WithMany("Exercises")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.ExerciseMuscleGroup", b =>
                {
                    b.HasOne("PeriodisationProgramApp.Domain.Entities.Exercise", null)
                        .WithMany("ExerciseMuscleGroups")
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PeriodisationProgramApp.Domain.Entities.MuscleGroup", "MuscleGroup")
                        .WithMany()
                        .HasForeignKey("MuscleGroupId");

                    b.Navigation("MuscleGroup");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.MuscleGroup", b =>
                {
                    b.HasOne("PeriodisationProgramApp.Domain.Entities.User", null)
                        .WithMany("MuscleGroups")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingProgram", b =>
                {
                    b.HasOne("PeriodisationProgramApp.Domain.Entities.User", null)
                        .WithMany("TrainingPrograms")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingSession", b =>
                {
                    b.HasOne("PeriodisationProgramApp.Domain.Entities.TrainingProgram", null)
                        .WithMany("Sessions")
                        .HasForeignKey("TrainingProgramId");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingSessionExercise", b =>
                {
                    b.HasOne("PeriodisationProgramApp.Domain.Entities.Exercise", "Exercise")
                        .WithMany()
                        .HasForeignKey("ExerciseId");

                    b.HasOne("PeriodisationProgramApp.Domain.Entities.TrainingSession", null)
                        .WithMany("Exercises")
                        .HasForeignKey("TrainingSessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exercise");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.Exercise", b =>
                {
                    b.Navigation("ExerciseMuscleGroups");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingProgram", b =>
                {
                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingSession", b =>
                {
                    b.Navigation("Exercises");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.User", b =>
                {
                    b.Navigation("Exercises");

                    b.Navigation("MuscleGroups");

                    b.Navigation("TrainingPrograms");
                });
#pragma warning restore 612, 618
        }
    }
}
