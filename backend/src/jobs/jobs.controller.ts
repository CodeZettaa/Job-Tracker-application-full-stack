import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll(@Query() filters: FilterJobsDto, @GetUser() user: any) {
    return this.jobsService.findAll(user.userId, filters);
  }

  @Get('stats')
  getStats(@GetUser() user: any) {
    return this.jobsService.getStats(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.jobsService.findOne(id, user.userId);
  }

  @Post()
  create(@Body() createJobDto: CreateJobDto, @GetUser() user: any) {
    return this.jobsService.create(createJobDto, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @GetUser() user: any,
  ) {
    return this.jobsService.update(id, updateJobDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: any) {
    this.jobsService.remove(id, user.userId);
    return { message: 'Job deleted successfully' };
  }
}

