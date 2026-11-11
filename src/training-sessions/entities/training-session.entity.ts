
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Trainer } from '../../trainers/entities/trainers.entity';
import { SessionParticipant } from '../../session-participants/entities/session-participant.entity';

@Entity('training_sessions')
export class TrainingSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ name: 'session_date', type: 'date' })
    sessionDate: string;

    @Column({ name: 'start_time', type: 'time' })
    startTime: string;

    @Column({ name: 'end_time', type: 'time' })
    endTime: string;

    @Column({ type: 'int' })
    capacity: number;

    @Column({
        type: 'varchar',
        length: 20,
        default: 'scheduled',
    })
    status: string;

    @ManyToOne(
        () => Trainer,
        (trainer) => trainer.trainingSessions,
        {
            onDelete: 'RESTRICT',
        },
    )
    @JoinColumn({ name: 'trainer_id' })
    trainer: Trainer;

    @OneToMany(
        () => SessionParticipant,
        (participant) => participant.trainingSession,
    )
    participants: SessionParticipant[];
}
