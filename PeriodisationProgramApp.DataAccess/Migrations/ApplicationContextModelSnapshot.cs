﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PeriodisationProgramApp.DataAccess;

#nullable disable

namespace PeriodisationProgramApp.DataAccess.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<int>("RawStimulusMagnitude")
                        .HasColumnType("integer");

                    b.Property<double>("StimulusToFatigueRatio")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("double precision")
                        .HasComputedColumnSql("(\"RawStimulusMagnitude\" + 1) / (\"FatigueMagnitude\" + 1)", true);

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAddOrUpdate()
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
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("ExerciseId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("MuscleGroupId")
                        .HasColumnType("uuid");

                    b.Property<int>("MuscleGroupKind")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

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

                    b.Property<int>("MinimumEffectiveVolume")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("MuscleGroups", t =>
                        {
                            t.HasCheckConstraint("CK_MaintenanceVolume", "\"MaintenanceVolume\" > 0 AND \"MaintenanceVolume\" < 100");

                            t.HasCheckConstraint("CK_MaximumRecoverableVolume", "\"MaximumRecoverableVolume\" > 0 AND \"MaximumRecoverableVolume\" < 100");

                            t.HasCheckConstraint("CK_MinimumEffectiveVolume", "\"MinimumEffectiveVolume\" > 0 AND \"MinimumEffectiveVolume\" < 100");
                        });
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingProgram", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

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
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("DayOfWeek")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<int>("RepsInReserve")
                        .HasColumnType("integer");

                    b.Property<Guid?>("TrainingProgramId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Week")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TrainingProgramId");

                    b.ToTable("TrainingSessions");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.TrainingSessionExercise", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("ExerciseId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<int>("Sets")
                        .HasColumnType("integer");

                    b.Property<Guid>("TrainingSessionId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseId");

                    b.HasIndex("TrainingSessionId");

                    b.ToTable("TrainingSessionsExercises");
                });

            modelBuilder.Entity("PeriodisationProgramApp.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Hash")
                        .HasColumnType("text");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Salt")
                        .HasColumnType("text");

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("a83cc106-c6b1-44c3-a3c1-12d9a05f03a0"),
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "pprcut47@yandex.ru",
                            IsDeleted = false,
                            Updated = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Username = "patientZero"
                        });
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
