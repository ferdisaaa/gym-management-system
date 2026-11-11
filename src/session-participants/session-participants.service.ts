
import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

import { SessionParticipant } from './entities/session-participant.entity';
import { TrainingSession } from '../training-sessions/entities/training-session.entity';
import { Member } from '../members/entities/members.entity';

import { CreateSessionParticipantDto } from './dto/create-session-participant.dto';
import { UpdateSessionParticipantDto } from './dto/update-session-participant.dto';

@Injectable()
export class SessionParticipantsService {
    constructor(
        @InjectRepository(SessionParticipant)
        private readonly participantRepository: Repository<SessionParticipant>,

        @InjectRepository(TrainingSession)
        private readonly sessionRepository: Repository<TrainingSession>,

        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
    ) { }

    // 1. Mendaftarkan member ke training session
    async create(dto: CreateSessionParticipantDto) {
        const session = await this.sessionRepository.findOne({
            where: { id: dto.trainingSessionId },
        });

        if (!session) {
            throw new NotFoundException('Training session tidak ditemukan');
        }

        if (session.status !== 'scheduled') {
            throw new BadRequestException(
                'Pendaftaran hanya tersedia untuk sesi yang dijadwalkan',
            );
        }

        const member = await this.memberRepository.findOne({
            where: { id: dto.memberId },
        });

        if (!member) {
            throw new NotFoundException('Member tidak ditemukan');
        }

        // Periksa apakah member sudah pernah terdaftar
        const existingParticipant = await this.participantRepository.findOne({
            where: {
                trainingSession: { id: dto.trainingSessionId },
                member: { id: dto.memberId },
            },
        });

        if (existingParticipant) {
            throw new ConflictException(
                'Member sudah pernah terdaftar pada sesi ini',
            );
        }

        // Hitung peserta yang belum dibatalkan
        const totalParticipants = await this.participantRepository.count({
            where: {
                trainingSession: { id: dto.trainingSessionId },
                attendanceStatus: Not('cancelled'),
            },
        });

        if (totalParticipants >= session.capacity) {
            throw new BadRequestException('Kapasitas training session sudah penuh');
        }

        const participant = this.participantRepository.create({
            trainingSession: session,
            member: member,
        });

        return this.participantRepository.save(participant);
    }

    // 2. Menampilkan seluruh peserta
    async findAll() {
        return this.participantRepository.find({
            relations: {
                trainingSession: true,
                member: true,
            },
            order: {
                registrationDate: 'DESC',
            },
        });
    }

    // 3. Menampilkan detail peserta berdasarkan ID
    async findOne(id: number) {
        const participant = await this.participantRepository.findOne({
            where: { id },
            relations: {
                trainingSession: true,
                member: true,
            },
        });

        if (!participant) {
            throw new NotFoundException('Session participant tidak ditemukan');
        }

        return participant;
    }

    // 4. Menampilkan peserta berdasarkan training session
    async findBySession(sessionId: number) {
        const session = await this.sessionRepository.findOne({
            where: { id: sessionId },
        });

        if (!session) {
            throw new NotFoundException('Training session tidak ditemukan');
        }

        return this.participantRepository.find({
            where: {
                trainingSession: { id: sessionId },
            },
            relations: {
                member: true,
                trainingSession: true,
            },
            order: {
                registrationDate: 'DESC',
            },
        });
    }

    // 5. Menampilkan training session berdasarkan member
    async findByMember(memberId: number) {
        const member = await this.memberRepository.findOne({
            where: { id: memberId },
        });

        if (!member) {
            throw new NotFoundException('Member tidak ditemukan');
        }

        return this.participantRepository.find({
            where: {
                member: { id: memberId },
            },
            relations: {
                member: true,
                trainingSession: {
                    trainer: true,
                },
            },
            order: {
                registrationDate: 'DESC',
            },
        });
    }

    // 6. Mengubah status kehadiran peserta
    async update(id: number, dto: UpdateSessionParticipantDto) {
        const participant = await this.findOne(id);

        const currentStatus = participant.attendanceStatus;
        const newStatus = dto.attendanceStatus;

        if (currentStatus === 'cancelled' && newStatus !== 'cancelled') {
            throw new BadRequestException(
                'Pendaftaran yang sudah dibatalkan tidak dapat diaktifkan kembali',
            );
        }

        if (currentStatus === 'attended' && newStatus !== 'attended') {
            throw new BadRequestException(
                'Status peserta yang sudah hadir tidak dapat diubah kembali',
            );
        }

        participant.attendanceStatus = newStatus;

        return this.participantRepository.save(participant);
    }

    // 7. Menghapus pendaftaran peserta
    async remove(id: number) {
        const participant = await this.findOne(id);

        await this.participantRepository.remove(participant);

        return {
            message: 'Session participant berhasil dihapus',
        };
    }
}
