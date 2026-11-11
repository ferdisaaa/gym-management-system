import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-memberships.dto';
import { UpdateMembershipDto } from './dto/update-memberships.dto';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly service: MembershipsService) {}

  @Post()
  create(@Body() dto: CreateMembershipDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // route 'member/...' ditaruh sebelum ':id' supaya tidak bentrok
  @Get('member/:memberId')
  findByMember(@Param('memberId', ParseIntPipe) memberId: number) {
    return this.service.findByMember(memberId);
  }

  @Get('member/:memberId/status')
  getStatus(@Param('memberId', ParseIntPipe) memberId: number) {
    return this.service.getStatus(memberId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMembershipDto,
  ) {
    return this.service.updateStatus(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}