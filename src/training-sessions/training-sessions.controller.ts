
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';

import { TrainingSessionsService } from './training-sessions.service';
import { CreateTrainingSessionDto } from './dto/create-training-session.dto';
import { UpdateTrainingSessionDto } from './dto/update-training-session.dto';

@Controller('training-sessions')
export class TrainingSessionsController {
    constructor(
        private readonly trainingSessionsService: TrainingSessionsService,
    ) { }

    @Post()
    create(@Body() dto: CreateTrainingSessionDto) {
        return this.trainingSessionsService.create(dto);
    }

    @Get()
    findAll() {
        return this.trainingSessionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.trainingSessionsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTrainingSessionDto,
    ) {
        return this.trainingSessionsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.trainingSessionsService.remove(id);
    }
}
