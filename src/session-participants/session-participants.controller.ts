
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

import { SessionParticipantsService } from './session-participants.service';
import { CreateSessionParticipantDto } from './dto/create-session-participant.dto';
import { UpdateSessionParticipantDto } from './dto/update-session-participant.dto';

@Controller('session-participants')
export class SessionParticipantsController {
    constructor(
        private readonly sessionParticipantsService: SessionParticipantsService,
    ) { }

    // POST /session-participants
    @Post()
    create(@Body() dto: CreateSessionParticipantDto) {
        return this.sessionParticipantsService.create(dto);
    }

    // GET /session-participants
    @Get()
    findAll() {
        return this.sessionParticipantsService.findAll();
    }

    // GET /session-participants/by-session/:sessionId
    @Get('by-session/:sessionId')
    findBySession(
        @Param('sessionId', ParseIntPipe) sessionId: number,
    ) {
        return this.sessionParticipantsService.findBySession(sessionId);
    }

    // GET /session-participants/by-member/:memberId
    @Get('by-member/:memberId')
    findByMember(
        @Param('memberId', ParseIntPipe) memberId: number,
    ) {
        return this.sessionParticipantsService.findByMember(memberId);
    }

    // GET /session-participants/:id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.sessionParticipantsService.findOne(id);
    }

    // PATCH /session-participants/:id
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateSessionParticipantDto,
    ) {
        return this.sessionParticipantsService.update(id, dto);
    }

    // DELETE /session-participants/:id
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.sessionParticipantsService.remove(id);
    }
}
