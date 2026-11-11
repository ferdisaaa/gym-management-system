import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { TrainersModule } from './trainers/trainers.module';
import { MembershipPlansModule } from './membership_plans/membership_plans.module';
import { MembershipsModule } from './memberships/memberships.module';
import { TrainingSessionsModule } from './training-sessions/training-sessions.module';
import { SessionParticipantsModule } from './session-participants/session-participants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvVars: true,
    }),
    TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('DB_HOST', 'localhost'),
    port: config.get<number>('DB_PORT', 5432),
    username: config.get<string>('DB_USER', 'postgres'),
    password: config.get<string>('DB_PASSWORD', ''),
    database: config.get<string>('DB_NAME', 'gym_management_db'),
    autoLoadEntities: true,
    synchronize: true,
  }),
}),
    MembersModule,
    TrainersModule,
    MembershipPlansModule,
    MembershipsModule,
    TrainingSessionsModule,
    SessionParticipantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}