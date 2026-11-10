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
import { MembershipPlansService } from './membership_plans.service';
import { CreateMembershipPlanDto } from './dto/create-membership_plan.dto';
import { UpdateMembershipPlanDto } from './dto/update-membership_plan.dto';

@Controller('membership-plans')
export class MembershipPlansController {
  constructor(private readonly service: MembershipPlansService) {}

  @Post()
  create(@Body() dto: CreateMembershipPlanDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMembershipPlanDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}