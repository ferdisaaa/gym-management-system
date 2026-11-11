
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

import { Member } from '../../members/entities/members.entity';
import { TrainingSession } from '../../training-sessions/entities/training-session.entity';

@Entity('session_participants')
@Unique('UQ_session_member', ['trainingSession', 'member'])
export class SessionParticipant {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        name: 'registration_date',
        type: 'timestamp',
    })
    registrationDate: Date;

    @Column({
        name: 'attendance_status',
        type: 'varchar',
        length: 20,
        default: 'registered',
    })
    attendanceStatus: string;

    @ManyToOne(
        () => TrainingSession,
        (session) => session.participants,
        {
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'training_session_id' })
    trainingSession: TrainingSession;

    @ManyToOne(
        () => Member,
        (member) => member.sessionParticipants,
        {
            onDelete: 'RESTRICT',
        },
    )
    @JoinColumn({ name: 'member_id' })
    member: Member;
}
