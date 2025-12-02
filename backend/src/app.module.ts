import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
      envFilePath: '.env', // Path to .env file
      ignoreEnvFile: false, // Don't ignore .env file
    }),
    // MongoDB connection with ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri =
          configService.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/job-tracker';

        // Log masked connection string for debugging (hide password)
        const maskedUri = uri.replace(
          /mongodb\+srv:\/\/([^:]+):([^@]+)@/,
          'mongodb+srv://$1:***@',
        );
        console.log('🔗 MongoDB Connection String (masked):', maskedUri);
        console.log('🔗 MongoDB URI length:', uri.length);
        console.log('🔗 MongoDB URI starts with:', uri.substring(0, 20));

        return { uri };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    JobsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
