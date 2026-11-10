import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { TrainersModule } from './trainers/trainers.module';
import { MembershipPlansModule } from './membership_plans/membership_plans.module';

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
        host: config.get<string>('DB_HOST', '127.0.0.1'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USER', 'root'),
        password: config.get<string>('DB_PASSWORD', 'root123'),
        database: config.get<string>('DB_NAME', 'gym_management_db'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MembersModule,
    TrainersModule,
    MembershipPlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}